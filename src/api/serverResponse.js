export const processServerResponse = async (res) => {
  if (res.ok) {
    return res.json();
  }

  const error = new Error(`Request failed with status ${res.status}`);
  error.status = res.status;

  throw error;
};
