'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Navbar } from '@/components/Navbar';

import { AuthGuard } from '@/components/AuthGuard';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />

        <main className="flex-grow pt-5">
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Contact Info */}
              <div className="lg:col-span-5 space-y-8">
                <Card className="p-6 bg-white space-y-6 shadow-xl border-slate-200/80">
                  <h3 className="text-xl font-extrabold text-slate-900 font-serif">Contact Information</h3>

                  <div className="space-y-[68px]">
                    <div className="flex items-start space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold uppercase text-slate-400">Campus Address</h4>
                        <p className="text-sm font-semibold text-slate-800">
                          Gardi Vidyapith Campus, Rajkot-Kalawad Highway, Gujarat 361162
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold uppercase text-slate-400">Email Address</h4>
                        <p className="text-sm font-semibold text-slate-800">alumni@gardi.edu.in</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold uppercase text-slate-400">Helpdesk Hotline</h4>
                        <p className="text-sm font-semibold text-slate-800">+91 (0281) 2924155 / +91 90810 00000</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600 leading-relaxed">
                    <strong>Office Hours:</strong> Monday – Saturday, 09:00 AM to 05:00 PM IST. Closed on Sundays & national holidays.
                  </div>
                </Card>
              </div>

              {/* Form */}
              <div className="lg:col-span-7">
                <Card className="p-6 sm:p-8 bg-white shadow-xl border-slate-200/80">
                  {submitted ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-slate-900">Message Received!</h3>
                      <p className="text-slate-600 max-w-md mx-auto text-sm">
                        Thank you for reaching out. Our Alumni Cell team will get back to you within 24 business hours.
                      </p>
                      <Button variant="secondary" onClick={() => setSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="text-xl font-extrabold text-slate-900 font-serif">Send Us A Message</h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Subject
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="Alumni Verification / Reunion Inquiry"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Message
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Write your message here..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50"
                        />
                      </div>

                      <Button type="submit" variant="primary" className="w-full justify-center" rightIcon={<Send className="w-4 h-4" />}>
                        Submit Inquiry
                      </Button>
                    </form>
                  )}
                </Card>
              </div>
            </div>
          </section>
        </main>

      </div>
    </AuthGuard>
  );
}
