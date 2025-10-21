const AppointmentCard = ({
  className = "",
  doctorName,
  aptTime,
  aptlLocation,
  aptType,
  aptTitle,
  isMuted = false,
}) => {
  const formatAppointmentTime = (isoString) => {
    if (!isoString) {
      return "";
    }

    const parsedDate = new Date(isoString);

    if (Number.isNaN(parsedDate.getTime())) {
      return isoString;
    }

    const dayLabel = parsedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    const timeLabel = parsedDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    return `${dayLabel} • ${timeLabel}`;
  };

  const formattedTime = formatAppointmentTime(aptTime);

  return (
    <article className="col-12 col-md-6 col-lg-4">
      <div className={`border border-light rounded-3 p-3 ${className}`}>
        <div className="d-flex flex-column justify-content-between flex-grow-1 gap-2">
          <div>
            <h5 className="m-0 fw-semibold text-body">{doctorName}</h5>
            <p className="m-0 text-secondary small">{formattedTime}</p>
            <p className="m-0 text-secondary small fw-semibold">
              {aptlLocation}
            </p>
          </div>
          <div className="d-flex gap-2">
            <div className="d-flex flex-wrap gap-2 mt-1">
              <span
                className={`${
                  isMuted
                    ? "bg-light text-primary border-light"
                    : "bg-primary-subtle text-primary-emphasis border-primary-subtle"
                } px-3 py-1 small fw-semibold border rounded-pill`}
              >
                {aptType}
              </span>
            </div>
            <div className="d-flex flex-wrap gap-2 mt-1">
              <span
                className={`${
                  isMuted
                    ? "bg-light text-primary border-light"
                    : "bg-primary-subtle text-primary-emphasis border-primary-subtle"
                } px-3 py-1 small fw-semibold border rounded-pill`}
              >
                {aptTitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AppointmentCard;
