import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Edit3, Loader2, MessageSquare, Calendar, Sparkles, Send } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  id: string;
  reviewerName: string;
  rating: number;
  reviewText: string;
  aiResponse: string | null;
  status: string;
  createdAt: string;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onEditResponse?: (id: string, newResponse: string) => void;
}

const ReviewCard = ({
  id, reviewerName, rating, reviewText, aiResponse, status, createdAt,
  onApprove, onReject, onEditResponse,
}: ReviewCardProps) => {
  const [editing, setEditing] = useState(false);
  const [editedResponse, setEditedResponse] = useState(aiResponse || "");

  const handleSaveEdit = () => {
    onEditResponse?.(id, editedResponse);
    setEditing(false);
  };

  const initial = reviewerName.charAt(0).toUpperCase();

  return (
    <div className="group relative flex flex-col p-6 rounded-3xl bg-white border border-divider shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in overflow-hidden">
      {/* Status Badge */}
      <div className="absolute top-6 right-6">
        <div className={cn(
          "text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border",
          status === "pending" ? "bg-accent-yellow/10 border-accent-yellow/20 text-brand" :
          status === "published" ? "bg-success/10 border-success/20 text-success" :
          "bg-surface-2 border-border text-muted-foreground"
        )}>
          {status}
        </div>
      </div>

      <div className="flex items-start gap-4 mb-5">
        <div className="h-12 w-12 rounded-full bg-brand/5 border border-brand/10 text-brand font-black flex items-center justify-center text-lg shrink-0">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 mb-1">
             <h3 className="font-black text-foreground tracking-tight truncate">{reviewerName}</h3>
             <StarRating rating={rating} size="sm" className="text-accent-yellow" />
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground/60">
            <Calendar className="h-3 w-3" />
            {new Date(createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>

      <div className="relative mb-6">
        <MessageSquare className="absolute -left-1 -top-1 h-8 w-8 text-brand/5 -z-10" />
        <p className="text-base font-medium text-foreground leading-relaxed italic pr-4">
          "{reviewText}"
        </p>
      </div>

      {aiResponse && (
        <div className="rounded-2xl bg-surface-2 border border-divider p-5 space-y-4 shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Sparkles className="h-12 w-12 text-brand" />
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              <span className="text-[11px] font-black uppercase tracking-widest text-brand">AI Drafted Reply</span>
            </div>
            {!editing && status === "pending" && (
              <button 
                onClick={() => setEditing(true)}
                className="text-[11px] font-black text-muted-foreground hover:text-brand transition-colors flex items-center gap-1"
              >
                <Edit3 className="h-3 w-3" /> Edit Draft
              </button>
            )}
          </div>

          {editing ? (
            <div className="space-y-3 relative z-10 animate-fade-in">
              <Textarea
                value={editedResponse}
                onChange={(e) => setEditedResponse(e.target.value)}
                className="min-h-[100px] bg-white border-divider text-foreground font-medium rounded-xl focus:ring-1 focus:ring-brand/30"
                placeholder="Type your custom response..."
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSaveEdit} className="bg-brand text-white font-bold h-9 rounded-lg">Save Changes</Button>
                <Button size="sm" variant="ghost" onClick={() => setEditing(false)} className="font-bold h-9 rounded-lg">Cancel</Button>
              </div>
            </div>
          ) : (
            <p className="text-sm font-medium text-foreground/90 leading-relaxed relative z-10 pl-3 border-l-2 border-brand/20">
              {aiResponse}
            </p>
          )}
        </div>
      )}

      {status === "pending" && (
        <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-divider mt-6">
          <Button 
            onClick={() => onApprove?.(id)}
            className="bg-brand text-white font-black hover:bg-brand/90 px-6 h-11 rounded-xl shadow-lg shadow-brand/20 active:scale-95 transition-all gap-2"
          >
            <Send className="w-4 h-4" /> Publish Reply
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => onReject?.(id)}
            className="font-black text-muted-foreground hover:text-red-500 h-11 rounded-xl px-4 gap-2 transition-colors"
          >
            <X className="w-4 h-4" /> Ignore
          </Button>
        </div>
      )}

      {status === "publishing" && (
        <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-brand/5 border border-brand/10 text-brand font-black text-sm mt-6 animate-pulse">
          <Loader2 className="w-4 h-4 animate-spin" /> 
          Relaying to Google Business Profile...
        </div>
      )}

      {status === "published" && (
        <div className="flex items-center gap-2 text-success font-black text-[11px] uppercase tracking-widest mt-6 pt-6 border-t border-divider">
          <Check className="h-3.5 w-3.5" strokeWidth={3} /> Successfully Published
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
