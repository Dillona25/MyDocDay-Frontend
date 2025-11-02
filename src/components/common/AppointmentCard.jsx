import locationDot from "../../assets/location-dot.svg";

const AppointmentCard = ({
  className = "",
  doctorName,
  aptTime,
  aptlLocation,
  aptType,
  aptDate,
  aptTitle,
  isMuted = false,
}) => {
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

    // const timeLabel = parsedDate.toLocaleTimeString("en-US", {
    //   hour: "numeric",
    //   minute: "2-digit",
    // });

    return `${dayLabel}`;
  };

  const formattedDate = formatAppointmentTime(aptDate);

  // Format our time to 12 hour format
  function formattedTime(time) {
    const [hoursStr, minutes] = time.split(":");
    let hours = parseInt(hoursStr, 10);
    const format = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes}${format.toLowerCase()}`;
  }

  return (
    <article className={`border border-light rounded-3 p-3 h-100 ${className}`}>
      <div className="d-flex flex-column justify-content-between flex-grow-1 gap-2">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column">
            <h5 className="m-0 fw-semibold text-body">{aptTitle}</h5>
            <p className="m-0">{doctorName}</p>
          </div>
          <div className="d-flex flex-column">
            <h5 className="m-0 text-body">{formattedDate}</h5>
            <p className="m-0 text-end">{formattedTime(aptTime)}</p>
          </div>
        </div>
        <div className="d-flex gap-2">
          <div className="d-flex flex-wrap gap-2 mt-3">
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
                  className="img-fluid dot-icon"
                />
                {aptlLocation}
              </span>
            )}
          </div>
          {/* <div className="d-flex flex-wrap gap-2 mt-1">
            <span
              className={`${
                isMuted
                  ? "bg-light text-primary border-light"
                  : "bg-primary-subtle text-primary-emphasis border-primary-subtle"
              } px-3 py-1 small fw-semibold border rounded-pill`}
            >
              {aptTitle}
            </span>
          </div> */}
        </div>
      </div>
    </article>
  );
};

export default AppointmentCard;
