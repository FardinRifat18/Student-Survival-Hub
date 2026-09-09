import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  Loader2,
  BookOpen,
  HelpCircle,
  FileText,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';
import { ChatMessage } from '../types';

export const StudyAssistantView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: "Hello! I am your AI Study Assistant powered by Gemini. Ask me to explain complex algorithms, generate practice MCQs, summarize lecture notes, or create flashcards.",
      timestamp: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [mode, setMode] = useState<'explain' | 'mcq' | 'summary' | 'flashcards' | 'practice'>('explain');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const promptChips = [
    { label: "Explain Dijkstra's Algorithm in simple terms", mode: 'explain' as const },
    { label: "Generate 5 MCQs for Database Normalization (3NF & BCNF)", mode: 'mcq' as const },
    { label: "Summarize the key concepts of Operating System Virtual Memory", mode: 'summary' as const },
    { label: "Create flashcards for Object-Oriented Programming (Polymorphism & Abstraction)", mode: 'flashcards' as const },
    { label: "Give me 3 practice problems for Calculus Integration by Parts", mode: 'practice' as const },
  ];

  const handleSendMessage = async (textToSend?: string, selectedMode?: any) => {
    const text = textToSend || inputQuery;
    const currentMode = selectedMode || mode;
    if (!text.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/study-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          mode: currentMode,
        }),
      });

      if (!res.ok) throw new Error('AI Assistant response error');

      const data = await res.json();
      const aiReply: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error(err);
      const fallbackReply: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: `### Overview: ${text}\n\n1. **Core Principle:** Focus on decomposing the concept into its fundamental axioms.\n2. **High-Yield takeaway:** Practice at least 3 active-recall problems.\n3. **Quick self-test:** Explain this concept aloud in under 60 seconds without looking at notes.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 text-white shadow-md shadow-purple-100">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">Smart Study Assistant</h1>
              <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700 border border-purple-200">
                Gemini 3.8
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Explain algorithms, synthesize high-yield flashcards, and drill multiple-choice questions.
            </p>
          </div>
        </div>

        {/* Mode Selector Chips */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 p-1">
          {[
            { id: 'explain', label: 'Explain Topic' },
            { id: 'mcq', label: 'Generate MCQs' },
            { id: 'summary', label: 'Summarize Notes' },
            { id: 'flashcards', label: 'Flashcards' },
            { id: 'practice', label: 'Practice Problems' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setMode(item.id as any)}
              className={`rounded-xl px-2.5 py-1 text-xs font-bold transition-all ${
                mode === item.id
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400 mr-1">Quick Prompts:</span>
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => {
              setMode(chip.mode);
              handleSendMessage(chip.label, chip.mode);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/60 transition-all text-left shadow-2xs"
          >
            💡 {chip.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white shadow-xs mt-0.5">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`relative max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-50 border border-slate-200 text-slate-800'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>

                <div
                  className={`mt-2 flex items-center justify-between text-[10px] ${
                    msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => handleCopy(msg.text, msg.id)}
                      className="inline-flex items-center gap-1 hover:text-slate-700 transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white text-xs font-bold mt-0.5">
                  You
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 text-white">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
              <div className="rounded-2xl bg-slate-100 px-4 py-2.5 text-xs text-slate-600">
                Thinking & formatting high-yield response...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="mt-4 border-t border-slate-100 pt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="study-assistant-input"
              type="text"
              placeholder={`Ask Gemini in "${mode}" mode...`}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-indigo-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
