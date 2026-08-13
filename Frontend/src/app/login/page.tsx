'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { GraduationCap, ArrowRight, Key, Mail, CheckCircle } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success] = useState(searchParams.get('registered') === 'true' ? 'Registration successful! Please sign in.' : '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed. Please try again.');
      }

      // Store token and user data in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email,
        company: data.company,
        role: data.role || 'student',
        isAdmin: data.isAdmin === true || data.role === 'admin',
      }));

      // Role-based redirection: Admin -> /admin, Faculty -> /faculty, Student -> /
      if (data.isAdmin === true || data.role === 'admin') {
        router.push('/admin');
      } else if (data.role === 'faculty') {
        router.push('/faculty');
      } else {
        router.push('/');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left Card: Information */}
      <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 font-serif tracking-tight">
            Portal Information
          </h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  ALUMNI & STUDENT NETWORK
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-snug">
                  Gardi Vidyapith Alumni Portal — Built for all graduates, students, and faculty members.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  EASY USER LOGIN
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-snug">
                  Sign in with your registered email and password to access features.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                <Key className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  FIRST-TIME REGISTRATION
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-snug">
                  Don&apos;t have an account? Register your profile in 1 easy step.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-600 space-y-1">
          <span className="font-bold text-slate-800">Support: </span>
          <span>Contact alumni@gardi.edu.in for any assistance.</span>
        </div>
      </div>

      {/* Right Card: Form */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 font-serif tracking-tight">
              Sign In To Account
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Enter your email and password to sign in.
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-4 py-3.5 rounded-2xl">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-4 py-3.5 rounded-2xl leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                PASSWORD
              </label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="XXXXXX"
                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer mt-2"
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In Now'}</span>
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium whitespace-nowrap">
          <span>Don&apos;t have an account yet?</span>
          <Link href="/register" className="text-red-600 font-bold hover:underline">
            Register Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <Suspense fallback={
        <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-slate-100 max-w-md mx-auto">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
