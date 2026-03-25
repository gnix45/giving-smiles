"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { FileText, Download, UploadCloud, AlertCircle, X, CheckCircle } from 'lucide-react';

export default function MedicalRecordsPage() {
  const { profile } = useAuth();
  const supabase = createClient();
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadRecords();
  }, [profile?.id]);

  async function loadRecords() {
    if (!profile?.id) return;
    try {
      const { data, error } = await supabase
        .from('medical_records')
        .select('*')
        .eq('patient_id', profile.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setRecords(data || []);
    } catch (err) {
      console.error("Error loading records:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !profile?.id) return;

    setUploading(true);
    try {
      // Insert record into the medical_records table (metadata only for now)
      const { error } = await supabase.from('medical_records').insert({
        patient_id: profile.id,
        title: file.name,
        record_type: file.type.includes('pdf') ? 'PDF Document' : file.type.includes('image') ? 'Image' : 'Document',
        file_name: file.name,
        file_size: file.size,
      });

      if (error) throw error;

      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
      await loadRecords();
    } catch (err: any) {
      console.error("Upload error:", err);
      alert("Upload failed: " + (err.message || 'Unknown error'));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">Medical Records</h1>
          <p className="text-on-surface-variant font-body text-sm mt-1">
            Access your uploaded documents, lab results, and clinical notes.
          </p>
        </div>
        
        <div className="relative w-full sm:w-auto">
          <input 
            ref={fileInputRef}
            type="file" 
            onChange={handleUpload}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className="hidden"
            id="record-upload"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-primary text-white px-6 py-2.5 rounded-full font-bold shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-50"
          >
            {uploading ? (
              <><span className="animate-spin">⏳</span> Uploading...</>
            ) : uploadSuccess ? (
              <><CheckCircle className="w-5 h-5" /> Uploaded!</>
            ) : (
              <><UploadCloud className="w-5 h-5" /> Upload Document</>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-surface-container shadow-sm overflow-hidden">
        {isLoading ? (
           <div className="p-12 text-center text-on-surface-variant font-bold">Loading your records...</div>
        ) : records.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mb-4 text-on-surface-variant opacity-50">
              <FileText className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-headline font-bold text-on-surface mb-2">No Records Found</h3>
            <p className="text-sm text-on-surface-variant max-w-sm">
              Your clinical team hasn't uploaded any documents yet. Use the upload button above to add your own lab results or documents.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50 text-xs text-on-surface-variant uppercase tracking-wider">
                  <th className="p-4 font-bold border-b border-surface-container">Document Name</th>
                  <th className="p-4 font-bold border-b border-surface-container">Date Added</th>
                  <th className="p-4 font-bold border-b border-surface-container hidden sm:table-cell">Type</th>
                  <th className="p-4 font-bold border-b border-surface-container text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {records.map((doc) => (
                  <tr key={doc.id} className="hover:bg-surface-container-lowest transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-sm text-on-surface">
                          {doc.title || 'Untitled Document'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-on-surface-variant">
                      {new Date(doc.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="p-4 text-sm text-on-surface-variant hidden sm:table-cell">
                      <span className="px-2.5 py-1 bg-surface-container rounded-md uppercase tracking-wider text-[10px] font-bold">
                        {doc.record_type || 'Clinical Note'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-primary transition-colors flex items-center justify-end w-full gap-2 text-sm font-bold">
                        <span className="hidden sm:inline-block opacity-0 group-hover:opacity-100 transition-opacity">View</span>
                        <Download className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="p-4 bg-tertiary/10 border border-tertiary/20 rounded-2xl flex items-start gap-3 text-tertiary text-sm">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <p>
          <strong>Data Privacy Notice:</strong> All documents uploaded here are strictly available only to you and your authorized transplant care team.
        </p>
      </div>
    </div>
  );
}
