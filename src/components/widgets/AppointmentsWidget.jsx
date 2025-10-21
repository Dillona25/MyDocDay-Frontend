import AppointmentCard from "../common/AppointmentCard";
import { currentUser } from "../../data/user";
import Button from "../common/Button";
import SleepingDog from "../../assets/Sleeping-Dog-Icon.png";

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
    <div className="col-8">
      <h4>Your Appointments</h4>

      {todaysApts.length > 0 ? (
        <>
          <div className="d-flex align-items-center gap-3 mt-3 today-divider">
            <span className="text-uppercase fw-semibold text-body small">
              Today
            </span>
            <div className="divider-line flex-grow-1 bg-black" />
            <Button buttonText="View Appointments" className="small" />
          </div>

          <div className="row mt-2 g-3">
            {todaysApts.map((apt) => (
              <AppointmentCard
                key={apt.id}
                doctorName={apt.doctorName}
                aptTime={apt.start}
                aptlLocation={apt.location}
                aptType={apt.type}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mx-auto d-flex align-items-center gap-2">
            <img src={SleepingDog} height={100} alt="Relaxing Dog" />
            <h5 className="text-body fw-semibold text-center">
              It's a great day to relax. You have no appointments today!
            </h5>
          </div>
          <div className="d-flex align-items-center gap-3 mt-3 today-divider">
            <span className="text-uppercase fw-semibold text-body small">
              In the next 30 days
            </span>
            <div className="divider-line flex-grow-1 bg-black" />
            <Button buttonText="View Appointments" className="small" />
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
                    isMuted={true}
                  />
                ))
              : ""}
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentsWidget;
