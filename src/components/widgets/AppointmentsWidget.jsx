import AppointmentCard from "../common/AppointmentCard";
import Button from "../common/Button";
import SleepingDog from "../../assets/Sleeping-Dog-Icon.png";
import { Link, useNavigate } from "react-router-dom";
import { useAppointmentStore } from "../../store/useAppointments";
import { useDoctorStore } from "../../store/useDoctors";
import { useEffect } from "react";
import { isSameDay, parseAptDateTime } from "../../utils/helpers";

const AppointmentsWidget = () => {
  const { appointments, initAppointments } = useAppointmentStore();
  const { doctors } = useDoctorStore();
  const navigate = useNavigate();

  useEffect(() => {
    initAppointments();
  }, [initAppointments]);

  // TODO: handle UI if user has more than 3 apts in next 30 days. ("see all") etc.

  // TODO: Maybe show appointments for "this week" VS "today"..
  const today = new Date();
  const startOfToday = new Date(today);
  startOfToday.setHours(0, 0, 0, 0);

  const endOf30Days = new Date(startOfToday);
  endOf30Days.setDate(startOfToday.getDate() + 30);
  endOf30Days.setHours(23, 59, 59, 999);

  const todaysApts = appointments.filter((apt) => {
    const aptDateTime = parseAptDateTime(apt);
    return isSameDay(aptDateTime, startOfToday) && aptDateTime >= today;
  });

  const aptsInMonth = appointments.filter((apt) => {
    const aptDateTime = parseAptDateTime(apt);
    return (
      aptDateTime >= today &&
      aptDateTime <= endOf30Days &&
      !isSameDay(aptDateTime, startOfToday)
    );
  });

  const monthlyApts = aptsInMonth
    .sort(
      (a, b) => parseAptDateTime(a).getTime() - parseAptDateTime(b).getTime()
    )
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
              You have no upcoming appointments
            </h5>
          </div>
          <Button
            onClick={() => navigate("appointments")}
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
                {aptsInMonth.length > 2 && (
                  <p className="extra-small text-center my-1">
                    It looks like you have more appointments than we can show.
                    See them all <Link to="appointments">here</Link>.
                  </p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default AppointmentsWidget;
