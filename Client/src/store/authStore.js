import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isLoading: false,
            error: null,

            setUser: (user) => set({ user }),
            setToken: (token) => set({ token }),
            setIsLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),

            login: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    // API call will be made in the service
                    // This is just the state management
                    return { success: true };
                } catch (error) {
                    const errorMessage = error.response?.data?.message || 'Login failed';
                    set({ error: errorMessage, isLoading: false });
                    throw error;
                }
            },

            register: async (userData) => {
                set({ isLoading: true, error: null });
                try {
                    return { success: true };
                } catch (error) {
                    const errorMessage = error.response?.data?.message || 'Registration failed';
                    set({ error: errorMessage, isLoading: false });
                    throw error;
                }
            },

            logout: () => {
                set({ user: null, token: null, error: null });
                localStorage.removeItem('authToken');
                localStorage.removeItem('refreshToken');
            },

            setAuthData: (user, token) => {
                set({ user, token });
                if (token) {
                    localStorage.setItem('authToken', token);
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'auth-store',
            partialize: (state) => ({ user: state.user, token: state.token }),
        }
    )
);
