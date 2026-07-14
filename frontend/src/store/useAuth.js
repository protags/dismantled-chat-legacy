import { create } from "zustand";
import { persist } from "zustand/middleware";
import useSocket from "./useSocket";


const useAuth = create(
    persist(
        (set) => ({
            user: null,
            isLogin: false,
            setUser: (user) => set({ user, isLogin: true }),
            logout: () => {
                useSocket.getState().disconnect();
                set({ user: null, isLogin: false })
            }
        }),
        {
            name: "auth"
        }
    )
);

export default useAuth;