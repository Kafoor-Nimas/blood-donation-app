// client/src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAuthenticated, authLoading } = useApp();

  // 1. Session verification in progress
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
        <p className="text-xs font-semibold animate-pulse">
          Verifying Session...
        </p>
      </div>
    );
  }

  // 2. User is not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. User is logged in, but page requires Admin rights
  if (adminOnly && user?.role !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  // 4. Authorized
  return children;
}
