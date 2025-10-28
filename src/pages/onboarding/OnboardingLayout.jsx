import { Outlet } from "react-router-dom";
import { OnboardingProvider } from "../../store/onboardingStepsContext";

const OnboardingLayout = () => {
  return (
    // TODO: Add a bootstrap progress bar for the steps in onboarding
    <OnboardingProvider>
      <div className="onboarding-layout py-5">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </OnboardingProvider>
  );
};

export default OnboardingLayout;
