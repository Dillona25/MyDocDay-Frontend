import Button from "../../components/common/Button";
import ModalAddDoctor from "../../components/modals/ModalAddDoctor";

const OnboardingDoctors = () => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <Button
            buttonText="Add A Doctor"
            dataTarget="add-doctor"
            dataToggle="modal"
            type="button"
          />
        </div>
      </div>
      <ModalAddDoctor />
    </>
  );
};

export default OnboardingDoctors;
