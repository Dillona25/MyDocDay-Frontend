const ModalWrapper = ({ modalId, ariaLabel, ariaHidden = true, children }) => {
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex={-1}
      aria-labelledby={ariaLabel}
      aria-hidden={ariaHidden}
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
