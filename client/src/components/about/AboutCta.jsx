import { Link } from "react-router-dom";

export default function AboutCta() {
  return (
    <section className="py-16 lg:py-24 bg-transparent">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="rounded-3xl bg-gradient-to-r from-[#dc2626] via-[#b70011] to-[#93000b] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-white/20">
          {/* Ambient background glows */}
          <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -top-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="text-center max-w-3xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 border border-white/30 text-xs font-semibold uppercase tracking-wider mb-6">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
              Join The Lifesavers
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
              Be Someone's Reason to Smile Today.
            </h2>

            <p className="text-white/90 text-base lg:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Join the LifeLink community and take a step towards helping people in need of blood. One simple registration can save up to three lives.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link
                to="/register"
                className="flex min-w-[190px] cursor-pointer items-center justify-center rounded-xl h-12 px-8 bg-white text-[#b70011] text-base font-bold tracking-[0.015em] hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                <span>Register as a Donor</span>
              </Link>
              <Link
                to="/find-donors"
                className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-12 px-8 border-2 border-white/80 text-white text-base font-bold tracking-[0.015em] hover:bg-white/10 transition-all active:scale-95"
              >
                <span>Find Blood Donors</span>
              </Link>
            </div>

            {/* Helpline Bar */}
            <div className="mt-12 pt-8 border-t border-white/20 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-white/90">
              <div className="flex items-center gap-2 font-semibold">
                <span className="material-symbols-outlined text-base">
                  support_agent
                </span>
                <span>24/7 National Emergency Blood Dispatch:</span>
              </div>
              <a
                href="tel:18005433546"
                className="font-bold underline text-white hover:text-white/80 text-sm"
              >
                1-800-LIFELINK (543-3546)
              </a>
              <span className="hidden sm:inline text-white/40">•</span>
              <span className="text-white/80">Zero fees • Completely voluntary</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}