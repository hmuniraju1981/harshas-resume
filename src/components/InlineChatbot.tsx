import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { resumeChunks } from "../data/resumeChunks";
import type { ResumeChunk } from "../data/resumeChunks";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0,
    magA = 0,
    magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

function retrieveChunks(query: string, topK = 4): ResumeChunk[] {
  const queryTokens = tokenize(query);
  const vocab = new Set<string>();
  resumeChunks.forEach((chunk) => {
    tokenize(chunk.content).forEach((t) => vocab.add(t));
    chunk.keywords.forEach((k) => tokenize(k).forEach((t) => vocab.add(t)));
  });
  queryTokens.forEach((t) => vocab.add(t));

  const vocabArr = Array.from(vocab);
  const vocabIndex = new Map(vocabArr.map((v, i) => [v, i]));

  const queryVec = new Array(vocabArr.length).fill(0);
  queryTokens.forEach((t) => {
    const idx = vocabIndex.get(t);
    if (idx !== undefined) queryVec[idx] += 1;
  });

  const scored = resumeChunks.map((chunk) => {
    const chunkTokens = [
      ...tokenize(chunk.content),
      ...chunk.keywords.flatMap((k) => tokenize(k)),
      ...chunk.keywords.flatMap((k) => tokenize(k)),
    ];
    const chunkVec = new Array(vocabArr.length).fill(0);
    chunkTokens.forEach((t) => {
      const idx = vocabIndex.get(t);
      if (idx !== undefined) chunkVec[idx] += 1;
    });
    return { chunk, score: cosineSimilarity(queryVec, chunkVec) };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored
    .slice(0, topK)
    .filter((s) => s.score > 0.05)
    .map((s) => s.chunk);
}

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

const SYSTEM_PROMPT = `You are Harsha's AI Assistant. Your ONLY purpose is to answer questions about Harsha Muniraju's professional background, experience, skills, education, and certifications based on the provided context.

KEY FACTS ABOUT HARSHA (always use these as the foundation):
- Harsha Muniraju is a Data & AI Technology Executive with 15+ years of experience.
- He currently serves as "Associate Director of Technology II — Chief Data Office" at AT&T Inc., Plano, TX (2018 – Present).
- Previously he was "Project Manager" at Mindtree India Pvt Ltd. (2015–2018).
- Before that he was "Principal Software Engineer" at Tesco Bank, Inc. (2009–2015).
- Earlier roles: Software Engineer at SunGard Solutions (now FIS) and GE Healthcare India.
- He built and scaled the 400-member global Chief Data Office at AT&T from inception, managing 760+ petabytes of enterprise data.
- He is a trusted advisor to C-suite and Board on AI strategy, Responsible AI governance, and value creation.
- When asked "what does Harsha do" or similar, ALWAYS lead with his current role: "Harsha is a Data & AI Technology Executive currently serving as Associate Director of Technology II in the Chief Data Office at AT&T."
- ALWAYS use the EXACT job titles from the resume. Never paraphrase or shorten them.

RULES:
1. ONLY answer questions related to Harsha's resume, career, skills, experience, education, and professional background.
2. If the question is NOT related to Harsha's professional background, respond EXACTLY with: "I'm too confused to answer; Harsha built me, so ask him instead :)."
3. If you don't have enough context to answer a career-related question, say so honestly and suggest they contact Harsha directly.
4. Be concise, professional, and helpful.
5. Never make up information that isn't in the provided context.
6. For greetings, introduce yourself briefly and mention you can answer questions about Harsha's professional experience.`;

async function callGroq(
  messages: Message[],
  context: string
): Promise<string> {
  if (!GROQ_API_KEY) {
    return "⚠️ Chatbot is not configured yet. Please set VITE_GROQ_API_KEY in .env file. Get a free key at console.groq.com";
  }

  const systemMessage = {
    role: "system" as const,
    content: `${SYSTEM_PROMPT}\n\nCONTEXT FROM HARSHA'S RESUME:\n${context}`,
  };

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            systemMessage,
            ...messages.map((m) => ({ role: m.role, content: m.content })),
          ],
          temperature: 0.3,
          max_tokens: 512,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq API error:", err);
      return "I'm having trouble connecting right now. Please try again.";
    }

    const data = await response.json();
    return (
      data.choices[0]?.message?.content || "I couldn't generate a response."
    );
  } catch (error) {
    console.error("Groq API error:", error);
    return "I'm having trouble connecting right now. Please try again.";
  }
}

export default function InlineChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMessage: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const relevantChunks = retrieveChunks(text);
    const context = relevantChunks.map((c) => c.content).join("\n\n");
    const allMessages = [...messages, userMessage];
    const recentMessages = allMessages.slice(-6);

    const reply = await callGroq(recentMessages, context);
    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Chat Container */}
      <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/5">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Harsha's AI Assistant</h3>
            <p className="text-xs text-gray-500">Powered by AI — ask about experience, skills, or career</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-64 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="text-center py-6">
              <Bot size={32} className="mx-auto text-cyan-500/30 mb-3" />
              <p className="text-gray-500 text-sm mb-4">
                Try asking a question below
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "What does Harsha do?",
                  "AI & GenAI skills?",
                  "Education background?",
                  "Experience at AT&T?",
                  "Certifications?",
                  "Leadership experience?",
                  "What value does Harsha bring?",
                  "How can he help with growth?",
                  "Can he handle compliance?",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-gray-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user"
                    ? "bg-blue-600"
                    : "bg-gradient-to-br from-cyan-500 to-blue-600"
                }`}
              >
                {msg.role === "user" ? (
                  <User size={12} />
                ) : (
                  <Bot size={12} />
                )}
              </div>
              <div
                className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-white/[0.04] border border-white/[0.08] text-gray-300 rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                <Bot size={12} />
              </div>
              <div className="bg-white/[0.04] border border-white/[0.08] px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1">
                  <span
                    className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Follow-up suggestions after answer */}
          {messages.length > 0 && !isLoading && messages[messages.length - 1].role === "assistant" && (
            <div className="flex flex-wrap gap-2 justify-center pt-2">
              {[
                "What does Harsha do?",
                "AI & GenAI skills?",
                "Education background?",
                "Experience at AT&T?",
                "Certifications?",
                "Leadership experience?",
                "What value does Harsha bring?",
                "How can he help with growth?",
                "Can he handle compliance?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-gray-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-white/[0.06]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Harsha's experience, skills, career..."
              className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/40 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center text-white disabled:opacity-30 hover:opacity-90 transition-opacity"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
