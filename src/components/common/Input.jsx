const Input = ({
  labelText,
  type,
  value,
  name,
  placeholder,
  onChange,
  className,
}) => {
  return (
    <div className="d-flex flex-column gap-2">
      {labelText ? <label>{labelText}</label> : ""}
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={`rounded-2 p-2 border-1 ${className}`}
      ></input>
    </div>
  );
};

export default Input;
