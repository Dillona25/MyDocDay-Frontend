import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/overview/OverviewPage";
import DashboardDoctors from "../pages/dashboard/doctors/DoctorsPage";
import DashboardAppointments from "../pages/dashboard/appointments/AppointmentsPage";
import OnboardingLayout from "../pages/onboarding/OnboardingLayout";
import OnboardingDoctors from "../pages/onboarding/OnboardingDoctors";
import OnboardingAppointments from "../pages/onboarding/OnboardingAppointments";
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";
import ProtectedRoute from "./ProtectedRoute";
import VerifyEmail from "../pages/auth/VerifyEmail";
import EditAppointment from "../pages/dashboard/appointments/EditAppointmentPage";
import EditDoctorPage from "../pages/dashboard/doctors/EditDoctorPage";
import Reminders from "../pages/dashboard/reminders/Reminders";
import Account from "../pages/dashboard/account/Account";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Home Route (Marketing LP) */}
        <Route path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route
          path="signin"
          element={
            <ProtectedRoute type="auth">
              <Signin />
            </ProtectedRoute>
          }
        />
        <Route
          path="signup"
          element={
            <ProtectedRoute type="auth">
              <Signup />
            </ProtectedRoute>
          }
        />
        <Route path="verifyUser" element={<VerifyEmail />} />

        {/* Onboarding Routes */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute type="onboarding">
              <OnboardingLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OnboardingDoctors />} />
          <Route path="doctors" element={<OnboardingDoctors />} />
          <Route path="appointments" element={<OnboardingAppointments />} />
        </Route>

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute type="dashboard">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="doctors">
            <Route index element={<DashboardDoctors />} />
            <Route path="edit/:id" element={<EditDoctorPage />} />
          </Route>
          <Route path="appointments">
            <Route index element={<DashboardAppointments />} />
            <Route path="edit/:id" element={<EditAppointment />} />
          </Route>
          <Route path="reminders" element={<Reminders />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
};
