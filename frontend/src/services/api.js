// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://will-generator-three.vercel.app/api',
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => Promise.reject(error));

// export default api;




import axios from 'axios';

const api = axios.create({
  baseURL: 'https://will-generator-s86p.vercel.app/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
