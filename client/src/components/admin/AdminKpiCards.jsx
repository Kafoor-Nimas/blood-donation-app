import { useApp } from "../../context/AppContext";

export default function AdminKpiCards() {
  const { isDarkMode, adminStats, requests, adminLoading } = useApp();

  const totalDonors = adminStats?.totalDonors ?? 0;
  const verifiedDonors = adminStats?.verifiedDonors ?? 0;
  const openRequests = requests.filter(
    (r) =>
      (r.status || "Pending").toLowerCase() === "pending" ||
      (r.status || "").toLowerCase() === "open",
  ).length;
  const fulfilledRequests = requests.filter(
    (r) => (r.status || "").toLowerCase() === "fulfilled",
  ).length;

  const cards = [
    {
      title: "Total Registered Donors",
      value: totalDonors,
      subtext: `${verifiedDonors} Verified`,
      icon: "group",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Pending Blood Requests",
      value: openRequests,
      subtext: "Action Required",
      icon: "pending_actions",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Fulfilled Transfusions",
      value: fulfilledRequests,
      subtext: "Completed",
      icon: "task_alt",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Donor Verification Rate",
      value:
        totalDonors > 0
          ? `${Math.round((verifiedDonors / totalDonors) * 100)}%`
          : "0%",
      subtext: "Verified Nodes",
      icon: "verified_user",
      color: "text-[#b70011]",
      bgColor: "bg-[#ffdad6]",
    },
  ];

  if (adminLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-28 rounded-2xl animate-pulse border ${
              isDarkMode
                ? "bg-[#1E293B] border-[#334155]"
                : "bg-slate-200 border-slate-100"
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-5 rounded-2xl border shadow-sm flex items-center justify-between ${
            isDarkMode
              ? "bg-[#1E293B] border-[#334155] text-white"
              : "bg-white border-slate-100 text-[#0b1c30]"
          }`}
        >
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-1">
              {card.title}
            </p>
            <h3 className="text-2xl font-bold">{card.value}</h3>
            <span className="text-[10px] font-semibold text-slate-500">
              {card.subtext}
            </span>
          </div>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bgColor} ${card.color}`}
          >
            <span className="material-symbols-outlined !text-[24px]">
              {card.icon}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
