"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Calendar, UserCheck, Clock, ChevronDown, ChevronUp, Search } from 'lucide-react';
import Link from 'next/link';

type Appointment = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  organ_needed: string;
  blood_type: string;
  diagnosis: string;
  status: string;
  created_at: string;
  allergies: string | null;
  medications: string | null;
  previous_transplant: boolean;
  dialysis_status: boolean;
};

const statusConfig: Record<string, { bg: string; text: string }> = {
  pending: { bg: 'bg-amber-100', text: 'text-amber-700' },
  confirmed: { bg: 'bg-blue-100', text: 'text-blue-700' },
  completed: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const supabase = createClient();

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setAppointments(data as Appointment[]);
    if (error) console.error('Error fetching appointments:', error);
    setIsLoading(false);
  }

  async function updateStatus(id: string, newStatus: string) {
    const { error } = await supabase.from('appointments').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    }
  }

  const filtered = appointments
    .filter(a => filter === 'all' || a.status === filter)
    .filter(a => search === '' || `${a.first_name} ${a.last_name} ${a.email}`.toLowerCase().includes(search.toLowerCase()));

  const counts = {
    all: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-headline font-bold text-on-surface">Appointment Management</h1>
        <p className="text-sm text-on-surface-variant mt-1">Review and manage evaluation requests from patients.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {(['all', 'pending', 'confirmed', 'completed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === tab ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
          >
            {tab} ({counts[tab]})
          </button>
        ))}

        <div className="ml-auto relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-surface-container-low rounded-full text-sm border-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="bg-white rounded-[2rem] border border-surface-container p-12 text-center text-on-surface-variant font-bold shadow-sm">Loading appointments...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-[2rem] border border-surface-container p-12 text-center text-on-surface-variant font-bold shadow-sm">No appointments found.</div>
        ) : (
          filtered.map(appt => {
            const sc = statusConfig[appt.status] || statusConfig.pending;
            const isExpanded = expandedId === appt.id;

            return (
              <div key={appt.id} className="bg-white rounded-2xl border border-surface-container shadow-sm overflow-hidden">
                {/* Summary Row */}
                <button onClick={() => setExpandedId(isExpanded ? null : appt.id)} className="w-full p-4 flex items-center gap-4 text-left hover:bg-surface-container-low/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-on-surface truncate">{appt.first_name} {appt.last_name}</p>
                    <p className="text-xs text-on-surface-variant">{appt.email} • {appt.phone}</p>
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-xs font-bold text-primary">{appt.organ_needed}</p>
                    <p className="text-xs text-on-surface-variant">Blood: {appt.blood_type}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${sc.bg} ${sc.text}`}>{appt.status}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-on-surface-variant shrink-0" /> : <ChevronDown className="w-4 h-4 text-on-surface-variant shrink-0" />}
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-surface-container pt-4 space-y-4 animate-in fade-in duration-300">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: 'Organ Needed', value: appt.organ_needed },
                        { label: 'Blood Type', value: appt.blood_type },
                        { label: 'Dialysis', value: appt.dialysis_status ? 'Yes' : 'No' },
                        { label: 'Prev. Transplant', value: appt.previous_transplant ? 'Yes' : 'No' },
                      ].map(d => (
                        <div key={d.label}>
                          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{d.label}</p>
                          <p className="text-sm font-bold text-on-surface mt-0.5">{d.value}</p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Diagnosis</p>
                      <p className="text-sm text-on-surface mt-0.5">{appt.diagnosis || 'Not provided'}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Allergies</p>
                        <p className="text-sm text-red-600 font-bold mt-0.5">{appt.allergies || 'None reported'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Medications</p>
                        <p className="text-sm text-on-surface mt-0.5">{appt.medications || 'None listed'}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-surface-container">
                      {appt.status === 'pending' && (
                        <>
                          <button onClick={() => updateStatus(appt.id, 'confirmed')} className="px-4 py-2 bg-primary text-white rounded-full text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1">
                            <UserCheck className="w-3 h-3" /> Confirm
                          </button>
                          <Link href={`/clinical-patients/new?appointment=${appt.id}`} className="px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold hover:opacity-90 transition-opacity">
                            Create Patient Account
                          </Link>
                        </>
                      )}
                      {appt.status === 'confirmed' && (
                        <button onClick={() => updateStatus(appt.id, 'completed')} className="px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Mark Completed
                        </button>
                      )}
                      <span className="text-[10px] text-on-surface-variant ml-auto">Submitted {new Date(appt.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
