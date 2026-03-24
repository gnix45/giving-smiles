import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Phone, 
  Video, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  Award, 
  ChevronRight,
  Search,
  MapPin,
  Clock,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sidebar } from '@/src/components/Sidebar';
import { TopNav } from '@/src/components/TopNav';
import { cn } from '@/src/lib/utils';

export const CareTeam = () => {
  const specialists = [
    { name: 'Dr. Sarah Chen', role: 'Care Coordinator', specialty: 'Transplant Logistics', img: 'https://picsum.photos/seed/sarah/200/200', active: true },
    { name: 'Dr. Marcus Bell', role: 'Lead Surgeon', specialty: 'Cardiothoracic Surgery', img: 'https://picsum.photos/seed/marcus/200/200', active: false },
    { name: 'Elena Rodriguez', role: 'Social Worker', specialty: 'Patient Advocacy', img: 'https://picsum.photos/seed/elena/200/200', active: true },
    { name: 'Dr. James Wilson', role: 'Psychologist', specialty: 'Clinical Wellbeing', img: 'https://picsum.photos/seed/james/200/200', active: true },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar role="patient" />
      <main className="flex-1 md:ml-64">
        <TopNav title="Care Team" />
        
        <div className="p-6 md:p-12 pt-24 max-w-7xl mx-auto w-full space-y-12">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-primary font-bold tracking-widest text-xs uppercase">Your Dedicated Support</span>
              <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mt-2">Specialist Care Team</h2>
              <p className="text-on-surface-variant max-w-lg mt-3 text-sm">A multidisciplinary team of world-class specialists supporting every step of your journey.</p>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
              <Link to="/book-appointment" className="bg-white text-on-surface px-6 py-3 rounded-full font-bold text-sm border border-surface-container shadow-sm hover:bg-surface-container-low transition-all flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Book Consultation
              </Link>
              <Link to="/dashboard" className="bg-primary text-white px-8 py-3 rounded-full font-bold text-sm shadow-xl shadow-primary/10 hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Team Chat
              </Link>
            </div>
          </header>

          {/* Specialists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialists.map((person, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-surface-container text-center group hover:shadow-md transition-all"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-surface-container group-hover:border-primary transition-colors">
                    <img src={person.img} alt={person.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  {person.active && (
                    <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></span>
                  )}
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface mb-1">{person.name}</h3>
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">{person.role}</p>
                <p className="text-sm text-on-surface-variant mb-8">{person.specialty}</p>
                
                <div className="flex justify-center gap-2">
                  <button className="p-3 bg-surface-container-low text-primary rounded-xl hover:bg-primary hover:text-white transition-all">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-surface-container-low text-primary rounded-xl hover:bg-primary hover:text-white transition-all">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-surface-container-low text-primary rounded-xl hover:bg-primary hover:text-white transition-all">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Recent Communications */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-surface-container">
              <h3 className="font-headline font-bold text-2xl mb-8">Recent Communications</h3>
              <div className="space-y-4 md:space-y-6">
                {[
                  { user: 'Dr. Sarah Chen', type: 'Message', text: "I've updated your lab results. Everything looks stable.", time: '2h ago' },
                  { user: 'Elena Rodriguez', type: 'Document', text: "New advocacy resources uploaded to your portal.", time: '1d ago' },
                  { user: 'Dr. Marcus Bell', type: 'Note', text: "Surgical evaluation scheduled for next Thursday.", time: '3d ago' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 bg-surface-container-low rounded-2xl group hover:bg-surface-container-high transition-colors cursor-pointer gap-4 sm:gap-0">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        {item.type === 'Message' ? <MessageSquare className="w-4 h-4 md:w-5 md:h-5" /> : item.type === 'Document' ? <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" /> : <Award className="w-4 h-4 md:w-5 md:h-5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-on-surface text-sm md:text-base">{item.user}</p>
                        <p className="text-xs md:text-sm text-on-surface-variant truncate max-w-[200px] sm:max-w-md">{item.text}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-4 pl-14 sm:pl-0">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{item.time}</span>
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-slate-300 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 md:mt-10 py-4 text-center text-xs font-bold text-primary uppercase tracking-widest bg-surface-container-low hover:bg-surface-container-high transition-colors rounded-2xl">
                View All Communications
              </button>
            </div>

            {/* Patient Resources */}
            <aside className="col-span-12 lg:col-span-4 space-y-6 md:space-y-8">
              <div className="bg-primary p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
                <Heart className="w-32 h-32 absolute -right-8 -top-8 opacity-10" />
                <h3 className="font-headline font-bold text-xl mb-4">Patient Resources</h3>
                <p className="text-sm text-white/80 leading-relaxed mb-8">
                  Access guides and tools specifically selected by your care team to support your journey.
                </p>
                <div className="space-y-4">
                  {[
                    { title: 'Pre-Op Checklist', icon: ShieldCheck },
                    { title: 'Recovery Guide', icon: Award },
                    { title: 'Financial Support', icon: Users },
                  ].map((item, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/20 transition-all text-left">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm font-bold">{item.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-surface-container-low p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-surface-container">
                <h3 className="font-headline font-bold text-xl text-on-surface mb-6 md:mb-8">Next Team Meeting</h3>
                <div className="p-5 md:p-6 bg-white rounded-2xl shadow-sm border border-surface-container mb-6 md:mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Oct 24, 2024</span>
                  </div>
                  <h4 className="font-bold text-on-surface mb-2">Multidisciplinary Review</h4>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                    <Clock className="w-4 h-4" />
                    02:00 PM — 03:00 PM
                  </div>
                </div>
                <button className="w-full py-4 bg-surface-container-high text-primary rounded-full font-bold text-sm hover:bg-surface-container-highest transition-colors">
                  Add to Calendar
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};
