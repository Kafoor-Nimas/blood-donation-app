import { useApp } from "../context/AppContext";

export default function ProfileModal({ donor, onClose }) {
  const { isDarkMode } = useApp();

  if (!donor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div
        className={`rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 relative border ${
          isDarkMode
            ? "bg-[#1E293B] border-[#334155] text-[#F8FAFC]"
            : "bg-white border-slate-100 text-[#0b1c30]"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute right-5 top-5 p-1 rounded-lg transition-colors ${
            isDarkMode ? "hover:bg-[#334155]" : "hover:bg-slate-100"
          }`}
        >
          <span className="material-symbols-outlined !text-[20px]">close</span>
        </button>

        <div className="text-center space-y-2 pt-2">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[#ffdad6] text-[#b70011] flex items-center justify-center font-bold text-3xl shadow-sm">
            {donor.group}
          </div>
          <h3 className="text-xl font-bold">{donor.name}</h3>
          <p
            className={`text-xs ${
              isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
            }`}
          >
            {donor.location}
          </p>
        </div>

        <div
          className={`space-y-2 p-4 rounded-2xl text-xs border ${
            isDarkMode
              ? "bg-[#111827] border-[#334155]"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div className="flex justify-between py-1">
            <span className={isDarkMode ? "text-[#94A3B8]" : "text-slate-500"}>
              Donation Count
            </span>
            <span className="font-semibold">{donor.donationsCount}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className={isDarkMode ? "text-[#94A3B8]" : "text-slate-500"}>
              Primary Facility
            </span>
            <span className="font-semibold">{donor.facility}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className={isDarkMode ? "text-[#94A3B8]" : "text-slate-500"}>
              Screening Status
            </span>
            <span className="text-[#008438] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined !text-[16px]">
                check_circle
              </span>{" "}
              Passed NBTS Screen
            </span>
          </div>

          <div className="flex justify-between py-1">
            <span className={isDarkMode ? "text-[#94A3B8]" : "text-slate-500"}>
              Hemoglobin (Last Check)
            </span>
            <span className="font-semibold">{donor.hemoglobin}</span>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className={`w-full h-11 rounded-xl font-semibold text-xs transition-colors border ${
              isDarkMode
                ? "bg-[#111827] border-[#334155] text-[#F8FAFC] hover:bg-[#334155]"
                : "bg-slate-100 border-slate-200 text-[#0b1c30] hover:bg-slate-200"
            }`}
          >
            Close Record
          </button>
        </div>
      </div>
    </div>
  );
}