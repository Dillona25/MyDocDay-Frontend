import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuth";
import { VerifyEmailForm } from "../../components/forms/auth/VerifyEmail";

const VerifyEmail = () => {
  const { user } = useAuthStore();

  // If the user has onboarding_complete === true then go to dashboard else go to step one

  return (
    <div className="container auth-container py-5 py-md-0 d-flex align-items-center justify-content-center">
      <div
        className="auth-page d-flex flex-column align-items-center w-100"
        id="auth-page"
      >
        <div className="text-center mb-5">
          <h1 className="font-poppins text-primary fw-bold mb-3">
            Let's Verify Your Email
          </h1>
          <p className="lead text-center">
            Please enter the code sent to {user?.email}.
          </p>
          <p>The code will expire in 5 minutes</p>
        </div>

        <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
          <div className="card rounded-3 card-shadow p-4">
            <VerifyEmailForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
