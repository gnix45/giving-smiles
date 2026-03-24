import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Activity, 
  Map, 
  Shield, 
  AlertTriangle, 
  CheckCircle2,
  ChevronRight,
  Search,
  Plus,
  User
} from 'lucide-react';
import { Sidebar } from '@/src/components/Sidebar';
import { TopNav } from '@/src/components/TopNav';
import { cn } from '@/src/lib/utils';

export const ClinicalMatches = () => {
  const matches = [
    { id: 'RC-88219', type: 'Kidney', wait: 142, confidence: 98, hla: '6/6 Full Match', dist: 14.2, urgency: 'Critical' },
    { id: 'RC-77042', type: 'Liver', wait: 31, confidence: 84, hla: '5/6 High Match', dist: 240, urgency: 'High' },
    { id: 'RC-99105', type: 'Heart', wait: 89, confidence: 92, hla: '4/6 Standard', dist: 5.1, urgency: 'Critical' },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar role="clinical" />
      <main className="flex-1 md:ml-64">
        <TopNav title="Clinical Matches" />
        
        <div className="p-6 md:p-12 pt-24 max-w-7xl mx-auto w-full space-y-8">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-primary font-bold tracking-widest text-xs uppercase">AI Engine Live Status</span>
              <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mt-2">Active Clinical Matches</h2>
              <p className="text-on-surface-variant max-w-lg mt-3 text-sm">Prioritizing compatibility, logistical feasibility, and clinical urgency across the ecosystem.</p>
            </div>
            <button className="bg-primary text-white px-8 py-3 rounded-full font-semibold shadow-xl shadow-primary/10 hover:opacity-90 transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Register Donor
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Matches List */}
            <div className="lg:col-span-8 space-y-6">
              {matches.map((match, i) => (
                <motion.div 
                  key={match.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 md:gap-8 hover:shadow-md transition-shadow border border-surface-container"
                >
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                          <User className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <div>
                          <h3 className="font-headline font-bold text-lg md:text-xl text-on-surface">Recipient ID: {match.id}</h3>
                          <p className="text-xs font-medium text-on-surface-variant">{match.type} • Waiting: {match.wait} Days</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-2xl md:text-3xl font-headline font-black text-primary">{match.confidence}%</div>
                        <div className="text-[10px] font-bold text-primary uppercase tracking-tighter">Match Confidence</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 border-t border-surface-container pt-6">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">HLA Typing</p>
                        <p className="text-sm font-bold text-on-surface">{match.hla}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Distance</p>
                        <p className="text-sm font-bold text-on-surface">{match.dist} Miles</p>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Urgency</p>
                        <span className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                          match.urgency === 'Critical' ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                        )}>
                          {match.urgency}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center gap-3 w-full md:w-48 md:border-l border-surface-container md:pl-8 pt-6 md:pt-0 border-t md:border-t-0">
                    <button className="w-full bg-surface-container-high text-primary py-3 rounded-xl text-sm font-bold hover:bg-surface-container-highest transition-colors">
                      Review Protocol
                    </button>
                    <button className="w-full bg-primary text-white py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/10">
                      Approve Match
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-primary p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
                <Shield className="w-32 h-32 absolute -right-8 -top-8 opacity-10" />
                <h4 className="font-headline font-bold text-xl mb-4">System Insights</h4>
                <p className="text-sm text-white/80 leading-relaxed mb-8">
                  AI models detected a high-priority match between Donor ID DR-552 and Recipient RC-88219. Protocol suggests immediate review of cold-chain logistics.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs border-b border-white/10 pb-3">
                    <span className="opacity-70">Engine Uptime</span>
                    <span className="font-bold">99.98%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-white/10 pb-3">
                    <span className="opacity-70">Active Protocols</span>
                    <span className="font-bold">12 Active</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-surface-container">
                <h4 className="font-headline font-bold text-sm text-on-surface mb-6">Logistics Alert</h4>
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-2 bg-tertiary/10 rounded-lg text-tertiary">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">Weather Alert: Chicago</p>
                    <p className="text-xs text-on-surface-variant leading-relaxed">Possible transport delay due to fog in the Great Lakes region. Plan for ground backup.</p>
                  </div>
                </div>
                <button className="w-full text-center text-[10px] font-bold text-primary uppercase tracking-widest border border-primary/20 py-3 rounded-xl hover:bg-primary/5 transition-colors">
                  View Network Map
                </button>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-surface-container overflow-hidden relative min-h-[240px] flex flex-col justify-between">
                <div className="absolute inset-0 opacity-10 grayscale">
                  <img src="https://picsum.photos/seed/heatmap/400/300" alt="Map" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="relative z-10">
                  <h4 className="font-headline font-bold text-sm text-on-surface">Donor Heatmap</h4>
                  <p className="text-[10px] text-on-surface-variant mb-4">Regional density of unregistered potential matches.</p>
                </div>
                <div className="h-32 bg-surface-container rounded-2xl flex items-center justify-center relative z-10 border border-surface-container">
                  <Map className="w-8 h-8 text-slate-300" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};
