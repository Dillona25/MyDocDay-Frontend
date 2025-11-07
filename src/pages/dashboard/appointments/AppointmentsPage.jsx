import AppointmentCard from "../../../components/common/AppointmentCard";
import { useAuthStore } from "../../../store/useAuth";
import { useAppointmentStore } from "../../../store/useAppointments";
import Button from "../../../components/common/Button";
import { useDoctorStore } from "../../../store/useDoctors";
import { useEffect } from "react";
import { useModal } from "../../../store/modalContext";
import ModalAddAppointment from "../../../components/modals/ModalAddAppointment";
import { Outlet } from "react-router-dom";

const AppointmentsPage = () => {
  const { appointments, initAppointments } = useAppointmentStore();
  const { user } = useAuthStore();
  const { doctors, initDoctors } = useDoctorStore();
  const { openModal } = useModal();

  useEffect(() => {
    initAppointments();
  }, [initAppointments]);

  useEffect(() => {
    initDoctors();
  }, [initDoctors]);

  function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString("default", { month: "long" });
    const year = d.getFullYear();

    // Determine ordinal suffix
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    return `${month} ${day}${suffix}, ${year}`;
  }

  const upcomingAppointments = appointments.filter(
    (apt) => new Date(apt.appointment_date) >= new Date()
  );

  const uniqueAptDates = Array.from(
    new Set(
      upcomingAppointments
        .map((apt) => apt.appointment_date)
        .sort((a, b) => new Date(a) - new Date(b))
    )
  );

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mt-0 mb-3 mb-md-0 text-left text-primary fw-semibold text-poppins">
              {user.first_name}'s Scheduled Appointments
            </h2>
            <Button
              onClick={openModal}
              buttonText="Add Appointment"
              className="max-w-fit bg-primary-light text-white align-self-center"
            />
          </div>
        </div>
      </div>

      {uniqueAptDates.map((date) => {
        const appointmentsForDate = upcomingAppointments.filter(
          (apt) => apt.appointment_date === date
        );

        return (
          <div key={date}>
            <div className="row mt-4">
              <div className="col-12 d-flex gap-3 align-items-center">
                <h5 className="font-poppins mb-0">{formatDate(date)}</h5>
                <div className="divider-line flex-grow-1 bg-primary-extra-light" />
              </div>
            </div>
            <div className="row">
              {appointmentsForDate.map((apt) => {
                const doctor = doctors.find(
                  (doctor) => doctor.id === apt.doctor_id
                );
                const clinicName =
                  doctor?.clinic_name || "Clinic not available";
                return (
                  <div className="col-12 col-md-4 mt-3 mb-4" key={apt.id}>
                    <AppointmentCard
                      doctorName={apt.doctor_name}
                      aptType={apt.appointment_type}
                      aptTitle={apt.appointment_title}
                      aptTime={apt.appointment_time}
                      aptDate={apt.appointment_date}
                      aptId={apt.id}
                      aptlLocation={clinicName}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <ModalAddAppointment />
      <Outlet />
    </>
  );
};

export default AppointmentsPage;
