'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Calendar,
  Briefcase,
  HeartHandshake,
  Globe,
  Award,
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Star,
  Building,
  GraduationCap,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Send,
  MessageSquare,
  ClipboardList,
  UserCheck,
  BellRing,
  Play,
  Pause
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export default function HomePage() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const slides = [
    {
      id: 0,
      image: '/icons/slider1.png',
      title: 'Vibrant Campus & World-Class Learning Environment',
      subtitle: 'B.H. Gardi College Of Engineering & Technology',
      description: 'Fostering innovation, collaborative research, and holistic academic excellence across multidisciplinary engineering programs.',
      badge: 'MAIN CAMPUS HUB',
      metric: '25+ Acres Green Campus',
    },
    {
      id: 1,
      image: '/icons/slider2.png',
      title: 'Grand Auditoriums & Alumni Leadership Summits',
      subtitle: 'Inspiring Keynotes & Global Networking',
      description: 'Connecting thousands of accomplished graduates with current students for mentorship, tech talks, and annual reunions.',
      badge: 'EVENTS & CONVENTIONS',
      metric: '500+ Annual Events',
    },
    {
      id: 2,
      image: '/icons/slider3.png',
      title: 'State-of-the-Art Student & Research Facilities',
      subtitle: 'Shaping Tomorrow’s Industry Leaders',
      description: 'Equipped with modern laboratories, incubation centers, and creative spaces designed for real-world impact.',
      badge: 'INNOVATION LABS',
      metric: '15,000+ Alumni Network',
    },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const handleSelectSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  useEffect(() => {
      setIsLoaded(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const stats = [
    { label: 'Total Alumni', value: '15,000+', icon: Users, desc: 'Connected worldwide' },
    { label: 'Annual Events', value: '120+', icon: Calendar, desc: 'Reunions & webinars' },
    { label: 'Active Mentors', value: '850+', icon: HeartHandshake, desc: '1-on-1 career guidance' },
    { label: 'Job Placements', value: '500+', icon: Briefcase, desc: 'Alumni job postings' },
    { label: 'Global Chapters', value: '25+', icon: Globe, desc: 'International hubs' },

  ];

  const features = [
    {
      icon: Users,
      title: 'Alumni Networking',
      description: 'Connect with verified graduates across top tech firms, enterprises, and research labs. Filter by batch, company, or city.',
    },
    {
      icon: Calendar,
      title: 'Events & Reunions',
      description: 'Attend annual homecoming summits, technical webinars, skill workshops, and regional chapter meetups.',
    },
    {
      icon: Briefcase,
      title: 'Career & Placements',
      description: 'Access exclusive job openings, internship drives, and referral opportunities shared directly by senior alumni.',
    },
    {
      icon: HeartHandshake,
      title: '1-on-1 Mentorship',
      description: 'Schedule career guidance, resume reviews, and mock technical interviews with industry leaders.',
    },
    {
      icon: Globe,
      title: 'Community & Giving',
      description: 'Contribute to student scholarship funds, capstone research labs, and campus infrastructure projects.',
    },
  ];



  const alumniSpotlights = [
    {
      name: 'Sophia Chen',
      role: 'Staff AI Research Scientist',
      company: 'Google',
      gradYear: 2018,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      quote: 'The Alumni Portal allowed me to mentor rising CS students and recruit exceptional engineering talent for our AI research team.',
      skills: ['Machine Learning', 'Python', 'Systems'],
    },
    {
      name: 'Marcus Vance',
      role: 'Director of Product Strategy',
      company: 'Stripe',
      gradYear: 2016,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
      quote: 'Staying connected through regional reunions and advisory boards has opened up game-changing enterprise partnerships.',
      skills: ['Product Strategy', 'Fintech', 'SaaS'],
    },
    {
      name: 'Elena Rostova',
      role: 'Principal Design Architect',
      company: 'Figma',
      gradYear: 2020,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
      quote: 'Building relationships with fellow graduates gave me the confidence and network to scale design systems globally.',
      skills: ['UI/UX Design', 'Design Systems', 'Figma'],
    },
  ];

  const upcomingEvents = [
    {
      title: 'Global Alumni Leadership Summit 2026',
      date: 'September 18, 2026',
      location: 'Grand Auditorium & Virtual Stream',
      category: 'Reunion',
      attendees: '420 Alumni',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'AI & Generative Tech Futures Workshop',
      date: 'August 28, 2026',
      location: 'Interactive Zoom Conference',
      category: 'Webinar',
      attendees: '890 Registered',
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Class of 2016 - 10 Year Homecoming Meetup',
      date: 'October 14, 2026',
      location: 'Campus Alumni Center Courtyard',
      category: 'Reunion',
      attendees: '260 Alumni',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <div className="space-y-20 pb-20 bg-white  text-slate-800">

      {/* 1. HERO SECTION (Full Screen Height Background) */}
      <section
        className="relative min-h-[calc(100vh-80px)] py-16 lg:py-24 overflow-hidden bg-cover bg-center bg-no-repeat bg-white flex items-center justify-center"
        style={{ backgroundImage: "url('/icons/Background.png')" }}
      >


        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL ALUMNI NETWORK PORTAL</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100 leading-[1.1]">
                One campus.<br />
                <span className='text-red-600 '>Many journeys.</span><br />
                <span className="block sm:inline text-slate-900">One alumni community.</span>
              </h1>

              <p className="text-base sm:text-lg text-white leading-relaxed max-w-xl mx-auto lg:mx-0">
                Stay connected with your B.H. Gardi College Of Engineering & Technology community, reconnect with old friends, discover new opportunities, and never miss campus updates.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/alumni">
                  <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Explore Directory
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" size="lg">
                    Join Network
                  </Button>
                </Link>
              </div>

              {/* Quick Search Widget */}

            </div>

            {/* Right Visual Card Showcase (Transparent Glassmorphism Glass Card) */}
            <div className="lg:col-span-6 relative">
              <div className="bg-white/75 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/60 shadow-2xl relative overflow-hidden group transition-all duration-500 hover:bg-white/85">
                {/* Red Glass-Transparent Backdrop Banner with Heavy Blur */}
                <div className="absolute top-0 right-0 w-full h-30 bg-red-600 backdrop-blur-xl rounded-t-3xl p-6 text-white space-y-2 border-b border-white/30 shadow-sm">
                  <div className="text-xs font-bold tracking-wider uppercase text-white flex items-center space-x-2 drop-shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>PORTAL DASHBOARD</span>
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight text-white drop-shadow-sm">ALUMNI CREATIVE STUDIO</h3>
                </div>

                <div className="pt-36 space-y-6 relative z-10">
                  {/* Transparent Laptop Mockup Box */}
                  <div className="bg-slate-900/5 border border-slate-200/80 rounded-2xl p-5 shadow-inner space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 " />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Live Global Network</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-50 backdrop-blur-xs p-3.5 rounded-xl border border-white/80 shadow-sm space-y-1">
                        <span className="text-slate-600 font-semibold">Mentorships</span>
                        <div className="text-lg font-extrabold text-red-600">850+ Active</div>
                      </div>
                      <div className="bg-slate-50 backdrop-blur-xs p-3.5 rounded-xl border border-white/80 shadow-sm space-y-1">
                        <span className="text-slate-600 font-semibold">Job Opportunities</span>
                        <div className="text-lg font-extrabold text-slate-900">500+ Listed</div>
                      </div>
                    </div>
                  </div>

                  {/* Transparent Floating Badge */}
                  <div className="flex items-center space-x-3 bg-slate-700/10  border border-slate-200/80 p-3.5 rounded-xl">
                    <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shadow-sm">
                      <Star className="w-5 h-5 fill-white" />
                    </div>
                    <div className="text-xs">
                      <span className="font-extrabold text-slate-900 block">Top Ranked Alumni Community</span>
                      <span className="text-slate-700">Connecting graduates across 25+ countries</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATISTICS BAR (Styled clean white bar with animated counters matching reference design) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-9">
        <div className={`bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 transition-all duration-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center space-x-3 p-2 rounded-2xl transition-all duration-500  group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${idx * 120}ms` }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200/80 flex items-center justify-center text-red-600 shrink-0   transition-all duration-300 shadow-xs">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-xs font-black text-slate-800">{stat.label}</div>
                    <div className="text-[10px] text-slate-500 font-semibold">{stat.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* HOW IT WORKS SECTION (Matching User Reference Image Design) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-20 -mt-10 relative">
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center space-x-3 text-red-600 text-xs font-extrabold uppercase tracking-widest">

          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-serif">
            Simple Steps, <span className="text-red-600 underline decoration-red-600/40 underline-offset-8">Stronger Connections</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
            Our alumni portal makes it easy to connect, collaborate, and stay updated with your college and fellow alumni.
          </p>

        </div>

        {/* 4 Step Process Cards with Horizontal Timeline & Chevron Connectors */}
        <div className="relative">
          {/* Dashed Connector Line */}
          <div className="hidden lg:block absolute top-[150px] left-[8%] right-[8%] h-[2px] border-t-3 border-dashed border-red-200 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {/* STEP 01 */}
            <div
              className={`relative bg-white rounded-3xl p-6 sm:p-7 border border-red-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 flex flex-col items-center text-center group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '100ms' }}
            >
              {/* Icon Circle */}
              <div className="w-24 h-24 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-red-300 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-red-100/80 border border-red-200 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <ClipboardList className="w-8 h-8 stroke-[2]" />
                </div>
              </div>

              {/* Step Number */}
              <div className="w-10 h-10 rounded-full border-2 border-red-300 bg-white text-slate-900 font-extrabold text-sm flex items-center justify-center shadow-2xs mb-4 group-hover:scale-110 group-hover:border-red-600 transition-all duration-300">
                01
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 mb-2">Create Your Account</h3>
              <div className="w-8 h-0.5 bg-red-600 mb-3 rounded-full group-hover:w-12 transition-all duration-300" />
              <p className="text-xs text-slate-600 leading-relaxed">
                Sign up using your college details and basic information to get started.
              </p>
            </div>

            {/* STEP 02 */}
            <div
              className={`relative bg-white rounded-3xl p-6 sm:p-7 border border-red-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 flex flex-col items-center text-center group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '250ms' }}
            >
              <div className="w-24 h-24 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-red-300 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-red-100/80 border border-red-200 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <UserCheck className="w-8 h-8 stroke-[2]" />
                </div>
              </div>

              <div className="w-10 h-10 rounded-full border-2 border-red-300 bg-white text-slate-900 font-extrabold text-sm flex items-center justify-center shadow-2xs mb-4 group-hover:scale-110 group-hover:border-red-600 transition-all duration-300">
                02
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 mb-2">Complete Your Profile</h3>
              <div className="w-8 h-0.5 bg-red-600 mb-3 rounded-full group-hover:w-12 transition-all duration-300" />
              <p className="text-xs text-slate-600 leading-relaxed">
                Add your education, work experience, and interests to build your identity.
              </p>
            </div>

            {/* STEP 03 */}
            <div
              className={`relative bg-white rounded-3xl p-6 sm:p-7 border border-red-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 flex flex-col items-center text-center group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="w-24 h-24 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-red-300 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-red-100/80 border border-red-200 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <Users className="w-8 h-8 stroke-[2]" />
                </div>
              </div>

              <div className="w-10 h-10 rounded-full border-2 border-red-300 bg-white text-slate-900 font-extrabold text-sm flex items-center justify-center shadow-2xs mb-4 group-hover:scale-110 group-hover:border-red-600 transition-all duration-300">
                03
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 mb-2">Connect & Engage</h3>
              <div className="w-8 h-0.5 bg-red-600 mb-3 rounded-full group-hover:w-12 transition-all duration-300" />
              <p className="text-xs text-slate-600 leading-relaxed">
                Find batchmates, join groups, participate in discussions and events.
              </p>
            </div>

            {/* STEP 04 */}
            <div
              className={`relative bg-white rounded-3xl p-6 sm:p-7 border border-red-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 flex flex-col items-center text-center group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '550ms' }}
            >
              <div className="w-24 h-24 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-red-300 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-red-100/80 border border-red-200 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <BellRing className="w-8 h-8 stroke-[2]" />
                </div>
              </div>

              <div className="w-10 h-10 rounded-full border-2 border-red-300 bg-white text-slate-900 font-extrabold text-sm flex items-center justify-center shadow-2xs mb-4 group-hover:scale-110 group-hover:border-red-600 transition-all duration-300">
                04
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 mb-2">Stay Updated Always</h3>
              <div className="w-8 h-0.5 bg-red-600 mb-3 rounded-full group-hover:w-12 transition-all duration-300" />
              <p className="text-xs text-slate-600 leading-relaxed">
                Get notified about campus news, alumni events, and opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Full Responsive Image Slider Section for All Devices */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto -mt-10 space-y-3 mb-10">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Discover Our <span className="text-red-600 underline decoration-red-600/30 underline-offset-8">Vibrant Life</span> & Legacy
          </h2>

        </div>

        {/* Main Slider Container */}
        <div
          className="relative w-full h-[360px] sm:h-[450px] md:h-[520px] lg:h-[580px] rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-800/80 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Images with Ken Burns scale effect and smooth crossfade */}
          {slides.map((slide, index) => {
            const isActive = currentSlide === index;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                  }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${isActive ? 'scale-105' : 'scale-100'
                    }`}
                />

                {/* Dark Gradient Overlay for optimal readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-900/20" />

                {/* Ambient Red Radial Accent Glow */}
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-red-600/25 rounded-full blur-3xl pointer-events-none" />

                {/* Text Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 md:p-14 z-20 flex flex-col justify-end max-w-4xl space-y-3 sm:space-y-4">
                  {/* Badge & Metric Tag */}
                  <div
                    className={`flex flex-wrap items-center gap-2 sm:gap-3 transition-all duration-700 delay-100 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                      }`}
                  >
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-600 text-white font-extrabold text-[11px] sm:text-xs tracking-wider uppercase shadow-md shadow-red-600/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      <span>{slide.badge}</span>
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-semibold">
                      {slide.metric}
                    </span>
                  </div>

                  {/* Slide Subtitle & Title */}
                  <div
                    className={`space-y-1 sm:space-y-2 transition-all duration-700 delay-200 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                      }`}
                  >
                    <p className="text-xs sm:text-sm font-bold text-red-400 uppercase tracking-widest">
                      {slide.subtitle}
                    </p>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                      {slide.title}
                    </h3>
                  </div>

                  {/* Slide Description */}
                  <p
                    className={`text-xs sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed line-clamp-2 sm:line-clamp-3 transition-all duration-700 delay-300 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                      }`}
                  >
                    {slide.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Top Control Bar (Slide Count, Live Status, Play/Pause Button) */}
          <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-6 z-30 flex items-center justify-between pointer-events-none">
            {/* Slide Counter Badge */}
            {/* <div className="pointer-events-auto inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/15 text-white text-xs font-bold shadow-lg">
              <span className="text-red-500 font-extrabold">0{currentSlide + 1}</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-300">0{slides.length}</span>
            </div> */}

            {/* Play / Pause Toggle Button */}

          </div>

          {/* Navigation Arrows (Left / Right) */}
          {/* <button
            onClick={handlePrevSlide}
            aria-label="Previous Slide"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/60 hover:bg-red-600 text-white backdrop-blur-md border border-white/20 hover:border-red-500 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl group/btn cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5] group-hover/btn:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleNextSlide}
            aria-label="Next Slide"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/60 hover:bg-red-600 text-white backdrop-blur-md border border-white/20 hover:border-red-500 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl group/btn cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5] group-hover/btn:translate-x-0.5 transition-transform" />
          </button> */}

          {/* Bottom Controls: Dots Navigation */}
          <div className="absolute bottom-4 sm:bottom-6 right-6 sm:right-10 z-30 flex items-center space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${currentSlide === idx
                  ? 'w-9 bg-gradient-to-r from-red-600 to-rose-500 shadow-md shadow-red-600/50'
                  : 'w-2.5 bg-white/40 hover:bg-white/80'
                  }`}
              />
            ))}
          </div>

          {/* Active Auto-Play Progress Bar at the very bottom edge of slider */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 z-30">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-500 transition-all duration-100 ease-linear shadow-xs shadow-red-500"
              style={{ width: `${isPaused ? 100 : progress}%` }}
            />
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN DO HERE SECTION (Matching User Reference Image Design + Micro-Animations) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
        {/* Ambient Decorative Background Glow Orbs */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-16 -mt-18 relative z-10">

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Everything <span className="text-red-600 underline decoration-red-600/30 underline-offset-8">you need</span>, in one place
          </h2>

        </div>

        {/* 3 Interactive Feature Cards with Staggered Entrance Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">

          {/* Card 01 - Alumni Directory */}
          <div
            className={`group relative bg-white rounded-t-[44px] rounded-b-[32px] border border-red-100/80 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(220,38,38,0.20)] hover:-translate-y-3 transition-all duration-700 ease-out flex flex-col justify-between overflow-hidden cursor-pointer ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '150ms' }}
          >
            {/* Soft Red Top Background Halo */}
            <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-red-100/80 via-rose-50/40 to-transparent rounded-t-[44px] group-hover:from-red-200/90 group-hover:via-rose-100/50 transition-colors duration-500 pointer-events-none" />

            <div className="p-8 sm:p-9 flex flex-col items-center text-center relative z-10">
              {/* Circular Icon Container with Pulsing Halo & Badge */}
              <div className="relative mb-6 mt-1">

                <div className="w-32 h-32 rounded-full bg-gradient-to-b from-rose-100/80 to-red-50/90 border-2 border-red-100/90 flex items-center justify-center p-2 group-hover:ring-8 group-hover:ring-red-100/70 group-hover:border-red-300 group-hover:scale-110 transition-all duration-500 shadow-inner">
                  <Users className="w-12 h-12 text-red-600 stroke-[1.75] group-hover:rotate-[-6deg] group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Number Pill Badge */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs rounded-full shadow-md border-2 border-white tracking-wider group-hover:scale-115 group-hover:shadow-red-600/40 transition-all duration-300">
                  01
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 tracking-tight group-hover:text-red-700 transition-colors duration-300">Alumni Directory</h3>
              <div className="w-8 h-1 bg-red-600 rounded-full my-2.5 group-hover:w-16 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-rose-500 transition-all duration-500" />

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-6 max-w-xs">
                Search fellow alumni by batch, branch, or city, and reconnect with old classmates.
              </p>

              {/* Action Button */}
              <Link href="/alumni" className="w-full max-w-[230px]">
                <button className="w-full py-2.5 px-6 rounded-full border-2 border-red-600 text-red-600 font-bold text-xs sm:text-sm bg-white hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-600 hover:text-white hover:border-transparent transition-all duration-300 flex items-center justify-center space-x-2 shadow-xs hover:shadow-xl hover:shadow-red-600/30 group/btn cursor-pointer active:scale-95">
                  <span>Browse directory</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300 ease-out" />
                </button>
              </Link>
            </div>

            {/* Bottom Red Accent Bar */}
            <div className="h-2.5 w-full bg-red-600 rounded-b-[32px] group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:via-rose-500 group-hover:to-red-600 transition-all duration-500" />
          </div>

          {/* Card 02 - Alumni Community */}
          <div
            className={`group relative bg-white rounded-t-[44px] rounded-b-[32px] border border-red-100/80 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(220,38,38,0.20)] hover:-translate-y-3 transition-all duration-700 ease-out flex flex-col justify-between overflow-hidden cursor-pointer ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '300ms' }}
          >

            {/* Soft Red Top Background Halo */}
            <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-red-100/80 via-rose-50/40 to-transparent rounded-t-[44px] group-hover:from-red-200/90 group-hover:via-rose-100/50 transition-colors duration-500 pointer-events-none" />

            <div className="p-8 sm:p-9 flex flex-col items-center text-center relative z-10">
              {/* Circular Icon Container with Pulsing Halo & Badge */}
              <div className="relative mb-6 mt-1">
                <div className="w-32 h-32 rounded-full bg-gradient-to-b from-rose-100/80 to-red-50/90 border-2 border-red-100/90 flex items-center justify-center p-2 group-hover:ring-8 group-hover:ring-red-100/70 group-hover:border-red-300 group-hover:scale-110 transition-all duration-500 shadow-inner">
                  <MessageSquare className="w-12 h-12 text-red-600 stroke-[1.75] group-hover:rotate-[-6deg] group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Number Pill Badge */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs rounded-full shadow-md border-2 border-white tracking-wider group-hover:scale-115 group-hover:shadow-red-600/40 transition-all duration-300">
                  02
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 tracking-tight group-hover:text-red-700 transition-colors duration-300">Alumni Community</h3>
              <div className="w-8 h-1 bg-red-600 rounded-full my-2.5 group-hover:w-16 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-rose-500 transition-all duration-500" />

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-6 max-w-xs">
                Connect with alumni by sharing career milestones, success stories, announcements, and valuable experiences with everyone.
              </p>

              {/* Action Button */}
              <Link href="/login" className="w-full max-w-[230px]">
                <button className="w-full py-2.5 px-6 rounded-full border-2 border-red-600 text-red-600 font-bold text-xs sm:text-sm bg-white hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-600 hover:text-white hover:border-transparent transition-all duration-300 flex items-center justify-center space-x-2 shadow-xs hover:shadow-xl hover:shadow-red-600/30 group/btn cursor-pointer active:scale-95">
                  <span>Explore posts</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300 ease-out" />
                </button>
              </Link>
            </div>

            {/* Bottom Red Accent Bar */}
            <div className="h-2.5 w-full bg-red-600 rounded-b-[32px] group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:via-rose-500 group-hover:to-red-600 transition-all duration-500" />
          </div>

          {/* Card 03 - Events & Announcements */}
          <div
            className={`group relative bg-white rounded-t-[44px] rounded-b-[32px] border border-red-100/80 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(220,38,38,0.20)] hover:-translate-y-3 transition-all duration-700 ease-out flex flex-col justify-between overflow-hidden cursor-pointer ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '450ms' }}
          >

            {/* Soft Red Top Background Halo */}
            <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-red-100/80 via-rose-50/40 to-transparent rounded-t-[44px] group-hover:from-red-200/90 group-hover:via-rose-100/50 transition-colors duration-500 pointer-events-none" />

            <div className="p-8 sm:p-9 flex flex-col items-center text-center relative z-10">
              {/* Circular Icon Container with Pulsing Halo & Badge */}
              <div className="relative mb-6 mt-1">

                <div className="w-32 h-32 rounded-full bg-gradient-to-b from-rose-100/80 to-red-50/90 border-2 border-red-100/90 flex items-center justify-center p-2 group-hover:ring-8 group-hover:ring-red-100/70 group-hover:border-red-300 group-hover:scale-110 transition-all duration-500 shadow-inner">
                  <Calendar className="w-12 h-12 text-red-600 stroke-[1.75] group-hover:rotate-[-6deg] group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Number Pill Badge */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs rounded-full shadow-md border-2 border-white tracking-wider group-hover:scale-115 group-hover:shadow-red-600/40 transition-all duration-300">
                  03
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 tracking-tight group-hover:text-red-700 transition-colors duration-300">Events & Announcements</h3>
              <div className="w-8 h-1 bg-red-600 rounded-full my-2.5 group-hover:w-16 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-rose-500 transition-all duration-500" />

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-6 max-w-xs">
                Reunions, guest lectures, and official notices from the college, posted by the admin office.
              </p>

              {/* Action Button */}
              <Link href="/events" className="w-full max-w-[230px]">
                <button className="w-full py-2.5 px-6 rounded-full border-2 border-red-600 text-red-600 font-bold text-xs sm:text-sm bg-white hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-600 hover:text-white hover:border-transparent transition-all duration-300 flex items-center justify-center space-x-2 shadow-xs hover:shadow-xl hover:shadow-red-600/30 group/btn cursor-pointer active:scale-95">
                  <span>See what's coming up</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300 ease-out" />
                </button>
              </Link>
            </div>

            {/* Bottom Red Accent Bar */}
            <div className="h-2.5 w-full bg-red-600 rounded-b-[32px] group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:via-rose-500 group-hover:to-red-600 transition-all duration-500" />
          </div>

        </div>
      </section>

      {/* 7. STRONG RED CTA BANNER (Styled matching reference image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-5 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-3xl p-8 sm:p-14 text-white text-center relative overflow-hidden shadow-2xl">
          {/* Subtle curved background lines */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 mx-auto flex items-center justify-center text-white mb-2">
              <Send className="w-7 h-7" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Let's Build Something Amazing Together
            </h2>

            <p className="text-red-100 text-sm sm:text-base leading-relaxed">
              Have a project or career goal in mind? Join thousands of verified graduates, book 1-on-1 mentorship, and unlock lifetime alumni benefits.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button variant="white" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Register Profile Now
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 hover:text-white border border-white/20">
                  Log In to Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
