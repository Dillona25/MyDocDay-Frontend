import { Link } from "react-router-dom";

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
      <div className="d-flex justify-content-between w-100">
        <div className="d-flex flex-column">
          <h5 className="m-0 fw-semibold text-body">
            {firstName} {lastName}
          </h5>
          <span className="font-body text-body">{specialty}</span>
        </div>
        <div className="d-flex flex-column">
          <span className="font-body text-body small">{clinicName}</span>
          <span className="font-body text-body small text-end">
            {city}, {state}
          </span>
          <Link
            to={`edit/${docId}`}
            className="extra-small text-decoration-underline border-0 bg-transparent text-body mt-auto align-self-end p-0"
          >
            Edit Doctor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
