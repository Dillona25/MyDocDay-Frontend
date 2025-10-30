const DoctorCard = ({ firstName, lastName, image, specialty, clinicName }) => {
  return (
    <div className="card rounded-3 p-3 d-flex flex-row gap-3">
      {image ? (
        <img
          className="dr-img rounded-circle object-fit-cover flex-shrink-0"
          alt="Dr Profile Image"
          src={image}
        />
      ) : (
        <div className="bg-light rounded-circle d-flex align-items-center justify-content-center dr-img object-fit-cover flex-shrink-0">
          <span className="h4 fw-semibold m-0 text-body">
            {firstName[0] && lastName[0]
              ? `${firstName[0] + lastName[0]}`
              : `${firstName.slice(0, 2)}`}
          </span>
        </div>
      )}
      <div className="d-flex flex-column">
        <h5 className="m-0 fw-semibold text-body">
          {firstName} {lastName}
        </h5>
        <span className="font-body fw-semibold text-body">{specialty}</span>

        <span className="font-body text-secondary small">{clinicName}</span>
      </div>
    </div>
  );
};

export default DoctorCard;
