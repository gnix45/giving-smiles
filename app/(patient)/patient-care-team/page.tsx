"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { Users, Clock, Mail, Phone, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CareTeamPage() {
  const { profile } = useAuth();
  const supabase = createClient();
  const [team, setTeam] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Note: For simplicity in the demo, all clinicians act as the care team.
  // In a real app we would join through an 'assigned_doctors' mapping table.
  useEffect(() => {
    async function loadTeam() {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .in('role', ['doctor', 'admin'])
          .limit(3);
          
        setTeam(data || []);
      } catch (err) {
        console.error("Error loading care team:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadTeam();
  }, [supabase]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">Your Care Team</h1>
        <p className="text-on-surface-variant font-body text-sm mt-1">
          Direct lines of communication to your primary transplant coordinators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-on-surface-variant font-bold">Loading care team...</div>
        ) : (
          team.map((clinician, idx) => (
            <div key={clinician.id} className="bg-white rounded-[2rem] border border-surface-container overflow-hidden shadow-sm group hover:border-primary/30 transition-colors">
              <div className="p-6 md:p-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-surface-container overflow-hidden relative mb-4">
                  <Image 
                    // Alternate seed for visual variety
                    src={clinician.avatar_url || `https://picsum.photos/seed/doctor${idx}/100/100`} 
                    alt={clinician.full_name} 
                    fill 
                    style={{ objectFit: 'cover' }} 
                    unoptimized 
                  />
                </div>
                <h3 className="text-lg font-headline font-bold text-on-surface">{clinician.full_name}</h3>
                <p className="text-sm font-bold text-primary mt-1 uppercase tracking-wider text-[10px]">
                  {idx === 0 ? 'Primary Surgeon' : idx === 1 ? 'Transplant Coord.' : 'Social Worker'}
                </p>
                <div className="mt-4 flex flex-col gap-2 w-full text-left">
                   <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                     <Mail className="w-4 h-4" /> {clinician.email}
                   </div>
                   <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                     <Clock className="w-4 h-4" /> Available M-F, 9a-5p
                   </div>
                </div>
              </div>
              <div className="border-t border-surface-container flex divide-x divide-surface-container">
                <Link href={`/patient/messages?user=${clinician.id}`} className="flex-1 p-4 text-center text-sm font-bold text-primary hover:bg-primary/5 transition-colors">
                  Message
                </Link>
                <button className="flex-1 p-4 text-center text-sm font-bold text-on-surface-variant flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors">
                  <Phone className="w-4 h-4" /> Call
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
