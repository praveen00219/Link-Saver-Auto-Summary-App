import axios from "axios";

// Create axios instance with base URL from environment variable

// console.log("API's :", process.env.NEXT_PUBLIC_API_URL);
export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://link-saver-auto-summary-app.onrender.com" || // This is backend URL, added direct becoz for deploy on netlify
    "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Redirect to login page if 401 Unauthorized
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
