"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PatientAppointments() {
  const { profile } = useAuth();
  const supabase = createClient();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAppointments() {
      if (!profile?.id) return;
      try {
        const { data } = await supabase
          .from('appointments')
          .select(`
            *,
            assigned_doctor:profiles!assigned_doctor_id(full_name)
          `)
          .eq('patient_id', profile.id)
          .order('appointment_date', { ascending: true }); // nearest first

        setAppointments(data || []);
      } catch (err) {
        console.error("Error loading appointments:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAppointments();
  }, [profile?.id, supabase]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed': return <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Confirmed</span>;
      case 'completed': return <span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-wider">Completed</span>;
      default: return <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Pending</span>;
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-on-surface-variant font-bold">Loading appointments...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">Appointments</h1>
        <p className="text-on-surface-variant font-body text-sm mt-1">
          Manage your upcoming scheduled clinical visits and evaluations.
        </p>
      </div>

      <div className="space-y-4">
        {appointments.length === 0 ? (
          <div className="bg-white rounded-[2rem] border border-surface-container p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-4 text-on-surface-variant opacity-50">
              <Calendar className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-headline font-bold text-on-surface mb-2">No Appointments Scheduled</h3>
            <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
              Your care team will contact you when it's time to schedule your next evaluation or lab work.
            </p>
          </div>
        ) : (
          appointments.map((appt) => {
            const date = new Date(appt.appointment_date || appt.created_at);
            const isConfirmed = appt.status === 'confirmed';
            
            return (
              <div key={appt.id} className={cn(
                "bg-white rounded-[2rem] border p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center transition-all shadow-sm",
                isConfirmed ? "border-primary/30" : "border-surface-container"
              )}>
                
                {/* Date Bubble */}
                <div className="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-0 bg-surface-container-low rounded-2xl p-4 md:w-32 shrink-0 border border-surface-container">
                  <span className="text-sm font-bold text-on-surface-variant tracking-widest uppercase">{date.toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-3xl font-black font-headline text-primary">{date.getDate()}</span>
                  <span className="text-sm font-bold text-on-surface-variant">{date.getFullYear()}</span>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold font-headline text-on-surface">Clinical Evaluation</h3>
                      <p className="text-sm text-on-surface-variant font-medium mt-1">
                        With {appt.assigned_doctor?.full_name || 'Coordinator'}
                      </p>
                    </div>
                    <div>{getStatusBadge(appt.status)}</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2 text-sm text-on-surface font-medium">
                      <Clock className="w-4 h-4 text-primary shrink-0" />
                      {appt.appointment_date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Time TBD'}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-on-surface font-medium">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      {appt.location || 'St. Jude Medical Center'}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="shrink-0 flex md:flex-col gap-3">
                  <button 
                    disabled={!isConfirmed}
                    className="flex-1 py-3 px-6 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary-container disabled:opacity-50 transition-colors text-sm"
                  >
                    Check In
                  </button>
                  <button className="flex-1 py-3 px-6 bg-surface text-on-surface-variant border border-surface-container font-bold rounded-xl hover:bg-surface-container-low transition-colors text-sm">
                    Reschedule
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
