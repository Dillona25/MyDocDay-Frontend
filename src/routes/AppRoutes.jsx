// Defines all our app routes
// <Route path="profile" element={<ProfileStep />} />

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { ProfileStep } from "../pages/onboarding/ProfileStep";
import { OnboardingLayout } from "../pages/onboarding/OnboardingLayout";
import { Signin } from "../pages/auth/Signin";
import { Signup } from "../pages/auth/Signup";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Home Route (Marketing LP) */}
        <Route path="/" element={<Home />} />

        {/* Onboarding Routes */}
        <Route path="/setup" element={<OnboardingLayout />}>
          <Route path="profile" element={<ProfileStep />} />
        </Route>

        {/* Auth Routes */}
        <Route path="signin" element={<Signin />}></Route>
        <Route path="signup" element={<Signup />}></Route>
      </Routes>
    </Router>
  );
};
