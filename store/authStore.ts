import create from 'zustand';
import { persist } from 'zustand/middleware'; // to remian active even when the page reloads
import axios from 'axios';




const authStore= (set: any) => ({
    userProfile: null,
    allUsers: [], // initialised the allUsers variable as an empty array


    addUser: (user: any) => set({ userProfile: user}),
    removeUser: () => set({userProfile: null}),


    fetchAllUsers: async () => {
        const response = await axios.get(`http://localhost:3000/api/users`);
        set({ allUsers: response.data})
    }
});

const useAuthStore = create(
    persist(authStore, {
        name: 'auth'
    })
)

export default useAuthStore;