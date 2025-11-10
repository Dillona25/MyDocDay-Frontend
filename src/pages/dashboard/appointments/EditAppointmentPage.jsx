import { useEffect, useMemo } from "react";
import { useAppointmentStore } from "../../../store/useAppointments";
import { useParams } from "react-router-dom";
import EditAppointmentsForm from "../../../components/forms/common/EditAppointmentForm";
import locationDot from "../../../assets/location-dot.svg";

const EditAppointmentPage = () => {
  const { appointments, initAppointments } = useAppointmentStore();
  const { id } = useParams();

  useEffect(() => {
    initAppointments();
  }, [initAppointments]);

  // We can remove this, just like to have the console
  const appointment = useMemo(
    () => appointments.find((apt) => String(apt.id) === String(id)),
    [appointments, id]
  );

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
            <h5 className="">Tuesday, 18th, 2025</h5>
            <span>10:30AM</span>
            <span className="bg-primary-subtle text-primary-emphasis border-primary-subtle px-3 py-1 extra-small fw-semibold border rounded-pill  max-w-fit mt-3">
              In-Person
            </span>
          </div>

          <div className="d-flex gap-2 mt-5">
            <img
              src={locationDot}
              alt="Dot Icon"
              className="img-fluid dot-icon-lg"
            />
            <div className="d-flex flex-column">
              <span className="fw-semibold">University of Washington</span>
              <span>Seattle, WA</span>
            </div>
          </div>
        </div>
        <div className="col-6">
          <EditAppointmentsForm initialValues={appointment} />
        </div>
      </div>
    </>
  );
};

export default EditAppointmentPage;
