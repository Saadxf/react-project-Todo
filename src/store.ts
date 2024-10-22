import { create } from "zustand";
import { User } from "./types/user";

type AuthStore = {
  user: User | null;
  isAuth: boolean;
  signin: (user: User) => void;
  signout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuth: false,
  signin: (user) => set({ user, isAuth: true }),
  signout: () => {
    localStorage.removeItem('user');
    return set({ user: null, isAuth: false })},
}));



