import { processServerResponse } from "./serverResponse";

export const addClinic = ({
  clinicName,
  clinicEmail,
  clinicPhone,
  street,
  city,
  state,
  zipcode,
}) => {
  const token = localStorage.getItem("jwt");
  return fetch("http://localhost:5500/api/clinics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      clinicName,
      clinicEmail,
      clinicPhone,
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
