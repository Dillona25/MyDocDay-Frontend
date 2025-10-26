import Button from "../../components/common/Button";
import ModalAddAppointment from "../../components/modals/ModalAddAppointment";
import ModalAddDoctor from "../../components/modals/ModalAddDoctor";

const OnboardingAppointments = () => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-8 d-flex flex-column">
          <h1 className="font-poppins fw-bold text-body text-center mb-4">
            Now, Let's Add Any Upcoming Appointments You Have!
          </h1>
          <h3 className="lead text-center">
            Press the button below to add your upcoming appointments. Don't have
            any? No problem, just skip this step!
          </h3>
          <Button
            buttonText="Add Appointment"
            dataTarget="add-appointment"
            dataToggle="modal"
            type="button"
            className="mt-5 max-w-fit mx-auto"
          />
        </div>
      </div>
      <ModalAddAppointment />
    </>
  );
};

export default OnboardingAppointments;
