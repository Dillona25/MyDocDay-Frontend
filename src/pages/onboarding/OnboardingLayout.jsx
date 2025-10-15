// Determine which step we’re currently on
// Contain the next and back buttons

import { AccountConnect } from "./AccountConnect";
import { ProfileStep } from "./ProfileStep";

export const OnboardingLayout = () => {
  return (
    <div>
      <ProfileStep />
      <AccountConnect />
    </div>
  );
};
