import { useState } from "react";
import { Bell, CheckCircle2, MessageSquare, Star, ArrowUpRight, Trash2, Mail, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data
type NotificationType = 'system' | 'review' | 'message';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  read: boolean;
  link?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Google Review",
    message: "John Doe left a 5-star review for Main Street Coffee.",
    time: "2 mins ago",
    type: "review",
    read: false,
    link: "/reviews"
  },
  {
    id: "2",
    title: "Weekly Summary Ready",
    message: "Your property performance summary for this week has been generated.",
    time: "2 hours ago",
    type: "system",
    read: false,
    link: "/analytics"
  },
  {
    id: "3",
    title: "New AI Reply Suggested",
    message: "ReviewFlow AI drafted a response for a recent negative review.",
    time: "1 day ago",
    type: "message",
    read: true,
    link: "/reviews"
  },
  {
    id: "4",
    title: "Subscription Renewal",
    message: "Your current plan will renew automatically on the 1st of next month.",
    time: "2 days ago",
    type: "system",
    read: true,
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'review': return <Star className="h-4 w-4 text-amber-500" />;
      case 'message': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'system': return <ShieldAlert className="h-4 w-4 text-brand" />;
      default: return <Bell className="h-4 w-4 text-slate-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="w-full space-y-7 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
            <Bell className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground mb-1">Notifications</h1>
            <p className="text-muted-foreground font-medium">Stay updated with your property performance and system alerts.</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllRead} variant="outline" className="h-12 px-6 rounded-xl border-divider font-bold gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 border border-divider shadow-sm">
        <div className="space-y-4">
          {notifications.map((n) => (
            <div 
              key={n.id} 
              className={cn(
                "group relative p-6 rounded-2xl border transition-all duration-200 hover:shadow-md",
                n.read 
                  ? "bg-white border-divider" 
                  : "bg-brand/5 border-brand/20 shadow-sm"
              )}
            >
              {!n.read && (
                <div className="absolute top-6 right-6 h-2 w-2 rounded-full bg-brand animate-pulse"></div>
              )}
              <div className="flex gap-4">
                <div className={cn(
                  "h-10 w-10 shrink-0 rounded-full flex items-center justify-center",
                  n.read ? "bg-surface-2" : "bg-white shadow-sm"
                )}>
                  {getIcon(n.type)}
                </div>
                <div className="space-y-1 pr-8">
                  <div className="flex items-center gap-2">
                    <h3 className={cn("font-bold text-base", !n.read && "text-brand")}>{n.title}</h3>
                    <span className="text-[11px] font-bold text-muted-foreground bg-surface-2 px-2 py-0.5 rounded-full">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-600">{n.message}</p>
                </div>
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-20 w-20 bg-surface-2 rounded-full flex items-center justify-center mb-2">
                <Bell className="h-10 w-10 text-muted-foreground/30" />
              </div>
              <h3 className="text-xl font-black text-foreground">You're all caught up!</h3>
              <p className="text-muted-foreground font-medium max-w-sm">No new notifications right now. We'll alert you when something needs your attention.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
