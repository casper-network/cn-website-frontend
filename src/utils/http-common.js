import axios from 'axios';
import config from '@/directus/config';

const { API_URL } = config;
// eslint-disable-next-line import/prefer-default-export
export const HTTP = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
