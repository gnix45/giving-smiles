"use client";

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Search, 
  Filter,
  Eye,
  Activity,
  Heart
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

export default function PatientsList() {
  const [patients, setPatients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const supabase = createClient();

  useEffect(() => {
    async function loadPatients() {
      try {
        const { data, error } = await supabase
          .from('patients')
          .select(`
            *,
            profiles(full_name, email, avatar_url)
          `)
          .order('updated_at', { ascending: false });

        if (error) throw error;
        setPatients(data || []);
      } catch (err) {
        console.error("Error loading patients:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPatients();
  }, [supabase]);

  const filteredPatients = patients.filter(p => 
    p.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.organ_needed?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-headline font-bold text-on-surface">Patient Directory</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage active patients and medical profiles.</p>
        </div>
        <Link 
          href="/clinical-patients/new" 
          className="bg-primary text-white px-6 py-2.5 rounded-full font-bold shadow-sm hover:opacity-90 transition-opacity"
        >
          Add Patient
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] border border-surface-container shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-surface-container flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Search patients by name or organ..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-surface text-on-surface-variant rounded-xl border border-surface-container shrink-0 w-full sm:w-auto justify-center font-bold text-sm hover:bg-surface-container-low transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 text-xs text-on-surface-variant uppercase tracking-wider">
                <th className="p-4 font-bold border-b border-surface-container">Patient</th>
                <th className="p-4 font-bold border-b border-surface-container">Organ Needed</th>
                <th className="p-4 font-bold border-b border-surface-container">Blood Type</th>
                <th className="p-4 font-bold border-b border-surface-container">Status</th>
                <th className="p-4 font-bold border-b border-surface-container text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant font-bold">Loading patients...</td>
                </tr>
              ) : filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant font-bold">No patients found.</td>
                </tr>
              ) : (
                filteredPatients.map(patient => (
                  <tr key={patient.profile_id} className="hover:bg-surface-container-lowest transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-surface-container overflow-hidden shrink-0 relative">
                           {patient.profiles?.avatar_url ? (
                            <Image src={patient.profiles.avatar_url} alt="Avatar" fill style={{ objectFit: 'cover' }} unoptimized />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                              {patient.profiles?.full_name?.charAt(0) || 'P'}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-on-surface">{patient.profiles?.full_name || 'Unknown Patient'}</div>
                          <div className="text-xs text-on-surface-variant">{patient.profile_id.substring(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-bold font-headline">
                        <Heart className="w-3.5 h-3.5" />
                        {patient.organ_needed || 'Unassigned'}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-on-surface">{patient.blood_type || 'N/A'}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${patient.organ_needed ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                        <span className="text-sm text-on-surface-variant">{patient.organ_needed ? 'Active Waitlist' : 'Evaluating'}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Link href={`/clinical-patients/${patient.profile_id}`} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold hover:bg-primary/20 transition-colors flex items-center gap-1 justify-center">
                        <Eye className="w-3 h-3" /> View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
