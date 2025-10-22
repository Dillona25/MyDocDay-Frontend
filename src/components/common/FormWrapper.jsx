const FormWrapper = ({ className, children }) => {
  return <form className={`${className}`}>{children}</form>;
};

export default FormWrapper;
