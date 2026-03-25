"use client";

import React from 'react';
import { 
  Bell, 
  Search, 
  Menu,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ClinicalTopNavProps {
  onMenuClick: () => void;
  title?: string;
}

export function ClinicalTopNav({ onMenuClick, title = "Clinical Dashboard" }: ClinicalTopNavProps) {
  const { profile } = useAuth();

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
          <Stethoscope className="w-4 h-4" />
        </div>
        <h1 className="text-xl font-headline font-bold text-on-surface truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        {/* Search */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-full border border-surface-container mr-4">
          <Search className="w-4 h-4 text-on-surface-variant" />
          <input 
            type="text" 
            placeholder="Search patients, matches..." 
            className="bg-transparent border-none focus:outline-none text-sm w-48 xl:w-64 placeholder:text-on-surface-variant/70"
          />
          <div className="px-1.5 py-0.5 rounded bg-surface text-[10px] font-bold text-on-surface-variant border border-surface-container">⌘K</div>
        </div>

        <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Search className="w-5 h-5" />
        </button>

        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-surface-container ml-2">
          <div className="text-right">
            <p className="text-sm font-bold text-on-surface leading-none">{profile?.full_name || 'Staff'}</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">
              {profile?.role === 'admin' ? 'Admin' : 'Doctor'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
