'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Grid,
  Columns,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Filter,
  Sparkles,
} from 'lucide-react';
import { PageBanner } from '@/components/ui/PageBanner';
import { AuthGuard } from '@/components/AuthGuard';

interface GalleryItem {
  id: string;
  imageUrl: string;
  category: 'Campus Life' | 'Reunions' | 'Events' | 'Convocation' | 'Workshops' | 'Achievements';
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    category: 'Campus Life',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-2',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    category: 'Convocation',
    aspectRatio: 'portrait',
  },
  {
    id: 'gal-3',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    category: 'Reunions',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-4',
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80',
    category: 'Events',
    aspectRatio: 'square',
  },
  {
    id: 'gal-5',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    category: 'Workshops',
    aspectRatio: 'portrait',
  },
  {
    id: 'gal-6',
    imageUrl: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1200&q=80',
    category: 'Achievements',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-7',
    imageUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80',
    category: 'Campus Life',
    aspectRatio: 'portrait',
  },
  {
    id: 'gal-8',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    category: 'Workshops',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-9',
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
    category: 'Reunions',
    aspectRatio: 'square',
  },
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [layoutMode, setLayoutMode] = useState<'masonry' | 'grid3' | 'grid4'>('masonry');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Fetch uploaded gallery items from Backend API
  useEffect(() => {
    const fetchUploadedGallery = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/faculty/gallery', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const apiData = await res.json();
          if (Array.isArray(apiData) && apiData.length > 0) {
            const formattedApiItems: GalleryItem[] = apiData.map((g: any, index: number) => ({
              id: g.id || g._id || `api-${index}`,
              category: (g.category as any) || 'Campus Life',
              imageUrl: g.imageUrl,
              aspectRatio: index % 3 === 1 ? 'portrait' : index % 3 === 2 ? 'square' : 'landscape',
            }));
            const apiImageUrls = new Set(formattedApiItems.map((item) => item.imageUrl));
            const filteredInitial = INITIAL_GALLERY.filter((item) => !apiImageUrls.has(item.imageUrl));
            setItems([...formattedApiItems, ...filteredInitial]);
          }
        }
      } catch (err) {
        console.error('Error fetching gallery images from API:', err);
      }
    };
    fetchUploadedGallery();
  }, []);

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.includes(searchQuery);

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const activeLightboxItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
        {/* Top Watermark Banner */}
        <PageBanner
          watermark="GALLERY"
          title="Alumni Gallery & Portfolio"
        />

        {/* Header Hero Banner */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white py-14 sm:py-16 px-4 sm:px-6 lg:px-8 shadow-inner">
          <div className="max-w-7xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full tracking-widest backdrop-blur-md">
              <Camera className="w-4 h-4" />
              <span>Alumni Gallery & Portfolio</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif">
              Explore <span className="text-red-500">Your Memories</span>
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
              Explore upcoming campus memories, reunions, and moments with your fellow alumni.
            </p>
          </div>
        </section>

        {/* Floating Search & Filter Bar */}

        {/* Main Photo Stream Section */}
        <section id="gallery-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 lg:px-8 pb-16 flex-1 w-full">
          {/* GALLERY PHOTO GRID */}
          {filteredItems.length === 0 ? (
            <div className="py-20 text-center  flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-200 border-dashed my-8 shadow-xs">
              <Filter className="w-12 h-12 text-slate-300 mb-4 animate-bounce" />
              <h3 className="text-xl font-bold text-slate-900">No memories found</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-md">
                We couldn't find any photos matching your current search query or category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-6 px-6 py-2.5 rounded-full bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-all cursor-pointer shadow-md"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                layoutMode === 'masonry'
                  ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4'
                  : layoutMode === 'grid3'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
              }
            >
              {filteredItems.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveLightboxIndex(index)}
                    className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 hover:border-red-500 shadow-xs hover:shadow-2xl hover:shadow-red-500/15 transition-all duration-500 cursor-pointer break-inside-avoid"
                  >
                    {/* Image Container (Image Only) */}
                    <div className="relative overflow-hidden w-full bg-slate-100">
                      <img
                        src={item.imageUrl}
                        alt={`Campus photo ${item.id}`}
                        className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${item.aspectRatio === 'portrait'
                          ? 'h-80 sm:h-96'
                          : item.aspectRatio === 'square'
                            ? 'h-64 sm:h-72'
                            : 'h-52 sm:h-60'
                          }`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* --- FULLSCREEN LIGHTBOX MODAL --- */}
        {activeLightboxItem && activeLightboxIndex !== null && (
          <div
            onClick={() => setActiveLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-8  backdrop-blur-2xl cursor-pointer select-none animate-fade-in"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-50 p-2.5 sm:p-3 rounded-full bg-white/90 text-slate-800 hover:text-red-600 hover:bg-white active:scale-95 border border-slate-200 transition-all cursor-pointer shadow-2xl"
              title="Close (Esc)"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex((prev) =>
                  prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
                );
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-white/90 text-slate-800 hover:text-red-600 hover:bg-white active:scale-95 border border-slate-200/80 transition-all cursor-pointer shadow-2xl flex items-center justify-center backdrop-blur-md"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex((prev) =>
                  prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
                );
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3.5 rounded-full bg-white/90 text-slate-800 hover:text-red-600 hover:bg-white active:scale-95 border border-slate-200/80 transition-all cursor-pointer shadow-2xl flex items-center justify-center backdrop-blur-md"
              title="Next (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Lightbox Image Box (Fits Image Perfectly) */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[92vw] max-h-[88vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900 cursor-default flex items-center justify-center"
            >
              <img
                src={activeLightboxItem.imageUrl}
                alt={`Photo ${activeLightboxItem.id}`}
                className="max-h-[88vh] max-w-[92vw] w-auto h-auto object-contain rounded-3xl block shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
