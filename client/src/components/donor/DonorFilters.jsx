import { useApp } from "../../context/AppContext";

export default function DonorFilters({
  searchTerm,
  setSearchTerm,
  bloodFilter,
  setBloodFilter,
  districtFilter,
  setDistrictFilter,
  statusFilter,
  setStatusFilter,
  onReset,
}) {
  const { isDarkMode } = useApp();

  const inputStyle = `w-full px-3 py-2 rounded-lg text-xs outline-none transition-colors ${
    isDarkMode
      ? "bg-[#0F172A] text-white placeholder-slate-500 border border-[#334155]"
      : "bg-slate-100 text-[#0b1c30] placeholder-slate-400"
  }`;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
      <div
        className={`rounded-xl p-4 shadow-sm border transition-colors ${
          isDarkMode
            ? "bg-[#1E293B] border-[#334155]"
            : "bg-white border-slate-100"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search donors by name, email, phone number, or donor ID..."
              className={`${inputStyle} pl-9`}
            />
          </div>

          {/* Blood Group Filter */}
          <div className="md:col-span-2">
            <select
              value={bloodFilter}
              onChange={(e) => setBloodFilter(e.target.value)}
              className={`${inputStyle} cursor-pointer font-medium`}
            >
              <option value="ALL">Blood Group: All</option>
              <option value="A+">A+ (Positive)</option>
              <option value="A-">A- (Negative)</option>
              <option value="B+">B+ (Positive)</option>
              <option value="B-">B- (Negative)</option>
              <option value="AB+">AB+ (Positive)</option>
              <option value="AB-">AB- (Negative)</option>
              <option value="O+">O+ (Positive)</option>
              <option value="O-">O- (Universal)</option>
            </select>
          </div>

          {/* District Filter */}
          <div className="md:col-span-2">
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className={`${inputStyle} cursor-pointer font-medium`}
            >
              <option value="ALL">District: All</option>
              <option value="Colombo">Colombo (Western)</option>
              <option value="Gampaha">Gampaha (Western)</option>
              <option value="Kandy">Kandy (Central)</option>
              <option value="Galle">Galle (Southern)</option>
              <option value="Kurunegala">Kurunegala (NW)</option>
              <option value="Jaffna">Jaffna (Northern)</option>
              <option value="Badulla">Badulla (Uva)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`${inputStyle} cursor-pointer font-medium`}
            >
              <option value="ALL">Status: All</option>
              <option value="Active">Active</option>
              <option value="Standby">Resting / Standby</option>
              <option value="Pending">Pending Review</option>
              <option value="Deactivated">Deactivated</option>
            </select>
          </div>

          {/* Reset Action */}
          <div className="md:col-span-1 flex items-center justify-end">
            <button
              onClick={onReset}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isDarkMode
                  ? "bg-[#0F172A] hover:bg-slate-800 text-slate-400 hover:text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800"
              }`}
              title="Reset Filters"
            >
              <span className="material-symbols-outlined text-[18px]">
                restart_alt
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}