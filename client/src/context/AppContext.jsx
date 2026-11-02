import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_REQUESTS_DATA } from "../data/data";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Initialize dark mode from localStorage, defaulting to false if not set
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("lifelink_dark_mode");
    return savedTheme !== null ? JSON.parse(savedTheme) : false;
  });

  const [requests, setRequests] = useState(INITIAL_REQUESTS_DATA);

  const addBloodRequest = (newReq) => {
    const formatted = {
      id: `LRH-${Math.floor(1000 + Math.random() * 9000)}`,
      bloodGroup: newReq.bloodGroup,
      rhType: newReq.bloodGroup?.includes("+") ? "Rh Pos" : "Rh Neg",
      units: Number(newReq.unitsCount),
      department: newReq.clinicalDepartment || "General Care",
      hospital: newReq.hospitalName,
      district: newReq.district,
      deadline: `Required by ${newReq.requiredDate}`,
      remainingTime:
        newReq.urgencyLevel === "critical" ? "6h remaining" : "24h remaining",
      status: newReq.urgencyLevel === "critical" ? "urgent" : "open",
      urgencyText:
        newReq.urgencyLevel === "critical"
          ? "Urgent - Critical"
          : "Open Request",
      verifiedBy: "Dr. Sarah Vance",
      donorsInfo: "Awaiting matching donor",
    };

    setRequests((prev) => [formatted, ...prev]);
  };

  // Sync dark mode class with HTML element and update localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("lifelink_dark_mode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        toggleDarkMode,
        requests,
        addBloodRequest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easy context consumption
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export default AppContext;
