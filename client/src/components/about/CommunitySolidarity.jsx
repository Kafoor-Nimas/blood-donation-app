import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function CommunitySolidarity() {
  const { isDarkMode } = useApp();

  return (
    <section
      className={`py-16 lg:py-24 border-t transition-colors ${
        isDarkMode
          ? "bg-[#0F172A] border-[#334155]"
          : "bg-[#fbf8f8] border-[#f2e8e8]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Container */}
          <div className="lg:col-span-6 relative">
            <div
              className={`overflow-hidden rounded-3xl border-4 shadow-2xl aspect-[16/11] relative ${
                isDarkMode ? "border-[#334155]" : "border-white"
              }`}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS1tT-x4pBVNKW2yjRfzmOiRE9tCRUO35fo_OR2BruZ34SnOfAKWu7ymDI9rIZ-OWiM5mLxMndztnPxC3ROwXrGb63EjptR8yJ1VCVYMX-R-BVAXTcyAEcz9pulImCN1bsuaqtq6wm8_8_kVWJjloigtottIr8e8392TmsfZaJGAzCE292uaHVyid8b2S_YATs3WpBOkTnmV7iaG9Eikm8X5p8oMyAgdeUWppZYcDM"
                alt="LifeLink Community Volunteers and Donors"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating Pill 1: Voluntary Guarantee */}
            <div
              className={`absolute -bottom-6 left-6 backdrop-blur-md border rounded-2xl p-4 shadow-xl flex items-center gap-3 transition-colors ${
                isDarkMode
                  ? "bg-[#1E293B]/95 border-[#334155] text-white"
                  : "bg-white/95 border-[#e6d1d1] text-[#1a0e0e]"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  isDarkMode
                    ? "bg-emerald-950/60 text-emerald-300"
                    : "bg-emerald-100 text-emerald-600"
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  handshake
                </span>
              </div>
              <div>
                <p className="text-xs font-bold">100% Voluntary Community</p>
                <p
                  className={`text-[11px] ${
                    isDarkMode ? "text-slate-400" : "text-[#945151]"
                  }`}
                >
                  Non-commercial altruistic network
                </p>
              </div>
            </div>

            {/* Floating Pill 2: Trust Shield */}
            <div
              className={`absolute top-6 left-6 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border text-xs font-bold shadow-md transition-colors ${
                isDarkMode
                  ? "bg-[#1E293B]/90 border-[#334155] text-white"
                  : "bg-white/90 border-white text-[#1a0e0e]"
              }`}
            >
              <span className="material-symbols-outlined text-[#dc2626] text-base">
                verified
              </span>
              <span>LifeLink Community Verified</span>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6 flex flex-col gap-6 pt-4 lg:pt-0">
            <div
              className={`inline-flex items-center gap-2 self-start rounded-full px-3 py-1 border ${
                isDarkMode
                  ? "bg-red-950/60 border-red-900/60"
                  : "bg-red-100 border-red-200"
              }`}
            >
              <span className="text-xs font-bold tracking-wider uppercase text-[#dc2626]">
                The Power of Solidarity
              </span>
            </div>

            <h2
              className={`text-3xl lg:text-4xl font-black tracking-tight ${
                isDarkMode ? "text-white" : "text-[#1a0e0e]"
              }`}
            >
              Every Donor Can Make a Difference.
            </h2>

            <p
              className={`text-base leading-relaxed ${
                isDarkMode ? "text-slate-300" : "text-[#5c403c]"
              }`}
            >
              Behind every blood donation is an opportunity to support someone in need. LifeLink aims to bring donors and requesters closer together by making the connection process easier, safer, and completely accessible.
            </p>

            <div className="space-y-4 pt-2">
              {[
                {
                  title: "Empowering Local Volunteers",
                  text: "Neighborhood coordinators help verify availability and answer family queries quickly.",
                },
                {
                  title: "Mutual Aid & Respect",
                  text: "Donations are purely voluntary. We nurture kindness and mutual aid without transactional friction.",
                },
                {
                  title: "Continuous Awareness Campaigns",
                  text: "Educating first-time donors on eligibility guidelines, hydration, and recovery steps.",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-3.5 rounded-2xl border shadow-sm transition-colors ${
                    isDarkMode
                      ? "bg-[#1E293B] border-[#334155]"
                      : "bg-white border-[#f2e8e8]"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl text-[#dc2626] flex items-center justify-center shrink-0 mt-0.5 ${
                      isDarkMode ? "bg-red-950/60" : "bg-red-100"
                    }`}
                  >
                    <span className="material-symbols-outlined text-base font-bold">
                      check
                    </span>
                  </div>
                  <div>
                    <h4
                      className={`text-sm font-bold ${
                        isDarkMode ? "text-white" : "text-[#1a0e0e]"
                      }`}
                    >
                      {card.title}
                    </h4>
                    <p
                      className={`text-xs mt-0.5 ${
                        isDarkMode ? "text-slate-400" : "text-[#5c403c]"
                      }`}
                    >
                      {card.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/find-donors"
                className="inline-flex items-center gap-2 text-[#dc2626] font-bold text-sm hover:underline"
              >
                <span>View real-time donor board</span>
                <span className="material-symbols-outlined text-base">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}