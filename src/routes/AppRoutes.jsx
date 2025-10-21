// Defines all our app routes
// <Route path="profile" element={<ProfileStep />} />

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import DashboardDoctors from "../pages/dashboard/DashboardDoctors";
import DashboardAppointments from "../pages/dashboard/DashboardAppointments";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Home Route (Marketing LP) */}
        <Route path="/" element={<Home />} />

        {/* Onboarding Routes */}
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
