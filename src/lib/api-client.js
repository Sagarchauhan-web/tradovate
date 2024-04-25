import { getToken } from '@/services/Auth/auth';
import axios from 'axios';

const API_URL = 'https://17db-103-175-180-68.ngrok-free.app';

const apiClient = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    return {
      ...config,
      headers: {
        ...(token !== null && { Authorization: `Bearer ${token}` }),
        ...config.headers,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export default apiClient;
