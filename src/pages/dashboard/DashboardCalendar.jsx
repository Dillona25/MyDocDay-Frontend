import { useMemo, useState } from "react";
import { currentUser } from "../../data/user";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const startOfDay = (value) => {
  const date = new Date(value);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const formatKey = (date) =>
  date.toLocaleDateString("en-CA", { timeZone: "UTC" });

const addMonths = (date, amount) => {
  const next = new Date(date);
  next.setMonth(next.getMonth() + amount);
  return next;
};

const buildMonthMatrix = (baseDate) => {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const firstWeekday = firstOfMonth.getDay();
  const matrix = [];
  let dayCounter = 1 - firstWeekday;

  for (let week = 0; week < 6; week += 1) {
    const row = [];
    for (let day = 0; day < 7; day += 1) {
      const current = new Date(year, month, dayCounter);
      row.push({ date: current, isCurrentMonth: current.getMonth() === month });
      dayCounter += 1;
    }
    matrix.push(row);
  }
  return matrix;
};

const Calendar = () => {
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfDay(new Date())
  );
  const [selectedDate, setSelectedDate] = useState(() =>
    startOfDay(new Date())
  );

  const monthMatrix = useMemo(
    () => buildMonthMatrix(visibleMonth),
    [visibleMonth]
  );

  const eventsByDay = useMemo(() => {
    const appointments = currentUser.upcomingAppointments ?? [];
    return appointments.reduce((acc, appointment) => {
      const key = formatKey(new Date(appointment.start));
      if (!acc[key]) acc[key] = [];
      acc[key].push(appointment);
      return acc;
    }, {});
  }, []);

  const selectedKey = formatKey(selectedDate);
  const eventsForSelectedDate = eventsByDay[selectedKey] ?? [];

  const handleDayClick = (date) => {
    const normalized = startOfDay(date);
    setSelectedDate(normalized);
    setVisibleMonth(normalized);
  };

  return (
    <div className="col-12 col-lg-9">
      <div className="rounded-3 border-light p-3 border-0 calendar-widget">
        <div className="row g-4">
          <div className="col-12 col-md-5 d-flex flex-column gap-3">
            <div className="calendar-widget__header d-flex align-items-center justify-content-between">
              <button
                type="button"
                className="calendar-widget-nav rounded-circle d-flex align-items-center justify-content-center text-white bg-active border-0"
                onClick={() => setVisibleMonth((prev) => addMonths(prev, -1))}
                aria-label="Show previous month"
              >
                ‹
              </button>
              <div className="font-poppins h5 mb-0">
                {visibleMonth.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <button
                type="button"
                className="calendar-widget-nav rounded-circle d-flex align-items-center justify-content-center text-white bg-active border-0"
                onClick={() => setVisibleMonth((prev) => addMonths(prev, 1))}
                aria-label="Show next month"
              >
                ›
              </button>
            </div>

            <div className="calendar-widget-grid">
              {WEEK_DAYS.map((day) => (
                <div
                  key={day}
                  className="text-center text-uppercase font-inter small text-body fw-semibold"
                >
                  {day}
                </div>
              ))}

              {monthMatrix.map((week, index) => (
                <div key={`week-${index}`} className="calendar-widget-week">
                  {week.map(({ date, isCurrentMonth }) => {
                    const key = formatKey(date);
                    const hasEvents = Boolean(eventsByDay[key]?.length);
                    const isSelected =
                      date.toDateString() === selectedDate.toDateString();

                    return (
                      <button
                        key={key}
                        type="button"
                        className={[
                          "calendar-widget-day",
                          "btn",
                          "fw-semibold",
                          isCurrentMonth ? "" : "calendar-widget-day muted",
                          hasEvents ? "calendar-widget-day has-events" : "",
                          isSelected ? "calendar-widget-day selected" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => handleDayClick(date)}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="calendar-widget-events d-flex flex-column gap-3 h-100 pt-3 pt-lg-0 ps-lg-4">
              <h5 className="mb-0">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h5>

              {eventsForSelectedDate.length === 0 ? (
                <p className="mb-0 text-muted">No appointments scheduled.</p>
              ) : (
                <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                  {eventsForSelectedDate.map((event) => (
                    <li key={event.id} className="d-flex flex-column gap-2">
                      <div className="text-primary fw-semibold">
                        {new Date(event.start).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                        {" – "}
                        {new Date(event.end).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="">
                        <span className="d-block">{event.title}</span>
                        <span className="d-block text-muted">
                          {event.doctorName} · {event.type}
                        </span>
                        <span className="d-block text-muted">
                          {event.location}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
