import { useState, useMemo, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DonorCard from "../components/DonorCard";
import ContactModal from "../components/ContactModal";
import ProfileModal from "../components/ProfileModal";
import { useApp } from "../context/AppContext";
import API from "../services/api";
import { INITIAL_DONORS_DATA } from "../data/data";

export default function FindDonors() {
  const { isDarkMode } = useApp();

  // Data & API States
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Filter States
  const [activeGroup, setActiveGroup] = useState("ALL");
  const [activeDistrict, setActiveDistrict] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(true);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Modal States
  const [contactDonor, setContactDonor] = useState(null);
  const [profileDonor, setProfileDonor] = useState(null);

  // 1. Fetch Donors from Backend API
  const fetchDonors = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await API.get("/donors");

      // Extract array payload safely whether wrapped or direct
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.donors || response.data?.data || INITIAL_DONORS_DATA;

      setDonors(data);
    } catch (error) {
      console.error("Failed to fetch donor directory:", error);
      setErrorMessage(
        "Could not load live donor network. Showing cached results.",
      );
      // Fallback to initial mock data on error so UI remains responsive
      setDonors(INITIAL_DONORS_DATA || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // Reset to Page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeGroup,
    activeDistrict,
    searchQuery,
    showAvailableOnly,
    itemsPerPage,
  ]);

  // 2. Filter Logic (Applies to fetched API donor array)
  const filteredDonors = useMemo(() => {
    const list = Array.isArray(donors) ? donors : [];

    return list.filter((donor) => {
      // Blood Group filter matching either 'group' or 'bloodGroup' keys
      const donorGroup = donor.group || donor.bloodGroup;
      if (activeGroup !== "ALL" && donorGroup !== activeGroup) return false;

      // District filter
      if (activeDistrict !== "ALL" && donor.district !== activeDistrict)
        return false;

      // Availability filter
      const isAvailable =
        donor.available !== undefined ? donor.available : donor.isAvailable;
      if (showAvailableOnly && !isAvailable) return false;

      // City / Location Free Search
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const fullText =
          `${donor.name || ""} ${donor.location || ""} ${donor.city || ""} ${donor.facility || ""}`.toLowerCase();
        if (!fullText.includes(query)) return false;
      }

      return true;
    });
  }, [donors, activeGroup, activeDistrict, searchQuery, showAvailableOnly]);

  // 3. Pagination Calculations
  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDonors = useMemo(() => {
    return filteredDonors.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDonors, startIndex, itemsPerPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const resetAllFilters = () => {
    setActiveGroup("ALL");
    setActiveDistrict("ALL");
    setSearchQuery("");
    setShowAvailableOnly(true);
    setCurrentPage(1);
  };

  return (
    <div
      className={`w-full transition-colors font-body-md antialiased min-h-screen ${
        isDarkMode
          ? "bg-[#0F172A] text-[#F8FAFC]"
          : "bg-[#f8f9ff] text-[#0b1c30]"
      }`}
    >
      <Navbar />

      <main className="w-full pt-16">
        <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-12 py-8 space-y-8">
          {/* Privacy Alert Banner */}
          <div
            className={`w-full rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border ${
              isDarkMode
                ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
                : "bg-blue-100 border-slate-200 text-[#0b1c30]"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-[#b70011] shadow-sm flex-shrink-0 ${
                  isDarkMode ? "bg-[#111827]" : "bg-white"
                }`}
              >
                <span className="material-symbols-outlined !text-[22px]">
                  verified_user
                </span>
              </div>
              <div>
                <p className="font-semibold text-sm flex items-center gap-2">
                  <span>Donor Privacy &amp; Transfusion Safety Protocol</span>
                  <span className="bg-[#008438]/10 text-[#008438] px-2 py-0.5 rounded-full text-[10px] uppercase font-bold">
                    Active
                  </span>
                </p>
                <p
                  className={`text-xs mt-0.5 ${
                    isDarkMode ? "text-[#94A3B8]" : "text-slate-600"
                  }`}
                >
                  LifeLink strictly safeguards donor identities. Personal phone
                  numbers remain masked until verified clinical consent.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold self-end md:self-auto flex-shrink-0">
              <span className="material-symbols-outlined !text-[18px] text-[#008438]">
                check_circle
              </span>
              <span>SLMC &amp; NBTS Compliant</span>
            </div>
          </div>

          {/* API Error Notification */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined !text-[20px]">
                  warning
                </span>
                <span>{errorMessage}</span>
              </div>
              <button
                type="button"
                onClick={fetchDonors}
                className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 transition-colors text-xs font-bold"
              >
                Retry Live Fetch
              </button>
            </div>
          )}

          {/* Title & Stats Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-[#b70011] text-xs font-bold tracking-wider uppercase">
                <span className="material-symbols-outlined !text-[16px]">
                  radiology
                </span>
                <span>Island-Wide Transfusion Registry • Sri Lanka</span>
              </div>
              <h1
                className={`text-3xl lg:text-4xl font-bold tracking-tight ${
                  isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                }`}
              >
                Find Blood Donors
              </h1>
              <p
                className={`text-sm lg:text-base ${
                  isDarkMode ? "text-[#CBD5E1]" : "text-slate-600"
                }`}
              >
                Search qualified, volunteer donors indexed across all 25
                administrative districts with real-time biological eligibility
                tracking.
              </p>
            </div>

            {/* Quick Metrics */}
            <div
              className={`flex items-center gap-3 p-2 rounded-2xl shadow-sm self-start lg:self-auto border ${
                isDarkMode
                  ? "bg-[#1E293B] border-[#334155]"
                  : "bg-blue-50 border-slate-200"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl shadow-sm flex items-center gap-3 ${
                  isDarkMode ? "bg-[#111827]" : "bg-white"
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-[#b70011] animate-pulse" />
                <div>
                  <span
                    className={`block text-[10px] uppercase font-semibold ${
                      isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
                    }`}
                  >
                    Universal Donors (O-)
                  </span>
                  <span
                    className={`font-bold text-lg leading-tight ${
                      isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                    }`}
                  >
                    28{" "}
                    <span className="text-xs text-[#008438] font-semibold">
                      Ready
                    </span>
                  </span>
                </div>
              </div>

              <div
                className={`px-4 py-2 rounded-xl shadow-sm hidden sm:flex items-center gap-3 ${
                  isDarkMode ? "bg-[#111827]" : "bg-white"
                }`}
              >
                <span className="material-symbols-outlined text-[#38BDF8] !text-[24px]">
                  verified
                </span>
                <div>
                  <span
                    className={`block text-[10px] uppercase font-semibold ${
                      isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
                    }`}
                  >
                    NBTS Verified
                  </span>
                  <span
                    className={`font-bold text-lg leading-tight ${
                      isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                    }`}
                  >
                    98.4%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Multi-Filter Toolbar */}
          <div
            className={`rounded-2xl p-6 shadow-sm space-y-6 border ${
              isDarkMode
                ? "bg-[#1E293B] border-[#334155]"
                : "bg-white border-slate-100"
            }`}
          >
            {/* Blood Group Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined !text-[18px] text-[#b70011]">
                    bloodtype
                  </span>
                  <span>Blood Group Filter</span>
                </label>
                <span
                  className={`text-xs ${
                    isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
                  }`}
                >
                  Select specific antigen compatibility
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {["ALL", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (grp) => (
                    <button
                      key={grp}
                      type="button"
                      onClick={() => setActiveGroup(grp)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        activeGroup === grp
                          ? "bg-[#b70011] text-white shadow-sm"
                          : isDarkMode
                            ? "bg-[#111827] text-[#CBD5E1] hover:bg-[#334155]"
                            : "bg-blue-50 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {grp === "ALL" ? "All Groups" : grp}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* District & City Search Controls */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-2">
              {/* District Dropdown */}
              <div className="md:col-span-4 space-y-1.5">
                <label className="text-xs font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined !text-[18px] text-[#38BDF8]">
                    explore
                  </span>
                  <span>District</span>
                </label>
                <div className="relative">
                  <select
                    value={activeDistrict}
                    onChange={(e) => setActiveDistrict(e.target.value)}
                    className={`w-full h-11 px-3.5 pr-10 rounded-xl text-xs font-medium appearance-none focus:outline-none cursor-pointer transition-colors border ${
                      isDarkMode
                        ? "bg-[#111827] border-[#334155] text-[#F8FAFC]"
                        : "bg-blue-50 border-slate-200 text-[#0b1c30]"
                    }`}
                  >
                    <option value="ALL">All Island Districts (25)</option>
                    <option value="Colombo">Colombo (Western)</option>
                    <option value="Gampaha">Gampaha (Western)</option>
                    <option value="Kalutara">Kalutara (Western)</option>
                    <option value="Kandy">Kandy (Central)</option>
                    <option value="Matale">Matale (Central)</option>
                    <option value="Galle">Galle (Southern)</option>
                    <option value="Matara">Matara (Southern)</option>
                    <option value="Jaffna">Jaffna (Northern)</option>
                    <option value="Kurunegala">
                      Kurunegala (North Western)
                    </option>
                    <option value="Anuradhapura">
                      Anuradhapura (North Central)
                    </option>
                    <option value="Badulla">Badulla (Uva)</option>
                    <option value="Ratnapura">Ratnapura (Sabaragamuwa)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 !text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* City Free Search */}
              <div className="md:col-span-5 space-y-1.5">
                <label className="text-xs font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined !text-[18px] text-[#38BDF8]">
                    location_city
                  </span>
                  <span>City / Municipality</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 !text-[20px]">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Dehiwala, Maharagama, Peradeniya..."
                    className={`w-full h-11 pl-11 pr-10 rounded-xl text-xs font-medium focus:outline-none transition-colors border ${
                      isDarkMode
                        ? "bg-[#111827] border-[#334155] text-[#F8FAFC] placeholder-slate-500"
                        : "bg-blue-50 border-slate-200 text-[#0b1c30] placeholder-slate-400"
                    }`}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <span className="material-symbols-outlined !text-[18px]">
                        close
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Reset Button */}
              <div className="md:col-span-3 flex items-center justify-end">
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className={`w-full h-11 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors border cursor-pointer ${
                    isDarkMode
                      ? "bg-[#111827] border-[#334155] text-[#F8FAFC] hover:bg-[#334155]"
                      : "bg-blue-50 border-slate-200 text-[#0b1c30] hover:bg-slate-200"
                  }`}
                >
                  <span className="material-symbols-outlined !text-[18px]">
                    restart_alt
                  </span>
                  <span>Reset Filters</span>
                </button>
              </div>
            </div>

            {/* Filter Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-[#334155]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#008438]" />
                <p className="text-xs font-semibold">
                  <span className="text-xl text-[#b70011] font-bold mr-1">
                    {filteredDonors.length}
                  </span>
                  <span
                    className={isDarkMode ? "text-[#94A3B8]" : "text-slate-600"}
                  >
                    Verified Donors Matching Criteria
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showAvailableOnly}
                    onChange={(e) => setShowAvailableOnly(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-[#334155] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#008438] relative" />
                  <span className="text-xs font-semibold">
                    Show Available Donors Only
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Active Filter Pills Row */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span
              className={`uppercase tracking-wider font-semibold ${
                isDarkMode ? "text-[#94A3B8]" : "text-slate-400"
              }`}
            >
              Active Filters:
            </span>
            <span
              className={`px-3 py-1 rounded-full font-semibold border ${
                isDarkMode
                  ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
                  : "bg-blue-50 border-slate-200 text-slate-700"
              }`}
            >
              Group: {activeGroup}
            </span>
            <span
              className={`px-3 py-1 rounded-full font-semibold border ${
                isDarkMode
                  ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
                  : "bg-blue-50 border-slate-200 text-slate-700"
              }`}
            >
              District: {activeDistrict}
            </span>
            {searchQuery && (
              <span
                className={`px-3 py-1 rounded-full font-semibold border ${
                  isDarkMode
                    ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
                    : "bg-blue-50 border-slate-200 text-slate-700"
                }`}
              >
                Search: "{searchQuery}"
              </span>
            )}
            {showAvailableOnly && (
              <span className="px-3 py-1 rounded-full font-semibold bg-[#008438]/10 text-[#008438] flex items-center gap-1">
                <span className="material-symbols-outlined !text-[14px]">
                  check
                </span>
                Eligible Today
              </span>
            )}
          </div>

          {/* Donors Grid Loading Skeleton / Content / Empty State */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`h-64 rounded-2xl animate-pulse border ${
                    isDarkMode
                      ? "bg-[#1E293B] border-[#334155]"
                      : "bg-slate-200 border-slate-100"
                  }`}
                />
              ))}
            </div>
          ) : currentDonors.length === 0 ? (
            <div
              className={`rounded-2xl p-12 text-center shadow-sm max-w-xl mx-auto my-8 space-y-4 border ${
                isDarkMode
                  ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
                  : "bg-white border-slate-100 text-[#0b1c30]"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-[#ffdad6] mx-auto flex items-center justify-center text-[#b70011]">
                <span className="material-symbols-outlined !text-[32px]">
                  manage_search
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">No Donors Found</h3>
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
                  }`}
                >
                  No active donors match your currently selected parameters. Try
                  broadening your district filter or unchecking available only.
                </p>
              </div>
              <button
                type="button"
                onClick={resetAllFilters}
                className="h-10 px-6 rounded-xl bg-[#b70011] text-white font-semibold text-xs hover:brightness-110 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined !text-[18px]">
                  restart_alt
                </span>
                <span>Clear Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentDonors.map((donor) => (
                <DonorCard
                  key={donor.id || donor._id}
                  donor={donor}
                  onRequestContact={(d) => setContactDonor(d)}
                  onViewProfile={(d) => setProfileDonor(d)}
                />
              ))}
            </div>
          )}

          {/* Interactive Pagination Footer */}
          <div
            className={`rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 border ${
              isDarkMode
                ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
                : "bg-white border-slate-100 text-[#0b1c30]"
            }`}
          >
            <div className="flex items-center gap-3 text-xs">
              <span>
                Showing{" "}
                <strong>
                  {filteredDonors.length > 0 ? startIndex + 1 : 0}-
                  {Math.min(startIndex + itemsPerPage, filteredDonors.length)}
                </strong>{" "}
                of <strong>{filteredDonors.length}</strong> Matching Donors (
                <strong>{donors.length}</strong> Total Registered)
              </span>
              <span className="hidden md:inline">•</span>
              <div className="hidden md:flex items-center gap-1.5">
                <span>Items per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className={`rounded-lg px-2 py-1 text-xs focus:outline-none border cursor-pointer ${
                    isDarkMode
                      ? "bg-[#111827] border-[#334155] text-[#F8FAFC]"
                      : "bg-blue-50 border-slate-200 text-[#0b1c30]"
                  }`}
                >
                  <option value="9">9</option>
                  <option value="18">18</option>
                  <option value="27">27</option>
                </select>
              </div>
            </div>

            <nav className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border ${
                  isDarkMode
                    ? "bg-[#111827] border-[#334155] hover:bg-[#334155] text-[#F8FAFC]"
                    : "bg-blue-50 border-slate-200 hover:bg-slate-200 text-slate-700"
                }`}
                title="Previous Page"
              >
                <span className="material-symbols-outlined !text-[18px]">
                  chevron_left
                </span>
              </button>

              <span className="text-xs font-semibold px-2">
                Page <strong>{currentPage}</strong> of{" "}
                <strong>{totalPages}</strong>
              </span>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border ${
                  isDarkMode
                    ? "bg-[#111827] border-[#334155] hover:bg-[#334155] text-[#F8FAFC]"
                    : "bg-blue-50 border-slate-200 hover:bg-slate-200 text-slate-700"
                }`}
                title="Next Page"
              >
                <span className="material-symbols-outlined !text-[18px]">
                  chevron_right
                </span>
              </button>
            </nav>
          </div>

          {/* SLA & Security Footer Features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
            {[
              {
                title: "Emergency Transfusion Protocol",
                desc: "Need urgent blood dispatched within 30 minutes? Connect with regional hospital blood banks via immediate dispatch.",
                icon: "local_hospital",
                color: "text-[#b70011]",
              },
              {
                title: "Masked Communication",
                desc: "All calls and SMS transmissions are mediated through LifeLink IVR dispatch to stop harassment and enforce verified usage.",
                icon: "security",
                color: "text-[#008438]",
              },
              {
                title: "Clinical Rest Enforcement",
                desc: "Male donors require a mandatory 90-day cooldown and female donors 120-day interval according to National Transfusion guidelines.",
                icon: "vital_signs",
                color: "text-[#38BDF8]",
              },
            ].map((f, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 shadow-sm flex items-start gap-4 border ${
                  isDarkMode
                    ? "bg-[#1E293B] border-[#334155]"
                    : "bg-blue-50 border-slate-100"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 ${
                    isDarkMode ? "bg-[#111827]" : "bg-[#ffdad6]/40"
                  } ${f.color}`}
                >
                  <span className="material-symbols-outlined !text-[20px]">
                    {f.icon}
                  </span>
                </div>
                <div>
                  <h4
                    className={`font-semibold text-sm ${
                      isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                    }`}
                  >
                    {f.title}
                  </h4>
                  <p
                    className={`text-xs mt-1 ${
                      isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
                    }`}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modals */}
      <ContactModal
        donor={contactDonor}
        onClose={() => setContactDonor(null)}
      />
      <ProfileModal
        donor={profileDonor}
        onClose={() => setProfileDonor(null)}
      />

      <Footer />
    </div>
  );
}
