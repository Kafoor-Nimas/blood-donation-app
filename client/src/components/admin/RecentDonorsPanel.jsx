import { useState } from "react";
import { useApp } from "../../context/AppContext";

const ITEMS_PER_PAGE = 6;

export default function RecentDonorsPanel() {
  const { isDarkMode, recentDonors, toggleUserStatus } = useApp();
  const [togglingId, setTogglingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleToggleStatus = async (donorId) => {
    setTogglingId(donorId);
    try {
      if (toggleUserStatus) {
        await toggleUserStatus(donorId);
      }
    } catch (error) {
      console.error("Status toggle failed:", error);
    } finally {
      setTogglingId(null);
    }
  };

  const donorList = Array.isArray(recentDonors) ? recentDonors : [];

  // Pagination calculations
  const totalPages = Math.ceil(donorList.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDonors = donorList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div
      className={`lg:col-span-8 p-6 rounded-xl shadow-sm border space-y-6 transition-colors ${
        isDarkMode
          ? "bg-[#1E293B] border-[#334155]"
          : "bg-white border-slate-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-[#0b1c30]"
            }`}
          >
            Recent Donor Registrations
          </h3>
          <p
            className={`text-xs mt-0.5 ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Quick verification pipeline and live account privileges control.
          </p>
        </div>
        <button
          onClick={() => (window.location.href = "/find-donors")}
          className={`px-3 py-1.5 text-xs text-[#b70011] ${
            isDarkMode ? "bg-red-950/40" : "bg-red-50"
          } hover:bg-red-100 rounded-lg font-semibold transition-colors cursor-pointer`}
        >
          View All Donors
        </button>
      </div>

      <div className="space-y-3">
        {currentDonors.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400">
            No donor registrations found.
          </div>
        ) : (
          currentDonors.map((donor) => {
            const donorId = donor._id || donor.id;
            const bloodGroup = donor.bloodGroup || donor.group || "O+";
            const district = donor.district || donor.city || "Colombo";
            const isActive = donor.isActive !== false;

            return (
              <div
                key={donorId}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDarkMode
                    ? "bg-[#0F172A] border-[#334155]"
                    : "bg-slate-50 border-slate-100"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={
                        donor.avatar ||
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuD2G3ltv8cQ0E23GIppn5aiMa68EYbw57Pw7NkBgHnBSezo_ivW0UrmgeHupmUISKVRWvOUot1oYvVyf_pLNs9xj8iolBHWPks9S-9CDvQYJM9LVO0LCF5BayrrXNFoT48c4nyajlq8wCIOfPwf3ArV2AooSQrERdporSrdN5SPNgr7Q-gH5BwKrBi9hmnrS56K3c2Tcs3J5Rr7bWQZ4Qju0OqGVW27sT8OMp21RcaN"
                      }
                      alt={donor.name}
                      className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-[#b70011]/20"
                    />
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#dc2626] text-white">
                      {bloodGroup}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4
                        className={`font-semibold text-sm ${
                          isDarkMode ? "text-white" : "text-[#0b1c30]"
                        }`}
                      >
                        {donor.name}
                      </h4>
                      {donor.isVerified && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                          <span className="material-symbols-outlined text-[12px]">
                            verified
                          </span>
                          <span>Verified</span>
                        </span>
                      )}
                    </div>
                    <div
                      className={`flex items-center gap-3 text-xs mt-0.5 ${
                        isDarkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      <span>{district}</span>
                      <span>•</span>
                      <span>
                        {donor.phone || donor.registeredTime || "Registered"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      disabled={togglingId === donorId}
                      onChange={() => handleToggleStatus(donorId)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#008438] peer-disabled:opacity-50" />
                    <span
                      className={`ml-2 text-xs font-semibold ${
                        isActive
                          ? isDarkMode
                            ? "text-white"
                            : "text-[#0b1c30]"
                          : "text-[#b70011]"
                      }`}
                    >
                      {togglingId === donorId
                        ? "Updating..."
                        : isActive
                          ? "Active"
                          : "Suspended"}
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => alert(`Manage options for ${donor.name}`)}
                    className={`p-2 rounded-lg ${
                      isDarkMode ? "hover:bg-slate-800" : "bg-slate-200"
                    } text-slate-400 transition-colors cursor-pointer`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      more_vert
                    </span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Footer Controls */}
      {donorList.length > 0 && (
        <div
          className={`pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t ${
            isDarkMode
              ? "border-[#334155] text-slate-400"
              : "border-slate-100 text-slate-600"
          }`}
        >
          <span>
            Showing{" "}
            <strong>
              {startIndex + 1}-
              {Math.min(startIndex + ITEMS_PER_PAGE, donorList.length)}
            </strong>{" "}
            of <strong>{donorList.length}</strong> total donors
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-lg border font-semibold flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isDarkMode
                  ? "bg-[#0F172A] border-[#334155] text-slate-200 hover:bg-[#334155]"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
              title="Previous Donors"
            >
              <span className="material-symbols-outlined text-[18px]">
                chevron_left
              </span>
            </button>

            <span className="font-semibold text-xs px-1">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-lg border font-semibold flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isDarkMode
                  ? "bg-[#0F172A] border-[#334155] text-slate-200 hover:bg-[#334155]"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
              title="Next Donors"
            >
              <span className="material-symbols-outlined text-[18px]">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
