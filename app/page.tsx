"use client";

import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Users, 
  Zap, 
  Globe, 
  ArrowRight, 
  Star 
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-surface-container">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          <div className="text-xl font-bold text-primary font-headline tracking-tight">
            Giving Smiles Everyday
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="#" className="text-primary border-b-2 border-primary pb-1 font-headline font-bold">Impact</Link>
            <Link href="#" className="text-slate-500 hover:text-primary font-headline font-bold transition-colors">Legacy</Link>
            <Link href="#" className="text-slate-500 hover:text-primary font-headline font-bold transition-colors">Support</Link>
            <Link href="#" className="text-slate-500 hover:text-primary font-headline font-bold transition-colors">Logistics</Link>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link href="/login" className="hidden sm:block text-slate-500 font-headline font-bold hover:text-primary transition-colors">Login</Link>
            <Link href="/book-appointment" className="bg-primary text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full font-headline font-bold text-sm md:text-base shadow-lg shadow-primary/10 active:scale-95 transition-all">
              Book Appointment
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero */}
        <section className="relative px-8 py-20 overflow-hidden min-h-[80vh] flex items-center">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 z-10"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase mb-6">
                Clinical Compassion
              </span>
              <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-primary leading-[1.1] mb-6 md:mb-8">
                Give the <br/><span className="text-tertiary">Gift of Life</span>
              </h1>
              <p className="text-on-surface-variant text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-8 md:mb-10">
                We bridge the gap between professional logistics and human connection, ensuring every organ donation is a legacy of hope and a smile for the future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book-appointment" className="bg-primary text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-headline font-bold text-base md:text-lg shadow-xl shadow-primary/20 hover:opacity-90 transition-all text-center">
                  Book an Appointment
                </Link>
                <Link href="/clinical-login" className="bg-surface-container-high text-primary px-8 md:px-10 py-3 md:py-4 rounded-full font-headline font-bold text-base md:text-lg hover:bg-surface-container-highest transition-all text-center">
                  Clinical Portal
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/doctor-hero/800/1000" 
                  alt="Doctor" 
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized // for picsum
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/20 backdrop-blur-md p-6 rounded-2xl border border-white/30 text-white">
                  <p className="font-headline font-bold text-xl mb-1">Impact Highlight</p>
                  <p className="text-sm opacity-90">Coordinating matches across 14 countries with 99.9% logistic precision.</p>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-tertiary/20 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-surface-container-low py-16 md:py-24 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary mb-4">Precision Metrics, Real Lives</h2>
              <div className="h-1 w-16 md:w-24 bg-tertiary mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {[
                { icon: Heart, value: '12,482', label: 'Lives Saved' },
                { icon: Users, value: '85.2k', label: 'Active Patients' },
                { icon: Zap, value: '14m', label: 'Match Speed' },
                { icon: Globe, value: '210', label: 'Hospitals Linked' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 md:p-8 rounded-[1.5rem] shadow-sm text-center"
                >
                  <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-primary mx-auto mb-3 md:mb-4" />
                  <div className="text-2xl md:text-4xl font-headline font-extrabold text-on-surface mb-1 md:mb-2">{stat.value}</div>
                  <div className="text-xs md:text-base text-on-surface-variant font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stories */}
        <section className="py-20 md:py-32 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-start">
              <div className="lg:w-1/3">
                <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary mb-4 md:mb-6 leading-tight">Stories of <br/>Renewed Hope</h2>
                <p className="text-on-surface-variant mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
                  Every donor leaves a legacy that changes families forever. Discover the human side of our logistics ecosystem.
                </p>
                <Link href="#" className="text-tertiary font-bold flex items-center gap-2 group hover:underline">
                  Read all donor stories 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {[
                  { 
                    img: 'https://picsum.photos/seed/story1/600/400', 
                    title: '"A Second Chance for Sarah"', 
                    text: '"The speed and care of the Giving Smiles team ensured my daughter\'s kidney transplant happened within days. We are forever grateful."',
                    author: 'Recipient Family, Seattle'
                  },
                  { 
                    img: 'https://picsum.photos/seed/story2/600/400', 
                    title: '"Honoring Arthur\'s Legacy"', 
                    text: '"Deciding to donate was hard, but knowing Arthur helped four people see and breathe again gives us immense peace."',
                    author: 'Donor Family, London',
                    offset: true
                  },
                ].map((story, i) => (
                  <motion.div 
                    key={i}
                    className={cn(
                      "bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow",
                      story.offset && "md:translate-y-12"
                    )}
                  >
                    <div className="h-64 overflow-hidden relative">
                      <Image src={story.img} alt={story.title} fill style={{ objectFit: 'cover'}} unoptimized />
                    </div>
                    <div className="p-8">
                      <div className="flex gap-1 text-tertiary mb-4">
                        {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                      </div>
                      <h3 className="font-headline font-bold text-xl mb-3 text-on-surface">{story.title}</h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{story.text}</p>
                      <div className="text-primary font-bold text-sm">{story.author}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <div className="bg-primary rounded-[2.5rem] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-white rounded-full blur-[100px]"></div>
              </div>
              <div className="relative z-10">
                <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-white mb-6 md:mb-8">Ready to take the next step?</h2>
                <p className="text-white/80 text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-12">
                  Booking an appointment with our clinical specialists is the first step towards a new life.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                  <Link href="/book-appointment" className="bg-tertiary text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-headline font-bold text-lg md:text-xl hover:scale-105 transition-transform shadow-xl text-center">
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-low py-12 px-8 border-t border-surface-container">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4">
          <div className="font-headline font-bold text-primary">Giving Smiles Everyday</div>
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start">
            {['Privacy Policy', 'Patient Rights', 'Contact Support', 'Medical Ethics'].map(link => (
              <Link key={link} href="#" className="text-xs text-slate-500 hover:text-tertiary transition-colors">{link}</Link>
            ))}
          </div>
          <p className="text-xs text-slate-500">© 2024 Giving Smiles Everyday. A Life-Giving Initiative.</p>
        </div>
      </footer>
    </div>
  );
}
