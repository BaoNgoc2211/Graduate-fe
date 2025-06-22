import { create } from "zustand";

interface AuthStore {
  userId: string | null;
  setUserId: (id: string) => void;
}

export const useAuth = create<AuthStore>((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
}));