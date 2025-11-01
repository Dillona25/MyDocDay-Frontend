import SignupForm from "../../components/forms/onboarding/Signup";
import Check from "../../assets/Circle-Check.svg";

const Signup = () => {
  return (
    <div className="container auth-container py-5 py-md-0 d-flex align-items-center justify-content-center">
      <div
        className="row justify-content-center justify-content-md-between align-items-center"
        id="signup-page"
      >
        <div className="col-11 col-md-6 mb-5 md-md-0">
          <h4 className="font-poppins text-capitalize text-secondary text-center text-md-start">
            Welcome to
          </h4>
          <h1 className="font-poppins text-primary fw-bold text-center text-md-start">
            MyDocDay
          </h1>
          <p className="font-inter mt-4 text-center text-md-start">
            Making managing you and your families healthcare easy. No more
            scattered portals and remembering to book your follow up. We have
            you covered.
          </p>
          <ul className="list-unstyled ps-3 d-flex flex-column gap-2">
            <li className="d-flex align-items-center gap-2">
              <img
                alt="Check Mark Icon"
                src={Check}
                className="text-primary"
                height={30}
                width={30}
              />
              <p className="small m-0">
                All of your providers, organized in one dashboard
              </p>
            </li>
            <li className="d-flex align-items-center gap-2">
              <img
                alt="Check Mark Icon"
                src={Check}
                className="text-primary"
                height={30}
                width={30}
              />
              <p className="small m-0">
                Manage the entire family - doctors, appointments, and reminders
                for each!
              </p>
            </li>
            <li className="d-flex align-items-center gap-2">
              <img
                alt="Check Mark Icon"
                src={Check}
                className="text-primary"
                height={30}
                width={30}
              />
              <p className="small m-0">
                Smart reminders that know your healthcare needs and remind you
                when it matters!
              </p>
            </li>
          </ul>
          {/* <div className="p-3 d-flex justify-content-center align-items-center rounded-2 bg-primary-light w-75 mt-5">
          <img
            alt="MyDocDay Dashboard"
            src={MyDocDayDash}
            className="img-fluid rounded-2"
          />
        </div> */}
        </div>
        <div className="col-11 col-md-5 d-flex flex-column">
          <div className="card rounded-3 card-shadow p-4">
            <h4 className="font-poppins fw-semibold m-0 text-primary">
              Create Account
            </h4>
            <SignupForm />
            <span className="small mx-auto text-body mt-5">
              Already have an account? Sign in here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
