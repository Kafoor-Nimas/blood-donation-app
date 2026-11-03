import { useApp } from "../../context/AppContext";

export default function AdminTabs({ activeTab, setActiveTab }) {
  const { isDarkMode } = useApp();

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "requests", label: "Manage Blood Requests", count: 48 },
    { id: "donors", label: "Manage Donors" },
    { id: "users", label: "Manage Users" },
    { id: "audit", label: "Audit & Security Logs", icon: "verified_user" },
  ];

  return (
    <div
      className={`px-4 rounded-xl shadow-sm border transition-colors ${
        isDarkMode
          ? "bg-[#1E293B] border-[#334155]"
          : "bg-white border-slate-100"
      }`}
    >
      <div className="flex items-center gap-2 overflow-x-auto py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                isActive
                  ? "bg-[#ffdad6]/40 dark:bg-red-950/40 text-[#b70011]"
                  : isDarkMode
                    ? "text-slate-400 hover:text-white hover:bg-slate-800"
                    : "text-slate-600 hover:text-[#0b1c30] hover:bg-slate-100"
              }`}
            >
              {tab.icon && (
                <span className="material-symbols-outlined text-[18px]">
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="px-2 py-0.5 rounded-full bg-[#dc2626] text-white text-[11px] font-bold">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
