import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RequestCard from "../components/RequestCard";
import FulfillModal from "../components/FulfillModal";
import { INITIAL_REQUESTS_DATA } from "../data/data";
import { useApp } from "../context/AppContext";

export default function BloodRequests() {
  const { isDarkMode } = useApp();

  // Filter States
  const [statusTab, setStatusTab] = useState("all");
  const [bloodFilter, setBloodFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("");

  // Modal & Toast States
  const [activeModalRequest, setActiveModalRequest] = useState(null);
  const [toastMessage, setToastMessage] = useState(
    "Someone responded to Blood Request #BL-904 in Kandy 2 mins ago.",
  );
  const [showToast, setShowToast] = useState(true);

  // Ticker State
  const tickerItems = [
    "Dr. Jayawardena verified request #REF-LRH-8821 at Lady Ridgeway Hospital",
    "Donor matched for Platelet collection in Galle District Blood Bank",
    "Teaching Hospital Karapitiya confirmed delivery of 2 units O- Blood",
    "Ambulance dispatch #AMB-401 arrived with verified cross-matched units in Colombo 08",
    "Emergency blood drive scheduled at Colombo National Hospital auditorium",
  ];
  const [tickerIndex, setTickerIndex] = useState(0);
  const [tickerFade, setTickerFade] = useState(true);

  // Live Activity Ticker Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerFade(false);
      setTimeout(() => {
        setTickerIndex((prev) => (prev + 1) % tickerItems.length);
        setTickerFade(true);
      }, 300);
    }, 4500);
    return () => clearInterval(interval);
  }, [tickerItems.length]);

  // Live Toast Loop
  useEffect(() => {
    const toastMessages = [
      "Someone responded to Blood Request #BL-904 in Kandy 2 mins ago.",
      "Clinical verification cleared for O- emergency reserve in Galle.",
      "New matching donor verified for #REF-LRH-8821 in Colombo.",
    ];
    let toastIdx = 0;
    const interval = setInterval(() => {
      if (showToast) {
        toastIdx = (toastIdx + 1) % toastMessages.length;
        setToastMessage(toastMessages[toastIdx]);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [showToast]);

  // Multi-Filter Logic
  const filteredRequests = useMemo(() => {
    return INITIAL_REQUESTS_DATA.filter((item) => {
      if (statusTab !== "all" && item.status !== statusTab) return false;
      if (bloodFilter && item.bloodGroup !== bloodFilter) return false;
      if (districtFilter && item.district !== districtFilter) return false;

      if (urgencyFilter === "urgent" && item.status !== "urgent") return false;
      if (
        urgencyFilter === "critical" &&
        item.status !== "urgent" &&
        item.status !== "open"
      )
        return false;
      if (urgencyFilter === "standard" && item.status !== "open") return false;

      return true;
    });
  }, [statusTab, bloodFilter, districtFilter, urgencyFilter]);

  const resetAllFilters = () => {
    setStatusTab("all");
    setBloodFilter("");
    setDistrictFilter("");
    setUrgencyFilter("");
  };

  const handleConfirmFulfill = (request) => {
    setActiveModalRequest(null);
    setShowToast(true);
    setToastMessage(
      "Thank you! Hospital blood coordinator has been notified of your arrival.",
    );
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
        {/* Header Header Banner */}
        <div
          className={`w-full py-8 px-6 lg:px-12 transition-colors border-b ${
            isDarkMode
              ? "bg-[#1E293B] border-[#334155]"
              : "bg-blue-50 border-slate-200"
          }`}
        >
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad6] text-[#b70011]">
                <span className="w-2 h-2 rounded-full bg-[#b70011] animate-ping" />
                <span className="text-[10px] uppercase font-bold tracking-wider">
                  Live Clinical Dispatch Grid
                </span>
              </div>
              <h1
                className={`text-3xl lg:text-4xl font-bold tracking-tight ${
                  isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                }`}
              >
                Active Blood Donation Requests
              </h1>
              <p
                className={`text-sm lg:text-base ${
                  isDarkMode ? "text-[#CBD5E1]" : "text-slate-600"
                }`}
              >
                Browse verified hospital requests and help patients find
                life-saving blood donors in real time across licensed clinical
                care centers.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={() =>
                  setActiveModalRequest({ id: "NEW", hospital: "Broadcast" })
                }
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#b70011] text-white font-semibold text-xs rounded-xl shadow-md hover:brightness-110 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined !text-[20px]">
                  add_circle
                </span>
                <span>+ Create Blood Request</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status Tabs & Filters Bar */}
        <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-12 -mt-4">
          <div
            className={`p-3 rounded-2xl shadow-md flex items-center justify-between gap-4 flex-wrap border ${
              isDarkMode
                ? "bg-[#1E293B] border-[#334155]"
                : "bg-white border-slate-100"
            }`}
          >
            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {[
                { id: "all", label: "All Requests", count: 48 },
                { id: "urgent", label: "Urgent", count: 12, dot: true },
                { id: "open", label: "Open", count: 32 },
                { id: "fulfilled", label: "Fulfilled", count: "140+" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatusTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    statusTab === tab.id
                      ? "bg-[#b70011] text-white shadow-sm"
                      : isDarkMode
                        ? "text-[#CBD5E1] hover:bg-[#111827]"
                        : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab.dot && (
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  )}
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      statusTab === tab.id
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 dark:bg-[#334155] text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Dropdown Filters */}
            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
              <div className="relative shrink-0">
                <select
                  value={bloodFilter}
                  onChange={(e) => setBloodFilter(e.target.value)}
                  className={`appearance-none text-xs font-medium pl-3 pr-8 py-2 rounded-xl focus:outline-none cursor-pointer border ${
                    isDarkMode
                      ? "bg-[#111827] border-[#334155] text-[#F8FAFC]"
                      : "bg-slate-100 border-slate-200 text-[#0b1c30]"
                  }`}
                >
                  <option value="">Blood Group: All</option>
                  <option value="O-">O Negative (O-)</option>
                  <option value="O+">O Positive (O+)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="A+">A Positive (A+)</option>
                  <option value="B-">B Negative (B-)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="AB-">AB Negative (AB-)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 !text-[18px]">
                  expand_more
                </span>
              </div>

              <div className="relative shrink-0">
                <select
                  value={districtFilter}
                  onChange={(e) => setDistrictFilter(e.target.value)}
                  className={`appearance-none text-xs font-medium pl-3 pr-8 py-2 rounded-xl focus:outline-none cursor-pointer border ${
                    isDarkMode
                      ? "bg-[#111827] border-[#334155] text-[#F8FAFC]"
                      : "bg-slate-100 border-slate-200 text-[#0b1c30]"
                  }`}
                >
                  <option value="">District: All Locations</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Galle">Galle</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Kurunegala">Kurunegala</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 !text-[18px]">
                  location_on
                </span>
              </div>

              <div className="relative shrink-0">
                <select
                  value={urgencyFilter}
                  onChange={(e) => setUrgencyFilter(e.target.value)}
                  className={`appearance-none text-xs font-medium pl-3 pr-8 py-2 rounded-xl focus:outline-none cursor-pointer border ${
                    isDarkMode
                      ? "bg-[#111827] border-[#334155] text-[#F8FAFC]"
                      : "bg-slate-100 border-slate-200 text-[#0b1c30]"
                  }`}
                >
                  <option value="">Urgency: Any Level</option>
                  <option value="urgent">Emergency (&lt;6h)</option>
                  <option value="critical">Critical (&lt;12h)</option>
                  <option value="standard">Standard (24h+)</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 !text-[18px]">
                  tune
                </span>
              </div>

              <button
                type="button"
                onClick={resetAllFilters}
                title="Reset Filters"
                className={`p-2 rounded-xl transition-colors ${
                  isDarkMode
                    ? "text-[#94A3B8] hover:text-white hover:bg-[#334155]"
                    : "text-slate-500 hover:text-[#b70011] hover:bg-slate-100"
                }`}
              >
                <span className="material-symbols-outlined !text-[20px]">
                  restart_alt
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Activity Ticker Banner */}
        <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-12 mt-6 mb-2">
          <div
            className={`rounded-2xl p-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-sm border ${
              isDarkMode
                ? "bg-[#1E293B] border-[#334155]"
                : "bg-blue-50 border-slate-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#ffdad6] text-[#b70011] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined !text-[18px]">
                  sensors
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs flex-wrap">
                <span className="font-bold text-[#b70011]">Live Activity:</span>
                <span
                  className={`transition-opacity duration-300 ${
                    tickerFade ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {tickerItems[tickerIndex]}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#008438] self-end md:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#008438] animate-pulse" />
              <span>Auto-syncing donor nodes</span>
            </div>
          </div>
        </div>

        {/* Requests Grid */}
        <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-12 my-6">
          {filteredRequests.length === 0 ? (
            <div
              className={`rounded-2xl p-12 text-center shadow-sm max-w-xl mx-auto border ${
                isDarkMode
                  ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
                  : "bg-white border-slate-100 text-[#0b1c30]"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-[#ffdad6] mx-auto flex items-center justify-center text-[#b70011] mb-4">
                <span className="material-symbols-outlined !text-[32px]">
                  inbox
                </span>
              </div>
              <h3 className="text-xl font-bold mb-1">No Matching Requests</h3>
              <p
                className={`text-xs mb-4 ${
                  isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
                }`}
              >
                No active hospital blood requisitions match your currently
                selected filters.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="px-6 py-2 bg-[#b70011] text-white font-semibold text-xs rounded-xl shadow hover:brightness-110"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((req) => (
                <RequestCard
                  key={req.id}
                  request={req}
                  onFulfill={(r) => setActiveModalRequest(r)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination Bar */}
        <div className="max-w-[1600px] mx-auto w-full px-6 lg:px-12 my-8">
          <div
            className={`p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 border ${
              isDarkMode
                ? "bg-[#1E293B] border-[#334155] text-[#CBD5E1]"
                : "bg-white border-slate-100 text-[#0b1c30]"
            }`}
          >
            <div className="text-xs">
              Showing <strong>1 - {filteredRequests.length}</strong> of{" "}
              <strong>48</strong> verified requests
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                  isDarkMode ? "hover:bg-[#334155]" : "hover:bg-slate-100"
                }`}
              >
                <span className="material-symbols-outlined !text-[20px]">
                  chevron_left
                </span>
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-xl bg-[#b70011] text-white font-bold text-xs shadow"
              >
                1
              </button>
              <button
                type="button"
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-colors ${
                  isDarkMode ? "hover:bg-[#334155]" : "hover:bg-slate-100"
                }`}
              >
                2
              </button>
              <button
                type="button"
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-colors ${
                  isDarkMode ? "hover:bg-[#334155]" : "hover:bg-slate-100"
                }`}
              >
                3
              </button>
              <span className="px-1 text-xs opacity-50">...</span>
              <button
                type="button"
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-colors ${
                  isDarkMode ? "hover:bg-[#334155]" : "hover:bg-slate-100"
                }`}
              >
                8
              </button>
              <button
                type="button"
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                  isDarkMode ? "hover:bg-[#334155]" : "hover:bg-slate-100"
                }`}
              >
                <span className="material-symbols-outlined !text-[20px]">
                  chevron_right
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={resetAllFilters}
              className="text-[#b70011] hover:underline text-xs font-semibold flex items-center gap-1"
            >
              <span className="material-symbols-outlined !text-[16px]">
                refresh
              </span>
              <span>Reset all view filters</span>
            </button>
          </div>
        </div>
      </main>

      {/* Floating Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
          <div className="bg-[#213145] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 max-w-sm">
            <div className="w-8 h-8 rounded-full bg-[#b70011] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined !text-[18px]">
                favorite
              </span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-xs flex items-center justify-between">
                <span>Donor Responded</span>
                <span className="text-[10px] text-slate-400">Just now</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{toastMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => setShowToast(false)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined !text-[16px]">
                close
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Donation Modal */}
      <FulfillModal
        request={activeModalRequest}
        onClose={() => setActiveModalRequest(null)}
        onConfirm={handleConfirmFulfill}
      />

      <Footer />
    </div>
  );
}
