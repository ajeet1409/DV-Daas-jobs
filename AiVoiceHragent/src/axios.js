import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,  // Your backend base URL
  withCredentials: true, // Send cookies
});

console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);
export default API;
