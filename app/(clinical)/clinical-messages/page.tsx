"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { Send, Search, UserCircle, Activity } from 'lucide-react';
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

export default function ClinicalMessages() {
  const { profile } = useAuth();
  const supabase = createClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [patients, setPatients] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Load available patients to chat with
  useEffect(() => {
    async function loadPatients() {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, role, avatar_url')
        .eq('role', 'patient');
        
      if (!error && data) {
        setPatients(data);
      }
    }
    loadPatients();
  }, [supabase]);

  // 2. Load messages when a user is selected
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
          // Only add if it belongs to this conversation
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
    setNewMessage(''); // optimistic clear

    try {
      const { error } = await supabase.from('messages').insert({
        sender_id: profile.id,
        receiver_id: selectedUser.id,
        content: msgContent
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
      // Revert if failed
      setNewMessage(msgContent); 
    }
  };

  const filteredPatients = patients.filter(p => 
    p.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-[2rem] border border-surface-container shadow-sm overflow-hidden animate-in fade-in duration-500">
      
      {/* Sidebar: Patient List */}
      <div className="w-1/3 min-w-[300px] border-r border-surface-container flex flex-col bg-surface-container-lowest">
        <div className="p-4 border-b border-surface-container">
          <h2 className="font-headline font-bold text-lg mb-4 text-on-surface">Secure Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low rounded-full border-none focus:ring-2 focus:ring-primary/20 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto w-full">
          {filteredPatients.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedUser(p)}
              className={cn(
                "w-full text-left p-4 flex items-center gap-4 transition-colors border-b border-surface-container/50",
                selectedUser?.id === p.id ? "bg-primary/5" : "hover:bg-surface-container-low"
              )}
            >
              <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden shrink-0 relative">
                 {p.avatar_url ? (
                  <Image src={p.avatar_url} alt="Avatar" fill style={{ objectFit: 'cover' }} unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                    {p.full_name?.charAt(0) || 'P'}
                  </div>
                )}
              </div>
              <div className="overflow-hidden">
                <p className={cn("font-bold truncate text-sm", selectedUser?.id === p.id ? "text-primary" : "text-on-surface")}>
                  {p.full_name || 'Unknown Patient'}
                </p>
                <div className="flex items-center gap-1 mt-1 text-[10px] uppercase tracking-wider text-on-surface-variant">
                  <Activity className="w-3 h-3 text-green-500" /> Waitlist Active
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-surface">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-surface-container flex items-center gap-4 shrink-0">
              <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden shrink-0 relative">
                 {selectedUser.avatar_url ? (
                  <Image src={selectedUser.avatar_url} alt="Avatar" fill style={{ objectFit: 'cover' }} unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                    {selectedUser.full_name?.charAt(0) || 'P'}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-headline font-bold text-on-surface leading-tight text-lg">{selectedUser.full_name}</h3>
                <p className="text-xs text-on-surface-variant font-medium">Patient # {selectedUser.id.substring(0,8)}</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-on-surface-variant space-y-4">
                  <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center">
                    <UserCircle className="w-8 h-8 opacity-50" />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">No messages yet.</p>
                    <p className="text-sm mt-1">Send a message to start the conversation securely.</p>
                  </div>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMine = msg.sender_id === profile?.id;
                  return (
                    <div key={msg.id} className={cn("flex", isMine ? "justify-end" : "justify-start")}>
                      <div className={cn(
                        "max-w-[75%] px-5 py-3 rounded-2xl",
                        isMine 
                          ? "bg-primary text-white rounded-br-sm" 
                          : "bg-surface-container-low text-on-surface border border-surface-container rounded-bl-sm"
                      )}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        <p className={cn(
                          "text-[10px] mt-2 font-medium uppercase tracking-wider",
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
            <div className="p-4 bg-white border-t border-surface-container shrink-0">
              <form onSubmit={handleSendMessage} className="flex gap-4">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a secure message..." 
                  className="flex-1 px-6 py-4 bg-surface-container-low rounded-full border-none focus:ring-2 focus:ring-primary/20 text-sm"
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shrink-0 hover:bg-primary-container transition-colors disabled:opacity-50 disabled:hover:bg-primary"
                >
                  <Send className="w-5 h-5 -ml-1" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-on-surface-variant space-y-4">
             <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mb-2">
                <Search className="w-8 h-8 opacity-30" />
              </div>
            <h3 className="text-lg font-headline font-bold text-on-surface">Select a Patient</h3>
            <p className="text-sm">Choose a patient from the sidebar to view their messages or start a new secure conversation.</p>
          </div>
        )}
      </div>
    </div>
  );
}
