"use client";

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Activity, 
  Clock, 
  AlertTriangle,
  ArrowRight,
  Stethoscope,
  Heart
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function ClinicalDashboard() {
  const [stats, setStats] = useState({
    pendingAppointments: 0,
    activePatients: 0,
    activeMatches: 0,
    fleetDeployments: 0
  });
  
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // Fetch pending appointments (booking requests)
        const { data: appointments, count: apptCount } = await supabase
          .from('appointments')
          .select('*', { count: 'exact' })
          .eq('status', 'pending')
          .order('created_at', { ascending: false })
          .limit(5);

        // Fetch other stats
        const { count: patientCount } = await supabase
          .from('patients')
          .select('*', { count: 'exact' });
          
        const { count: matchCount } = await supabase
          .from('matches')
          .select('*', { count: 'exact' })
          .eq('status', 'pending');

        const { count: fleetCount } = await supabase
          .from('fleet_units')
          .select('*', { count: 'exact' })
          .in('status', ['En Route', 'In Transit']);

        setStats({
          pendingAppointments: apptCount || 0,
          activePatients: patientCount || 0,
          activeMatches: matchCount || 0,
          fleetDeployments: fleetCount || 0
        });

        if (appointments) {
          setRecentAppointments(appointments);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, [supabase]);

  if (isLoading) {
    return <div className="p-8 text-center text-on-surface-variant font-bold">Loading clinical intelligence...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-surface-container shadow-sm flex items-start gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-2xl shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-headline font-black text-on-surface">{stats.pendingAppointments}</div>
            <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mt-1">Pending Evaluations</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-surface-container shadow-sm flex items-start gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-headline font-black text-on-surface">{stats.activePatients}</div>
            <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mt-1">Total Patients</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-surface-container shadow-sm flex items-start gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-2xl shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-headline font-black text-on-surface">{stats.activeMatches}</div>
            <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mt-1">Active Matches</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-surface-container shadow-sm flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-headline font-black text-on-surface">{stats.fleetDeployments}</div>
            <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mt-1">Fleet Deployments</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Pending Request Action Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] border border-surface-container overflow-hidden shadow-sm">
            <div className="p-6 md:p-8 border-b border-surface-container flex items-center justify-between">
              <div>
                <h2 className="text-xl font-headline font-bold text-on-surface">Evaluation Requests</h2>
                <p className="text-sm text-on-surface-variant mt-1">New patient submissions requiring review and account creation.</p>
              </div>
              <Link href="/clinical-appointments" className="hidden sm:flex items-center gap-2 text-primary font-bold hover:bg-primary/5 px-4 py-2 rounded-full transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="divide-y divide-surface-container">
              {recentAppointments.length === 0 ? (
                <div className="p-8 text-center text-on-surface-variant font-bold">
                  No pending evaluation requests.
                </div>
              ) : (
                recentAppointments.map((appt) => (
                  <div key={appt.id} className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-surface-container-low transition-colors group">
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-on-surface">
                          {appt.first_name} {appt.last_name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-on-surface-variant">
                          <span className="font-bold text-primary">{appt.organ_needed}</span>
                          <span className="w-1 h-1 bg-surface-container rounded-full" />
                          <span>Blood: <strong>{appt.blood_type}</strong></span>
                          <span className="w-1 h-1 bg-surface-container rounded-full" />
                          <span>{new Date(appt.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/clinical-patients/new?appointment=${appt.id}`}
                      className="w-full sm:w-auto px-6 py-2.5 bg-surface text-primary border border-surface-container rounded-full font-bold shadow-sm hover:border-primary transition-colors text-center shrink-0"
                    >
                      Review & Create Account
                    </Link>
                  </div>
                ))
              )}
            </div>
            {recentAppointments.length > 0 && (
               <div className="p-4 bg-surface-container-low sm:hidden border-t border-surface-container">
                  <Link href="/clinical-appointments" className="flex items-center justify-center gap-2 text-primary font-bold">
                    View All Requests <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>
            )}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <div className="bg-primary text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <Stethoscope className="w-8 h-8 mb-4 text-white/80" />
            <h3 className="text-2xl font-headline font-bold mb-2">Duty Roster</h3>
            <p className="text-primary-container-low font-medium mb-6">Dr. Sarah Chen is the primary on-call coordinator for Region 4.</p>
            <button className="w-full py-3 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-colors">
              Request Handover
            </button>
          </div>

          <div className="bg-white rounded-[2rem] border border-surface-container p-6 md:p-8">
            <h3 className="text-lg font-headline font-bold text-on-surface mb-4">Critical Alerts</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 text-red-900 rounded-2xl border border-red-100">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold">Match Confidence Drop</p>
                  <p className="text-xs mt-1 text-red-700">Patient #8291 HLA typing re-evaluation required. Confidence dropped below 90%.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
