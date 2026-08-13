'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Building,
  Calendar,
  FileText,
  Save,
  CheckCircle2,
  AlertCircle,
  Camera,
  BookOpen,
  Award,
  Lock,
  ArrowLeft,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';
import { getProfile, updateProfile, UserProfile, ApiError } from '../../lib/api/profileApi';

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState<UserProfile>({
    _id: '',
    name: '',
    email: '',
    company: '',
    role: 'student',
    isAdmin: false,
    profilePhoto: '',
    phone: '',
    college: '',
    studentId: '',
    department: '',
    course: '',
    batchYear: '',
    graduationYear: '',
    bio: '',
  });

  // Fetch current user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const data = await getProfile(token);
        setFormData({
          _id: data._id || '',
          name: data.name || '',
          email: data.email || '',
          company: data.company || '',
          role: data.role || 'student',
          isAdmin: Boolean(data.isAdmin),
          profilePhoto: data.profilePhoto || '',
          phone: data.phone || '',
          college: data.college || '',
          studentId: data.studentId || '',
          department: data.department || '',
          course: data.course || '',
          batchYear: data.batchYear || '',
          graduationYear: data.graduationYear || '',
          bio: data.bio || '',
        });
      } catch (err: unknown) {
        const apiErr = err as ApiError;
        if (apiErr.status === 401 || apiErr.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
          return;
        }
        const msg = apiErr.message || 'Error fetching user profile';
        setMessage({ type: 'error', text: msg });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Convert uploaded image to base64 data URL
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size should be less than 5 MB' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePhoto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSaving(true);

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const updatedUser = await updateProfile(token, {
        name: formData.name,
        company: formData.company,
        profilePhoto: formData.profilePhoto,
        phone: formData.phone,
        college: formData.college,
        studentId: formData.studentId,
        department: formData.department,
        course: formData.course,
        batchYear: formData.batchYear,
        graduationYear: formData.graduationYear,
        bio: formData.bio,
      });

      // Update local storage user data
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Synchronize form state with response
      setFormData((prev) => ({
        ...prev,
        ...updatedUser,
      }));

      setMessage({ type: 'success', text: 'Profile updated successfully! All details saved in MongoDB.' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update profile. Please try again.';
      setMessage({ type: 'error', text: msg });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-10 pb-12 px-4">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center gap-4 max-w-sm w-full text-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800">Loading User Profile</h3>
            <p className="text-xs text-slate-500">Fetching authenticated profile from MongoDB...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-14 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-600 transition-colors bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          {/* <div className="text-xs font-semibold text-slate-400">
            Account Security: <span className="text-emerald-600 font-bold">MongoDB Authenticated</span>
          </div> */}
        </div>

        {/* Top Profile Card Header */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 px-6 sm:px-10 py-10 text-white relative">
            <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">

              {/* Profile Photo Upload / Preview */}
              <div className="relative group shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-slate-800 border-4 border-white/20 shadow-2xl flex items-center justify-center overflow-hidden">
                  {formData.profilePhoto ? (
                    <img
                      src={formData.profilePhoto}
                      alt={formData.name || 'Profile Photo'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-slate-400" />
                  )}
                </div>
                <label
                  htmlFor="photo-upload"
                  className="absolute bottom-1 right-1 w-9 h-9 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg border-2 border-white cursor-pointer transition-transform group-hover:scale-110"
                  title="Upload / Change Photo"
                >
                  <Camera className="w-4 h-4" />
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Header Details */}
              <div className="text-center sm:text-left space-y-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight truncate">
                    {formData.name || 'User Profile'}
                  </h1>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${formData.isAdmin
                    ? 'bg-red-500/20 text-red-300 border-red-400/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                    }`}>
                    {formData.isAdmin ? 'Admin' : formData.role === 'alumni' ? 'Alumni' : 'Student'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-medium truncate flex items-center justify-center sm:justify-start gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{formData.email}</span>
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-slate-300 font-medium">
                  {formData.college && (
                    <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-xl backdrop-blur-sm">
                      <Building className="w-3.5 h-3.5 text-red-400" />
                      {formData.college}
                    </span>
                  )}
                  {formData.department && (
                    <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-xl backdrop-blur-sm">
                      <BookOpen className="w-3.5 h-3.5 text-red-400" />
                      {formData.department}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Optional Profile Photo URL Input */}
          <div className="bg-slate-50 px-6 sm:px-10 py-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-center gap-3 text-xs">
            <span className="font-bold text-slate-600 whitespace-nowrap flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-red-600" />
              Photo Image URL (Optional):
            </span>
            <input
              type="text"
              name="profilePhoto"
              value={formData.profilePhoto}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg or upload via camera icon"
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20"
            />
          </div>
        </div>

        {/* Notifications / Alerts */}
        {message && (
          <div
            className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3 text-xs sm:text-sm font-semibold shadow-sm transition-all ${message.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-700'
              }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 leading-relaxed">{message.text}</div>
          </div>
        )}

        {/* Profile Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Section 1: Personal & Account Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-serif">Personal Information</h2>
                <p className="text-xs text-slate-500">Your core contact and identification details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Email Address (Read-only) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center justify-between">
                  <span>Email Address</span>
                  <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" /> Account ID (Locked)
                  </span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    disabled
                    readOnly
                    value={formData.email}
                    className="w-full bg-slate-100/80 border border-slate-200/80 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-500 font-semibold cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Contact Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Student ID / Alumni ID */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Student ID / Alumni ID
                </label>
                <div className="relative">
                  <Award className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="ALUMNI-2024-001 or Student Roll No"
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all font-medium"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Section 2: Academic Background */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-serif">Academic Background</h2>
                <p className="text-xs text-slate-500">Your university degree, course, department, and batch timeline</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* College / University */}
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  College / University
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="Gardi Vidyapith Campus / Department of Engineering"
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Department */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Department
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Computer Science & Engineering"
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Course */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Course / Degree
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="B.Tech, M.Tech, MCA, MBA"
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Batch Year */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Batch Year
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="batchYear"
                    value={formData.batchYear}
                    onChange={handleChange}
                    placeholder="e.g. 2020 - 2024"
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Graduation Year */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Graduation Year
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    placeholder="e.g. 2024"
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all font-medium"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Section 3: Professional & Bio */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-serif">Professional & About Bio</h2>
                <p className="text-xs text-slate-500">Current company or designation, and short background description</p>
              </div>
            </div>

            <div className="space-y-6">

              {/* Company / Organization */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Company / Current Workplace
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="TCS, Infosys, Student, or Freelancer"
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Bio Description */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Bio / Overview
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <textarea
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell other students and alumni about your achievements, expertise, and interest..."
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all font-medium resize-y"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Submit Action Bar */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 text-center sm:text-left font-medium">
              Clicking <span className="font-bold text-slate-800">&quot;Save Profile&quot;</span> saves your profile details.
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving Profile...</span>
                </>
              ) : (
                <>
                  <Save className="w-4.5 h-4.5" />
                  <span>Save Profile</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
