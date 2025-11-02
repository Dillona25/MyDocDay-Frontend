import { Link } from "react-router-dom";
import SignupForm from "../../components/forms/onboarding/Signup";

const Signup = () => {
  return (
    <div className="container auth-container py-5 py-md-0 d-flex align-items-center justify-content-center">
      <div
        className="auth-page d-flex flex-column align-items-center w-100"
        id="auth-page"
      >
        <div className="text-center mb-5">
          <h4 className="font-poppins text-secondary">Welcome To</h4>
          <h1 className="font-poppins text-primary fw-bold">MyDocDay</h1>
        </div>

        <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
          <div className="card rounded-3 card-shadow p-4">
            <h4 className="font-poppins fw-semibold m-0 text-primary">
              Create Account
            </h4>
            <SignupForm />
            <span className="small text-body mt-4 text-center d-block">
              Already have an account? Sign In <Link to="/signin/">here</Link>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
