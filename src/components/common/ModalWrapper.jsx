const ModalWrapper = ({
  modalId,
  ariaLabel,
  className,
  ariaHidden = true,
  children,
}) => {
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex={-1}
      aria-labelledby={ariaLabel}
      aria-hidden={ariaHidden}
      role="dialog"
    >
      <div className={`modal-dialog ${className}`} role="document">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
