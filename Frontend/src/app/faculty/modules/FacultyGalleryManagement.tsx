'use client';

import React, { useEffect, useState } from 'react';
import {
  ImageIcon,
  Upload,
  Trash2,
  Search,
  X,
  RefreshCw,
  Sparkles,
  FolderPlus,
} from 'lucide-react';
import {
  getFacultyGalleryList,
  createFacultyGalleryItem,
  deleteFacultyGalleryItem,
  FacultyGalleryItem,
} from '../api/facultyGalleryApi';

export function FacultyGalleryManagement() {
  const [gallery, setGallery] = useState<FacultyGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('Campus Life');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const data = await getFacultyGalleryList();
      setGallery(data);
    } catch (err) {
      console.error('Failed to fetch gallery list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleOpenUpload = () => {
    setCategory('Campus Life');
    setSelectedImages([]);
    setUploadProgress(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedImages.length === 0) {
      alert('Please select at least one image file.');
      return;
    }
    setActionLoading(true);
    const total = selectedImages.length;
    try {
      for (let i = 0; i < total; i++) {
        setUploadProgress({ current: i + 1, total });
        await createFacultyGalleryItem({
          title: `Campus Photo ${Date.now()}-${i + 1}`,
          category: category || 'Campus Life',
          imageUrl: selectedImages[i],
        });
      }
      setIsModalOpen(false);
      setSelectedImages([]);
      setUploadProgress(null);
      await fetchGallery();
    } catch (err) {
      console.error('Failed to upload images:', err);
      alert('Failed to upload some or all images.');
    } finally {
      setActionLoading(false);
      setUploadProgress(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
   
    try {
      await deleteFacultyGalleryItem(id);
      await fetchGallery();
    } catch (err) {
      console.error('Failed to delete image:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleImageFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      const readers: Promise<string>[] = fileList.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          })
      );
      Promise.all(readers).then((newImages) => {
        setSelectedImages((prev) => [...prev, ...newImages]);
      });
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setSelectedImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const filtered = gallery.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      (item.title || '').toLowerCase().includes(q) ||
      (item.category || '').toLowerCase().includes(q) ||
      (item.uploader || '').toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-6 h-6 text-red-500 animate-spin" />
        <span className="ml-3 text-sm font-bold text-slate-500">Loading Gallery Storage...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-violet-500/10 text-violet-600 border border-violet-500/20">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Campus Gallery</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-serif tracking-tight text-slate-900">
            Gallery Storage & Photos
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Upload single or multiple campus photos, department events, convocation pictures, and alumni gatherings at once.
          </p>
        </div>

        <button
          onClick={handleOpenUpload}
          className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer shrink-0 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Upload className="w-4.5 h-4.5" />
          <span>Upload Multiple Images</span>
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
            placeholder="Search gallery by title or category..."
            className="w-full border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all bg-slate-50 text-slate-900 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center rounded-3xl border border-dashed bg-white border-slate-300 text-slate-500">
            <ImageIcon className="w-12 h-12 mx-auto text-slate-400 mb-3 opacity-60" />
            <h3 className="text-base font-bold">No Gallery Photos Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              {searchQuery
                ? 'No results match your search query.'
                : 'Upload photos using the button above.'}
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'}
                    alt={item.title || 'Campus Photo'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/70 text-white backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 space-y-1">
                  <h4 className="text-sm font-extrabold font-serif text-slate-900 truncate">{item.title || 'Campus Photo'}</h4>
                  <p className="text-[10px] text-slate-400">Uploaded on {item.date}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold truncate max-w-[120px]">
                  By: {item.uploader}
                </span>
                <button
                  onClick={() => handleDelete(item.id, item.title || 'Photo')}
                  disabled={actionLoading}
                  className="p-1.5 rounded-xl bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 transition-all cursor-pointer disabled:opacity-50"
                  title="Delete Image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto bg-white text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Upload className="w-5 h-5 text-violet-600" />
                <h3 className="text-lg font-extrabold font-serif">Upload Multiple Campus Photos</h3>
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
                <label className="block font-bold mb-1 text-slate-800">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-xs bg-slate-50 border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                >
                  <option value="Campus Life">Campus Life</option>
                  <option value="Convocation">Convocation</option>
                  <option value="Department Events">Department Events</option>
                  <option value="Alumni Meet">Alumni Meet</option>
                  <option value="Sports & Culture">Sports & Culture</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-2 text-slate-800">Select Image File(s) *</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageFiles}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-violet-50 file:text-violet-600 hover:file:bg-violet-100 cursor-pointer border border-slate-200 rounded-2xl p-2 bg-slate-50"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  You can select multiple photos at once (Hold Ctrl/Cmd or Shift to select multiple files).
                </p>
              </div>

              {selectedImages.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <FolderPlus className="w-3.5 h-3.5 text-slate-500" />
                      Selected ({selectedImages.length} {selectedImages.length === 1 ? 'image' : 'images'})
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedImages([])}
                      className="text-[11px] text-red-600 font-bold hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-200">
                    {selectedImages.map((imgUrl, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imgUrl} alt={`Selected ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors shadow-md cursor-pointer"
                          title="Remove image"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                  disabled={actionLoading || selectedImages.length === 0}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold transition-all shadow-md shadow-red-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>
                        {uploadProgress
                          ? `Uploading ${uploadProgress.current} of ${uploadProgress.total}...`
                          : 'Uploading...'}
                      </span>
                    </>
                  ) : (
                    <span>
                      Upload {selectedImages.length > 0 ? `${selectedImages.length} ${selectedImages.length === 1 ? 'Image' : 'Images'}` : 'Images'}
                    </span>
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

export default FacultyGalleryManagement;



