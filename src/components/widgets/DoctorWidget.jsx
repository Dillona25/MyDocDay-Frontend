import { Link } from "react-router-dom";
import { currentUser } from "../../data/constants";
import { useDoctors } from "../../store/usersDoctorsContext";

const DoctorWidget = () => {
  const { doctors } = useDoctors();
  // const doctors = currentUser.usersDoctors ?? [];
  const topDoctors = doctors.slice(0, 4);
  const hasMoreDoctors = doctors.length > topDoctors.length;

  return (
    <section className="rounded-3 border-light p-3 h-100">
      <h3 className="text-primary text-poppins fw-semibold">Your Doctors</h3>
      <ul className="list-unstyled d-flex flex-column gap-4 mt-4">
        {doctors?.map((doctor) => (
          <li key={doctor.id} className="d-flex gap-2">
            {doctor.image_url ? (
              <img
                className="dr-img rounded-circle object-fit-cover flex-shrink-0"
                alt="Dr Profile Image"
                src={doctor.image_url}
              />
            ) : (
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center dr-img object-fit-cover flex-shrink-0">
                <span className="h4 fw-semibold m-0 text-body">
                  {doctor.first_name[0] && doctor.last_name[0]
                    ? `${doctor.first_name[0] + doctor.last_name[0]}`
                    : `${doctor.drFirstName.slice(0, 2)}`}
                </span>
              </div>
            )}
            <div className="d-flex flex-column">
              <h5 className="m-0 fw-semibold text-body">
                {doctor.first_name} {doctor.last_name}
              </h5>
              <span className="font-body fw-semibold text-body">
                {doctor.specialty}
              </span>
              <span className="font-body text-body">{doctor.clinic_name}</span>
            </div>
          </li>
        ))}
        {hasMoreDoctors && (
          <Link to="doctors" className="text-body text-center">
            View All Doctors
          </Link>
        )}
      </ul>
    </section>
  );
};

export default DoctorWidget;
