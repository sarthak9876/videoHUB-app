import create from 'zustand';
import { persist } from 'zustand/middleware'; // to remian active even when the page reloads
import axios from 'axios';

const authStore= (set: any) => ({
    userProfile: null,

    addUser: (user: any) => set({ userProfile: user}),
    removeUser: () => set({userProfile: null})
});

const useAuthStore = create(
    persist(authStore, {
        name: 'auth'
    })
)

export default useAuthStore;