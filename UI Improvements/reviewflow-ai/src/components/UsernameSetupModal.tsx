import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  User as UserIcon, 
  Camera, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface UsernameSetupModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

const UsernameSetupModal = ({ isOpen, onOpenChange, onComplete }: UsernameSetupModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imgError, setImgError] = useState(false);

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
      toast({ title: "Avatar uploaded!", description: "Looking good!" });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast({ title: "Name required", description: "Please enter your chosen display name.", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { 
          full_name: name,
          avatar_url: avatarUrl || user?.user_metadata?.avatar_url
        }
      });
      if (error) throw error;
      
      toast({ title: "Identity established!", description: `Welcome aboard, ${name.split(" ")[0]}!` });
      onOpenChange(false);
      onComplete?.();
    } catch (error: any) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-white border-none shadow-2xl rounded-[2.5rem] p-0 overflow-hidden">
        <div className="relative h-32 bg-[#0F1724] flex items-center justify-center overflow-hidden">
           <div className="absolute top-0 right-0 h-40 w-40 bg-brand rounded-full blur-[80px] opacity-30 -translate-y-1/2 translate-x-1/4" />
           <div className="relative z-10 flex flex-col items-center gap-1">
             <div className="h-10 w-10 bg-brand rounded-xl flex items-center justify-center shadow-lg">
               <Sparkles className="h-6 w-6 text-white" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-light">Setup Workspace</span>
           </div>
        </div>

        <div className="p-8 md:p-10 space-y-10">
          <div className="text-center space-y-3">
             <DialogTitle className="text-3xl font-black text-foreground tracking-tighter italic">Establish your identity</DialogTitle>
             <DialogDescription className="text-base font-medium text-muted-foreground leading-relaxed italic">
               Choose how your name appears across invitations and review flows.
             </DialogDescription>
          </div>

          <div className="flex flex-col items-center gap-8">
            {/* Avatar Setup */}
            <div className="relative group">
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
                 className="absolute -bottom-2 -right-2 h-9 w-9 rounded-xl bg-brand text-white border-4 border-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
               >
                 {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
               </button>
               <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
            </div>

            {/* Name Input */}
            <div className="w-full space-y-3">
               <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">Your display name</Label>
               <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50 group-focus-within:text-brand transition-colors" />
                  <Input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Benard Benson"
                    className="h-14 rounded-2xl bg-surface-2 border-transparent text-foreground font-medium pl-12 focus:bg-white focus:ring-4 focus:ring-brand/5 transition-all outline-none"
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  />
               </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <Button 
              onClick={handleSave} 
              disabled={saving || !name.trim()} 
              className="w-full h-14 bg-brand text-white hover:bg-brand/90 font-black rounded-2xl shadow-xl shadow-brand/20 active:scale-95 transition-all flex items-center justify-center gap-2 text-base"
            >
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Finish Setup <ArrowRight className="h-5 w-5" /></>}
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-muted-foreground uppercase tracking-widest bg-surface-2 py-3 rounded-xl">
               <ShieldCheck className="h-4 w-4 text-brand" /> Instant Workspace Activation
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UsernameSetupModal;
