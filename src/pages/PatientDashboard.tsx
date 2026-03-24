import React from 'react';
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
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sidebar } from '@/src/components/Sidebar';
import { TopNav } from '@/src/components/TopNav';

export const PatientDashboard = () => {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar role="patient" />
      <main className="flex-1 md:ml-64">
        <TopNav title="Beacon Portal" />
        
        <div className="p-4 md:p-8 lg:p-12 pt-24 max-w-7xl mx-auto w-full space-y-8">
          <header className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold font-headline tracking-tight text-primary">Welcome back, Emily</h2>
            <p className="text-on-surface-variant font-body text-sm">Your journey is our priority. Here's your current status.</p>
          </header>

          <div className="grid grid-cols-12 gap-6">
            {/* Waitlist Status */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-12 lg:col-span-8 bg-white rounded-[2rem] md:rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center gap-6 md:gap-8 border border-surface-container"
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-[10px] md:border-[12px] border-surface-container flex items-center justify-center relative">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle 
                      className="text-primary" 
                      cx="50%" cy="50%" r="42%" 
                      fill="transparent" 
                      stroke="currentColor" 
                      strokeWidth="10%"
                      strokeDasharray="264%"
                      strokeDashoffset="66%"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="text-center">
                    <span className="text-3xl md:text-4xl font-extrabold text-primary">75%</span>
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Matching</p>
                  </div>
                </div>
              </div>
              <div className="relative z-10 flex-grow w-full md:w-auto">
                <span className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-[10px] font-bold uppercase tracking-wider">Priority Status</span>
                <h3 className="text-xl md:text-2xl font-bold mt-2 mb-4 font-headline">Waitlist Overview</h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-surface-container-low rounded-xl gap-2 sm:gap-0">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary mr-2 md:mr-3 shrink-0" />
                      <span className="text-xs md:text-sm font-medium">Estimated wait time</span>
                    </div>
                    <span className="text-sm font-bold sm:ml-auto">3 - 5 Months</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-surface-container-low rounded-xl gap-2 sm:gap-0">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary mr-2 md:mr-3 shrink-0" />
                      <span className="text-xs md:text-sm font-medium">Current position</span>
                    </div>
                    <span className="text-sm font-bold sm:ml-auto">Tier 1-A (Regional)</span>
                  </div>
                </div>
                <button className="mt-6 text-tertiary font-bold text-sm hover:underline flex items-center">
                  View Detailed Log <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>

            {/* Next Visit */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="col-span-12 lg:col-span-4 bg-white rounded-[2rem] md:rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm border border-surface-container"
            >
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center font-headline">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  Next Visit
                </h3>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-white">
                  <p className="text-xs opacity-80 uppercase tracking-widest font-bold mb-1">Thursday, Oct 24</p>
                  <h4 className="text-xl font-bold mb-4">General Evaluation</h4>
                  <div className="flex items-center text-sm mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    09:30 AM — 11:00 AM
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    St. Jude’s Medical Center
                  </div>
                </div>
              </div>
              <Link to="/book-appointment" className="mt-8 w-full py-4 bg-surface-container-high text-primary rounded-full font-bold text-sm hover:bg-surface-container-highest transition-colors flex items-center justify-center">
                Reschedule Appointment
              </Link>
            </motion.div>

            {/* Messaging */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-12 lg:col-span-8 bg-white rounded-[2rem] md:rounded-3xl shadow-sm border border-surface-container h-[500px] flex flex-col"
            >
              <div className="p-4 md:p-6 border-b border-surface-container flex items-center justify-between">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="relative">
                    <img 
                      src="https://picsum.photos/seed/sarah/100/100" 
                      alt="Dr. Sarah" 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary font-headline text-sm md:text-base">Dr. Sarah Chen</h3>
                    <p className="text-[10px] md:text-xs text-on-surface-variant">Active now — Your Care Coordinator</p>
                  </div>
                </div>
                <div className="flex space-x-1 md:space-x-2">
                  <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant"><Phone className="w-4 h-4 md:w-5 md:h-5" /></button>
                  <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant"><Video className="w-4 h-4 md:w-5 md:h-5" /></button>
                </div>
              </div>
              <div className="flex-grow p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto no-scrollbar">
                <div className="flex items-start max-w-[85%] md:max-w-[80%] space-x-2 md:space-x-3">
                  <div className="bg-surface-container p-3 md:p-4 rounded-2xl rounded-tl-none">
                    <p className="text-xs md:text-sm">Hi Emily, I've just updated your lab results in the portal. Everything looks stable for the match criteria. How are you feeling today?</p>
                    <span className="text-[10px] text-on-surface-variant mt-1 md:mt-2 block">09:15 AM</span>
                  </div>
                </div>
                <div className="flex items-start justify-end max-w-[85%] md:max-w-[80%] ml-auto space-x-2 md:space-x-3">
                  <div className="bg-primary text-white p-3 md:p-4 rounded-2xl rounded-tr-none">
                    <p className="text-xs md:text-sm">Thanks Dr. Chen. I'm feeling okay, just a bit anxious about the upcoming appointment next week. Should I bring the new records?</p>
                    <span className="text-[10px] text-white/70 mt-1 md:mt-2 block">09:42 AM</span>
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-6 border-t border-surface-container">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="w-full pl-4 pr-12 md:pr-16 py-3 md:py-4 bg-surface-container-low rounded-full border-none focus:ring-2 focus:ring-primary/20 text-xs md:text-sm"
                  />
                  <button className="absolute right-1.5 md:right-2 top-1.5 md:top-2 p-1.5 md:p-2 bg-primary text-white rounded-full hover:opacity-90 transition-opacity">
                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Support & Mental Health */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-tertiary/10 text-tertiary rounded-[2rem] md:rounded-3xl p-6 md:p-8 relative overflow-hidden"
              >
                <Heart className="w-24 h-24 absolute -bottom-4 -right-4 opacity-10" />
                <h3 className="text-xl font-bold mb-2 font-headline">Mental Wellbeing</h3>
                <p className="text-sm mb-6 leading-relaxed opacity-90">Your emotional health is just as important as your physical readiness. Access resources designed for you.</p>
                <Link to="/support" className="inline-flex items-center px-6 py-3 bg-tertiary text-white rounded-full font-bold text-sm hover:opacity-90">
                  Speak to a Counselor
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-surface-container-low rounded-[2rem] md:rounded-3xl p-6 md:p-8 space-y-4"
              >
                <h3 className="text-xl font-bold mb-6 font-headline">Support Communities</h3>
                {[
                  { icon: MessageCircle, title: 'Resilience Circle', sub: 'Daily Peer Support', to: '/community' },
                  { icon: BookOpen, title: 'Wellness Library', sub: 'Guided Meditation & Tips', to: '/support' },
                  { icon: Users, title: 'Donor Families', sub: 'Connection & Gratitude', to: '/community' },
                ].map((item, i) => (
                  <Link key={i} to={item.to} className="w-full group flex items-center justify-between p-4 bg-white rounded-2xl hover:translate-x-1 duration-200 shadow-sm">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-4 group-hover:bg-primary group-hover:text-white transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold">{item.title}</p>
                        <p className="text-[10px] text-on-surface-variant">{item.sub}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-on-surface-variant" />
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
