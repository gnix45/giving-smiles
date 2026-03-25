"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { FileText, Save, ShieldCheck, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MedicalInfoPage() {
  const { profile } = useAuth();
  const supabase = createClient();
  
  const [patientData, setPatientData] = useState<any>(null);
  const [formData, setFormData] = useState({
    medications: '',
    allergies: '',
    emergency_contact: '',
    insurance_provider: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    async function loadData() {
      if (!profile?.id) return;
      try {
        const { data } = await supabase
          .from('patients')
          .select('*')
          .eq('profile_id', profile.id)
          .single();
          
        if (data) {
          setPatientData(data);
          setFormData({
            medications: data.medications || '',
            allergies: data.allergies || '',
            emergency_contact: data.emergency_contact || '',
            insurance_provider: data.insurance_provider || '',
          });
        }
      } catch (error) {
        console.error("Error loading medical info:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [profile?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.id) return;
    
    setIsSaving(true);
    setMessage(null);
    
    try {
      const { error } = await supabase
        .from('patients')
        .update({
          medications: formData.medications,
          allergies: formData.allergies,
          emergency_contact: formData.emergency_contact,
          insurance_provider: formData.insurance_provider,
        })
        .eq('profile_id', profile.id);
        
      if (error) throw error;
      setMessage({ type: 'success', text: 'Medical information updated successfully.' });
    } catch (error: any) {
      console.error(error);
      setMessage({ type: 'error', text: error.message || 'Failed to update information.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-on-surface-variant font-bold">Loading medical profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">Medical Profile</h1>
        <p className="text-on-surface-variant font-body text-sm mt-1">
          Review your clinical data. Some fields are locked and can only be updated by your care team.
        </p>
      </div>

      {message && (
        <div className={cn(
          "p-4 rounded-2xl flex items-start gap-3 border",
          message.type === 'success' ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-600 border-red-100"
        )}>
          {message.type === 'success' ? <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
          <div className="text-sm font-bold">{message.text}</div>
        </div>
      )}

      {/* Locked System Data */}
      <div className="bg-white rounded-[2rem] border border-surface-container p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 border-b border-surface-container pb-4 mb-6">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-headline font-bold text-on-surface">Verified Clinical Data</h2>
          <span className="ml-auto px-3 py-1 bg-surface-container text-xs font-bold text-on-surface-variant rounded-full uppercase tracking-wider">
            Locked
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Organ Needed</p>
            <p className="text-lg font-bold text-on-surface mt-1">{patientData?.organ_needed || 'Unassigned'}</p>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Blood Type</p>
            <p className="text-lg font-bold text-on-surface mt-1">{patientData?.blood_type || 'Unassigned'}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Primary Diagnosis</p>
            <p className="text-sm font-medium text-on-surface mt-1 bg-surface-container-low p-4 rounded-xl border border-surface-container">
              {patientData?.diagnosis || 'No diagnosis recorded.'}
            </p>
          </div>
        </div>
      </div>

      {/* Editable Patient Data */}
      <form onSubmit={handleSave} className="bg-white rounded-[2rem] border border-surface-container p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-surface-container pb-4">
          <FileText className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-headline font-bold text-on-surface">Self-Reported Information</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">Current Medications</label>
            <textarea 
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              rows={3}
              className="w-full px-5 py-4 bg-surface rounded-2xl border border-surface-container focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm resize-none"
              placeholder="List any medications you are currently taking..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">Known Allergies <span className="text-red-500">*</span></label>
            <textarea 
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              rows={2}
              required
              className="w-full px-5 py-4 bg-surface rounded-2xl border border-surface-container focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm resize-none"
              placeholder="List any drug or food allergies..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
              <label className="block text-sm font-bold text-on-surface mb-2">Emergency Contact</label>
              <input 
                type="text"
                name="emergency_contact"
                value={formData.emergency_contact}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-surface rounded-2xl border border-surface-container focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                placeholder="Name and Phone Number"
              />
            </div>
            
             <div>
              <label className="block text-sm font-bold text-on-surface mb-2">Insurance Provider</label>
              <input 
                type="text"
                name="insurance_provider"
                value={formData.insurance_provider}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-surface rounded-2xl border border-surface-container focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                placeholder="Provider Name & Policy Number"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-surface-container flex justify-end">
          <button 
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-md hover:bg-primary-container hover:text-white transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Updates'}
          </button>
        </div>
      </form>
    </div>
  );
}
