import { useState, useEffect, useRef } from "react";
import { MessageSquare, Home, HelpCircle, Send, X, ChevronDown, Sparkles, User, Mail, ClipboardCheck, ArrowRight, RefreshCw, Clock } from "lucide-react";
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

interface ChatWidgetProps {
  promptText?: string;
}

const ChatWidget = ({ promptText }: ChatWidgetProps) => {
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
    <div className="fixed bottom-0 right-0 z-[9999] flex flex-col items-end">
      {/* ─── CHAT WINDOW ─── */}
      {isOpen && (
        <div 
          className={cn(
            "bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col transition-all duration-300 ease-out origin-bottom-right animate-in fade-in zoom-in duration-300",
            "fixed inset-0 sm:inset-auto sm:right-6 sm:bottom-6 sm:w-[420px] sm:h-[720px] sm:max-h-[90vh] sm:rounded-[2rem] overflow-hidden"
          )}
        >
          {/* ─── HEADER (Premium Refined) ─── */}
          <div className="shrink-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
               <div className="flex flex-col">
                  <span className="font-bold text-lg text-[#0F1724] tracking-tight">ReviewflowAI</span>
                  <div className="flex items-center gap-1 opacity-50">
                    <Clock className="h-3 w-3" />
                    <span className="text-[11px] font-medium">Under a minute</span>
                  </div>
               </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-brand transition-colors p-2 rounded-full hover:bg-slate-50">
                <ChevronDown className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-slate-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* ─── CONTENT AREA ─── */}
          <div className="flex-1 overflow-y-auto no-scrollbar bg-white px-6 pt-6 pb-24 relative space-y-6">
            
            {/* Context Message (Based on Reference) */}
            <div className="bg-slate-50/80 rounded-2xl p-4 text-sm text-slate-600 border border-slate-100">
              <p className="font-medium mb-1">MoreLogin: Secure Account Management.</p>
              <p className="opacity-70 text-xs leading-relaxed">Unique security containers for each account. For more support, check out the help center help@reviewflow.ai</p>
            </div>

            <div className="flex items-start gap-3 bg-blue-50/40 p-5 rounded-2xl border border-blue-100/30">
               <HelpCircle className="h-5 w-5 text-blue-500 mt-1 shrink-0" />
               <div className="flex flex-col">
                 <span className="text-sm font-semibold text-slate-800">Hey there,</span>
                 <span className="text-sm text-slate-600 mt-0.5">What would you like help with?</span>
               </div>
            </div>

            {/* STEP: TOPICS */}
            {step === "TOPICS" && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Quick Actions</p>
                <div className="grid grid-cols-1 gap-2">
                  {TOPICS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => startChat(t.id)}
                      className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 hover:border-brand hover:bg-brand/5 transition-all text-left group"
                    >
                      <span className="text-lg">{t.icon}</span>
                      <span className="font-bold text-sm text-slate-700 group-hover:text-brand transition-colors">{t.label}</span>
                      <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-brand" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP: CHATTING */}
            {step === "CHATTING" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                {messages.map((m, i) => (
                  <div key={i} className={cn(
                    "max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed",
                    m.role === "assistant" 
                      ? "bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none"
                      : "bg-brand text-white ml-auto rounded-tr-none shadow-lg shadow-brand/20 font-medium"
                  )}>
                    {m.content}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-none p-4 w-12 flex justify-center">
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
              <form onSubmit={onFormSubmit} className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Name</label>
                    <Input required className="h-12 rounded-xl" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email</label>
                    <Input required type="email" className="h-12 rounded-xl" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Message</label>
                    <Textarea required className="min-h-[120px] rounded-xl" value={formState.query || input} onChange={(e) => setFormState({...formState, query: e.target.value})} />
                 </div>
                 <Button type="submit" disabled={isLoading} className="w-full h-14 rounded-xl font-bold bg-brand shadow-lg transition-transform active:scale-95">
                    {isLoading ? "Sending..." : "Send Message"}
                 </Button>
              </form>
            )}

            {/* STEP: SUCCESS */}
            {step === "SUCCESS" && (
              <div className="flex flex-col items-center justify-center pt-8 text-center space-y-6">
                <div className="h-16 w-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
                  <ClipboardCheck className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Message Sent!</h3>
                  <p className="text-sm text-slate-500 mt-1 font-medium italic">We typically respond in under 4 hours.</p>
                </div>
                <Button onClick={reset} variant="link" className="text-brand font-bold">Done</Button>
              </div>
            )}
          </div>

          {/* ─── FOOTER (Minimalist with Icons) ─── */}
          <div className="shrink-0 p-6 bg-white border-t border-slate-50">
            <div className="relative group">
               <div className="bg-white border-2 border-slate-100 rounded-2xl p-2 pb-1 focus-within:border-brand/40 transition-all flex flex-col gap-2">
                  <textarea
                    autoFocus
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message..."
                    className="w-full min-h-[44px] max-h-[120px] pt-1 px-3 text-sm font-medium focus:outline-none resize-none bg-transparent"
                  />
                  
                  <div className="flex items-center justify-between mt-1">
                     <div className="flex items-center gap-1">
                        <button className="p-2 text-slate-400 hover:text-brand transition-colors rounded-lg"><Home className="h-4.5 w-4.5" /></button>
                        <button className="p-2 text-slate-400 hover:text-brand transition-colors rounded-lg"><Sparkles className="h-4.5 w-4.5" /></button>
                        <button className="p-2 text-slate-400 hover:text-brand transition-colors rounded-lg underline text-[10px] font-black uppercase tracking-tighter">GIF</button>
                        <button className="p-2 text-slate-400 hover:text-brand transition-colors rounded-lg opacity-40 grayscale"><User className="h-4.5 w-4.5" /></button>
                     </div>

                     <button 
                       onClick={onSend}
                       disabled={!input.trim() || isLoading}
                       className={cn(
                         "h-10 w-10 flex items-center justify-center rounded-full transition-all text-white",
                         input.trim() ? "bg-brand shadow-lg shadow-brand/30 scale-100" : "bg-slate-100 text-slate-300 scale-90"
                       )}
                     >
                       <Send className="h-4 w-4" />
                     </button>
                  </div>
               </div>
            </div>
            <div className="text-center mt-3 opacity-20 hover:opacity-100 transition-opacity">
               <span className="text-[10px] items-center justify-center font-bold uppercase tracking-[0.2em] text-slate-400 flex gap-1">Powered by ReviewFlow <Sparkles className="h-2 w-2" /></span>
            </div>
          </div>
        </div>
      )}

      {/* ─── TRIGGER BUBBLE (Hidden when open) ─── */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 flex items-center gap-3 group">
          {promptText && (
            <div className="bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-100 text-sm font-bold text-slate-800 animate-in slide-in-from-right-4 fade-in duration-500 hidden md:block opacity-0 group-hover:opacity-100 transition-all">
              {promptText}
            </div>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-brand text-white flex items-center justify-center shadow-[0_12px_24px_-8px_rgba(0,0,0,0.3)] transition-all duration-300 transform hover:scale-110 active:scale-95 ring-4 ring-white"
          >
            <div className="relative">
              <MessageSquare className="h-6 w-6 group-hover:animate-pulse" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent-yellow rounded-full border-2 border-brand" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
