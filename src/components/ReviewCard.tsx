import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Edit3, Loader2 } from "lucide-react";
import { useState } from "react";

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

  return (
    <div className="glass rounded-xl p-5 space-y-4 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold">{reviewerName}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <StarRating rating={rating} size="sm" />
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{reviewText}</p>

      {aiResponse && (
        <div className="rounded-lg bg-secondary/50 p-4 space-y-2">
          <p className="text-xs font-medium text-primary">AI Suggested Response</p>
          {editing ? (
            <div className="space-y-2">
              <Textarea
                value={editedResponse}
                onChange={(e) => setEditedResponse(e.target.value)}
                className="min-h-[80px] bg-background/50"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSaveEdit}>Save</Button>
                <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed">{aiResponse}</p>
          )}
        </div>
      )}

      {status === "pending" && (
        <div className="flex gap-2 pt-1">
          <Button size="sm" onClick={() => onApprove?.(id)} className="gap-1.5">
            <Check className="w-3.5 h-3.5" /> Approve
          </Button>
          <Button size="sm" variant="outline" onClick={() => setEditing(true)} className="gap-1.5">
            <Edit3 className="w-3.5 h-3.5" /> Edit
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onReject?.(id)} className="gap-1.5 text-destructive">
            <X className="w-3.5 h-3.5" /> Reject
          </Button>
        </div>
      )}

      {status === "publishing" && (
        <div className="flex items-center gap-2 text-sm text-primary">
          <Loader2 className="w-4 h-4 animate-spin" /> Publishing to Google...
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
