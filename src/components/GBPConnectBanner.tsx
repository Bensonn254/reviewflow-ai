import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface GBPConnectBannerProps {
  onConnect: () => void;
}

export default function GBPConnectBanner({ onConnect }: GBPConnectBannerProps) {
  return (
    <Alert className="bg-primary/5 border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex gap-3">
        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <AlertTitle className="text-foreground">Connect your Google Business Profile</AlertTitle>
          <AlertDescription className="text-muted-foreground mt-1 text-sm">
            Grant one-time access so ReviewFlow AI can fetch your Google Business Profile (GBP) reviews and publish AI-drafted responses on your behalf.
          </AlertDescription>
        </div>
      </div>
      <Button onClick={onConnect} className="shrink-0 w-full sm:w-auto">
        Connect
      </Button>
    </Alert>
  );
}
