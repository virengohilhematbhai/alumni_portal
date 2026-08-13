'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  Globe,
  Award,
  Target,
  Eye,
  HeartHandshake,
  Briefcase,
  Calendar,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Building,
  Lightbulb,
  Gift,
  Star,
  MapPin,
  Zap,
  MessageSquare,
  TrendingUp,
  ShieldCheck,
  Compass,
  Check,
  Send,
  HelpCircle,
  Layers,
  CheckCircle,
  Search,
  Share2,
  ExternalLink,
  Clock,
  Sparkle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/Navbar';
import { AuthGuard } from '@/components/AuthGuard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values'>('mission');
  const [activePillar, setActivePillar] = useState<string>('networking');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
      setIsLoaded(true);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmailInput('');
      }, 4000);
    }
  };

  const keyStats = [
    { label: 'Verified Alumni', value: '15,000+', icon: Users, desc: 'Graduates connected globally' },
    { label: 'Global Chapters', value: '25+', icon: Globe, desc: 'International hubs' },
    { label: 'Placement Support', value: '98%', icon: TrendingUp, desc: 'Career assistance rate' },
    { label: 'Active Mentors', value: '500+', icon: HeartHandshake, desc: '1-on-1 industry guides' },
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Global Directory Access',
      description:
        'Instantly search, discover, and reach out to fellow B.H. Gardi graduates by industry, company, batch year, or geographic location.',
      cta: 'Explore Directory',
      href: '/alumni',
      tag: 'Connect',
    },
    {
      icon: HeartHandshake,
      title: '1-on-1 Mentorship',
      description:
        'Get guided by experienced alumni in tech, management, and research, or offer mentorship to ambitious current students.',
      cta: 'Find a Mentor',
      href: '/mentorship',
      tag: 'Guidance',
    },
    {
      icon: Briefcase,
      title: 'Career & Placements',
      description:
        'Access unlisted job openings, fast-tracked referral programs, and corporate hiring drives shared by alumni hiring managers.',
      cta: 'Browse Jobs',
      href: '/jobs',
      tag: 'Growth',
    },
    {
      icon: Calendar,
      title: 'Reunions & Webinars',
      description:
        'Receive priority invitations to global alumni summits, technical masterclasses, regional coffee meetups, and homecoming reunions.',
      cta: 'View Events',
      href: '/events',
      tag: 'Gatherings',
    },
    {
      icon: Lightbulb,
      title: 'Startup Incubator',
      description:
        'Present early-stage startup ideas to alumni angel investors, receive pitch deck feedback, and access venture grants.',
      cta: 'Learn More',
      href: '/stories',
      tag: 'Innovation',
    },
    {
      icon: BookOpen,
      title: 'Campus Privileges',
      description:
        'Maintain lifetime access to digital library archives, campus research journals, guest lectures, and institutional facilities.',
      cta: 'Read Privileges',
      href: '/contact',
      tag: 'Lifetime Access',
    },
  ];

  const strategicPillars = [
    {
      id: 'networking',
      title: 'Networking & Connectivity',
      icon: Users,
      tagline: 'Bridging alumni across 25+ countries',
      description: 'Build meaningful professional relationships with verified graduates worldwide through our smart alumni directory and regional hubs.',
      highlights: [
        'Searchable global alumni directory by batch, industry & company',
        'Regional chapter meetups in SF, London, Dubai & Bengaluru',
        'Direct 1-to-1 messaging and interest-based networking groups'
      ],
      color: 'text-blue-600',
      bgLight: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'careers',
      title: 'Careers & Acceleration',
      icon: Briefcase,
      tagline: 'Unlocking unlisted job opportunities',
      description: 'Fast-track your career with direct referral programs, unlisted job boards, and executive hiring drives managed by senior alumni.',
      highlights: [
        'Exclusive alumni-referred job postings and corporate hiring drives',
        'Direct referrals to top tech, finance & engineering enterprises',
        'Resume review sessions and technical interview masterclasses'
      ],
      color: 'text-emerald-600',
      bgLight: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      id: 'mentorship',
      title: '1-on-1 Mentorship',
      icon: HeartHandshake,
      tagline: 'Guiding the next generation of leaders',
      description: 'Connect with seasoned industry professionals for career guidance, technical mentorship, and domain-specific advice.',
      highlights: [
        'Personalized 1-on-1 mentorship matching by expertise',
        'Structured 6-week career mentorship programs',
        'Mock tech interviews and portfolio feedback sessions'
      ],
      color: 'text-red-600',
      bgLight: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 'events',
      title: 'Reunions & Summits',
      icon: Calendar,
      tagline: 'Celebrating shared memories and innovations',
      description: 'Stay active in campus life through annual homecoming summits, technical masterclasses, regional coffee meetups, and reunions.',
      highlights: [
        'Annual Global Alumni Leadership Summit & Homecoming',
        'Bi-weekly technical webinars & industry panel discussions',
        'Local chapter informal meetups and sports tournaments'
      ],
      color: 'text-purple-600',
      bgLight: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'incubator',
      title: 'Incubator & Grants',
      icon: Lightbulb,
      tagline: 'Fueling entrepreneurial ambitions',
      description: 'Empower student & alumni founders with pitch deck reviews, angel investor connections, venture grants, and campus incubator facilities.',
      highlights: [
        'Pitch deck reviews by alumni venture capitalists & founders',
        'Seed grant support for high-impact capstone innovations',
        'Pro-bono legal & technical advisory for early-stage startups'
      ],
      color: 'text-amber-600',
      bgLight: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      id: 'giving',
      title: 'Giving & Legacy',
      icon: Gift,
      tagline: 'Sustaining excellence for future generations',
      description: 'Contribute to merit scholarships, research infrastructure, student hardware labs, and institutional growth programs.',
      highlights: [
        'Need-based student scholarship funds & tuition subsidies',
        'Sponsorship for student competitive hackathons & tech teams',
        'Naming rights for campus research labs & digital libraries'
      ],
      color: 'text-rose-600',
      bgLight: 'bg-rose-50',
      borderColor: 'border-rose-200'
    }
  ];

  const regionalChapters = [
    { name: 'San Francisco & Bay Area', region: 'North America', members: '2,400+', lead: 'Sophia Chen (Class of 2018)', flag: '🇺🇸' },
    { name: 'London & UK Chapter', region: 'Europe', members: '1,150+', lead: 'Alexander Wright (Class of 2015)', flag: '🇬🇧' },
    { name: 'Bengaluru Innovation Hub', region: 'Asia-Pacific', members: '4,800+', lead: 'Priya Sharma (Class of 2017)', flag: '🇮🇳' },
    { name: 'Dubai & Gulf Region', region: 'Middle East', members: '1,650+', lead: 'Tariq Al-Mansoor (Class of 2014)', flag: '🇦🇪' },
    { name: 'Toronto Tech Corridor', region: 'North America', members: '980+', lead: 'Michael Chang (Class of 2019)', flag: '🇨🇦' },
    { name: 'Singapore & ASEAN', region: 'Asia-Pacific', members: '1,320+', lead: 'Mei Ling Tan (Class of 2016)', flag: '🇸🇬' },
  ];

  const filteredChapters =
    selectedRegion === 'All'
      ? regionalChapters
      : regionalChapters.filter((c) => c.region === selectedRegion);

  const distinguishedAlumni = [
    {
      name: 'Dr. Rajesh Patel',
      role: 'VP of Quantum Infrastructure',
      company: 'Intel Labs',
      batch: 'Class of 2008',
      achievement: 'Pioneered scalable quantum computing architecture; holds 18 international patents.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      badge: 'Research Award',
    },
    {
      name: 'Ananya Deshmukh',
      role: 'Co-Founder & CEO',
      company: 'NexGen Green Energy',
      batch: 'Class of 2014',
      achievement: 'Raised $45M Series B for clean solar storage; named to Forbes 30 Under 30.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      badge: 'Founder Spotlight',
    },
    {
      name: 'Vikramaditya Kulkarni',
      role: 'Head of AI Engineering',
      company: 'Tesla Autopilot',
      batch: 'Class of 2012',
      achievement: 'Leads autonomous computer vision safety systems; key mentor in Gardi AI Fellowship.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      badge: 'Tech Leadership',
    },
  ];

  const faqs = [
    {
      question: 'Who is eligible to join the Alumni Portal?',
      answer:
        'All graduates, diploma holders, postgraduate alumni, current final-year students, and faculty members of B.H. Gardi College Of Engineering & Technology are eligible to create a verified profile.',
    },
    {
      question: 'Is there any fee to register or join the network?',
      answer:
        'No, joining the Alumni Portal is 100% free for all graduates and students. Access to the global directory, job board, mentorship requests, and standard events is completely complimentary.',
    },
    {
      question: 'How does profile verification work?',
      answer:
        'Upon registering, your details (Roll Number/Graduation Year/Degree) are verified against institutional records within 24 to 48 hours to ensure a secure, authentic, and high-trust community.',
    },
    {
      question: 'How can I become an alumni mentor or host an event?',
      answer:
        'After logging into your account, navigate to the Mentorship or Events section and click "Apply as Mentor" or "Host a Chapter Event". Our alumni committee will review and approve your listing.',
    },
    {
      question: 'Can alumni post job openings and referral drives?',
      answer:
        'Yes! Alumni hiring managers and recruiters can post open positions directly to our job board and mark whether they can provide direct internal referrals.',
    },
  ];

  const currentPillarObj = strategicPillars.find(p => p.id === activePillar) || strategicPillars[0];

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col font-sans bg-slate-50/50 text-slate-800 selection:bg-red-500 selection:text-white">
        <Navbar />


        <div className="flex-grow space-y-20 my-20">
          {/* INTRODUCTION & PURPOSE SECTION */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Graphic Image Frame */}
              <div className="lg:col-span-5 order-1">
                <div className="relative group">
                  {/* Subtle Background Glow Frame */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-rose-500 rounded-3xl opacity-20 blur-xl" />

                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-red-100 bg-white">
                    <img
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                      alt="Alumni Gathering & Community"
                      className="w-full h-[400px] sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                      <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-bold uppercase tracking-widest backdrop-blur-xs">
                        <Sparkle className="w-3 h-3" />
                        <span>Bridging Generations</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">From Classrooms to Industry Leadership</h3>
                    </div>
                  </div>

                  {/* Floating Verified Stat Badge */}
                  <div className="absolute -bottom-6 -right-4 p-4 rounded-2xl shadow-xl border border-slate-200 bg-white text-slate-800 max-w-xs transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
                        <ShieldCheck className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">Verified Community</div>
                        <div className="text-xs text-slate-500 font-medium">100% Authentic Institutional Network</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Experience Badge */}
                  <div className="absolute -top-5 -left-4 px-4 py-2 rounded-2xl shadow-lg border border-red-200 bg-red-600 text-white text-xs font-bold flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>Est. 2008 • 18+ Years</span>
                  </div>
                </div>
              </div>

              {/* Right Explanation Content */}
              <div className="lg:col-span-7 space-y-6 order-2">

                <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-serif">
                  A Lifelong Connection For <span className="text-red-600 underline decoration-red-600/40 underline-offset-8">Every Gardi Graduate</span>
                </h2>

                <p className="text-base text-slate-600 leading-relaxed font-medium">
                  Founded to preserve the lifelong bonds formed during college years, the <strong>B.H. Gardi Alumni Portal</strong> serves as the central platform for professional collaboration, mentorship, career growth, and institutional development.
                </p>

                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Whether you graduated recently or decades ago, this portal ensures you stay connected with your classmates, discover mentors in your domain, access direct career opportunities, and give back to current students.
                </p>

                {/* Key Benefits 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl border border-slate-200/80 bg-white shadow-xs hover:border-red-300 hover:shadow-md transition-all duration-300 flex items-start space-x-3 group">
                    <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Continuous Learning</h4>
                      <p className="text-xs text-slate-500 font-medium">Access research papers, tech webinars, and faculty sessions.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200/80 bg-white shadow-xs hover:border-red-300 hover:shadow-md transition-all duration-300 flex items-start space-x-3 group">
                    <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Career Acceleration</h4>
                      <p className="text-xs text-slate-500 font-medium">Explore internal job posts and senior alumni referrals.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* MISSION, VISION & CORE VALUES (Tabbed Section) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto space-y-3 mb-10">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-serif">
                Mission, Vision & <span className="text-red-600 underline decoration-red-600/40 underline-offset-8">Core Values</span>
              </h2>
            </div>

            {/* Tab Switcher Pills */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <button
                  onClick={() => setActiveTab('mission')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${activeTab === 'mission'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-[1.02]'
                      : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
                    }`}
                >
                  <Target className="w-4 h-4" />
                  <span>Our Mission</span>
                </button>

                <button
                  onClick={() => setActiveTab('vision')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${activeTab === 'vision'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-[1.02]'
                      : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
                    }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Our Vision</span>
                </button>

                <button
                  onClick={() => setActiveTab('values')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${activeTab === 'values'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-[1.02]'
                      : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
                    }`}
                >
                  <Star className="w-4 h-4" />
                  <span>Core Values</span>
                </button>
              </div>
            </div>

            {/* Tab Panels */}
            <div className="max-w-4xl mx-auto transition-all duration-500">
              {activeTab === 'mission' && (
                <div className="p-8 sm:p-12 rounded-3xl border border-red-100 bg-white shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                  <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-8 relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform duration-300">
                      <Target className="w-10 h-10" />
                    </div>
                    <div className="space-y-5">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Our Mission Statement</h3>
                      <p className="text-base text-slate-600 leading-relaxed font-medium">
                        To serve our society by empowering the learners, enabling them to possess key skills to be professionally competent in the global arena pertaining to their harmonious development by integrating fundamental concepts and modern technology with comprehensive nourishment and cultivation of the ideals of humanity.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                          <Check className="w-4 h-4 text-red-600 shrink-0" />
                          <span>Structured 1-on-1 Mentorship</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                          <Check className="w-4 h-4 text-red-600 shrink-0" />
                          <span>Direct Job & Referral Opportunities</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                          <Check className="w-4 h-4 text-red-600 shrink-0" />
                          <span>Student Scholarship Support</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                          <Check className="w-4 h-4 text-red-600 shrink-0" />
                          <span>Global Reunions & Technical Summits</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="p-8 sm:p-12 rounded-3xl border border-red-100 bg-white shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 rounded-bl-full   pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                  <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-8 relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform duration-300">
                      <Eye className="w-10 h-10" />
                    </div>
                    <div className="space-y-5">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Our Long-term Vision</h3>
                      <p className="text-base text-slate-600 leading-relaxed font-medium">
                        As a prominent contributor in education, we strive to craft globally responsible citizens and outstanding professionals, exhibiting their intellect and excellence stimulating an epoch of a sustainable planet.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                          <Check className="w-4 h-4 text-red-600 shrink-0" />
                          <span>Global Technical Leadership</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                          <Check className="w-4 h-4 text-red-600 shrink-0" />
                          <span>Startup Ecosystem Grants</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                          <Check className="w-4 h-4 text-red-600 shrink-0" />
                          <span>Regional Alumni Hubs</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                          <Check className="w-4 h-4 text-red-600 shrink-0" />
                          <span>Enduring College Legacy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'values' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-8 rounded-3xl border border-red-100 bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4 group">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      <Award className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-900">Excellence</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      Pursuing technical innovation and high ethical standards in engineering, research, and business.
                    </p>
                  </div>

                  <div className="p-8 rounded-3xl border border-red-100 bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4 group">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      <HeartHandshake className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-900">Camaraderie</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      Building genuine relationships, trust, and career support across all graduation batches.
                    </p>
                  </div>

                  <div className="p-8 rounded-3xl border border-red-100 bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4 group">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      <Gift className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-900">Giving Back</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      Investing in student scholarships, research equipment, and campus growth initiatives.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>



          {/* CURVED TOP ARCH BENEFITS CARDS */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto space-y-3 mb-16">

              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-serif">
                Why Join The <span className="text-red-600 underline decoration-red-600/40 underline-offset-8">Alumni Network?</span>
              </h2>
            </div>

            {/* 6 Curved Top Arch Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {benefits.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="relative bg-white rounded-t-[48px] rounded-b-3xl border border-red-100 shadow-xl hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden group"
                  >
                    <div className="p-8 sm:p-9 flex flex-col items-center text-center relative">
                      {/* Soft Red Top Background Halo */}
                      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-rose-100/60 via-red-50/40 to-transparent rounded-t-[48px] -z-10 group-hover:from-rose-200/70 transition-colors duration-500" />

                      {/* Top Category Tag Pill */}
                      <span className="text-[11px] font-bold text-red-600 uppercase tracking-widest mb-4 px-3 py-1 bg-white/80 rounded-full border border-red-100 shadow-2xs">
                        {item.tag}
                      </span>

                      {/* Red Circle Container with Icon */}
                      <div className="relative mb-6">
                        <div className="w-28 h-28 rounded-full bg-rose-100/50 border border-red-200/60 flex items-center justify-center p-2 group-hover:scale-110 group-hover:bg-red-600 transition-all duration-500 shadow-sm">
                          <Icon className="w-10 h-10 text-red-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">{item.title}</h3>
                      <div className="w-8 h-0.5 bg-red-600 mb-4 rounded-full group-hover:w-16 transition-all duration-300" />

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-8">
                        {item.description}
                      </p>

                      {/* Action Button */}
                      <Link href={item.href} className="w-full">
                        <button className="w-full py-2.5 px-5 rounded-full border-2 border-red-600 text-red-600 font-bold text-xs hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-md cursor-pointer">
                          <span>{item.cta}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                        </button>
                      </Link>
                    </div>

                    {/* Bottom Red Accent Bar */}
                    <div className="h-2 w-full bg-red-600 rounded-b-3xl group-hover:bg-red-700 transition-colors" />
                  </div>
                );
              })}
            </div>
          </section>

          {/* GLOBAL CHAPTERS EXPLORER */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
              <div className="space-y-2">

                <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-serif">
                  Regional Alumni <span className="text-red-600 underline decoration-red-600/40 underline-offset-8">Chapters</span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {['All', 'North America', 'Europe', 'Asia-Pacific', 'Middle East'].map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setSelectedRegion(reg)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${selectedRegion === reg
                        ? 'bg-red-600 text-white border-red-600 shadow-md scale-105'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChapters.map((chap, idx) => (
                <div
                  key={idx}
                  className="p-7 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-2xl hover:border-red-300 hover:-translate-y-1 transition-all duration-300 space-y-4 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-xl group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                      <MapPin className="w-6 h-6 group-hover:animate-bounce" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{chap.flag}</span>
                      <Badge variant="secondary" size="sm">{chap.region}</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-red-600 transition-colors">{chap.name}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Active Members: <strong className="text-red-600 font-bold">{chap.members}</strong>
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                    <span className="font-semibold text-slate-700">Chapter Leader:</span>
                    <div className="text-slate-900 font-bold flex items-center justify-between">
                      <span>{chap.lead}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ALUMNI ACHIEVEMENTS & WALL OF HONOR */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-5xl mx-auto space-y-3 mb-12">

              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-serif">
                Distinguished Alumni & <span className="text-red-600 underline decoration-red-600/40 underline-offset-8">Achievements</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {distinguishedAlumni.map((alumni, i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl border border-slate-200 bg-white shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 space-y-6 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="primary" size="sm">{alumni.badge}</Badge>
                      <span className="text-xs font-bold text-slate-400">{alumni.batch}</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <img
                        src={alumni.avatar}
                        alt={alumni.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-red-600 shadow-md group-hover:scale-105 transition-transform duration-300"
                      />
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">{alumni.name}</h4>
                        <p className="text-xs text-red-600 font-bold">{alumni.role}</p>
                        <p className="text-[11px] text-slate-500 font-medium">{alumni.company}</p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium italic bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      "{alumni.achievement}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 text-xs font-bold text-slate-600 flex items-center justify-between">
                    <span className="flex items-center space-x-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>Verified Alumni Profile</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FREQUENTLY ASKED QUESTIONS (Accordion) */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center space-y-3 mb-10">
              
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-serif">
                Frequently Asked <span className="text-red-600 underline decoration-red-600/40 underline-offset-8">Questions</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                        ? 'border-red-300 bg-white shadow-md ring-2 ring-red-500/10'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 font-bold text-sm sm:text-base text-slate-900 focus:outline-none cursor-pointer"
                    >
                      <span className="flex items-center space-x-3">
                        <span className="w-7 h-7 rounded-lg bg-red-50 text-red-600 text-xs flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <span>{faq.question}</span>
                      </span>
                      <ChevronRight
                        className={`w-5 h-5 text-red-600 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''
                          }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium border-t border-slate-100 pt-4 bg-slate-50/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </div>
    </AuthGuard>
  );
}
