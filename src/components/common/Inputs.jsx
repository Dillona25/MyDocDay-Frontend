import { useId } from "react";

// ** TEXT INPUT
const TextInput = ({
  labelText,
  value,
  name,
  placeholder,
  onChange,
  className = "",
}) => {
  // Provides an input/label pair a unique id
  const inputId = useId();

  // Check if our input has content or not. PHP is nicer for this..
  const hasContent =
    value !== undefined &&
    value !== null &&
    (typeof value === "number" || `${value}`.trim().length > 0);

  return (
    <div
      className={`input-field position-relative d-flex flex-column gap-2 ${
        hasContent ? "input-field filled" : ""
      }`}
    >
      <div className="input-field__wrapper position-relative">
        <input
          id={inputId}
          type="text"
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className={`rounded-2 p-2 border-1 w-100 input-field__control ${className}`}
        />
        {labelText ? (
          <label
            className="input-field__label position-absolute p-1 small"
            htmlFor={inputId}
          >
            {labelText}
          </label>
        ) : null}
      </div>
    </div>
  );
};

export default TextInput;
