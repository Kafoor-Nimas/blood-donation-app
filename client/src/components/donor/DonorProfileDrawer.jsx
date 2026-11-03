import { useApp } from "../../context/AppContext";

export default function DonorProfileDrawer({ donor }) {
  const { isDarkMode } = useApp();

  if (!donor) return null;

  return (
    <div
      className={`rounded-xl p-6 shadow-sm border flex flex-col gap-4 transition-colors ${
        isDarkMode
          ? "bg-[#1E293B] border-[#334155]"
          : "bg-white border-slate-100"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#dc2626] text-[20px]">
            id_card
          </span>
          <span
            className={`font-semibold text-sm ${
              isDarkMode ? "text-white" : "text-[#0b1c30]"
            }`}
          >
            Donor Profile Inspection
          </span>
        </div>
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
            isDarkMode
              ? "bg-emerald-950/80 text-emerald-300"
              : "bg-emerald-100 text-[#008438]"
          }`}
        >
          {donor.status} Record
        </span>
      </div>

      {/* Summary Header */}
      <div
        className={`flex items-center gap-3 p-3 rounded-xl ${
          isDarkMode ? "bg-[#0F172A]" : "bg-slate-50"
        }`}
      >
        <img
          src={donor.avatar}
          alt={donor.name}
          className="w-14 h-14 rounded-full object-cover shadow-sm"
        />
        <div className="min-w-0">
          <h3
            className={`font-bold text-sm truncate ${
              isDarkMode ? "text-white" : "text-[#0b1c30]"
            }`}
          >
            {donor.name}
          </h3>
          <p className="text-xs font-bold text-[#dc2626]">
            {donor.idCode} • SL-NIC {donor.nic || "881920391V"}
          </p>
          <p
            className={`text-[11px] truncate ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Registered: {donor.registeredDate || "14 Jan 2024"}
          </p>
        </div>
      </div>

      {/* Attributes Grid */}
      <div className="grid grid-cols-2 gap-2">
        <div
          className={`p-3 rounded-lg ${
            isDarkMode ? "bg-[#0F172A]" : "bg-slate-50"
          }`}
        >
          <div
            className={`text-[10px] uppercase font-semibold ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Blood Group
          </div>
          <div className="text-2xl font-black text-[#dc2626]">
            {donor.bloodGroup}
          </div>
          <div
            className={`text-[11px] font-medium ${
              isDarkMode ? "text-emerald-400" : "text-[#008438]"
            }`}
          >
            Rh Positive
          </div>
        </div>

        <div
          className={`p-3 rounded-lg ${
            isDarkMode ? "bg-[#0F172A]" : "bg-slate-50"
          }`}
        >
          <div
            className={`text-[10px] uppercase font-semibold ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Total Donated
          </div>
          <div
            className={`text-2xl font-black ${
              isDarkMode ? "text-white" : "text-[#0b1c30]"
            }`}
          >
            {donor.totalDonated || "4"}{" "}
            <span className="text-xs font-normal text-slate-400">Units</span>
          </div>
          <div
            className={`text-[11px] ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            1,800 mL Total
          </div>
        </div>

        <div
          className={`p-3 rounded-lg ${
            isDarkMode ? "bg-[#0F172A]" : "bg-slate-50"
          }`}
        >
          <div
            className={`text-[10px] uppercase font-semibold ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Assigned Center
          </div>
          <div
            className={`text-xs font-bold truncate ${
              isDarkMode ? "text-white" : "text-[#0b1c30]"
            }`}
          >
            {donor.hospital}
          </div>
          <div
            className={`text-[10px] ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            National Blood Bank
          </div>
        </div>

        <div
          className={`p-3 rounded-lg ${
            isDarkMode ? "bg-[#0F172A]" : "bg-slate-50"
          }`}
        >
          <div
            className={`text-[10px] uppercase font-semibold ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Eligibility
          </div>
          <div className="text-xs font-semibold text-[#008438] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">
              verified
            </span>
            Ready
          </div>
          <div
            className={`text-[10px] ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Cleared 12 Oct
          </div>
        </div>
      </div>

      {/* Contact Protection Box */}
      <div
        className={`p-3 rounded-lg space-y-2 ${
          isDarkMode ? "bg-[#0F172A]" : "bg-slate-50"
        }`}
      >
        <div className="flex items-center justify-between text-xs">
          <span
            className={`font-semibold uppercase ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Authorized Contact Info
          </span>
          <span
            className={`text-[10px] font-semibold flex items-center gap-0.5 ${
              isDarkMode ? "text-emerald-400" : "text-[#008438]"
            }`}
          >
            <span className="material-symbols-outlined text-[12px]">lock</span>
            HIPAA/SLMC
          </span>
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between items-center">
            <span
              className={isDarkMode ? "text-slate-400" : "text-slate-500"}
            >
              Contact Number:
            </span>
            <span
              className={`font-mono text-[12px] px-2 py-0.5 rounded shadow-sm ${
                isDarkMode
                  ? "bg-[#1E293B] text-white"
                  : "bg-white text-[#0b1c30]"
              }`}
            >
              +94 77 458 2901
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span
              className={isDarkMode ? "text-slate-400" : "text-slate-500"}
            >
              Emergency Notify:
            </span>
            <span
              className={`font-medium ${
                isDarkMode ? "text-white" : "text-[#0b1c30]"
              }`}
            >
              Chathuri Perera (Wife)
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span
              className={isDarkMode ? "text-slate-400" : "text-slate-500"}
            >
              Last Screening Hb:
            </span>
            <span className="font-semibold text-[#008438]">
              14.2 g/dL (Optimal)
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        <button
          className={`w-full py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            isDarkMode
              ? "bg-[#0F172A] hover:bg-slate-800 text-white"
              : "bg-slate-100 hover:bg-slate-200 text-[#0b1c30]"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">sms</span>
          <span>Send Direct SMS Callout</span>
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button
            className={`py-2 px-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              isDarkMode
                ? "bg-[#0F172A] hover:bg-slate-800 text-white"
                : "bg-slate-100 hover:bg-slate-200 text-[#0b1c30]"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            <span>Edit Record</span>
          </button>
          <button className="py-2 px-3 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 bg-red-100 hover:bg-red-200 text-[#b70011] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">block</span>
            <span>Deactivate</span>
          </button>
        </div>
      </div>
    </div>
  );
}