import { useApp } from "../../context/AppContext";

export default function DonorMetrics() {
  const { isDarkMode } = useApp();

  const cardStyle = `rounded-xl p-4 shadow-sm border flex flex-col justify-between transition-colors ${
    isDarkMode
      ? "bg-[#1E293B] border-[#334155]"
      : "bg-white border-slate-100"
  }`;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto px-6 lg:px-12">
      {/* Card 1: Total Donors */}
      <div className={cardStyle}>
        <div className="flex items-center justify-between">
          <span
            className={`text-xs uppercase font-semibold tracking-wider ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Total Donors
          </span>
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-[#dc2626] ${
              isDarkMode ? "bg-red-950/60" : "bg-red-50"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              groups
            </span>
          </div>
        </div>
        <div className="my-3">
          <div
            className={`text-3xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-[#0b1c30]"
            }`}
          >
            12,450
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-1.5 py-0.5 rounded text-[11px] font-semibold flex items-center gap-0.5 ${
              isDarkMode
                ? "bg-emerald-950/60 text-emerald-300"
                : "bg-emerald-50 text-[#008438]"
            }`}
          >
            <span className="material-symbols-outlined text-[12px]">
              trending_up
            </span>
            +8.2% MoM
          </span>
          <span
            className={`text-xs ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Registered statewide
          </span>
        </div>
      </div>

      {/* Card 2: Active Donors */}
      <div className={cardStyle}>
        <div className="flex items-center justify-between">
          <span
            className={`text-xs uppercase font-semibold tracking-wider ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Active &amp; Ready
          </span>
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isDarkMode
                ? "bg-emerald-950/60 text-emerald-300"
                : "bg-emerald-50 text-[#008438]"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              check_circle
            </span>
          </div>
        </div>
        <div className="my-3 flex items-baseline gap-2">
          <div
            className={`text-3xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-[#0b1c30]"
            }`}
          >
            8,920
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`text-xs font-semibold ${
              isDarkMode ? "text-emerald-300" : "text-[#008438]"
            }`}
          >
            71.6%
          </span>
          <span
            className={`text-xs truncate ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Immediate callout ready
          </span>
        </div>
      </div>

      {/* Card 3: Inactive / Standby */}
      <div className={cardStyle}>
        <div className="flex items-center justify-between">
          <span
            className={`text-xs uppercase font-semibold tracking-wider ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Standby / Deferred
          </span>
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isDarkMode
                ? "bg-slate-800 text-slate-300"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              hourglass_top
            </span>
          </div>
        </div>
        <div className="my-3">
          <div
            className={`text-3xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-[#0b1c30]"
            }`}
          >
            3,530
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`text-xs ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Post-donation recovery (90d)
          </span>
        </div>
      </div>

      {/* Card 4: New Registrations */}
      <div className={cardStyle}>
        <div className="flex items-center justify-between">
          <span
            className={`text-xs uppercase font-semibold tracking-wider ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            New Registrations
          </span>
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-[#dc2626] ${
              isDarkMode ? "bg-red-950/60" : "bg-red-50"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              person_add
            </span>
          </div>
        </div>
        <div className="my-3 flex items-baseline gap-2">
          <div
            className={`text-3xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-[#0b1c30]"
            }`}
          >
            148
          </div>
          <span
            className={`text-xs ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            This Week
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[#dc2626] font-semibold text-xs">+18%</span>
          <span
            className={`text-xs truncate ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Surge in Central Province
          </span>
        </div>
      </div>
    </div>
  );
}