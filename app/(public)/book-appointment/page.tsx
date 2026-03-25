"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Heart,
  Stethoscope,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function BookAppointmentPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Personal Info
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    emergency_contact: '',
    
    // Medical Info
    organ_needed: '',
    blood_type: '',
    diagnosis: '',
    medications: '',
    allergies: '',
    dialysis_status: false,
    insurance_provider: '',
    
    // Medical History
    history_diabetes: false,
    history_hypertension: false,
    history_heart_disease: false,
    previous_transplant: false,
    surgical_history: '',
  });

  const supabase = createClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Compile history into a JSON string
      const medicalHistory = JSON.stringify({
        diabetes: formData.history_diabetes,
        hypertension: formData.history_hypertension,
        heart_disease: formData.history_heart_disease,
        previous_transplant: formData.previous_transplant,
        surgical_history: formData.surgical_history
      });

      const { error: submitError } = await supabase
        .from('appointments')
        .insert([{
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.date_of_birth,
          gender: formData.gender,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zip_code,
          emergency_contact: formData.emergency_contact,
          organ_needed: formData.organ_needed,
          blood_type: formData.blood_type,
          diagnosis: formData.diagnosis,
          medications: formData.medications,
          allergies: formData.allergies,
          dialysis_status: formData.dialysis_status,
          insurance_provider: formData.insurance_provider,
          medical_history: medicalHistory,
          status: 'pending'
        }]);

      if (submitError) throw submitError;

      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to submit booking request.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 max-w-lg w-full rounded-[2.5rem] shadow-2xl text-center border border-surface-container"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-headline font-bold text-on-surface mb-4">Request Submitted</h2>
          <p className="text-on-surface-variant mb-8">
            Your comprehensive evaluation request has been securely transmitted to our clinical team. A care coordinator will review your information and contact you shortly with your secure patient portal credentials.
          </p>
          <Link href="/" className="inline-flex items-center justify-center w-full py-4 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <Link href="/" className="inline-block mb-8 text-primary font-headline font-black text-xl hover:opacity-80 transition-opacity">
          Giving Smiles Everyday
        </Link>
        <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface mb-4 tracking-tight">Clinical Evaluation Request</h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
          Please provide comprehensive details to help our medical board expedite your transplant evaluation. All data is end-to-end encrypted and HIPAA compliant.
        </p>
        
        {/* Progress Bar */}
        <div className="flex items-center justify-center mt-10 max-w-md mx-auto">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= s ? 'bg-primary text-white shadow-lg' : 'bg-surface-container text-on-surface-variant'
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-2 rounded-full ${
                  step > s ? 'bg-primary' : 'bg-surface-container'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between max-w-md mx-auto mt-3 text-xs font-bold text-on-surface-variant uppercase tracking-widest px-2">
          <span>Personal</span>
          <span>Medical</span>
          <span>History</span>
        </div>
      </div>

      {/* Form Container */}
      <motion.div 
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl border border-surface-container p-6 md:p-12"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
              {error}
            </div>
          )}

          {/* STEP 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-surface-container pb-4 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><ShieldCheck className="w-6 h-6" /></div>
                <h2 className="text-2xl font-headline font-bold">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">First Name</label>
                  <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} required className="w-full px-5 py-4 bg-surface-container-low border-surface-container rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Last Name</label>
                  <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} required className="w-full px-5 py-4 bg-surface-container-low border-surface-container rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-5 py-4 bg-surface-container-low border-surface-container rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-5 py-4 bg-surface-container-low border-surface-container rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Date of Birth</label>
                  <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} required className="w-full px-5 py-4 bg-surface-container-low border-surface-container rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full px-5 py-4 bg-surface-container-low border-surface-container rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 border-t border-surface-container pt-6 mt-6">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Emergency Contact (Name & Phone)</label>
                <input type="text" name="emergency_contact" value={formData.emergency_contact} onChange={handleInputChange} required placeholder="e.g. Jane Doe - 555-0192" className="w-full px-5 py-4 bg-surface-container-low border-surface-container rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
              </div>
            </div>
          )}

          {/* STEP 2: Medical Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-surface-container pb-4 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><Heart className="w-6 h-6" /></div>
                <h2 className="text-2xl font-headline font-bold">Transplant Requirements</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Organ Needed</label>
                  <select name="organ_needed" value={formData.organ_needed} onChange={handleInputChange} required className="w-full px-5 py-4 bg-surface-container-low border-surface-container rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-bold text-primary">
                    <option value="">Select Organ</option>
                    <option value="Kidney">Kidney</option>
                    <option value="Liver">Liver</option>
                    <option value="Heart">Heart</option>
                    <option value="Lung">Lung</option>
                    <option value="Pancreas">Pancreas</option>
                    <option value="Intestine">Intestine</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Blood Type</label>
                  <select name="blood_type" value={formData.blood_type} onChange={handleInputChange} required className="w-full px-5 py-4 bg-surface-container-low border-surface-container rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm">
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Primary Diagnosis / Reason for Transplant</label>
                <input type="text" name="diagnosis" value={formData.diagnosis} onChange={handleInputChange} required className="w-full px-5 py-4 bg-surface-container-low border-surface-container rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
              </div>

              {formData.organ_needed === 'Kidney' && (
                <div className="p-4 bg-surface-container-low rounded-2xl border border-surface-container flex items-center gap-3">
                  <input type="checkbox" name="dialysis_status" checked={formData.dialysis_status} onChange={handleInputChange} className="w-5 h-5 text-primary rounded border-surface-container focus:ring-primary" id="dialysis" />
                  <div>
                    <label htmlFor="dialysis" className="font-bold text-sm text-on-surface">Currently on Dialysis</label>
                    <p className="text-xs text-on-surface-variant">Check if you are actively receiving dialysis treatments.</p>
                  </div>
                </div>
              )}

              <div className="space-y-2 mt-4">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Current Medications</label>
                <textarea name="medications" value={formData.medications} onChange={handleInputChange} rows={3} placeholder="List current medications and dosages..." className="w-full px-5 py-4 bg-surface-container-low border-surface-container rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm resize-none" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Known Allergies</label>
                <input type="text" name="allergies" value={formData.allergies} onChange={handleInputChange} placeholder="E.g. Penicillin, Latex (or list None)" required className="w-full px-5 py-4 bg-surface-container-low border-surface-container rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
              </div>
            </div>
          )}

          {/* STEP 3: History & Consent */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-surface-container pb-4 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><Stethoscope className="w-6 h-6" /></div>
                <h2 className="text-2xl font-headline font-bold">History & Insurance</h2>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Pre-existing Conditions</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center p-4 border border-surface-container rounded-xl hover:bg-surface-container-low cursor-pointer transition-colors">
                    <input type="checkbox" name="history_diabetes" checked={formData.history_diabetes} onChange={handleInputChange} className="w-4 h-4 text-primary rounded mr-3" />
                    <span className="text-sm font-bold">Diabetes</span>
                  </label>
                  <label className="flex items-center p-4 border border-surface-container rounded-xl hover:bg-surface-container-low cursor-pointer transition-colors">
                    <input type="checkbox" name="history_hypertension" checked={formData.history_hypertension} onChange={handleInputChange} className="w-4 h-4 text-primary rounded mr-3" />
                    <span className="text-sm font-bold">Hypertension</span>
                  </label>
                  <label className="flex items-center p-4 border border-surface-container rounded-xl hover:bg-surface-container-low cursor-pointer transition-colors">
                    <input type="checkbox" name="history_heart_disease" checked={formData.history_heart_disease} onChange={handleInputChange} className="w-4 h-4 text-primary rounded mr-3" />
                    <span className="text-sm font-bold">Heart Disease</span>
                  </label>
                  <label className="flex items-center p-4 border border-surface-container rounded-xl hover:bg-surface-container-low cursor-pointer transition-colors">
                    <input type="checkbox" name="previous_transplant" checked={formData.previous_transplant} onChange={handleInputChange} className="w-4 h-4 text-primary rounded mr-3" />
                    <span className="text-sm font-bold">Previous Transplant</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Previous Surgical History</label>
                <textarea name="surgical_history" value={formData.surgical_history} onChange={handleInputChange} rows={2} placeholder="Briefly describe past surgeries..." className="w-full px-5 py-4 bg-surface-container-low border-surface-container rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm resize-none" />
              </div>

              <div className="space-y-2 mt-4">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Primary Insurance Provider</label>
                <input type="text" name="insurance_provider" value={formData.insurance_provider} onChange={handleInputChange} required className="w-full px-5 py-4 bg-surface-container-low border-surface-container rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
              </div>

              {/* File Upload Stub */}
              <div className="mt-8 p-6 bg-tertiary/5 rounded-2xl border border-tertiary/20 border-dashed text-center">
                <p className="text-sm font-bold text-tertiary mb-2">Medical Documents Upload</p>
                <p className="text-xs text-on-surface-variant mb-4">You will be able to securely upload supporting medical records (diagnoses, lab results, imaging) from your Patient Dashboard once your account is created.</p>
              </div>

              <div className="flex items-start gap-3 pt-6 border-t border-surface-container">
                <input type="checkbox" id="consent" required className="mt-1 w-5 h-5 text-primary rounded border-surface-container" />
                <label htmlFor="consent" className="text-xs text-on-surface-variant leading-relaxed">
                  I certify that the information provided is accurate and complete to the best of my knowledge. I consent to the collection and evaluation of this medical data by Giving Smiles Everyday clinical staff for the purpose of transplant registration.
                </label>
              </div>
            </div>
          )}

          {/* Form Navigation */}
          <div className="flex items-center justify-between pt-8">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 font-bold text-primary hover:bg-surface-container-low rounded-full transition-colors"
                disabled={isLoading}
              >
                Back
              </button>
            ) : <div></div>}
            
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-primary text-white px-8 md:px-12 py-4 rounded-full font-headline font-bold text-base md:text-lg shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-3 disabled:opacity-50 ml-auto"
            >
              {isLoading ? 'Processing...' : step < 3 ? 'Continue to Next Step' : 'Submit Evaluation Request'}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
