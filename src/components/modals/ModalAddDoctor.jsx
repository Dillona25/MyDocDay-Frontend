import ModalWrapper from "../common/ModalWrapper";
import AddClinic from "../forms/onboarding/AddClinic";
import AddDoctors from "../forms/onboarding/AddDoctors";

const ModalAddDoctor = () => {
  return (
    <ModalWrapper
      modalId="add-doctor"
      ariaLabel="Add-Doctor-Modal"
      className="modal-lg"
    >
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="Add-Doctor-Modal">
          Add Doctor
        </h1>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body p-4">
        <AddDoctors />
      </div>
    </ModalWrapper>
  );
};

export default ModalAddDoctor;
