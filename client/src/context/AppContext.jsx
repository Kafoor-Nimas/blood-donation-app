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

  // --- Requests State ---
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  // --- Admin State ---
  const [adminStats, setAdminStats] = useState(null);
  const [recentDonors, setRecentDonors] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);

  
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("lifelink_token");
      if (!token) {
        setUser(null);
        setAuthLoading(false);
        return;
      }

      try {
        const response = await API.get("/auth/me");
        const userData = response.data.user || response.data;
        setUser(userData);
      } catch (error) {
        console.error("Session verification failed:", error);

        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("lifelink_token");
          setUser(null);
        }
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      const response = await API.patch(`/requests/${requestId}/status`, {
        status: newStatus,
      });

      if (response.data) {
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req._id === requestId || req.id === requestId
              ? { ...req, status: newStatus }
              : req,
          ),
        );
      }
      return response.data;
    } catch (error) {
      console.error("Failed to update request status:", error);
      throw error;
    }
  };

  const fetchRequests = async () => {
    setLoadingRequests(true);
    try {
      const response = await API.get("/requests");
      const data = response.data?.requests || response.data || [];
      setRequests(data);
    } catch (error) {
      console.error(
        "Failed to fetch blood requests. Using fallback data:",
        error,
      );
      setRequests(INITIAL_REQUESTS_DATA || []);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const toggleUserStatus = async (donorId) => {
    try {
      const response = await API.patch(`/admin/toggle-status/${donorId}`);
      if (response.data.success) {
        const updatedDonor = response.data.donor;

        setRecentDonors((prev) =>
          prev.map((d) =>
            d._id === donorId || d.id === donorId
              ? { ...d, isActive: updatedDonor.isActive }
              : d,
          ),
        );
      }
      return response.data;
    } catch (error) {
      console.error("Failed to toggle donor status:", error);
      throw error;
    }
  };

  const fetchAdminData = async () => {
    setAdminLoading(true);
    try {
      const response = await API.get("/admin");
      if (response.data.success) {
        setAdminStats(response.data.stats);
        setRecentDonors(response.data.donorsList || []);
      }
    } catch (error) {
      console.error("Failed to fetch admin statistics:", error);
    } finally {
      setAdminLoading(false);
    }
  };

  const verifyDonor = async (donorId) => {
    try {
      const response = await API.patch(`/admin/verify/${donorId}`);
      if (response.data.success) {
        setRecentDonors((prev) =>
          prev.map((d) => (d._id === donorId ? { ...d, isVerified: true } : d)),
        );
        fetchAdminData();
      }
      return response.data;
    } catch (error) {
      console.error("Failed to verify donor:", error);
      throw error;
    }
  };

  const login = async (credentials) => {
    const response = await API.post("/auth/login", credentials);
    const { token, user: userData } = response.data;
    localStorage.setItem("lifelink_token", token);
    setUser(userData);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("lifelink_token");
    setUser(null);
  };

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
        user,
        setUser,
        isAuthenticated: !!user,
        authLoading,
        login,
        logout,
        requests,
        setRequests,
        fetchRequests,
        loadingRequests,
        addBloodRequest,
        adminStats,
        recentDonors,
        adminLoading,
        fetchAdminData,
        verifyDonor,
        toggleUserStatus,
        updateRequestStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export default AppContext;
