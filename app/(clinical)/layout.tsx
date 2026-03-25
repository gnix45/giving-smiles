"use client";

import React, { useState } from 'react';
import { ClinicalSidebar } from '@/components/clinical/ClinicalSidebar';
import { ClinicalTopNav } from '@/components/clinical/ClinicalTopNav';

export default function ClinicalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <ClinicalSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="md:pl-64 flex flex-col min-h-screen">
        <ClinicalTopNav onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
