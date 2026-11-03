import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { isDarkMode, setIsDarkMode, user, isAuthenticated, logout } = useApp();

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
        <Link to="/" className="flex items-center gap-2">
          <span
            className="material-symbols-outlined !text-[28px] text-[#b70011]"
            style={{ fontSize: "28px" }}
          >
            bloodtype
          </span>
          <span className="font-bold text-xl tracking-tight text-[#b70011]">
            LifeLink
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {[
            { name: "Home", href: "/" },
            { name: "Find Donors", href: "/find-donors" },
            { name: "Blood Requests", href: "/blood-requests" },
            { name: "About Us", href: "/about-us" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                isDarkMode
                  ? "text-[#CBD5E1] hover:text-white hover:bg-[#1E293B]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
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
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDarkMode
                ? "text-amber-400 hover:bg-[#1E293B]"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className="material-symbols-outlined !text-[20px]">
              {isDarkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>

          {/* Auth State Conditional Rendering */}
          <div
            className={`pl-2 border-l ${
              isDarkMode ? "border-[#334155]" : "border-slate-200"
            }`}
          >
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <img
                    src={
                      user?.avatar ||
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2G3ltv8cQ0E23GIppn5aiMa68EYbw57Pw7NkBgHnBSezo_ivW0UrmgeHupmUISKVRWvOUot1oYvVyf_pLNs9xj8iolBHWPks9S-9CDvQYJM9LVO0LCF5BayrrXNFoT48c4nyajlq8wCIOfPwf3ArV2AooSQrERdporSrdN5SPNgr7Q-gH5BwKrBi9hmnrS56K3c2Tcs3J5Rr7bWQZ4Qju0OqGVW27sT8OMp21RcaN"
                    }
                    alt={user?.name || "Profile"}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#b70011]/30"
                  />
                  <div className="hidden sm:flex flex-col text-left">
                    <span
                      className={`text-xs font-semibold ${
                        isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                      }`}
                    >
                      {user?.name || "Dr. Sarah Vance"}
                    </span>
                    <span className="text-[10px] text-[#b70011] uppercase font-bold tracking-wider">
                      {user?.role || "Requester"}
                    </span>
                  </div>
                </Link>

                {/* Optional Logout Action */}
                {logout && (
                  <button
                    onClick={logout}
                    title="Sign Out"
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isDarkMode
                        ? "text-slate-400 hover:text-red-400 hover:bg-[#1E293B]"
                        : "text-slate-500 hover:text-red-600 hover:bg-slate-100"
                    }`}
                  >
                    <span className="material-symbols-outlined !text-[18px]">
                      logout
                    </span>
                  </button>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#dc2626] hover:bg-[#b70011] text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined !text-[16px]">
                  login
                </span>
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}