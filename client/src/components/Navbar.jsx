import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const {
    isDarkMode,
    setIsDarkMode,
    user,
    isAuthenticated,
    logout,
    recentDonors,
    requests,
  } = useApp();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    if (logout) logout();
    navigate("/login");
  };

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return { donors: [], requests: [] };

    const donorsList = Array.isArray(recentDonors) ? recentDonors : [];
    const requestsList = Array.isArray(requests) ? requests : [];

    const matchedDonors = donorsList
      .filter((donor) => {
        const name = (donor.name || donor.userName || "").toLowerCase();
        const blood = (
          donor.bloodGroup ||
          donor.group ||
          donor.blood ||
          ""
        ).toLowerCase();
        const district = (
          donor.district ||
          donor.city ||
          donor.location ||
          ""
        ).toLowerCase();
        const role = (donor.role || "").toLowerCase();
        const email = (donor.email || "").toLowerCase();

        return (
          name.includes(query) ||
          blood.includes(query) ||
          district.includes(query) ||
          role.includes(query) ||
          email.includes(query)
        );
      })
      .slice(0, 4);

    const matchedRequests = requestsList
      .filter((req) => {
        const hospital = (req.hospitalName || req.hospital || "").toLowerCase();
        const blood = (req.bloodGroup || req.blood || "").toLowerCase();
        const patient = (req.patientName || req.requester || "").toLowerCase();
        const city = (req.city || req.district || "").toLowerCase();

        return (
          hospital.includes(query) ||
          blood.includes(query) ||
          patient.includes(query) ||
          city.includes(query)
        );
      })
      .slice(0, 4);

    return { donors: matchedDonors, requests: matchedRequests };
  }, [searchQuery, recentDonors, requests]);

  const hasResults =
    searchResults.donors.length > 0 || searchResults.requests.length > 0;

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/find-donors?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
          {/* Search Input Container */}
          <div className="relative flex items-center" ref={searchRef}>
            <span
              className="material-symbols-outlined absolute left-3 pointer-events-none text-[18px]"
              style={{ color: isDarkMode ? "#94A3B8" : "#64748B" }}
            >
              search
            </span>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={handleSearchSubmit}
              placeholder="Search donors, requests..."
              className={`w-36 sm:w-48 lg:w-60 text-xs pl-9 pr-8 py-2 rounded-xl border focus:outline-none transition-all ${
                isDarkMode
                  ? "bg-[#1E293B] border-[#334155] text-[#F8FAFC] placeholder-slate-400 focus:border-[#38BDF8]"
                  : "bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white"
              }`}
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSearchOpen(false);
                }}
                className="absolute right-2.5 text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-[16px]">
                  close
                </span>
              </button>
            ) : (
              <kbd
                className={`hidden xl:inline-block absolute right-2.5 text-[10px] px-1.5 py-0.5 rounded font-mono pointer-events-none ${
                  isDarkMode
                    ? "bg-[#0F172A] text-slate-400"
                    : "bg-white border border-slate-200 text-slate-400"
                }`}
              >
                ⌘K
              </kbd>
            )}

            {/* Live Search Results Popup Menu */}
            {searchOpen && searchQuery.trim().length > 0 && (
              <div
                className={`absolute left-0 right-0 top-11 w-72 sm:w-80 rounded-2xl shadow-xl py-3 border z-50 transition-all ${
                  isDarkMode
                    ? "bg-[#1E293B] border-[#334155] text-[#F8FAFC]"
                    : "bg-white border-slate-100 text-[#0b1c30]"
                }`}
              >
                {!hasResults ? (
                  <div className="px-4 py-3 text-center text-xs text-slate-400">
                    No matching donors or requests found.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto px-2">
                    {/* Donors Group */}
                    {searchResults.donors.length > 0 && (
                      <div>
                        <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-[#b70011]">
                          Donors ({searchResults.donors.length})
                        </div>
                        {searchResults.donors.map((donor) => (
                          <div
                            key={donor._id || donor.id}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery("");
                              navigate("/find-donors");
                            }}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-colors ${
                              isDarkMode
                                ? "hover:bg-[#0F172A]"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-red-100 text-[#b70011] font-bold text-[10px] flex items-center justify-center shrink-0">
                                {donor.bloodGroup || donor.group || "O+"}
                              </span>
                              <div className="truncate max-w-[130px]">
                                <p className="font-semibold truncate">
                                  {donor.name}
                                </p>
                                <p className="text-[10px] text-slate-400 truncate">
                                  {donor.district || donor.city || "Colombo"}
                                </p>
                              </div>
                            </div>
                            <span className="material-symbols-outlined text-[16px] text-slate-400">
                              chevron_right
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Blood Requests Group */}
                    {searchResults.requests.length > 0 && (
                      <div>
                        <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-amber-500">
                          Blood Requests ({searchResults.requests.length})
                        </div>
                        {searchResults.requests.map((req) => (
                          <div
                            key={req._id || req.id}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery("");
                              navigate("/blood-requests");
                            }}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-colors ${
                              isDarkMode
                                ? "hover:bg-[#0F172A]"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                                {req.bloodGroup || "O+"}
                              </span>
                              <div className="truncate max-w-[130px]">
                                <p className="font-semibold truncate">
                                  {req.hospitalName ||
                                    req.hospital ||
                                    "Hospital"}
                                </p>
                                <p className="text-[10px] text-slate-400 truncate">
                                  For {req.patientName || "Patient"}
                                </p>
                              </div>
                            </div>
                            <span className="material-symbols-outlined text-[16px] text-slate-400">
                              chevron_right
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
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
              <div className="relative" ref={dropdownRef}>
                {/* User Dropdown Trigger */}
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className={`flex items-center gap-2 p-1 rounded-xl transition-all cursor-pointer ${
                    isDarkMode ? "hover:bg-[#1E293B]" : "hover:bg-slate-100"
                  }`}
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
                      {user?.name || "User"}
                    </span>
                    <span className="text-[10px] text-[#b70011] uppercase font-bold tracking-wider">
                      {user?.role || "Donor"}
                    </span>
                  </div>
                  <span
                    className={`material-symbols-outlined !text-[18px] transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-xl py-2 border z-50 transition-all ${
                      isDarkMode
                        ? "bg-[#1E293B] border-[#334155] text-[#F8FAFC]"
                        : "bg-white border-slate-100 text-[#0b1c30]"
                    }`}
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-[#334155]">
                      <p className="text-xs font-bold truncate">
                        {user?.name || "User"}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {user?.email || ""}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className={`flex items-center gap-2.5 px-4 py-2 text-xs font-semibold transition-colors ${
                          isDarkMode
                            ? "hover:bg-[#111827] text-slate-200"
                            : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span className="material-symbols-outlined !text-[18px]">
                          account_circle
                        </span>
                        <span>Profile</span>
                      </Link>

                      <Link
                        to="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className={`flex items-center gap-2.5 px-4 py-2 text-xs font-semibold transition-colors ${
                          isDarkMode
                            ? "hover:bg-[#111827] text-slate-200"
                            : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span className="material-symbols-outlined !text-[18px] text-amber-500">
                          admin_panel_settings
                        </span>
                        <span>Admin Dashboard</span>
                      </Link>

                      <Link
                        to="/create-request"
                        onClick={() => setDropdownOpen(false)}
                        className={`flex items-center gap-2.5 px-4 py-2 text-xs font-semibold transition-colors ${
                          isDarkMode
                            ? "hover:bg-[#111827] text-slate-200"
                            : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span className="material-symbols-outlined !text-[18px] text-[#b70011]">
                          add_circle
                        </span>
                        <span>Create Blood Request</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100 dark:border-[#334155]">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
                      >
                        <span className="material-symbols-outlined !text-[18px]">
                          logout
                        </span>
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
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
