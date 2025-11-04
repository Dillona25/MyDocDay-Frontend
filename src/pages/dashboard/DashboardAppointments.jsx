import AppointmentCard from "../../components/common/AppointmentCard";
import { useAuthStore } from "../../store/useAuth";
import { useAppointmentStore } from "../../store/useAppointments";
import Button from "../../components/common/Button";
import { useDoctorStore } from "../../store/useDoctors";
import { useEffect } from "react";

const DashboardAppointments = () => {
  const { appointments, initAppointments } = useAppointmentStore();
  const { user } = useAuthStore();
  const { doctors } = useDoctorStore();

  useEffect(() => {
    initAppointments();
  }, [initAppointments]);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center border-bottom border-3 border-primary pb-3">
            <h2 className="mt-0 mb-3 mb-md-0 text-left text-primary fw-semibold text-poppins">
              {user.first_name}'s Scheduled Appointments
            </h2>
            <Button
              buttonText="Add Appointment"
              className="max-w-fit bg-primary-light text-white align-self-center"
            />
          </div>
        </div>
      </div>

      <div className="row mt-5">
        {appointments.map((apt) => {
          const doctor = doctors.find((d) => d.id === apt.doctor_id);
          const clinicName = doctor?.clinic_name || "Clinic not available";
          return (
            <div className="col-12 col-md-4 mb-3" key={apt.id}>
              <AppointmentCard
                doctorName={apt.doctor_name}
                aptType={apt.appointment_type}
                aptTitle={apt.appointment_title}
                aptTime={apt.appointment_time}
                aptDate={apt.appointment_date}
                aptlLocation={clinicName}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DashboardAppointments;
