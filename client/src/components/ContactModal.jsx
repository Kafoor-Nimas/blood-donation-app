import  { useState } from "react";
import { useApp } from "../context/AppContext";

export default function ContactModal({ donor, onClose }) {
  const { isDarkMode } = useApp();
  const [urgency, setUrgency] = useState("immediate");
  const [requestId, setRequestId] = useState("");
  const [message, setMessage] = useState("");

  if (!donor) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Contact request for ${donor.name} dispatched via encrypted LifeLink IVR pipeline.`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div
        className={`rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border ${
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

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#ffdad6] text-[#b70011] flex items-center justify-center font-bold text-lg">
            {donor.group}
          </div>
          <div>
            <span className="text-[10px] text-[#b70011] uppercase font-bold tracking-wider">
              Consent-Driven Contact Dispatch
            </span>
            <h3 className="text-xl font-bold">{donor.name}</h3>
          </div>
        </div>

        <div
          className={`p-4 rounded-2xl space-y-2 text-xs border ${
            isDarkMode
              ? "bg-[#111827] border-[#334155]"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div className="flex justify-between">
            <span className={isDarkMode ? "text-[#94A3B8]" : "text-slate-500"}>
              Location:
            </span>
            <span className="font-semibold">{donor.location}</span>
          </div>
          <div className="flex justify-between">
            <span className={isDarkMode ? "text-[#94A3B8]" : "text-slate-500"}>
              NBTS Verification:
            </span>
            <span className="text-[#008438] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined !text-[16px]">
                verified
              </span>
              Verified Donor ID #{donor.verificationId}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">
              Associated Blood Request ID *
            </label>
            <select
              required
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
              className={`w-full h-11 px-3 rounded-xl text-xs font-medium focus:outline-none border ${
                isDarkMode
                  ? "bg-[#111827] border-[#334155] text-[#F8FAFC]"
                  : "bg-slate-100 border-slate-200 text-[#0b1c30]"
              }`}
            >
              <option value="">Select your active blood request...</option>
              <option value="REQ-9021">
                REQ-9021 (National Hospital Colombo - Emergency ICU)
              </option>
              <option value="REQ-9044">
                REQ-9044 (Kalubowila Hospital - Thalassemia Ward)
              </option>
              <option value="NEW">+ Register Emergency Walk-in Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">
              Clinical Urgency Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "immediate", label: "Immediate (<2h)" },
                { id: "today", label: "Within 24h" },
                { id: "scheduled", label: "Scheduled" },
              ].map((item) => (
                <label key={item.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="urgency"
                    value={item.id}
                    checked={urgency === item.id}
                    onChange={() => setUrgency(item.id)}
                    className="sr-only peer"
                  />
                  <div
                    className={`p-2 text-center rounded-xl text-xs font-semibold transition-colors border ${
                      isDarkMode
                        ? "bg-[#111827] border-[#334155] peer-checked:bg-[#b70011] peer-checked:text-white"
                        : "bg-slate-100 border-slate-200 peer-checked:bg-[#b70011] peer-checked:text-white"
                    }`}
                  >
                    {item.label}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">
              Message for Donor (Auto-Translated)
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="State hospital department or attending physician notes..."
              className={`w-full p-3 rounded-xl text-xs focus:outline-none resize-none border ${
                isDarkMode
                  ? "bg-[#111827] border-[#334155] text-[#F8FAFC]"
                  : "bg-slate-100 border-slate-200 text-[#0b1c30]"
              }`}
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`w-1/2 h-11 rounded-xl text-xs font-semibold transition-colors border ${
                isDarkMode
                  ? "bg-[#111827] border-[#334155] text-[#CBD5E1] hover:bg-[#334155]"
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 h-11 rounded-xl bg-[#b70011] text-white font-semibold text-xs hover:brightness-110 transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined !text-[18px]">
                verified
              </span>
              <span>Send Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}