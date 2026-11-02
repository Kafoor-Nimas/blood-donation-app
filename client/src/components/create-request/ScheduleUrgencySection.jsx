import { useApp } from "../../context/AppContext";

export default function ScheduleUrgencySection({
  urgencyLevel,
  setUrgencyLevel,
  requiredDate,
  setRequiredDate,
  requiredTime,
  setRequiredTime,
  clinicalNotes,
  setClinicalNotes,
}) {
  const { isDarkMode } = useApp();

  return (
    <section
      className={`rounded-2xl shadow-sm p-6 sm:p-8 border ${
        isDarkMode
          ? "bg-[#1E293B] border-[#334155]"
          : "bg-white border-slate-100"
      }`}
    >
      <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-100 dark:border-[#334155]">
        <div className="w-9 h-9 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#b70011] shrink-0">
          <span className="material-symbols-outlined !text-[20px]">alarm</span>
        </div>
        <div>
          <h2 className="text-lg font-bold">3. Urgency Level &amp; Schedule</h2>
          <p
            className={`text-xs ${
              isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
            }`}
          >
            Set clinical urgency and delivery deadline for mobilization
          </p>
        </div>
      </div>

      {/* Urgency Cards */}
      <div className="mb-6">
        <label className="text-xs font-semibold block mb-3">
          Urgency Classification <span className="text-[#b70011]">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label
            onClick={() => setUrgencyLevel("normal")}
            className={`relative flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all border ${
              urgencyLevel === "normal"
                ? "bg-[#d5e0f8]/30 border-[#586377]"
                : isDarkMode
                ? "bg-[#111827] border-[#334155]"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <input
              type="radio"
              name="urgencyLevel"
              value="normal"
              checked={urgencyLevel === "normal"}
              onChange={() => setUrgencyLevel("normal")}
              className="mt-1 accent-[#b70011]"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm">Normal / Scheduled</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    isDarkMode
                      ? "bg-[#334155] text-slate-300"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  Within 24-48 hrs
                </span>
              </div>
              <p
                className={`text-xs ${
                  isDarkMode ? "text-[#94A3B8]" : "text-slate-600"
                }`}
              >
                Blood needed for scheduled surgery or replenishment.
              </p>
            </div>
          </label>

          <label
            onClick={() => setUrgencyLevel("critical")}
            className={`relative flex items-start gap-4 p-5 rounded-2xl cursor-pointer transition-all border ${
              urgencyLevel === "critical"
                ? "bg-[#ffdad6]/30 border-[#b70011]"
                : isDarkMode
                ? "bg-[#111827] border-[#334155]"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <input
              type="radio"
              name="urgencyLevel"
              value="critical"
              checked={urgencyLevel === "critical"}
              onChange={() => setUrgencyLevel("critical")}
              className="mt-1 accent-[#b70011]"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#b70011] animate-ping" />
                  <span className="font-bold text-sm text-[#b70011]">
                    Urgent / Critical
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffdad6] text-[#b70011]">
                  2 - 6 Hours Max
                </span>
              </div>
              <p
                className={`text-xs ${
                  isDarkMode ? "text-[#94A3B8]" : "text-slate-600"
                }`}
              >
                Immediate transfusion required. Triggers priority broadcast SMS.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1.5 flex items-center gap-1">
            Required by Date <span className="text-[#b70011]">*</span>
          </label>
          <input
            type="date"
            required
            value={requiredDate}
            onChange={(e) => setRequiredDate(e.target.value)}
            className={`w-full rounded-xl px-3 py-2 text-xs font-medium focus:outline-none border ${
              isDarkMode
                ? "bg-[#111827] border-[#334155] text-[#F8FAFC]"
                : "bg-slate-50 border-slate-200 text-[#0b1c30]"
            }`}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1.5 flex items-center gap-1">
            Required by Time <span className="text-[#b70011]">*</span>
          </label>
          <input
            type="time"
            required
            value={requiredTime}
            onChange={(e) => setRequiredTime(e.target.value)}
            className={`w-full rounded-xl px-3 py-2 text-xs font-medium focus:outline-none border ${
              isDarkMode
                ? "bg-[#111827] border-[#334155] text-[#F8FAFC]"
                : "bg-slate-50 border-slate-200 text-[#0b1c30]"
            }`}
          />
        </div>
      </div>

      {/* Clinical Notes */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold mb-1.5 flex items-center gap-1">
          Additional Clinical Instructions / Notes
          <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <textarea
          rows={3}
          value={clinicalNotes}
          onChange={(e) => setClinicalNotes(e.target.value)}
          placeholder="Provide relevant instructions..."
          className={`w-full rounded-xl p-3 text-xs focus:outline-none resize-y border ${
            isDarkMode
              ? "bg-[#111827] border-[#334155] text-[#F8FAFC] placeholder-slate-500"
              : "bg-slate-50 border-slate-200 text-[#0b1c30] placeholder-slate-400"
          }`}
        />
      </div>
    </section>
  );
}