'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/app/Authentication/context/AuthContext';

interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: string;
}

export default function AIAssistant() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'ai',
      message: 'Hi! 👋 I\'m your AI scholarship assistant. I can help you find scholarships, answer questions about applications, and provide guidance. What can I help you with today?',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  // Get token directly from localStorage since it's not in AuthContext
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Don't render on server
  if (!isMounted) {
    return null;
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    // Check if user is logged in
    if (!user) {
      const loginMsg: AIMessage = {
        id: Date.now().toString(),
        type: 'ai',
        message: '🔐 You need to login to use AI search. Please log in to continue!',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, loginMsg]);
      return;
    }

    // Add user message
    const userMsg: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const messageToSend = newMessage;
    setNewMessage('');
    setIsLoading(true);

    try {
      // Call your backend AI API
      const token = getToken();
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/ai/chat/`;
      console.log('🤖 Calling AI API:', apiUrl);
      console.log('🤖 Message:', messageToSend);
      console.log('🤖 Token:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
      
      if (!token) {
        throw new Error('SESSION_EXPIRED');
      }
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      console.log('🤖 Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ AI API Error:', response.status, errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText };
        }
        
        // Handle token expiration specifically
        if (response.status === 401) {
          throw new Error('SESSION_EXPIRED');
        }
        
        throw new Error(`API Error: ${response.status} - ${errorData.error || errorText}`);
      }

      const data = await response.json();
      console.log('✅ AI Response:', data);

      const aiMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: data.message,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error('❌ AI Chat Error:', error);
      
      let errorMessage = 'Sorry, I encountered an issue. Please try again! 🤖';
      
      // Handle specific errors
      if (error instanceof Error) {
        if (error.message === 'SESSION_EXPIRED') {
          errorMessage = '🔐 Your session has expired. Please refresh the page or log out and log back in to continue.';
        }
      }
      
      const aiMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: errorMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* AI Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 group z-30"
          title="AI Assistant"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/50 via-pink-500/40 to-orange-400/30 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-1 rounded-full border border-white/40 backdrop-blur-sm" />
            <div className="relative flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/40 hover:scale-105 transition-all duration-300">
              <span className="text-2xl animate-[float_2s_ease-in-out_infinite]">🤖</span>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-xs uppercase tracking-wide opacity-80">AI Assistant</span>
                <span className="text-sm font-semibold">Ask Scholarship AI</span>
              </div>
            </div>
          </div>
        </button>
      )}

      {/* AI Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="font-semibold">AI Scholarship Assistant</h3>
                <p className="text-xs opacity-90">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded p-1 transition-all"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-purple-50 to-pink-50 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg text-sm ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{msg.message}</p>
                  <p className={`text-xs mt-1 ${msg.type === 'user' ? 'opacity-70' : 'text-gray-500'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 px-4 py-3 rounded-lg rounded-bl-none shadow-sm">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="border-t p-3 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask me anything about scholarships..."
                disabled={isLoading}
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              />
              <button
                type="submit"
                disabled={isLoading || !newMessage.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded px-3 py-2 text-sm hover:shadow-lg disabled:bg-gray-400 transition-all"
              >
                {isLoading ? '...' : '✓'}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-2 border-t text-xs text-gray-600 text-center">
            💡 Tip: Ask about scholarships, eligibility, applications & more!
          </div>
        </div>
      )}
    </>
  );
}
