import { processServerResponse } from "./serverResponse";

export const createDoctorWithClinic = ({
  user_id,
  first_name,
  last_name,
  specialty,
  image_url,
  clinic_name,
  clinic_email,
  clinic_phone,
  street,
  city,
  state,
  zipcode,
}) => {
  const token = localStorage.getItem("jwt");
  return fetch("http://localhost:5500/api/doctors/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id,
      first_name,
      last_name,
      specialty,
      image_url,
      clinic_name,
      clinic_email,
      clinic_phone,
      street,
      city,
      state,
      zipcode,
    }),
  })
    .then(processServerResponse)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const getUsersDoctors = () => {
  const token = localStorage.getItem("jwt");
  return fetch("http://localhost:5500/api/doctors", {
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
