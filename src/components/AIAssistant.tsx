'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SparklesIcon, XMarkIcon, PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/app/Authentication/context/AuthContext';
import { loginHref } from '@/app/Authentication/utils/authUtils';
import { markdownToHtml } from '@/lib/markdown';

interface ScholarshipCard {
  id: number;
  slug: string;
  title: string;
  country: string;
  deadline: string;
  image: string | null;
  fully_funded: boolean;
}

interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  message: string;
  scholarships?: ScholarshipCard[];
  error?: boolean;
}

const STORAGE_KEY = 'aiAssistantMessages';
const DEFAULT_IMAGE = '/images/providers/scholarship-default.jpg';

const SUGGESTIONS = [
  "Fully funded master's in Europe",
  'PhD scholarships in Germany',
  'Scholarships closing this month',
  'Undergraduate scholarships in the USA',
  'How do I write a strong motivation letter?',
];

const formatDeadline = (date: string) =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const loadMessages = (): AIMessage[] => {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export default function AIAssistant() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();
  const pathname = usePathname();

  // The details page has its own action bar at the bottom on phones; sit above it
  const raised = pathname?.startsWith('/scholarships/scholarshipdetails');

  useEffect(() => {
    setIsMounted(true);
    setMessages(loadMessages());
  }, []);

  // Keep the conversation for this browser tab
  useEffect(() => {
    if (!isMounted) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      /* storage full or blocked */
    }
  }, [messages, isMounted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading, isOpen]);

  // Lock page scroll behind the full-screen chat on phones, and close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    const small = window.matchMedia('(max-width: 639px)').matches;
    const previous = document.body.style.overflow;
    if (small) document.body.style.overflow = 'hidden';
    else setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Grow the input with its content, up to a few lines
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [newMessage]);

  if (!isMounted) {
    return null;
  }

  const sendMessage = async (text: string) => {
    const message = text.trim();
    if (!message || isLoading || !user) return;

    setMessages((prev) => [...prev, { id: `${Date.now()}-u`, type: 'user', message }]);
    setNewMessage('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('SESSION_EXPIRED');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/chat/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ message }),
      });

      if (response.status === 401) throw new Error('SESSION_EXPIRED');
      if (response.status === 429) throw new Error('RATE_LIMITED');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-a`, type: 'ai', message: data.message, scholarships: data.scholarships || [] },
      ]);
    } catch (error) {
      console.error('AI chat error:', error);
      const reason = error instanceof Error ? error.message : '';
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-e`,
          type: 'ai',
          error: true,
          message:
            reason === 'SESSION_EXPIRED'
              ? 'Your session has expired. Please log in again to keep chatting.'
              : reason === 'RATE_LIMITED'
                ? "You're sending messages quickly. Please wait a moment and try again."
                : "Sorry, I couldn't answer that right now. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(newMessage);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(newMessage);
    }
  };

  const closeOnSmallScreens = () => {
    if (window.matchMedia('(max-width: 639px)').matches) setIsOpen(false);
  };

  return (
    <>
      {/* Launcher */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open the AI scholarship assistant"
          className={`fixed right-4 sm:right-6 z-40 group ${raised ? 'bottom-24 lg:bottom-6' : 'bottom-5 sm:bottom-6'}`}
        >
          <span className="absolute inset-0 rounded-full bg-indigo-500/40 animate-ping [animation-duration:2.5s] group-hover:hidden" />
          <span className="relative flex items-center gap-2 rounded-full bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-3.5 sm:pl-4 sm:pr-5 text-white shadow-lg shadow-indigo-600/30 ring-4 ring-white transition-transform group-hover:scale-105 group-active:scale-95">
            <SparklesIcon className="h-6 w-6" />
            <span className="hidden sm:inline text-sm font-semibold">Ask AI</span>
          </span>
        </button>
      )}

      {/* Chat window: full screen on phones, floating panel on larger screens */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI scholarship assistant"
          className="fixed z-[60] inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[min(640px,calc(100vh-3rem))] flex flex-col bg-white sm:rounded-2xl shadow-2xl sm:ring-1 sm:ring-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <SparklesIcon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold leading-tight">Scholarship Assistant</h2>
              <p className="text-xs text-white/80">Answers from our scholarship database</p>
            </div>
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                aria-label="Start a new chat"
                title="New chat"
                className="rounded-full p-2 hover:bg-white/15"
              >
                <ArrowPathIcon className="h-5 w-5" />
              </button>
            )}
            <button onClick={() => setIsOpen(false)} aria-label="Close" className="rounded-full p-2 hover:bg-white/15">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto overscroll-contain bg-gray-50 px-4 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="pt-2">
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
                  <p className="font-semibold text-gray-900">Hi{user?.first_name ? ` ${user.first_name}` : ''}! 👋</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Tell me what and where you want to study, and I&apos;ll find matching scholarships, deadlines and tips.
                  </p>
                </div>
                {user ? (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Try asking</p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTIONS.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => sendMessage(suggestion)}
                          className="rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-sm text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 rounded-2xl bg-indigo-50 p-4 text-center">
                    <p className="text-sm text-indigo-900">Log in to chat with the assistant. It&apos;s free.</p>
                    <Link
                      href={loginHref()}
                      onClick={() => setIsOpen(false)}
                      className="mt-3 inline-block rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                      Log in
                    </Link>
                  </div>
                )}
              </div>
            )}

            {messages.map((msg) =>
              msg.type === 'user' ? (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-indigo-600 px-4 py-2.5 text-sm text-white whitespace-pre-wrap break-words">
                    {msg.message}
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="flex gap-2">
                  <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white">
                    <SparklesIcon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className={`rounded-2xl rounded-tl-md px-4 py-3 text-sm shadow-sm ring-1 ${
                        msg.error ? 'bg-red-50 text-red-800 ring-red-100' : 'bg-white text-gray-700 ring-gray-100'
                      }`}
                    >
                      <div className="rich-text" dangerouslySetInnerHTML={{ __html: markdownToHtml(msg.message) }} />
                    </div>

                    {msg.scholarships && msg.scholarships.length > 0 && (
                      <div className="mt-2 -mr-4 flex gap-2 overflow-x-auto pb-1 pr-4 snap-x scrollbar-hide">
                        {msg.scholarships.map((s) => (
                          <Link
                            key={s.id}
                            href={`/scholarships/scholarshipdetails?id=${s.slug}`}
                            onClick={closeOnSmallScreens}
                            className="snap-start w-44 flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 hover:ring-indigo-300 transition"
                          >
                            <img
                              src={s.image || DEFAULT_IMAGE}
                              alt=""
                              loading="lazy"
                              className="h-20 w-full object-cover bg-gray-100"
                              onError={(e) => {
                                e.currentTarget.src = DEFAULT_IMAGE;
                              }}
                            />
                            <div className="p-2.5">
                              <p className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2">{s.title}</p>
                              <p className="mt-1 text-[11px] text-gray-500">
                                {s.country} · {formatDeadline(s.deadline)}
                              </p>
                              {s.fully_funded && (
                                <span className="mt-1.5 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                                  Fully funded
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {msg.error && msg.message.includes('log in') && (
                      <Link
                        href={loginHref()}
                        onClick={() => setIsOpen(false)}
                        className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:underline"
                      >
                        Log in again →
                      </Link>
                    )}
                  </div>
                </div>
              )
            )}

            {isLoading && (
              <div className="flex gap-2" aria-live="polite">
                <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white">
                  <SparklesIcon className="h-4 w-4" />
                </div>
                <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100">
                  <div className="flex items-center gap-1.5">
                    <span className="sr-only">Thinking…</span>
                    <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:150ms]" />
                    <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 bg-white px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-gray-300 bg-white px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
              <textarea
                ref={inputRef}
                rows={1}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={user ? 'Ask about scholarships…' : 'Log in to start chatting'}
                disabled={isLoading || !user}
                maxLength={1000}
                className="flex-1 resize-none bg-transparent py-1 text-base sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isLoading || !newMessage.trim() || !user}
                aria-label="Send"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-300 transition-colors"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-gray-400">
              AI can make mistakes. Check deadlines on the official website.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
