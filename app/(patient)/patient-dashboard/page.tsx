"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  TrendingUp, 
  Clock, 
  MapPin, 
  Phone, 
  Video, 
  Send,
  ChevronRight,
  BookOpen,
  Users,
  MessageCircle,
  Activity,
  Receipt,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

export default function PatientDashboard() {
  const { profile } = useAuth();
  const supabase = createClient();
  
  const [waitlistData, setWaitlistData] = useState<any>(null);
  const [careTeam, setCareTeam] = useState<any[]>([]);
  const [nextAppt, setNextAppt] = useState<any>(null);
  const [bills, setBills] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      if (!profile?.id) return;

      try {
        // Fetch Waitlist Status
        const { data: waitlist } = await supabase
          .from('waitlist')
          .select('*')
          .eq('patient_id', profile.id)
          .single();
          
        setWaitlistData(waitlist);

        // Fetch Next Appointment
        const { data: appt } = await supabase
          .from('appointments')
          .select('*')
          .eq('patient_id', profile.id)
          .in('status', ['confirmed', 'pending'])
          .order('appointment_date', { ascending: true })
          .limit(1)
          .single();
          
        if (appt) setNextAppt(appt);

        // Mock Care Team (In a real app, this would be linked via a care_team mapping table, 
        // or derived from assigned_doctor_id on appointments/patients)
        const { data: doctors } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'doctor')
          .limit(1);

        if (doctors) setCareTeam(doctors);

        // Fetch display billing requests
        const { data: fetchBills, error: billErr } = await supabase
          .from('billing_requests')
          .select('*')
          .eq('patient_id', profile.id)
          .order('created_at', { ascending: false });

        if (fetchBills) setBills(fetchBills);
        if (billErr) console.log("Billing requests not loaded (table may not exist yet):", billErr);

      } catch (error) {
        console.error("Error loading patient dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, [profile?.id]);

  async function markBillPaid(billId: string) {
    const { error } = await supabase.from('billing_requests').update({ status: 'review_pending' }).eq('id', billId);
    if (!error) {
      setBills(bills.map(b => b.id === billId ? { ...b, status: 'review_pending' } : b));
      alert("Bill marked as paid. A doctor will verify this shortly.");
    } else {
      alert("Error updating bill: " + error.message);
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center text-on-surface-variant font-bold">Loading dashboard...</div>;
  }

  const statusColor = waitlistData?.status === 'active' ? 'text-green-600' : 
                     waitlistData?.status === 'on_hold' ? 'text-amber-600' : 'text-primary';

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <header className="mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold font-headline tracking-tight text-primary">
          Welcome back, {profile?.full_name?.split(' ')[0] || 'Patient'}
        </h2>
        <p className="text-on-surface-variant font-body text-sm mt-1">Your journey is our priority. Here's your current status.</p>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Waitlist Status Element */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 lg:col-span-8 bg-white rounded-[2rem] md:rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center gap-6 md:gap-8 border border-surface-container"
        >
          {waitlistData ? (
            <>
              <div className="relative z-10 flex flex-col items-center shrink-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-[10px] md:border-[12px] border-surface-container flex items-center justify-center relative bg-surface">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle 
                      className={waitlistData.status === 'active' ? "text-green-500" : "text-amber-500"} 
                      cx="50%" cy="50%" r="42%" 
                      fill="transparent" 
                      stroke="currentColor" 
                      strokeWidth="10%"
                      strokeDasharray="264%"
                      strokeDashoffset={`${264 - (264 * (waitlistData.match_percentage || 0)) / 100}%`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="text-center">
                    <span className={`text-3xl md:text-4xl font-extrabold ${statusColor}`}>
                      {waitlistData.match_percentage || 0}%
                    </span>
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Match Readiness</p>
                  </div>
                </div>
              </div>
              <div className="relative z-10 flex-grow w-full md:w-auto">
                <span className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {waitlistData.organ_type} Waitlist
                </span>
                <h3 className="text-xl md:text-2xl font-bold mt-2 mb-4 font-headline">Status Overview</h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-surface-container-low rounded-xl gap-2 sm:gap-0">
                    <div className="flex items-center">
                      <Activity className={`w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 shrink-0 ${statusColor}`} />
                      <span className="text-xs md:text-sm font-medium">System Status</span>
                    </div>
                    <span className={`text-sm font-bold sm:ml-auto uppercase tracking-wide ${statusColor}`}>
                      {waitlistData.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-surface-container-low rounded-xl gap-2 sm:gap-0">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary mr-2 md:mr-3 shrink-0" />
                      <span className="text-xs md:text-sm font-medium">Priority Tier</span>
                    </div>
                    <span className="text-sm font-bold sm:ml-auto">{waitlistData.priority_tier}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
             <div className="w-full text-center py-8">
               <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-500">
                 <Clock className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold font-headline mb-2 text-on-surface">Evaluating Registration</h3>
               <p className="text-on-surface-variant max-w-md mx-auto">Your initial evaluation is currently being reviewed by the medical board. You will be assigned to a waitlist shortly.</p>
             </div>
          )}
        </motion.div>

        {/* Next Visit */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-12 lg:col-span-4 bg-white rounded-[2rem] md:rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm border border-surface-container"
        >
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center font-headline text-on-surface">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              Upcoming Visit
            </h3>
            
            {nextAppt ? (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-white">
                <p className="text-xs opacity-80 uppercase tracking-widest font-bold mb-1">
                  {nextAppt.appointment_date ? new Date(nextAppt.appointment_date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) : 'TBD'}
                </p>
                <h4 className="text-xl font-bold mt-1 mb-4 leading-tight">Clinical Evaluation</h4>
                <div className="flex items-center text-sm mb-3">
                  <Clock className="w-4 h-4 mr-2 opacity-80" />
                  {nextAppt.appointment_date ? new Date(nextAppt.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Pending Scheduling'}
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 opacity-80" />
                  {nextAppt.location || 'Specialty Transplant Center'}
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-surface-container-low text-center border border-surface-container border-dashed">
                <p className="text-on-surface-variant font-bold text-sm">No upcoming appointments scheduled.</p>
              </div>
            )}
          </div>
          
          <Link href="/patient-appointments" className="mt-8 w-full py-4 bg-surface text-primary border border-surface-container rounded-full font-bold text-sm hover:bg-surface-container-low transition-colors flex items-center justify-center">
            View All Appointments
          </Link>
        </motion.div>

        {/* Care Team Quick Access */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-12 lg:col-span-8 bg-white rounded-[2rem] md:rounded-3xl shadow-sm border border-surface-container overflow-hidden"
        >
          <div className="p-6 md:p-8 border-b border-surface-container flex items-center justify-between bg-surface-container-lowest">
            <div>
              <h3 className="font-bold text-lg font-headline text-on-surface">Primary Care Team</h3>
              <p className="text-sm text-on-surface-variant mt-1">Direct access to your assigned specialists.</p>
            </div>
          </div>
          <div className="divide-y divide-surface-container">
            {careTeam.length > 0 ? careTeam.map((doctor) => (
              <div key={doctor.id} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 group hover:bg-surface-container-low transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={doctor.avatar_url || "https://picsum.photos/seed/doctor/100/100"} 
                      alt={doctor.full_name} 
                      className="w-12 h-12 rounded-full object-cover border border-surface-container"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface text-base">{doctor.full_name}</h3>
                    <p className="text-xs text-on-surface-variant font-medium">Transplant Coordinator</p>
                  </div>
                </div>
                <div className="flex w-full sm:w-auto space-x-2">
                  <Link href="/patient-messages" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl font-bold text-sm hover:bg-primary/20 transition-colors">
                    <MessageCircle className="w-4 h-4" /> Message
                  </Link>
                  <button className="flex-1 sm:flex-none flex items-center justify-center p-2 border border-surface-container hover:bg-surface-container-highest rounded-xl text-on-surface-variant transition-colors">
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )) : (
              <div className="p-8 text-center text-on-surface-variant font-bold text-sm">Care team assignment pending.</div>
            )}
          </div>
        </motion.div>

        {/* Support & Mental Health */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-tertiary/10 text-tertiary rounded-[2rem] md:rounded-3xl p-6 md:p-8 relative overflow-hidden h-full flex flex-col justify-center"
          >
            <Heart className="w-32 h-32 absolute -bottom-6 -right-6 opacity-10" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2 font-headline">Emotional Wellbeing</h3>
              <p className="text-sm mb-6 leading-relaxed opacity-90 font-medium">Your mental health is critical to your transplant success. Connect with support systems.</p>
              <button className="inline-flex items-center px-6 py-3 bg-tertiary text-white rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
                Schedule Counseling
              </button>
            </div>
          </motion.div>
        </div>
        {/* Billing Requests */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="col-span-12 lg:col-span-8 bg-white rounded-[2rem] md:rounded-3xl shadow-sm border border-surface-container overflow-hidden"
        >
          <div className="p-6 md:p-8 border-b border-surface-container flex items-center justify-between bg-surface-container-lowest">
            <div>
              <h3 className="font-bold text-lg font-headline text-on-surface flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" /> Billing & Payments
              </h3>
              <p className="text-sm text-on-surface-variant mt-1">Manage your medical bills and outstanding balances.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-4">
            {bills.length === 0 ? (
              <p className="text-sm text-on-surface-variant font-bold text-center py-4">No pending bills at this time.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bills.map(bill => (
                  <div key={bill.id} className="p-5 border border-surface-container rounded-2xl bg-surface-container-lowest flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-2xl font-black text-on-surface">${Number(bill.amount).toFixed(2)}</span>
                        {bill.status === 'pending' ? (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-[10px] font-bold uppercase tracking-widest">Action Required</span>
                        ) : bill.status === 'review_pending' ? (
                          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-widest">Verifying</span>
                        ) : (
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-widest">Paid</span>
                        )}
                      </div>
                      
                      {bill.status === 'pending' && (
                        <div className="space-y-3 mb-4">
                          {bill.payment_link && (
                            <a href={bill.payment_link} target="_blank" rel="noreferrer" className="block w-full py-2.5 bg-primary/10 text-primary rounded-xl text-center text-sm font-bold hover:bg-primary/20 transition-colors">
                              Open Payment Link
                            </a>
                          )}
                          {bill.bank_details && (
                            <div className="p-3 bg-surface-container-low rounded-xl">
                              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Bank Details</p>
                              <p className="text-sm text-on-surface font-mono whitespace-pre-wrap">{bill.bank_details}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {bill.status === 'pending' && (
                      <button onClick={() => markBillPaid(bill.id)} className="w-full py-3 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-2">
                        <CheckCircle className="w-4 h-4" /> Mark as Paid
                      </button>
                    )}
                    {bill.status === 'review_pending' && (
                      <p className="text-xs text-amber-700 font-bold bg-amber-50 p-2 rounded-lg text-center mt-2 flex items-center justify-center">Pending confirmation from doctor.</p>
                    )}
                    {bill.status === 'paid' && (
                      <p className="text-xs text-emerald-700 font-bold bg-emerald-50 p-2 rounded-lg text-center mt-2 flex items-center justify-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Payment Complete
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
