import Button from "../../components/common/Button";
import ModalAddAppointment from "../../components/modals/ModalAddAppointment";
import ModalAddDoctor from "../../components/modals/ModalAddDoctor";

const OnboardingAppointments = () => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <Button
            buttonText="Add Appointment"
            dataTarget="add-appointment"
            dataToggle="modal"
            type="button"
          />
        </div>
      </div>
      <ModalAddAppointment />
    </>
  );
};

export default OnboardingAppointments;
