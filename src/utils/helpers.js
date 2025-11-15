export const parseAptDateTime = (apt) => {
  const [hours, minutes] = apt.appointment_time.split(":");
  const date = new Date(apt.appointment_date);
  date.setHours(Number(hours), Number(minutes), 0, 0);
  return date;
};

export const isSameDay = (dateOne, dateTwo) =>
  dateOne.getFullYear() === dateTwo.getFullYear() &&
  dateOne.getMonth() === dateTwo.getMonth() &&
  dateOne.getDate() === dateTwo.getDate();
