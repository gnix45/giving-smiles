import React from 'react';
import { cn } from '@/src/lib/utils';
import { Sidebar } from '@/src/components/Sidebar';
import { TopNav } from '@/src/components/TopNav';
import { Shield, Bell, Lock, User, Globe, Moon } from 'lucide-react';

export const SettingsPage = () => {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar role="clinical" />
      <main className="flex-1 md:ml-64">
        <TopNav title="Settings" />
        
        <div className="p-4 md:p-8 lg:p-12 pt-24 max-w-4xl mx-auto w-full space-y-6 md:space-y-8">
          <header className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold font-headline tracking-tight text-primary">Settings</h2>
            <p className="text-on-surface-variant font-body text-sm">Manage your account preferences and security settings.</p>
          </header>

          <div className="space-y-6">
            <section className="bg-white rounded-[2rem] md:rounded-3xl p-6 md:p-8 shadow-sm border border-surface-container">
              <h3 className="text-lg md:text-xl font-headline font-bold mb-4 md:mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Profile Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Full Name</label>
                  <input type="text" defaultValue="Dr. Sarah Chen" className="w-full p-3 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email Address</label>
                  <input type="email" defaultValue="s.chen@beacon-clinical.org" className="w-full p-3 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[2rem] md:rounded-3xl p-6 md:p-8 shadow-sm border border-surface-container">
              <h3 className="text-lg md:text-xl font-headline font-bold mb-4 md:mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Security & Privacy
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Lock, title: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account.', active: true },
                  { icon: Bell, title: 'Login Notifications', desc: 'Get notified of new login attempts.', active: true },
                  { icon: Globe, title: 'Public Profile', desc: 'Allow others to see your professional credentials.', active: false },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-surface-container-low rounded-2xl gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{item.title}</p>
                        <p className="text-xs text-on-surface-variant">{item.desc}</p>
                      </div>
                    </div>
                    <button className={cn(
                      "w-12 h-6 rounded-full relative transition-colors shrink-0 self-end sm:self-auto",
                      item.active ? "bg-primary" : "bg-slate-300"
                    )}>
                      <div className={cn(
                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                        item.active ? "right-1" : "left-1"
                      )} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-[2rem] md:rounded-3xl p-6 md:p-8 shadow-sm border border-surface-container">
              <h3 className="text-lg md:text-xl font-headline font-bold mb-4 md:mb-6 flex items-center gap-2">
                <Moon className="w-5 h-5 text-primary" />
                Preferences
              </h3>
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                <div>
                  <p className="font-bold text-sm">Dark Mode</p>
                  <p className="text-xs text-on-surface-variant">Switch between light and dark themes.</p>
                </div>
                <button className="w-12 h-6 rounded-full bg-slate-300 relative">
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" />
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
