import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function FulfillModal({ request, onClose, onConfirm }) {
  const { isDarkMode } = useApp();
  const [donorName, setDonorName] = useState("Dr. Sarah Vance");
  const [eta, setEta] = useState("Within 45 Minutes (Immediate Emergency)");

  if (!request) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(request);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div
        className={`rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6 border ${
          isDarkMode
            ? "bg-[#1E293B] border-[#334155] text-[#F8FAFC]"
            : "bg-white border-slate-100 text-[#0b1c30]"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-5 right-5 p-1 rounded-lg transition-colors ${
            isDarkMode ? "hover:bg-[#334155]" : "hover:bg-slate-100"
          }`}
        >
          <span className="material-symbols-outlined !text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#b70011] flex items-center justify-center">
            <span className="material-symbols-outlined !text-[24px]">
              bloodtype
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold">Volunteer Donation</h3>
            <p
              className={`text-xs ${
                isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
              }`}
            >
              Step forward to save a life today
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className={`p-3 rounded-xl border ${
              isDarkMode
                ? "bg-[#111827] border-[#334155]"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="text-[10px] uppercase font-bold text-[#b70011]">
              Target Request
            </div>
            <div className="text-sm font-semibold mt-0.5">
              {request.id === "NEW"
                ? "New Emergency Dispatch Broadcast"
                : `${request.bloodGroup} Blood Units at ${request.hospital}`}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">
              Your Full Name / Donor ID
            </label>
            <input
              type="text"
              required
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="e.g. Kasun Fernando"
              className={`w-full px-3 py-2 rounded-xl text-xs font-medium focus:outline-none border ${
                isDarkMode
                  ? "bg-[#111827] border-[#334155] text-[#F8FAFC]"
                  : "bg-slate-100 border-slate-200 text-[#0b1c30]"
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">
              Estimated Arrival Time to Hospital
            </label>
            <select
              value={eta}
              onChange={(e) => setEta(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl text-xs font-medium focus:outline-none border ${
                isDarkMode
                  ? "bg-[#111827] border-[#334155] text-[#F8FAFC]"
                  : "bg-slate-100 border-slate-200 text-[#0b1c30]"
              }`}
            >
              <option value="Within 45 Minutes (Immediate Emergency)">
                Within 45 Minutes (Immediate Emergency)
              </option>
              <option value="Within 2 Hours">Within 2 Hours</option>
              <option value="Later Today">Later Today</option>
            </select>
          </div>

          <div className="p-3 bg-[#ffdad6]/40 rounded-xl text-xs text-[#93000a] flex items-start gap-2">
            <span className="material-symbols-outlined text-[#b70011] !text-[18px] shrink-0 mt-0.5">
              info
            </span>
            <span>
              By submitting, the emergency transfusion desk at the hospital will
              be notified and can contact you directly via your registered
              number.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors border ${
                isDarkMode
                  ? "bg-[#111827] border-[#334155] text-[#CBD5E1] hover:bg-[#334155]"
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#b70011] text-white font-semibold text-xs rounded-xl hover:brightness-110 transition-colors shadow-sm"
            >
              Confirm &amp; Notify Desk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}