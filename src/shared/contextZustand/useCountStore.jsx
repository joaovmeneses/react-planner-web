'use client'
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCountStore = create(persist(
  (set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  }),
  {
    name: "zustand-counter-storage",
    getStorage: () => localStorage,
    // skipHydration: true,  
  },
));

export default useCountStore;
