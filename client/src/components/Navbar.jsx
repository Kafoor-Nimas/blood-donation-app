import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { isDarkMode, setIsDarkMode } = useApp();

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl transition-colors border-b ${
        isDarkMode
          ? "bg-[#0F172A]/90 border-[#334155] text-[#F8FAFC]"
          : "bg-white/90 border-slate-100 text-[#0b1c30]"
      }`}
    >
      <div className="h-16 max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span
            className="material-symbols-outlined !text-[28px] text-[#b70011]"
            style={{ fontSize: "28px" }}
          >
            bloodtype
          </span>
          <span className="font-bold text-xl tracking-tight text-[#b70011]">
            LifeLink
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {[
            { name: "Home", href: "/" },
            { name: "Find Donors", href: "/find-donors" },
            { name: "Blood Requests", href: "/blood-requests" },
            { name: "About Us", href: "/about-us" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                isDarkMode
                  ? "text-[#CBD5E1] hover:text-white hover:bg-[#1E293B]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          {/* Search Input Tag */}
          <div className="relative flex items-center">
            <span
              className="material-symbols-outlined absolute left-3 pointer-events-none text-[18px]"
              style={{ color: isDarkMode ? "#94A3B8" : "#64748B" }}
            >
              search
            </span>
            <input
              type="text"
              placeholder="Search donors, requests..."
              className={`w-36 sm:w-48 lg:w-60 text-xs pl-9 pr-8 py-2 rounded-xl border focus:outline-none transition-all ${
                isDarkMode
                  ? "bg-[#1E293B] border-[#334155] text-[#F8FAFC] placeholder-slate-400 focus:border-[#38BDF8]"
                  : "bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white"
              }`}
            />
            <kbd
              className={`hidden xl:inline-block absolute right-2.5 text-[10px] px-1.5 py-0.5 rounded font-mono pointer-events-none ${
                isDarkMode
                  ? "bg-[#0F172A] text-slate-400"
                  : "bg-white border border-slate-200 text-slate-400"
              }`}
            >
              ⌘K
            </kbd>
          </div>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            aria-label="Toggle dark mode"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl transition-colors ${
              isDarkMode
                ? "text-amber-400 hover:bg-[#1E293B]"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className="material-symbols-outlined !text-[20px]">
              {isDarkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>

          {/* Profile Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-[#334155]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2G3ltv8cQ0E23GIppn5aiMa68EYbw57Pw7NkBgHnBSezo_ivW0UrmgeHupmUISKVRWvOUot1oYvVyf_pLNs9xj8iolBHWPks9S-9CDvQYJM9LVO0LCF5BayrrXNFoT48c4nyajlq8wCIOfPwf3ArV2AooSQrERdporSrdN5SPNgr7Q-gH5BwKrBi9hmnrS56K3c2Tcs3J5Rr7bWQZ4Qju0OqGVW27sT8OMp21RcaN"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#b70011]/30"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span
                className={`text-xs font-semibold ${
                  isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                }`}
              >
                Dr. Sarah Vance
              </span>
              <span className="text-[10px] text-[#b70011] uppercase font-bold tracking-wider">
                Requester
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
