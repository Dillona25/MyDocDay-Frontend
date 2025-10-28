import Button from "../../components/common/Button";
import ModalAddDoctor from "../../components/modals/ModalAddDoctor";
import { useAuth } from "../../store/AuthContext";
import Doctors from "../../assets/Two-Doctors.svg";
import { Link, useNavigate } from "react-router-dom";
import { useOnboarding } from "../../store/onboardingStepsContext";

const OnboardingDoctors = () => {
  const { user } = useAuth();
  const { nextStep, prevStep } = useOnboarding();

  return (
    <>
      <div className="row justify-content-between" id="onboarding-doctors">
        <div className="col-5 d-flex flex-column">
          <h4 className="font-poppins text-secondary text-center text-md-start preheading">
            Hey there, {user?.first_name}
          </h4>
          <h1 className="font-poppins text-primary fw-bold text-center text-md-start">
            Let's Add Your Doctors!
          </h1>
          <p className="font-inter mt-4 text-center text-md-start">
            Here, we can go ahead and begin adding your current healthcare
            providers. Or, you can skip this step and add them later!
          </p>
          <img
            alt="Two Doctors Standing Together"
            src={Doctors}
            className="mt-5"
          />
        </div>
        <div className="col-6 d-flex flex-column">
          <h4 className="font-poppins text-primary fw-semibold doctors-heading pb-2">
            Your Doctors
          </h4>
          <ul className="list-unstyled"></ul>
          <Button
            buttonText="Add Doctor"
            className="bg-primary-light text-white mt-5 max-w-fit mx-auto"
            dataToggle="modal"
            dataTarget="add-doctor"
          />
          <div className="d-flex justify-content-end mt-auto">
            <Button
              buttonText="Next Step"
              className="bg-primary-light text-white mt-5 max-w-fit"
              onClick={nextStep}
            />
          </div>
        </div>
      </div>
      <ModalAddDoctor />
    </>
  );
};

export default OnboardingDoctors;
