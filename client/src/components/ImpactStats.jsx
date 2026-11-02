import { useApp } from "../context/AppContext";

export default function ImpactStats() {
  const { isDarkMode } = useApp();

  const stats = [
    {
      title: "Registered Donors",
      badge: "Active Community",
      stat: "1,200+",
      sub: "+48 registered this week",
      icon: "diversity_1",
      progress: "85%",
    },
    {
      title: "Blood Requests Processed",
      badge: "Hospital Cases",
      stat: "350+",
      sub: "Average response time: 24 min",
      icon: "medical_services",
      progress: "72%",
    },
    {
      title: "Successful Connections",
      badge: "Transfusions",
      stat: "800+",
      sub: "99.2% donor fulfillment rate",
      icon: "handshake",
      progress: "94%",
    },
    {
      title: "Blood Groups Covered",
      badge: "Antigen Coverage",
      stat: "8/8",
      sub: "Comprehensive cross-match ready",
      icon: "check_circle",
      progress: "100%",
    },
  ];

  return (
    <section
      className={`w-full py-16 px-6 lg:px-12 transition-colors ${
        isDarkMode ? "bg-[#111827]" : "bg-[#ffdad6]/30"
      }`}
    >
      <div className="max-w-[1600px] mx-auto flex flex-col items-center text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-[#b70011] font-bold mb-2">
          Our Community Impact
        </span>
        <h2
          className={`text-3xl font-bold tracking-tight mb-3 ${
            isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
          }`}
        >
          Together, We Make an Impact
        </h2>
        <p
          className={`text-sm max-w-2xl ${
            isDarkMode ? "text-[#CBD5E1]" : "text-[#5c403c]"
          }`}
        >
          Every registered donor and every instantaneous connection contributes
          to building an unshakeable safety net for critical clinical care.
        </p>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`rounded-2xl p-6 shadow-sm flex flex-col items-start justify-between border ${
              isDarkMode
                ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
                : "bg-white border-slate-100 text-[#0b1c30]"
            }`}
          >
            <div className="flex items-center justify-between w-full mb-4">
              <span
                className={`text-xs uppercase tracking-wider ${
                  isDarkMode ? "text-[#94A3B8]" : "text-[#5c403c]"
                }`}
              >
                {s.badge}
              </span>
              <span className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#b70011] flex items-center justify-center">
                <span className="material-symbols-outlined !text-[18px]">
                  {s.icon}
                </span>
              </span>
            </div>
            <div className="text-3xl font-bold text-[#b70011] tracking-tight mb-1">
              {s.stat}
            </div>
            <div
              className={`text-sm font-semibold mb-3 ${
                isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
              }`}
            >
              {s.title}
            </div>
            <div
              className={`w-full rounded-full h-1.5 overflow-hidden ${
                isDarkMode ? "bg-[#334155]" : "bg-slate-100"
              }`}
            >
              <div
                className="bg-[#b70011] h-full rounded-full"
                style={{ width: s.progress }}
              />
            </div>
            <span
              className={`text-xs mt-2 ${
                isDarkMode ? "text-[#94A3B8]" : "text-[#5c403c]"
              }`}
            >
              {s.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}