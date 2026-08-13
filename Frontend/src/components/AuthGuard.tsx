'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Lock,
  AlertCircle,
  ShieldAlert,
  Sparkles,
  LogIn,
  UserPlus,
  ArrowLeft,
  ShieldCheck,
  RotateCw,
  Building2,
  CheckCircle2,
  HelpCircle,
  KeyRound,
} from 'lucide-react';
import Link from 'next/link';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, requireAdmin = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRetrying, setIsRetrying] = useState(false);

  const verifyAuth = async () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      setAuthorized(false);
      setErrorMessage('Access Restricted: Please log in with your approved college student or admin account.');
      return;
    }

    try {
      const localUser = JSON.parse(userStr);

      if (requireAdmin && !localUser.isAdmin && localUser.role !== 'admin') {
        setAuthorized(false);
        setErrorMessage('Access Denied: Administrator privileges required.');
        return;
      }

      // Live validation against MongoDB backend
      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const freshUser = await res.json();
        localStorage.setItem('user', JSON.stringify(freshUser));
        setAuthorized(true);
      } else {
        // Account was deleted, blocked, or token expired
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthorized(false);
        if (res.status === 401 || res.status === 404) {
          setErrorMessage('Account no longer exists or has been deleted. You can register again if your email is approved.');
        } else if (res.status === 403) {
          setErrorMessage('Your account access has been restricted by the Administrator.');
        } else {
          setErrorMessage('Session expired. Please log in again.');
        }
      }
    } catch {
      // Network fallback to local storage state if server temporarily unreachable
      try {
        const localUser = JSON.parse(userStr);
        if (requireAdmin && !localUser.isAdmin && localUser.role !== 'admin') {
          setAuthorized(false);
          setErrorMessage('Access Denied: Administrator privileges required.');
        } else {
          setAuthorized(true);
        }
      } catch {
        setAuthorized(false);
        setErrorMessage('Invalid session. Please log in again.');
      }
    }
  };

  useEffect(() => {
      verifyAuth();
  }, [pathname, requireAdmin]);

  const handleManualRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      verifyAuth().finally(() => setIsRetrying(false));
    }, 600);
  };

  // Clean Loading State while verifying session
  if (authorized === null) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-slate-50/50">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-red-100 border-t-red-600 animate-spin" />
        </div>
      </div>
    );
  }

  // Access Restricted State with Targeted Animation & Clean Design
  if (!authorized) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-8 bg-slate-50/60 relative overflow-hidden">
        {/* Background Radial Dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none" />

        {/* Ambient Corner Glow Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

        <div className="relative max-w-xl w-full bg-white/95 backdrop-blur-2xl rounded-3xl border border-red-100 shadow-[0_0_50px_-12px_rgba(225,29,72,0.18)] p-8 sm:p-10 text-center space-y-6 overflow-hidden transition-all duration-500 hover:shadow-red-500/20 group animate-in fade-in zoom-in-95">
          {/* Top Decorative Gradient Strip */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-rose-500 to-red-700 animate-pulse" />

          {/* Floating Corner Accent Shapes */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-red-500/15 to-rose-500/5 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-gradient-to-tr from-slate-200/40 to-slate-100/10 rounded-full blur-3xl pointer-events-none" />

          {/* Multi-Layer Animated Lock Shield Icon */}
          <div className="relative inline-flex items-center justify-center pt-2">
            {/* Outer Rotating Orbital Dash Ring */}
            {/* <div className="absolute -inset-5 rounded-full border border-l border-red-500/30 animate-[spin_10s_linear_infinite]" /> */}
            <div className="absolute -inset-3 bg-gradient-to-r from-red-600 to-rose-500 rounded-3xl opacity-30 blur-xl animate-pulse" />

            <div className="relative w-22 h-22 bg-gradient-to-tr from-red-600 via-red-600 to-rose-500 text-white rounded-3xl flex items-center justify-center shadow-xl shadow-red-600/30 border border-red-400/40">
              <ShieldAlert className="w-11 h-11  duration-1000" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-slate-900 text-red-400 p-2 rounded-2xl shadow-lg border border-slate-700 flex items-center justify-center group-hover:scale-105 group-hover:rotate-12 transition-all duration-300">
              <Lock className="w-4 h-4 animate-pulse" />
            </div>
          </div>

          <div className="space-y-3">
            {/* Header Campus Tag */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200/90 text-red-700 text-xs font-bold uppercase tracking-widest backdrop-blur-xs group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span>Institutional Auth Gate</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 bg-clip-text text-transparent group-hover:from-red-600 group-hover:via-rose-600 group-hover:to-slate-900 transition-all duration-700">
              Access Restricted
            </h2>
          </div>

          {/* Error Details Card with Interactive Refresh Action */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-50 via-rose-50/70 to-red-50 border border-red-200/80 text-slate-800 text-xs sm:text-sm font-semibold flex items-start justify-between space-x-3 text-left shadow-xs hover:border-red-300 transition-all duration-300 group/notice">
            <div className="flex items-start space-x-3">
              <div className="relative w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/20 mt-0.5 group-hover/notice:scale-105 transition-transform">
                <AlertCircle className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-0.5 pt-0.5">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-slate-900 text-xs uppercase tracking-wider">Security Notice</p>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed font-medium">{errorMessage}</p>
              </div>
            </div>

            <button
              onClick={handleManualRetry}
              title="Refresh Authentication Status"
              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100/60 rounded-xl transition-all hover:rotate-180 duration-500 shrink-0 cursor-pointer"
            >
              <RotateCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Action CTA Buttons with Sheen Sweep Effects */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 border-t border-slate-100">
            <Link
              href="/login"
              className="relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold px-7 py-3.5 rounded-2xl text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-red-600/25 hover:shadow-red-600/45 hover:scale-[1.03] active:scale-95 flex items-center justify-center space-x-2 group/btn cursor-pointer"
            >
              {/* Sliding Light Sheen Animation */}
              <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover/btn:translate-x-[350%] transition-transform duration-1000 ease-out" />
              <LogIn className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              <span>Sign In Now</span>
            </Link>

            <Link
              href="/register"
              className="relative overflow-hidden w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-2xl text-xs sm:text-sm transition-all duration-300 shadow-md hover:scale-[1.03] active:scale-95 flex items-center justify-center space-x-2 border border-slate-800 group/reg cursor-pointer"
            >
              {/* Sliding Light Sheen Animation */}
              <span className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-12 -translate-x-full group-hover/reg:translate-x-[350%] transition-transform duration-1000 ease-out" />
              <UserPlus className="w-4 h-4 group-hover/reg:scale-110 transition-transform duration-300" />
              <span>Register Approved Email</span>
            </Link>
          </div>

          {/* Footer Assistance & Home Links */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t border-slate-100">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 font-semibold text-slate-500 hover:text-red-600 transition-colors group/home cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover/home:-translate-x-1 transition-transform duration-300" />
              <span>Back to Home</span>
            </Link>

            <a
              href="mailto:support@gardividyapith.ac.in"
              className="inline-flex items-center space-x-1.5 font-semibold text-slate-500 hover:text-red-600 transition-colors group/supp"
            >
              <HelpCircle className="w-3.5 h-3.5 text-red-600 group-hover/supp:rotate-12 transition-transform duration-300" />
              <span>Need Help? Contact Support</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

