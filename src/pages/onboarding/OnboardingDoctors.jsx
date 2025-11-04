import Button from "../../components/common/Button";
import ModalAddDoctor from "../../components/modals/ModalAddDoctor";
import { useAuthStore } from "../../store/useAuth";
import { useOnboarding } from "../../store/onboardingStepsContext";
import { useDoctorStore } from "../../store/useDoctors";
import DoctorCard from "../../components/common/DoctorCard";
import { useModal } from "../../store/modalContext";
import { useEffect } from "react";

const OnboardingDoctors = () => {
  const { user } = useAuthStore();
  const { doctors, initDoctors } = useDoctorStore();
  const { nextStep } = useOnboarding();
  const { openModal } = useModal();

  useEffect(() => {
    initDoctors();
  }, [initDoctors]);

  return (
    <>
      <div className="row justify-content-center" id="onboarding-doctors">
        <div className="col-12 col-xl-8 d-flex flex-column mb-5 md-md-0">
          <h4 className="font-poppins text-secondary text-center preheading">
            Hey there, {user?.first_name}
          </h4>
          <h1 className="font-poppins text-primary fw-bold text-center">
            Let's Add Your Doctors!
          </h1>
          <p className="font-inter mt-4 text-center w-75 mx-auto mb-5">
            Here, we can go ahead and begin adding your current healthcare
            providers. Or, you can skip this step and add them later!
          </p>
          <h4 className="font-poppins text-primary fw-semibold doctors-heading pb-2">
            Your Doctors
          </h4>
          <div className="row">
            {doctors.length > 0 ? (
              doctors.map((doc) => (
                <div className="col-12 col-md-6 mb-3" key={doc.id}>
                  <DoctorCard
                    firstName={doc.first_name}
                    lastName={doc.last_name}
                    image={doc.image_url}
                    specialty={doc.specialty}
                    clinicName={doc.clinic_name}
                    city={doc.city}
                    state={doc.state}
                  />
                </div>
              ))
            ) : (
              <div className="col-12">
                <h5 className="text-body fw-semibold text-center my-5">
                  Add your first doctor to see it here
                </h5>
              </div>
            )}
          </div>
          <Button
            buttonText="Add Doctor"
            className="bg-primary-light text-white mt-3 mb-5 max-w-fit mx-auto"
            onClick={openModal}
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
