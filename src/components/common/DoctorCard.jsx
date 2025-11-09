import { Link, useLocation } from "react-router-dom";

const DoctorCard = ({
  firstName,
  lastName,
  image,
  specialty,
  clinicName,
  city,
  state,
  docId,
}) => {
  const location = useLocation();
  const hideElement = location.pathname.includes("onboarding");

  return (
    <div className="card rounded-3 p-3 d-flex flex-row gap-3">
      {image ? (
        <img
          className="dr-profile-image rounded-circle object-fit-cover flex-shrink-0"
          alt="Dr Profile Image"
          src={image}
        />
      ) : (
        <div className="bg-light rounded-circle d-flex align-items-center justify-content-center dr-profile-image object-fit-cover flex-shrink-0">
          <span className="h2 fw-semibold m-0 text-body">
            {firstName[0] && lastName[0]
              ? `${firstName[0] + lastName[0]}`
              : `${firstName.slice(0, 2)}`}
          </span>
        </div>
      )}
      <div className="row justify-content-between w-100">
        <div className="col-12 col-sm-6 col-md-12 col-lg-6">
          <div className="d-flex flex-column flex-sm-row flex-md-column flex-lg-row justify-content-between w-100">
            <div className="d-flex flex-column">
              <h5 className="m-0 fw-semibold text-body">
                {firstName} {lastName}
              </h5>
              <span className="font-body text-body">{specialty}</span>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-12 col-lg-6 mt-2 mt-sm-0 mt-md-2 mt-lg-0 d-flex flex-column">
          <span className="font-body text-body smal text-nowrap text-lg-end text-truncate">
            {clinicName}
          </span>
          <span className="font-body text-body small text-lg-end text-truncate">
            {city}, {state}
          </span>

          {!hideElement && (
            <Link
              to={`edit/${docId}`}
              className="extra-small text-decoration-underline border-0 bg-transparent text-body mt-auto align-self-end p-0"
            >
              Edit Doctor
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
