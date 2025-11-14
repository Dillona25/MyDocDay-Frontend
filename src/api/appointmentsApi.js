import { processServerResponse } from "./serverResponse";

export const createAppointment = ({
  user_id,
  doctor_id,
  doctor_name,
  appointment_title,
  appointment_type,
  appointment_date,
  appointment_time,
}) => {
  const token = localStorage.getItem("jwt");
  return fetch("http://localhost:5500/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id,
      doctor_id,
      doctor_name,
      appointment_title,
      appointment_type,
      appointment_date,
      appointment_time,
    }),
  })
    .then(processServerResponse)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const getUsersAppointments = () => {
  const token = localStorage.getItem("jwt");
  return fetch("http://localhost:5500/api/appointments", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(processServerResponse)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const editAppointment = ({ data, id }) => {
  const token = localStorage.getItem("jwt");
  return fetch(`http://localhost:5500/api/appointments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then(processServerResponse)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const deleteAppointment = ({ id }) => {
  const token = localStorage.getItem("jwt");
  return fetch(`http://localhost:5500/api/appointments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(processServerResponse)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
