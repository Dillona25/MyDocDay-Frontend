const FormWrapper = ({ className, onSubmit, children }) => {
  return (
    <form className={`${className}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default FormWrapper;
