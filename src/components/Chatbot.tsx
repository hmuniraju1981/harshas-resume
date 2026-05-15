import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { resumeChunks } from "../data/resumeChunks";
import type { ResumeChunk } from "../data/resumeChunks";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Simple TF-IDF-like similarity for RAG retrieval
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

  // Build vocabulary from all chunks + query
  const vocab = new Set<string>();
  resumeChunks.forEach((chunk) => {
    tokenize(chunk.content).forEach((t) => vocab.add(t));
    chunk.keywords.forEach((k) =>
      tokenize(k).forEach((t) => vocab.add(t))
    );
  });
  queryTokens.forEach((t) => vocab.add(t));

  const vocabArr = Array.from(vocab);
  const vocabIndex = new Map(vocabArr.map((v, i) => [v, i]));

  // Query vector
  const queryVec = new Array(vocabArr.length).fill(0);
  queryTokens.forEach((t) => {
    const idx = vocabIndex.get(t);
    if (idx !== undefined) queryVec[idx] += 1;
  });

  // Score each chunk
  const scored = resumeChunks.map((chunk) => {
    const chunkTokens = [
      ...tokenize(chunk.content),
      ...chunk.keywords.flatMap((k) => tokenize(k)),
      ...chunk.keywords.flatMap((k) => tokenize(k)), // boost keywords
    ];
    const chunkVec = new Array(vocabArr.length).fill(0);
    chunkTokens.forEach((t) => {
      const idx = vocabIndex.get(t);
      if (idx !== undefined) chunkVec[idx] += 1;
    });
    return { chunk, score: cosineSimilarity(queryVec, chunkVec) };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).filter((s) => s.score > 0.05).map((s) => s.chunk);
}

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

const SYSTEM_PROMPT = `You are Harsha's AI Resume Assistant. Your ONLY purpose is to answer questions about Harsha Muniraju's professional background, experience, skills, education, and certifications based on the provided context.

RULES:
1. ONLY answer questions related to Harsha's resume, career, skills, experience, education, and professional background.
2. If the question is NOT related to Harsha's professional background, respond EXACTLY with: "Harsha created me, its better you personally check with him"
3. If you don't have enough context to answer a career-related question, say so honestly and suggest they contact Harsha directly.
4. Be concise, professional, and helpful.
5. Never make up information that isn't in the provided context.
6. For greetings, introduce yourself briefly and mention you can answer questions about Harsha's professional experience.`;

async function callGroq(messages: Message[], context: string): Promise<string> {
  if (!GROQ_API_KEY) {
    return "⚠️ Chatbot is not configured yet. Please set VITE_GROQ_API_KEY in .env file to enable AI responses. Get a free API key at console.groq.com";
  }

  const systemMessage = {
    role: "system" as const,
    content: `${SYSTEM_PROMPT}\n\nCONTEXT FROM HARSHA'S RESUME:\n${context}`,
  };

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [systemMessage, ...messages.map((m) => ({ role: m.role, content: m.content }))],
        temperature: 0.3,
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq API error:", err);
      return "I'm having trouble connecting right now. Please try again.";
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "I couldn't generate a response.";
  } catch (error) {
    console.error("Groq API error:", error);
    return "I'm having trouble connecting right now. Please try again.";
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleQuickQuestion = async (question: string) => {
    if (isLoading) return;
    const userMessage: Message = { role: "user", content: question };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const relevantChunks = retrieveChunks(question);
    const context = relevantChunks.map((c) => c.content).join("\n\n");
    const recentMessages = [userMessage];

    const reply = await callGroq(recentMessages, context);
    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    setIsLoading(false);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // RAG: Retrieve relevant chunks
    const relevantChunks = retrieveChunks(trimmed);
    const context = relevantChunks.map((c) => c.content).join("\n\n");

    const allMessages = [...messages, userMessage];
    // Keep only last 6 messages for context window
    const recentMessages = allMessages.slice(-6);

    const reply = await callGroq(recentMessages, context);
    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white flex items-center justify-center shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all hover:scale-105"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Harsha's AI Assistant</h3>
              <p className="text-cyan-100 text-xs">Ask about my experience & skills</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Bot size={40} className="mx-auto text-cyan-500 mb-3 opacity-50" />
                <p className="text-gray-400 text-sm">
                  Hi! I'm Harsha's AI assistant. Ask me about his experience, skills, or career.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {[
                    "What does Harsha do?",
                    "Skills in AI/GenAI?",
                    "Education?",
                    "AT&T experience?",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => handleQuickQuestion(q)}
                      className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:bg-white/10 transition-colors"
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
                className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "user"
                      ? "bg-blue-600"
                      : "bg-gradient-to-br from-cyan-600 to-blue-600"
                  }`}
                >
                  {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white/5 border border-white/10 text-gray-200 rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Harsha's experience..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
