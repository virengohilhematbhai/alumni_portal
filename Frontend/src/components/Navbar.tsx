'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { GraduationCap, Menu, X, ArrowRight, Calendar, HeartHandshake, Info, Mail, ShieldCheck, LogOut, User, Image as ImageIcon, UserCheck } from 'lucide-react';
import { Button } from './ui/Button';
import { Logo } from './ui/Logo';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; isAdmin?: boolean; role?: string; profilePhoto?: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const verifyUserSession = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          // Real-time role check from backend MongoDB
          const res = await fetch('http://localhost:5000/api/auth/me', {
            headers: { Authorization: `Bearer ${storedToken}` },
          });

          if (res.ok) {
            const freshUserData = await res.json();
            setUser(freshUserData);
            localStorage.setItem('user', JSON.stringify(freshUserData));
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    verifyUserSession();
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: GraduationCap },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Gallery', href: '/gallery', icon: ImageIcon },
    { name: 'Mentorship', href: '/mentorship', icon: HeartHandshake },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/faculty')) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-1.5 shadow-sm shadow-slate-200/50'
        : 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-2'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[44px] sm:min-h-[48px]">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-[15px] font-semibold transition-all relative ${active
                    ? 'text-red-600 bg-red-50/80 font-bold'
                    : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
                    }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-red-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Admin Dashboard Button rendered ONLY when user is authenticated as Admin */}
                {(user.isAdmin === true || user.role === 'admin') && (
                  <Link href="/admin">
                    <Button
                      variant="primary"
                      className="text-xs sm:text-[14px] px-4 py-2 bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 hover:from-slate-800 hover:to-slate-900 border border-red-500/40 text-white font-extrabold shadow-md shadow-slate-900/10 hover:shadow-lg hover:border-red-500/80 transition-all duration-300"
                      leftIcon={<ShieldCheck className="w-4 h-4 text-red-400" />}
                    >
                      Admin
                    </Button>
                  </Link>
                )}

                {/* Faculty Panel Button rendered when user is authenticated as Faculty */}
                {user.role === 'faculty' && (
                  <Link href="/faculty">
                    <Button
                      variant="primary"
                      className="text-xs sm:text-[14px] px-4 py-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-extrabold shadow-md shadow-red-600/20 transition-all duration-300"
                      leftIcon={<UserCheck className="w-4 h-4 text-white" />}
                    >
                      Faculty Panel
                    </Button>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 text-xs sm:text-[14px] font-bold text-slate-600 hover:text-red-600 px-4 py-2 rounded-xl bg-slate-100 hover:bg-red-50 transition-all border border-slate-200 cursor-pointer"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Log Out</span>
                </button>

                {/* Round User Avatar Icon linked to Profile */}
                <Link href="/profile" title={`View Profile (${user.name})`}>
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-md shadow-red-600/20 border border-red-400/40 shrink-0 overflow-hidden hover:scale-105 transition-all">
                    {user.profilePhoto ? (
                      <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                </Link>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-xs sm:text-[14px] px-3.5 py-2">
                    Log In
                  </Button>
                </Link>

                <Link href="/register">
                  <Button variant="primary" className="text-xs sm:text-[14px] px-4 py-2" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Join Network
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Drawer Trigger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-red-600 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${active
                    ? 'bg-red-50 text-red-600 border border-red-100'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-red-600'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            {user ? (
              <>
                <Link href="/profile" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-300 transition-all cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-sm overflow-hidden">
                      {user.profilePhoto ? (
                        <img src={user.profilePhoto} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-900 truncate">{user.name}</div>
                      <div className="text-[11px] font-medium text-slate-500 truncate">{user.email}</div>
                    </div>
                  </div>
                </Link>

                <Link href="/profile" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full justify-center border-slate-200 text-slate-700 font-bold" leftIcon={<User className="w-4 h-4 text-red-600" />}>
                    My Profile
                  </Button>
                </Link>

                {(user.isAdmin === true || user.role === 'admin') && (
                  <Link href="/admin" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" className="w-full justify-center bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 text-white font-bold" leftIcon={<ShieldCheck className="w-4 h-4 text-red-400" />}>
                      Admin Dashboard
                    </Button>
                  </Link>
                )}

                {user.role === 'faculty' && (
                  <Link href="/faculty" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" className="w-full justify-center bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold" leftIcon={<UserCheck className="w-4 h-4 text-white" />}>
                      Faculty Panel
                    </Button>
                  </Link>
                )}

                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-xs flex items-center justify-center gap-2 border border-red-100 cursor-pointer hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full justify-center">
                    Log In
                  </Button>
                </Link>

                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" className="w-full justify-center" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Join Network
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
