"use client";

import React from 'react';
import { Heart, Phone, BookOpen, Apple, ShieldCheck, Users, CalendarDays, Stethoscope } from 'lucide-react';

const resources = [
  { title: 'Transplant FAQ', desc: 'Common questions about the organ transplant process.', icon: BookOpen, color: 'bg-primary/10 text-primary' },
  { title: 'Mental Health Support', desc: 'Counseling resources and emotional wellness guides.', icon: Heart, color: 'bg-rose-100 text-rose-600' },
  { title: 'Nutrition & Diet', desc: 'Pre and post-transplant dietary recommendations.', icon: Apple, color: 'bg-emerald-100 text-emerald-600' },
  { title: 'Post-Op Recovery', desc: 'Recovery milestones and what to expect after surgery.', icon: Stethoscope, color: 'bg-blue-100 text-blue-600' },
];

const timeline = [
  { stage: 'Referral & Evaluation', desc: 'Initial medical assessment and eligibility review.', active: true },
  { stage: 'Waitlist Placement', desc: 'Added to the national organ transplant waiting list.', active: true },
  { stage: 'Matching & Notification', desc: 'System finds a compatible organ donor match.', active: false },
  { stage: 'Transplant Surgery', desc: 'Organ transplant procedure carried out.', active: false },
  { stage: 'Recovery & Follow-up', desc: 'Post-op monitoring, medication, and rehabilitation.', active: false },
];

const supportGroups = [
  { name: 'Kidney Warriors Circle', date: 'Every Tuesday, 6:00 PM', members: 24 },
  { name: 'Liver Transplant Support', date: 'Every Thursday, 7:00 PM', members: 18 },
  { name: 'Heart & Lung Network', date: 'Every Saturday, 10:00 AM', members: 12 },
];

export default function CommunityPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-headline font-bold text-on-surface">Support & Community</h1>
        <p className="text-sm text-on-surface-variant mt-1">Resources, guidance, and community connections for your transplant journey.</p>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map(r => (
          <div key={r.title} className="bg-white rounded-2xl border border-surface-container p-5 shadow-sm flex gap-4 items-start hover:shadow-md transition-shadow cursor-pointer">
            <div className={`w-11 h-11 rounded-xl ${r.color} flex items-center justify-center shrink-0`}>
              <r.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-on-surface">{r.title}</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Journey Timeline */}
      <div className="bg-white rounded-2xl border border-surface-container p-6 shadow-sm">
        <h2 className="font-bold text-on-surface mb-5 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" /> Your Transplant Journey
        </h2>
        <div className="space-y-0">
          {timeline.map((step, i) => (
            <div key={step.stage} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 transition-colors ${step.active ? 'border-primary bg-primary' : 'border-surface-container bg-white'}`} />
                {i < timeline.length - 1 && <div className={`w-0.5 flex-1 min-h-[2rem] ${step.active ? 'bg-primary/30' : 'bg-surface-container'}`} />}
              </div>
              <div className="pb-6">
                <p className={`text-sm font-bold ${step.active ? 'text-on-surface' : 'text-on-surface-variant'}`}>{step.stage}</p>
                <p className="text-xs text-on-surface-variant mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Groups */}
      <div className="bg-white rounded-2xl border border-surface-container p-6 shadow-sm">
        <h2 className="font-bold text-on-surface mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" /> Support Groups
        </h2>
        <div className="space-y-3">
          {supportGroups.map(g => (
            <div key={g.name} className="flex items-center justify-between py-3 border-b border-surface-container/50 last:border-none">
              <div>
                <p className="font-bold text-on-surface text-sm">{g.name}</p>
                <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                  <CalendarDays className="w-3 h-3" /> {g.date}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-primary">{g.members} members</p>
                <button className="text-[10px] font-bold text-primary underline mt-0.5">Join</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 rounded-2xl border border-red-200 p-5 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-red-700">Emergency Transplant Hotline</h3>
          <p className="text-sm text-red-600 font-bold">1-800-GIVE-SMILES (1-800-448-3764)</p>
          <p className="text-xs text-red-500 mt-0.5">Available 24/7 for urgent transplant-related concerns.</p>
        </div>
      </div>
    </div>
  );
}
