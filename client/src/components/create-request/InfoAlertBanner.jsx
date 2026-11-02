import { useApp } from "../../context/AppContext";

export default function InfoAlertBanner() {
  const { isDarkMode } = useApp();

  return (
    <div className="bg-[#ffdad6]/40 rounded-2xl p-5 flex flex-col sm:flex-row items-start justify-between gap-4 mb-8 shadow-sm border border-[#e6bdb8] dark:border-[#334155]">
      <div className="flex items-start gap-3.5">
        <div className="p-1 rounded-full bg-[#ffdad6] text-[#b70011] shrink-0 mt-0.5">
          <span className="material-symbols-outlined !text-[20px]">
            warning
          </span>
        </div>
        <div>
          <h2 className="font-semibold text-sm text-[#0b1c30] dark:text-[#F8FAFC] mb-1">
            Important Transfusion Information
          </h2>
          <p
            className={`text-xs ${
              isDarkMode ? "text-[#CBD5E1]" : "text-slate-600"
            }`}
          >
            Please ensure that all hospital details and required units are
            verified. Blood donation and direct transfusion procedures must be
            coordinated with licensed healthcare professionals at the nominated
            hospital blood bank.
          </p>
        </div>
      </div>
      <div className="shrink-0 self-start sm:self-center">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold text-xs shadow-sm border ${
            isDarkMode
              ? "bg-[#1E293B] border-[#334155] text-white"
              : "bg-white border-slate-100 text-slate-800"
          }`}
        >
          <span className="material-symbols-outlined !text-[16px] text-[#008438]">
            verified_user
          </span>
          NBTS Protocol Compliant
        </span>
      </div>
    </div>
  );
}