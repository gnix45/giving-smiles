import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Users
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-tertiary/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <Link to="/" className="text-2xl font-black text-primary font-headline tracking-tight flex items-center gap-2">
            Giving Smiles Everyday
          </Link>
          <h1 className="text-4xl sm:text-5xl font-headline font-extrabold text-on-surface tracking-tight leading-tight">
            Welcome to the <br/><span className="text-primary">Patient Portal.</span>
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
            Your secure gateway to manage your legacy plan, track waitlist status, and connect with your care team.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-bold text-on-surface-variant uppercase tracking-widest">
              <ShieldCheck className="w-5 h-5 text-primary" />
              HIPAA Compliant Security
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-on-surface-variant uppercase tracking-widest">
              <Lock className="w-5 h-5 text-primary" />
              End-to-End Encryption
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-surface-container space-y-6 md:space-y-8"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-headline font-bold text-on-surface">Patient Login</h2>
            <p className="text-sm text-on-surface-variant">Sign in to access your personal dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-2">Email or Patient ID</label>
              <input 
                type="text" 
                placeholder="Enter your email or ID" 
                className="w-full px-6 py-4 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-6 py-4 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-primary text-white rounded-full font-headline font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-3 mt-4"
            >
              Sign In <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="text-center pt-4 border-t border-surface-container">
            <p className="text-xs text-on-surface-variant">
              Don't have an account? <Link to="/join" className="text-primary font-bold hover:underline">Join the Registry</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
