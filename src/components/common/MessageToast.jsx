import { useToastStore } from "../../store/useToast";

const MessageToast = () => {
  const { visible, title, titleClass, message, hideToast } = useToastStore();

  return (
    <div className="position-fixed bottom-0 end-0 p-3 z-high">
      <div
        className={`custom-toast position-relative opacity-0 card ${
          visible ? "toast-enter" : "toast-exit"
        }`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header p-2 border-1 border-bottom">
          <strong className={`me-auto ${titleClass}`}>{title}</strong>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={hideToast}
          ></button>
        </div>
        <div className="toast-body p-2 text-body">{message}</div>
      </div>
    </div>
  );
};

export default MessageToast;
