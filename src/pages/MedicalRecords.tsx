import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  Calendar, 
  Activity, 
  ChevronRight,
  Lock,
  Plus,
  AlertCircle
} from 'lucide-react';
import { Sidebar } from '@/src/components/Sidebar';
import { TopNav } from '@/src/components/TopNav';
import { cn } from '@/src/lib/utils';

export const MedicalRecords = () => {
  const records = [
    { id: 'LAB-9921', type: 'Blood Panel', date: 'Oct 12, 2024', doctor: 'Dr. Sarah Chen', status: 'Verified' },
    { id: 'IMG-4402', type: 'Chest X-Ray', date: 'Sep 28, 2024', doctor: 'Dr. Marcus Bell', status: 'Verified' },
    { id: 'LAB-8810', type: 'Urinalysis', date: 'Sep 15, 2024', doctor: 'Dr. Sarah Chen', status: 'Verified' },
    { id: 'DOC-1102', type: 'Consent Form', date: 'Aug 22, 2024', doctor: 'System Admin', status: 'Signed' },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar role="patient" />
      <main className="flex-1 md:ml-64">
        <TopNav title="Medical Records" />
        
        <div className="p-6 md:p-12 pt-24 max-w-7xl mx-auto w-full space-y-8">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-primary font-bold tracking-widest text-xs uppercase">Encrypted Archive</span>
              <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mt-2">Your Health Journey</h2>
              <p className="text-on-surface-variant max-w-lg mt-3 text-sm">Access your clinical history, lab results, and diagnostic imaging in one secure location.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white text-on-surface px-6 py-3 rounded-full font-bold text-sm border border-surface-container shadow-sm hover:bg-surface-container-low transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export All
              </button>
              <button className="bg-primary text-white px-8 py-3 rounded-full font-bold text-sm shadow-xl shadow-primary/10 hover:opacity-90 transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Upload Record
              </button>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              {/* Required Actions */}
              <div className="bg-tertiary/10 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-tertiary/20 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="bg-tertiary text-white w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-tertiary/20">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-headline font-bold text-tertiary mb-1">Required Actions</h3>
                  <p className="text-sm text-tertiary/80">You have 2 documents that require your digital signature for the upcoming match evaluation.</p>
                </div>
                <button className="bg-tertiary text-white px-8 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-all">
                  Review & Sign
                </button>
              </div>

              {/* Records List */}
              <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-surface-container overflow-hidden">
                <div className="p-6 md:p-8 border-b border-surface-container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="font-headline font-bold text-xl">Recent Records</h3>
                  <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-surface-container w-full sm:w-auto">
                    <Search className="w-4 h-4 text-on-surface-variant mr-2 shrink-0" />
                    <input type="text" placeholder="Search records..." className="bg-transparent border-none focus:ring-0 text-sm w-full sm:w-48 outline-none" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[600px]">
                    <thead>
                      <tr className="bg-surface-container-low text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                        <th className="px-4 md:px-8 py-4">Document</th>
                        <th className="px-4 md:px-8 py-4">Date</th>
                        <th className="px-4 md:px-8 py-4">Physician</th>
                        <th className="px-4 md:px-8 py-4">Status</th>
                        <th className="px-4 md:px-8 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container">
                      {records.map((record, i) => (
                        <tr key={record.id} className="group hover:bg-surface-container-low transition-colors">
                          <td className="px-4 md:px-8 py-4 md:py-6">
                            <div className="flex items-center gap-3 md:gap-4">
                              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-bold text-sm">{record.type}</p>
                                <p className="text-[10px] text-on-surface-variant uppercase">{record.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 md:px-8 py-4 md:py-6 text-sm text-on-surface-variant whitespace-nowrap">{record.date}</td>
                          <td className="px-4 md:px-8 py-4 md:py-6 text-sm font-medium whitespace-nowrap">{record.doctor}</td>
                          <td className="px-4 md:px-8 py-4 md:py-6">
                            <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase whitespace-nowrap">
                              {record.status}
                            </span>
                          </td>
                          <td className="px-4 md:px-8 py-4 md:py-6 text-right">
                            <div className="flex justify-end gap-1 md:gap-2">
                              <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-primary">
                                <Eye className="w-5 h-5" />
                              </button>
                              <button className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-primary">
                                <Download className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="w-full py-4 text-center text-xs font-bold text-primary uppercase tracking-widest bg-surface-container-low hover:bg-surface-container-high transition-colors">
                  View Full Archive
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-primary p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
                <Lock className="w-32 h-32 absolute -right-8 -top-8 opacity-10" />
                <h4 className="font-headline font-bold text-xl mb-4">Privacy Controls</h4>
                <p className="text-sm text-white/80 leading-relaxed mb-8">
                  Your medical data is protected by HIPAA-compliant encryption. You have full control over who can access your records.
                </p>
                <button className="w-full py-4 bg-white text-primary rounded-full font-bold text-sm shadow-lg hover:bg-white/90 transition-all">
                  Manage Access
                </button>
              </div>

              <div className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-surface-container">
                <h4 className="font-headline font-bold text-on-surface mb-6">Health Metrics</h4>
                <div className="space-y-6">
                  {[
                    { label: 'Blood Type', value: 'O Positive', icon: Activity },
                    { label: 'HLA Match Score', value: '94%', icon: Activity },
                    { label: 'Last Update', value: '2 Days Ago', icon: Calendar },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-surface-container">
                      <div className="flex items-center gap-3">
                        <stat.icon className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</span>
                      </div>
                      <span className="text-sm font-bold text-on-surface">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-8 bg-gradient-to-br from-tertiary to-orange-600 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-xl shadow-tertiary/20">
                <h4 className="font-headline font-bold text-xl mb-2">Help Center</h4>
                <p className="text-xs opacity-80 mb-6">Need help understanding your results? Our team is here to guide you.</p>
                <button className="w-full py-3 bg-white/20 backdrop-blur-md rounded-xl text-xs font-bold uppercase tracking-widest border border-white/30 hover:bg-white/30 transition-all">
                  Contact Support
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};
