const Button = ({ buttonText, className, type = "submit", onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`border-0 py-2 px-4 rounded-2 ${className}`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
