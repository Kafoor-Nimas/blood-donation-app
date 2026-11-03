import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function AdminOverviewHeader() {
  const { isDarkMode } = useApp();
  const [activeRange, setActiveRange] = useState("Realtime");

  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-xl shadow-sm border transition-colors ${
        isDarkMode
          ? "bg-[#1E293B] border-[#334155]"
          : "bg-white border-slate-100"
      }`}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#dc2626] animate-pulse" />
          <span className="text-xs uppercase tracking-wider text-[#b70011] font-semibold">
            Live Operational Command
          </span>
        </div>
        <h1
          className={`text-3xl font-bold tracking-tight ${
            isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
          }`}
        >
          System Administrator Overview
        </h1>
        <p
          className={`text-sm ${
            isDarkMode ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Monitoring cross-district logistics, blood bank inventories, and
          critical transfusion requests.
        </p>
      </div>

      <div className="flex items-center gap-3 self-start md:self-center">
        {/* Live System Range Switcher */}
        <div
          className={`inline-flex p-1 rounded-lg border ${
            isDarkMode
              ? "bg-[#0F172A] border-[#334155]"
              : "bg-slate-100 border-slate-200"
          }`}
        >
          {["Realtime", "Last 30 Days", "Q2 Audit"].map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeRange === range
                  ? isDarkMode
                    ? "bg-[#1E293B] text-white shadow-sm"
                    : "bg-white text-[#0b1c30] shadow-sm"
                  : isDarkMode
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 hover:text-[#0b1c30]"
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        <button
          onClick={() => alert("Generating SLA Compliance Audit PDF...")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#dc2626] hover:bg-[#b70011] text-white rounded-lg text-sm font-semibold transition-colors shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">
            download
          </span>
          <span>Export SLA Report</span>
        </button>
      </div>
    </div>
  );
}
