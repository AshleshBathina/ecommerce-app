import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

// Clerk's requireAuth() on the backend needs a Bearer token.
// withCredentials alone doesn't work cross-origin (vercel.app → onrender.com)
// because Clerk session cookies are scoped to the frontend domain.
axiosInstance.interceptors.request.use(async (config) => {
  // window.Clerk is exposed globally by @clerk/clerk-react after initialization
  const token = await window.Clerk?.session?.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;