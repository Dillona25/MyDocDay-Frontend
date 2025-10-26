import { processServerResponse } from "./serverResponse";

// Our Mock API call
export const mockApi = {
  post: (endpoint, data) => {
    console.log(`POST to ${endpoint}`, data);
    return new Promise((resolve) => {
      setTimeout(() => resolve({ status: 200, data }), 500);
    });
  },
};

export const registerUser = ({
  firstName,
  lastName,
  email,
  phone,
  password,
}) => {
  return fetch("http://localhost:5500/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      password,
    }),
  })
    .then(processServerResponse)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
