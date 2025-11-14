export const processServerResponse = async (res) => {
  // If response is 204 (No Content) or there's no body, return null safely.
  if (res.status === 204) {
    return null;
  }

  if (res.ok) {
    try {
      return await res.json();
    } catch (error) {
      return null;
    }
  }

  const error = new Error(`Request failed with status ${res.status}`);
  error.status = res.status;
  throw error;
};
