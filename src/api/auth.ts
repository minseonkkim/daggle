import axiosInstance from "./api";

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  user: {
    loginId: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    id: string;
    nickname: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

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
