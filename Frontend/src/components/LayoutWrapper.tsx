'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isDedicatedPanel = pathname?.startsWith('/admin') || pathname?.startsWith('/faculty');

  return (
    <>
      {!isDedicatedPanel && <Navbar />}
      <main className={`flex-1 ${isDedicatedPanel ? '' : 'pt-14 sm:pt-16'}`}>{children}</main>
      {!isDedicatedPanel && <Footer />}
    </>
  );
};
