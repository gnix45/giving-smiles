import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Animated icon */}
        <div className="relative mx-auto w-32 h-32">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
          <div className="relative w-32 h-32 bg-gradient-to-br from-primary to-primary-container rounded-full flex items-center justify-center shadow-2xl shadow-primary/20">
            <Heart className="w-14 h-14 text-white" />
          </div>
        </div>

        {/* Error code */}
        <div>
          <h1 className="text-8xl font-black font-headline text-primary tracking-tighter">404</h1>
          <div className="w-16 h-1.5 bg-gradient-to-r from-primary to-tertiary rounded-full mx-auto mt-4" />
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold font-headline text-on-surface">Page Not Found</h2>
          <p className="text-on-surface-variant font-medium leading-relaxed max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/"
            className="px-8 py-3.5 bg-primary text-white rounded-full font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            Go Home
          </Link>
          <Link
            href="/patient-dashboard"
            className="px-8 py-3.5 bg-surface-container-low text-on-surface rounded-full font-bold text-sm hover:bg-surface-container transition-colors border border-surface-container"
          >
            Patient Dashboard
          </Link>
        </div>

        {/* Footer hint */}
        <p className="text-[11px] text-on-surface-variant/60 uppercase tracking-widest font-bold">
          Giving Smiles Everyday
        </p>
      </div>
    </div>
  );
}
