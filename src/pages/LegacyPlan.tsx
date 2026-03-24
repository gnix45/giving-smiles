import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Heart, 
  Activity, 
  Eye, 
  Plus,
  Info,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { Sidebar } from '@/src/components/Sidebar';
import { TopNav } from '@/src/components/TopNav';
import { cn } from '@/src/lib/utils';

export const LegacyPlan = ({ role = 'patient' }: { role?: 'patient' | 'clinical' }) => {
  const [selectedOrgans, setSelectedOrgans] = React.useState<string[]>(['Heart', 'Lungs', 'Kidneys']);

  const toggleOrgan = (organ: string) => {
    setSelectedOrgans(prev => 
      prev.includes(organ) ? prev.filter(o => o !== organ) : [...prev, organ]
    );
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar role={role} />
      <main className="flex-1 md:ml-64">
        <TopNav title="Legacy Plan" />
        
        <div className="p-6 md:p-12 pt-24 max-w-7xl mx-auto w-full space-y-12">
          {/* Hero */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Personal Stewardship</span>
              <h1 className="text-5xl md:text-6xl font-headline font-extrabold text-on-surface tracking-tight leading-tight mb-6">
                Your Legacy, <br/><span className="text-primary-container">Defined by Love.</span>
              </h1>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl mb-8">
                Organ donation is the ultimate gift of life. By detailing your preferences now, you ensure your values are honored and your impact is maximized.
              </p>
              <div className="flex flex-col sm:flex-row sm:inline-flex items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-tertiary/10 rounded-2xl sm:rounded-3xl border border-tertiary/20">
                <div className="bg-tertiary text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                </div>
                <div>
                  <p className="text-tertiary font-bold text-lg sm:text-xl">Your commitment could help up to 8 people</p>
                  <p className="text-tertiary/70 text-xs sm:text-sm">Through organ and tissue restoration</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/legacy-garden/800/1000" 
                  alt="Peaceful Garden" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-4 left-4 md:-bottom-6 md:-left-6 bg-white/90 backdrop-blur-md px-6 py-4 md:px-8 md:py-6 rounded-2xl md:rounded-3xl shadow-xl max-w-[250px] md:max-w-xs border border-white/50">
                <p className="font-headline font-bold text-primary mb-1 italic text-sm md:text-base">"Life is a circle of giving."</p>
                <p className="text-[10px] md:text-xs text-on-surface-variant">Clinical Compassion Philosophy</p>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-surface-container">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-headline font-bold text-on-surface">Organs for Transplant</h3>
                <Activity className="w-5 h-5 md:w-6 md:h-6 text-primary shrink-0" />
              </div>
              <p className="text-on-surface-variant mb-8 text-sm italic">Specify which organs you wish to donate for life-saving transplantation.</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Heart', icon: Heart },
                  { name: 'Lungs', icon: Activity },
                  { name: 'Kidneys', icon: Activity },
                  { name: 'Liver', icon: Activity },
                  { name: 'Pancreas', icon: Activity },
                ].map((organ) => (
                  <button 
                    key={organ.name}
                    onClick={() => toggleOrgan(organ.name)}
                    className={cn(
                      "flex flex-col gap-4 p-6 rounded-2xl transition-all duration-300 group text-left",
                      selectedOrgans.includes(organ.name) 
                        ? "bg-primary text-white shadow-lg shadow-primary/20" 
                        : "bg-surface-container-low hover:bg-surface-container-high text-on-surface"
                    )}
                  >
                    <organ.icon className={cn("w-8 h-8", selectedOrgans.includes(organ.name) ? "text-white" : "text-primary")} />
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-sm">{organ.name}</span>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        selectedOrgans.includes(organ.name) ? "border-white" : "border-primary"
                      )}>
                        {selectedOrgans.includes(organ.name) && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  </button>
                ))}
                <button className="flex flex-col gap-4 p-6 rounded-2xl border-2 border-dashed border-surface-container flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
                  <Plus className="w-8 h-8 text-slate-400" />
                  <span className="text-xs font-medium text-center">Add Custom Exemption</span>
                </button>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-surface-container">
              <h3 className="text-xl font-headline font-bold text-on-surface mb-6">Scientific Contribution</h3>
              <div className="space-y-6">
                {[
                  { title: 'Tissue Donation', sub: 'Skin, bone, heart valves for restoration.' },
                  { title: 'Cornea Donation', sub: 'Restoring sight to the blind.' },
                  { title: 'Medical Research', sub: 'Contribution to medical breakthroughs.' },
                  { title: 'Education', sub: 'Training future medical professionals.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group cursor-pointer">
                    <div className="mt-1">
                      <div className="w-5 h-5 rounded border-2 border-primary flex items-center justify-center group-hover:bg-primary/10">
                        {i < 2 && <CheckCircle2 className="w-4 h-4 text-primary fill-primary text-white" />}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-sm">{item.title}</p>
                      <p className="text-xs text-on-surface-variant">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-primary" />
                  <p className="text-xs font-bold text-primary uppercase">Policy Note</p>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Preferences can be updated at any time. All choices are legally binding and protected.
                </p>
              </div>
            </div>
          </div>

          {/* Wishes */}
          <section className="bg-surface-container-low p-6 md:p-12 rounded-[2rem] md:rounded-[3rem]">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="md:w-1/3">
                <h3 className="text-xl md:text-2xl font-headline font-bold text-on-surface mb-4">My Wishes</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Share personal notes for your family or healthcare proxy. This helps clarify your intentions and provides comfort during difficult decisions.
                </p>
                <div className="mt-6 md:mt-8 flex items-center gap-3 text-primary">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">End-to-End Encrypted</span>
                </div>
              </div>
              <div className="md:w-2/3 space-y-6">
                <textarea 
                  className="w-full h-40 md:h-48 bg-white border-none rounded-[1.5rem] md:rounded-3xl p-6 md:p-8 font-sans text-on-surface resize-none placeholder:text-slate-300 shadow-sm focus:ring-2 focus:ring-primary/20 text-sm md:text-base"
                  placeholder="Write your message here... (e.g., 'I want my family to know that I am proud to help others in this way.')"
                ></textarea>
                <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4">
                  <button className="px-6 md:px-8 py-3 rounded-full font-bold text-sm text-on-surface-variant hover:bg-white transition-all text-center">
                    Save as Draft
                  </button>
                  <button className="px-8 md:px-10 py-3 md:py-4 bg-primary text-white rounded-full font-bold shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm md:text-base">
                    Confirm Legacy Plan <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
