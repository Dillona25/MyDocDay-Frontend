import ModalWrapper from "../common/ModalWrapper";
import AddAppointments from "../forms/onboarding/AddAppointments";

const ModalAddAppointment = () => {
  return (
    <ModalWrapper modalId="add-appointment" ariaLabel="Add-Appointment-Modal">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="Add-Appointment-Modal">
          Add Appointment
        </h1>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body p-4">
        <AddAppointments />
      </div>
    </ModalWrapper>
  );
};

export default ModalAddAppointment;
