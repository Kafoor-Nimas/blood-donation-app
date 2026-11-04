import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function AdminRequestTable() {
  const { isDarkMode, requests, updateRequestStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [bloodFilter, setBloodFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState(null);

  // Status Change Handler connected to API
  const handleStatusChange = async (reqId, newStatus) => {
    setUpdatingId(reqId);
    try {
      if (updateRequestStatus) {
        await updateRequestStatus(reqId, newStatus);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const requestsList = Array.isArray(requests) ? requests : [];

  // Filter requests based on search term and dropdown selectors
  const filteredRequests = requestsList.filter((req) => {
    const idStr = req._id ? req._id.slice(-6).toUpperCase() : req.id || "";
    const hospitalStr = req.hospitalName || req.hospital || "";
    const requesterStr = req.patientName || req.requester || "";
    const bloodStr = req.bloodGroup || "";
    const urgencyStr = (req.urgency || "").toLowerCase();
    const statusStr = req.status || "Open";

    const matchesSearch =
      idStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospitalStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      requesterStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bloodStr.toLowerCase().includes(searchTerm.toLowerCase());

    const isCritical =
      urgencyStr === "critical" || urgencyStr === "urgent" || req.isCritical;

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "Urgent" && isCritical) ||
      statusStr.toLowerCase() === statusFilter.toLowerCase();

    const matchesBlood = bloodFilter === "ALL" || bloodStr === bloodFilter;

    return matchesSearch && matchesStatus && matchesBlood;
  });

  return (
    <div
      className={`rounded-xl shadow-sm overflow-hidden border transition-colors ${
        isDarkMode
          ? "bg-[#1E293B] border-[#334155]"
          : "bg-white border-slate-100"
      }`}
    >
      {/* Table Filter Bar */}
      <div className="p-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-[#0b1c30]"
            }`}
          >
            Emergency Blood Requests
          </h2>
          <p
            className={`text-xs mt-0.5 ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Live clinical coordination table with direct status override and
            instant donor pairing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search hospital, ID, or blood..."
              className={`w-full pl-9 pr-4 py-2 text-xs rounded-lg outline-none transition-colors ${
                isDarkMode
                  ? "bg-[#0F172A] text-white placeholder-slate-500 border border-[#334155]"
                  : "bg-slate-100 text-[#0b1c30] placeholder-slate-400"
              }`}
            />
          </div>

          {/* Status Dropdown Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-2 text-xs rounded-lg outline-none cursor-pointer font-medium ${
              isDarkMode
                ? "bg-[#0F172A] text-white border border-[#334155]"
                : "bg-slate-100 text-[#0b1c30]"
            }`}
          >
            <option value="ALL">All Statuses</option>
            <option value="Urgent">Urgent Critical</option>
            <option value="Pending">Pending / Open</option>
            <option value="Under Coordination">Under Coordination</option>
            <option value="Fulfilled">Fulfilled</option>
          </select>

          {/* Blood Group Filter */}
          <select
            value={bloodFilter}
            onChange={(e) => setBloodFilter(e.target.value)}
            className={`px-3 py-2 text-xs rounded-lg outline-none cursor-pointer font-medium ${
              isDarkMode
                ? "bg-[#0F172A] text-white border border-[#334155]"
                : "bg-slate-100 text-[#0b1c30]"
            }`}
          >
            <option value="ALL">All Blood Groups</option>
            <option value="O-">O Negative (O-)</option>
            <option value="O+">O Positive (O+)</option>
            <option value="A+">A Positive (A+)</option>
            <option value="A-">A Negative (A-)</option>
            <option value="B+">B Positive (B+)</option>
            <option value="B-">B Negative (B-)</option>
            <option value="AB+">AB Positive (AB+)</option>
            <option value="AB-">AB Negative (AB-)</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr
              className={`uppercase tracking-wider font-semibold border-y ${
                isDarkMode
                  ? "bg-[#0F172A] border-[#334155] text-slate-400"
                  : "bg-slate-50 border-slate-100 text-slate-500"
              }`}
            >
              <th className="py-3.5 px-6">Request ID &amp; Hospital</th>
              <th className="py-3.5 px-4">Group &amp; Units</th>
              <th className="py-3.5 px-4">Requester Verification</th>
              <th className="py-3.5 px-4">Urgency Level</th>
              <th className="py-3.5 px-4">Current Status</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              isDarkMode ? "divide-[#334155]" : "divide-slate-100"
            }`}
          >
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400">
                  No blood requests match your current filters.
                </td>
              </tr>
            ) : (
              filteredRequests.map((req) => {
                const reqId = req._id || req.id;
                const formattedId = req._id
                  ? `#REQ-${req._id.slice(-5).toUpperCase()}`
                  : req.id || "#REQ-0000";
                const hospital =
                  req.hospitalName || req.hospital || "General Hospital";
                const cityOrWard = req.city || req.ward || "Colombo";
                const bloodGroup = req.bloodGroup || "O+";
                const units = req.unitsNeeded ?? req.units ?? 1;
                const requesterName =
                  req.patientName || req.requester || "Patient Contact";
                const phone = req.contactPhone || req.phone || "N/A";
                const status = req.status || "Pending";
                const urgency = (req.urgency || "critical").toLowerCase();
                const isCritical =
                  urgency === "critical" || urgency === "urgent";

                return (
                  <tr
                    key={reqId}
                    className={`transition-colors ${
                      isDarkMode
                        ? "hover:bg-[#0F172A]/50 bg-[#1E293B]"
                        : "hover:bg-slate-50 bg-white"
                    }`}
                  >
                    {/* ID & Hospital */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#b70011] text-sm">
                            {formattedId}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                              isDarkMode
                                ? "bg-red-950/80 text-red-200"
                                : "bg-red-100 text-[#b70011]"
                            }`}
                          >
                            {cityOrWard}
                          </span>
                        </div>
                        <span
                          className={`text-xs mt-0.5 ${
                            isDarkMode ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {hospital}
                        </span>
                      </div>
                    </td>

                    {/* Group & Units */}
                    <td className="py-4 px-4">
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-bold text-base ${
                          isDarkMode
                            ? "bg-red-950/50 text-red-300"
                            : "bg-red-50 text-[#b70011]"
                        }`}
                      >
                        <span>{bloodGroup}</span>
                        <span className="text-xs font-normal text-slate-400">
                          / {units} {units === 1 ? "Unit" : "Units"}
                        </span>
                      </div>
                    </td>

                    {/* Requester */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span
                          className={`font-semibold ${
                            isDarkMode ? "text-white" : "text-[#0b1c30]"
                          }`}
                        >
                          {requesterName}
                        </span>
                        <div className="flex items-center gap-1 text-[#008438] text-[11px]">
                          <span className="material-symbols-outlined text-[14px]">
                            call
                          </span>
                          <span>{phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Urgency */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] w-fit font-bold ${
                            isCritical
                              ? isDarkMode
                                ? "bg-red-950/90 text-red-200 animate-pulse"
                                : "bg-red-100 text-[#b70011] animate-pulse"
                              : status === "Fulfilled"
                                ? isDarkMode
                                  ? "bg-emerald-950/90 text-emerald-200"
                                  : "bg-emerald-100 text-[#008438]"
                                : isDarkMode
                                  ? "bg-[#0F172A] text-slate-300"
                                  : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            {isCritical
                              ? "crisis_alert"
                              : status === "Fulfilled"
                                ? "check"
                                : "schedule"}
                          </span>
                          <span className="capitalize">{urgency}</span>
                        </span>
                      </div>
                    </td>

                    {/* Status Dropdown Override */}
                    <td className="py-4 px-4">
                      <select
                        disabled={updatingId === reqId}
                        value={status}
                        onChange={(e) =>
                          handleStatusChange(reqId, e.target.value)
                        }
                        className={`px-2.5 py-1 text-xs rounded font-semibold outline-none cursor-pointer border disabled:opacity-50 ${
                          isDarkMode
                            ? "bg-[#0F172A] border-[#334155] text-white"
                            : "bg-slate-100 border-slate-200 text-[#0b1c30]"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Open">Open</option>
                        <option value="Under Coordination">
                          Under Coordination
                        </option>
                        <option value="Fulfilled">Fulfilled</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        <button
                          onClick={() =>
                            alert(`Contact phone for ${formattedId}: ${phone}`)
                          }
                          className={`p-1.5 rounded transition-colors cursor-pointer ${
                            isDarkMode
                              ? "hover:bg-[#0F172A] text-slate-400 hover:text-white"
                              : "hover:bg-slate-100 text-slate-400 hover:text-slate-800"
                          }`}
                          title="Review Contact Info"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            visibility
                          </span>
                        </button>

                        <button
                          disabled={updatingId === reqId}
                          onClick={() =>
                            handleStatusChange(reqId, "Under Coordination")
                          }
                          className={`p-1.5 rounded transition-colors cursor-pointer disabled:opacity-50 ${
                            isDarkMode
                              ? "hover:bg-emerald-950/60 text-emerald-400"
                              : "hover:bg-emerald-50 text-[#008438]"
                          }`}
                          title="Approve & Dispatch"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            check_circle
                          </span>
                        </button>

                        <button
                          disabled={updatingId === reqId}
                          onClick={() => handleStatusChange(reqId, "Fulfilled")}
                          className={`p-1.5 rounded transition-colors cursor-pointer disabled:opacity-50 ${
                            isDarkMode
                              ? "hover:bg-red-950/60 text-red-400"
                              : "hover:bg-red-50 text-[#b70011]"
                          }`}
                          title="Mark Fulfilled"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            task_alt
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div
        className={`p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border-t ${
          isDarkMode
            ? "bg-[#0F172A] border-[#334155] text-slate-400"
            : "bg-slate-50 border-slate-100 text-slate-600"
        }`}
      >
        <span>
          Showing <strong>{filteredRequests.length}</strong> of{" "}
          <strong>{requestsList.length}</strong> total blood requests
        </span>
      </div>
    </div>
  );
}
