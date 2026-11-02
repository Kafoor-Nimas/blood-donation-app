import { useApp } from "../../context/AppContext";

const COMPATIBILITY_MAP = {
  "O-": "Compatible Donors: O- only",
  "O+": "Compatible Donors: O-, O+",
  "A-": "Compatible Donors: A-, O-",
  "A+": "Compatible Donors: A+, A-, O+, O-",
  "B-": "Compatible Donors: B-, O-",
  "B+": "Compatible Donors: B+, B-, O+, O-",
  "AB-": "Compatible Donors: AB-, A-, B-, O-",
  "AB+": "Universal Recipient (All Groups Acceptable)",
};

export default function PatientDetailsSection({
  patientRef,
  setPatientRef,
  bloodGroup,
  setBloodGroup,
  unitsCount,
  setUnitsCount,
  clinicalDepartment,
  setClinicalDepartment,
}) {
  const { isDarkMode } = useApp();

  const handleUnitChange = (delta) => {
    setUnitsCount((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

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
            assignment_ind
          </span>
        </div>
        <div>
          <h2 className="text-lg font-bold">1. Patient &amp; Transfusion Details</h2>
          <p
            className={`text-xs ${
              isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
            }`}
          >
            Anonymized clinical attributes to determine biological matching
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Clinical Ref */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1.5 flex items-center gap-1">
            Patient Clinical Reference Code
            <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={patientRef}
            onChange={(e) => setPatientRef(e.target.value)}
            placeholder="e.g. PAT-ICU-8821"
            className={`w-full rounded-xl px-3 py-2 text-xs focus:outline-none border ${
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
            Internal hospital reference ID for verification
          </span>
        </div>

        {/* Required Blood Group Selector */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold flex items-center gap-1">
              Required Blood Group <span className="text-[#b70011]">*</span>
            </label>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                bloodGroup
                  ? "bg-[#ffdad6] text-[#b70011]"
                  : isDarkMode
                  ? "bg-[#111827] text-slate-400"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {COMPATIBILITY_MAP[bloodGroup] || "Select group to check compatibility"}
            </span>
          </div>
          <div className="relative">
            <select
              required
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className={`w-full appearance-none rounded-xl px-3 py-2 pr-10 text-xs font-semibold focus:outline-none cursor-pointer border ${
                isDarkMode
                  ? "bg-[#111827] border-[#334155] text-[#F8FAFC]"
                  : "bg-slate-50 border-slate-200 text-[#0b1c30]"
              }`}
            >
              <option value="" disabled>Choose ABO/Rh group...</option>
              <option value="O-">O Negative (Universal Red Cell Donor)</option>
              <option value="O+">O Positive (Most Frequently Required)</option>
              <option value="A-">A Negative</option>
              <option value="A+">A Positive</option>
              <option value="B-">B Negative</option>
              <option value="B+">B Positive</option>
              <option value="AB-">AB Negative</option>
              <option value="AB+">AB Positive (Universal Recipient)</option>
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
            Ensure ABO and Rhesus matching corresponds to lab crossmatch
          </span>
        </div>

        {/* Required Units */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1.5 flex items-center gap-1">
            Required Units (Pints) <span className="text-[#b70011]">*</span>
          </label>
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center rounded-xl p-1 border ${
                isDarkMode
                  ? "bg-[#111827] border-[#334155]"
                  : "bg-slate-100 border-slate-200"
              }`}
            >
              <button
                type="button"
                onClick={() => handleUnitChange(-1)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-[#1E293B] text-white hover:bg-[#334155]"
                    : "bg-white text-slate-800 hover:bg-slate-200 shadow-sm"
                }`}
              >
                <span className="material-symbols-outlined !text-[18px]">remove</span>
              </button>
              <span className="w-12 text-center font-bold text-base text-[#b70011]">
                {unitsCount}
              </span>
              <button
                type="button"
                onClick={() => handleUnitChange(1)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-[#1E293B] text-white hover:bg-[#334155]"
                    : "bg-white text-slate-800 hover:bg-slate-200 shadow-sm"
                }`}
              >
                <span className="material-symbols-outlined !text-[18px]">add</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[1, 2, 4].map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnitsCount(u)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
                    unitsCount === u
                      ? "bg-[#b70011] text-white border-[#b70011]"
                      : isDarkMode
                      ? "bg-[#111827] border-[#334155] text-slate-300 hover:bg-[#334155]"
                      : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {u} {u === 1 ? "Unit" : u === 4 ? "Units (Trauma)" : "Units"}
                </button>
              ))}
            </div>
          </div>
          <span
            className={`text-[10px] mt-1.5 ${
              isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
            }`}
          >
            1 unit = approx. 450ml packed red blood cells (PRBC)
          </span>
        </div>

        {/* Clinical Purpose / Department */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold mb-1.5 flex items-center gap-1">
            Transfusion Purpose / Department <span className="text-[#b70011]">*</span>
          </label>
          <div className="relative">
            <select
              required
              value={clinicalDepartment}
              onChange={(e) => setClinicalDepartment(e.target.value)}
              className={`w-full appearance-none rounded-xl px-3 py-2 pr-10 text-xs font-medium focus:outline-none cursor-pointer border ${
                isDarkMode
                  ? "bg-[#111827] border-[#334155] text-[#F8FAFC]"
                  : "bg-slate-50 border-slate-200 text-[#0b1c30]"
              }`}
            >
              <option value="" disabled>Select clinical indication...</option>
              <option value="Emergency Trauma">Emergency Trauma &amp; Resuscitation</option>
              <option value="ICU / Critical Care">ICU / Critical Care</option>
              <option value="Maternity & Obstetrics">Maternity &amp; Obstetrics (Labor/PPH)</option>
              <option value="Cardiac Surgery">Cardiothoracic / Major Surgery</option>
              <option value="Oncology / Dialysis">Oncology / Hematology / Dialysis</option>
              <option value="General Surgery">General Elective Surgery</option>
              <option value="Pediatric">Pediatric / Neonatal Transfusion</option>
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
            Categorizes the request for clinical blood bank logistics
          </span>
        </div>
      </div>
    </section>
  );
}