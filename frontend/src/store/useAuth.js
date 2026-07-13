import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuth = create(
    persist(
        (set) => ({
            user: null,
            isLogin: false,
            setUser: (user) => set({ user, isLogin: true }),
            logout: () => set({ user: null, isLogin: false })
        }),
        {
            name: "auth"
        }
    )
);

export default useAuth;