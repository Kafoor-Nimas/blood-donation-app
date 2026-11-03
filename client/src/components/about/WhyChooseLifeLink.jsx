import { useApp } from "../../context/AppContext";

export default function WhyChooseLifeLink() {
  const { isDarkMode } = useApp();

  const features = [
    {
      title: "Easy Donor Discovery",
      desc: "Search and filter instantly by exact ABO/Rh blood groups, city, and nearest district with live availability flags.",
      icon: "location_searching",
      tag: "Precision Filtering",
    },
    {
      title: "Simple Blood Requests",
      desc: "Submit and manage critical requests effortlessly. Broadcast notifications ensure rapid turnaround during surgical needs.",
      icon: "post_add",
      tag: "Rapid Broadcast",
    },
    {
      title: "Privacy-Focused",
      desc: "We respect donor contact details and protect personal privacy with masked communication options and opt-in directories.",
      icon: "shield_person",
      tag: "Zero Data Misuse",
    },
    {
      title: "Accessible Experience",
      desc: "Fully optimized responsive layout built for low-bandwidth mobile browsing in critical, urgent hospital conditions.",
      icon: "devices",
      tag: "Hospital Bandwidth Tuned",
    },
  ];

  return (
    <section
      className={`py-16 lg:py-24 border-t transition-colors ${
        isDarkMode
          ? "bg-[#0F172A] border-[#334155]"
          : "bg-white border-[#f2e8e8]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#dc2626] mb-2 block">
            Our Pillars
          </span>
          <h2
            className={`text-3xl lg:text-4xl font-black tracking-tight ${
              isDarkMode ? "text-white" : "text-[#1a0e0e]"
            }`}
          >
            More Than a Platform. A Community That Cares.
          </h2>
          <p
            className={`text-sm lg:text-base mt-3 ${
              isDarkMode ? "text-slate-400" : "text-[#5c403c]"
            }`}
          >
            We engineered LifeLink with human empathy, rock-solid stability, and user privacy at its absolute core.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className={`border rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:border-[#dc2626]/40 flex flex-col justify-between group ${
                isDarkMode
                  ? "bg-[#1E293B] border-[#334155]"
                  : "bg-[#fbf8f8] border-[#e6d1d1]"
              }`}
            >
              <div>
                <div
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-[#dc2626] mb-6 shadow-sm group-hover:bg-[#dc2626] group-hover:text-white transition-colors ${
                    isDarkMode
                      ? "bg-[#0F172A] border-[#334155]"
                      : "bg-white border-[#e6d1d1]"
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {item.icon}
                  </span>
                </div>
                <h3
                  className={`text-lg font-bold mb-3 ${
                    isDarkMode ? "text-white" : "text-[#1a0e0e]"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDarkMode ? "text-slate-300" : "text-[#5c403c]"
                  }`}
                >
                  {item.desc}
                </p>
              </div>

              <div
                className={`mt-8 pt-4 border-t flex items-center gap-2 text-xs font-semibold ${
                  isDarkMode
                    ? "border-[#334155] text-slate-400"
                    : "border-[#f2e8e8] text-[#945151]"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
                <span>{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}