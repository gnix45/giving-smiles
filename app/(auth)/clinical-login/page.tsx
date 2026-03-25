"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Activity,
  Network
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function ClinicalLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Verify role is doctor or admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile?.role !== 'doctor' && profile?.role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error('Unauthorized: Clinical access only');
      }

      router.push('/clinical-dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-bl-full pointer-events-none"></div>

      <div className="max-w-md w-full z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-surface-container space-y-8"
        >
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
              <Activity className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-headline font-bold text-on-surface">Clinical Operations</h1>
            <p className="text-sm text-on-surface-variant">Authorized medical personnel only.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-bold text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-2">Staff Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@hospital.org" 
                className="w-full px-6 py-4 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full px-6 py-4 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-primary text-white rounded-full font-headline font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Access Portal'}
            </button>
          </form>

          <div className="text-center pt-6 border-t border-surface-container flex items-center justify-center gap-2 text-xs text-on-surface-variant">
            <Network className="w-4 h-4" /> Secure End-to-End Encrypted Tunnel
          </div>
        </motion.div>
      </div>
    </div>
  );
}
