import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { Save, QrCode, Download, Building2, HelpCircle, AlertCircle, Trash2 } from "lucide-react";
import GBPConnectBanner from "@/components/GBPConnectBanner";
import { buildGBPAuthUrl } from "@/lib/googleAuth";
import AppSidebar from "@/components/AppSidebar";
import AppMobileNav from "@/components/AppMobileNav";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ChatWidget from "@/components/ChatWidget";

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    place_id: "",
    gbp_account_id: "",
    location_id: "",
    service_type: "",
    location_area: "",
    whatsapp_number: "",
    google_review_url: "",
  });

  useEffect(() => {
    const fetchBusiness = async () => {
      const { data } = await supabase
        .from("businesses")
        .select("*")
        .eq("owner_id", user!.id)
        .maybeSingle();

      if (data) {
        setBusinessId(data.id);
        setForm({
          name: data.name || "",
          place_id: data.place_id || "",
          gbp_account_id: data.gbp_account_id || "",
          location_id: data.location_id || "",
          service_type: data.service_type || "",
          location_area: data.location_area || "",
          whatsapp_number: data.whatsapp_number || "",
          google_review_url: data.google_review_url || "",
        });
        if (data.google_access_token) {
          setIsGoogleConnected(true);
        }
      }
    };

    if (user) fetchBusiness();
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const qrUrl = `${window.location.origin}/review/${businessId || "new"}`;
      if (businessId) {
        const { error } = await supabase
          .from("businesses")
          .update({ ...form, qr_code_url: qrUrl })
          .eq("id", businessId);
        if (error) throw error;
        toast({ title: "Saved!", description: "Business settings updated." });
        return businessId;
      } else {
        const { data, error } = await supabase
          .from("businesses")
          .insert({ ...form, owner_id: user!.id, qr_code_url: qrUrl })
          .select()
          .single();
        if (error) throw error;
        setBusinessId(data.id);
        // Update QR URL with real ID
        await supabase
          .from("businesses")
          .update({ qr_code_url: `${window.location.origin}/review/${data.id}` })
          .eq("id", data.id);
        toast({ title: "Saved!", description: "Business settings updated." });
        return data.id;
      }
    } catch (error: unknown) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndConnect = async () => {
    const savedId = await handleSave();
    if (savedId) {
      window.location.href = buildGBPAuthUrl();
    }
  };

  const downloadQR = () => {
    const svg = document.getElementById("qr-code");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 512, 512);
      ctx.drawImage(img, 0, 0, 512, 512);
      const a = document.createElement("a");
      a.download = "reviewflow-qr.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleDeleteBusiness = async () => {
    if (!deletePassword) {
      toast({ title: "Error", description: "Please enter your password", variant: "destructive" });
      return;
    }

    setDeleteLoading(true);
    try {
      // Verify password by attempting to sign in
      const { error } = await supabase.auth.signInWithPassword({
        email: user!.email || "",
        password: deletePassword,
      });

      if (error) {
        toast({ title: "Error", description: "Incorrect password", variant: "destructive" });
        setDeleteLoading(false);
        return;
      }

      // Delete the business
      const { error: deleteError } = await supabase
        .from("businesses")
        .delete()
        .eq("id", businessId);

      if (deleteError) throw deleteError;

      toast({ 
        title: "Deleted", 
        description: "Business profile and all associated data have been removed.",
        variant: "default" 
      });

      setBusinessId(null);
      setForm({
        name: "",
        place_id: "",
        gbp_account_id: "",
        location_id: "",
        service_type: "",
        location_area: "",
        whatsapp_number: "",
        google_review_url: "",
      });
      setIsGoogleConnected(false);
      setDeleteDialogOpen(false);
      setDeletePassword("");
    } catch (error: unknown) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    } finally {
      setDeleteLoading(false);
    }
  };

  const qrValue = businessId
    ? `${window.location.origin}/review/${businessId}`
    : "";

  const fields = [
    { key: "name", label: "Business Name", placeholder: "My Business", help: "Your business name as it appears on Google Maps." },
    { key: "place_id", label: "Google Place ID", placeholder: "ChIJ...", help: "Find this at Google's Place ID Finder: developers.google.com/maps/documentation/places/web-service/place-id. Search your business and copy the ID." },
    { key: "gbp_account_id", label: "GBP Account ID", placeholder: "accounts/123", help: "Go to business.google.com → your profile → look at the URL. The number after 'accounts/' is your Account ID." },
    { key: "location_id", label: "Location ID", placeholder: "locations/456", help: "In the same GBP dashboard URL, the number after 'locations/' is your Location ID." },
    { key: "service_type", label: "Service Type", placeholder: "e.g. Car Hire, Law Firm", help: "The main category of your business. This helps the AI tailor review responses to your industry." },
    { key: "location_area", label: "Location / Area", placeholder: "e.g. Downtown, City Center", help: "The city or neighborhood your business serves. Used for personalized AI responses." },
    { key: "whatsapp_number", label: "WhatsApp Number", placeholder: "+15551234567", help: "Include the country code (e.g. +1). Negative feedback from customers will be sent here privately via WhatsApp." },
    { key: "google_review_url", label: "Google Review URL", placeholder: "https://g.page/...", help: "Search your business on Google Maps → click 'Write a review' → copy that URL from your browser. Happy customers are redirected here." },
  ];

  return (
    <div className="w-full space-y-7 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground mb-1">Business Settings</h1>
            <p className="text-muted-foreground font-medium">Manage your local business profiles and GBP connection.</p>
          </div>
        </div>
      </div>

      {!businessId ? (
        <div className="mb-8 rounded-[2rem] border border-amber-500/20 bg-amber-500/5 p-8 text-sm text-foreground/80 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-lg text-foreground mb-1">Configuration Required</h4>
                <p className="text-muted-foreground font-medium">Save your business settings first before connecting Google Business Profile. This ensures we can properly map your incoming reviews.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" className="font-bold h-11 rounded-xl border-divider">
                  <a href="#save-form">Complete Form</a>
                </Button>
                <Button onClick={handleSaveAndConnect} disabled={loading} className="bg-brand text-white hover:bg-brand/90 font-black rounded-xl h-11 px-6 shadow-lg shadow-brand/20">
                  {loading ? "Saving..." : "Connect Google Business Profile"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : !isGoogleConnected ? (
        <div className="mb-8">
          <GBPConnectBanner onConnect={() => window.location.href = buildGBPAuthUrl()} />
        </div>
      ) : (
        <div className="mb-8 rounded-[2rem] border border-success/30 bg-success/5 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-foreground">Google Business Profile connected. Everything is synced and active.</span>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-8">
          <div id="save-form" className="bg-white rounded-[2.5rem] p-8 space-y-6 border border-divider shadow-sm">
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-brand" />
              General Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {fields.map(({ key, label, placeholder, help }) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center gap-1.5 ml-1">
                    <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{label}</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className="text-muted-foreground/50 hover:text-brand transition-colors focus:outline-none">
                          <HelpCircle className="h-3.5 w-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs text-xs">
                        {help}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="h-12 bg-surface-2 border-transparent text-foreground font-medium rounded-xl focus:bg-white focus:ring-4 focus:ring-brand/5 transition-all outline-none"
                  />
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Button onClick={handleSave} disabled={loading} className="gap-2 h-12 px-8 bg-brand text-white hover:bg-brand/90 font-black rounded-xl shadow-lg shadow-brand/20">
                <Save className="h-4 w-4" />
                {loading ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </div>

          {/* Danger Zone */}
          {businessId && (
            <div className="bg-red-500/5 rounded-[2.5rem] p-8 border border-red-500/10 space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-red-600 mb-1">Danger Zone</h3>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                    Once you delete your business profile, all synchronized reviews, response history, and GBP connection tokens will be permanently removed.
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => setDeleteDialogOpen(true)} 
                variant="destructive" 
                className="gap-2 h-11 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/10"
              >
                <Trash2 className="h-4 w-4" />
                Purge Business Profile
              </Button>
            </div>
          )}
        </div>

        {/* QR Code */}
        <div className="space-y-6">
          <div className="bg-[#0F1724] rounded-[2.5rem] p-8 text-white shadow-xl shadow-brand/10">
            <div className="flex items-center gap-2 mb-6">
              <QrCode className="h-5 w-5 text-brand" />
              <h3 className="font-black text-lg">Identity Card</h3>
            </div>
            {qrValue ? (
              <div className="space-y-6 text-center">
                <div className="bg-white rounded-2xl p-6 shadow-2xl inline-block mx-auto group relative overflow-hidden">
                   <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <QRCodeSVG id="qr-code" value={qrValue} size={160} />
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-left overflow-hidden">
                  <div className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-1">Review URL</div>
                  <p className="text-xs text-white/80 font-bold break-all">{qrValue}</p>
                </div>
                <Button variant="outline" onClick={downloadQR} className="w-full gap-2 h-11 border-white/20 text-white hover:bg-white/10 font-bold rounded-xl active:scale-95 transition-all">
                  <Download className="h-4 w-4" /> Download QR
                </Button>
              </div>
            ) : (
              <div className="py-12 text-center text-white/40 italic text-sm font-medium border border-white/5 border-dashed rounded-2xl">
                Complete form to generate <br/> identification QR
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog - Updated Aesthetic */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white border-none shadow-2xl rounded-[2.5rem] p-0 overflow-hidden">
          <div className="h-2 bg-red-600 w-full" />
          <div className="p-8 md:p-10 space-y-8">
            <AlertDialogHeader className="text-left space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <AlertDialogTitle className="text-3xl font-black text-foreground tracking-tighter italic">Confirm Separation</AlertDialogTitle>
              <AlertDialogDescription className="text-base font-medium text-muted-foreground leading-relaxed italic space-y-4">
                <div>
                  This action cannot be undone. All data associated with <strong>{form.name || "your business"}</strong> will be permanently removed.
                </div>
                <div className="pt-4 border-t border-divider">
                  <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-2 block">Security Confirmation</Label>
                  <Input
                    type="password"
                    placeholder="Enter password to proceed"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    className="h-12 bg-surface-2 border-transparent text-foreground font-medium rounded-xl focus:bg-white focus:ring-4 focus:ring-brand/5 transition-all outline-none"
                    disabled={deleteLoading}
                  />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex gap-3">
              <AlertDialogCancel className="flex-1 h-12 font-bold rounded-xl border-divider">
                Abort
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteBusiness}
                disabled={deleteLoading || !deletePassword}
                className="flex-[2] h-12 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl"
              >
                {deleteLoading ? "Purging..." : "Confirm Deletion"}
              </AlertDialogAction>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
