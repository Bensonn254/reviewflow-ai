import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { Save, QrCode, Download, Building2 } from "lucide-react";

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [businessId, setBusinessId] = useState<string | null>(null);
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
    if (user) fetchBusiness();
  }, [user]);

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
    }
  };

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
      }
      toast({ title: "Saved!", description: "Business settings updated." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
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

  const qrValue = businessId
    ? `${window.location.origin}/review/${businessId}`
    : "";

  const fields = [
    { key: "name", label: "Business Name", placeholder: "My Business" },
    { key: "place_id", label: "Google Place ID", placeholder: "ChIJ..." },
    { key: "gbp_account_id", label: "GBP Account ID", placeholder: "accounts/123" },
    { key: "location_id", label: "Location ID", placeholder: "locations/456" },
    { key: "service_type", label: "Service Type", placeholder: "e.g. Car Hire, Law Firm" },
    { key: "location_area", label: "Location / Area", placeholder: "e.g. Nairobi, Athi River" },
    { key: "whatsapp_number", label: "WhatsApp Number", placeholder: "+254700000000" },
    { key: "google_review_url", label: "Google Review URL", placeholder: "https://g.page/..." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Building2 className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Business Settings</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-strong rounded-2xl p-6 space-y-5">
              {fields.map(({ key, label, placeholder }) => (
                <div key={key} className="space-y-2">
                  <Label>{label}</Label>
                  <Input
                    value={(form as any)[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="bg-secondary/50 border-border/50"
                  />
                </div>
              ))}
              <Button onClick={handleSave} disabled={loading} className="gap-2 w-full sm:w-auto">
                <Save className="h-4 w-4" />
                {loading ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </div>

          {/* QR Code */}
          <div className="space-y-4">
            <div className="glass-strong rounded-2xl p-6 text-center space-y-4">
              <div className="flex items-center gap-2 justify-center">
                <QrCode className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Your Review QR Code</h3>
              </div>
              {qrValue ? (
                <>
                  <div className="bg-white rounded-xl p-4 inline-block">
                    <QRCodeSVG id="qr-code" value={qrValue} size={200} />
                  </div>
                  <p className="text-xs text-muted-foreground break-all">{qrValue}</p>
                  <Button variant="outline" onClick={downloadQR} className="gap-2 w-full">
                    <Download className="h-4 w-4" /> Download QR
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground py-8">
                  Save your business settings first to generate a QR code.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
