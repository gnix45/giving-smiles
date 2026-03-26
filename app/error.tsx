"use client";

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Icon */}
        <div className="relative mx-auto w-28 h-28">
          <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse" />
          <div className="relative w-28 h-28 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/20">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold font-headline text-on-surface">Something Went Wrong</h2>
          <p className="text-on-surface-variant font-medium leading-relaxed max-w-sm mx-auto">
            An unexpected error occurred. Don&apos;t worry — your data is safe. Try refreshing or head back to the homepage.
          </p>
          {error.digest && (
            <p className="text-[10px] text-on-surface-variant/50 font-mono mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={reset}
            className="px-8 py-3.5 bg-primary text-white rounded-full font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-3.5 bg-surface-container-low text-on-surface rounded-full font-bold text-sm hover:bg-surface-container transition-colors border border-surface-container flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
        </div>

        <p className="text-[11px] text-on-surface-variant/60 uppercase tracking-widest font-bold">
          Giving Smiles Everyday
        </p>
      </div>
    </div>
  );
}
