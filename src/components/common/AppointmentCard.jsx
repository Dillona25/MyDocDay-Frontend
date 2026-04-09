import { Link, useLocation } from "react-router-dom";
import locationDot from "../../assets/location-dot.svg";

const AppointmentCard = ({
  className = "",
  doctorName,
  aptTime,
  aptlLocation,
  aptType,
  aptDate,
  aptTitle,
  aptId,
  isMuted = false,
}) => {
  const location = useLocation();
  const hideElement =
    location.pathname.includes("onboarding") ||
    location.pathname === "/dashboard";

  // Formatting our date for a beautiful UI
  const formatAppointmentTime = (date) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return isoString;
    }

    const dayLabel = parsedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    return `${dayLabel}`;
  };

  const formattedDate = formatAppointmentTime(aptDate);

  const getDaysAway = (date) => {
    if (!date) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const apt = new Date(date);
    apt.setHours(0, 0, 0, 0);
    const diff = Math.round((apt - today) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff === -1) return "Yesterday";
    if (diff > 0) return `In ${diff} days`;
    return `${Math.abs(diff)} days ago`;
  };

  const daysAway = getDaysAway(aptDate);

  // Formatting our time
  function formattedTime(time) {
    const [hoursStr, minutes] = time.split(":");
    let hours = parseInt(hoursStr, 10);
    const format = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes}${format.toUpperCase()}`;
  }

  return (
    <>
      <article
        className={`border border-light rounded-3 p-3 h-100 ${className}`}
      >
        <div className="d-flex flex-column justify-content-between flex-grow-1 gap-2">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <h5 className="m-0 fw-semibold text-body">{aptTitle}</h5>
              <p className="m-0">{doctorName}</p>
            </div>
            <div className="d-flex flex-column">
              <h5 className="m-0 text-body">{formattedDate}</h5>
              <p className="m-0 text-end">{formattedTime(aptTime)}</p>
              {daysAway && (
                <p className="m-0 text-end extra-small text-muted">
                  {daysAway}
                </p>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <div className="d-flex mt-3">
              {aptlLocation && (
                <span
                  className={`${
                    isMuted
                      ? "bg-light text-primary border-light"
                      : "bg-primary-subtle text-primary-emphasis border-primary-subtle"
                  } px-3 py-1 extra-small fw-semibold border rounded-pill d-flex gap-1 align-items-center`}
                >
                  <img
                    src={locationDot}
                    alt="Dot Icon"
                    className="img-fluid icon"
                  />
                  {aptlLocation}
                </span>
              )}
            </div>
            {!hideElement && (
              <Link
                to={`edit/${aptId}`}
                className="extra-small text-decoration-underline border-0 bg-transparent text-body mt-auto align-self-end p-0"
              >
                Edit Appointment
              </Link>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default AppointmentCard;
