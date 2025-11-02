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
  return fetch("http://localhost:5500/api/users/signup", {
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

export const loginUser = ({ email, password }) => {
  return fetch("http://localhost:5500/api/users/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(processServerResponse)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const validateDupCreds = ({ email, phone }) => {
  return fetch("http://localhost:5500/api/users/validateDupCreds", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      phone,
    }),
  })
    .then(processServerResponse)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const completeOnboardingStatus = ({ user_id }) => {
  const token = localStorage.getItem("jwt");
  return fetch("http://localhost:5500/api/users/onboardingComplete", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id,
    }),
  })
    .then(processServerResponse)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("jwt");

  return fetch("http://localhost:5500/api/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch current user: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Error fetching current user:", err);
      throw err;
    });
};
