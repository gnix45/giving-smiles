"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Activity, ArrowUpDown, Users, AlertTriangle, Clock } from 'lucide-react';

type WaitlistEntry = {
  id: string;
  patient_id: string;
  organ_type: string;
  priority_tier: string;
  position: number | null;
  estimated_wait: string | null;
  match_percentage: number | null;
  status: string;
  created_at: string;
  profiles?: { full_name: string; email: string } | null;
};

const priorityColors: Record<string, string> = {
  'Status 1 (Urgent)': 'bg-red-100 text-red-700',
  'Status 2 (High)': 'bg-amber-100 text-amber-700',
  'Standard': 'bg-emerald-100 text-emerald-700',
  'On Hold (Evaluating)': 'bg-gray-100 text-gray-600',
};

export default function WaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchWaitlist();
  }, []);

  async function fetchWaitlist() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('waitlist')
      .select('*, profiles:patient_id(full_name, email)')
      .order('position', { ascending: true });

    if (data) setEntries(data as WaitlistEntry[]);
    if (error) console.error('Error fetching waitlist:', error);
    setIsLoading(false);
  }

  async function updateEntry(id: string, field: string, value: string | number) {
    const { error } = await supabase.from('waitlist').update({ [field]: value }).eq('id', id);
    if (!error) {
      setEntries(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
      setEditingId(null);
    }
  }

  const urgentCount = entries.filter(e => e.priority_tier === 'Status 1 (Urgent)').length;
  const activeCount = entries.filter(e => e.status === 'Active' || e.status === 'active').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-headline font-bold text-on-surface">Waitlist Management</h1>
        <p className="text-sm text-on-surface-variant mt-1">Monitor and manage transplant priority queues.</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Entries', value: entries.length, icon: Users, color: 'text-primary' },
          { label: 'Active', value: activeCount, icon: Activity, color: 'text-emerald-600' },
          { label: 'Urgent', value: urgentCount, icon: AlertTriangle, color: 'text-red-600' },
          { label: 'Avg Position', value: entries.length > 0 ? Math.round(entries.reduce((a, e) => a + (e.position || 0), 0) / entries.length) : 0, icon: Clock, color: 'text-amber-600' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl border border-surface-container p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</span>
            </div>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Waitlist Table */}
      <div className="bg-white rounded-[2rem] border border-surface-container shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-on-surface-variant font-bold">Loading waitlist...</div>
        ) : entries.length === 0 ? (
          <div className="p-12 text-center text-on-surface-variant font-bold">No patients on the waitlist yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-container">
                  {['Pos', 'Patient', 'Organ', 'Priority', 'Match %', 'Status', 'Since'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                      <span className="flex items-center gap-1">{h} <ArrowUpDown className="w-3 h-3 opacity-40" /></span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, i) => (
                  <tr key={entry.id} className={`border-b border-surface-container/50 hover:bg-surface-container-low/50 transition-colors ${i % 2 === 0 ? '' : 'bg-surface-container-low/20'}`}>
                    <td className="px-4 py-3 font-bold text-on-surface">{entry.position || i + 1}</td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-on-surface">{(entry.profiles as any)?.full_name || 'Unknown'}</p>
                      <p className="text-xs text-on-surface-variant">{(entry.profiles as any)?.email || ''}</p>
                    </td>
                    <td className="px-4 py-3 font-bold text-primary">{entry.organ_type}</td>
                    <td className="px-4 py-3">
                      {editingId === entry.id ? (
                        <select
                          defaultValue={entry.priority_tier}
                          onChange={(e) => updateEntry(entry.id, 'priority_tier', e.target.value)}
                          onBlur={() => setEditingId(null)}
                          autoFocus
                          className="px-2 py-1 rounded-lg border text-xs font-bold"
                        >
                          <option value="Status 1 (Urgent)">Status 1 (Urgent)</option>
                          <option value="Status 2 (High)">Status 2 (High)</option>
                          <option value="Standard">Standard</option>
                          <option value="On Hold (Evaluating)">On Hold</option>
                        </select>
                      ) : (
                        <button onClick={() => setEditingId(entry.id)} className={`px-3 py-1 rounded-full text-xs font-bold ${priorityColors[entry.priority_tier] || 'bg-gray-100 text-gray-600'}`}>
                          {entry.priority_tier}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${entry.match_percentage || 0}%` }} />
                        </div>
                        <span className="text-xs font-bold text-on-surface-variant">{entry.match_percentage || 0}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${entry.status === 'Active' || entry.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-on-surface-variant">{new Date(entry.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
