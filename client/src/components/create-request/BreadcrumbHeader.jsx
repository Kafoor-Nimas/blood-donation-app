import { useApp } from "../../context/AppContext";

export default function BreadcrumbHeader() {
  const { isDarkMode } = useApp();

  return (
    <div className="mb-8">
      {/* Breadcrumb Links */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-slate-500 mb-4"
      >
        <a
          href="/"
          className="hover:text-[#b70011] transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined !text-[16px]">home</span>
          Home
        </a>
        <span className="material-symbols-outlined !text-[14px]">
          chevron_right
        </span>
        <a
          href="/blood-requests"
          className="hover:text-[#b70011] transition-colors"
        >
          Blood Requests
        </a>
        <span className="material-symbols-outlined !text-[14px]">
          chevron_right
        </span>
        <span className="font-semibold text-[#b70011]">Create Request</span>
      </nav>

      {/* Main Page Title Box */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl shadow-sm border ${
          isDarkMode
            ? "bg-[#1E293B] border-[#334155]"
            : "bg-white border-slate-100"
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ffdad6] flex items-center justify-center shrink-0 text-[#b70011]">
            <span
              className="material-symbols-outlined !text-[28px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              vital_signs
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold tracking-tight">
                Create a Blood Request
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#b70011] text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b70011] animate-pulse" />
                Emergency Dispatch Ready
              </span>
            </div>
            <p
              className={`text-xs max-w-2xl ${
                isDarkMode ? "text-[#94A3B8]" : "text-slate-600"
              }`}
            >
              Provide the required clinical information to broadcast an urgent
              or scheduled blood donation need across verified regional donors
              and hospital blood banks.
            </p>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-end shrink-0 pl-4 border-l border-slate-200 dark:border-[#334155]">
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Protocol Form ID
          </span>
          <span className="font-bold text-sm">LL-DISPATCH-2024</span>
        </div>
      </div>
    </div>
  );
}