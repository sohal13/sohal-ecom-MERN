// Import Axios
import axios from 'axios';

// Create an Axios instance with base URL
console.log(import.meta.env.VITE_API_BASE_URL);
const axiosInst = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use VITE_API_BASE_URL from .env
  timeout: 10000, // Set timeout as needed
  // Additional configurations if required (headers, interceptors, etc.)
});

export default axiosInst; // Export the configured Axios instance
