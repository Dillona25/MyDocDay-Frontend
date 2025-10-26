import SignupForm from "../../components/forms/onboarding/Signup";

const Signup = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-5 d-flex flex-column">
        <SignupForm className="w-100" />
        <span className="small mx-auto text-body mt-4">
          Already have an account? Signin here
        </span>
      </div>
    </div>
  );
};

export default Signup;
