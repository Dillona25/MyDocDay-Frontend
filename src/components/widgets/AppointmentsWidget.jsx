import AppointmentCard from "../common/AppointmentCard";
import { currentUser } from "../../data/constants";
import Button from "../common/Button";
import SleepingDog from "../../assets/Sleeping-Dog-Icon.png";
import { Link } from "react-router-dom";

const AppointmentsWidget = () => {
  const limitedApts = currentUser.upcomingAppointments.slice(0, 3);

  // Get our date and start at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Create our date 30 days out!
  const in30Days = new Date(today);
  in30Days.setDate(today.getDate() + 30);

  // Find todays appointments
  const todaysApts = limitedApts.filter((apt) => {
    const aptDate = new Date(apt.start);
    aptDate.setHours(0, 0, 0, 0);
    return aptDate.getTime() === today.getTime();
  });

  // Find appointments within the next 30 days
  const aptsInMonth = limitedApts.filter((apt) => {
    const aptDate = new Date(apt.start);
    aptDate.setHours(0, 0, 0, 0);
    return aptDate >= today && aptDate <= in30Days;
  });

  return (
    <section className="border border-light rounded-3 p-3">
      <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between">
        <h3 className="mt-0 mb-3 mb-md-0 text-center text-md-left">
          Your Appointments
        </h3>
        <Link to="appointments" className="mx-auto mx-md-0 mb-3 mb-md-0">
          <Button buttonText="View All Appointments" className="small" />
        </Link>
      </div>

      {todaysApts.length > 0 ? (
        <>
          <div className="d-flex align-items-center gap-3 mt-3 today-divider">
            <span className="text-uppercase fw-semibold text-body small">
              Today
            </span>
            <div className="divider-line flex-grow-1 bg-black" />
          </div>

          <div className="row mt-2 g-3">
            {todaysApts.map((apt) => (
              <AppointmentCard
                key={apt.id}
                doctorName={apt.doctorName}
                aptTime={apt.start}
                aptlLocation={apt.location}
                aptType={apt.type}
                aptTitle={apt.title}
              />
            ))}
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
          <div className="d-flex align-items-center gap-3 mt-3 today-divider">
            <span className="text-uppercase fw-semibold text-body small">
              In the next 30 days
            </span>
            <div className="divider-line flex-grow-1 bg-black" />
          </div>

          <div className="row mt-2 g-3">
            {aptsInMonth.length > 0
              ? aptsInMonth.map((apt) => (
                  <AppointmentCard
                    key={apt.id}
                    doctorName={apt.doctorName}
                    aptTime={apt.start}
                    aptlLocation={apt.location}
                    aptType={apt.type}
                    aptTitle={apt.title}
                    isMuted={true}
                  />
                ))
              : ""}
          </div>
        </>
      )}
    </section>
  );
};

export default AppointmentsWidget;
