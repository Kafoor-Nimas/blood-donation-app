import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Home from "./pages/Home";
import FindDonors from "./pages/FindDonors";
import BloodRequests from "./pages/BloodRequests";
import CreateRequest from "./pages/CreateRequest";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ScrollToTop from "./components/ScrollToTop";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import DonorManagement from "./pages/DonorManagement";
// import Products from "./pages/Products";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find-donors" element={<FindDonors />} />
            <Route path="/blood-requests" element={<BloodRequests />} />
            <Route path="/create-request" element={<CreateRequest />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/admin/donors" element={<DonorManagement />} />
            {/* <Route path="/products" element={<Products />} />
             */}
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}
