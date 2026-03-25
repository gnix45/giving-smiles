"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, Heart, UserPlus, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Suspense } from 'react';

function NewPatientForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('appointment');
  
  const [apptData, setApptData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Doctor overrides for generating the account
  const [password, setPassword] = useState('');
  const [priorityOverride, setPriorityOverride] = useState('Standard');

  const supabase = createClient();

  useEffect(() => {
    async function loadAppointment() {
      if (!appointmentId) return;
      
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('id', appointmentId)
        .single();
        
      if (data) {
        setApptData(data);
        // Autogenerate a secure temporary password
        setPassword(`GS-${Math.random().toString(36).slice(-8).toUpperCase()}!`);
      }
      if (error) console.error("Error loading appointment:", error);
    }
    loadAppointment();
  }, [appointmentId, supabase]);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apptData) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // 1. We must use the Admin API (service role) to create users directly without email confirmation
      const res = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: apptData.email,
          password: password,
          fullName: `${apptData.first_name} ${apptData.last_name}`,
          role: 'patient',
          
          // Extended data to populate `patients` and `waitlist` tables
          appointmentId: apptData.id,
          organNeeded: apptData.organ_needed,
          bloodType: apptData.blood_type,
          diagnosis: apptData.diagnosis,
          allergies: apptData.allergies,
          medications: apptData.medications,
          insurance: apptData.insurance_provider,
          priorityTier: priorityOverride,
          dialysisStatus: apptData.dialysis_status || false,
          emergencyContact: apptData.emergency_contact
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create patient account');
      }

      router.push('/clinical-patients?success=true');
      router.refresh();
      
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (!apptData && appointmentId) {
    return <div className="p-8 text-center font-bold text-on-surface-variant">Loading appointment data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-headline font-bold text-on-surface">Create Patient Account</h1>
        <p className="text-sm text-on-surface-variant mt-1">
          {apptData ? 'Approve evaluation request and provision access.' : 'Manually add a new patient to the system.'}
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm font-bold">{error}</div>
        </div>
      )}

      {apptData ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Medical Summary */}
          <div className="bg-white rounded-[2rem] border border-surface-container p-6 md:p-8 space-y-6 self-start shadow-sm">
            <div className="flex items-center gap-3 border-b border-surface-container pb-4">
              <Heart className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-headline font-bold text-on-surface">Evaluation Summary</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Patient Identity</p>
                <p className="text-xl font-bold text-on-surface mt-1">{apptData.first_name} {apptData.last_name}</p>
                <p className="text-sm text-on-surface-variant">{apptData.email} • {apptData.phone}</p>
                <p className="text-sm text-on-surface-variant">DOB: {new Date(apptData.date_of_birth).toLocaleDateString()}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-surface-container">
                <div>
                  <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Organ Needed</p>
                  <p className="text-base font-bold text-primary">{apptData.organ_needed}</p>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Blood Type</p>
                  <p className="text-base font-bold text-primary">{apptData.blood_type}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Diagnosis</p>
                <p className="text-sm text-on-surface mt-1">{apptData.diagnosis}</p>
              </div>
              
              <div>
                <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Allergies</p>
                <p className="text-sm text-red-600 font-bold mt-1">{apptData.allergies || 'None reported'}</p>
              </div>
            </div>
          </div>

          {/* Provisioning Form */}
          <form onSubmit={handleCreateAccount} className="bg-white rounded-[2rem] border border-surface-container p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-surface-container pb-4">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-headline font-bold text-on-surface">Access Provisioning</h2>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Temporary Password</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-surface-container-low border-surface-container rounded-2xl focus:ring-2 focus:ring-primary/20 text-sm font-mono font-bold text-primary"
                  required
                />
                <button type="button" onClick={() => navigator.clipboard.writeText(password)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-on-surface-variant hover:text-primary">
                  Copy
                </button>
              </div>
              <p className="text-[10px] text-on-surface-variant ml-1">Must be provided to patient securely. They will be prompted to change it.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Initial Waitlist Priority</label>
              <select 
                value={priorityOverride}
                onChange={(e) => setPriorityOverride(e.target.value)}
                className="w-full px-5 py-4 bg-surface-container-low border-surface-container rounded-2xl focus:ring-2 focus:ring-primary/20 text-sm font-bold"
              >
                <option value="Status 1 (Urgent)">Status 1 (Urgent)</option>
                <option value="Status 2 (High)">Status 2 (High)</option>
                <option value="Standard">Standard</option>
                <option value="On Hold (Evaluating)">On Hold (Evaluating)</option>
              </select>
            </div>

            <div className="pt-6 border-t border-surface-container">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-primary text-white rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <UserPlus className="w-5 h-5" />
                {isLoading ? 'Provisioning...' : 'Approve & Create Account'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-surface-container p-12 text-center shadow-sm">
          <p className="text-on-surface-variant font-bold mb-4">Manual patient creation without an evaluation request is not implemented in this prototype demo.</p>
          <Link href="/clinical-appointments" className="text-primary font-bold hover:underline">
            Go to Evaluation Requests
          </Link>
        </div>
      )}
    </div>
  );
}

export default function NewPatientPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center font-bold text-on-surface-variant">Loading patient provisioning...</div>}>
      <NewPatientForm />
    </Suspense>
  );
}
