import { processServerResponse } from "./serverResponse";

const BASE_URL = "http://localhost:5000/api/clinics";

const authHeaders = () => ({
  "Content-Type": "application/json",
  authorization: `Bearer ${localStorage.getItem("jwt")}`,
});

export const createClinic = ({
  user_id,
  specialty,
  image_url,
  clinic_name,
  clinic_email,
  clinic_phone,
  street,
  city,
  state,
  zipcode,
}) =>
  fetch(BASE_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      user_id,
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

export const getUserClinics = () =>
  fetch(BASE_URL, {
    method: "GET",
    headers: authHeaders(),
  })
    .then(processServerResponse)
    .catch((err) => {
      console.error(err);
      throw err;
    });

export const updateClinic = ({ data, id }) =>
  fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(data),
  })
    .then(processServerResponse)
    .catch((err) => {
      console.error(err);
      throw err;
    });

export const deleteClinic = ({ id }) =>
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  })
    .then(processServerResponse)
    .catch((err) => {
      console.error(err);
      throw err;
    });
