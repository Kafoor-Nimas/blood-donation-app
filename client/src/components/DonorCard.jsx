import { useApp } from "../context/AppContext";

export default function DonorCard({ donor, onRequestContact, onViewProfile }) {
  const { isDarkMode } = useApp();

  return (
    <div
      className={`rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group border ${
        isDarkMode
          ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
          : "bg-white border-slate-100 text-[#0b1c30]"
      }`}
    >
      <div className="space-y-4">
        {/* Header Badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#ffdad6] text-[#b70011] flex flex-col items-center justify-center font-bold text-xl leading-tight shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
            <span>{donor.group}</span>
            <span className="text-[9px] uppercase tracking-wider font-semibold opacity-80">
              {donor.rhType}
            </span>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            {donor.available ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#008438]/10 text-[#008438] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008438] animate-pulse" />
                <span>{donor.status}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]" />
                <span>{donor.status}</span>
              </span>
            )}

            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${
                isDarkMode
                  ? "bg-[#334155] text-[#F8FAFC]"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              <span className="material-symbols-outlined !text-[14px]">
                military_tech
              </span>
              <span>{donor.badge}</span>
            </span>
          </div>
        </div>

        {/* Name & Location */}
        <div>
          <div className="flex items-center gap-2">
            <h3
              className={`font-semibold text-lg ${
                isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
              }`}
            >
              {donor.name}
            </h3>
            <span
              className="material-symbols-outlined text-[#008438] !text-[18px]"
              title="NBTS Certified Donor"
            >
              verified
            </span>
          </div>
          <p
            className={`text-xs flex items-center gap-1 mt-0.5 ${
              isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
            }`}
          >
            <span className="material-symbols-outlined !text-[16px] text-[#b70011]">
              location_on
            </span>
            <span>{donor.location}</span>
          </p>
        </div>

        {/* Clinical Snapshot */}
        <div
          className={`p-3.5 rounded-xl space-y-2 border ${
            isDarkMode
              ? "bg-[#111827] border-[#334155]"
              : "bg-[#eff4ff] border-slate-100"
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <span className={isDarkMode ? "text-[#94A3B8]" : "text-slate-500"}>
              Last Donated
            </span>
            <span
              className={`font-semibold ${
                isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
              }`}
            >
              {donor.lastDonated}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className={isDarkMode ? "text-[#94A3B8]" : "text-slate-500"}>
              {donor.available ? "Preferred Centers" : "Recovery Period"}
            </span>
            <span
              className={`font-semibold ${
                donor.available
                  ? isDarkMode
                    ? "text-[#F8FAFC]"
                    : "text-[#0b1c30]"
                  : "text-[#ba1a1a]"
              }`}
            >
              {donor.available
                ? donor.preferredCenters
                : `${donor.recoveryProgress} Completed`}
            </span>
          </div>

          <div
            className={`w-full rounded-full h-1.5 overflow-hidden ${
              isDarkMode ? "bg-[#334155]" : "bg-slate-200"
            }`}
          >
            <div
              className={`h-full rounded-full ${
                donor.available ? "bg-[#008438] w-full" : "bg-[#b70011]"
              }`}
              style={{
                width: donor.available ? "100%" : donor.recoveryProgress,
              }}
            />
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="pt-5 mt-4 flex items-center gap-2.5">
        {donor.available ? (
          <button
            type="button"
            onClick={() => onRequestContact(donor)}
            className="flex-1 h-10 px-3 rounded-xl bg-[#b70011] text-white font-semibold text-xs hover:brightness-110 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined !text-[18px]">send</span>
            <span>Request Contact</span>
          </button>
        ) : (
          <button
            type="button"
            disabled
            className={`flex-1 h-10 px-3 rounded-xl text-xs font-semibold cursor-not-allowed opacity-80 flex items-center justify-center gap-1.5 ${
              isDarkMode
                ? "bg-[#111827] text-slate-500"
                : "bg-slate-200 text-slate-500"
            }`}
          >
            <span className="material-symbols-outlined !text-[18px]">
              schedule
            </span>
            <span>In Clinical Rest</span>
          </button>
        )}

        <button
          type="button"
          title="View Verified Credentials"
          onClick={() => onViewProfile(donor)}
          className={`h-10 px-3 rounded-xl font-semibold text-xs flex items-center justify-center transition-colors border ${
            isDarkMode
              ? "bg-[#111827] border-[#334155] text-[#F8FAFC] hover:bg-[#334155]"
              : "bg-slate-100 border-slate-200 text-[#0b1c30] hover:bg-slate-200"
          }`}
        >
          <span className="material-symbols-outlined !text-[18px]">badge</span>
        </button>
      </div>
    </div>
  );
}