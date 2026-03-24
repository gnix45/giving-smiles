import React from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Search, 
  User, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Info,
  ChevronRight,
  ClipboardList,
  AlertCircle
} from 'lucide-react';
import { Sidebar } from '@/src/components/Sidebar';
import { TopNav } from '@/src/components/TopNav';
import { cn } from '@/src/lib/utils';

export const MatchRequest = () => {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar role="clinical" />
      <main className="flex-1 md:ml-64">
        <TopNav title="New Match Request" />
        
        <div className="p-6 md:p-12 pt-24 max-w-5xl mx-auto w-full space-y-12">
          <header className="space-y-4">
            <span className="text-primary font-bold tracking-widest uppercase text-xs">Clinical Operations</span>
            <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">Initiate Match Evaluation</h1>
            <p className="text-on-surface-variant max-w-2xl text-sm leading-relaxed">
              Submit a new match request to the AI matching engine. Our system will analyze HLA compatibility, urgency, and logistics to find the most optimal donor-recipient pair.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              {/* Recipient Search */}
              <section className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-surface-container">
                <h3 className="text-xl font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Recipient Information
                </h3>
                <div className="space-y-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search recipient by ID or Name..." 
                      className="w-full pl-12 pr-6 py-4 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-2">Organ Required</label>
                      <select className="w-full p-4 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm">
                        <option>Select Organ...</option>
                        <option>Heart</option>
                        <option>Lung</option>
                        <option>Kidney</option>
                        <option>Liver</option>
                        <option>Pancreas</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-2">Urgency Level</label>
                      <select className="w-full p-4 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm">
                        <option>Select Urgency...</option>
                        <option>Status 1A (Critical)</option>
                        <option>Status 1B (High)</option>
                        <option>Status 2 (Moderate)</option>
                        <option>Status 3 (Stable)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              {/* Clinical Data */}
              <section className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-surface-container">
                <h3 className="text-xl font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Clinical Compatibility Data
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-2">Blood Type</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                          <button key={type} className="py-3 bg-surface-container-low rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-all">
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-2">HLA Typing (A, B, DR)</label>
                      <input type="text" placeholder="e.g. A2, A3; B7, B8; DR3, DR4" className="w-full p-4 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm" />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-2">Body Mass Index (BMI)</label>
                      <input type="number" placeholder="24.5" className="w-full p-4 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ml-2">Age Range Preference</label>
                      <div className="flex gap-4">
                        <input type="number" placeholder="Min" className="w-full p-4 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm" />
                        <input type="number" placeholder="Max" className="w-full p-4 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4">
                <button className="px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm text-on-surface-variant hover:bg-surface-container-low transition-all text-center">
                  Save as Draft
                </button>
                <button className="px-8 md:px-12 py-3 md:py-4 bg-primary text-white rounded-full font-bold shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  Run Matching Engine <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-6 md:space-y-8">
              <div className="bg-primary p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
                <ShieldCheck className="w-32 h-32 absolute -right-8 -top-8 opacity-10" />
                <h4 className="font-headline font-bold text-xl mb-4">Verification Protocol</h4>
                <p className="text-sm text-white/80 leading-relaxed mb-8">
                  All match requests are cross-referenced with the national registry and ethics committee guidelines.
                </p>
                <div className="space-y-4">
                  {[
                    'Identity Verified',
                    'Clinical Data Validated',
                    'Ethics Approval Pending'
                  ].map((check, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-medium">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <ChevronRight className="w-3 h-3" />
                      </div>
                      {check}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-surface-container">
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="w-5 h-5 text-tertiary" />
                  <h4 className="font-headline font-bold text-on-surface">Important Note</h4>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Initiating a match evaluation triggers real-time logistics planning. Ensure all clinical data is accurate to prevent delays in the transport network.
                </p>
              </div>

              <div className="p-6 md:p-8 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-surface-container shadow-sm">
                <h4 className="font-headline font-bold text-on-surface mb-6">Recent Requests</h4>
                <div className="space-y-4">
                  {[
                    { id: 'REQ-9921', organ: 'Heart', status: 'Processing' },
                    { id: 'REQ-8810', organ: 'Kidney', status: 'Matched' },
                  ].map((req, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                      <div>
                        <p className="text-xs font-bold">{req.id}</p>
                        <p className="text-[10px] text-on-surface-variant uppercase">{req.organ}</p>
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold px-3 py-1 rounded-full uppercase",
                        req.status === 'Matched' ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"
                      )}>
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};
