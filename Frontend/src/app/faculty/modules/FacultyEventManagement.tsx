'use client';

import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Plus,
  Trash2,
  Edit3,
  Search,
  X,
  RefreshCw,
  Clock,
  MapPin,
  Tag,
  Upload,
  CheckCircle2,
} from 'lucide-react';
import {
  getFacultyEvents,
  saveFacultyEvent,
  deleteFacultyEvent,
} from '../api/facultyEventApi';
import { EventItem } from '../../admin/api/types';

export function FacultyEventManagement() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState<Partial<EventItem>>({});

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getFacultyEvents();
      setEvents(data);
    } catch (err) {
      console.error('Failed to fetch faculty events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({
      category: 'Academic',
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (evt: EventItem) => {
    setEditingId(evt._id);
    setForm({ ...evt });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.location) {
      alert('Please fill in Event Title, Date, and Location.');
      return;
    }
    setActionLoading(true);
    try {
      await saveFacultyEvent(form, editingId || undefined);
      setIsModalOpen(false);
      setForm({});
      setEditingId(null);
      await fetchEvents();
    } catch (err) {
      console.error('Failed to save event:', err);
      alert('Failed to save event.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete event "${title}"?`)) return;
    setActionLoading(true);
    try {
      await deleteFacultyEvent(id);
      await fetchEvents();
    } catch (err) {
      console.error('Failed to delete event:', err);
      alert('Failed to delete event.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const filtered = events.filter((e) => {
    const q = searchQuery.toLowerCase();
    return (
      e.title.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      (e.description || '').toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-6 h-6 text-red-500 animate-spin" />
        <span className="ml-3 text-sm font-bold text-slate-500">Loading Events...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20">
            <Calendar className="w-3.5 h-3.5" />
            <span>Event Management</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-serif tracking-tight text-slate-900">
            Faculty Events & Workshops
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Create, schedule, and publish department events, webinars, and alumni meetups.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer shrink-0 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-lg">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by title, category, or location..."
            className="w-full border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all bg-slate-50 text-slate-900 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center rounded-3xl border border-dashed bg-white border-slate-300 text-slate-500">
            <Calendar className="w-12 h-12 mx-auto text-slate-400 mb-3 opacity-60" />
            <h3 className="text-base font-bold">No Events Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              {searchQuery
                ? 'No results match your search query.'
                : 'Click "Create New Event" to publish your first event.'}
            </p>
          </div>
        ) : (
          filtered.map((evt) => (
            <div
              key={evt._id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Event Image */}
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={evt.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-600 text-white shadow-md">
                      {evt.category}
                    </span>
                    {evt.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500 text-white shadow-md">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-5 space-y-3">
                  <h4 className="text-base font-extrabold font-serif text-slate-900 line-clamp-1">
                    {evt.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{evt.description}</p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{evt.date}</span>
                      {evt.time && (
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3 h-3" />
                          {evt.time}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">
                  {evt.attendeesCount !== undefined ? `${evt.attendeesCount} Attendees` : 'Faculty Managed'}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(evt)}
                    disabled={actionLoading}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border bg-white hover:bg-slate-100 text-slate-700 border-slate-200 disabled:opacity-50"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(evt._id, evt.title)}
                    disabled={actionLoading}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 disabled:opacity-50"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto bg-white text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-extrabold font-serif">
                  {editingId ? 'Edit Event' : 'Create New Event'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1 text-slate-800">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Tech Symposium 2026"
                  value={form.title || ''}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1 text-slate-800">Date *</label>
                  <input
                    type="date"
                    required
                    value={form.date || ''}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-slate-800">Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 10:00 AM - 04:00 PM"
                    value={form.time || ''}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1 text-slate-800">Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Main Auditorium / Zoom"
                    value={form.location || ''}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-slate-800">Category</label>
                  <select
                    value={form.category || 'Academic'}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Alumni Meet">Alumni Meet</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Placement">Placement</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-800">Description</label>
                <textarea
                  rows={3}
                  placeholder="Event highlights, speakers, agenda..."
                  value={form.description || ''}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-slate-800">Event Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-600 hover:file:bg-red-100 cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={form.featured || false}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <label htmlFor="featuredCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Feature this event on homepage
                </label>
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
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingId ? 'Update Event' : 'Publish Event'}</span>
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

export default FacultyEventManagement;
