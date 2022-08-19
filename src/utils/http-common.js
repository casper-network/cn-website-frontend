import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const HTTP = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
