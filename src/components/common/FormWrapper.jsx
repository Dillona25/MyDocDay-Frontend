const FormWrapper = ({ className, ref, onSubmit, children }) => {
  return (
    <form className={`${className}`} ref={ref} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default FormWrapper;
