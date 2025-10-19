// Defines all our app routes
// <Route path="profile" element={<ProfileStep />} />

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardDoctors from "../pages/dashboard/DashboardDoctors";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Home Route (Marketing LP) */}
        <Route path="/" element={<Home />} />

        {/* Onboarding Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="doctors" element={<DashboardDoctors />} />
        </Route>

        {/* Auth Routes */}
        {/* <Route path="signin" element={<Signin />}></Route>
        <Route path="signup" element={<Signup />}></Route> */}
      </Routes>
    </Router>
  );
};
