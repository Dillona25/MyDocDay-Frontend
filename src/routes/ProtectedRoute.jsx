import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const ProtectedRoute = ({
  children,
  requireOnboardingIncomplete = false,
  redirectIfComplete = "/dashboard/",
  redirectIfIncomplete = "/signup/",
}) => {
  const { user, token, isAuthLoaded } = useAuth();

  if (!isAuthLoaded) return null;
  if (!token || !user) return <Navigate to="/signin" replace />;

  const hasFinishedOnboarding = Boolean(user.onboarding_complete);

  if (requireOnboardingIncomplete && hasFinishedOnboarding) {
    return <Navigate to={redirectIfComplete} replace />;
  }

  if (!requireOnboardingIncomplete && !hasFinishedOnboarding) {
    return <Navigate to={redirectIfIncomplete} replace />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;
