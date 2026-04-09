import { useState, useEffect, useRef } from "react";
import { MessageSquare, Home, HelpCircle, Send, X, ChevronDown, Sparkles, User, Mail, ClipboardCheck, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useSupportChat } from "@/hooks/useSupportChat";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";

const TOPICS = [
  { id: "Pricing", icon: "💰", label: "Pricing & Plans" },
  { id: "Google Integration", icon: "🔗", label: "Google Connection" },
  { id: "Technical Issues", icon: "🛠️", label: "Technical Help" },
  { id: "General", icon: "✨", label: "General Inquiry" },
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    step,
    messages,
    isLoading,
    ticketNumber,
    topic,
    startChat,
    sendMessage,
    submitTicket,
    reset
  } = useSupportChat();

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle Enter key in chat
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const onSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const [formState, setFormState] = useState({
    name: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    query: "",
    website_url: "" // Honeypot field
  });

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitTicket(formState.name, formState.email, formState.query || input, formState.website_url);
  };

  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const greetingName = (isDashboard && user?.user_metadata?.full_name) 
    ? user.user_metadata.full_name.split(' ')[0] 
    : "there";

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end">
      {/* ─── CHAT WINDOW ─── */}
      {isOpen && (
        <div 
          className={cn(
            "bg-white shadow-2xl border border-divider flex flex-col transition-all duration-300 ease-in-out origin-bottom-right animate-in fade-in zoom-in duration-300",
            "fixed inset-0 sm:relative sm:inset-auto sm:mb-2 sm:rounded-[1.5rem] sm:w-[380px] sm:h-[600px] sm:max-h-[80vh] overflow-hidden"
          )}
        >
          {/* Header Section */}
          <div className="relative shrink-0 bg-gradient-to-br from-brand via-brand-active to-[#1e293b] p-8 pb-12 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-10 w-10 bg-accent-yellow rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-brand" />
                </div>
                <span className="font-black text-xl tracking-tighter">ReviewFlow AI</span>
              </div>
              
              <h2 className="text-2xl font-black leading-tight tracking-tight">
                Hi {greetingName} 👋<br />
                <span className="opacity-90 text-xl">How can we help?</span>
              </h2>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto no-scrollbar bg-[#F9FAFB] -mt-6 rounded-t-[2rem] relative z-20 px-6 pt-6 pb-24">
            
            {/* STEP: TOPICS */}
            {step === "TOPICS" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-[11px] font-black text-muted-foreground/50 uppercase tracking-[0.2em] px-1">How can we help today?</p>
                <div className="grid grid-cols-1 gap-2.5">
                  {TOPICS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => startChat(t.id)}
                      className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-divider hover:border-brand hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all group text-left relative overflow-hidden"
                    >
                      <div className="h-10 w-10 bg-surface-2 rounded-xl flex items-center justify-center text-xl group-hover:bg-brand/10 transition-colors">
                        {t.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[15px] text-foreground group-hover:text-brand transition-colors">{t.label}</span>
                        <span className="text-[10px] font-medium text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity">Typical reply: ~5 mins</span>
                      </div>
                      <div className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        <ArrowRight className="h-4 w-4 text-brand" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP: CHATTING */}
            {step === "CHATTING" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand/60 bg-brand/5 px-3 py-1 rounded-full border border-brand/10">Talking about {topic}</span>
                  <button onClick={reset} className="text-[10px] font-bold text-muted-foreground hover:text-brand flex items-center gap-1">
                    <RefreshCw className="h-3 w-3" /> Reset
                  </button>
                </div>
                
                {messages.map((m, i) => (
                  <div key={i} className={cn(
                    "max-w-[85%] rounded-[1.2rem] p-4 text-sm leading-relaxed",
                    m.role === "assistant" 
                      ? "bg-white border border-divider text-foreground rounded-tl-none shadow-sm"
                      : "bg-brand text-white ml-auto rounded-tr-none shadow-md font-medium"
                  )}>
                    {m.content}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="bg-white border border-divider text-foreground rounded-[1.2rem] rounded-tl-none p-4 w-12 flex justify-center shadow-sm">
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 bg-brand/40 rounded-full animate-bounce" />
                      <span className="h-1.5 w-1.5 bg-brand/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="h-1.5 w-1.5 bg-brand/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* STEP: FORM (Admin Fallback) */}
            {step === "FORM" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-2">
                  <div className="h-12 w-12 bg-accent-yellow/20 text-brand rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-6 w-6" />
                  </div>
                  <h3 className="font-black text-xl">Talk to Admin</h3>
                  <p className="text-xs text-muted-foreground font-medium mt-1">Our team will get back to you via email.</p>
                </div>

                <form onSubmit={onFormSubmit} className="space-y-4">
                  {/* Honeypot field - hidden from users */}
                  <div className="hidden" aria-hidden="true">
                    <Input 
                      tabIndex={-1}
                      autoComplete="off"
                      value={formState.website_url}
                      onChange={(e) => setFormState({...formState, website_url: e.target.value})}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Full Name</label>
                    <Input 
                      required
                      placeholder="Jane Doe"
                      className="rounded-xl border-divider focus:ring-brand/20 py-6"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Email Address</label>
                    <Input 
                      required
                      type="email"
                      placeholder="jane@example.com"
                      className="rounded-xl border-divider focus:ring-brand/20 py-6"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/70 ml-1">Your Query</label>
                    <Textarea 
                      required
                      placeholder="How can we help you?"
                      className="rounded-xl border-divider focus:ring-brand/20 min-h-[100px]"
                      value={formState.query || input}
                      onChange={(e) => setFormState({...formState, query: e.target.value})}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-brand hover:bg-brand-active text-white py-7 rounded-2xl text-lg font-black shadow-xl shadow-brand/20 mt-2"
                  >
                    {isLoading ? "Submitting..." : "Submit Ticket"}
                  </Button>
                </form>
              </div>
            )}

            {/* STEP: SUCCESS */}
            {step === "SUCCESS" && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner">
                  <ClipboardCheck className="h-12 w-12" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-foreground mb-2">Ticket Created!</h3>
                  <p className="text-muted-foreground font-medium">Your request has been received.</p>
                </div>
                
                <div className="bg-white border border-dashed border-divider p-6 rounded-2xl w-full">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 block mb-2">Ticket Number</span>
                  <span className="text-3xl font-black text-brand tracking-tighter">{ticketNumber}</span>
                </div>

                <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">
                  "One of our leads will review your query and reply directly to your email within 24 hours."
                </p>

                <Button 
                  onClick={reset}
                  variant="outline"
                  className="w-full rounded-xl border-divider font-bold text-muted-foreground py-6"
                >
                  Done
                </Button>
              </div>
            )}
          </div>

          {/* Chat Input Bar (Only visible while chatting) */}
          {step === "CHATTING" && (
            <div className="shrink-0 h-24 bg-white border-t border-divider flex items-center px-6 gap-3 absolute bottom-0 left-0 right-0 z-30">
              <input
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 h-12 bg-[#F9FAFB] rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand/20 border border-divider transition-all"
              />
              <button 
                onClick={onSend}
                disabled={!input.trim() || isLoading}
                className={cn(
                  "h-12 w-12 rounded-xl flex items-center justify-center transition-all bg-brand text-white shadow-lg",
                  (!input.trim() || isLoading) && "opacity-50 grayscale scale-95"
                )}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─── TRIGGER BUBBLE ─── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-12 w-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 group",
          isOpen ? "bg-white text-slate-400 rotate-90" : "bg-brand text-white shadow-brand/20 ring-4 ring-white"
        )}
      >
        {isOpen ? (
          <ChevronDown className="h-6 w-6" />
        ) : (
          <div className="relative">
            <MessageSquare className="h-5 w-5 group-hover:animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-accent-yellow rounded-full border-2 border-brand"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
