import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export type ChatStep = "TOPICS" | "CHATTING" | "FORM" | "SUCCESS";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export const useSupportChat = () => {
  const { user } = useAuth();
  const [step, setStep] = useState<ChatStep>("TOPICS");
  const [topic, setTopic] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  const startChat = (selectedTopic: string) => {
    setTopic(selectedTopic);
    setStep("CHATTING");
    setMessages([
      { 
        role: "assistant", 
        content: `Hi! I'm FlowBot. I see you're interested in ${selectedTopic}. How can I help you today?` 
      }
    ]);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const newMessages = [...messages, { role: "user", content } as Message];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("support-chat", {
        body: { 
          message: content, 
          topic, 
          history: messages.slice(-5) // Send last 5 messages for context
        },
      });

      if (error) throw error;

      setMessages([...newMessages, { role: "assistant", content: data.response }]);
      
      if (data.wantsAdmin) {
        // AI detected user needs human help
        setTimeout(() => setStep("FORM"), 1500);
      }
    } catch (err) {
      console.error("Chat error:", err);
      toast({
        title: "Chat Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitTicket = async (name: string, email: string, query: string) => {
    setIsLoading(true);
    try {
      // Generate a ticket number locally first to show immediately
      const generatedTicket = `RF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      const { error } = await supabase.from("support_tickets").insert({
        user_id: user?.id,
        full_name: name,
        email,
        topic,
        message: query,
        ticket_number: generatedTicket,
      });

      if (error) throw error;

      setTicketNumber(generatedTicket);
      setStep("SUCCESS");
    } catch (err) {
      console.error("Ticket error:", err);
      toast({
        title: "Submission Error",
        description: "Failed to create support ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setStep("TOPICS");
    setTopic("");
    setMessages([]);
    setTicketNumber("");
  };

  return {
    step,
    setStep,
    topic,
    messages,
    isLoading,
    ticketNumber,
    startChat,
    sendMessage,
    submitTicket,
    reset,
  };
};
