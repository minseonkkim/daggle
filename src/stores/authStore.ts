import { create } from "zustand";

interface User {
  loginId: string;
  nickname: string;
  profileImageUrl: string;
  id: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  login: (user, accessToken, refreshToken) => {
    set({ user, accessToken, refreshToken, isLoggedIn: true });
  },
  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
    });
  },
}));
