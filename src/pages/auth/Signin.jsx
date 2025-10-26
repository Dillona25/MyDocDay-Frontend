import SigninForm from "../../components/forms/onboarding/Signin";
import SignupForm from "../../components/forms/onboarding/Signin";

const Signin = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row justify-content-center">
        <div className="col-5 d-flex flex-column">
          <SigninForm className="w-100" />
          <span className="small mx-auto text-body mt-4">
            Already have an account? Signin here
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signin;
