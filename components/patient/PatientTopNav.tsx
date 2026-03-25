"use client";

import React from 'react';
import { 
  Bell, 
  Menu,
  Heart
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface PatientTopNavProps {
  onMenuClick: () => void;
  title?: string;
}

export function PatientTopNav({ onMenuClick, title = "Patient Dashboard" }: PatientTopNavProps) {
  const { profile } = useAuth();
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-surface-container bg-white/80 backdrop-blur-md px-4 sm:px-6">
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex w-8 h-8 rounded-lg bg-primary/10 items-center justify-center text-primary">
          <Heart className="w-4 h-4" />
        </div>
        <h1 className="text-xl font-headline font-bold text-on-surface truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          {/* Mock notification dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-surface-container ml-2">
          <button 
            onClick={handleSignOut}
            className="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
