import { useApp } from "../context/AppContext";

export default function Footer() {
  const { isDarkMode } = useApp();

  return (
    <footer
      className={`w-full transition-colors border-t ${
        isDarkMode
          ? "bg-[#0F172A] border-[#334155] text-[#CBD5E1]"
          : "bg-[#eff4ff]/60 border-slate-200 text-[#0b1c30]"
      }`}
    >
      {/* Helpline Banner */}
      <div className="bg-[#ffdad6] text-[#93000a] py-3 px-6 lg:px-12 border-b border-[#e6bdb8]">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b70011] !text-[20px]">
              emergency
            </span>
            <span className="font-semibold text-xs sm:text-sm">
              Critical Transfusion Helpline:
            </span>
            <span className="font-bold text-sm sm:text-base text-[#b70011]">
              1-800-LIFE-BLOOD
            </span>
          </div>
          <span className="text-xs font-medium">
            24/7 National Emergency Blood Dispatch &amp; Logistics Network
          </span>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <a href="/" className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined !text-[24px] text-[#b70011]">
                bloodtype
              </span>
              <span className="font-bold text-lg text-[#b70011]">LifeLink</span>
            </a>
            <p
              className={`text-xs leading-relaxed ${
                isDarkMode ? "text-[#94A3B8]" : "text-slate-600"
              }`}
            >
              Next-generation blood donation management and immediate clinical
              donor matching infrastructure.
            </p>
          </div>

          <div>
            <h4
              className={`font-semibold text-sm mb-3 ${
                isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
              }`}
            >
              Operations
            </h4>
            <ul
              className={`space-y-2 text-xs ${
                isDarkMode ? "text-[#94A3B8]" : "text-slate-600"
              }`}
            >
              <li>
                <a
                  href="/find-donors"
                  className="hover:text-[#b70011] transition-colors"
                >
                  Find Donors
                </a>
              </li>
              <li>
                <a
                  href="/blood-requests"
                  className="hover:text-[#b70011] transition-colors"
                >
                  Active Blood Requests
                </a>
              </li>
              <li>
                <a
                  href="/create-request"
                  className="hover:text-[#b70011] transition-colors"
                >
                  Post Emergency Request
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className={`font-semibold text-sm mb-3 ${
                isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
              }`}
            >
              Organization
            </h4>
            <ul
              className={`space-y-2 text-xs ${
                isDarkMode ? "text-[#94A3B8]" : "text-slate-600"
              }`}
            >
              <li>
                <a
                  href="/about-us"
                  className="hover:text-[#b70011] transition-colors"
                >
                  About LifeLink
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#b70011] transition-colors">
                  Clinical Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#b70011] transition-colors">
                  Hospital Integration
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className={`font-semibold text-sm mb-3 ${
                isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
              }`}
            >
              Compliance &amp; Security
            </h4>
            <ul
              className={`space-y-2 text-xs ${
                isDarkMode ? "text-[#94A3B8]" : "text-slate-600"
              }`}
            >
              <li>
                <a href="#" className="hover:text-[#b70011] transition-colors">
                  HIPAA Verification
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#b70011] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#b70011] transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${
            isDarkMode
              ? "border-[#334155] text-[#94A3B8]"
              : "border-slate-200 text-slate-500"
          }`}
        >
          <p>
            © 2026 LifeLink Healthcare Logistics Systems. All rights reserved.
          </p>
          <p className="font-semibold">
            Clinical Grade SLA &amp; Transfusion Security Compliant
          </p>
        </div>
      </div>
    </footer>
  );
}
