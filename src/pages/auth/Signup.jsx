import { useState } from "react";
import DashboardImage from "../../assets/Dashboard-Screenshot.png";
import Logo from "../../assets/NavLogo.svg";
import Button from "../../components/common/Button";
import { Input, TextInput } from "../../components/common/Inputs";

const Signup = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeForm, setActiveForm] = useState("signup");

  const handleActiveForm = (form) => {
    setIsActive(true);
    setActiveForm(form);
  };

  return (
    <div className="signup-page d-flex align-items-center">
      <div className="row w-100 align-items-start justify-content-between">
        <div className="col-12 col-lg-6">
          <div className="position-relative card rounded-3 signup-card bg-primary d-flex align-items-center pt-5 px-5">
            <div className="d-flex flex-column signup-copy-wrapper">
              <h1 className="fw-semibold text-center text-white font-poppins">
                Welcome to MyDocDay
              </h1>
              <p className="lead text-center text-white w-75 mx-auto">
                Making managing healthcare for you and your family easy.
              </p>
            </div>
            <div className="py-4 px-3 bg-active rounded-3 signup-img-wrapper position-absolute bottom-0">
              <img
                src={DashboardImage}
                alt="MyDocDay Dashboard Image"
                className="img-fluid rounded-3"
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 d-flex flex-column align-items-center">
          <img
            alt="MyDocDay Logo"
            src={Logo}
            className="signup-logo align-self-center"
          />
          <div className="bg-light d-flex rounded-2 max-w-fit mt-5 p-1 position-relative overflow-hidden signup-toggle flex-shrink-0 align-self-center">
            <span
              className="signup-toggle-indicator mx-auto position-absolute top-0 start-0 h-100 rounded-2"
              style={{
                transform:
                  activeForm === "signup"
                    ? "translateX(0)"
                    : "translateX(100%)",
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
        </div>
      </div>
    </div>
  );
};

export default Signup;
