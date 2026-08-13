'use client';

import React from 'react';
import { Plus, Trash2, UserX, CheckCircle, Clock } from 'lucide-react';
import { WhitelistEntry, StudentUser } from '../adminApi';

interface WhitelistManagementProps {
  darkMode: boolean;
  whitelist: WhitelistEntry[];
  students?: StudentUser[];
  newEmail: string;
  setNewEmail: (email: string) => void;
  actionLoading: boolean;
  handleAddWhitelist: (e: React.FormEvent) => void;
  handleRemoveWhitelist: (id: string, email: string) => void;
  handleDeleteUser: (email: string, name?: string) => void;
}

export function WhitelistManagement({
  darkMode,
  whitelist,
  students = [],
  newEmail,
  setNewEmail,
  actionLoading,
  handleAddWhitelist,
  handleRemoveWhitelist,
  handleDeleteUser,
}: WhitelistManagementProps) {
  return (
    <div className="space-y-6">
      {/* Add New Approved Email Form */}
      <div className={`border rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 transition-colors ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}`}>
        <h2 className={`text-base sm:text-lg font-extrabold font-serif flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          <Plus className="w-5 h-5 text-red-500 shrink-0" />
          <span>Add Approved College Student Email</span>
        </h2>

        <form onSubmit={handleAddWhitelist} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="student@college.edu.in"
            className={`flex-1 border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all ${
              darkMode
                ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
          <button
            type="submit"
            disabled={actionLoading}
            className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add To Whitelist</span>
          </button>
        </form>
      </div>

      {/* Approved Whitelist Email Table */}
      <div className={`border rounded-3xl overflow-hidden shadow-xl transition-colors ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className={`p-5 sm:p-6 border-b flex items-center justify-between ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div>
            <h3 className={`text-base font-extrabold font-serif ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Approved College Emails Whitelist
            </h3>
            <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Only these approved email IDs are allowed to register and log in to protected features.
            </p>
          </div>
        </div>

        {/* Mobile View Cards */}
        <div className={`block sm:hidden divide-y ${darkMode ? 'divide-slate-800' : 'divide-slate-200'}`}>
          {whitelist.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              No approved emails found in whitelist.
            </div>
          ) : (
            whitelist.map((item) => {
              const isRegistered = students.some(
                (s) => s.email.toLowerCase().trim() === item.email.toLowerCase().trim()
              );

              return (
                <div key={item._id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className={`font-bold text-xs break-all ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.email}</div>
                      <div className="mt-1">
                        {isRegistered ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 inline-flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-emerald-500" />
                            <span>Registered Account</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-500 border border-amber-500/20 inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-500 animate-pulse" />
                            <span>Pending Registration</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isRegistered && (
                        <button
                          onClick={() => handleDeleteUser(item.email)}
                          disabled={actionLoading}
                          className="text-red-500 hover:text-white hover:bg-red-600 p-2 rounded-xl border border-red-500/30 transition-all cursor-pointer disabled:opacity-50"
                          title="Delete User Account"
                        >
                          <UserX className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveWhitelist(item._id, item.email)}
                        disabled={actionLoading}
                        className="text-slate-500 hover:text-red-600 p-2 rounded-xl border border-slate-200 dark:border-slate-800 transition-all cursor-pointer disabled:opacity-50"
                        title="Remove from Whitelist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop View Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className={`uppercase text-[10px] font-bold tracking-wider border-b ${
              darkMode
                ? 'bg-slate-950/80 text-slate-400 border-slate-800'
                : 'bg-slate-100/80 text-slate-600 border-slate-200'
            }`}>
              <tr>
                <th className="px-6 py-4">Approved Student Email</th>
                <th className="px-6 py-4">Registration Status</th>
                <th className="px-6 py-4">Whitelisted Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-slate-800/60 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
              {whitelist.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-slate-500">
                    No approved emails found in whitelist.
                  </td>
                </tr>
              ) : (
                whitelist.map((item) => {
                  const isRegistered = students.some(
                    (s) => s.email.toLowerCase().trim() === item.email.toLowerCase().trim()
                  );

                  return (
                    <tr key={item._id} className={`transition-all ${darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}`}>
                      <td className={`px-6 py-4 font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.email}</td>
                      <td className="px-6 py-4">
                        {isRegistered ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 inline-flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-emerald-500" />
                            <span>Registered Account</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-500 border border-amber-500/20 inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-500 animate-pulse" />
                            <span>Pending Registration</span>
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Active'}</td>
                      <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                        {isRegistered && (
                          <button
                            onClick={() => handleDeleteUser(item.email)}
                            disabled={actionLoading}
                            className="text-red-500 hover:text-white hover:bg-red-600 px-3 py-1.5 rounded-xl border border-red-500/30 transition-all cursor-pointer text-xs font-bold flex items-center gap-1 disabled:opacity-50"
                            title="Delete User Account permanently from MongoDB"
                          >
                            <UserX className="w-3.5 h-3.5" />
                            <span>Delete Account</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveWhitelist(item._id, item.email)}
                          disabled={actionLoading}
                          className="text-slate-500 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-800 transition-all cursor-pointer disabled:opacity-50"
                          title="Remove from Whitelist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WhitelistManagement;
