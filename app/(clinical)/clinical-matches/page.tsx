"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Dna, CheckCircle, XCircle, Plus, X, Users, Search } from 'lucide-react';

type Match = {
  id: string; patient_id: string; donor_id: string | null; organ_type: string;
  confidence: number | null; hla_typing: string | null; distance: string | null;
  urgency: string | null; status: string; created_at: string;
  profiles?: { full_name: string; email: string } | null;
};

const statusTabs = ['All', 'Pending', 'Approved', 'Rejected'];

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [showForm, setShowForm] = useState(false);

  // New match form
  const [selectedPatient, setSelectedPatient] = useState('');
  const [organType, setOrganType] = useState('Kidney');
  const [confidence, setConfidence] = useState(75);
  const [urgency, setUrgency] = useState('Standard');
  const [creating, setCreating] = useState(false);

  const supabase = createClient();

  useEffect(() => { fetchMatches(); fetchPatients(); }, []);

  async function fetchMatches() {
    setIsLoading(true);
    const { data } = await supabase.from('matches')
      .select('*, profiles:patient_id(full_name, email)')
      .order('created_at', { ascending: false });
    if (data) setMatches(data as Match[]);
    setIsLoading(false);
  }

  async function fetchPatients() {
    const { data } = await supabase.from('profiles').select('id, full_name, email').eq('role', 'patient');
    if (data) setPatients(data);
  }

  async function updateMatchStatus(id: string, newStatus: string, patientId: string) {
    const dbStatus = newStatus.toLowerCase(); // 'approved' or 'rejected'
    const { error } = await supabase.from('matches').update({ status: dbStatus }).eq('id', id);
    if (!error) {
      setMatches(prev => prev.map(m => m.id === id ? { ...m, status: dbStatus } : m));
      
      // If approved, update waitlist match_percentage and status
      if (newStatus === 'Approved') {
        const match = matches.find(m => m.id === id);
        await supabase.from('waitlist').update({
          match_percentage: match?.confidence || 95,
          status: 'matched'
        }).eq('patient_id', patientId);
      }
    }
  }

  async function handleCreateMatch(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPatient) return;
    setCreating(true);

    const { error } = await supabase.from('matches').insert({
      id: crypto.randomUUID(),
      patient_id: selectedPatient,
      organ_type: organType,
      confidence: confidence,
      status: 'pending',
      urgency: urgency,
      hla_typing: `HLA-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      distance_miles: Math.floor(Math.random() * 200 + 10),
    });

    if (!error) {
      setShowForm(false);
      setSelectedPatient('');
      setConfidence(75);
      await fetchMatches();
    } else {
      alert('Error: ' + error.message);
    }
    setCreating(false);
  }

  const filtered = activeTab === 'All' ? matches : matches.filter(m => m.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-bold text-on-surface">Organ Matching</h1>
          <p className="text-sm text-on-surface-variant mt-1">Create, review, and approve organ compatibility matches.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-6 py-2.5 rounded-full font-bold shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2">
          {showForm ? <><X className="w-4 h-4" /> Cancel</> : <><Plus className="w-4 h-4" /> New Match Request</>}
        </button>
      </div>

      {/* Create Match Form */}
      {showForm && (
        <form onSubmit={handleCreateMatch} className="bg-white rounded-2xl border border-primary/30 p-6 shadow-lg shadow-primary/5 space-y-4">
          <h2 className="font-bold text-on-surface flex items-center gap-2"><Dna className="w-5 h-5 text-primary" /> Create Match Request</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Patient</label>
              <select value={selectedPatient} onChange={e => setSelectedPatient(e.target.value)} required
                className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none text-sm font-bold focus:ring-2 focus:ring-primary/20">
                <option value="">Select Patient...</option>
                {patients.map(p => <option key={p.id} value={p.id}>{p.full_name || p.email}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Organ Type</label>
              <select value={organType} onChange={e => setOrganType(e.target.value)}
                className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none text-sm font-bold focus:ring-2 focus:ring-primary/20">
                {['Kidney','Liver','Heart','Lung','Pancreas','Cornea'].map(o=><option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Confidence: {confidence}%</label>
              <input type="range" min="0" max="100" value={confidence} onChange={e => setConfidence(Number(e.target.value))}
                className="w-full h-2 bg-surface-container rounded-full appearance-none cursor-pointer accent-primary mt-2" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Urgency</label>
              <select value={urgency} onChange={e => setUrgency(e.target.value)}
                className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none text-sm font-bold focus:ring-2 focus:ring-primary/20">
                <option value="Critical">Critical</option><option value="High">High</option><option value="Standard">Standard</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={creating} className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:opacity-90 disabled:opacity-50 flex items-center gap-2">
            <Dna className="w-4 h-4" /> {creating ? 'Creating...' : 'Submit Match Request'}
          </button>
        </form>
      )}

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
        <div className="bg-white rounded-[2rem] border border-surface-container p-12 text-center text-on-surface-variant font-bold shadow-sm">
          No matches found. Use the "New Match Request" button to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(match => (
            <div key={match.id} className="bg-white rounded-2xl border border-surface-container p-5 shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-on-surface">{(match.profiles as any)?.full_name || 'Unknown Patient'}</p>
                  <p className="text-xs text-on-surface-variant">{(match.profiles as any)?.email || ''}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${match.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : match.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{match.status}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Organ</p><p className="text-sm font-bold text-primary">{match.organ_type}</p></div>
                <div><p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Donor ID</p><p className="text-sm font-bold text-on-surface font-mono">{match.donor_id || 'Pending'}</p></div>
                <div><p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">HLA Typing</p><p className="text-sm text-on-surface">{match.hla_typing || 'N/A'}</p></div>
                <div><p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Urgency</p><p className="text-sm font-bold text-red-600">{match.urgency || 'Standard'}</p></div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Confidence</p>
                  <p className="text-sm font-bold text-primary">{match.confidence || 0}%</p>
                </div>
                <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all duration-500" style={{ width: `${match.confidence || 0}%` }} />
                </div>
              </div>

              {match.status === 'pending' && (
                <div className="flex gap-2 pt-2 border-t border-surface-container">
                  <button onClick={() => updateMatchStatus(match.id, 'Approved', match.patient_id)} className="flex-1 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold hover:opacity-90 flex items-center justify-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Approve
                  </button>
                  <button onClick={() => updateMatchStatus(match.id, 'Rejected', match.patient_id)} className="flex-1 py-2 bg-red-500 text-white rounded-full text-xs font-bold hover:opacity-90 flex items-center justify-center gap-1">
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
