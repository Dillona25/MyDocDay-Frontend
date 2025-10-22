import { Outlet } from "react-router-dom";

const OnboardingLayout = () => {
  return (
    <div className="onboarding-layout">
      <div className="container onboarding-container">
        <Outlet />
      </div>
    </div>
  );
};

export default OnboardingLayout;
