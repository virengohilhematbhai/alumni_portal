'use client';

import React from 'react';
import { Search, CheckCircle2, XCircle, Trash2 } from 'lucide-react';
import { StudentUser } from '../adminApi';

interface StudentManagementProps {
  darkMode: boolean;
  students: StudentUser[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: 'all' | 'active' | 'blocked') => void;
  actionLoading: boolean;
  handleToggleBlock: (id: string, name: string, isCurrentlyBlocked: boolean) => void;
  handleDeleteUser: (email: string, name?: string) => void;
}

export function StudentManagement({
  darkMode,
  students,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  actionLoading,
  handleToggleBlock,
  handleDeleteUser,
}: StudentManagementProps) {
  return (
    <div className="space-y-6">
      {/* Filter & Search Bar */}
      <div className={`border rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row gap-4 justify-between items-center transition-colors ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="relative flex-1 w-full">
          <Search className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students by name, email, or organization..."
            className={`w-full border rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all ${darkMode
                ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className={`text-xs font-bold uppercase shrink-0 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'blocked')}
            className={`w-full sm:w-auto border text-xs font-bold rounded-2xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all cursor-pointer ${darkMode
                ? 'bg-slate-950 border-slate-800 text-slate-200'
                : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
          >
            <option value="all">All Students ({students.length})</option>
            <option value="active">Active Only</option>
            <option value="blocked">Blocked Only</option>
          </select>
        </div>
      </div>

      {/* Students Data Table */}
      <div className={`border rounded-3xl overflow-hidden shadow-xl transition-colors ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}`}>
        {/* Mobile View Cards */}
        <div className={`block sm:hidden divide-y ${darkMode ? 'divide-slate-800' : 'divide-slate-200'}`}>
          {students.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              No registered students match your search criteria.
            </div>
          ) : (
            students.map((student) => (
              <div key={student._id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className={`font-extrabold text-sm ${darkMode ? 'text-white' : 'text-slate-900'}`}>{student.fullName || student.name}</div>
                    <div className={`text-xs break-all ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{student.email}</div>
                    {student.branch && (
                      <div className="text-[11px] text-slate-500 mt-1 font-medium">Branch: {student.branch}</div>
                    )}
                  </div>
                  <div>
                    {student.isBlocked ? (
                      <span className={`inline-flex items-center gap-1 border text-[10px] font-bold px-2 py-0.5 rounded-full ${darkMode
                          ? 'bg-red-950/80 border-red-500/40 text-red-400'
                          : 'bg-red-50 border-red-300 text-red-700'
                        }`}>
                        <XCircle className="w-3 h-3" />
                        Blocked
                      </span>
                    ) : (
                      <span className={`inline-flex items-center gap-1 border text-[10px] font-bold px-2 py-0.5 rounded-full ${darkMode
                          ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
                          : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 gap-2">
                  <span className="text-[11px] text-slate-500">
                    Joined: {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleBlock(student._id, student.fullName || student.name || 'User', !!student.isBlocked)}
                      disabled={actionLoading}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer disabled:opacity-50 ${student.isBlocked
                          ? 'bg-emerald-600/20 text-emerald-500 border-emerald-500/30 hover:bg-emerald-600 hover:text-white'
                          : 'bg-red-600/20 text-red-500 border-red-500/30 hover:bg-red-600 hover:text-white'
                        }`}
                    >
                      {student.isBlocked ? 'Unblock' : 'Block Access'}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(student.email, student.fullName || student.name)}
                      disabled={actionLoading}
                      className="bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/30 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1"
                      title="Delete User Account permanently from MongoDB"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className={`uppercase text-[10px] font-bold tracking-wider border-b ${darkMode
                ? 'bg-slate-950/80 text-slate-400 border-slate-800'
                : 'bg-slate-100/80 text-slate-600 border-slate-200'
              }`}>
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Branch / Degree</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4">Access Status</th>
                <th className="px-6 py-4 text-right">Access & Account Controls</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-slate-800/60 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-500">
                    No registered students match your search criteria.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student._id} className={`transition-all ${darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}`}>
                    <td className={`px-6 py-4 font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{student.fullName || student.name}</td>
                    <td className="px-6 py-4">{student.email}</td>
                    <td className="px-6 py-4">{student.branch || student.degree || 'General'}</td>
                    <td className="px-6 py-4">
                      {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      {student.isBlocked ? (
                        <span className={`inline-flex px-4 py-1.5 items-center gap-1.5 border text-[11px] font-bold rounded-full ${darkMode
                            ? 'bg-red-950/80 border-red-500/40 text-red-400'
                            : 'bg-red-50 border-red-300 text-red-700'
                          }`}>
                          <XCircle className="w-3.5 h-3.5" />
                          Blocked
                        </span>
                      ) : (
                        <span className={`inline-flex px-4 py-1.5 items-center gap-1.5 border text-[11px] font-bold rounded-full ${darkMode
                            ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
                            : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                          }`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleBlock(student._id, student.fullName || student.name || 'User', !!student.isBlocked)}
                        disabled={actionLoading}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer disabled:opacity-50 ${student.isBlocked
                            ? 'bg-emerald-600/20 text-emerald-500 border-emerald-500/30 hover:bg-emerald-600 hover:text-white'
                            : 'bg-amber-600/20 text-amber-500 border-amber-500/30 hover:bg-amber-600 hover:text-white'
                          }`}
                      >
                        {student.isBlocked ? 'Unblock Student' : 'Block Access'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(student.email, student.fullName || student.name)}
                        disabled={actionLoading}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-1.5 rounded-xl text-xs transition-all shadow-md shadow-red-600/20 cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shrink-0"
                        title="Permanently Delete User Account & Profile from MongoDB"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete User</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentManagement;
