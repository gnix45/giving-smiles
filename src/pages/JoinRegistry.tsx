import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Heart, 
  Lock,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export const JoinRegistry = () => {
  const navigate = useNavigate();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle the registration logic
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Side: Information */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <Link to="/" className="text-2xl font-black text-primary font-headline tracking-tight flex items-center gap-2">
            Giving Smiles Everyday
          </Link>
          <h1 className="text-4xl sm:text-5xl font-headline font-extrabold text-on-surface tracking-tight leading-tight">
            Leave a Legacy of <br/><span className="text-primary">Hope and Life.</span>
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
            Joining the registry takes less than 2 minutes. Your decision today can save up to eight lives and heal countless others.
          </p>
          
          <div className="space-y-6 pt-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary shrink-0">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-on-surface text-lg">Save Up to 8 Lives</h3>
                <p className="text-sm text-on-surface-variant mt-1">One organ donor can save up to 8 lives and enhance over 75 more through tissue donation.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-on-surface text-lg">Secure & Confidential</h3>
                <p className="text-sm text-on-surface-variant mt-1">Your data is protected with end-to-end encryption and strict HIPAA compliance.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Registration Form */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-surface-container space-y-6 md:space-y-8"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-headline font-bold text-on-surface">Join the Registry</h2>
            <p className="text-sm text-on-surface-variant">Fill out the form below to register your decision.</p>
          </div>

          <form onSubmit={handleJoin} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-2">First Name</label>
                <input 
                  type="text" 
                  placeholder="Jane" 
                  className="w-full px-5 py-3.5 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-2">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe" 
                  className="w-full px-5 py-3.5 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-2">Email Address</label>
              <input 
                type="email" 
                placeholder="jane.doe@example.com" 
                className="w-full px-5 py-3.5 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-5 py-3.5 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-2">Date of Birth</label>
                <input 
                  type="date" 
                  className="w-full px-5 py-3.5 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm text-on-surface"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-2">State/Region</label>
                <select className="w-full px-5 py-3.5 bg-surface-container-low rounded-2xl border-none focus:ring-2 focus:ring-primary/20 text-sm text-on-surface" required>
                  <option value="">Select State</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input 
                type="checkbox" 
                id="consent" 
                className="mt-1 w-4 h-4 text-primary rounded border-surface-container focus:ring-primary"
                required
              />
              <label htmlFor="consent" className="text-xs text-on-surface-variant leading-relaxed">
                I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>, and I consent to joining the national organ donor registry.
              </label>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-full font-headline font-bold text-base shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-3 mt-6"
            >
              Complete Registration <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="text-center pt-4 border-t border-surface-container">
            <p className="text-xs text-on-surface-variant">
              Already registered? <Link to="/login" className="text-primary font-bold hover:underline">Sign in here</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
