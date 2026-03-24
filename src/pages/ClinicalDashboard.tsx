import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  TrendingUp, 
  Clock, 
  MapPin, 
  ChevronRight,
  BookOpen,
  Users,
  MessageSquare,
  Shield,
  Zap,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sidebar } from '@/src/components/Sidebar';
import { TopNav } from '@/src/components/TopNav';
import { cn } from '@/src/lib/utils';

export const ClinicalDashboard = () => {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar role="clinical" />
      <main className="flex-1 md:ml-64">
        <TopNav title="Clinical Portal" />
        
        <div className="p-6 md:p-12 pt-24 max-w-7xl mx-auto w-full space-y-12">
          {/* Hero Section */}
          <section className="relative h-[400px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/clinical-hero/1200/600" 
              alt="Clinical Hero" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 md:from-primary/80 to-primary/40 md:to-transparent flex flex-col justify-center px-6 md:px-12 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-extrabold mb-4 leading-tight">Your Legacy, <br/>Their Future.</h2>
                <p className="max-w-md text-white/90 md:text-white/80 text-base md:text-lg mb-6 md:mb-8">Empowering clinical decisions with real-time logistics and compassionate care coordination.</p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Link to="/matches" className="bg-white text-primary px-6 md:px-8 py-3 rounded-full font-bold shadow-lg hover:bg-white/90 transition-all text-center text-sm md:text-base">
                    Active Matches
                  </Link>
                  <Link to="/command-center" className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 md:px-8 py-3 rounded-full font-bold hover:bg-white/30 transition-all text-center text-sm md:text-base">
                    System Hub
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Potential Impact', value: '1,482', icon: Heart, color: 'text-primary', bg: 'bg-primary/10' },
              { label: 'Active Transports', value: '24', icon: Zap, color: 'text-tertiary', bg: 'bg-tertiary/10' },
              { label: 'Global Network', value: '210', icon: Globe, color: 'text-primary', bg: 'bg-primary/10' },
              { label: 'Match Confidence', value: '98.2%', icon: Shield, color: 'text-primary', bg: 'bg-primary/10' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-surface-container flex items-center gap-4"
              >
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{stat.label}</p>
                  <p className="text-2xl font-headline font-extrabold text-on-surface">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Legacy Settings */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-surface-container">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-headline font-bold text-on-surface">Legacy Settings</h3>
                <button className="text-primary font-bold text-sm hover:underline">View All</button>
              </div>
              <div className="space-y-4 md:space-y-6">
                {[
                  { title: 'Organ Preferences', sub: 'Heart, Lungs, Kidneys selected for donation.', status: 'Active' },
                  { title: 'Research Contribution', sub: 'Tissue donation for medical research approved.', status: 'Active' },
                  { title: 'Care Team Access', sub: 'Dr. Sarah Chen granted full clinical oversight.', status: 'Verified' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 bg-surface-container-low rounded-2xl group hover:bg-surface-container-high transition-colors gap-4">
                    <div className="flex items-start sm:items-center gap-3 md:gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 sm:mt-0 shrink-0" />
                      <div>
                        <p className="font-bold text-on-surface text-sm md:text-base">{item.title}</p>
                        <p className="text-xs text-on-surface-variant">{item.sub}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 self-start sm:self-auto">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">{item.status}</span>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors hidden sm:block" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Hub */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-surface-container-low p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-surface-container">
                <h3 className="text-lg md:text-xl font-headline font-bold text-on-surface mb-6 md:mb-8">Knowledge Hub</h3>
                <div className="space-y-6">
                  {[
                    { icon: BookOpen, title: 'Clinical Protocols', sub: 'Standardized matching procedures.' },
                    { icon: Users, title: 'Ethics Committee', sub: 'Reviewing complex match cases.' },
                    { icon: MessageSquare, title: 'Support Network', sub: 'Connecting donor families.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 cursor-pointer group">
                      <div className="p-3 bg-white rounded-xl text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-on-surface">{item.title}</p>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/support-clinical" className="w-full mt-8 md:mt-10 py-3 md:py-4 bg-primary text-white rounded-full font-bold text-sm shadow-lg shadow-primary/10 hover:opacity-90 transition-all flex items-center justify-center">
                  Access Full Library
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
