import { useApp } from "../context/AppContext";

export default function WhyLifeLink() {
  const { isDarkMode } = useApp();

  const pillars = [
    {
      title: "Trusted Platform",
      desc: "Every request is corroborated through hospital contact tracing and Medical Record Numbers.",
      icon: "shield",
    },
    {
      title: "Location Search",
      desc: "Targeted geospatial filtering connects patients with compatible donors within their immediate city.",
      icon: "near_me",
    },
    {
      title: "Community Spirit",
      desc: "Engaging donor recognition and transparent fulfillment loops that celebrate regular donors.",
      icon: "groups",
    },
    {
      title: "Easy Management",
      desc: "Clean requisition dashboards enable hospital staff to track pledge arrivals with minimal friction.",
      icon: "bolt",
    },
  ];

  return (
    <section
      className={`w-full py-20 px-6 lg:px-12 transition-colors ${
        isDarkMode ? "bg-[#111827]" : "bg-[#eff4ff]/40"
      }`}
    >
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div
            className={`relative rounded-2xl overflow-hidden shadow-xl border ${
              isDarkMode
                ? "bg-[#1E293B] border-[#334155]"
                : "bg-white border-slate-100"
            }`}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwz2kTBYdC2gwzA-POt_-CSeuBIjz1IRRAjiGb4DQ2gkUCm1MmEHmZDfe43TlS9VjGw_r5_1rQWQ4p4TdItO6zGBDDM3hAUfTtpiEY3TqO2rRfuXnPYZicyAnDD3gyUWCjeOYtnmFCvcg5BU4chBR07yu1oMuZrWDpPHqoze5auOsFY3UdwoqqYJWFmIx2j5Q1QXEDVEB_z0EzOz25x93J4fN-sP7nY7Y2gtVTKOAN"
              alt="Healthcare workers and donors"
              className="w-full h-[400px] lg:h-[460px] object-cover object-center"
            />
            <div
              className={`absolute bottom-4 left-4 right-4 backdrop-blur-md p-4 rounded-xl shadow-md border ${
                isDarkMode
                  ? "bg-[#1E293B]/90 border-[#334155] text-white"
                  : "bg-white/90 border-slate-100 text-[#0b1c30]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#008438] text-white flex items-center justify-center">
                  <span
                    className="material-symbols-outlined !text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </span>
                <div>
                  <p className="font-semibold text-sm">
                    National Blood Transfusion Service Certified
                  </p>
                  <p className="text-xs text-slate-400">
                    Direct integration with major tertiary medical institutions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#b70011] font-bold">
              Why LifeLink
            </span>
            <h2
              className={`text-3xl font-bold tracking-tight mt-1 ${
                isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
              }`}
            >
              More Than a Platform. A Community That Cares.
            </h2>
            <p
              className={`text-sm mt-3 ${
                isDarkMode ? "text-[#CBD5E1]" : "text-[#5c403c]"
              }`}
            >
              Built in direct collaboration with clinical hematologists,
              volunteer blood banks, and donors who understand that every second
              lost puts a life in peril.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl shadow-sm flex flex-col gap-2 border ${
                  isDarkMode
                    ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
                    : "bg-white border-slate-100 text-[#0b1c30]"
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-[#ffdad6] text-[#b70011] flex items-center justify-center">
                  <span className="material-symbols-outlined !text-[18px]">
                    {p.icon}
                  </span>
                </div>
                <h3
                  className={`font-semibold text-sm ${
                    isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                  }`}
                >
                  {p.title}
                </h3>
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-[#94A3B8]" : "text-[#5c403c]"
                  }`}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}