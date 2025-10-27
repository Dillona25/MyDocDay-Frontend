import { Outlet } from "react-router-dom";

const OnboardingLayout = () => {
  return (
    // TODO: Add a bootstrap progress bar for the steps in onboarding
    <div className="onboarding-layout py-5">
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default OnboardingLayout;
