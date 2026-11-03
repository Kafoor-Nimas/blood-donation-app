import { useState } from "react";
import { useApp } from "../../context/AppContext";

const initialDonors = [
  {
    id: 1,
    name: "Chaminda Samarasinghe",
    bloodGroup: "O-",
    badge: "Medical Cleared",
    badgeColor: "text-[#008438] bg-emerald-50 dark:bg-emerald-950/50",
    district: "Colombo District (Gampaha)",
    registeredTime: "Registered 12 min ago",
    active: true,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCS1tT-x4pBVNKW2yjRfzmOiRE9tCRUO35fo_OR2BruZ34SnOfAKWu7ymDI9rIZ-OWiM5mLxMndztnPxC3ROwXrGb63EjptR8yJ1VCVYMX-R-BVAXTcyAEcz9pulImCN1bsuaqtq6wm8_8_kVWJjloigtottIr8e8392TmsfZaJGAzCE292uaHVyid8b2S_YATs3WpBOkTnmV7iaG9Eikm8X5p8oMyAgdeUWppZYcDM",
  },
  {
    id: 2,
    name: "Dilini Jayasekara",
    bloodGroup: "A+",
    badge: "ID Validated",
    badgeColor: "text-[#008438] bg-emerald-50 dark:bg-emerald-950/50",
    district: "Kandy District (Peradeniya)",
    registeredTime: "Registered 48 min ago",
    active: true,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxCvKWcV0E2zkpZdP11Ln6mL-pLVHZ21IAmXq2SauzjEOVmAMBHCFaaEm46-0_d8uksldlkerWnjJlmN5lD6ljqns9DJ9bxc1KMNTleTuwIBrKa3ZqQ1iGvFdN6zQQhLMfPAJDCplCeKZz9iKKpoNE8MOBB-WHoQG8TV8qCfOwnNXZ4xJd1rLAVBbN9Gu9K6Md7u4jKDo1CWC00d2FO2NaBI-2gnc2ZXZDGP86R0Lk",
  },
  {
    id: 3,
    name: "Rohan Alwis",
    bloodGroup: "B-",
    badge: "Document Review",
    badgeColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/50",
    district: "Galle District (Hikkaduwa)",
    registeredTime: "Registered 2 hrs ago",
    active: false,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3kBqpdwTKZKpaSbxvTR6bBroZ_3gOs89mcjCA1oTeW4cdvb4hCaDjfYl4aBo1RkBxKq_WSFBFAxI4hGrihFbfP0o7LwA5870AujR33sF-rSreJHvkn67CFOMJbMESlahbj0yuPynK1-jCm7xNw9Vx90gYx9v4CtPBEBcneWqq5JPmyYmKuitnNdKVB1-scJQIUMKpECnnXMp3fpi9rerw3uUlIcI-xwWUhXw7ERv9",
  },
];

export default function RecentDonorsPanel() {
  const { isDarkMode } = useApp();
  const [donors, setDonors] = useState(initialDonors);

  const toggleAccountStatus = (id) => {
    setDonors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !d.active } : d)),
    );
  };

  return (
    <div
      className={`lg:col-span-8 p-6 rounded-xl shadow-sm border space-y-6 transition-colors ${
        isDarkMode
          ? "bg-[#1E293B] border-[#334155]"
          : "bg-white border-slate-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-[#0b1c30]"
            }`}
          >
            Recent Donor Registrations
          </h3>
          <p
            className={`text-xs mt-0.5 ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Quick verification pipeline and live account privileges control.
          </p>
        </div>
        <button
          onClick={() => alert("Redirecting to full donor directory...")}
          className="px-3 py-1.5 text-xs text-[#b70011] bg-red-50 dark:bg-red-950/40 hover:bg-red-100 rounded-lg font-semibold transition-colors cursor-pointer"
        >
          View All Donors
        </button>
      </div>

      <div className="space-y-3">
        {donors.map((donor) => (
          <div
            key={donor.id}
            className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isDarkMode
                ? "bg-[#0F172A] border-[#334155]"
                : "bg-slate-50 border-slate-100"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={donor.avatar}
                  alt={donor.name}
                  className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-[#b70011]/20"
                />
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#dc2626] text-white">
                  {donor.bloodGroup}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4
                    className={`font-semibold text-sm ${
                      isDarkMode ? "text-white" : "text-[#0b1c30]"
                    }`}
                  >
                    {donor.name}
                  </h4>
                  <span
                    className={`inline-flex items-center gap-0.5 text-[10px] font-medium px-2 py-0.5 rounded-full ${donor.badgeColor}`}
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      verified
                    </span>
                    <span>{donor.badge}</span>
                  </span>
                </div>
                <div
                  className={`flex items-center gap-3 text-xs mt-0.5 ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  <span>{donor.district}</span>
                  <span>•</span>
                  <span>{donor.registeredTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={donor.active}
                  onChange={() => toggleAccountStatus(donor.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#008438]" />
                <span
                  className={`ml-2 text-xs font-semibold ${
                    donor.active
                      ? isDarkMode
                        ? "text-white"
                        : "text-[#0b1c30]"
                      : "text-[#b70011]"
                  }`}
                >
                  {donor.active ? "Active" : "Suspended"}
                </span>
              </label>

              <button
                onClick={() => alert(`Manage options for ${donor.name}`)}
                className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  more_vert
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
