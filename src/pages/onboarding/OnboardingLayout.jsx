import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import {
  OnboardingProvider,
  useOnboarding,
} from "../../store/onboardingStepsContext";
import CircleCheckIcon from "../../assets/Circle-Check.svg";
import AccountIcon from "../../assets/Account-icon.svg";
import DoctorIcon from "../../assets/Doctor-icon.svg";
import AppointmentIcon from "../../assets/calendar-apts.svg";

const OnboardingProgress = () => {
  const { step } = useOnboarding();
  const currentStep = step ?? 1;

  const steps = [
    {
      id: 1,
      label: "Account Created",
      state: "complete",
      defaultIcon: AccountIcon,
      completeIcon: CircleCheckIcon,
    },
    {
      id: 2,
      label: "Add Doctors",
      state: currentStep > 1 ? "complete" : "active",
      defaultIcon: DoctorIcon,
      completeIcon: CircleCheckIcon,
    },
    {
      id: 3,
      label: "Add Appointments",
      state:
        currentStep > 2 ? "complete" : currentStep === 2 ? "active" : "pending",
      defaultIcon: AppointmentIcon,
      completeIcon: CircleCheckIcon,
    },
  ];

  return (
    <div className="onboarding-progress bg-primary py-4 mb-5">
      <div className="container">
        <div className="d-flex align-items-sm-center justify-content-center gap-4 gap-md-4">
          {steps.map((item, index) => {
            const isComplete = item.state === "complete";
            const iconSrc = isComplete ? item.completeIcon : item.defaultIcon;
            const iconAlt = `${item.label} icon`;
            const dividerFilled = item.state === "complete";

            return (
              <Fragment key={item.id}>
                <div
                  className={`onboarding-progress__step text-center onboarding-progress step ${item.state}`}
                >
                  <div className="onboarding-progress__icon d-flex align-items-center justify-content-center rounded-circle mx-auto">
                    <img src={iconSrc} alt={iconAlt} />
                  </div>
                  <span className="small mt-2 d-block">{item.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`onboarding-progress divider d-none d-sm-block ${
                      dividerFilled ? "onboarding-progress divider filled" : ""
                    }`}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const OnboardingLayout = () => {
  return (
    <OnboardingProvider>
      <OnboardingProgress />
      <div className="onboarding-layout py-5">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </OnboardingProvider>
  );
};

export default OnboardingLayout;
