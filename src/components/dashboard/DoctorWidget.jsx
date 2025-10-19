import { currentUser } from "../../data/user";

const DoctorWidget = () => {
  const doctors = currentUser.usersDoctors ?? [];
  const topDoctors = doctors.slice(0, 4);
  const hasMoreDoctors = doctors.length > topDoctors.length;

  return (
    <div className="col-3 rounded-3 border-light p-3">
      <h3 className="text-primary text-poppins fw-semibold">Your Doctors</h3>
      <ul className="list-unstyled d-flex flex-column gap-4 mt-5">
        {topDoctors?.map((doctor) => (
          <li key={doctor.drID} className="d-flex gap-2">
            {doctor.drProfileImage ? (
              <img
                className="drImg rounded-circle"
                alt="Dr Profile Image"
                src={doctor.drProfileImage}
              />
            ) : (
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center drImg">
                <span className="h4 fw-semibold m-0 text-body">
                  {doctor.drFirstName[0] && doctor.drLastName[0]
                    ? `${doctor.drFirstName[0] + doctor.drLastName[0]}`
                    : `${doctor.drFirstName.slice(0, 2)}`}
                </span>
              </div>
            )}
            <div className="d-flex flex-column">
              <h5 className="m-0 fw-semibold text-body">
                {doctor.drFirstName} {doctor.drLastName}
              </h5>
              <span className="font-body fw-semibold text-body">
                {doctor.drProfession}
              </span>
              <span className="font-body text-body">
                {doctor.drOffice.drOfficeName}
              </span>
            </div>
          </li>
        ))}
        {hasMoreDoctors && (
          <a href="" className="text-body text-center">
            View All Doctors
          </a>
        )}
      </ul>
    </div>
  );
};

export default DoctorWidget;
