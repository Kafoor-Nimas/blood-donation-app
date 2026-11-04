import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function RequestCard({ request, onFulfill }) {
  const { isDarkMode } = useApp();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const id = request._id
    ? request._id.slice(-6).toUpperCase()
    : request.id || "N/A";
  const bloodGroup = request.bloodGroup || "O+";
  const rhType =
    request.rhType || (bloodGroup.includes("-") ? "Rh Neg" : "Rh Pos");
  const unitsNeeded = request.unitsNeeded ?? request.units ?? 1;
  const hospitalName =
    request.hospitalName || request.hospital || "General Hospital";
  const locationOrCity = request.city || request.district || "Colombo";
  const status = (request.status || "Pending").toLowerCase();
  const urgency = (request.urgency || "critical").toLowerCase();

  const isUrgent =
    urgency === "urgent" || urgency === "critical" || status === "urgent";
  const isFulfilled = status === "fulfilled";

  const urgencyText =
    request.urgencyText ||
    (isUrgent ? `${urgency.toUpperCase()} NEED` : status.toUpperCase());
  const verifiedBy =
    request.verifiedBy || request.requester?.name || "NBTS Coordinator";
  const remainingTime =
    request.remainingTime || request.deadline || "Within 24 Hours";

  return (
    <div
      className={`rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group border ${
        isDarkMode
          ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
          : "bg-white border-slate-100 text-[#0b1c30]"
      } ${isFulfilled ? "opacity-80 hover:opacity-100" : ""}`}
    >
      {/* Accent Left Border */}
      <div
        className={`absolute top-0 left-0 bottom-0 w-1.5 ${
          isUrgent
            ? "bg-[#b70011]"
            : isFulfilled
              ? "bg-[#008438]"
              : "bg-[#586377]"
        }`}
      />

      <div>
        {/* Header Status & Code */}
        <div className="flex items-start justify-between gap-2 mb-4 pl-1">
          {isUrgent && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#b70011]">
              <span className="w-2 h-2 rounded-full bg-[#b70011] animate-ping" />
              <span className="text-[10px] uppercase font-bold tracking-wide">
                {urgencyText}
              </span>
            </div>
          )}

          {!isUrgent && !isFulfilled && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d5e0f8] text-[#586377]">
              <span className="w-2 h-2 rounded-full bg-[#586377]" />
              <span className="text-[10px] uppercase font-semibold tracking-wide">
                {urgencyText}
              </span>
            </div>
          )}

          {isFulfilled && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#008438]/10 text-[#008438]">
              <span className="material-symbols-outlined !text-[14px]">
                check_circle
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wide">
                FULFILLED
              </span>
            </div>
          )}

          <span
            className={`text-xs font-mono px-2 py-0.5 rounded-lg ${
              isDarkMode
                ? "bg-[#111827] text-slate-400"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            #{id}
          </span>
        </div>

        {/* Blood Type & Units */}
        <div className="flex items-baseline justify-between mb-3 pl-1">
          <div className="flex items-center gap-3">
            <div
              className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 font-bold ${
                isUrgent
                  ? "bg-[#ffdad6] text-[#b70011]"
                  : isFulfilled
                    ? "bg-slate-200 text-slate-600 dark:bg-[#334155] dark:text-slate-300"
                    : "bg-[#d5e0f8] text-[#0b1c30]"
              }`}
            >
              <span className="text-2xl leading-tight">{bloodGroup}</span>
              <span className="text-[9px] uppercase tracking-wider font-semibold opacity-80 leading-none">
                {rhType}
              </span>
            </div>
            <div>
              <div
                className={`font-semibold text-base ${
                  isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                }`}
              >
                {unitsNeeded} {isFulfilled ? "Units Completed" : "Units Needed"}
              </div>
              <div
                className={`text-xs flex items-center gap-1 ${
                  isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
                }`}
              >
                <span className="material-symbols-outlined !text-[14px] text-[#008438]">
                  {isFulfilled ? "task_alt" : "verified"}
                </span>
                <span>{request.patientName || locationOrCity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Time Info */}
        <div
          className={`rounded-xl p-3 space-y-1.5 mb-4 pl-3 border ${
            isDarkMode
              ? "bg-[#111827] border-[#334155]"
              : "bg-[#eff4ff] border-slate-100"
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-medium truncate">
            <span
              className={`material-symbols-outlined !text-[18px] ${
                isUrgent
                  ? "text-[#b70011]"
                  : isFulfilled
                    ? "text-[#008438]"
                    : "text-[#586377]"
              }`}
            >
              local_hospital
            </span>
            <span className="truncate">
              {hospitalName} ({locationOrCity})
            </span>
          </div>

          <div
            className={`flex items-center justify-between text-xs ${
              isDarkMode ? "text-[#94A3B8]" : "text-slate-600"
            }`}
          >
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined !text-[16px]">
                {isFulfilled ? "verified" : "schedule"}
              </span>
              <span>Contact: {request.contactPhone || "N/A"}</span>
            </span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                isUrgent
                  ? "bg-[#ffdad6] text-[#b70011]"
                  : isFulfilled
                    ? "bg-[#008438]/20 text-[#008438]"
                    : "bg-slate-200 text-slate-700 dark:bg-[#334155] dark:text-slate-200"
              }`}
            >
              {remainingTime}
            </span>
          </div>
        </div>

        {/* Verification Footer */}
        <div className="flex items-center justify-between text-xs mb-4 px-1">
          <span className="flex items-center gap-1 text-[#008438]">
            <span className="material-symbols-outlined !text-[16px]">
              verified_user
            </span>
            <span>Verified by {verifiedBy}</span>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        {isFulfilled ? (
          <button
            type="button"
            disabled
            className="w-full py-2.5 px-4 bg-slate-200 dark:bg-[#334155] text-slate-500 dark:text-slate-400 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-not-allowed"
          >
            <span className="material-symbols-outlined !text-[18px]">
              check
            </span>
            <span>Request Fulfilled</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onFulfill && onFulfill(request)}
            className={`w-full py-2.5 px-4 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow cursor-pointer ${
              isUrgent
                ? "bg-[#b70011] hover:brightness-110"
                : "bg-[#586377] hover:bg-[#0b1c30]"
            }`}
          >
            <span className="material-symbols-outlined !text-[18px]">
              volunteer_activism
            </span>
            <span>Fulfill Request / I Can Donate</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleShare}
          className={`w-full py-2 px-4 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 border cursor-pointer ${
            isDarkMode
              ? "bg-[#111827] border-[#334155] text-[#CBD5E1] hover:bg-[#334155]"
              : "bg-slate-100 border-slate-200 text-[#0b1c30] hover:bg-slate-200"
          }`}
        >
          <span className="material-symbols-outlined !text-[16px]">
            {copied ? "check" : "share"}
          </span>
          <span>
            {copied
              ? "Link Copied!"
              : isFulfilled
                ? "Share Case Summary"
                : "Share Urgent Request"}
          </span>
        </button>
      </div>
    </div>
  );
}
