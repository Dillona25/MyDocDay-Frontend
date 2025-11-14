import { useModal } from "../../store/modalContext";
import Button from "../common/Button";
import ModalWrapper from "../common/ModalWrapper";

export const ModalConfirmationMessage = ({
  message = "",
  submessage = "",
  buttonText = "confirm",
  handleSubmit,
}) => {
  const { isOpen, closeModal } = useModal();

  if (!isOpen) return null;
  return (
    <ModalWrapper isOpen={isOpen} onClose={closeModal}>
      <div className="modal-header">
        <button
          type="button"
          className="btn-close"
          onClick={closeModal}
        ></button>
      </div>
      <div className="modal-body p-4 d-flex flex-column">
        <h2 className="text-center text-primary fw-semibold">{message}</h2>
        {submessage && <p className="mt-3 small text-center">{submessage}</p>}
        <Button
          onClick={handleSubmit}
          buttonText={buttonText}
          className="mx-auto mt-4 max-w-fit bg-primary-light text-white"
        />
      </div>
    </ModalWrapper>
  );
};

export default ModalConfirmationMessage;
