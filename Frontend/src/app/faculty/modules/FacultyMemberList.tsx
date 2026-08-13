'use client';

import React, { useEffect, useState } from 'react';
import {
  Plus,
  Trash2,
  Edit3,
  X,
  RefreshCw,
  Users,
  Search,
  Mail,
  Phone,
  Building2,
  Shield,
  CheckCircle2,
  XCircle,
  Key,
  Lock,
} from 'lucide-react';
import {
  getFacultyMembers,
  createFacultyMember,
  updateFacultyMember,
  deleteFacultyMember,
  FacultyMember,
} from '../api/facultyMemberApi';

interface FacultyMemberListProps {
  isAdmin?: boolean;
}

export function FacultyMemberList({ isAdmin = true }: FacultyMemberListProps) {
  const [members, setMembers] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState<Partial<FacultyMember>>({});

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const data = await getFacultyMembers();
      setMembers(data);
    } catch (err) {
      console.error('Failed to fetch faculty members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({
      password: '',
      department: 'Computer Engineering',
      designation: 'Assistant Professor',
      accessLevel: 'Faculty Access',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: FacultyMember) => {
    setEditingId(member.id);
    setForm({
      name: member.name,
      email: member.email,
      department: member.department,
      designation: member.designation,
      accessLevel: member.accessLevel,
      phone: member.phone,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert('Please provide Full Name and Email Address.');
      return;
    }
    setActionLoading(true);
    try {
      if (editingId) {
        await updateFacultyMember(editingId, form);
      } else {
        await createFacultyMember(form);
      }
      setIsModalOpen(false);
      setForm({});
      setEditingId(null);
      await fetchMembers();
    } catch (err) {
      console.error('Failed to save faculty member:', err);
      alert('Failed to save faculty member. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete faculty member "${name}"?`)) return;
    setActionLoading(true);
    try {
      await deleteFacultyMember(id);
      await fetchMembers();
    } catch (err) {
      console.error('Failed to delete faculty member:', err);
      alert('Failed to delete member.');
    } finally {
      setActionLoading(false);
    }
  };

  const filtered = members.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.department.toLowerCase().includes(q) ||
      m.designation.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-6 h-6 text-red-500 animate-spin" />
        <span className="ml-3 text-sm font-bold text-slate-500">Loading Faculty Directory...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <Users className="w-3.5 h-3.5" />
            <span>Faculty Directory</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-serif tracking-tight text-slate-900">
            Faculty Members
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            {isAdmin
              ? 'Add, configure, and manage faculty credentials, roles, and department access.'
              : 'Browse department faculty members and academic staff profiles.'}
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={handleOpenCreate}
            className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer shrink-0 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>Add Faculty Member</span>
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-lg">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, department, or designation..."
            className="w-full border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all bg-slate-50 text-slate-900 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center rounded-3xl border border-dashed bg-white border-slate-300 text-slate-500">
            <Users className="w-12 h-12 mx-auto text-slate-400 mb-3 opacity-60" />
            <h3 className="text-base font-bold">No Faculty Members Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              {searchQuery
                ? 'No results match your search query.'
                : isAdmin
                  ? 'Add your first faculty member using the "Add Faculty Member" button.'
                  : 'No faculty members are listed at this time.'}
            </p>
          </div>
        ) : (
          filtered.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-slate-200 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${member.status === 'Active' ? 'bg-emerald-500' : member.status === 'Blocked' ? 'bg-red-500' : 'bg-amber-500'
                    }`} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-extrabold text-slate-900 truncate">{member.name}</h4>
                  <p className="text-[11px] text-red-500 font-bold">{member.designation}</p>

                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{member.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{member.accessLevel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${member.status === 'Active'
                  ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                  : member.status === 'Blocked'
                    ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                    : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                  }`}>
                  {member.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  {member.status}
                </span>

                {isAdmin && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(member)}
                      disabled={actionLoading}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 disabled:opacity-50"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(member.id, member.name)}
                      disabled={actionLoading}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 disabled:opacity-50"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal (Only accessible in Admin Mode) */}
      {isModalOpen && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto bg-white text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-extrabold font-serif">
                  {editingId ? 'Edit Faculty Account' : 'Create New Faculty Account (Admin)'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-800 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Admin Creation Notice:</strong> Setting the email and password here will create a faculty login credential allowing the member to sign in to the Faculty Panel.
              </span>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1 text-slate-800">Faculty Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ramesh Sharma"
                  value={form.name || ''}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-800 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>Email Address (Login Username) *</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="faculty@college.edu.in"
                  value={form.email || ''}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              {!editingId && (
                <div>
                  <label className="block font-bold mb-1 text-slate-800 flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-slate-500" />
                    <span>Set Faculty Login Password *</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password (e.g. Faculty@123)"
                    value={form.password || ''}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    If left empty, default password will be assigned: <strong className="text-slate-600">Faculty@123</strong>
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1 text-slate-800">Department</label>
                  <select
                    value={form.department || 'Computer Engineering'}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  >
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Electronics Engineering">Electronics Engineering</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1 text-slate-800">Designation</label>
                  <select
                    value={form.designation || 'Assistant Professor'}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  >
                    <option value="Professor & HOD">Professor & HOD</option>
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Lecturer">Lecturer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1 text-slate-800">Access Level</label>
                  <select
                    value={form.accessLevel || 'Faculty Access'}
                    onChange={(e) => setForm({ ...form, accessLevel: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  >
                    <option value="Full Access">Full Access</option>
                    <option value="Faculty Access">Faculty Access</option>
                    <option value="Event & Gallery Manager">Event & Gallery Manager</option>
                    <option value="Event Coordinator">Event Coordinator</option>
                    <option value="View Only">View Only</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1 text-slate-800">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={form.phone || ''}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold transition-all border bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold transition-all shadow-md shadow-red-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving Account...</span>
                    </>
                  ) : (
                    <span>{editingId ? 'Update Faculty' : 'Create Faculty Account'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyMemberList;
