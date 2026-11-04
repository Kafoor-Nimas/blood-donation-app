import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminOverviewHeader from "../components/admin/AdminOverviewHeader";
import AdminKpiCards from "../components/admin/AdminKpiCards";
import AdminTabs from "../components/admin/AdminTabs";
import AdminRequestTable from "../components/admin/AdminRequestTable";
import RecentDonorsPanel from "../components/admin/RecentDonorsPanel";
import SecurityTelemetryBox from "../components/admin/SecurityTelemetryBox";
import { useApp } from "../context/AppContext";

export default function AdminDashboard() {
  const { isDarkMode, fetchAdminData, fetchRequests } = useApp();
  const [activeTab, setActiveTab] = useState("requests");

  useEffect(() => {
    if (fetchAdminData) fetchAdminData();
    if (fetchRequests) fetchRequests();
  }, []);

  return (
    <div
      className={`w-full transition-colors font-body-md antialiased min-h-screen flex flex-col justify-between ${
        isDarkMode
          ? "bg-[#0F172A] text-[#F8FAFC]"
          : "bg-[#f8f9ff] text-[#0b1c30]"
      }`}
    >
      <Navbar />

      <main className="w-full flex-1 pt-24 pb-12">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
          {/* Top Command Header */}
          <AdminOverviewHeader />

          {/* Operational KPI Cards */}
          <AdminKpiCards />

          {/* Navigation Tabs */}
          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Table View */}
          <AdminRequestTable activeTab={activeTab} />

          {/* Bottom Dual Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <RecentDonorsPanel />
            <SecurityTelemetryBox />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}