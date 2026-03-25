"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Heart, Activity, Calendar, MessageSquare, Save, CheckCircle, AlertTriangle, Dna } from 'lucide-react';
import Link from 'next/link';

export default function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [patientId, setPatientId] = useState('');
  const [patient, setPatient] = useState<any>(null);
  const [waitlistEntry, setWaitlistEntry] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [status, setStatus] = useState('');
  const [organNeeded, setOrganNeeded] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [priority, setPriority] = useState('');
  const [waitlistStatus, setWaitlistStatus] = useState('');
  const [matchPercentage, setMatchPercentage] = useState(0);

  const supabase = createClient();
  const { profile } = useAuth();

  useEffect(() => { params.then(p => setPatientId(p.id)); }, [params]);
  useEffect(() => { if (patientId) loadPatientData(); }, [patientId]);

  async function loadPatientData() {
    setIsLoading(true);
    try {
      const { data: pd } = await supabase.from('patients')
        .select('*, profiles:profile_id(full_name, email, avatar_url)').eq('profile_id', patientId).single();
      if (pd) { setPatient(pd); setOrganNeeded(pd.organ_needed || ''); setBloodType(pd.blood_type || ''); setStatus(pd.status || 'active'); }

      const { data: wl } = await supabase.from('waitlist').select('*').eq('patient_id', patientId).single();
      if (wl) { setWaitlistEntry(wl); setPriority(wl.priority_tier || 'Standard'); setWaitlistStatus(wl.status || 'active'); setMatchPercentage(wl.match_percentage || 0); }

      const { data: ap } = await supabase.from('appointments').select('*').eq('patient_id', patientId).order('created_at', { ascending: false }).limit(5);
      setAppointments(ap || []);
    } catch (err) { console.error('Error:', err); } finally { setIsLoading(false); }
  }

  async function handleSave() {
    if (!patientId) return;
    setSaving(true);
    try {
      await supabase.from('patients').update({ organ_needed: organNeeded, blood_type: bloodType, status }).eq('profile_id', patientId);
      if (waitlistEntry) {
        await supabase.from('waitlist').update({ priority_tier: priority, status: waitlistStatus, organ_type: organNeeded, match_percentage: matchPercentage }).eq('id', waitlistEntry.id);
      }
      setSaved(true); setTimeout(() => setSaved(false), 3000);
      await loadPatientData();
    } catch (err) { console.error('Save error:', err); } finally { setSaving(false); }
  }

  async function createMatchRequest() {
    if (!patientId) return;
    const { error } = await supabase.from('matches').insert({
      id: crypto.randomUUID(),
      patient_id: patientId, organ_type: organNeeded || 'Kidney', confidence: matchPercentage, status: 'Evaluating',
      urgency: priority === 'Status 1 (Urgent)' ? 'Critical' : priority === 'Status 2 (High)' ? 'High' : 'Standard',
      hla_typing: `HLA-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    });
    if (!error) alert('Match request created! Go to Matches page to view.'); else alert('Error: ' + error.message);
  }

  async function scheduleAppointment() {
    if (!patientId || !profile?.id) return;
    const date = prompt('Enter appointment date (YYYY-MM-DD):');
    if (!date) return;
    const { error } = await supabase.from('appointments').insert({
      patient_id: patientId, assigned_doctor_id: profile.id, status: 'confirmed',
      appointment_date: new Date(date).toISOString(),
      first_name: patient?.profiles?.full_name?.split(' ')[0] || '', last_name: patient?.profiles?.full_name?.split(' ').slice(1).join(' ') || '',
      email: patient?.profiles?.email || '', organ_needed: organNeeded, blood_type: bloodType,
    });
    if (!error) { await loadPatientData(); alert('Appointment scheduled!'); } else alert('Error: ' + error.message);
  }

  if (isLoading) return <div className="p-12 text-center text-on-surface-variant font-bold">Loading patient profile...</div>;
  if (!patient) return (
    <div className="p-12 text-center space-y-4">
      <p className="text-on-surface-variant font-bold">Patient not found.</p>
      <Link href="/clinical-patients" className="text-primary font-bold hover:underline">← Back to Patient List</Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link href="/clinical-patients" className="p-2 hover:bg-surface-container rounded-xl transition-colors"><ArrowLeft className="w-5 h-5 text-on-surface-variant" /></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-headline font-bold text-on-surface">{patient.profiles?.full_name || 'Unknown'}</h1>
          <p className="text-sm text-on-surface-variant">{patient.profiles?.email} • ID: {patientId.substring(0, 8)}</p>
        </div>
        <Link href="/clinical-messages" className="px-4 py-2 bg-surface-container-low text-on-surface rounded-full text-xs font-bold hover:bg-surface-container transition-colors flex items-center gap-1">
          <MessageSquare className="w-3 h-3" /> Message
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Medical Profile */}
          <div className="bg-white rounded-2xl border border-surface-container p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container">
              <div className="flex items-center gap-2"><Heart className="w-5 h-5 text-primary" /><h2 className="font-bold text-on-surface">Medical Profile</h2></div>
              <button onClick={handleSave} disabled={saving} className="px-5 py-2 bg-primary text-white rounded-full text-xs font-bold hover:opacity-90 flex items-center gap-1 disabled:opacity-50">
                {saved ? <><CheckCircle className="w-3 h-3" /> Saved!</> : <><Save className="w-3 h-3" /> {saving ? 'Saving...' : 'Save Changes'}</>}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Organ Needed</label>
                <select value={organNeeded} onChange={e => setOrganNeeded(e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none text-sm font-bold focus:ring-2 focus:ring-primary/20">
                  {['Kidney','Liver','Heart','Lung','Pancreas','Cornea'].map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Blood Type</label>
                <select value={bloodType} onChange={e => setBloodType(e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none text-sm font-bold focus:ring-2 focus:ring-primary/20">
                  {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bt=><option key={bt} value={bt}>{bt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Patient Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none text-sm font-bold focus:ring-2 focus:ring-primary/20">
                  {['active','evaluating','matched','transplanted','discharged'].map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Diagnosis</label>
                <input type="text" value={patient.diagnosis || ''} readOnly className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none text-sm opacity-60 cursor-not-allowed" />
              </div>
            </div>
          </div>

          {/* Waitlist + Match Readiness */}
          {waitlistEntry && (
            <div className="bg-white rounded-2xl border border-surface-container p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-4 border-b border-surface-container"><Activity className="w-5 h-5 text-primary" /><h2 className="font-bold text-on-surface">Waitlist & Match Readiness</h2></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Priority Tier</label>
                  <select value={priority} onChange={e => setPriority(e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none text-sm font-bold focus:ring-2 focus:ring-primary/20">
                    <option value="Status 1 (Urgent)">Status 1 (Urgent)</option><option value="Status 2 (High)">Status 2 (High)</option><option value="Standard">Standard</option><option value="On Hold (Evaluating)">On Hold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Waitlist Status</label>
                  <select value={waitlistStatus} onChange={e => setWaitlistStatus(e.target.value)} className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none text-sm font-bold focus:ring-2 focus:ring-primary/20">
                    <option value="active">Active</option><option value="inactive">Inactive</option><option value="matched">Matched</option><option value="transplanted">Transplanted</option>
                  </select>
                </div>
              </div>

              {/* Match Readiness Slider */}
              <div className="pt-4 border-t border-surface-container">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Match Readiness (Patient Dashboard Circle)</label>
                  <span className="text-xl font-black text-primary">{matchPercentage}%</span>
                </div>
                <input type="range" min="0" max="100" value={matchPercentage} onChange={e => setMatchPercentage(Number(e.target.value))}
                  className="w-full h-3 bg-surface-container rounded-full appearance-none cursor-pointer accent-primary" />
                <div className="flex justify-between text-[10px] text-on-surface-variant mt-1">
                  <span>0% — Evaluating</span><span>100% — Ready for Transplant</span>
                </div>
                <p className="text-[10px] text-on-surface-variant mt-2 bg-blue-50 text-blue-700 p-2 rounded-lg">
                  💡 This controls the Match Readiness circle displayed on the patient's dashboard. Click "Save Changes" to apply.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Quick Actions */}
        <div className="space-y-6">
          <div className="bg-primary text-white rounded-2xl p-6 shadow-xl space-y-3">
            <h3 className="font-bold text-lg">Quick Actions</h3>
            <button onClick={scheduleAppointment} className="w-full py-3 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" /> Schedule Appointment
            </button>
            <button onClick={createMatchRequest} className="w-full py-3 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
              <Dna className="w-4 h-4" /> Create Match Request
            </button>
            <Link href="/clinical-messages" className="w-full py-3 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" /> Send Message
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-surface-container p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-on-surface flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> Appointments</h3>
            {appointments.length === 0 ? <p className="text-sm text-on-surface-variant">No appointments yet.</p> : (
              <div className="space-y-2">
                {appointments.map(a => (
                  <div key={a.id} className="flex items-center justify-between py-2 border-b border-surface-container/50 last:border-none">
                    <div>
                      <p className="text-xs font-bold text-on-surface">{a.appointment_date ? new Date(a.appointment_date).toLocaleDateString() : 'TBD'}</p>
                      <p className="text-[10px] text-on-surface-variant">{a.organ_needed}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${a.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : a.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{a.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {patient.allergies && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-red-700 uppercase tracking-widest">Allergies</p>
                <p className="text-sm font-bold text-red-600 mt-1">{patient.allergies}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
