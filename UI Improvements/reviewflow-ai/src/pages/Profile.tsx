import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { User as UserIcon, Camera, Save, Loader2, Bell, Shield, Activity } from "lucide-react";
import { getUserAvatarUrl } from "@/lib/userProfile";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    bio: "",
    newReviewAlerts: true,
    weeklySummaries: true,
  });

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const meta = user.user_metadata || {};
      setForm({
        fullName: meta.full_name || meta.name || "",
        username: meta.username || "",
        bio: meta.bio || "",
        newReviewAlerts: meta.new_review_alerts ?? true,
        weeklySummaries: meta.weekly_summaries ?? true,
      });
      setAvatarUrl(getUserAvatarUrl(user));
    }
  }, [user]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${user?.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
      setImgError(false);
      
      // Update user metadata immediately with new avatar
      await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });
      
      toast({ title: "Avatar uploaded!", description: "Your profile picture has been updated." });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: form.fullName,
          username: form.username,
          bio: form.bio,
          new_review_alerts: form.newReviewAlerts,
          weekly_summaries: form.weeklySummaries,
        }
      });
      
      if (error) throw error;
      toast({ title: "Profile updated", description: "Your personal details have been saved." });
    } catch (error: any) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateString));
  };

  return (
    <div className="w-full space-y-7 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
            <UserIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground mb-1">Personal Identity</h1>
            <p className="text-muted-foreground font-medium">Manage your profile, identity, and notification preferences.</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Core Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 space-y-8 border border-divider shadow-sm">
            {/* Identity Card / Avatar Upload */}
            <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start pb-8 border-b border-divider">
              <div className="relative group shrink-0">
                <div className="h-40 w-40 rounded-[2rem] overflow-hidden bg-surface-2 border-2 border-divider shadow-inner flex items-center justify-center">
                  {avatarUrl && !imgError ? (
                    <img 
                      src={avatarUrl} 
                      alt="Preview" 
                      onError={() => setImgError(true)} 
                      className="h-full w-full object-cover transition-transform group-hover:scale-110" 
                    />
                  ) : (
                    <UserIcon className="h-16 w-16 text-muted-foreground/40" />
                  )}
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="absolute -bottom-2 -right-2 h-10 w-10 rounded-xl bg-brand text-white border-4 border-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                >
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                </button>
                <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
              </div>
              
              <div className="space-y-2 text-center sm:text-left pt-2">
                <h3 className="font-bold text-xl text-foreground">Profile Picture</h3>
                <p className="text-sm font-medium text-muted-foreground max-w-sm">
                  Upload a professional headshot or avatar. This will be visible across your workspace and team invitations.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                  <Input
                    value={form.fullName}
                    onChange={(e) => setForm(f => ({ ...f, fullName: e.target.value }))}
                    placeholder="e.g. John Doe"
                    className="h-12 bg-surface-2 border-transparent text-foreground font-medium rounded-xl focus:bg-white focus:ring-4 focus:ring-brand/5 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Username</Label>
                  <Input
                    value={form.username}
                    onChange={(e) => setForm(f => ({ ...f, username: e.target.value }))}
                    placeholder="e.g. johndoe"
                    className="h-12 bg-surface-2 border-transparent text-foreground font-medium rounded-xl focus:bg-white focus:ring-4 focus:ring-brand/5 transition-all outline-none"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Personal Bio</Label>
                <Textarea
                  value={form.bio}
                  onChange={(e) => setForm(f => ({ ...f, bio: e.target.value }))}
                  placeholder="Tell us a little about yourself and your role..."
                  className="min-h-[120px] bg-surface-2 border-transparent text-foreground font-medium rounded-xl focus:bg-white focus:ring-4 focus:ring-brand/5 transition-all outline-none resize-y"
                />
                <p className="text-xs text-muted-foreground ml-1">
                  We use this context to help the AI craft responses that sound more like you.
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <Button onClick={handleSave} disabled={loading} className="gap-2 h-12 px-8 bg-brand text-white hover:bg-brand/90 font-black rounded-xl shadow-lg shadow-brand/20">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {loading ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Side panels */}
        <div className="space-y-8">
          {/* Notification Center */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-divider shadow-sm space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="h-5 w-5 text-brand" />
              <h3 className="font-bold text-lg">Notifications</h3>
            </div>
            
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-foreground cursor-pointer">New Review Alerts</Label>
                  <p className="text-xs text-muted-foreground">Receive instant alerts for new feedback.</p>
                </div>
                <Switch 
                  checked={form.newReviewAlerts} 
                  onCheckedChange={(c) => setForm(f => ({ ...f, newReviewAlerts: c }))} 
                />
              </div>
              
              <div className="border-t border-divider pt-5 flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-foreground cursor-pointer">Weekly Summaries</Label>
                  <p className="text-xs text-muted-foreground">Get a digest of interaction stats.</p>
                </div>
                <Switch 
                  checked={form.weeklySummaries} 
                  onCheckedChange={(c) => setForm(f => ({ ...f, weeklySummaries: c }))} 
                />
              </div>
            </div>
          </div>

          {/* Security & Account Status */}
          <div className="bg-[#0F1724] rounded-[2.5rem] p-8 text-white shadow-xl shadow-brand/10 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-brand" />
              <h3 className="font-black text-lg">Security</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-left">
                <div className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-1">Email Address</div>
                <p className="text-sm text-white/90 font-bold">{user?.email}</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-3 w-3 text-white/40" />
                  <div className="text-[10px] font-black uppercase text-white/40 tracking-widest">Last Sign In</div>
                </div>
                <p className="text-xs text-white/80 font-medium">
                  {formatDate(user?.last_sign_in_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
