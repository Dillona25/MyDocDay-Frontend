import { useId } from "react";
import { forwardRef } from "react";

// ** TEXT INPUT
const TextInput = forwardRef(
  (
    {
      labelText,
      type = "text",
      pattern,
      value,
      name,
      placeholder,
      onChange,
      className = "",
      required = false,
    },
    ref
  ) => {
    // unique id for label pairing
    const inputId = useId();

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
          {required && (
            <span className=" h5 position-absolute input-field__required">
              *
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            pattern={pattern}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            className={`rounded-2 p-2 border-1 w-100 input-field__control ${className}`}
            required={required}
          />

          {labelText && (
            <label
              className="input-field__label position-absolute p-1 small"
              htmlFor={inputId}
            >
              {labelText}
            </label>
          )}
        </div>
      </div>
    );
  }
);

const SelectInput = (
  { defaultOptionText = "", options, className = "", ...rest },
  ref
) => {
  return (
    <div className="d-flex flex-column gap-2">
      <select
        ref={ref}
        {...rest}
        className={`rounded-2 p-2 border-1 w-100 input-field__control ${className}`}
      >
        <option value="" disabled>
          {defaultOptionText}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const RadioInput = ({
  value,
  defaultOptionText = "",
  options,
  onChange,
  className = "",
  id,
  disabled = false,
}) => {
  return (
    <div className="d-flex flex-column gap-2">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`rounded-2 p-2 border-1 w-100 input-field__control ${className}`}
      >
        <option>{defaultOptionText}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { TextInput, SelectInput };
