import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: {
    default: 'Giving Smiles Everyday — Organ Transplant Platform',
    template: '%s | Giving Smiles Everyday',
  },
  description: 'A comprehensive organ donation and transplant logistics platform bridging the gap between clinical precision and human compassion.',
  keywords: ['organ donation', 'transplant', 'hospital', 'patient portal', 'medical', 'healthcare'],
  openGraph: {
    title: 'Giving Smiles Everyday',
    description: 'Bridging clinical precision and human compassion in organ transplant logistics.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased text-on-surface bg-surface`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
