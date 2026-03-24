import React from 'react';
import { Bell, HelpCircle, User, Search, Menu } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface TopNavProps {
  title: string;
  showSearch?: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({ title, showSearch = true }) => {
  const handleToggleSidebar = () => {
    document.dispatchEvent(new CustomEvent('toggleSidebar'));
  };

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white/80 backdrop-blur-md z-30 border-b border-surface-container px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4">
        <button 
          className="md:hidden p-2 -ml-2 text-primary hover:bg-surface-container-low rounded-full transition-colors"
          onClick={handleToggleSidebar}
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-base md:text-lg font-bold font-headline text-primary truncate max-w-[150px] sm:max-w-none">{title}</h2>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        {showSearch && (
          <div className="hidden sm:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-surface-container">
            <Search className="w-4 h-4 text-on-surface-variant mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-48"
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-tertiary rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary ml-2">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};
