import AppointmentCard from "../common/AppointmentCard";
import Button from "../common/Button";
import SleepingDog from "../../assets/Sleeping-Dog-Icon.png";
import { Link } from "react-router-dom";
import { useAppointmentStore } from "../../store/useAppointments";
import { useDoctorStore } from "../../store/useDoctors";
import { useEffect } from "react";

const AppointmentsWidget = () => {
  const { appointments, initAppointments } = useAppointmentStore();
  const { doctors } = useDoctorStore();

  useEffect(() => {
    initAppointments();
  }, [initAppointments]);

  // Only show 3 apts, even if in next 30 days.
  // TODO: handle UI if user has more than 3 apts in next 30 days. ("see all") etc.

  // TODO: Maybe show appointments for "this week" VS "today"..
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Create our date 30 days out!
  const in30Days = new Date(today);
  in30Days.setDate(today.getDate() + 30);

  // Find todays appointments
  const todaysApts = appointments.filter((apt) => {
    const aptDate = new Date(apt.appointment_date);
    aptDate.setHours(0, 0, 0, 0);
    return aptDate.getTime() === today.getTime();
  });

  // Find appointments within the next 30 days
  const aptsInMonth = appointments.filter((apt) => {
    const aptDate = new Date(apt.appointment_date);
    aptDate.setHours(0, 0, 0, 0);
    return aptDate >= today && aptDate <= in30Days;
  });

  const monthlyApts = aptsInMonth
    .sort((a, b) => a.appointment_date - new Date(b.appointment_date))
    .slice(0, 2);

  return (
    <section className="border border-light rounded-3 p-3">
      <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between">
        <h3 className="mt-0 mb-3 mb-md-0 text-center text-md-left text-primary">
          Your Appointments
        </h3>
        <Link to="appointments" className="mx-auto mx-md-0 mb-3 mb-md-0">
          <Button buttonText="View All Appointments" className="small" />
        </Link>
      </div>

      {todaysApts.length === 0 && aptsInMonth.length === 0 ? (
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex align-items-center justify-content-center gap-2 mt-4">
            <img src={SleepingDog} height={120} alt="Relaxing Dog" />
            <h5 className="text-body fw-semibold text-center">
              No appointments on the calendar. It’s a perfect day to take it
              easy!
            </h5>
          </div>
          <Button
            buttonText="Add Appointment"
            className="max-w-fit bg-primary-light text-white"
          />
        </div>
      ) : (
        <>
          {todaysApts.length > 0 ? (
            <>
              <div className="d-flex align-items-center gap-3 mt-3 today-divider">
                <span className="text-uppercase fw-semibold text-body small">
                  Today
                </span>
                <div className="divider-line flex-grow-1 bg-black" />
              </div>

              <div className="row mt-2 g-3">
                {todaysApts.map((apt) => {
                  const doctor = doctors.find((d) => d.id === apt.doctor_id);
                  const clinicName =
                    doctor?.clinic_name || "Clinic not available";
                  return (
                    <div className="col-12 col-md-6 mb-3" key={apt.id}>
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
          ) : (
            <>
              <div className="mx-auto d-flex flex-column flex-md-row align-items-center gap-2">
                <img src={SleepingDog} height={100} alt="Relaxing Dog" />
                <h5 className="text-body fw-semibold text-center mb-5 mb-md-0">
                  It's a great day to relax. You have no appointments today!
                </h5>
              </div>
            </>
          )}

          {monthlyApts.length > 0 && (
            <>
              <div className="d-flex align-items-center gap-3 mt-3 today-divider">
                <span className="text-uppercase fw-semibold text-body small">
                  In the next 30 days
                </span>
                <div className="divider-line flex-grow-1 bg-black" />
              </div>

              <div className="row mt-2 g-3">
                {monthlyApts.map((apt) => {
                  const doctor = doctors.find((d) => d.id === apt.doctor_id);
                  const clinicName =
                    doctor?.clinic_name || "Clinic not available";
                  return (
                    <div className="col-12 col-md-6 mb-3" key={apt.id}>
                      <AppointmentCard
                        doctorName={apt.doctor_name}
                        aptType={apt.appointment_type}
                        aptTitle={apt.appointment_title}
                        aptTime={apt.appointment_time}
                        aptDate={apt.appointment_date}
                        aptlLocation={clinicName}
                        isMuted={true}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default AppointmentsWidget;
