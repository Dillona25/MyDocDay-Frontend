import { Link } from "react-router-dom";
import SigninForm from "../../components/forms/onboarding/Signin";

const Signin = () => {
  return (
    <div className="container auth-container py-5 py-md-0 d-flex align-items-center justify-content-center">
      <div className="row flex-column" id="auth-page">
        <div className="col-11 col-md-6 mb-5 md-md-0 mx-auto">
          <h4 className="font-poppins text-capitalize text-secondary text-center">
            Welcome Back To
          </h4>
          <h1 className="font-poppins text-primary fw-bold text-center">
            MyDocDay
          </h1>
          <p className="font-inter mt-4 text-center">
            Making managing you and your families healthcare easy. No more
            scattered portals and remembering to book your follow up. We have
            you covered.
          </p>
        </div>
        <div className="col-11 col-md-6 d-flex flex-column mx-auto">
          <div className="card rounded-3 card-shadow p-4">
            <h4 className="font-poppins fw-semibold m-0 text-primary">
              Sign In
            </h4>
            <SigninForm />
            <span className="small mx-auto text-body mt-5">
              Don't have an account? Sign Up <Link to="/signup/">here</Link>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
