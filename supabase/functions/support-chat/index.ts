import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const KNOWLEDGE_BASE = `
ReviewFlow AI is a reputation management SaaS designed for service businesses, especially Kenyan SMEs.
Key Features:
- Smart Review Gateway: QR codes for customers to rate. 4+ stars goes to Google, <4 stars goes to private WhatsApp/Feedback loop.
- AI-Powered Responses: Automates professional replies.
- Dashboard & Analytics: Track reviews and metrics.
- Integrations: Google Business Profile, Facebook, Yelp, TripAdvisor, Trustpilot.
- Pricing:
  - Launch: Free for 1 location.
  - Growth: Up to 3 locations, 20 AI responses/month.
  - Scale: Up to 10 locations, unlimited AI responses.
  - Agency: Bulk locations and reseller features.
- Support: Negative feedback is routed privately to resolve issues before they affect public ratings.
- Security: Official Google OAuth 2.0 integration.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { message, topic, history = [] } = await req.json();
    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    
    if (!GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY not configured in Supabase secrets");
    }

    const systemPrompt = `You are "FlowBot", the friendly AI assistant for ReviewFlow AI.
Your goal is to help users with questions about ReviewFlow AI features, pricing, and setup.

Knowledge Base:
${KNOWLEDGE_BASE}

Topic of this conversation: ${topic || "General"}

Guidelines:
1. Be professional, concise, and helpful.
2. If the user's query is NOT related to ReviewFlow AI or the knowledge base, politely ask them to rephrase or offer to connect them with a human (admin).
3. If the user asks for an "admin", "human", "representative", or says they have a complex issue that you can't solve, suggest they fill out the support form.
4. Keep responses to 2-3 sentences max.
5. Use a warm, human-like tone.

Current conversation history:
${history.map((m: any) => `${m.role}: ${m.content}`).join("\n")}
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API error:", errorData);
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "";

    // Simple detection if user wants an admin
    const triggerWords = ["admin", "human", "representative", "support form", "talk to someone", "person"];
    const wantsAdmin = triggerWords.some(word => aiResponse.toLowerCase().includes(word));

    return new Response(JSON.stringify({ 
      response: aiResponse,
      wantsAdmin: wantsAdmin
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("support-chat error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
