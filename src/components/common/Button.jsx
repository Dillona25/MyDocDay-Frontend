const Button = ({
  dataToggle,
  dataTarget,
  buttonText = "",
  className = "",
  type = "",
  onClick,
  disabled = false,
}) => {
  const buttonProps = {
    type,
    disabled,
    onClick,
    className: `border-0 py-2 px-4 rounded-2 ${className}`,
  };

  if (dataToggle) {
    buttonProps["data-bs-toggle"] = dataToggle;
  }

  if (dataTarget) {
    buttonProps["data-bs-target"] = `#${dataTarget}`;
  }

  return <button {...buttonProps}>{buttonText}</button>;
};

export default Button;
