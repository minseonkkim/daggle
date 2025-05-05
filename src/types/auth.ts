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
