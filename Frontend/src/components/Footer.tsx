'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Send } from 'lucide-react';
import { IconBrandGithub, IconBrandLinkedin, IconBrandX, IconBrandWhatsapp, IconBrandInstagram, IconBrandFacebook, IconBrandTwitter } from '@tabler/icons-react';
import { Button } from './ui/Button';
import { Logo } from './ui/Logo';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 pt-16 pb-5 relative overflow-hidden">
      {/* Subtle red background gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-700" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">

          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm leading-relaxed text-slate-600 max-w-sm">
              Connecting thousands of graduates worldwide. Empowering lifelong learning, mentorship, career growth, research innovation, and alumni community impact.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-[20px] bg-white border border-slate-100 shadow-lg shadow-slate-200/60 flex items-center justify-center text-[#25D366] hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/15 hover:border-emerald-200 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <IconBrandWhatsapp size={26} stroke={2} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-[20px] bg-white border border-slate-100 shadow-lg shadow-slate-200/60 flex items-center justify-center text-[#E1306C] hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/15 hover:border-pink-200 transition-all duration-300"
                aria-label="Instagram"
              >
                <IconBrandInstagram size={26} stroke={2} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-[20px] bg-white border border-slate-100 shadow-lg shadow-slate-200/60 flex items-center justify-center text-[#0A66C2] hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/15 hover:border-blue-200 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin size={26} stroke={2} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-[20px] bg-white border border-slate-100 shadow-lg shadow-slate-200/60 flex items-center justify-center text-[#1877F2] hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/15 hover:border-blue-200 transition-all duration-300"
                aria-label="Facebook"
              >
                <IconBrandFacebook size={26} stroke={2} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-[20px] bg-white border border-slate-100 shadow-lg shadow-slate-200/60 flex items-center justify-center text-[#1DA1F2] hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/15 hover:border-sky-200 transition-all duration-300"
                aria-label="Twitter"
              >
                <IconBrandTwitter size={26} stroke={2} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-[20px] bg-white border border-slate-100 shadow-lg shadow-slate-200/60 flex items-center justify-center text-slate-800 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-500/15 hover:border-slate-300 transition-all duration-300"
                aria-label="GitHub"
              >
                <IconBrandGithub size={26} stroke={2} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/alumni" className="hover:text-red-600 transition-colors">
                  Alumni Directory
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-red-600 transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="hover:text-red-600 transition-colors">
                  Mentorship Program
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-600 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Opportunities */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Programs</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <Link href="/jobs" className="hover:text-red-600 transition-colors">
                  Career Jobs & Internships
                </Link>
              </li>
              <li>
                <Link href="/donations" className="hover:text-red-600 transition-colors">
                  Giving & Scholarship Funds
                </Link>
              </li>
              <li>
                <Link href="/forum" className="hover:text-red-600 transition-colors">
                  Discussion Forum
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-red-600 transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Stay Connected</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Subscribe for event invitations, job alerts, and monthly alumni updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white"
                />
              </div>
              <Button variant="primary" size="sm" className="w-full justify-center" rightIcon={<Send className="w-3.5 h-3.5" />}>
                Subscribe Now
              </Button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Alumni Portal Network. All rights reserved.</p>
          <div className="flex items-center space-x-6 font-medium">
            <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-900 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-slate-900 cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
