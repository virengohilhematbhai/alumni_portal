'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  UserCheck,
  Calendar,
  ImageIcon,
  LayoutDashboard,
  Home,
  LogOut,
  RefreshCw,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Award,
  PanelLeftClose,
  PanelRightOpen,
  Sun,
  Moon,
} from 'lucide-react';
import {
  FacultyOverview,
  FacultyMemberList,
  FacultyEventManagement,
  FacultyGalleryManagement,

} from './modules';

type FacultyTabType = 'overview' | 'events' | 'gallery' | 'mentorship' | 'members';

export default function FacultyPanelPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<FacultyTabType>('overview');
  const [token, setToken] = useState<string | null>(null);
  const [facultyUser, setFacultyUser] = useState<{ email: string; name?: string; department?: string; designation?: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (!storedToken) {
      router.push('/login');
      return;
    }
    setToken(storedToken);
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.role !== 'faculty' && parsed.role !== 'admin' && !parsed.isAdmin) {
          router.push('/');
          return;
        }
        setFacultyUser(parsed);
      } catch (e) {
        console.error('Error parsing stored user:', e);
        router.push('/login');
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const navItems = [
    { key: 'overview', label: 'Faculty Control Center', icon: LayoutDashboard },
    { key: 'events', label: 'Manage Events', icon: Calendar },
    { key: 'gallery', label: 'Manage Gallery', icon: ImageIcon },

    { key: 'members', label: 'Faculty Directory', icon: UserCheck },
  ] as const;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`h-screen w-screen overflow-hidden flex font-sans selection:bg-red-600 selection:text-white ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* 100% Height Static Red Sidebar */}
      {isSidebarVisible && (
        <aside className="hidden md:flex w-64 xl:w-72 bg-gradient-to-b from-red-700 via-red-600 to-rose-700 text-white h-full flex-col justify-between p-5 shadow-2xl z-40 shrink-0 overflow-y-auto no-scrollbar">
          <div className="space-y-6">
            {/* Header Brand */}
            <div className="flex items-center justify-between pb-5 border-b border-red-500/40">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-2xl bg-white text-red-600 font-extrabold text-lg flex items-center justify-center shadow-lg shadow-red-900/30 shrink-0">
                  {facultyUser?.name ? facultyUser.name.charAt(0).toUpperCase() : 'F'}
                </div>
                <div>
                  <h1 className="text-lg font-extrabold font-serif tracking-tight text-white flex items-center gap-1.5">
                    <span>Faculty Panel</span>
                  </h1>
                  <p className="text-[11px] text-red-200 font-medium">Academic Workspace</p>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarVisible(false)}
                className="p-1.5 rounded-xl bg-red-800/60 hover:bg-red-900 text-red-100 hover:text-white transition-colors cursor-pointer"
                title="Hide Sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>
            {/* Navigation Pills */}
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key as FacultyTabType)}
                    className={`relative w-full px-4.5 py-3.5 rounded-2xl text-xs sm:text-[13.5px] font-extrabold transition-all cursor-pointer flex items-center justify-between gap-3 ${isActive
                        ? 'bg-white text-red-600 shadow-xl shadow-red-950/20 translate-x-1 font-bold'
                        : 'text-red-100 hover:text-white hover:bg-red-500/40'
                      }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-red-600' : 'text-red-200'}`} />
                      <span className="tracking-tight font-bold truncate">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-red-600 shrink-0" />}
                  </button>
                );
              })}
            </nav>
          </div>
          {/* Sidebar Footer */}
          <div className="pt-4 border-t border-red-500/40 space-y-2 mt-6">
         
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-3 text-white bg-red-800/80 hover:bg-red-900 shadow-md"
            >
              <LogOut className="w-4 h-4 text-red-200" />
              <span>Logout</span>
            </button>
          </div>
        </aside>
      )}
      {/* Main Right Content View (Scrollable) */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-slate-50 overflow-y-auto">
        {/* Mobile Top Header (Small Screens Only) */}
        <div className="md:hidden bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white px-4 py-3.5 flex items-center justify-between shadow-md sticky top-0 z-40">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-white text-red-600 font-extrabold flex items-center justify-center shadow-md text-sm">
              {facultyUser?.name ? facultyUser.name.charAt(0).toUpperCase() : 'F'}
            </div>
            <div>
              <span className="font-serif font-extrabold text-sm tracking-wide">Faculty Panel</span>
              <p className="text-[10px] text-red-100 font-mono truncate max-w-[180px]">{facultyUser?.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-red-700 text-white border-b border-red-800 p-4 space-y-2 shadow-xl animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveTab(item.key as FacultyTabType);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold flex items-center justify-between transition-all cursor-pointer ${isActive
                      ? 'bg-white text-red-600 shadow-md font-bold'
                      : 'text-red-100 hover:bg-red-600/80 hover:text-white'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-red-600' : 'text-red-200'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-red-600" />}
                </button>
              );
            })}
            <div className="pt-3 border-t border-red-600/50 flex gap-2">
              <Link
                href="/"
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-800/80 text-white text-xs font-bold text-center flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Portal Home</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white text-red-600 text-xs font-bold text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
        {/* Sticky Header Bar */}
        <header className={`sticky top-0 z-30 backdrop-blur-md border-b shadow-xs px-4 sm:px-8 py-4 flex items-center justify-between gap-4 transition-colors ${darkMode ? 'bg-slate-900/95 border-slate-800 text-white' : 'bg-white/95 border-slate-200/80 text-slate-900'}`}>
          <div className="flex items-center gap-3">
            {!isSidebarVisible && (
              <button
                onClick={() => setIsSidebarVisible(true)}
                className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all cursor-pointer hidden md:flex items-center gap-1.5 text-xs font-bold"
                title="Show Sidebar"
              >
                <PanelRightOpen className="w-4 h-4 text-red-600" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  FACULTY PANEL
                </span>
                <h1 className={`text-lg sm:text-xl font-extrabold font-serif tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {activeTab === 'overview'
                    ? 'Faculty Control Center'
                    : activeTab === 'events'
                      ? 'Faculty Event Management'
                      : activeTab === 'gallery'
                        ? 'Faculty Gallery Storage'
                        : activeTab === 'mentorship'
                          ? 'Mentorship & Guidance'
                          : 'Faculty Members Directory'}
                </h1>
              </div>
              <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Logged in as <strong className={darkMode ? 'text-white' : 'text-slate-800'}>{facultyUser?.name || facultyUser?.email}</strong>
              </p>
            </div>
          </div>

          {/* Top Bar Quick Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 sm:px-3 sm:py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border shadow-xs ${darkMode
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                : 'bg-slate-100/90 text-slate-700 border-slate-200/80 hover:bg-slate-200/80'
                }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 500);
              }}
              disabled={loading}
              className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 border shadow-xs ${darkMode
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                : 'bg-slate-100/90 text-slate-700 border-slate-200/80 hover:bg-slate-200/80'
                }`}
              title="Refresh Panel"
            >
              <RefreshCw className={`w-4 h-4 text-red-500 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline font-bold">Refresh</span>
            </button>

            <Link
              href="/"
              className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 border shadow-xs ${darkMode
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                : 'bg-slate-100/90 text-slate-700 border-slate-200/80 hover:bg-slate-200/80'
                }`}
              title="Back to Portal Home"
            >
              <Home className="w-4 h-4 text-red-500" />
              <span className="hidden sm:inline font-bold">Home</span>
            </Link>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-black tracking-tight whitespace-nowrap bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/30 transition-all cursor-default select-none">
              <Award className="w-4.5 h-4.5 text-amber-300 shrink-0" />
              <span>Gardi Faculty Console</span>
            </div>
          </div>
        </header>
        {/* Module Content Container */}
        <main className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6 flex-1">
          {activeTab === 'overview' && <FacultyOverview onNavigate={(t: string) => setActiveTab(t as FacultyTabType)} />}
          {activeTab === 'events' && <FacultyEventManagement />}
          {activeTab === 'gallery' && <FacultyGalleryManagement />}

          {activeTab === 'members' && <FacultyMemberList isAdmin={false} />}
        </main>
      </div>
    </div>
  );
}
