import { useApp } from "../../context/AppContext";

export default function DonorTable({ donors, selectedDonorId, onSelectDonor }) {
  const { isDarkMode } = useApp();

  return (
    <div
      className={`rounded-xl shadow-sm overflow-hidden border transition-colors ${
        isDarkMode
          ? "bg-[#1E293B] border-[#334155]"
          : "bg-white border-slate-100"
      }`}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr
              className={`uppercase tracking-wider font-semibold border-b ${
                isDarkMode
                  ? "bg-[#0F172A] border-[#334155] text-slate-400"
                  : "bg-slate-50 border-slate-100 text-slate-500"
              }`}
            >
              <th className="py-3 px-4">Donor ID &amp; Name</th>
              <th className="py-3 px-4">Contact (Protected)</th>
              <th className="py-3 px-4">Group</th>
              <th className="py-3 px-4">District / Hospital</th>
              <th className="py-3 px-4">Last Donation</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              isDarkMode ? "divide-[#334155]" : "divide-slate-100"
            }`}
          >
            {donors.map((donor) => {
              const isSelected = selectedDonorId === donor.id;
              const isDeactivated = donor.status === "Deactivated";

              return (
                <tr
                  key={donor.id}
                  onClick={() => onSelectDonor(donor)}
                  className={`transition-colors cursor-pointer ${
                    isSelected
                      ? isDarkMode
                        ? "bg-red-950/30"
                        : "bg-red-50/70"
                      : isDeactivated
                        ? "opacity-70"
                        : isDarkMode
                          ? "hover:bg-[#0F172A]/50 bg-[#1E293B]"
                          : "hover:bg-slate-50 bg-white"
                  }`}
                >
                  {/* ID & Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={donor.avatar}
                        alt={donor.name}
                        className={`w-9 h-9 rounded-full object-cover shrink-0 shadow-sm ${
                          isDeactivated ? "grayscale" : ""
                        }`}
                      />
                      <div className="min-w-0">
                        <div
                          className={`font-semibold text-sm truncate ${
                            isDarkMode ? "text-white" : "text-[#0b1c30]"
                          }`}
                        >
                          {donor.name}
                        </div>
                        <div className="font-semibold text-[11px] text-[#dc2626]">
                          {donor.idCode}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Protected Contact */}
                  <td className="py-3.5 px-4">
                    <div
                      className={`text-xs ${
                        isDarkMode ? "text-slate-200" : "text-[#0b1c30]"
                      }`}
                    >
                      {donor.email}
                    </div>
                    <div
                      className={`text-[11px] flex items-center gap-1 ${
                        isDarkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[12px] text-emerald-500">
                        lock
                      </span>
                      <span>{donor.phoneMasked}</span>
                    </div>
                  </td>

                  {/* Blood Group */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded font-bold text-xs ${
                        donor.isRare
                          ? "bg-[#dc2626] text-white"
                          : isDarkMode
                            ? "bg-red-950/80 text-red-200"
                            : "bg-red-100 text-[#b70011]"
                      }`}
                    >
                      {donor.bloodGroup}
                    </span>
                  </td>

                  {/* District / Hospital */}
                  <td className="py-3.5 px-4">
                    <div
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-[#0b1c30]"
                      }`}
                    >
                      {donor.district}
                    </div>
                    <div
                      className={`text-[11px] ${
                        isDarkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {donor.hospital}
                    </div>
                  </td>

                  {/* Last Donation */}
                  <td className="py-3.5 px-4">
                    <div
                      className={`text-xs ${
                        isDarkMode ? "text-slate-200" : "text-[#0b1c30]"
                      }`}
                    >
                      {donor.lastDonation}
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                        donor.eligibility === "Eligible Now" ||
                        donor.eligibility === "First-time ready"
                          ? isDarkMode
                            ? "text-emerald-400"
                            : "text-[#008438]"
                          : donor.eligibility === "Medically Deferred"
                            ? "text-[#dc2626]"
                            : isDarkMode
                              ? "text-slate-400"
                              : "text-slate-500"
                      }`}
                    >
                      {donor.eligibility === "Eligible Now" && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      )}
                      <span>{donor.eligibility}</span>
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        donor.status === "Active"
                          ? isDarkMode
                            ? "bg-emerald-950/80 text-emerald-300"
                            : "bg-emerald-100 text-[#008438]"
                          : donor.status === "Standby"
                            ? isDarkMode
                              ? "bg-slate-800 text-slate-300"
                              : "bg-slate-100 text-slate-700"
                            : donor.status === "Pending Review"
                              ? isDarkMode
                                ? "bg-amber-950/80 text-amber-300"
                                : "bg-amber-100 text-amber-800"
                              : isDarkMode
                                ? "bg-slate-800 text-slate-500"
                                : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {donor.status === "Active" && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      )}
                      <span>{donor.status}</span>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1 text-slate-400">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDonor(donor);
                        }}
                        className={`p-1.5 rounded transition-colors cursor-pointer ${
                          isDarkMode
                            ? "hover:bg-[#0F172A] hover:text-white"
                            : "hover:bg-slate-100 hover:text-slate-800"
                        }`}
                        title="Inspect Profile"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          visibility
                        </span>
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className={`p-1.5 rounded transition-colors cursor-pointer ${
                          isDarkMode
                            ? "hover:bg-[#0F172A] hover:text-white"
                            : "hover:bg-slate-100 hover:text-slate-800"
                        }`}
                        title="Edit Donor"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          edit
                        </span>
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className={`p-1.5 rounded transition-colors cursor-pointer ${
                          isDarkMode
                            ? "hover:bg-[#0F172A] hover:text-white"
                            : "hover:bg-slate-100 hover:text-slate-800"
                        }`}
                        title="More Actions"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          more_vert
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className={`p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t ${
          isDarkMode
            ? "bg-[#0F172A] border-[#334155] text-slate-400"
            : "bg-slate-50 border-slate-100 text-slate-600"
        }`}
      >
        <div>
          Showing <strong>1</strong> to <strong>{donors.length}</strong> of{" "}
          <strong>12,450</strong> registered donors
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled
            className={`px-3 py-1.5 rounded font-semibold opacity-50 cursor-not-allowed ${
              isDarkMode
                ? "bg-[#1E293B] text-slate-500"
                : "bg-white text-slate-400"
            }`}
          >
            Previous
          </button>
          <span
            className={`px-3 py-1.5 rounded font-bold shadow-sm ${
              isDarkMode
                ? "bg-[#1E293B] text-red-400"
                : "bg-white text-[#b70011]"
            }`}
          >
            1
          </span>
          <span>of 2,075</span>
          <button
            className={`px-3 py-1.5 rounded font-semibold transition-colors cursor-pointer ${
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
