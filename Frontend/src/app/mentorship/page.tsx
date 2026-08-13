'use client';

import React from 'react';
import { HeartHandshake, Star, ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Navbar } from '@/components/Navbar';

import { PageBanner } from '@/components/ui/PageBanner';
 
import { AuthGuard } from '@/components/AuthGuard';

export default function MentorshipPage() {
  const mentors = [
    {
      name: 'Vikram Sarabhai',
      role: 'VP of Engineering',
      company: 'TechCorp International',
      experience: '14+ Yrs Exp',
      topics: ['System Architecture', 'Engineering Management', 'Career Growth'],
      rating: '4.95',
      reviews: 42,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Dr. Meera Nambiar',
      role: 'Lead AI Scientist',
      company: 'DeepMind Fellow',
      experience: '10+ Yrs Exp',
      topics: ['Machine Learning', 'PhD Applications', 'Research Publishing'],
      rating: '5.00',
      reviews: 38,
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Karan Shah',
      role: 'Co-founder & CEO',
      company: 'ScaleX Ventures',
      experience: '8+ Yrs Exp',
      topics: ['Fundraising', '0 to 1 Product Strategy', 'Startup Pitching'],
      rating: '4.90',
      reviews: 29,
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />

        <main className="flex-grow  pb-16">

            <PageBanner
            watermark="MENTORSHIP"
            title="Gardi Mentorship Circle"
            
          />

          {/* Hero */}
          <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center space-x-2 bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full tracking-widest backdrop-blur-md">
                <HeartHandshake className="w-4 h-4" />
                <span>Gardi Mentorship Circle</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif">
                Accelerate Your Career <span className="text-red-500">With 1:1 Guidance</span>
              </h1>
              <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
                Book 1:1 mentorship sessions with experienced alumni executives, founders, and engineers to elevate your professional trajectory.
              </p>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white p-6 shadow-xl space-y-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">Career Roadmap</h3>
                <p className="text-sm text-slate-600">
                  Get practical feedback on career switches, technical interview preparation, and executive positioning.
                </p>
              </Card>

              <Card className="bg-white p-6 shadow-xl space-y-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">Verified Mentors</h3>
                <p className="text-sm text-slate-600">
                  Connect with active industry leaders who graduated from Gardi Vidyapith.
                </p>
              </Card>

              <Card className="bg-white p-6 shadow-xl space-y-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">Skill Development</h3>
                <p className="text-sm text-slate-600">
                  Learn domain-specific skills, code review strategies, and leadership best practices.
                </p>
              </Card>
            </div>
          </section>

          {/* Mentors Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mentors.map((m) => (
                <Card key={m.name} className="p-6 bg-white space-y-5 shadow-xl border-slate-200/80 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-red-600/20"
                      />
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900 font-serif">{m.name}</h3>
                        <p className="text-xs font-semibold text-red-600">{m.role}</p>
                        <p className="text-[11px] text-slate-500">{m.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600 border-t border-slate-100 pt-3">
                      <span className="font-bold text-slate-800">{m.experience}</span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{m.rating} ({m.reviews})</span>
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mentorship Topics</p>
                      <div className="flex flex-wrap gap-1.5">
                        {m.topics.map((t) => (
                          <span key={t} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button variant="primary" size="sm" className="w-full mt-4" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Request 1-on-1 Session
                  </Button>
                </Card>
              ))}
            </div>
          </section>
        </main>


      </div>
    </AuthGuard>
  );
}
