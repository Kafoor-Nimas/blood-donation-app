import React from "react";
import { useApp } from "../context/AppContext";

export default function UrgentRequests() {
  const { isDarkMode } = useApp();

  const requests = [
    {
      id: "LF-8921",
      time: "Urgent • 2h left",
      type: "O-",
      hospital: "Colombo National Hospital",
      ward: "Ward 14 (Trauma ICU)",
      location: "Colombo 07, Western Province",
      units: "3 Units Packed RBCs",
      reason: "Emergency Surgical Trauma",
    },
    {
      id: "LF-8919",
      time: "Urgent • 4h left",
      type: "B+",
      hospital: "Kandy Teaching Hospital",
      ward: "Pediatric Hematology",
      location: "Kandy, Central Province",
      units: "2 Units Whole Blood",
      reason: "Thalassemia Major Support",
    },
    {
      id: "LF-8904",
      time: "Standard • Within 24h",
      type: "AB-",
      hospital: "Karapitiya Hospital",
      ward: "Obstetrics & Gynecology",
      location: "Galle, Southern Province",
      units: "1 Unit Platelets",
      reason: "Scheduled C-Section Prep",
    },
  ];

  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad6] text-[#b70011] text-xs uppercase font-semibold mb-2">
            <span className="material-symbols-outlined !text-[16px]">
              emergency
            </span>
            Action Needed Now
          </div>
          <h2
            className={`text-3xl font-bold tracking-tight ${
              isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
            }`}
          >
            People Who Need Your Help
          </h2>
          <p
            className={`text-sm mt-1 ${
              isDarkMode ? "text-[#CBD5E1]" : "text-[#5c403c]"
            }`}
          >
            Active clinical requisitions from verified hospital blood banks.
          </p>
        </div>
        <a
          href="/blood-requests"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs transition-colors border ${
            isDarkMode
              ? "bg-[#1E293B] border-[#334155] text-[#F8FAFC] hover:bg-[#334155]"
              : "bg-slate-100 border-slate-200 text-[#0b1c30] hover:bg-slate-200"
          }`}
        >
          <span>View All 24 Active Requests</span>
          <span className="material-symbols-outlined !text-[18px]">
            east
          </span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {requests.map((req, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between border ${
              isDarkMode
                ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
                : "bg-white border-slate-100 text-[#0b1c30]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#b70011] text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#b70011] animate-ping" />
                  {req.time}
                </span>
                <span
                  className={`text-xs ${
                    isDarkMode ? "text-[#94A3B8]" : "text-[#5c403c]"
                  }`}
                >
                  Req #{req.id}
                </span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ffdad6] text-[#b70011] flex items-center justify-center font-bold text-2xl">
                  {req.type}
                </div>
                <div>
                  <h3
                    className={`font-bold text-base ${
                      isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                    }`}
                  >
                    {req.hospital}
                  </h3>
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-[#94A3B8]" : "text-[#5c403c]"
                    }`}
                  >
                    {req.ward}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-[#b70011] font-medium mt-1">
                    <span className="material-symbols-outlined !text-[14px]">
                      location_on
                    </span>
                    <span>{req.location}</span>
                  </div>
                </div>
              </div>

              <div
                className={`rounded-xl p-3 mb-6 space-y-2 border ${
                  isDarkMode
                    ? "bg-[#111827] border-[#334155]"
                    : "bg-[#eff4ff] border-slate-100"
                }`}
              >
                <div className="flex justify-between text-xs">
                  <span
                    className={isDarkMode ? "text-[#94A3B8]" : "text-[#5c403c]"}
                  >
                    Required Units:
                  </span>
                  <span
                    className={`font-semibold ${
                      isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                    }`}
                  >
                    {req.units}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span
                    className={isDarkMode ? "text-[#94A3B8]" : "text-[#5c403c]"}
                  >
                    Reason:
                  </span>
                  <span
                    className={`font-semibold ${
                      isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                    }`}
                  >
                    {req.reason}
                  </span>
                </div>
              </div>
            </div>

            <a
              href="/blood-requests"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#b70011] text-white font-semibold text-xs hover:brightness-110 transition-colors"
            >
              <span className="material-symbols-outlined !text-[18px]">
                call
              </span>
              <span>Respond / Donate</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}