"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Dna, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

type Match = {
  id: string;
  patient_id: string;
  donor_id: string | null;
  organ_type: string;
  confidence: number | null;
  hla_typing: string | null;
  distance: string | null;
  urgency: string | null;
  status: string;
  created_at: string;
  profiles?: { full_name: string; email: string } | null;
};

const statusTabs = ['All', 'Evaluating', 'Approved', 'Rejected'];

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const supabase = createClient();

  useEffect(() => { fetchMatches(); }, []);

  async function fetchMatches() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('matches')
      .select('*, profiles:patient_id(full_name, email)')
      .order('created_at', { ascending: false });

    if (data) setMatches(data as Match[]);
    if (error) console.error('Error fetching matches:', error);
    setIsLoading(false);
  }

  async function updateMatchStatus(id: string, newStatus: string) {
    const { error } = await supabase.from('matches').update({ status: newStatus }).eq('id', id);
    if (!error) setMatches(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
  }

  const filtered = activeTab === 'All' ? matches : matches.filter(m => m.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-headline font-bold text-on-surface">Organ Matching</h1>
        <p className="text-sm text-on-surface-variant mt-1">Review and approve organ compatibility matches.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {statusTabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Match Cards */}
      {isLoading ? (
        <div className="bg-white rounded-[2rem] border border-surface-container p-12 text-center text-on-surface-variant font-bold shadow-sm">Loading matches...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-[2rem] border border-surface-container p-12 text-center text-on-surface-variant font-bold shadow-sm">No matches found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(match => (
            <div key={match.id} className="bg-white rounded-2xl border border-surface-container p-5 shadow-sm space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-on-surface">{(match.profiles as any)?.full_name || 'Unknown Patient'}</p>
                  <p className="text-xs text-on-surface-variant">{(match.profiles as any)?.email || ''}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${match.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : match.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{match.status}</span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Organ</p>
                  <p className="text-sm font-bold text-primary">{match.organ_type}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Donor ID</p>
                  <p className="text-sm font-bold text-on-surface font-mono">{match.donor_id || 'Pending'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">HLA Typing</p>
                  <p className="text-sm text-on-surface">{match.hla_typing || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Distance</p>
                  <p className="text-sm text-on-surface">{match.distance || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Urgency</p>
                  <p className="text-sm font-bold text-red-600">{match.urgency || 'Standard'}</p>
                </div>
              </div>

              {/* Confidence Bar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Confidence</p>
                  <p className="text-sm font-bold text-primary">{match.confidence || 0}%</p>
                </div>
                <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all duration-500" style={{ width: `${match.confidence || 0}%` }} />
                </div>
              </div>

              {/* Actions */}
              {match.status === 'Evaluating' && (
                <div className="flex gap-2 pt-2 border-t border-surface-container">
                  <button onClick={() => updateMatchStatus(match.id, 'Approved')} className="flex-1 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold hover:opacity-90 flex items-center justify-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Approve
                  </button>
                  <button onClick={() => updateMatchStatus(match.id, 'Rejected')} className="flex-1 py-2 bg-red-500 text-white rounded-full text-xs font-bold hover:opacity-90 flex items-center justify-center gap-1">
                    <XCircle className="w-3 h-3" /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
