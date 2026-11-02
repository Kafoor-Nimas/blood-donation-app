import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Home from "./pages/Home";
import FindDonors from "./pages/FindDonors";
// import Products from "./pages/Products";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find-donors" element={<FindDonors />} />
            {/* <Route path="/products" element={<Products />} />
            <Route path="/blood-requests" element={<Home />} />
            <Route path="/create-request" element={<Home />} />
            <Route path="/about-us" element={<Home />} /> */}
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}
