'use client';

import React from 'react';
import Link from 'next/link';

export interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full' }) => {
  return (
    <Link href="/" className={`inline-flex items-center group cursor-pointer select-none py-0.5 ${className}`}>
      <img
        src="/images/logo.png"
        alt="B.H. Gardi College Logo"
        className="h-8 sm:h-9 md:h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] filter drop-shadow-sm"
      />
    </Link>
  );
};
