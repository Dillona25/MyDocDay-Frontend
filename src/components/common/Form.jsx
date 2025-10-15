const FormWrapper = ({ children, onSubmit, className }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`${className} d-flex flex-column gap-4`}
    >
      {children}
    </form>
  );
};

export default FormWrapper;
