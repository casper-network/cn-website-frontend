import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/* axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    /!* if (error.response.status === 401) {
      window.location.href = '/login';
    } *!/
    return Promise.reject(error);
  },
); */

export default {
  axiosClient,
};
