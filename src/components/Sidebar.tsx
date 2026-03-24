import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Heart, 
  ArrowLeftRight, 
  Hospital, 
  Settings, 
  Plus,
  MessageSquare,
  HelpCircle,
  LogOut,
  User,
  FileText,
  Users,
  Truck,
  X
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SidebarProps {
  role: 'patient' | 'clinical';
}

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    const handleClose = () => setIsOpen(false);
    
    document.addEventListener('toggleSidebar', handleToggle);
    document.addEventListener('closeSidebar', handleClose);
    
    return () => {
      document.removeEventListener('toggleSidebar', handleToggle);
      document.removeEventListener('closeSidebar', handleClose);
    };
  }, []);

  const patientLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/legacy-plan', icon: Heart, label: 'Waitlist Status' },
    { to: '/care-team', icon: Users, label: 'Care Team' },
    { to: '/records', icon: FileText, label: 'Medical Records' },
    { to: '/community', icon: MessageSquare, label: 'Support Community' },
  ];

  const clinicalLinks = [
    { to: '/clinical-dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/legacy-plan-clinical', icon: Heart, label: 'Legacy Plan' },
    { to: '/matches', icon: ArrowLeftRight, label: 'Matches' },
    { to: '/command-center', icon: Hospital, label: 'Transport Hub' },
    { to: '/fleet', icon: Truck, label: 'Fleet Logistics' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const links = role === 'patient' ? patientLinks : clinicalLinks;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={cn(
        "flex flex-col h-screen w-64 bg-surface border-r border-surface-container p-4 space-y-2 fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="mb-8 px-4 py-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black text-primary font-headline">
              {role === 'patient' ? 'Beacon Portal' : 'Clinical Portal'}
            </h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">
              Precision Logistics
            </p>
          </div>
          <button 
            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "text-primary font-bold bg-white shadow-sm border-r-4 border-primary" 
                  : "text-slate-500 hover:text-primary hover:bg-white/50"
              )}
            >
            <link.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-4 mt-4 border-t border-surface-container space-y-4">
        <NavLink 
          to={role === 'patient' ? '/legacy-plan' : '/match-request'}
          className="w-full bg-primary text-white rounded-full py-3 px-4 font-bold text-sm flex items-center justify-center space-x-2 active:scale-95 transition-all shadow-lg shadow-primary/10"
        >
          <Plus className="w-4 h-4" />
          <span>{role === 'patient' ? 'Register Donation' : 'New Match Request'}</span>
        </NavLink>

        <div className="flex items-center space-x-3 p-2 bg-surface-container rounded-xl">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
            <img 
              src={role === 'patient' ? "https://picsum.photos/seed/patient/100/100" : "https://picsum.photos/seed/doctor/100/100"} 
              alt="Profile" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold truncate">
              {role === 'patient' ? 'Alex Johnson' : 'Dr. Sarah Chen'}
            </p>
            <p className="text-[10px] text-on-surface-variant truncate">
              {role === 'patient' ? 'Patient ID: #8291' : 'Care Coordinator'}
            </p>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};
