import { useApp } from "../context/AppContext";
import img from "../assets/hero1.jfif";

export default function Hero() {
  const { isDarkMode } = useApp();

  return (
    <section
      className={`relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 px-6 lg:px-12 transition-colors ${
        isDarkMode
          ? "bg-gradient-to-b from-[#0F172A] via-[#111827] to-[#0F172A]"
          : "bg-gradient-to-b from-[#f8f9ff] via-[#eff4ff]/40 to-[#f8f9ff]"
      }`}
    >
      {/* Ambient Red Aura */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#b70011]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[#b70011]/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wide font-bold ${
              isDarkMode
                ? "bg-[#1E293B] text-[#38BDF8] border border-[#334155]"
                : "bg-[#ffdad6] text-[#b70011]"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b70011] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b70011]" />
            </span>
            Be A Hero. Save Lives.
          </div>

          <h1
            className={`text-4xl lg:text-5xl font-bold tracking-tight leading-tight ${
              isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
            }`}
          >
            A Single Drop Can Make a{" "}
            <span className="text-[#b70011]">World of Difference</span>.
          </h1>

          <p
            className={`text-base lg:text-lg max-w-xl ${
              isDarkMode ? "text-[#CBD5E1]" : "text-[#5c403c]"
            }`}
          >
            Connect with verified blood donors, respond to urgent clinical
            needs, and become part of a nationwide healthcare logistics
            community where every second and every unit counts.
          </p>

          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto pt-2">
            <a
              href="/create-request"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#dc2626] text-white font-semibold text-sm hover:brightness-110 transition-all shadow-md hover:shadow-lg"
            >
              <span className="material-symbols-outlined !text-[20px]">
                favorite
              </span>
              <span>Become a Donor</span>
            </a>
            <a
              href="/find-donors"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm border ${
                isDarkMode
                  ? "bg-[#1E293B] border-[#334155] text-[#F8FAFC] hover:bg-[#334155]"
                  : "bg-white border-slate-200 text-[#0b1c30] hover:bg-slate-100"
              }`}
            >
              <span className="material-symbols-outlined !text-[20px] text-[#b70011]">
                search
              </span>
              <span>Find Blood Donors</span>
            </a>
          </div>

          {/* Social Proof */}
          <div className="pt-4 flex flex-wrap items-center gap-5 w-full">
            <div className="flex -space-x-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB96cY-YYv1QO6idTJrx-APT_X7tsjYl8FqmwQDAiHJQAnlzXuINaFNCAjw7S4jPAe15Komj1GKtqodDQnrI7MSLEyeeJe0m66vvjTtnJOEubRPsHoAyx0u6UJFpyqy0cMe4yu5T59RMDqofBoJr6nI2k-NQ4lmGLyiVLudH3bGsf0iBBDRNaA2FnDH0e5lcSx25u2vezDbt3S7e_uejeRsUUtygocv_T0ZHnw_VtGd"
                alt="Donor 1"
                className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-[#0F172A] object-cover"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaonYCugfFOVAp1fVWsWg52zrXpmaasdXOTyBmZi9OzsAhYDwDncCatH9GhNkHK5ybtU-7CxNdf69NynvE09tNn9hclvu8L6nqkgT_vHtmj8T7-d1fOxZsZBcyksSfI8G9I-VKzNcSCkt_5NDQZowl3cGaPEPkxJdOYNsZGgsfXQLNqldeXozLGEIqgOqQCiTgGOBXA_5xQMT8Vu7VfYenoWLT6QlYVt4D-zRDaLbA"
                alt="Donor 2"
                className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-[#0F172A] object-cover"
              />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0E4w1_EKhM5yy39HRGdRh6nu_zyQMkPq6Q8r4jWItLhZsi-QrQbrrgx5cKEEQH5OPFVF0SV7BrCLLAmE_z3_u_LyuBpPgFOltrI9mUZwp7wR_tt9xeY8TqOV6u5cP-YKdDczN7JMX-S92zuvArjMUXZV7HyqhQHVP7vzGnIdqCzBMWprogW_fTvqJ8S8PXonEI5nUkZ88DGNa22U8-hEHhxppcIOyvprQFpPa8Qwj"
                alt="Doctor"
                className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-[#0F172A] object-cover"
              />
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ffdad6] text-[#410002] font-semibold text-xs ring-2 ring-white dark:ring-[#0F172A]">
                +1.2k
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[#00682b]">
                <span
                  className="material-symbols-outlined !text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                  }`}
                >
                  100% SLMC &amp; NBTS Aligned
                </span>
              </div>
              <span
                className={`text-xs ${
                  isDarkMode ? "text-[#94A3B8]" : "text-[#5c403c]"
                }`}
              >
                Over 800+ life-saving transfusions coordinated
              </span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-6 relative">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#b70011]/10 via-[#d5e0f8]/30 to-transparent rounded-2xl blur-lg" />
            <div
              className={`relative rounded-2xl overflow-hidden shadow-xl border ${
                isDarkMode
                  ? "bg-[#111827] border-[#334155]"
                  : "bg-white border-slate-100"
              }`}
            >
              <img
                src={img}
                alt="Donation in progress"
                className="w-full h-[420px] lg:h-[480px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div
                className={`absolute top-5 left-5 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-md flex items-center gap-3 border ${
                  isDarkMode
                    ? "bg-[#1E293B]/90 border-[#334155] text-white"
                    : "bg-white/95 border-slate-100 text-[#0b1c30]"
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-[#ffdad6] text-[#b70011] flex items-center justify-center">
                  <span
                    className="material-symbols-outlined !text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    bloodtype
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-semibold text-[#b70011]">
                    Emergency Readiness
                  </span>
                  <span className="text-xs font-semibold">
                    Real-Time Dispatching
                  </span>
                </div>
              </div>

              <div
                className={`absolute bottom-6 left-6 right-6 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center justify-between gap-3 border ${
                  isDarkMode
                    ? "bg-[#1E293B]/90 border-[#334155] text-white"
                    : "bg-white/95 border-slate-100 text-[#0b1c30]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#b70011] flex items-center justify-center text-white">
                      <span
                        className="material-symbols-outlined !text-[20px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        favorite
                      </span>
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#008438] opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#008438]" />
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-snug">
                      Every Donation Matters
                    </span>
                    <span className="text-xs text-slate-400">
                      Your generosity helps save lives in real time
                    </span>
                  </div>
                </div>
                <span
                  className={`hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    isDarkMode
                      ? "bg-[#334155] text-[#38BDF8]"
                      : "bg-slate-100 text-[#b70011]"
                  }`}
                >
                  Active 24/7
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
