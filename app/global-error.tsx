"use client";

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: '"Inter", system-ui, sans-serif', background: '#f8fafb', color: '#191c1d' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
            {/* Icon */}
            <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, #dc2626, #b91c1c)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', boxShadow: '0 20px 40px rgba(220, 38, 38, 0.2)' }}>
              <AlertTriangle style={{ width: '40px', height: '40px', color: 'white' }} />
            </div>

            <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.02em' }}>
              Critical Error
            </h1>
            <p style={{ color: '#3e494a', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px', maxWidth: '360px', marginLeft: 'auto', marginRight: 'auto' }}>
              A critical error occurred in the application. Your data is safe. Please try refreshing the page.
            </p>
            {error.digest && (
              <p style={{ fontSize: '10px', color: '#3e494a80', fontFamily: 'monospace', marginBottom: '24px' }}>
                Error ID: {error.digest}
              </p>
            )}

            <button
              onClick={reset}
              style={{
                padding: '14px 32px', background: '#00616c', color: 'white', border: 'none',
                borderRadius: '999px', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 8px 24px rgba(0, 97, 108, 0.2)',
              }}
            >
              <RefreshCw style={{ width: '16px', height: '16px' }} /> Reload Application
            </button>

            <p style={{ marginTop: '40px', fontSize: '11px', color: '#3e494a60', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>
              Giving Smiles Everyday
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
