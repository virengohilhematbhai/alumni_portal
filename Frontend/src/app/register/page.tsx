'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldCheck, UserCheck, Database } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ' ',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.phone.length > 11) {
      setError('Phone number must be at least 10 digits');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      router.push('/login?registered=true');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Card: Guidelines */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-6">
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900 font-serif tracking-tight">
              Registration Guidelines
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    FREE NETWORK REGISTRATION
                  </div>
                  <p className="text-sm font-semibold text-slate-800 leading-snug">
                    Open to all graduates, students, and faculty members.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    PROFILE CREDENTIALS
                  </div>
                  <p className="text-sm font-semibold text-slate-800 leading-snug">
                    Provide your full name, company/organization, and a strong password (min 6 chars).
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                  <Database className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    SECURE MONGODB STORAGE
                  </div>
                  <p className="text-sm font-semibold text-slate-800 leading-snug">
                    Your details are securely saved in MongoDB for password authentication.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800">Next Step: </span>
            <span>After creating your profile, you will be redirected to Log In.</span>
          </div>
        </div>

        {/* Right Card: Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900 font-serif tracking-tight">
                Create Student Profile
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Register your email address to access all alumni network features.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-4 py-3.5 rounded-2xl leading-relaxed">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="off"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  PHONE NUMBER
                </label>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder=" +91-1234567890"
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="XXXXXX"
                  minLength={6}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer mt-2"
              >
                <span>{isLoading ? 'Creating Profile...' : 'Submit Registration'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium whitespace-nowrap">
            <span>Already registered?</span>
            <Link href="/login" className="text-red-600 font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
