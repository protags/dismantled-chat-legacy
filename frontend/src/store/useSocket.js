import { create } from "zustand";
import { io } from "socket.io-client";
import useAuth from "./useAuth";

const useSocket = create((set, get) => ({
    socket: null,
    users: [],
    messages: [],
    connect: () => {
        if (get().socket) return;

        const socket = io("https://chatapi.originory.com");

        socket.on("connect", () => {
            const currentUser = useAuth.getState().user;
            if (currentUser?.username) {
                socket.emit('create-user', currentUser.username, currentUser.email, currentUser.pfp)
            }
        });
        socket.on("get-users", (users) => {
            set({ users })
        });
        socket.on("receive-msg", (message) => {
            set((s) => ({
                messages: [...s.messages, message]
            }))
        });
        socket.on("user-created", (user) => {
            useAuth.getState().setUser(user);
        });
        socket.on("chat-history", (hist) => {
            set({ messages: hist })
        });
        set({ socket })

    },
    createUser: (username, email, pfp) => {
        get().socket?.emit("create-user", username, email, pfp);
    },
    sendMessage: (message) => {
        get().socket?.emit("send-msg", message)
    },
    disconnect: () => {
        get().socket?.disconnect();
        set({
            socket: null,
            users: [],
            messages: []
        })
    }
}));

export default useSocket;