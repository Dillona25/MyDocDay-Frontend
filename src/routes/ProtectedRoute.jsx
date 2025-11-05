import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuth";

const ProtectedRoute = ({ children, type }) => {
  const { user, token, isAuthLoaded } = useAuthStore();
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
    // Here we need to check if onboarding_complete because if we don't then as soon as a
    // user signs up, we kick them to the dashboard since they are authenticated
    return user.onboarding_complete ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Navigate to="/onboarding/doctors" replace />
    );
  }

  // Otherwise, let it render
  return children ?? <Outlet />;
};

export default ProtectedRoute;
