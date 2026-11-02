import { useApp } from "../context/AppContext";

export default function LiveDispatchBanner() {
  const { isDarkMode } = useApp();

  return (
    <div
      className={`w-full mt-16 px-4 py-2.5 flex items-center justify-between shadow-sm border-b transition-colors ${
        isDarkMode
          ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
          : "bg-[#ffdad6] border-[#e6bdb8] text-[#93000a]"
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b70011] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#b70011]" />
          </span>
          <span className="text-xs uppercase tracking-wider font-bold text-[#b70011]">
            Live Clinical Dispatch
          </span>
          <span className="opacity-40 hidden sm:inline">•</span>
          <span className="text-xs">
            Critical reserves needed: <strong>O-Negative</strong> &amp;{" "}
            <strong>B-Positive</strong> across Western &amp; Central Province Hospitals
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1 opacity-80">
            <span className="material-symbols-outlined !text-[16px]">
              verified_user
            </span>
            NBTS &amp; SLMC Protocols Active
          </span>
          <span className="opacity-30">|</span>
          <a
            href="/blood-requests"
            className="text-[#b70011] hover:underline flex items-center gap-0.5 font-bold"
          >
            View Emergency Queue
            <span className="material-symbols-outlined !text-[14px]">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}