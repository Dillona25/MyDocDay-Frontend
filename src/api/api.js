// Our Mock API call
export const mockApi = {
  post: (endpoint, data) => {
    console.log(`POST to ${endpoint}`, data);
    return new Promise((resolve) => {
      setTimeout(() => resolve({ status: 200, data }), 500);
    });
  },
};
