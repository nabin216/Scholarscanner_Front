'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/app/Authentication/context/AuthContext';

interface Message {
  id: number;
  sender: 'user' | 'support' | 'system';
  sender_user_name: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface ChatRoom {
  id: number;
  user: number;
  user_name: string;
  user_email: string;
  support_agent: number | null;
  support_agent_name: string;
  is_active: boolean;
  messages: Message[];
  created_at: string;
  updated_at: string;
}

interface LiveChatProps {
  defaultOpen?: boolean;
}

export default function LiveChat({ defaultOpen = false }: LiveChatProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sync with defaultOpen prop
  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  // Create or fetch chat room when component mounts
  useEffect(() => {
    if (user && isOpen) {
      initializeChat();
    }
  }, [isOpen, user]);

  // Poll for new messages
  useEffect(() => {
    if (!chatRoom || !isOpen) return;

    const interval = setInterval(() => {
      fetchMessages();
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(interval);
  }, [chatRoom, isOpen]);

  const initializeChat = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/livechat/chat-rooms/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to initialize chat');

      const data = await response.json();
      setChatRoom(data);
      setMessages(data.messages || []);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async () => {
    if (!chatRoom) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/livechat/chat-rooms/${chatRoom.id}/messages/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch messages');

      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !chatRoom) return;

    try {
      setIsLoading(true);
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/livechat/chat-rooms/${chatRoom.id}/send_message/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: newMessage }),
        }
      );

      if (!response.ok) throw new Error('Failed to send message');

      setNewMessage('');
      await fetchMessages(); // Refresh messages immediately
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseChat = async () => {
    if (!chatRoom) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/livechat/chat-rooms/${chatRoom.id}/close_chat/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to close chat');

      setChatRoom(null);
      setMessages([]);
      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to close chat');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all z-40 flex items-center gap-2"
        >
          <span className="text-2xl">💬</span>
          <span className="hidden sm:inline">Live Chat</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Live Chat Support</h3>
              <p className="text-xs opacity-90">
                {chatRoom?.support_agent_name ? `Connected to ${chatRoom.support_agent_name}` : 'Waiting for support...'}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700 rounded p-1"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
                {error}
              </div>
            )}

            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p className="text-center text-sm">
                  No messages yet. Start the conversation!
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-800'
                    }`}
                  >
                    {msg.sender !== 'user' && (
                      <p className="text-xs font-semibold mb-1">
                        {msg.sender_user_name}
                      </p>
                    )}
                    <p>{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {chatRoom?.is_active ? (
            <form onSubmit={handleSendMessage} className="border-t p-3 bg-white rounded-b-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  disabled={isLoading}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
                <button
                  type="submit"
                  disabled={isLoading || !newMessage.trim()}
                  className="bg-blue-600 text-white rounded px-3 py-2 text-sm hover:bg-blue-700 disabled:bg-gray-400 transition-all"
                >
                  {isLoading ? '...' : 'Send'}
                </button>
              </div>
            </form>
          ) : (
            <div className="border-t p-3 bg-gray-100 rounded-b-lg text-center">
              <button
                onClick={handleCloseChat}
                className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
              >
                Chat Ended - Click to close
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
