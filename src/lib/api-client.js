import axios from 'axios';

const API_URL = 'https://f9ed-103-175-180-105.ngrok-free.app/';

const apiClient = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});

// apiClient.interceptors.request.use(
//   (config) => {
//     // const token = 'Your Token here';
//     return {
//       ...config,
//       headers: {
//         // ...(token !== null && { Authorization: `${token}` }),
//         ...config.headers,
//       },
//     };
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// apiClient.interceptors.response.use(
//   (response) => {
//     //const url = response.config.url;

//     //setLocalStorageToken(token);
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       //(`unauthorized :)`);
//       //localStorage.removeItem("persist:root");
//       //removeLocalStorageToken
//       //window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   },
// );

export default apiClient;
