import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
