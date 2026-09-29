import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'VentureStress AI — Test the assumptions', description: 'Challenge your business idea and discover what to validate first.', icons: { icon: '/favicon.svg' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
