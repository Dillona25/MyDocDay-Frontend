import { useState } from "react";
import DashboardImage from "../../assets/Dashboard-Screenshot.png";
import Logo from "../../assets/NavLogo.svg";
import Button from "../../components/common/Button";
import { Input, TextInput } from "../../components/common/Inputs";
import SignupForm from "../../components/forms/onboarding/Signup";
import SigninForm from "../../components/forms/onboarding/Signin";

const Signup = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeForm, setActiveForm] = useState("signup");

  const handleActiveForm = (form) => {
    setIsActive(true);
    setActiveForm(form);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-4 d-flex flex-column">
        <div className="bg-light d-flex rounded-2 max-w-fit mt-5 p-1 position-relative overflow-hidden signup-toggle flex-shrink-0 align-self-center">
          <span
            className="signup-toggle-indicator mx-auto position-absolute top-0 start-0 h-100 rounded-2"
            style={{
              transform:
                activeForm === "signup" ? "translateX(0)" : "translateX(100%)",
            }}
          />
          <Button
            onClick={() => handleActiveForm("signup")}
            buttonText="Sign Up"
            className={`${
              activeForm === "signup"
                ? "signup-toggle-button signup-toggle-button--active text-white"
                : "signup-toggle-button text-body"
            } flex-fill px-5 position-relative`}
          />
          <Button
            onClick={() => handleActiveForm("signin")}
            buttonText="Sign In"
            className={`${
              activeForm === "signin"
                ? "signup-toggle-button signup-toggle-button--active text-white"
                : "signup-toggle-button text-body"
            } flex-fill px-5 position-relative`}
          />
        </div>
        {activeForm === "signup" && <SignupForm />}
        {activeForm === "signin" && <SigninForm />}
      </div>
    </div>
  );
};

export default Signup;
