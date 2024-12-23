import axios from 'axios';
//import router from './router'; 

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
 
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Add a response interceptor
// instance.interceptors.response.use(
//   response => {
//     // Return the response if no error
//     return response;
//   },
//   error => {
//     // Check if the error response is 401 (Unauthorized)
//     if (error.response && error.response.status === 401) {
//       // Clear localStorage and redirect to login
//       localStorage.removeItem('token');
//       localStorage.removeItem('userId');
//       localStorage.removeItem('User');

//       // Optionally, you can show an alert or notification here
//       alert('Session expired or unauthorized. Please log in again.');

//       // Redirect to login page
//       router.push('/login');
//     }

//     // Return the error if needed
//     return Promise.reject(error);
//   }
// );

export default instance;
