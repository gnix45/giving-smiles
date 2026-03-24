import React from 'react';
import { motion } from 'motion/react';
import { 
  Map as MapIcon, 
  Navigation, 
  Shield, 
  Zap, 
  Activity, 
  Truck, 
  Plane, 
  ChevronRight,
  Search,
  Lock,
  MessageSquare
} from 'lucide-react';
import { Sidebar } from '@/src/components/Sidebar';
import { TopNav } from '@/src/components/TopNav';
import { cn } from '@/src/lib/utils';

export const CommandCenter = () => {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar role="clinical" />
      <main className="flex-1 md:ml-64">
        <TopNav title="Command Center" />
        
        <div className="p-6 md:p-12 pt-24 max-w-7xl mx-auto w-full space-y-8">
          <div className="grid grid-cols-12 gap-8 min-h-[calc(100vh-180px)]">
            {/* Map Area */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-surface-container relative overflow-hidden min-h-[400px] md:min-h-[auto]">
              <div className="absolute inset-0 grayscale opacity-40">
                <img src="https://picsum.photos/seed/transport-map/1200/800" alt="Map" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              
              {/* Map Overlays */}
              <div className="absolute top-8 left-8 z-10 space-y-4">
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Active Transports</p>
                    <p className="text-xl font-headline font-extrabold text-on-surface">14 Units Live</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div className="flex gap-2">
                  <button className="bg-primary text-white p-3 sm:p-4 rounded-2xl shadow-xl"><Truck className="w-5 h-5 sm:w-6 sm:h-6" /></button>
                  <button className="bg-white text-primary p-3 sm:p-4 rounded-2xl shadow-lg"><Plane className="w-5 h-5 sm:w-6 sm:h-6" /></button>
                </div>
                <div className="bg-white/90 backdrop-blur-md p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl border border-white/50 w-full sm:max-w-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">Unit #TX-442 In Transit</p>
                  </div>
                  <p className="text-sm font-bold text-on-surface mb-2">ETA: 14 Minutes • St. Jude’s</p>
                  <div className="w-full bg-surface-container rounded-full h-1.5 mb-4">
                    <div className="bg-primary h-full rounded-full w-[85%]" />
                  </div>
                  <button className="w-full py-3 bg-primary/5 text-primary rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary/10 transition-colors">
                    Open Secure Link
                  </button>
                </div>
              </div>
            </div>

            {/* AI Matching Sidebar */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <div className="bg-primary p-8 rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 flex-1 relative overflow-hidden">
                <Shield className="w-32 h-32 absolute -right-8 -top-8 opacity-10" />
                <h3 className="font-headline font-bold text-xl mb-6">AI Matching Sidebar</h3>
                <div className="space-y-6">
                  {[
                    { id: 'RC-88219', score: 98, type: 'Kidney', status: 'Optimal' },
                    { id: 'RC-77042', score: 84, type: 'Liver', status: 'High' },
                    { id: 'RC-99105', score: 92, type: 'Heart', status: 'Optimal' },
                  ].map((match, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 group cursor-pointer hover:bg-white/20 transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-tighter opacity-70">Recipient ID</p>
                          <p className="font-bold">{match.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-headline font-black">{match.score}%</p>
                          <p className="text-[10px] uppercase font-bold opacity-70">Match</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium">{match.type}</span>
                        <span className="text-[10px] font-bold uppercase bg-white/20 px-2 py-0.5 rounded-full">{match.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-4 bg-white text-primary rounded-full font-bold text-sm shadow-lg hover:bg-white/90 transition-all">
                  View All Matches
                </button>
              </div>

              <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-surface-container">
                <h3 className="font-headline font-bold text-on-surface mb-6">Secure Link</h3>
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-surface-container mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold">Dr. Sarah Chen</p>
                    <p className="text-[10px] text-on-surface-variant">Active Coordination</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest px-2">
                  <Lock className="w-3 h-3" />
                  AES-256 Encrypted
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
