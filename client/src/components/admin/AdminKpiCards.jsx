import { useApp } from "../../context/AppContext";

export default function AdminKpiCards() {
  const { isDarkMode } = useApp();

  const cardStyle = `p-6 rounded-xl shadow-sm border flex flex-col justify-between hover:shadow-md transition-all ${
    isDarkMode ? "bg-[#1E293B] border-[#334155]" : "bg-white border-slate-100"
  }`;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Metric 1: Total Registered Users */}
      <div className={cardStyle}>
        <div className="flex items-center justify-between text-slate-400 mb-3">
          <span className="text-xs uppercase tracking-wider font-semibold">
            Total Registered Users
          </span>
          <span className="material-symbols-outlined text-slate-400 text-[22px]">
            badge
          </span>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span
            className={`text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-[#0b1c30]"
            }`}
          >
            18,420
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              isDarkMode
                ? "bg-[#0F172A] text-slate-300"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            +6.4% MoM
          </span>
        </div>
        <div className="space-y-1.5 pt-2">
          <div
            className={`w-full h-2 rounded-full overflow-hidden flex ${
              isDarkMode ? "bg-[#0F172A]" : "bg-slate-100"
            }`}
          >
            <div className="bg-[#dc2626] h-full" style={{ width: "84%" }} />
            <div className="bg-slate-400 h-full" style={{ width: "16%" }} />
          </div>
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
              84% Donors (15,472)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              16% Requesters
            </span>
          </div>
        </div>
      </div>

      {/* Metric 2: Active Blood Requests */}
      <div className={cardStyle}>
        <div className="flex items-center justify-between text-slate-400 mb-3">
          <span className="text-xs uppercase tracking-wider font-semibold">
            Active Blood Requests
          </span>
          <span className="material-symbols-outlined text-[#b70011] text-[22px]">
            emergency_heat
          </span>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold text-[#b70011]">48</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold animate-pulse ${
              isDarkMode
                ? "bg-red-950/80 text-red-200"
                : "bg-red-100 text-[#b70011]"
            }`}
          >
            12 Urgent
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
          <span>
            Pending match: <strong className="text-amber-500">21</strong>
          </span>
          <span>
            Matched &amp; En Route:{" "}
            <strong className="text-[#008438]">15</strong>
          </span>
        </div>
      </div>

      {/* Metric 3: Total Units Donated */}
      <div className={cardStyle}>
        <div className="flex items-center justify-between text-slate-400 mb-3">
          <span className="text-xs uppercase tracking-wider font-semibold">
            Total Units Donated
          </span>
          <span className="material-symbols-outlined text-[#008438] text-[22px]">
            bloodtype
          </span>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span
            className={`text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-[#0b1c30]"
            }`}
          >
            4,120
          </span>
          <span className="text-sm text-slate-400 font-medium">Units</span>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <div
            className={`flex-1 h-2 rounded-full overflow-hidden ${
              isDarkMode ? "bg-[#0F172A]" : "bg-slate-100"
            }`}
          >
            <div className="bg-[#008438] h-full" style={{ width: "78%" }} />
          </div>
          <span className="text-xs text-[#008438] font-semibold">
            92% Target
          </span>
        </div>
      </div>

      {/* Metric 4: Avg. Response Time */}
      <div className={cardStyle}>
        <div className="flex items-center justify-between text-slate-400 mb-3">
          <span className="text-xs uppercase tracking-wider font-semibold">
            Avg. Response Time
          </span>
          <span className="material-symbols-outlined text-slate-400 text-[22px]">
            timer
          </span>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span
            className={`text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-[#0b1c30]"
            }`}
          >
            28
          </span>
          <span className="text-xl text-slate-400 font-normal">Min</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              isDarkMode
                ? "bg-emerald-950/80 text-emerald-200"
                : "bg-emerald-100 text-[#008438]"
            }`}
          >
            -4m SLA
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#008438] font-medium pt-2">
          <span className="material-symbols-outlined text-[16px]">bolt</span>
          <span>Fast Match Algorithm Active</span>
        </div>
      </div>
    </div>
  );
}
