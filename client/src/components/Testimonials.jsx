import React from "react";
import { useApp } from "../context/AppContext";

export default function Testimonials() {
  const { isDarkMode } = useApp();

  const stories = [
    {
      quote:
        '"When my daughter required an emergency transfusion during open-heart surgery at Colombo National, LifeLink mobilized two O- donors within 35 minutes. They gave her a second chance at life."',
      name: "Nadeeka Perera",
      role: "Mother of patient • Colombo",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQNDMHgXnHCXD7a9roKnBMWGSN5v9Qpqk_LS79Dwh_r-J8eoG9LpKsDjkLl5eQOiS9gOqWq-XiKcrDCCTJhzomAosiZlk4aSJRwjaECE5PS9dBgwZI1bHWzzPh5zPQ7epVven8DRWe1LLkyKq2_ZY3sn6RaUhWf4BoWHDIXaddIrcGCB2HLkJbNSYWvxqKqIk8tdF514EQi3h56QMze0DGegV7ZeiWBFF9uIGx680l",
    },
    {
      quote:
        '"I\'ve donated 14 times through local camps, but being notified on LifeLink that a patient 3km away urgently needed my exact blood group made the impact feel intensely real and immediate."',
      name: "Rohan Senaratne",
      role: "Regular Donor (B+) • Kandy",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRXSfZcBk30Z89O6jnXexbDjCixZwmqkha3tZjx6XS_40lHkQmc4WyPFXtk1fYeg2Jb_COr73trU76LFFHFhrLR1qgye9c8YrKaWHkXpDEH9B2UXLWVKFB9vOd8fwavgPiju7H_Gv7vRQfIaszlPHPKyiY-EVM44b7cixzn_-cNDDnGUlIpTFdIqbsyD7oCTEFgk39_IAn34QLg4HfOY0UwWMU6osaN__Hi9kyPam-",
    },
    {
      quote:
        '"As an emergency physician on night shifts, having LifeLink drastically cuts the time our clinical staff spends making cold calls during mass casualty influxes. A transformative tool."',
      name: "Dr. Malik Jayawardena",
      role: "Trauma Specialist • Karapitiya",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSWvcRqNwngEFEa0hoNOobqvI4_EEH5YQrjNYAU1ZSj4rcUN5CKA4dq523xC2l3UZX73an2VIbpJuuiIxDluDxSXPNP8Hzj5c-1fQDH0KPy1skTc32OH-Ydi0PYSP71VrDBh1I81I0IaBUE63H693E3BnGejOh34aobBIFsTLwzXiNQ9oTWKoJ2YxEUZ_Dc5WJQ9m7RSM6kbQ1Nia9KGCjSY84dieGpHJ54HM3EsCK",
    },
  ];

  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 w-full">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest text-[#b70011] font-bold">
          Real Stories
        </span>
        <h2
          className={`text-3xl font-bold tracking-tight mt-1 mb-2 ${
            isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
          }`}
        >
          Stories That Inspire Hope
        </h2>
        <p
          className={`text-sm ${
            isDarkMode ? "text-[#CBD5E1]" : "text-[#5c403c]"
          }`}
        >
          Read firsthand accounts from families, medical professionals, and hero
          donors across the nation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((t, i) => (
          <div
            key={i}
            className={`rounded-2xl p-6 shadow-sm flex flex-col justify-between border ${
              isDarkMode
                ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
                : "bg-white border-slate-100 text-[#0b1c30]"
            }`}
          >
            <div>
              <div className="flex items-center gap-1 text-[#b70011] mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="material-symbols-outlined !text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p
                className={`text-sm italic mb-6 ${
                  isDarkMode ? "text-[#CBD5E1]" : "text-[#5c403c]"
                }`}
              >
                {t.quote}
              </p>
            </div>
            <div
              className={`flex items-center gap-3 pt-4 border-t ${
                isDarkMode ? "border-[#334155]" : "border-slate-100"
              }`}
            >
              <img
                src={t.img}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4
                  className={`font-semibold text-sm ${
                    isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                  }`}
                >
                  {t.name}
                </h4>
                <span
                  className={`text-xs ${
                    isDarkMode ? "text-[#94A3B8]" : "text-[#5c403c]"
                  }`}
                >
                  {t.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}