import React from 'react';

interface PageBannerProps {
  watermark: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  watermark,
  title,
  className = '',
}) => {
  return (
    <div className={`relative py-4 sm:py-7 mt-2 bg-white overflow-hidden border-b border-slate-200/80 flex items-center justify-center shadow-xs ${className}`}>
      {/* Huge Background Watermark Text (Matching Reference Image) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-slate-300/60 uppercase tracking-[0.2em] whitespace-nowrap font-sans">
          {watermark}
        </span>
      </div>

      {/* Main Centered Title Content */}
      <div className="relative z-10 text-center space-y-2 px-4 max-w-3xl mx-auto">
        {/* Red Accent Bar Line */}
        {/* <div className="w-[20%] h-1 bg-red-600 rounded-full mx-auto mb-1 shadow-xs" /> */}

        <h1 className="text-xl sm:text-4xl  font-extrabold text-red-600 underline decoration-red-600/40 underline-offset-8 tracking-tight font-serif">
          {title}
        </h1>
      </div>
    </div>
  );
};
