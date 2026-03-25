"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Settings, User, Shield, Save, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
  const { user, profile } = useAuth();
  const supabase = createClient();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState((profile as any)?.phone || '');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone((profile as any).phone || '');
    }
  }, [profile]);

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('profiles').update({
      full_name: fullName,
      phone: phone,
    }).eq('id', user.id);
    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-headline font-bold text-on-surface">Settings</h1>
        <p className="text-sm text-on-surface-variant mt-1">Manage your profile and system preferences.</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-2xl border border-surface-container p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-surface-container">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-on-surface">Profile Information</h2>
            <p className="text-xs text-on-surface-variant">Update your personal details</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Full Name</label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none text-sm focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Email</label>
            <input type="email" value={user?.email || ''} disabled
              className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none text-sm text-on-surface-variant opacity-60 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Phone</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none text-sm focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>

        <button onClick={handleSave} disabled={saving}
          className="px-6 py-2.5 bg-primary text-white rounded-full text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50">
          {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}</>}
        </button>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-2xl border border-surface-container p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-surface-container">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-on-surface">System Information</h2>
            <p className="text-xs text-on-surface-variant">Current platform status</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Platform</p>
            <p className="text-sm font-bold text-on-surface">Giving Smiles Everyday</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Version</p>
            <p className="text-sm font-bold text-on-surface">1.0.0</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Backend</p>
            <p className="text-sm font-bold text-emerald-600">Supabase Connected</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Your Role</p>
            <p className="text-sm font-bold text-primary capitalize">{profile?.role || '...'}</p>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-surface-container p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-on-surface">Security</h2>
            <p className="text-xs text-on-surface-variant">Password management is handled through Supabase authentication.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
