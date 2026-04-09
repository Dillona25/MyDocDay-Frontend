import AppointmentCard from "../common/AppointmentCard";
import Button from "../common/Button";
import SleepingDog from "../../assets/Sleeping-Dog-Icon.png";
import { Link, useNavigate } from "react-router-dom";
import { useAppointmentStore } from "../../store/useAppointments";
import { useEffect } from "react";
import { parseAptDateTime } from "../../utils/helpers";

const AppointmentsWidget = () => {
  const { appointments, initAppointments } = useAppointmentStore();
  const navigate = useNavigate();

  useEffect(() => {
    initAppointments();
  }, [initAppointments]);

  // TODO: handle UI if user has more than 3 apts in next 30 days. ("see all") etc.

  // TODO: Maybe show appointments for "this week" VS "today"..
  const today = new Date();
  const startOfToday = new Date(today);
  startOfToday.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfToday);
  endOfWeek.setDate(startOfToday.getDate() + 7);
  endOfWeek.setHours(23, 59, 59, 999);

  const endOf30Days = new Date(startOfToday);
  endOf30Days.setDate(startOfToday.getDate() + 30);
  endOf30Days.setHours(23, 59, 59, 999);

  const weekApts = appointments
    .filter((apt) => {
      const aptDateTime = parseAptDateTime(apt);
      return aptDateTime >= today && aptDateTime <= endOfWeek;
    })
    .sort(
      (a, b) => parseAptDateTime(a).getTime() - parseAptDateTime(b).getTime(),
    );

  const aptsInMonth = appointments.filter((apt) => {
    const aptDateTime = parseAptDateTime(apt);
    return aptDateTime > endOfWeek && aptDateTime <= endOf30Days;
  });

  const monthlyApts = aptsInMonth
    .sort(
      (a, b) => parseAptDateTime(a).getTime() - parseAptDateTime(b).getTime(),
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

      {weekApts.length === 0 && aptsInMonth.length === 0 ? (
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
          {weekApts.length > 0 && (
            <>
              <div className="d-flex align-items-center gap-3 mt-3 today-divider">
                <span className="text-uppercase fw-semibold text-body small">
                  In The Next Week
                </span>
                <div className="divider-line flex-grow-1 bg-black" />
              </div>

              <div className="row mt-2 g-3">
                {weekApts.map((apt) => {
                  return (
                    <div className="col-12 col-md-6 mb-3" key={apt.id}>
                      <AppointmentCard
                        doctorName={apt.doctor_name}
                        aptType={apt.appointment_type}
                        aptTitle={apt.appointment_title}
                        aptTime={apt.appointment_time}
                        aptDate={apt.appointment_date}
                        aptlLocation={apt.clinic_name}
                      />
                    </div>
                  );
                })}
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
                  return (
                    <div className="col-12 col-md-6 mb-3" key={apt.id}>
                      <AppointmentCard
                        doctorName={apt.doctor_name}
                        aptType={apt.appointment_type}
                        aptTitle={apt.appointment_title}
                        aptTime={apt.appointment_time}
                        aptDate={apt.appointment_date}
                        aptlLocation={apt.clinic_name}
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
