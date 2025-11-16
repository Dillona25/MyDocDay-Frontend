import { Link, useNavigate } from "react-router-dom";
import { useDoctorStore } from "../../store/useDoctors";
import Button from "../common/Button";
import { useEffect } from "react";

const DoctorWidget = () => {
  const { doctors, initDoctors } = useDoctorStore();
  const topDoctors = doctors.slice(0, 4);
  const hasMoreDoctors = doctors.length > topDoctors.length;
  const navigate = useNavigate();

  useEffect(() => {
    initDoctors();
  }, [initDoctors]);

  return (
    <section className="rounded-3 border-light p-3 h-100">
      <h3 className="text-primary text-poppins">Your Doctors</h3>
      <ul className="list-unstyled d-flex flex-column gap-4 mt-4">
        {doctors && doctors.length > 0 ? (
          topDoctors.map((doctor) => (
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
                    {doctor.first_name?.[0] && doctor.last_name?.[0]
                      ? `${doctor.first_name[0]}${doctor.last_name[0]}`
                      : doctor.drFirstName?.slice(0, 2)}
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
                <span className="font-body text-body">
                  {doctor.clinic_name}
                </span>
              </div>
            </li>
          ))
        ) : (
          <li className="d-flex flex-column gap-3 mb-5">
            <h5 className="text-body fw-semibold text-center mt-5">
              You currently have not added any doctors.
            </h5>
            <Button
              onClick={() => navigate("doctors")}
              buttonText="Add Doctor"
              className="max-w-fit bg-primary-light text-white align-self-center"
            />
          </li>
        )}

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
