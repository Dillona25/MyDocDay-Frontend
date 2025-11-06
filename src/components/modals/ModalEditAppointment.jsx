import { useModal } from "../../store/modalContext";
import ModalWrapper from "../common/ModalWrapper";
import AddAppointments from "../forms/onboarding/AddAppointments";

const ModalEditAppointment = () => {
  const { isOpen, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal}>
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="Edit-Appointment-Modal">
          Edit Appointment
        </h1>
        <button
          type="button"
          className="btn-close"
          onClick={closeModal}
        ></button>
      </div>
      <div className="modal-body p-4">
        <AddAppointments />
      </div>
    </ModalWrapper>
  );
};

export default ModalEditAppointment;
