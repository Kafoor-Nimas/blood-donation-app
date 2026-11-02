import React from "react";
import { useApp } from "../context/AppContext";

export default function BloodGroupMatrix() {
  const { isDarkMode } = useApp();

  const groups = [
    {
      group: "O-",
      tag: "Universal Donor",
      tagBg: "bg-[#ffdad6] text-[#b70011]",
      give: "All Types (A, B, AB, O)",
      receive: "O- Only",
    },
    {
      group: "O+",
      tag: "High Demand",
      tagBg: isDarkMode
        ? "bg-[#334155] text-white"
        : "bg-slate-100 text-slate-700",
      give: "O+, A+, B+, AB+",
      receive: "O+, O-",
    },
    {
      group: "A+",
      tag: "Common",
      tagBg: isDarkMode
        ? "bg-[#334155] text-white"
        : "bg-slate-100 text-slate-700",
      give: "A+, AB+",
      receive: "A+, A-, O+, O-",
    },
    {
      group: "A-",
      tag: "Rare (6%)",
      tagBg: "bg-[#d3e4fe] text-[#b70011]",
      give: "A-, A+, AB-, AB+",
      receive: "A-, O-",
    },
    {
      group: "B+",
      tag: "Urgent Need",
      tagBg: "bg-[#ffdad6] text-[#b70011]",
      give: "B+, AB+",
      receive: "B+, B-, O+, O-",
    },
    {
      group: "B-",
      tag: "Rare (2%)",
      tagBg: "bg-[#d3e4fe] text-[#b70011]",
      give: "B-, B+, AB-, AB+",
      receive: "B-, O-",
    },
    {
      group: "AB+",
      tag: "Universal Recipient",
      tagBg: "bg-[#d5e0f8] text-[#586377]",
      give: "AB+ Only",
      receive: "All Types (Universal)",
    },
    {
      group: "AB-",
      tag: "Rarest (1%)",
      tagBg: "bg-[#d3e4fe] text-[#b70011]",
      give: "AB-, AB+",
      receive: "AB-, A-, B-, O-",
    },
  ];

  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#b70011] font-bold">
            Compatibility Matrix
          </span>
          <h2
            className={`text-3xl font-bold tracking-tight mt-1 ${
              isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
            }`}
          >
            Find the Blood Group You Need
          </h2>
          <p
            className={`text-sm mt-2 max-w-xl ${
              isDarkMode ? "text-[#CBD5E1]" : "text-[#5c403c]"
            }`}
          >
            Quickly inspect antigen compatibility rules and match requirements
            for instant donor outreach across Sri Lanka.
          </p>
        </div>
        <a
          href="/find-donors"
          className="inline-flex items-center gap-1.5 text-[#b70011] font-semibold text-sm hover:underline"
        >
          <span>Browse Complete Donor Directory</span>
          <span className="material-symbols-outlined !text-[18px]">
            arrow_forward
          </span>
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {groups.map((item, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border ${
              isDarkMode
                ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
                : "bg-white border-slate-100 text-[#0b1c30]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#ffdad6] text-[#b70011] font-bold text-lg">
                  {item.group}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${item.tagBg}`}
                >
                  {item.tag}
                </span>
              </div>
              <div className="space-y-1 mb-4 text-xs">
                <div
                  className={isDarkMode ? "text-[#94A3B8]" : "text-[#5c403c]"}
                >
                  Can Give To:{" "}
                  <strong
                    className={isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"}
                  >
                    {item.give}
                  </strong>
                </div>
                <div
                  className={isDarkMode ? "text-[#94A3B8]" : "text-[#5c403c]"}
                >
                  Can Receive:{" "}
                  <strong
                    className={isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"}
                  >
                    {item.receive}
                  </strong>
                </div>
              </div>
            </div>
            <a
              href="/find-donors"
              className={`w-full text-center py-2 rounded-xl font-semibold text-xs transition-colors border ${
                isDarkMode
                  ? "bg-[#111827] border-[#334155] text-[#F8FAFC] hover:bg-[#b70011] hover:text-white"
                  : "bg-slate-100 border-slate-200 text-[#0b1c30] hover:bg-[#b70011] hover:text-white"
              }`}
            >
              Find {item.group} Donors
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}