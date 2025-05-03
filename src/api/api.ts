import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { refreshTokenApi } from "../api/auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken, login, logout, user } = useAuthStore.getState();

    if (
      error.response?.status === 401 &&
      refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshed = await refreshTokenApi(refreshToken);
        login(user!, refreshed.accessToken, refreshed.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`;
        console.log("✅ 토큰 재발급 성공");
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("❌ 토큰 갱신 실패", err);
        logout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
