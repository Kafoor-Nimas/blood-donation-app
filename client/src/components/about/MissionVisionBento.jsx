import { useApp } from "../../context/AppContext";

export default function MissionVisionBento() {
  const { isDarkMode } = useApp();

  const cardBg = isDarkMode
    ? "bg-[#1E293B] border-[#334155]"
    : "bg-[#fbf8f8] border-[#e6d1d1]";

  const subText = isDarkMode ? "text-slate-400" : "text-[#5c403c]";
  const headingText = isDarkMode ? "text-white" : "text-[#1a0e0e]";

  return (
    <section
      className={`py-16 lg:py-24 border-y transition-colors ${
        isDarkMode
          ? "bg-[#0F172A] border-[#334155]"
          : "bg-white border-[#f2e8e8]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold tracking-widest uppercase text-[#dc2626]">
                Core Purpose
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-xs font-bold tracking-widest uppercase text-[#b70011]">
                Real Results
              </span>
            </div>
            <h2
              className={`text-3xl lg:text-4xl font-black tracking-tight ${headingText}`}
            >
              Our Mission &amp; Vision
            </h2>
            <p className={`text-sm lg:text-base mt-2 max-w-xl ${subText}`}>
              Empowering every citizen with an easy, compassionate avenue to
              donate or receive life-saving blood when time is critical.
            </p>
          </div>

          <div
            className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full border shadow-sm self-start md:self-auto ${
              isDarkMode
                ? "bg-[#1E293B] border-[#334155] text-slate-300"
                : "bg-[#fbf8f8] border-[#f2e8e8] text-[#945151]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Community platform metrics updated dynamically</span>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Bento 1: Mission */}
          <div
            className={`lg:col-span-7 rounded-3xl p-8 lg:p-10 border shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden group ${cardBg}`}
          >
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-red-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border ${
                    isDarkMode
                      ? "bg-[#0F172A] border-[#334155] text-white"
                      : "bg-white border-[#e6bdb8]/50 text-[#dc2626]"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    volunteer_activism
                  </span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#dc2626] bg-red-100 dark:bg-red-950/60 px-3 py-1 rounded-full border border-red-200 dark:border-red-900/60">
                  Core Pillar
                </span>
              </div>
              <h3
                className={`text-2xl lg:text-3xl font-bold mb-4 ${headingText}`}
              >
                Our Mission
              </h3>
              <p
                className={`text-base lg:text-lg leading-relaxed max-w-xl ${subText}`}
              >
                To make blood donation more accessible by connecting donors and
                people in need through a simple, reliable and user-friendly
                digital platform.
              </p>
            </div>
            <div
              className={`mt-8 pt-5 border-t flex items-center gap-2 text-xs font-semibold relative z-10 ${
                isDarkMode
                  ? "border-[#334155] text-slate-400"
                  : "border-[#e6bdb8]/60 text-[#945151]"
              }`}
            >
              <span className="material-symbols-outlined text-base">
                check_circle
              </span>
              <span>Accessibility • Transparency • Speed</span>
            </div>
          </div>

          {/* Bento 2: Metric 1 */}
          <div
            className={`lg:col-span-5 border rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between ${cardBg}`}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-[#dc2626]">
                  <span className="material-symbols-outlined text-2xl">
                    group
                  </span>
                </div>
                <span
                  className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    isDarkMode
                      ? "bg-[#0F172A] text-slate-400"
                      : "bg-[#f2e8e8] text-[#945151]"
                  }`}
                >
                  Community Size
                </span>
              </div>
              <span className="text-4xl lg:text-5xl font-black text-[#dc2626] tracking-tight block">
                12,450+
              </span>
              <h4 className={`text-lg font-bold mt-2 ${headingText}`}>
                Registered Donors
              </h4>
            </div>
            <p
              className={`text-xs mt-4 pt-4 border-t ${
                isDarkMode
                  ? "border-[#334155] text-slate-400"
                  : "border-[#f2e8e8] text-[#945151]"
              }`}
            >
              Active roster of voluntary community members across districts.
            </p>
          </div>

          {/* Bento 3: Metric 2 */}
          <div
            className={`lg:col-span-4 border rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between ${cardBg}`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-[#dc2626] mb-5">
                <span className="material-symbols-outlined text-2xl">
                  bloodtype
                </span>
              </div>
              <span className="text-4xl font-black text-[#dc2626] tracking-tight block">
                350+
              </span>
              <h4 className={`text-lg font-bold mt-2 ${headingText}`}>
                Blood Requests
              </h4>
            </div>
            <p
              className={`text-xs mt-4 pt-4 border-t ${
                isDarkMode
                  ? "border-[#334155] text-slate-400"
                  : "border-[#f2e8e8] text-[#945151]"
              }`}
            >
              Critical requests coordinated through the platform network.
            </p>
          </div>

          {/* Bento 4: Vision */}
          <div
            className={`lg:col-span-8 rounded-3xl p-8 lg:p-10 border-2 shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden group ${
              isDarkMode
                ? "bg-[#1E293B] border-red-900/40"
                : "bg-white border-[#dc2626]/20"
            }`}
          >
            <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-red-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-950/60 text-[#dc2626] flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-3xl">
                    crisis_alert
                  </span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#dc2626] bg-red-100 dark:bg-red-950/60 px-3 py-1 rounded-full border border-red-200 dark:border-red-900/60">
                  Long-term Vision
                </span>
              </div>
              <h3
                className={`text-2xl lg:text-3xl font-bold mb-4 ${headingText}`}
              >
                Our Vision
              </h3>
              <p className={`text-base lg:text-lg leading-relaxed ${subText}`}>
                To contribute to a connected and compassionate community where
                finding blood donors becomes easier and every opportunity to
                help save a life matters.
              </p>
            </div>
            <div
              className={`mt-8 pt-5 border-t flex items-center gap-2 text-xs font-semibold relative z-10 ${
                isDarkMode
                  ? "border-[#334155] text-slate-400"
                  : "border-[#f2e8e8] text-[#945151]"
              }`}
            >
              <span className="material-symbols-outlined text-base text-[#dc2626]">
                explore
              </span>
              <span>Nationwide Solidarity • Community Resilience</span>
            </div>
          </div>

          {/* Bento 5: Metric 3 */}
          <div
            className={`lg:col-span-6 border rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between ${cardBg}`}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-[#dc2626]">
                  <span className="material-symbols-outlined text-2xl">
                    ecg_heart
                  </span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Ready Now
                </span>
              </div>
              <span className="text-4xl font-black text-[#dc2626] tracking-tight block">
                8,920+
              </span>
              <h4 className={`text-lg font-bold mt-2 ${headingText}`}>
                Active Donors
              </h4>
            </div>
            <p
              className={`text-xs mt-4 pt-4 border-t ${
                isDarkMode
                  ? "border-[#334155] text-slate-400"
                  : "border-[#f2e8e8] text-[#945151]"
              }`}
            >
              Available and ready for outreach when emergencies strike.
            </p>
          </div>

          {/* Bento 6: Metric 4 */}
          <div
            className={`lg:col-span-6 border rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col justify-between ${cardBg}`}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-[#dc2626]">
                  <span className="material-symbols-outlined text-2xl">
                    cardiology
                  </span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#dc2626] bg-red-100 dark:bg-red-950/60 px-2.5 py-1 rounded-full">
                  Lives Saved
                </span>
              </div>
              <span className="text-4xl font-black text-[#dc2626] tracking-tight block">
                4,120+
              </span>
              <h4 className={`text-lg font-bold mt-2 ${headingText}`}>
                Successful Donations
              </h4>
            </div>
            <p
              className={`text-xs mt-4 pt-4 border-t ${
                isDarkMode
                  ? "border-[#334155] text-slate-400"
                  : "border-[#f2e8e8] text-[#945151]"
              }`}
            >
              Lives touched and supported through connected donors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
