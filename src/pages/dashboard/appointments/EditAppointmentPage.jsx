import { useEffect, useMemo } from "react";
import { useAppointmentStore } from "../../../store/useAppointments";
import { useParams } from "react-router-dom";
import EditAppointmentsForm from "../../../components/forms/common/EditAppointmentForm";
import locationDot from "../../../assets/location-dot.svg";
import doctorIcon from "../../../assets/Doctor-Icon.svg";
import { useDoctorStore } from "../../../store/useDoctors";

const EditAppointmentPage = () => {
  const { appointments, initAppointments } = useAppointmentStore();
  const { doctors, initDoctors } = useDoctorStore();
  const { id } = useParams();

  // Initializing our appointment - from our appointment store
  useEffect(() => {
    initAppointments();
  }, [initAppointments]);

  // Initializing our doctors - from our doctor store
  useEffect(() => {
    initDoctors();
  }, [initDoctors]);

  // Finding the appointment ID in which matches the React Router id from the URL
  // ? Could this be improved with an API endpoint? I feel like it can but for now appointment count is low..
  const appointment = useMemo(
    () => appointments.find((apt) => String(apt.id) === String(id)),
    [appointments, id]
  );

  // Finding the doctor whos ID matches the appointment objects doctor ID - Linking the two
  const doctor = useMemo(() =>
    doctors.find((doc) => String(doc.id) === String(appointment?.doctor_id))
  );

  // Formatting our Appointment date
  const formatAptTime = (date) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return isoString;
    }

    const dayLabel = parsedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    return `${dayLabel}`;
  };

  // Returning the formatted date that looks nice for the user!
  const formattedDate = formatAptTime(appointment?.appointment_date);

  // Also formatting our time.
  function formatTime(time) {
    const [hoursStr, minutes] = time.split(":");
    let hours = parseInt(hoursStr, 10);
    const format = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes}${format}`;
  }

  // Again, returning the pretty formatted time!
  const formattedTime = appointment?.appointment_time
    ? formatTime(appointment.appointment_time)
    : "";

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center border-bottom border-3 border-primary pb-3">
            <h3 className="mt-0 mb-3 mb-md-0 text-left text-primary fw-semibold text-poppins">
              Edit Appointment
            </h3>
          </div>
        </div>
      </div>

      <div className="row justify-content-between pt-5">
        <div className="col-4">
          <div className="d-flex flex-column">
            <h3 className="text-primary">{appointment?.appointment_title}</h3>
            <h5 className="">{formattedDate}</h5>
            <span>{formattedTime}</span>
            <span className="bg-primary-subtle text-primary-emphasis border-primary-subtle px-3 py-1 extra-small fw-semibold border rounded-pill  max-w-fit mt-3">
              In-Person
            </span>
          </div>

          <div className="d-flex gap-2 mt-5">
            <img
              src={doctorIcon}
              alt="Dot Icon"
              className="img-fluid icon-lg"
            />
            <span className="fw-semibold">
              {doctor?.first_name} {doctor?.last_name}
            </span>
          </div>

          <div className="d-flex gap-2 mt-3">
            <img
              src={locationDot}
              alt="Dot Icon"
              className="img-fluid icon-lg"
            />
            <div className="d-flex flex-column">
              <span className="fw-semibold">{doctor?.clinic_name}</span>
              <span>
                {doctor?.city}, {doctor?.state}
              </span>
            </div>
          </div>
        </div>
        <div className="col-6">
          {/* Passing the entire matched appointment object to the edit form so we can pull its values to be used as default values */}
          <EditAppointmentsForm initialValues={appointment} />
        </div>
      </div>
    </>
  );
};

export default EditAppointmentPage;
