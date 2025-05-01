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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "로그인 실패");
  }

  return res.json();
}
