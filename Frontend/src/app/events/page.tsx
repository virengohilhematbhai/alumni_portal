'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, ArrowRight, Filter, Search, Tag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/Navbar';

import { PageBanner } from '@/components/ui/PageBanner';
import { AuthGuard } from '@/components/AuthGuard';
import { getPublicEvents, EventItem } from './eventsApi';

const sampleEvents: EventItem[] = [
  {
    id: '1',
    title: 'Global Alumni Annual Reunion 2026',
    date: 'Oct 15, 2026',
    time: '09:00 AM - 05:00 PM IST',
    location: 'Main Auditorium, Gardi Campus / Virtual Live',
    category: 'Reunion',
    attendees: 340,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    description: 'Reconnect with fellow classmates, celebrate milestone anniversaries, and network with industry leaders at our annual flagship summit.',
    featured: true,
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getPublicEvents();
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(sampleEvents);
        }
      } catch (err) {
        console.error('Error fetching public events:', err);
        setEvents(sampleEvents);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const displayEvents = events.length > 0 ? events : sampleEvents;
  const categories = ['All', 'Reunion', 'Webinar', 'Networking', 'Workshop', 'General'];

  const filteredEvents = displayEvents.filter((event) => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch =
      (event.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (event.description || '').toLowerCase().includes(search.toLowerCase()) ||
      (event.location || '').toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />

        <main className="flex-grow  pb-16">

          <PageBanner
            watermark="EVENTS"
            title="Alumni Events & Summits"

          />
          {/* Header Hero */}
          <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white py-16 px-4 sm:px-6 lg:px-8 shadow-inner">
            <div className="max-w-7xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center space-x-2 bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full tracking-widest backdrop-blur-md">
                <Calendar className="w-4 h-4" />
                <span>Alumni Events & Summits</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif">
                Stay Connected Through <span className="text-red-500">Global Events</span>
              </h1>
              <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
                Join upcoming alumni reunions, technical keynotes, networking dinners, and career workshops.
              </p>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
            {/* Search & Category Filter */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search events by title or keywords..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                <Filter className="w-4 h-4 text-slate-500 shrink-0" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${selectedCategory === cat
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((evt) => (
                <Card key={evt._id || evt.id} className="p-0 overflow-hidden bg-white shadow-xl border-slate-200/80 flex flex-col justify-between group">
                  <div>
                    <div className="relative h-48  rounded-lg  w-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={evt.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'}
                        alt={evt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <Badge variant="primary" size="sm">
                          {evt.category || 'General'}
                        </Badge>

                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-extrabold text-slate-900 font-serif leading-snug group-hover:text-red-600 transition-all">
                        {evt.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {evt.description}
                      </p>

                      <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3.5 h-3.5 text-red-600 shrink-0" />
                          <span className="font-bold text-slate-800">{evt.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{evt.time || '10:00 AM - 04:00 PM IST'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{evt.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-semibold">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{evt.attendeesCount ?? evt.attendees ?? 0} Attending</span>
                    </div>

                    <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Register Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
    </AuthGuard>
  );
}
