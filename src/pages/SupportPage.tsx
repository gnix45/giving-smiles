import React from 'react';
import { motion } from 'motion/react';
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Search, 
  ChevronRight, 
  BookOpen, 
  ShieldCheck, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { Sidebar } from '@/src/components/Sidebar';
import { TopNav } from '@/src/components/TopNav';
import { cn } from '@/src/lib/utils';

export const SupportPage = ({ role = 'patient' }: { role?: 'patient' | 'clinical' }) => {
  const faqs = [
    { q: 'How do I update my donation preferences?', a: 'You can update your preferences anytime in the Legacy Plan section of your portal.' },
    { q: 'What is the HLA matching process?', a: 'HLA matching analyzes genetic markers to ensure the highest compatibility between donor and recipient.' },
    { q: 'How is my privacy protected?', a: 'We use AES-256 encryption and are fully HIPAA compliant to ensure your data is safe.' },
    { q: 'Who can access my medical records?', a: 'Only you and your authorized clinical care team can access your detailed medical history.' },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar role={role} />
      <main className="flex-1 md:ml-64">
        <TopNav title="Help & Support" />
        
        <div className="p-4 md:p-8 lg:p-12 pt-24 max-w-5xl mx-auto w-full space-y-8 md:space-y-12">
          <header className="text-center space-y-3 md:space-y-4">
            <h1 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface tracking-tight">How can we help you today?</h1>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-sm leading-relaxed">
              Search our knowledge base or connect with our support team for personalized assistance.
            </p>
            <div className="max-w-2xl mx-auto relative mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search for articles, guides, or FAQs..." 
                className="w-full pl-12 pr-6 py-4 bg-white rounded-2xl border border-surface-container shadow-sm focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Phone, title: 'Call Support', desc: role === 'patient' ? 'Available 24/7 for urgent medical inquiries.' : 'Available 24/7 for urgent clinical inquiries.', action: '1-800-BEACON-HELP' },
              { icon: MessageSquare, title: 'Live Chat', desc: 'Chat with a support specialist in real-time.', action: 'Start Chat' },
              { icon: Mail, title: 'Email Us', desc: 'Send us a detailed inquiry for non-urgent matters.', action: 'support@beacon.org' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-surface-container text-center group hover:shadow-md transition-all">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mx-auto mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-base md:text-lg font-headline font-bold text-on-surface mb-2">{item.title}</h3>
                <p className="text-xs text-on-surface-variant mb-4 md:mb-6 leading-relaxed">{item.desc}</p>
                <button className="text-primary font-bold text-sm hover:underline">{item.action}</button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-6 md:space-y-8">
              <section className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-surface-container">
                <h3 className="text-xl md:text-2xl font-headline font-bold text-on-surface mb-6 md:mb-8">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <details key={i} className="group bg-surface-container-low rounded-2xl border border-surface-container overflow-hidden">
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <span className="font-bold text-sm text-on-surface">{faq.q}</span>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="px-6 pb-6 text-sm text-on-surface-variant leading-relaxed">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              <section className="bg-primary p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
                <BookOpen className="w-32 h-32 absolute -right-8 -top-8 opacity-10" />
                <h3 className="text-xl md:text-2xl font-headline font-bold mb-4">Knowledge Base</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-8 max-w-md">
                  Explore our comprehensive library of articles, video tutorials, and {role === 'patient' ? 'medical guides' : 'clinical guides'} to help you navigate your journey.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Patient Onboarding Guide',
                    'Understanding HLA Matching',
                    'Post-Op Recovery Protocols',
                    'Donor Family Support'
                  ].map((guide, i) => (
                    <button key={i} className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/20 transition-all text-left">
                      <span className="text-xs font-bold">{guide}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <aside className="col-span-12 lg:col-span-4 space-y-6 md:space-y-8">
              <div className="bg-tertiary/10 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-tertiary/20">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <AlertCircle className="w-5 h-5 text-tertiary" />
                  <h4 className="font-headline font-bold text-tertiary">Emergency Contact</h4>
                </div>
                <p className="text-sm text-tertiary/80 leading-relaxed mb-8">
                  If you are experiencing a medical emergency, please dial 911 or your local emergency number immediately.
                </p>
                <button className="w-full py-4 bg-tertiary text-white rounded-full font-bold text-sm shadow-lg shadow-tertiary/10 hover:opacity-90 transition-all">
                  Emergency Protocols
                </button>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-surface-container shadow-sm">
                <h4 className="font-headline font-bold text-on-surface mb-4 md:mb-6">Security & Privacy</h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">HIPAA Compliant</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Data Protection</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">AES-256 Encrypted</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Secure Storage</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};
