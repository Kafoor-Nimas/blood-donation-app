import React from "react";
import { useApp } from "../context/AppContext";

export default function HowItWorks() {
  const { isDarkMode } = useApp();

  const steps = [
    {
      step: "01",
      title: "Create an Account",
      desc: "Register in under two minutes with basic contact and identification details verified securely.",
      icon: "badge",
      tag: "Fast Digital ID",
    },
    {
      step: "02",
      title: "Register as a Donor",
      desc: "Record blood type, recent donation history, and availability radius for emergency mobile dispatches.",
      icon: "health_and_safety",
      tag: "Health Pre-Screened",
    },
    {
      step: "03",
      title: "Find or Request Blood",
      desc: "Instantly search by hospital proximity or create an urgent flagged requisition for immediate blast.",
      icon: "radar",
      tag: "Geo-Targeted Match",
    },
    {
      step: "04",
      title: "Make a Difference",
      desc: "Connect directly with healthcare teams, coordinate donation at the facility, and save precious lives.",
      icon: "celebration",
      tag: "Life Saved",
    },
  ];

  return (
    <section
      className={`w-full py-20 px-6 lg:px-12 transition-colors ${
        isDarkMode ? "bg-[#111827]" : "bg-[#eff4ff]/60"
      }`}
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#b70011] font-bold">
            Streamlined Logistics
          </span>
          <h2
            className={`text-3xl font-bold tracking-tight mt-1 mb-3 ${
              isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
            }`}
          >
            Saving Lives Starts With You
          </h2>
          <p
            className={`text-sm ${
              isDarkMode ? "text-[#CBD5E1]" : "text-[#5c403c]"
            }`}
          >
            A seamless digital pathway designed to eliminate delays in
            critical clinical situations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((stepItem, i) => (
            <div
              key={i}
              className={`relative flex flex-col items-start p-6 rounded-2xl shadow-sm border ${
                isDarkMode
                  ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
                  : "bg-white border-slate-100 text-[#0b1c30]"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#b70011] text-white flex items-center justify-center font-bold text-base mb-5 shadow-sm">
                {stepItem.step}
              </div>
              <h3
                className={`text-base font-semibold mb-2 ${
                  isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                }`}
              >
                {stepItem.title}
              </h3>
              <p
                className={`text-xs leading-relaxed ${
                  isDarkMode ? "text-[#94A3B8]" : "text-[#5c403c]"
                }`}
              >
                {stepItem.desc}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-[#b70011] text-xs font-semibold">
                <span className="material-symbols-outlined !text-[16px]">
                  {stepItem.icon}
                </span>
                <span>{stepItem.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}