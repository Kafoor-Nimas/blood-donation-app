import { useApp } from "../../context/AppContext";

export default function SecurityTelemetryBox() {
  const { isDarkMode } = useApp();

  return (
    <div className="lg:col-span-4 space-y-6">
      {/* Security & Compliance Box */}
      <div
        className={`p-6 rounded-xl shadow-sm border space-y-4 transition-colors ${
          isDarkMode
            ? "bg-[#1E293B] border-[#334155]"
            : "bg-white border-slate-100"
        }`}
      >
        <div className="flex items-center gap-2 text-[#b70011]">
          <span className="material-symbols-outlined text-[24px]">
            security
          </span>
          <h3
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-[#0b1c30]"
            }`}
          >
            Security &amp; Compliance
          </h3>
        </div>

        <div
          className={`p-3.5 rounded-lg space-y-2 text-xs transition-colors ${
            isDarkMode
              ? "bg-[#0F172A] text-slate-300"
              : "bg-slate-50 text-slate-600"
          }`}
        >
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[#008438] text-[18px] shrink-0 mt-0.5">
              lock
            </span>
            <span>
              Credentials hashed with <strong>bcrypt (12 rounds)</strong>. Notes
              protected via AES-256 GCM.
            </span>
          </div>

          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[#008438] text-[18px] shrink-0 mt-0.5">
              visibility_off
            </span>
            <span>
              Contact privacy enforcement active. Phone numbers masked until
              clinical clearance.
            </span>
          </div>

          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[#008438] text-[18px] shrink-0 mt-0.5">
              speed
            </span>
            <span>
              Rate limiting: <strong>60 req/min</strong> per staff IP. DDOS
              mitigation armed.
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Database Vault Latency</span>
            <span className="text-[#008438] font-bold">14 ms (Optimal)</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#008438] h-full" style={{ width: "24%" }} />
          </div>
        </div>

        <button
          onClick={() => alert("Loading complete audit trail...")}
          className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
            isDarkMode
              ? "bg-[#0F172A] hover:bg-slate-800 text-white"
              : "bg-slate-100 hover:bg-slate-200 text-[#0b1c30]"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            receipt_long
          </span>
          <span>View Full Audit Logs</span>
        </button>
      </div>

      {/* National Rare Blood Alert Card */}
      <div className="p-6 rounded-xl bg-red-500/10 border border-[#b70011]/30 text-[#b70011] shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[24px]">sensors</span>
          <h4 className="text-sm font-bold">National Rare Blood Alert</h4>
        </div>
        <p
          className={`text-xs leading-relaxed ${
            isDarkMode ? "text-slate-300" : "text-slate-700"
          }`}
        >
          Regional reserves for{" "}
          <strong className="underline text-[#b70011]">O-Negative</strong> in
          Central Province have dipped below 48-hour buffer thresholds.
        </p>
        <button
          onClick={() => alert("SMS Emergency Dispatch Triggered!")}
          className="w-full py-2 bg-[#dc2626] hover:bg-[#b70011] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">
            campaign
          </span>
          <span>Broadcast SMS to O- Donors</span>
        </button>
      </div>
    </div>
  );
}
