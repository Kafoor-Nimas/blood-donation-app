import React from "react";

export default function CallToAction() {
  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-20 w-full">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#b70011] via-[#dc2626] to-[#b70011] text-white p-8 lg:p-14 shadow-xl">
        <div className="relative z-10 max-w-3xl flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs uppercase font-semibold">
            <span className="material-symbols-outlined !text-[16px]">
              favorite
            </span>
            Every Second Matters
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            Your One Decision Could Change Someone's Life.
          </h2>
          <p className="text-sm lg:text-base text-white/90 max-w-xl">
            Join thousands of compassionate donors today. It takes less than 2
            minutes to register, and you could be the only person who can help
            someone in your community tomorrow.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
            <a
              href="/create-request"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-[#b70011] font-semibold text-sm hover:bg-slate-100 transition-all shadow-md"
            >
              <span className="material-symbols-outlined !text-[20px]">
                favorite
              </span>
              <span>Become a Donor</span>
            </a>
            <a
              href="/find-donors"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/15 backdrop-blur-md text-white font-semibold text-sm hover:bg-white/25 transition-all"
            >
              <span className="material-symbols-outlined !text-[20px]">
                search
              </span>
              <span>Find Donors</span>
            </a>
          </div>

          <div className="pt-4 flex items-center gap-3 text-white/90 text-xs">
            <span className="material-symbols-outlined !text-[18px]">
              support_agent
            </span>
            <span>
              Need immediate hospital dispatch coordination? Call{" "}
              <strong>1-800-LIFE-BLOOD</strong> (Toll-Free, 24/7)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}