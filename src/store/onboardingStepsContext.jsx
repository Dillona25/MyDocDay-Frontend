import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const navigate = useNavigate();

  // An array of the steps
  const stepRoutes = ["/onboarding/doctors", "/onboarding/appointments"];

  // Start on step 1
  // get the total steps
  const [step, setStep] = useState();
  const totalSteps = stepRoutes.length;

  const location = useLocation();

  useEffect(() => {
    const index = stepRoutes.indexOf(location.pathname);
    if (index !== -1) setStep(index + 1);
  }, [location.pathname]);

  // Go to a new step but only under the provided condition
  const goToStep = (newStep) => {
    if (newStep >= 1 && newStep <= totalSteps) {
      setStep(newStep);
      // Use React Router to navigate to the new step
      // We use the - 1 because of 0 indexing in JS
      navigate(stepRoutes[newStep - 1]);
    }
  };

  // Next Step
  const nextStep = () => {
    goToStep(step + 1);
  };

  // Prev Step
  const prevStep = () => {
    console.log("prevStep");
    goToStep(step - 1);
  };

  return (
    <OnboardingContext.Provider
      value={{ step, totalSteps, nextStep, prevStep, goToStep }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);
