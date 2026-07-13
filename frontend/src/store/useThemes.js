import { create } from "zustand";
import { persist } from "zustand/middleware";

const themes = [
    {
        name: "Dark",
        prefix: "theme-dark",
    },
    {
        name: "Light",
        prefix: "theme-light",
    },
];


const useThemes = create(
    persist(
        (set) => ({
            themes,
            currentTheme: 0,
            setTheme: (index) => set({ currentTheme: index })
        }),
        {
            name: 'chat-themes',
            storage: localStorage
        }
    )
)

export default useThemes