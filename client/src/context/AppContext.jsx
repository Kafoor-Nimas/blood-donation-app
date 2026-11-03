import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";
import { INITIAL_REQUESTS_DATA } from "../data/data";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- Dark Mode State ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("lifelink_dark_mode");
    return savedTheme !== null ? JSON.parse(savedTheme) : false;
  });

  // --- Auth State ---
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // --- Requests & General State (Guaranteed Array Default) ---
  const [requests, setRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(true);

  // 1. Verify existing auth token on initial app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("lifelink_token");
      if (token) {
        try {
          const response = await API.get("/auth/me");
          setUser(response.data.user || response.data);
        } catch (error) {
          console.error("Session verification failed:", error);
          localStorage.removeItem("lifelink_token");
          setUser(null);
        }
      }
      setAuthLoading(false);
    };

    checkAuthStatus();
  }, []);

  // 2. Fetch Blood Requests with Safe Array Validation & Mock Fallback
  useEffect(() => {
    const fetchRequests = async () => {
      setRequestsLoading(true);
      try {
        const response = await API.get("/requests");

        // Extract array payload regardless of backend wrapping structure
        let dataArray = [];
        if (Array.isArray(response.data)) {
          dataArray = response.data;
        } else if (Array.isArray(response.data?.requests)) {
          dataArray = response.data.requests;
        } else if (Array.isArray(response.data?.data)) {
          dataArray = response.data.data;
        } else {
          // Default fallback if response format is unexpected
          dataArray = INITIAL_REQUESTS_DATA || [];
        }

        setRequests(dataArray);
      } catch (error) {
        console.error("Failed to fetch blood requests. Using fallback data:", error);
        // Ensure state remains an array on API failure
        setRequests(INITIAL_REQUESTS_DATA || []);
      } finally {
        setRequestsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // 3. Login Handler
  const login = async (credentials) => {
    const response = await API.post("/auth/login", credentials);
    const { token, user: userData } = response.data;
    localStorage.setItem("lifelink_token", token);
    setUser(userData);
    return response.data;
  };

  // 4. Logout Handler
  const logout = () => {
    localStorage.removeItem("lifelink_token");
    setUser(null);
  };

  // 5. Add Blood Request via Backend API Call
  const addBloodRequest = async (newReqData) => {
    try {
      const response = await API.post("/requests", newReqData);
      const createdItem = response.data.request || response.data;
      
      setRequests((prev) => {
        const currentList = Array.isArray(prev) ? prev : [];
        return [createdItem, ...currentList];
      });
      return createdItem;
    } catch (error) {
      console.error("Error creating blood request:", error);
      throw error;
    }
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
        // Auth Exports
        user,
        setUser,
        isAuthenticated: !!user,
        authLoading,
        login,
        logout,
        // Request Exports
        requests,
        setRequests,
        requestsLoading,
        addBloodRequest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for context consumption
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export default AppContext;