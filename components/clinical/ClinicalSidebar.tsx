"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  ArrowLeftRight, 
  Hospital, 
  Truck, 
  Settings, 
  Plus,
  X,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

interface ClinicalSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ClinicalSidebar({ isOpen, setIsOpen }: ClinicalSidebarProps) {
  const pathname = usePathname();
  const { profile } = useAuth();

  const links = [
    { href: '/clinical-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/clinical-patients', icon: Users, label: 'Patient Management' },
    { href: '/clinical-waitlist', icon: Hospital, label: 'Waitlist' },
    { href: '/clinical-matches', icon: ArrowLeftRight, label: 'Matches' },
    { href: '/clinical-appointments', icon: Calendar, label: 'Appointments' },
    { href: '/clinical-fleet', icon: Truck, label: 'Fleet Logistics' },
    { href: '/clinical-messages', icon: MessageSquare, label: 'Messages' },
    { href: '/clinical-settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={cn(
        "flex flex-col h-screen w-64 bg-surface border-r border-surface-container p-4 space-y-2 fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="mb-6 px-4 py-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black text-primary font-headline">Clinical Portal</h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">Operations Center</p>
          </div>
          <button 
            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
          {links.map((link) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive 
                    ? "text-primary font-bold bg-white shadow-sm border-r-4 border-primary" 
                    : "text-slate-500 hover:text-primary hover:bg-white/50"
                )}
              >
                <link.icon className={cn("w-5 h-5", isActive ? "text-primary" : "")} />
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 mt-4 border-t border-surface-container space-y-4 shrink-0">
          <Link 
            href="/clinical/match-request"
            className="w-full bg-primary text-white rounded-full py-3 px-4 font-bold text-sm flex items-center justify-center space-x-2 active:scale-95 transition-all shadow-lg shadow-primary/10 hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            <span>New Match Request</span>
          </Link>

          <div className="flex items-center justify-between p-2 bg-surface-container-low rounded-xl border border-surface-container line-clamp-1">
            <div className="flex items-center space-x-3 truncate">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0 relative">
                 <Image 
                  src={profile?.avatar_url || "https://picsum.photos/seed/doctor/100/100"} 
                  alt="Profile" 
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold truncate text-on-surface">
                  {profile?.full_name || 'Medical Staff'}
                </p>
                <p className="text-[10px] text-on-surface-variant truncate uppercase tracking-wider">
                  {profile?.role === 'admin' ? 'Administrator' : 'Doctor'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
