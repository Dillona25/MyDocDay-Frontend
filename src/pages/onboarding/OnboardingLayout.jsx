import { Outlet } from "react-router-dom";

const OnboardingLayout = () => {
  return (
    // TODO: Add a bootstrap progress bar for the steps in onboarding
    <div className="onboarding-layout py-5 py-md-0">
      <div className="container onboarding-container d-flex justify-content-center align-items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default OnboardingLayout;
