'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const PageLoader: React.FC = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Trigger 2-second loading animation on page mount / navigation
    setLoading(true);
    setProgress(0);

    const startTime = Date.now();
    const duration = 300; // 1 Second

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const calculatedProgress = Math.min(Math.round((elapsedTime / duration) * 100), 100);
      setProgress(calculatedProgress);

      if (elapsedTime >= duration) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 150);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center font-sans transition-opacity duration-300 ${progress === 100 ? 'opacity-90' : 'opacity-100'
        }`}
    >
      <div className="flex flex-col items-center justify-center space-y-6 max-w-sm px-6 text-center w-full">
        {/* 2-Second Animated Spinner Ring */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
          <div className="absolute inset-0 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
        </div>

        {/* Progress Text & Percentage */}
        <div className="space-y-2 w-full">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-700">
            <span className="tracking-wide">Loading Portal...</span>
            <span className="text-red-600 font-mono">{progress}%</span>
          </div>

          {/* 2-Second Animated Loading Progress Bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-2xs">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-600 rounded-full transition-all duration-75 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
