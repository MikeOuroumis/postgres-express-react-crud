import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    const now = Date.now();

    // Check if authentication is required and if token exists
    if (config.authRequired) {
      if (!accessToken) {
        console.warn("No access token found. Redirecting to login.");
        // Redirect to login or handle as necessary
        return Promise.reject(new Error("No access token available"));
      }

      if (now >= tokenExpiry) {
        // Token expired, use refresh token to get a new access token
        const response = await axios.post("http://localhost:4000/refresh", {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newTokenExpiry = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("tokenExpiry", newTokenExpiry);

        config.headers["Authorization"] = `Bearer ${newAccessToken}`;
      } else {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
