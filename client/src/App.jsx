import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Home from "./pages/Home";
import FindDonors from "./pages/FindDonors";
import BloodRequests from "./pages/BloodRequests";
import CreateRequest from "./pages/CreateRequest";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Products from "./pages/Products";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find-donors" element={<FindDonors />} />
            <Route path="/blood-requests" element={<BloodRequests />} />
            <Route path="/create-request" element={<CreateRequest />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* <Route path="/products" element={<Products />} />
            <Route path="/about-us" element={<Home />} /> */}
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}
