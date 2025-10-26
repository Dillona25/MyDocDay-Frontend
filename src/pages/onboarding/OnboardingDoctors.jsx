import Button from "../../components/common/Button";
import ModalAddDoctor from "../../components/modals/ModalAddDoctor";

const OnboardingDoctors = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-8 d-flex flex-column">
          <h1 className="font-poppins fw-bold text-body text-center mb-4">
            Now, Let's Add Your Doctors!
          </h1>
          <h3 className="lead text-center">
            Press the button below to add your first doctor. You can add all of
            your healthcare providers now, or just one and add the others later.
          </h3>
          <Button
            buttonText="Add A Doctor"
            dataTarget="add-doctor"
            dataToggle="modal"
            type="button"
            className="mt-5 max-w-fit mx-auto"
          />
        </div>
      </div>
      <ModalAddDoctor />
    </>
  );
};

export default OnboardingDoctors;
