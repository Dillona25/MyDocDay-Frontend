// Defines all our app routes
// <Route path="profile" element={<ProfileStep />} />

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import DashboardDoctors from "../pages/dashboard/DashboardDoctors";
import DashboardAppointments from "../pages/dashboard/DashboardAppointments";
import OnboardingLayout from "../pages/onboarding/OnboardingLayout";
import OnboardingDoctors from "../pages/onboarding/OnboardingDoctors";
import OnBoardingUserInfo from "../pages/onboarding/OnBoardingUserInfo";
import OnboardingAppointments from "../pages/onboarding/OnboardingAppointments";
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";
import ProtectedRoute from "./ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Home Route (Marketing LP) */}
        <Route path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />

        {/* Onboarding Routes */}
        <Route path="/onboarding" element={<OnboardingLayout />}>
          <Route index element={<OnboardingDoctors />} />
          <Route path="doctors" element={<OnboardingDoctors />} />
          <Route path="appointments" element={<OnboardingAppointments />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="doctors" element={<DashboardDoctors />} />
          <Route path="appointments" element={<DashboardAppointments />} />
        </Route>

        {/* Auth Routes */}
        {/* <Route path="signin" element={<Signin />}></Route>
        <Route path="signup" element={<Signup />}></Route> */}
      </Routes>
    </Router>
  );
};
