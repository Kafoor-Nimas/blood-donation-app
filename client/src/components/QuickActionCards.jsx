import { useApp } from "../context/AppContext";

export default function QuickActionCards() {
  const { isDarkMode } = useApp();

  const actions = [
    {
      title: "Become a Donor",
      desc: "Join our verified national donor database and get matched to patients.",
      icon: "volunteer_activism",
      bg: isDarkMode ? "bg-[#1E293B]" : "bg-[#ffdad6]",
      iconColor: "text-[#b70011]",
      href: "/create-request",
    },
    {
      title: "Find Donors",
      desc: "Locate compatible verified donors filtered by province, city, and blood type.",
      icon: "person_search",
      bg: isDarkMode ? "bg-[#1E293B]" : "bg-[#d5e0f8]",
      iconColor: isDarkMode ? "text-[#38BDF8]" : "text-[#586377]",
      href: "/find-donors",
    },
    {
      title: "Blood Requests",
      desc: "Browse active hospital requirements and critical ICU emergency alerts.",
      icon: "notifications_active",
      bg: isDarkMode ? "bg-[#1E293B]" : "bg-[#d3e4fe]",
      iconColor: "text-[#b70011]",
      href: "/blood-requests",
    },
    {
      title: "Request Blood",
      desc: "Submit an urgent transfusion requisition verified with hospital MRNs.",
      icon: "emergency",
      bg: isDarkMode ? "bg-[#1E293B]" : "bg-[#ffdad6]",
      iconColor: "text-[#b70011]",
      href: "/create-request",
    },
  ];

  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-12 -mt-6 lg:-mt-8 z-10 w-full mb-16 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`group p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 hover:-translate-y-0.5 border ${
              isDarkMode
                ? "bg-[#111827] border-[#334155] text-[#CBD5E1]"
                : "bg-white border-slate-100 text-[#0b1c30]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-12 h-12 rounded-xl ${item.bg} ${item.iconColor} flex items-center justify-center group-hover:bg-[#b70011] group-hover:text-white transition-colors`}
              >
                <span className="material-symbols-outlined !text-[24px]">
                  {item.icon}
                </span>
              </div>
              <span
                className={`material-symbols-outlined !text-[20px] transition-all group-hover:translate-x-1 ${
                  isDarkMode
                    ? "text-slate-400 group-hover:text-[#38BDF8]"
                    : "text-slate-400 group-hover:text-[#b70011]"
                }`}
              >
                arrow_forward
              </span>
            </div>
            <div>
              <h3
                className={`font-semibold text-base mb-1 transition-colors ${
                  isDarkMode
                    ? "text-[#F8FAFC] group-hover:text-[#38BDF8]"
                    : "text-[#0b1c30] group-hover:text-[#b70011]"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`text-xs ${
                  isDarkMode ? "text-[#94A3B8]" : "text-[#5c403c]"
                }`}
              >
                {item.desc}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}