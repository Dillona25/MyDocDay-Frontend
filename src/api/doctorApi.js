import { processServerResponse } from "./serverResponse";

export const addDoctor = ({
  user_id,
  first_name,
  last_name,
  specialty,
  image_url,
}) => {
  const token = localStorage.getItem("jwt");
  return fetch("http://localhost:5500/api/doctors", {
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
