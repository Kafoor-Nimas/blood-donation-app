import React, { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function DonorHeader() {
  const { isDarkMode } = useApp();
  const [showToast, setShowToast] = useState(true);

  return (
    <div className="w-full space-y-4">
      {/* Live Operational Command Ticker */}
      <div
        className={`w-full px-6 lg:px-12 py-2 flex items-center justify-between shadow-sm transition-colors ${
          isDarkMode ? "bg-[#1E293B] text-white" : "bg-slate-100 text-[#0b1c30]"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#dc2626] animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#dc2626]">
              Live Operational Command
            </span>
            <span
              className={isDarkMode ? "text-slate-600" : "text-slate-300"}
            >
              |
            </span>
            <p
              className={`text-xs truncate ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Monitoring cross-district donor roster, verification statuses, and
              regional blood bank availability across all 9 provinces.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded ${
                isDarkMode
                  ? "bg-[#0F172A] text-emerald-400"
                  : "bg-white text-[#008438]"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                sync
              </span>
              Sync: Realtime (NBTS Colombo)
            </span>
          </div>
        </div>
      </div>

      {/* Main Container Padding */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-2 space-y-6">
        {/* Toast Notification Banner */}
        {showToast && (
          <div
            className={`flex items-center justify-between p-3 px-4 rounded-xl shadow-sm transition-all duration-300 ${
              isDarkMode
                ? "bg-emerald-950/60 border border-emerald-900/60 text-emerald-300"
                : "bg-emerald-50 border border-emerald-100 text-[#008438]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">
                check_circle
              </span>
              <span className="text-xs font-medium">
                Donor #DNR-8092 status updated to Active. Audit log entry
                recorded with timestamp 09:42:15 SLST.
              </span>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="hover:opacity-75 p-1 rounded-lg cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                close
              </span>
            </button>
          </div>
        )}

        {/* Page Title & Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1
                className={`text-2xl lg:text-3xl font-bold tracking-tight ${
                  isDarkMode ? "text-white" : "text-[#0b1c30]"
                }`}
              >
                Donor Management &amp; Registry
              </h1>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                  isDarkMode
                    ? "bg-red-950/80 text-red-300"
                    : "bg-red-50 text-[#b70011]"
                }`}
              >
                SL-NBTS Connected
              </span>
            </div>
            <p
              className={`text-sm ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              View, search, verify and manage registered blood donors across all
              Sri Lankan administrative districts.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg shadow-sm font-semibold text-xs transition-colors cursor-pointer ${
                isDarkMode
                  ? "bg-[#1E293B] border border-[#334155] text-slate-200 hover:bg-[#334155]"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                file_download
              </span>
              <span>Export CSV</span>
            </button>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#dc2626] text-white rounded-lg shadow-sm hover:bg-[#b70011] transition-colors font-semibold text-xs cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">
                person_add
              </span>
              <span>+ Add New Donor</span>
            </button>
          </div>
        </div>

        {/* Administrative Sub-Navigation Tabs */}
        <div
          className={`w-full rounded-xl p-1 shadow-sm overflow-x-auto border transition-colors ${
            isDarkMode
              ? "bg-[#1E293B] border-[#334155]"
              : "bg-slate-100 border-slate-200"
          }`}
        >
          <nav className="flex items-center space-x-1 min-w-max">
            <a
              href="#"
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                isDarkMode
                  ? "text-slate-400 hover:text-white hover:bg-[#0F172A]"
                  : "text-slate-600 hover:text-[#0b1c30] hover:bg-white"
              }`}
            >
              Overview
            </a>
            <a
              href="#"
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                isDarkMode
                  ? "text-slate-400 hover:text-white hover:bg-[#0F172A]"
                  : "text-slate-600 hover:text-[#0b1c30] hover:bg-white"
              }`}
            >
              <span>Manage Blood Requests</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                  isDarkMode
                    ? "bg-[#0F172A] text-slate-300"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                48
              </span>
            </a>
            <a
              href="#"
              className={`px-4 py-2 rounded-lg text-xs font-bold shadow-sm flex items-center gap-2 ${
                isDarkMode
                  ? "bg-[#0F172A] text-red-400"
                  : "bg-white text-[#b70011]"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                how_to_reg
              </span>
              <span>Manage Donors</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#dc2626] text-white">
                12,450+
              </span>
            </a>
            <a
              href="#"
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                isDarkMode
                  ? "text-slate-400 hover:text-white hover:bg-[#0F172A]"
                  : "text-slate-600 hover:text-[#0b1c30] hover:bg-white"
              }`}
            >
              Manage Users
            </a>
            <a
              href="#"
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                isDarkMode
                  ? "text-slate-400 hover:text-white hover:bg-[#0F172A]"
                  : "text-slate-600 hover:text-[#0b1c30] hover:bg-white"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                shield
              </span>
              <span>Audit &amp; Security Logs</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}