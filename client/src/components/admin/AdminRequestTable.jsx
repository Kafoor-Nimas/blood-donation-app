import { useState } from "react";
import { useApp } from "../../context/AppContext";

const initialRequests = [
  {
    id: "#REQ-4091",
    ward: "ICU Ward 4",
    hospital: "Colombo National Hospital, Central",
    bloodGroup: "O-",
    units: "2 Units",
    requester: "Suneth Wijesinghe",
    requesterRole: "National ID & MO Verified",
    urgency: "Urgent (Today)",
    timeRemaining: "Needed by 14:00 hrs",
    status: "Open",
    isCritical: true,
  },
  {
    id: "#REQ-4089",
    ward: "Emergency OT",
    hospital: "Kandy Teaching Hospital",
    bloodGroup: "B+",
    units: "3 Units",
    requester: "Dr. Niluka Perera",
    requesterRole: "Consultant Surgeon Verified",
    urgency: "Urgent (6 hrs left)",
    timeRemaining: "Immediate OT Reserve",
    status: "Under Coordination",
    isCritical: true,
  },
  {
    id: "#REQ-4085",
    ward: "Maternity",
    hospital: "De Soysa Hospital for Women",
    bloodGroup: "AB+",
    units: "1 Unit",
    requester: "Kavinda Bandara",
    requesterRole: "Patient Relative (Registered)",
    urgency: "Scheduled Tomorrow",
    timeRemaining: "Scheduled Cesarean",
    status: "Open",
    isCritical: false,
  },
  {
    id: "#REQ-4078",
    ward: "Completed",
    hospital: "Karapitiya National Hospital, Galle",
    bloodGroup: "A+",
    units: "4 Units",
    requester: "Dr. Mahesh Senanayake",
    requesterRole: "Blood Bank Coordinator",
    urgency: "Fulfilled in 22 min",
    timeRemaining: "Dispatch Batch #DL-882",
    status: "Fulfilled",
    isCritical: false,
  },
];

export default function AdminRequestTable() {
  const { isDarkMode } = useApp();
  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [bloodFilter, setBloodFilter] = useState("ALL");

  const handleStatusChange = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req)),
    );
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "Urgent" && req.isCritical) ||
      req.status === statusFilter;

    const matchesBlood =
      bloodFilter === "ALL" || req.bloodGroup === bloodFilter;

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
            <option value="Open">Open</option>
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
            <option value="B+">B Positive (B+)</option>
            <option value="AB+">AB Positive (AB+)</option>
            <option value="B-">B Negative (B-)</option>
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
              <th className="py-3.5 px-4">Urgency &amp; Required</th>
              <th className="py-3.5 px-4">Current Status</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              isDarkMode ? "divide-[#334155]" : "divide-slate-100"
            }`}
          >
            {filteredRequests.map((req) => (
              <tr
                key={req.id}
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
                        {req.id}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          isDarkMode
                            ? "bg-red-950/80 text-red-200"
                            : "bg-red-100 text-[#b70011]"
                        }`}
                      >
                        {req.ward}
                      </span>
                    </div>
                    <span
                      className={`text-xs mt-0.5 ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {req.hospital}
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
                    <span>{req.bloodGroup}</span>
                    <span className="text-xs font-normal text-slate-400">
                      / {req.units}
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
                      {req.requester}
                    </span>
                    <div className="flex items-center gap-1 text-[#008438] text-[11px]">
                      <span className="material-symbols-outlined text-[14px]">
                        verified
                      </span>
                      <span>{req.requesterRole}</span>
                    </div>
                  </div>
                </td>

                {/* Urgency */}
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-1">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] w-fit font-bold ${
                        req.isCritical
                          ? isDarkMode
                            ? "bg-red-950/90 text-red-200 animate-pulse"
                            : "bg-red-100 text-[#b70011] animate-pulse"
                          : req.status === "Fulfilled"
                            ? isDarkMode
                              ? "bg-emerald-950/90 text-emerald-200"
                              : "bg-emerald-100 text-[#008438]"
                            : isDarkMode
                              ? "bg-[#0F172A] text-slate-300"
                              : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">
                        {req.isCritical
                          ? "crisis_alert"
                          : req.status === "Fulfilled"
                            ? "check"
                            : "schedule"}
                      </span>
                      <span>{req.urgency}</span>
                    </span>
                    <span
                      className={`text-[11px] ${
                        isDarkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {req.timeRemaining}
                    </span>
                  </div>
                </td>

                {/* Status Dropdown Override */}
                <td className="py-4 px-4">
                  <select
                    value={req.status}
                    onChange={(e) => handleStatusChange(req.id, e.target.value)}
                    className={`px-2.5 py-1 text-xs rounded font-semibold outline-none cursor-pointer border ${
                      isDarkMode
                        ? "bg-[#0F172A] border-[#334155] text-white"
                        : "bg-slate-100 border-slate-200 text-[#0b1c30]"
                    }`}
                  >
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
                      onClick={() => alert(`Details for ${req.id}`)}
                      className={`p-1.5 rounded transition-colors cursor-pointer ${
                        isDarkMode
                          ? "hover:bg-[#0F172A] text-slate-400 hover:text-white"
                          : "hover:bg-slate-100 text-slate-400 hover:text-slate-800"
                      }`}
                      title="Review Details"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        visibility
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(req.id, "Under Coordination")
                      }
                      className={`p-1.5 rounded transition-colors cursor-pointer ${
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
                      onClick={() => handleStatusChange(req.id, "Fulfilled")}
                      className={`p-1.5 rounded transition-colors cursor-pointer ${
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
            ))}
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
          <strong>48</strong> active emergency records
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled
            className={`px-3 py-1.5 rounded shadow-sm font-semibold opacity-50 cursor-not-allowed ${
              isDarkMode
                ? "bg-[#1E293B] text-slate-500"
                : "bg-white text-slate-400"
            }`}
          >
            Previous
          </button>
          <span className="px-2 font-bold">Page 1 of 12</span>
          <button
            className={`px-3 py-1.5 rounded shadow-sm font-semibold transition-colors cursor-pointer ${
              isDarkMode
                ? "bg-[#1E293B] text-slate-200 hover:bg-[#334155]"
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
