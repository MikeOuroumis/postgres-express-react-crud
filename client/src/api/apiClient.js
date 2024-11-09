import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000,
  withCredentials: true, // Ensures cookies are sent with requests
});

apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
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
        // Token expired, call the refresh endpoint to get a new access token
        try {
          const response = await axios.post(
            "http://localhost:4000/refresh",
            {},
            {
              withCredentials: true, // Ensures the refresh token cookie is sent
            }
          );

          const newAccessToken = response.data.accessToken;
          const newTokenExpiry = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("tokenExpiry", newTokenExpiry);

          // Set the new access token in the Authorization header
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        } catch (error) {
          console.error("Token refresh failed", error);
          // Handle token refresh failure (e.g., redirect to login)
          return Promise.reject(new Error("Token refresh failed"));
        }
      } else {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
