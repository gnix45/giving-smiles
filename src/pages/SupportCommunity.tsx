import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  BookOpen, 
  Heart, 
  Star, 
  Search, 
  Plus, 
  ChevronRight,
  ArrowRight,
  PlayCircle,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sidebar } from '@/src/components/Sidebar';
import { TopNav } from '@/src/components/TopNav';
import { cn } from '@/src/lib/utils';

export const SupportCommunity = () => {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar role="patient" />
      <main className="flex-1 md:ml-64">
        <TopNav title="Support Community" />
        
        <div className="p-4 md:p-8 lg:p-12 pt-24 max-w-7xl mx-auto w-full space-y-8 md:space-y-12">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-primary font-bold tracking-widest text-[10px] md:text-xs uppercase">Peer Support Network</span>
              <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface tracking-tight mt-2">Community Hub</h2>
              <p className="text-on-surface-variant max-w-lg mt-3 text-sm">You are not alone. Connect with peers, share your story, and find strength in our collective journey.</p>
            </div>
            <button className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-full font-semibold shadow-xl shadow-primary/10 hover:opacity-90 transition-all flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Start a Discussion
            </button>
          </header>

          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {/* Peer Groups */}
            <div className="col-span-12 lg:col-span-8 space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[
                  { title: 'Resilience Circle', members: 1240, posts: 42, icon: Heart, color: 'bg-primary', desc: 'A space for those currently on the waitlist to share hope and tips.' },
                  { title: 'Donor Gratitude', members: 850, posts: 18, icon: Star, color: 'bg-tertiary', desc: 'Connecting recipient families with a community of gratitude.' },
                  { title: 'Caregivers Hub', members: 620, posts: 24, icon: Users, color: 'bg-secondary', desc: 'Resources and support for the families supporting patients.' },
                  { title: 'Wellness Warriors', members: 2100, posts: 56, icon: Activity, color: 'bg-primary-container', desc: 'Focusing on mental health, meditation, and physical readiness.' },
                ].map((group, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-surface-container flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg", group.color)}>
                        <group.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-headline font-bold text-on-surface mb-2">{group.title}</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed mb-6">{group.desc}</p>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-surface-container">
                      <div className="flex -space-x-2">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                            <img src={`https://picsum.photos/seed/user${j+i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
                          +{group.members - 4}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Discussions */}
              <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-surface-container">
                <h3 className="font-headline font-bold text-xl md:text-2xl mb-6 md:mb-8">Recent Discussions</h3>
                <div className="space-y-6 md:space-y-8">
                  {[
                    { user: 'Marcus J.', time: '2h ago', title: 'Tips for staying positive during the long wait?', replies: 24, likes: 112 },
                    { user: 'Sarah L.', time: '5h ago', title: 'Just received my match notification! Here is what happened.', replies: 56, likes: 420 },
                    { user: 'David K.', time: '1d ago', title: 'Recommended meditation apps for anxiety?', replies: 12, likes: 45 },
                  ].map((post, i) => (
                    <div key={i} className="flex gap-6 group cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden shrink-0">
                        <img src={`https://picsum.photos/seed/post${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 border-b border-surface-container pb-8 group-last:border-none group-last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">{post.title}</h4>
                          <span className="text-xs text-on-surface-variant">{post.time}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant mb-4">Started by <span className="font-bold text-on-surface">{post.user}</span></p>
                        <div className="flex gap-6">
                          <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
                            <MessageSquare className="w-4 h-4" /> {post.replies} Replies
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
                            <Heart className="w-4 h-4" /> {post.likes} Likes
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-10 py-4 text-center text-xs font-bold text-primary uppercase tracking-widest bg-surface-container-low hover:bg-surface-container-high transition-colors rounded-2xl">
                  View All Discussions
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="col-span-12 lg:col-span-4 space-y-6 md:space-y-8">
              <div className="bg-surface-container-low p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-surface-container">
                <h3 className="font-headline font-bold text-xl text-on-surface mb-6 md:mb-8">Upcoming Events</h3>
                <div className="space-y-6">
                  {[
                    { date: 'Oct 28', title: 'Mindfulness Webinar', time: '6:00 PM EST' },
                    { date: 'Nov 02', title: 'Peer Support Group', time: '11:00 AM EST' },
                    { date: 'Nov 15', title: 'Donor Family Meetup', time: '2:00 PM EST' },
                  ].map((event, i) => (
                    <div key={i} className="flex gap-4 items-center group cursor-pointer">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex flex-col items-center justify-center shrink-0 border border-surface-container group-hover:border-primary transition-colors">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">{event.date.split(' ')[0]}</span>
                        <span className="text-lg font-headline font-black text-on-surface">{event.date.split(' ')[1]}</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">{event.title}</p>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-10 py-4 bg-primary text-white rounded-full font-bold text-sm shadow-lg shadow-primary/10 hover:opacity-90 transition-all">
                  View Event Calendar
                </button>
              </div>

              <div className="bg-primary p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
                <BookOpen className="w-32 h-32 absolute -right-8 -top-8 opacity-10" />
                <h3 className="font-headline font-bold text-xl mb-4">Wellbeing Library</h3>
                <p className="text-sm text-white/80 leading-relaxed mb-8">
                  Access our curated collection of guided meditations, nutritional guides, and patient stories.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/10">
                    <PlayCircle className="w-5 h-5" />
                    <span className="text-xs font-bold">10m Guided Meditation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl border border-white/10">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-xs font-bold">Nutrition for Recovery</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-white text-primary rounded-full font-bold text-sm hover:bg-white/90 transition-all">
                  Explore Library
                </button>
              </div>

              <div className="p-6 md:p-10 bg-tertiary/10 rounded-[2rem] md:rounded-[2.5rem] border border-tertiary/20">
                <h3 className="font-headline font-bold text-xl text-tertiary mb-4">Need Immediate Help?</h3>
                <p className="text-sm text-tertiary/80 leading-relaxed mb-8">
                  If you are experiencing a mental health crisis, our counselors are available 24/7.
                </p>
                <Link to="/support" className="w-full py-4 bg-tertiary text-white rounded-full font-bold text-sm shadow-lg shadow-tertiary/10 hover:opacity-90 transition-all flex items-center justify-center">
                  Contact Counselor
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};
