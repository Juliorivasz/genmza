import { type ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-svh bg-gray-950 text-white">

      {/* ── Ambient background blobs ── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full bg-cyan-500/7 blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full bg-violet-600/7 blur-[140px]" />
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/4 blur-[110px]" />
        <div className="absolute right-0 top-1/2 hidden h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[130px] lg:block" />
      </div>

      <Navbar />

      <main className="relative w-full">
        {children}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
