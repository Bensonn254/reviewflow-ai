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
    { key: "location_area", label: "Location / Area", placeholder: "e.g. Nairobi, Athi River", help: "The city or neighborhood your business serves. Used for personalized AI responses." },
    { key: "whatsapp_number", label: "WhatsApp Number", placeholder: "+254700000000", help: "Include the country code (e.g. +254). Negative feedback from customers will be sent here privately via WhatsApp." },
    { key: "google_review_url", label: "Google Review URL", placeholder: "https://g.page/...", help: "Search your business on Google Maps → click 'Write a review' → copy that URL from your browser. Happy customers are redirected here." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#042f2e] to-[#012423] text-[#F0FFF9]">
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <AppMobileNav />
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <Building2 className="h-6 w-6 text-[#06b6a4]" />
              <h1 className="text-2xl font-bold">Business Settings</h1>
            </div>

            {!businessId ? (
              <div className="mb-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-emerald-100/80">
                <div className="mb-3">Save your business settings first before connecting Google Business Profile.</div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline" className="border-white/10 text-[#F0FFF9] hover:bg-white/5">
                    <a href="#save">Go to form</a>
                  </Button>
                  <Button onClick={handleSaveAndConnect} disabled={loading} className="bg-[#06b6a4] text-black hover:bg-[#0ea5b7]">
                    {loading ? "Saving..." : "Connect my Google Business Profile"}
                  </Button>
                </div>
              </div>
            ) : !isGoogleConnected ? (
              <div className="mb-8">
                <GBPConnectBanner onConnect={() => window.location.href = buildGBPAuthUrl()} />
              </div>
            ) : (
              <div className="mb-8 rounded-xl border border-[#06b6a4]/30 bg-[#06b6a4]/5 p-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-[#06b6a4] rounded-full animate-pulse"></div>
                  <span className="text-sm text-emerald-100/80">Google Business Profile connected. Complete the fields below to finish setup.</span>
                </div>
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-4">
                <div id="save" className="bg-[#072726] rounded-2xl p-6 space-y-5 border border-white/6">
                  {fields.map(({ key, label, placeholder, help }) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <Label className="text-[#F0FFF9]">{label}</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button type="button" className="text-emerald-100/70 hover:text-[#F0FFF9] transition-colors">
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
                        className="bg-[#042f2e]/30 border border-white/6 text-[#F0FFF9]"
                      />
                    </div>
                  ))}
                  <Button onClick={handleSave} disabled={loading} className="gap-2 w-full sm:w-auto bg-[#06b6a4] text-black hover:bg-[#0ea5b7]">
                    <Save className="h-4 w-4" />
                    {loading ? "Saving..." : "Save Settings"}
                  </Button>
                </div>

                {/* Danger Zone */}
                {businessId && (
                  <div className="bg-rose-500/5 rounded-2xl p-6 space-y-4 border border-rose-500/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-rose-200 mb-1">Danger Zone</h3>
                        <p className="text-sm text-rose-100/70">Once you delete your business profile, there is no going back. All associated data will be permanently removed.</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setDeleteDialogOpen(true)} 
                      variant="destructive" 
                      className="gap-2 w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Business Profile
                    </Button>
                  </div>
                )}
              </div>

              {/* QR Code */}
              <div className="space-y-4">
                <div className="bg-[#072726] rounded-2xl p-6 text-center space-y-4 border border-white/6">
                  <div className="flex items-center gap-2 justify-center">
                    <QrCode className="h-5 w-5 text-[#06b6a4]" />
                    <h3 className="font-semibold">Your Review QR Code</h3>
                  </div>
                  {qrValue ? (
                    <>
                      <div className="bg-white rounded-xl p-4 inline-block">
                        <QRCodeSVG id="qr-code" value={qrValue} size={200} />
                      </div>
                      <p className="text-xs text-emerald-100/70 break-all">{qrValue}</p>
                      <Button variant="outline" onClick={downloadQR} className="gap-2 w-full border-white/10 text-[#F0FFF9] hover:bg-white/5">
                        <Download className="h-4 w-4" /> Download QR
                      </Button>
                    </>
                  ) : (
                    <p className="text-sm text-emerald-100/70 py-8">
                      Save your business settings first to generate a QR code.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#072726] border border-white/6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-rose-200 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Delete Business Profile?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-emerald-100/70 space-y-4">
              <div>
                This action cannot be undone. All data associated with <strong>{form.name || "your business"}</strong> will be permanently deleted:
              </div>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Business settings and configuration</li>
                <li>Google Business Profile connection tokens</li>
                <li>All synced reviews and feedback</li>
                <li>Review response history</li>
                <li>Generated QR codes</li>
              </ul>
              <div className="pt-2 border-t border-white/10">
                <Label className="text-[#F0FFF9] mb-2 block text-sm">Confirm with your password:</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && deletePassword) {
                      handleDeleteBusiness();
                    }
                  }}
                  className="bg-[#042f2e]/30 border border-white/6 text-[#F0FFF9] placeholder-emerald-100/30"
                  disabled={deleteLoading}
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel className="border-white/10 text-[#F0FFF9] hover:bg-white/5">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBusiness}
              disabled={deleteLoading || !deletePassword}
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              {deleteLoading ? "Deleting..." : "Delete Permanently"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
