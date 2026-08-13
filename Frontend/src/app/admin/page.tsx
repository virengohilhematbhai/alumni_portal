'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Mail,
  Calendar,
  Handshake,
  UserCheck,
  ImageIcon,
  Home,
  LogOut,
  RefreshCw,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Award,
  PanelLeftClose,
  PanelLeft,
  Moon,
  Sun,
} from 'lucide-react';
import {
  AdminOverview,
  StudentManagement,
  WhitelistManagement,
  EventManagement,
} from './modules';
import {
  FacultyOverview as FacultyModuleOverview,
  FacultyMemberList,
  FacultyEventManagement as FacultyModuleEvents,
  FacultyGalleryManagement as FacultyModuleGallery,
} from '../faculty/modules';
import {
  TabType,
  AdminStats,
  WhitelistEntry,
  StudentUser,
  EventItem,
  MentorshipItem,
} from './api/types';
import { getAdminStats } from './api/statsApi';
import { getWhitelist, addWhitelist, removeWhitelist } from './api/whitelistApi';
import { getStudents, toggleBlockStudent, deleteUserAccount } from './api/studentApi';
import { getEvents, saveEvent, deleteEvent } from './api/eventApi';
import { getMentorships } from './api/mentorshipApi';

export default function AdminPanelPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [token, setToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<{ email: string; name?: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Data State
  const [stats, setStats] = useState<AdminStats>({
    totalStudents: 0,
    approvedStudents: 0,
    pendingApproval: 0,
    blockedStudents: 0,
    whitelistedEmailsCount: 0,
    totalEvents: 0,
  });
  const [whitelist, setWhitelist] = useState<WhitelistEntry[]>([]);
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [mentorships, setMentorships] = useState<MentorshipItem[]>([]);

  // Form State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all');
  const [newEmail, setNewEmail] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Event Form State
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState<Partial<EventItem>>({});

  // Auth Guard
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
        if (parsed.role !== 'admin' && !parsed.isAdmin) {
          router.push('/');
          return;
        }
        setAdminUser(parsed);
      } catch (e) {
        console.error('Error parsing stored user:', e);
        router.push('/login');
      }
    }
  }, [router]);

  // Fetch All Data
  const fetchAllData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [statsData, whitelistData, studentsData, eventsData, mentorshipsData] =
        await Promise.allSettled([
          getAdminStats(token),
          getWhitelist(token),
          getStudents(token, searchQuery, statusFilter),
          getEvents(token),
          getMentorships(token),
        ]);

      if (statsData.status === 'fulfilled') setStats(statsData.value);
      if (whitelistData.status === 'fulfilled') setWhitelist(whitelistData.value);
      if (studentsData.status === 'fulfilled') setStudents(studentsData.value);
      if (eventsData.status === 'fulfilled') setEvents(eventsData.value);
      if (mentorshipsData.status === 'fulfilled') setMentorships(mentorshipsData.value);
    } catch (err) {
      console.error('Admin data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [token, searchQuery, statusFilter]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Handlers
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleAddWhitelist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newEmail.trim()) return;
    setActionLoading(true);
    try {
      await addWhitelist(token, newEmail.trim());
      setNewEmail('');
      await fetchAllData();
    } catch (err) {
      console.error('Error adding whitelist:', err);
      alert('Failed to add email to whitelist.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveWhitelist = async (id: string, email: string) => {
    if (!token || !confirm(`Remove "${email}" from whitelist?`)) return;
    setActionLoading(true);
    try {
      await removeWhitelist(token, id);
      await fetchAllData();
    } catch (err) {
      console.error('Error removing whitelist:', err);
      alert('Failed to remove from whitelist.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleBlock = async (id: string, name: string, isCurrentlyBlocked: boolean) => {
    if (!token) return;
    const action = isCurrentlyBlocked ? 'unblock' : 'block';
    if (!confirm(`Are you sure you want to ${action} "${name}"?`)) return;
    setActionLoading(true);
    try {
      await toggleBlockStudent(token, id);
      await fetchAllData();
    } catch (err) {
      console.error('Error toggling block:', err);
      alert(`Failed to ${action} user.`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (email: string, name?: string) => {
    if (!token || !confirm(`Permanently delete "${name || email}"? This cannot be undone.`)) return;
    setActionLoading(true);
    try {
      await deleteUserAccount(token, email);
      await fetchAllData();
    } catch (err) {
      console.error('Error deleting user:', err);
      
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenCreateEvent = () => {
    setEditingEventId(null);
    setEventForm({});
    setIsEventModalOpen(true);
  };

  const handleOpenEditEvent = (evt: EventItem) => {
    setEditingEventId(evt._id);
    setEventForm({
      title: evt.title,
      date: evt.date,
      time: evt.time,
      location: evt.location,
      category: evt.category,
      description: evt.description,
      image: evt.image,
      featured: evt.featured,
    });
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setActionLoading(true);
    try {
      await saveEvent(token, eventForm, editingEventId);
      setIsEventModalOpen(false);
      setEventForm({});
      setEditingEventId(null);
      await fetchAllData();
    } catch (err) {
      console.error('Error saving event:', err);
     
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string, title: string) => {
    if (!token || !confirm(`Delete event "${title}"?`)) return;
    setActionLoading(true);
    try {
      await deleteEvent(token, id);
      await fetchAllData();
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('Failed to delete event.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventForm({ ...eventForm, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Filter students
  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (s.fullName || s.name || '').toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      (s.branch || '').toLowerCase().includes(q);
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && !s.isBlocked) ||
      (statusFilter === 'blocked' && s.isBlocked);
    return matchesSearch && matchesStatus;
  });

  const navItems = [
    { key: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { key: 'whitelist', label: 'Email Whitelist', icon: Mail },
    { key: 'events', label: 'Event Management', icon: Calendar },
    { key: 'gallery', label: 'Gallery Storage', icon: ImageIcon },
    { key: 'faculty', label: 'Faculty Management', icon: UserCheck },
    { key: 'students', label: 'Alumni Management', icon: Users }
  ] as const;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`h-screen w-screen overflow-hidden flex font-sans selection:bg-red-600 selection:text-white ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Sidebar */}
      {isSidebarVisible && (
        <aside className={`hidden md:flex w-64 xl:w-72 h-full flex-col justify-between p-5 shadow-2xl z-40 shrink-0 overflow-y-auto no-scrollbar ${darkMode
          ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-r border-slate-800'
          : 'bg-gradient-to-b from-red-700 via-red-600 to-rose-700 text-white'
          }`}>
          <div className="space-y-6">
            {/* Header Brand */}
            <div className={`flex items-center justify-between pb-5 border-b ${darkMode ? 'border-slate-800' : 'border-red-500/40'}`}>
              <div className="flex items-center space-x-3">
                <div className={`w-11 h-11 rounded-2xl font-extrabold text-lg flex items-center justify-center shadow-lg shrink-0 ${darkMode ? 'bg-red-600 text-white shadow-red-900/30' : 'bg-white text-red-600 shadow-red-900/30'
                  }`}>
                  {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div>
                  <h1 className="text-lg font-extrabold font-serif tracking-tight text-white flex items-center gap-1.5">
                    <span>Admin Panel</span>
                  </h1>
                  <p className={`text-[11px] font-medium ${darkMode ? 'text-slate-400' : 'text-red-200'}`}>Super Admin Console</p>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarVisible(false)}
                className={`p-1.5 rounded-xl transition-colors cursor-pointer ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-red-800/60 hover:bg-red-900 text-red-100 hover:text-white'
                  }`}
                title="Hide Sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key as TabType)}
                    className={`relative w-full px-4 py-3 rounded-2xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer flex items-center justify-between gap-3 ${isActive
                      ? darkMode
                        ? 'bg-red-600 text-white shadow-xl shadow-red-900/30 font-extrabold'
                        : 'bg-white text-red-600 shadow-xl shadow-red-950/20 translate-x-1 font-extrabold'
                      : darkMode
                        ? 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                        : 'text-red-100 hover:text-white hover:bg-red-500/40'
                      }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? (darkMode ? 'text-white' : 'text-red-600') : (darkMode ? 'text-slate-500' : 'text-red-200')}`} />
                      <span className="tracking-tight truncate">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className={`w-4 h-4 shrink-0 ${darkMode ? 'text-white' : 'text-red-600'}`} />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className={`pt-4 border-t space-y-2 mt-6 ${darkMode ? 'border-slate-800' : 'border-red-500/40'}`}>

            <button
              onClick={handleLogout}
              className={`w-full px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-3 text-white shadow-md ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-800/80 hover:bg-red-900'
                }`}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col h-full min-w-0 overflow-y-auto ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
        {/* Mobile Header */}
        <div className="md:hidden bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white px-4 py-3.5 flex items-center justify-between shadow-md sticky top-0 z-40">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-white text-red-600 font-extrabold flex items-center justify-center shadow-md text-sm">
              {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <span className="font-serif font-extrabold text-sm tracking-wide">Admin Panel</span>
              <p className="text-[10px] text-red-100 font-mono truncate max-w-[180px]">{adminUser?.email}</p>
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
                    setActiveTab(item.key as TabType);
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
        <header className={`sticky top-0 z-30 backdrop-blur-md border-b shadow-xs px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 ${darkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200/80'
          }`}>
          <div className="flex items-center gap-3">
            {!isSidebarVisible && (
              <button
                onClick={() => setIsSidebarVisible(true)}
                className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all cursor-pointer hidden md:flex items-center gap-1.5 text-xs font-bold"
                title="Show Sidebar"
              >
                <PanelLeft className="w-4 h-4 text-red-600" />
                <span>Sidebar</span>
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">

                <h1 className={`text-lg sm:text-xl font-extrabold font-serif tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {navItems.find((item) => item.key === activeTab)?.label || 'Dashboard'}
                </h1>
              </div>
              <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Logged in as <strong className={darkMode ? 'text-white' : 'text-slate-800'}>{adminUser?.name || adminUser?.email}</strong>
              </p>
            </div>
          </div>

          {/* Top Bar Quick Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${darkMode
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}

            </button>

            <button
              onClick={() => {
                setLoading(true);
                fetchAllData().finally(() => setLoading(false));
              }}
              disabled={loading}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${darkMode
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 text-red-500 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Refresh</span>
            </button>

            <Link
              href="/"
              className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${darkMode
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              title="Back to Portal"
            >
              <Home className="w-4 h-4 text-red-500" />
              <span className="hidden md:inline">Portal</span>
            </Link>

            <div className={`hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap shadow-xs ${darkMode
              ? 'bg-gradient-to-r from-red-600/30 to-rose-600/20 text-white border border-red-500/40'
              : 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-red-900/20'
              }`}>
              <Award className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Gardi Admin Console</span>
            </div>
          </div>
        </header>

        {/* Module Content */}
        <main className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6 flex-1">
          {loading && (
            <div className="flex items-center justify-center py-4">
              <RefreshCw className="w-5 h-5 text-red-500 animate-spin" />
              <span className="ml-2 text-xs font-bold text-slate-500">Syncing data...</span>
            </div>
          )}

          {activeTab === 'overview' && (
            <AdminOverview
              darkMode={darkMode}
              stats={stats}
              whitelist={whitelist}
              students={students}
              events={events}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'whitelist' && (
            <WhitelistManagement
              darkMode={darkMode}
              whitelist={whitelist}
              students={students}
              newEmail={newEmail}
              setNewEmail={setNewEmail}
              actionLoading={actionLoading}
              handleAddWhitelist={handleAddWhitelist}
              handleRemoveWhitelist={handleRemoveWhitelist}
              handleDeleteUser={handleDeleteUser}
            />
          )}

          {activeTab === 'students' && (
            <StudentManagement
              darkMode={darkMode}
              students={filteredStudents}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              actionLoading={actionLoading}
              handleToggleBlock={handleToggleBlock}
              handleDeleteUser={handleDeleteUser}
            />
          )}

          {activeTab === 'events' && (
            <EventManagement
              darkMode={darkMode}
              events={events}
              actionLoading={actionLoading}
              isEventModalOpen={isEventModalOpen}
              editingEventId={editingEventId}
              eventForm={eventForm}
              setEventForm={setEventForm}
              setIsEventModalOpen={setIsEventModalOpen}
              handleOpenCreateEvent={handleOpenCreateEvent}
              handleOpenEditEvent={handleOpenEditEvent}
              handleSaveEvent={handleSaveEvent}
              handleDeleteEvent={handleDeleteEvent}
              handleImageFileChange={handleImageFileChange}
            />
          )}

      

          {activeTab === 'faculty' && (
            <FacultyAdminSection darkMode={darkMode} />
          )}

          {activeTab === 'gallery' && (
            <GalleryAdminSection darkMode={darkMode} />
          )}
        </main>
      </div>
    </div>
  );
}

/* ─── Mentorship Section (inline, since it's read-only overview) ─── */
function MentorshipSection({ darkMode, mentorships }: { darkMode: boolean; mentorships: MentorshipItem[] }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className={`p-6 rounded-3xl border shadow-xl space-y-4 transition-colors ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <Handshake className="w-5 h-5 text-amber-500" />
          <h3 className={`text-base font-extrabold font-serif ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Mentorship Requests ({mentorships.length})
          </h3>
        </div>

        {mentorships.length === 0 ? (
          <p className="text-xs text-slate-500 py-8 text-center">No mentorship requests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mentorships.map((m) => (
              <div
                key={m._id}
                className={`rounded-2xl border p-4 space-y-2 transition-colors ${darkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
                    {m.category || 'General'}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${m.status === 'approved'
                    ? 'bg-emerald-500/10 text-emerald-600'
                    : m.status === 'rejected'
                      ? 'bg-red-500/10 text-red-500'
                      : 'bg-amber-500/10 text-amber-600'
                    }`}>
                    {m.status || 'Pending'}
                  </span>
                </div>
                <h4 className={`text-sm font-bold font-serif line-clamp-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {m.title}
                </h4>
                <p className="text-[11px] text-slate-500">
                  Mentor: <strong>{m.mentorName}</strong>
                </p>
                {m.description && (
                  <p className="text-[11px] text-slate-500 line-clamp-2">{m.description}</p>
                )}
                <p className="text-[10px] text-slate-400">
                  {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Faculty Admin Section (delegates to faculty modules) ─── */
function FacultyAdminSection({ darkMode }: { darkMode: boolean }) {
  const [subTab, setSubTab] = useState<'overview' | 'members' | 'events' | 'gallery'>('overview');

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'members', label: 'Members' },
    { key: 'events', label: 'Events' },
    { key: 'gallery', label: 'Gallery' },
  ] as const;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Sub-tab Navigation */}
      <div className={`p-4 rounded-3xl border shadow-lg ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSubTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${subTab === tab.key
                ? 'bg-red-600 text-white shadow-md'
                : darkMode
                  ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {subTab === 'overview' && <FacultyModuleOverview onNavigate={(t: string) => setSubTab(t as typeof subTab)} />}
      {subTab === 'members' && <FacultyMemberList />}
      {subTab === 'events' && <FacultyModuleEvents />}
      {subTab === 'gallery' && <FacultyModuleGallery />}
    </div>
  );
}

/* ─── Gallery Admin Section (delegates to faculty gallery) ─── */
function GalleryAdminSection({ darkMode }: { darkMode: boolean }) {
  void darkMode;
  return (
    <div className="animate-in fade-in duration-300">
      <FacultyModuleGallery />
    </div>
  );
}
