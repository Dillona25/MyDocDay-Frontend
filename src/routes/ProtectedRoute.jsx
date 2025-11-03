import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const ProtectedRoute = ({ children, type }) => {
  const { user, token, isAuthLoaded } = useAuth();
  const location = useLocation();

  if (!isAuthLoaded) return null;

  // Block access to private routes if not logged in
  if ((type === "dashboard" || type === "onboarding") && (!token || !user)) {
    return <Navigate to="/signup" replace />;
  }

  // If onboarding is complete, block onboarding route
  if (type === "onboarding" && user?.onboarding_complete) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is signed in, block auth routes
  if (type === "auth" && user && token) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, let it render
  return children ?? <Outlet />;
};

export default ProtectedRoute;
