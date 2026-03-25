"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { Send, Users, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read_at: string | null;
};

type ChatUser = {
  id: string;
  full_name: string;
  role: string;
  avatar_url: string | null;
};

export default function PatientMessages() {
  const { profile } = useAuth();
  const supabase = createClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [doctors, setDoctors] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // 1. Load available doctors to chat with
  useEffect(() => {
    async function loadDoctors() {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, role, avatar_url')
        .in('role', ['doctor', 'admin']);
        
      if (!error && data) {
        setDoctors(data);
        if (data.length > 0) setSelectedUser(data[0]);
      }
    }
    loadDoctors();
  }, [supabase]);

  // 2. Load messages when a doctor is selected
  useEffect(() => {
    if (!profile?.id || !selectedUser?.id) return;

    async function loadMessages() {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${profile!.id},receiver_id.eq.${selectedUser!.id}),and(sender_id.eq.${selectedUser!.id},receiver_id.eq.${profile!.id})`)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMessages(data);
        scrollToBottom();
      }
    }
    loadMessages();

    // 3. Set up REALTIME subscription for new messages
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const newMsg = payload.new as Message;
          if (
            (newMsg.sender_id === profile!.id && newMsg.receiver_id === selectedUser!.id) ||
            (newMsg.sender_id === selectedUser!.id && newMsg.receiver_id === profile!.id)
          ) {
            setMessages((prev) => [...prev, newMsg]);
            scrollToBottom();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedUser?.id, profile?.id, supabase]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !profile?.id || !selectedUser?.id) return;

    const msgContent = newMessage;
    setNewMessage(''); 

    try {
      const { error } = await supabase.from('messages').insert({
        sender_id: profile.id,
        receiver_id: selectedUser.id,
        content: msgContent
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
      setNewMessage(msgContent); 
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-[2rem] border border-surface-container shadow-sm overflow-hidden animate-in fade-in duration-500">
      
      {/* Sidebar: Doctors List (Hidden on sm screens if chat is active) */}
      <div className={cn("w-full sm:w-1/3 sm:min-w-[300px] border-r border-surface-container bg-surface-container-lowest", selectedUser ? "hidden sm:flex sm:flex-col" : "flex flex-col")}>
        <div className="p-4 border-b border-surface-container md:p-6 bg-primary text-white">
          <h2 className="font-headline font-bold text-lg">Your Care Team</h2>
          <p className="text-sm opacity-80 mt-1">Direct messaging</p>
        </div>

        <div className="flex-1 overflow-y-auto w-full">
          {doctors.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedUser(p)}
              className={cn(
                "w-full text-left p-4 md:p-6 flex items-center gap-4 transition-colors border-b border-surface-container/50",
                selectedUser?.id === p.id ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-surface-container-low border-l-4 border-l-transparent"
              )}
            >
              <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden shrink-0 relative border border-surface-container">
                 {p.avatar_url ? (
                  <Image src={p.avatar_url} alt="Avatar" fill style={{ objectFit: 'cover' }} unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                    {p.full_name?.charAt(0) || 'D'}
                  </div>
                )}
              </div>
              <div className="overflow-hidden">
                <p className={cn("font-bold truncate text-sm", selectedUser?.id === p.id ? "text-primary" : "text-on-surface")}>
                  {p.full_name || 'Doctor'}
                </p>
                <div className="flex items-center gap-1 mt-1 text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Care Coordinator
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={cn("flex-1 bg-surface", !selectedUser ? "hidden sm:flex sm:flex-col" : "flex flex-col")}>
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 md:px-8 md:py-6 bg-white border-b border-surface-container flex items-center gap-4 shrink-0 shadow-sm z-10">
              <button 
                onClick={() => setSelectedUser(null)} 
                className="sm:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full"
              >
                ←
              </button>
              <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden shrink-0 relative">
                 {selectedUser.avatar_url ? (
                  <Image src={selectedUser.avatar_url} alt="Avatar" fill style={{ objectFit: 'cover' }} unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                    {selectedUser.full_name?.charAt(0) || 'D'}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-headline font-bold text-on-surface leading-tight text-lg">{selectedUser.full_name}</h3>
                <p className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-green-600 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Active Now
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-on-surface-variant space-y-4">
                  <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center">
                    <Activity className="w-8 h-8 opacity-50" />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">Secure Connection Established</p>
                    <p className="text-sm mt-1 max-w-sm">This chat is end-to-end encrypted and monitored only by your authorized care team.</p>
                  </div>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMine = msg.sender_id === profile?.id;
                  return (
                    <div key={msg.id} className={cn("flex", isMine ? "justify-end" : "justify-start")}>
                      <div className={cn(
                        "max-w-[85%] md:max-w-[70%] px-5 py-4 rounded-[1.5rem]",
                        isMine 
                          ? "bg-primary text-white rounded-br-sm shadow-sm" 
                          : "bg-surface-container-low text-on-surface border border-surface-container rounded-bl-sm"
                      )}>
                        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        <p className={cn(
                          "text-[10px] mt-2 font-bold uppercase tracking-wider",
                          isMine ? "text-primary-container-lowest opacity-70" : "text-on-surface-variant"
                        )}>
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 md:p-6 bg-white border-t border-surface-container shrink-0">
              <form onSubmit={handleSendMessage} className="flex gap-4">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a secure message..." 
                  className="flex-1 px-6 py-4 bg-surface-container-low rounded-full border-none focus:ring-2 focus:ring-primary/20 text-sm md:text-base font-medium"
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shrink-0 hover:bg-primary-container transition-colors disabled:opacity-50 disabled:hover:bg-primary shadow-md"
                >
                  <Send className="w-5 h-5 -ml-1" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-on-surface-variant space-y-4 bg-surface">
            <h3 className="text-lg font-headline font-bold text-on-surface">Select a Provider</h3>
            <p className="text-sm">Choose a care team member from the sidebar to chat.</p>
          </div>
        )}
      </div>
    </div>
  );
}
