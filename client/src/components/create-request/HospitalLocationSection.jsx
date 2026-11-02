import { useApp } from "../../context/AppContext";

export default function HospitalLocationSection({
  hospitalName,
  setHospitalName,
  district,
  setDistrict,
  city,
  setCity,
  wardDesk,
  setWardDesk,
}) {
  const { isDarkMode } = useApp();

  return (
    <section
      className={`rounded-2xl shadow-sm p-6 sm:p-8 border ${
        isDarkMode
          ? "bg-[#1E293B] border-[#334155]"
          : "bg-white border-slate-100"
      }`}
    >
      <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-100 dark:border-[#334155]">
        <div className="w-9 h-9 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#b70011] shrink-0">
          <span className="material-symbols-outlined !text-[20px]">
            local_hospital
          </span>
        </div>
        <div>
          <h2 className="text-lg font-bold">2. Hospital &amp; Location Details</h2>
          <p
            className={`text-xs ${
              isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
            }`}
          >
            Precise clinical facility coordinates for direct donor dispatch
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hospital Name Input */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1.5 flex items-center gap-1">
            Hospital / Medical Center Name <span className="text-[#b70011]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              placeholder="e.g. Colombo National Hospital (NHSL)"
              className={`w-full rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:outline-none border ${
                isDarkMode
                  ? "bg-[#111827] border-[#334155] text-[#F8FAFC] placeholder-slate-500"
                  : "bg-slate-50 border-slate-200 text-[#0b1c30] placeholder-slate-400"
              }`}
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 !text-[18px]">
              domain
            </span>
          </div>
          <span
            className={`text-[10px] mt-1.5 ${
              isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
            }`}
          >
            Official recognized health institution with blood bank
          </span>
        </div>

        {/* District Selection */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1.5 flex items-center gap-1">
            District <span className="text-[#b70011]">*</span>
          </label>
          <div className="relative">
            <select
              required
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className={`w-full appearance-none rounded-xl px-3 py-2 pr-10 text-xs font-medium focus:outline-none cursor-pointer border ${
                isDarkMode
                  ? "bg-[#111827] border-[#334155] text-[#F8FAFC]"
                  : "bg-slate-50 border-slate-200 text-[#0b1c30]"
              }`}
            >
              <option value="" disabled>Select administrative district...</option>
              <option value="Colombo">Colombo</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Kalutara">Kalutara</option>
              <option value="Kandy">Kandy</option>
              <option value="Galle">Galle</option>
              <option value="Matara">Matara</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Kurunegala">Kurunegala</option>
              <option value="Anuradhapura">Anuradhapura</option>
              <option value="Ratnapura">Ratnapura</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-2.5 pointer-events-none text-slate-400 !text-[20px]">
              expand_more
            </span>
          </div>
          <span
            className={`text-[10px] mt-1.5 ${
              isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
            }`}
          >
            Determines the geo-radius for regional donor alerts
          </span>
        </div>

        {/* City Input */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1.5 flex items-center gap-1">
            City / Municipality <span className="text-[#b70011]">*</span>
          </label>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Dehiwala-Mount Lavinia or Peradeniya"
            className={`w-full rounded-xl px-3 py-2 text-xs font-medium focus:outline-none border ${
              isDarkMode
                ? "bg-[#111827] border-[#334155] text-[#F8FAFC] placeholder-slate-500"
                : "bg-slate-50 border-slate-200 text-[#0b1c30] placeholder-slate-400"
            }`}
          />
          <span
            className={`text-[10px] mt-1.5 ${
              isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
            }`}
          >
            Nearest municipal center or town area
          </span>
        </div>

        {/* Ward / Desk */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1.5 flex items-center gap-1">
            Ward / Blood Bank Contact Desk <span className="text-[#b70011]">*</span>
          </label>
          <input
            type="text"
            required
            value={wardDesk}
            onChange={(e) => setWardDesk(e.target.value)}
            placeholder="e.g. Trauma OT 3 / Transfusion Unit Ward 4B"
            className={`w-full rounded-xl px-3 py-2 text-xs font-medium focus:outline-none border ${
              isDarkMode
                ? "bg-[#111827] border-[#334155] text-[#F8FAFC] placeholder-slate-500"
                : "bg-slate-50 border-slate-200 text-[#0b1c30] placeholder-slate-400"
            }`}
          />
          <span
            className={`text-[10px] mt-1.5 ${
              isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
            }`}
          >
            Where incoming donors should present their token
          </span>
        </div>
      </div>
    </section>
  );
}