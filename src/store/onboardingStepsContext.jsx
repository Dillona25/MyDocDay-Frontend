import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const navigate = useNavigate();

  // Map step numbers to routes
  const stepRoutes = ["/onboarding/doctors", "/onboarding/appointments"];

  const [step, setStep] = useState(1);
  const totalSteps = stepRoutes.length;

  const goToStep = (newStep) => {
    if (newStep >= 1 && newStep <= totalSteps) {
      setStep(newStep);
      navigate(stepRoutes[newStep - 1]);
    }
  };

  const nextStep = () => {
    goToStep(step + 1);
  };

  const prevStep = () => {
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
