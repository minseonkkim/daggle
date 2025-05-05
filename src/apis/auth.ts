import { LoginRequest, LoginResponse, RefreshResponse } from "../types/auth";
import axiosInstance from "./api";

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  const res = await axiosInstance.post("/api/auth/login", data);
  return res.data;
}

export async function refreshTokenApi(
  refreshToken: string
): Promise<RefreshResponse> {
  const res = await axiosInstance.post("/api/auth/refresh", { refreshToken });
  return res.data;
}
