'use client';

import React from 'react';
import {
  Sparkles,
  Plus,
  Calendar,
  Clock,
  MapPin,
  Star,
  Edit3,
  Trash2,
  X,
  Upload,
  RefreshCw,
} from 'lucide-react';
import { EventItem } from '../adminApi';

interface EventManagementProps {
  darkMode: boolean;
  events: EventItem[];
  actionLoading: boolean;
  isEventModalOpen: boolean;
  editingEventId: string | null;
  eventForm: Partial<EventItem>;
  setEventForm: React.Dispatch<React.SetStateAction<Partial<EventItem>>>;
  setIsEventModalOpen: (open: boolean) => void;
  handleOpenCreateEvent: () => void;
  handleOpenEditEvent: (evt: EventItem) => void;
  handleSaveEvent: (e: React.FormEvent) => void;
  handleDeleteEvent: (id: string, title: string) => void;
  handleImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EventManagement({
  darkMode,
  events,
  actionLoading,
  isEventModalOpen,
  editingEventId,
  eventForm,
  setEventForm,
  setIsEventModalOpen,
  handleOpenCreateEvent,
  handleOpenEditEvent,
  handleSaveEvent,
  handleDeleteEvent,
  handleImageFileChange,
}: EventManagementProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Action Bar & Info */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-300 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-slate-200/50'
        }`}>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Event Management</span>
          </div>
          <h2 className={`text-xl sm:text-2xl font-extrabold font-serif tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Alumni Summits & Events
          </h2>
          <p className={`text-xs sm:text-sm max-w-xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Create, schedule, update, or remove live events and webinars displayed on the public Alumni Events page.
          </p>
        </div>

        <button
          onClick={handleOpenCreateEvent}
          className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer shrink-0 scale-100 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <div className={`col-span-full py-16 text-center rounded-3xl border border-dashed transition-colors ${darkMode ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-white border-slate-300 text-slate-500'
            }`}>
            <Calendar className="w-12 h-12 mx-auto text-slate-400 mb-3 opacity-60" />
            <h3 className="text-base font-bold">No Events Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Click the &quot;Create New Event&quot; button above to add your first alumni summit or webinar.
            </p>
          </div>
        ) : (
          events.map((evt) => (
            <div
              key={evt._id}
              className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-lg ${darkMode ? 'bg-slate-900 border-slate-800/80 hover:border-slate-700' : 'bg-white border-slate-200/80 hover:shadow-xl'
                }`}
            >
              <div>
                {/* Event Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={evt.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-red-600 text-white shadow-md">
                      {evt.category || 'General'}
                    </span>
                    {evt.featured && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-amber-500 text-white shadow-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className={`text-base font-extrabold font-serif line-clamp-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {evt.title}
                  </h3>

                  <p className={`text-xs line-clamp-2 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {evt.description}
                  </p>

                  <div className="space-y-2 text-xs border-t pt-3 border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="font-bold text-slate-800 dark:text-slate-200">{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{evt.time || '10:00 AM - 04:00 PM IST'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="p-5 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800/80 mt-2">
                <button
                  onClick={() => handleOpenEditEvent(evt)}
                  disabled={actionLoading}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${darkMode
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteEvent(evt._id, evt.title)}
                  disabled={actionLoading}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE / EDIT EVENT MODAL */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-extrabold font-serif">
                  {editingEventId ? 'Edit Event Details' : 'Create New Alumni Event'}
                </h3>
              </div>
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-800/40 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4 text-xs">
              <div>
                <label className={`block font-bold mb-1 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Alumni Summit 2026"
                  value={eventForm.title || ''}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-xs transition-all focus:outline-none focus:ring-2 focus:ring-red-500/20 ${darkMode ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block font-bold mb-1 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Category</label>
                  <select
                    value={eventForm.category || 'General'}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-xs transition-all focus:outline-none focus:ring-2 focus:ring-red-500/20 ${darkMode ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                  >
                    <option value="General">General</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Networking">Networking</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </div>

                <div>
                  <label className={`block font-bold mb-1 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oct 15, 2026"
                    value={eventForm.date || ''}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-xs transition-all focus:outline-none focus:ring-2 focus:ring-red-500/20 ${darkMode ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block font-bold mb-1 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 10:00 AM - 04:00 PM IST"
                    value={eventForm.time || ''}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-xs transition-all focus:outline-none focus:ring-2 focus:ring-red-500/20 ${darkMode ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                  />
                </div>

                <div>
                  <label className={`block font-bold mb-1 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Main Auditorium / Zoom"
                    value={eventForm.location || ''}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-xs transition-all focus:outline-none focus:ring-2 focus:ring-red-500/20 ${darkMode ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block font-bold mb-1 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detailed description of the event..."
                  value={eventForm.description || ''}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-xs transition-all focus:outline-none focus:ring-2 focus:ring-red-500/20 ${darkMode ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                />
              </div>

              <div>
                <label className={`block font-bold mb-1.5 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  Event Banner Image (Choose Image File or Paste URL)
                </label>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="event-image-upload"
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed text-xs font-bold transition-all cursor-pointer ${darkMode
                        ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-700'
                        }`}
                    >
                      <Upload className="w-4 h-4 text-red-500 shrink-0" />
                      <span>Select Image File from Computer...</span>
                    </label>
                    <input
                      id="event-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="url"
                      placeholder="Or paste direct image URL (https://...)"
                      value={eventForm.image || ''}
                      onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs transition-all focus:outline-none focus:ring-2 focus:ring-red-500/20 ${darkMode ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                    />
                  </div>

                  {eventForm.image && (
                    <div className="relative h-36 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={eventForm.image}
                        alt="Event Banner Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setEventForm({ ...eventForm, image: '' })}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
                        title="Remove Selected Image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={eventForm.featured || false}
                  onChange={(e) => setEventForm({ ...eventForm, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                />
                <label htmlFor="featured" className={`font-bold cursor-pointer ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  Mark as Featured Event (Highlights on Events page)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className={`px-5 py-2.5 rounded-xl font-bold transition-all border ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                    }`}
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
                    <span>{editingEventId ? 'Update Event' : 'Create Event'}</span>
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

export default EventManagement;
