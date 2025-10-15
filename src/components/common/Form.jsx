const FormWrapper = ({ children, onSubmit, className }) => {
  return (
    <form onSubmit={onSubmit} className={`${className} d-flex flex-column`}>
      {children}
    </form>
  );
};

export default FormWrapper;
