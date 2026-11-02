import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BreadcrumbHeader from "../components/create-request/BreadcrumbHeader";
import InfoAlertBanner from "../components/create-request/InfoAlertBanner";
import PatientDetailsSection from "../components/create-request/PatientDetailsSection";
import HospitalLocationSection from "../components/create-request/HospitalLocationSection";
import ScheduleUrgencySection from "../components/create-request/ScheduleUrgencySection";
import { useApp } from "../context/AppContext";

export default function CreateRequest() {
  const { isDarkMode } = useApp();
  const navigate = useNavigate();

  // Form State
  const [patientRef, setPatientRef] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [unitsCount, setUnitsCount] = useState(2);
  const [clinicalDepartment, setClinicalDepartment] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [wardDesk, setWardDesk] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("critical");
  const [requiredDate, setRequiredDate] = useState("");
  const [requiredTime, setRequiredTime] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setRequiredDate(today);

    const now = new Date();
    now.setHours(now.getHours() + 4);
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    setRequiredTime(`${hours}:${minutes}`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Dispatch form values to context
    addBloodRequest({
      patientRef,
      bloodGroup,
      unitsCount,
      clinicalDepartment,
      hospitalName,
      district,
      city,
      wardDesk,
      urgencyLevel,
      requiredDate,
      requiredTime,
      clinicalNotes,
    });

    // 2. Navigate to Blood Requests page
    navigate("/blood-requests");
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
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
          <BreadcrumbHeader />
          <InfoAlertBanner />

          <form onSubmit={handleSubmit} className="space-y-8">
            <PatientDetailsSection
              patientRef={patientRef}
              setPatientRef={setPatientRef}
              bloodGroup={bloodGroup}
              setBloodGroup={setBloodGroup}
              unitsCount={unitsCount}
              setUnitsCount={setUnitsCount}
              clinicalDepartment={clinicalDepartment}
              setClinicalDepartment={setClinicalDepartment}
            />

            <HospitalLocationSection
              hospitalName={hospitalName}
              setHospitalName={setHospitalName}
              district={district}
              setDistrict={setDistrict}
              city={city}
              setCity={setCity}
              wardDesk={wardDesk}
              setWardDesk={setWardDesk}
            />

            <ScheduleUrgencySection
              urgencyLevel={urgencyLevel}
              setUrgencyLevel={setUrgencyLevel}
              requiredDate={requiredDate}
              setRequiredDate={setRequiredDate}
              requiredTime={requiredTime}
              setRequiredTime={setRequiredTime}
              clinicalNotes={clinicalNotes}
              setClinicalNotes={setClinicalNotes}
            />

            {/* Actions Bar */}
            <div
              className={`rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 border ${
                isDarkMode
                  ? "bg-[#1E293B] border-[#334155]"
                  : "bg-white border-slate-100"
              }`}
            >
              <button
                type="button"
                onClick={() => navigate(-1)}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs border ${
                  isDarkMode
                    ? "bg-[#111827] border-[#334155] text-[#CBD5E1] hover:bg-[#334155]"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#b70011] text-white font-semibold text-xs hover:brightness-110 shadow-md"
              >
                Submit Blood Request
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
