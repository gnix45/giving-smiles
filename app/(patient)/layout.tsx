"use client";

import React, { useState } from 'react';
import { PatientSidebar } from '@/components/patient/PatientSidebar';
import { PatientTopNav } from '@/components/patient/PatientTopNav';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <PatientSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="md:pl-64 flex flex-col min-h-screen">
        <PatientTopNav onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
