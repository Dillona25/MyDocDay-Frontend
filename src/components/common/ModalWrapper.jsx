const ModalWrapper = ({ className, children, isOpen, onClose }) => {
  return (
    <>
      <div
        className={`modal fade ${isOpen ? "show" : ""}`}
        style={{ display: isOpen ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className={`modal-dialog ${className}`} role="document">
          <div className="modal-content">{children}</div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="modal-backdrop fade show" onClick={onClose}></div>
      )}
    </>
  );
};

export default ModalWrapper;
