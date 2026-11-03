import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import img from "../../assets/aboutHero2.jfif";

export default function AboutHero() {
  const { isDarkMode } = useApp();

  return (
    <section className="relative px-4 sm:px-6 lg:px-12 pt-4 pb-12 lg:pb-16">
      <div className="max-w-[1360px] mx-auto relative rounded-3xl overflow-hidden border border-[#e6d1d1]/40 shadow-2xl min-h-[620px] lg:min-h-[700px] flex items-center">
        {/* Full panoramic photography backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src={img}
            alt="Blood donation coordination at LifeLink"
            className="w-full h-full object-cover object-center filter saturate-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0e0e]/90 via-[#1a0e0e]/65 to-black/30 lg:via-[#1a0e0e]/50" />
          <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay" />
        </div>

        {/* Floating Telemetry Chips & Top Badges */}
        <div className="absolute top-6 right-6 z-20 hidden md:flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold shadow-lg">
            <span
              className="material-symbols-outlined text-sm text-red-300"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
            <span>Grassroots Community Initiative</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Bridging emergency requests and willing local donors.</span>
          </div>
        </div>

        {/* Left Floating Command Card */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-14 w-full lg:max-w-2xl">
          <div
            className={`backdrop-blur-xl border rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl relative transition-colors ${
              isDarkMode
                ? "bg-[#1E293B]/90 border-[#334155] text-white"
                : "bg-white/95 border-white/80 text-[#1a0e0e]"
            }`}
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col gap-6 relative z-10 text-left">
              <div
                className={`inline-flex items-center gap-2 self-start rounded-full px-3.5 py-1 border text-xs font-bold tracking-wider uppercase ${
                  isDarkMode
                    ? "bg-red-950/60 border-red-900/60 text-red-200"
                    : "bg-red-100 border-red-200 text-[#b70011]"
                }`}
              >
                <span className="inline-block w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
                <span>About LifeLink</span>
              </div>

              <h1
                className={`text-3xl sm:text-5xl lg:text-5xl font-black leading-tight tracking-[-0.033em] ${
                  isDarkMode ? "text-white" : "text-[#1a0e0e]"
                }`}
              >
                Connecting Hearts. <br />
                <span className="text-[#dc2626] underline decoration-[#dc2626]/20 decoration-wavy decoration-2">
                  Saving Lives.
                </span>
              </h1>

              <p
                className={`text-base lg:text-lg leading-relaxed font-normal ${
                  isDarkMode ? "text-slate-300" : "text-[#5c403c]"
                }`}
              >
                LifeLink is a blood donation management platform designed to
                connect people who need blood with generous donors willing to
                make a difference. We believe that technology and compassion
                together can help build a stronger blood donation community.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/register"
                  className="flex min-w-[150px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-[#dc2626] hover:bg-[#b70011] text-white text-base font-bold tracking-[0.015em] transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  <span className="truncate">Become a Donor</span>
                </Link>
                <Link
                  to="/blood-requests"
                  className={`flex min-w-[170px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 border-2 text-base font-bold tracking-[0.015em] transition-all active:scale-95 ${
                    isDarkMode
                      ? "border-[#334155] bg-[#0F172A] text-white hover:bg-slate-800"
                      : "border-[#e6d1d1] bg-[#fbf8f8] text-[#1a0e0e] hover:bg-[#f2e8e8]"
                  }`}
                >
                  <span className="truncate">Explore Blood Requests</span>
                </Link>
              </div>

              <div
                className={`flex flex-wrap items-center gap-6 pt-4 border-t ${
                  isDarkMode ? "border-[#334155]" : "border-[#f2e8e8]"
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-xs font-semibold ${
                    isDarkMode ? "text-slate-300" : "text-[#5c403c]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[#dc2626] text-base">
                    verified_user
                  </span>
                  <span>Verified Volunteer Coordination</span>
                </div>
                <div
                  className={`flex items-center gap-2 text-xs font-semibold ${
                    isDarkMode ? "text-slate-300" : "text-[#5c403c]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[#dc2626] text-base">
                    lock
                  </span>
                  <span>Encrypted Contact Safeguards</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Micro-Badge */}
        <div
          className={`absolute bottom-6 right-6 z-20 hidden lg:flex backdrop-blur-md border rounded-2xl p-4 shadow-xl items-center gap-3 max-w-[280px] transition-colors ${
            isDarkMode
              ? "bg-[#1E293B]/95 border-[#334155] text-white"
              : "bg-white/95 border-white/80 text-[#1a0e0e]"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-[#dc2626] shrink-0 ${
              isDarkMode ? "bg-red-950/60" : "bg-red-100"
            }`}
          >
            <span className="material-symbols-outlined text-2xl">
              diversity_1
            </span>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider">
              Community-Driven
            </h4>
            <p
              className={`text-[11px] leading-tight ${
                isDarkMode ? "text-slate-400" : "text-[#945151]"
              }`}
            >
              Connecting people locally for urgent mutual aid.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
