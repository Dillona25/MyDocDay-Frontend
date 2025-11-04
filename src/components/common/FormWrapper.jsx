const FormWrapper = ({ className, onSubmit, children }, ref) => {
  return (
    <form className={`${className}`} ref={ref} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default FormWrapper;
