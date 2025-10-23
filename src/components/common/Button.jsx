const Button = ({
  buttonText,
  className,
  type = "submit",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`border-0 py-2 px-4 rounded-2 ${className}`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
