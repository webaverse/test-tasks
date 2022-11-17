import axios from "axios";

export const getClient = (baseURL: string) => {
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: baseURL,
    timeout: 10000,
  });

  instance.interceptors.request.use(
    async function (config) {
      if (localStorage.getItem("token")) {
      }
      return { ...config };
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return instance;
};
