import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
