import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
    persist(
        (set, get) => ({
            items: [],
            isLoading: false,
            error: null,

            addItem: (product) =>
                set((state) => {
                    const exists = state.items.find((item) => item.id === product.id);
                    if (exists) return state;
                    return {
                        items: [...state.items, product],
                    };
                }),

            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                })),

            toggleItem: (product) =>
                set((state) => {
                    const exists = state.items.find((item) => item.id === product.id);
                    if (exists) {
                        return {
                            items: state.items.filter((item) => item.id !== product.id),
                        };
                    } else {
                        return {
                            items: [...state.items, product],
                        };
                    }
                }),

            isInWishlist: (productId) => {
                return get().items.some((item) => item.id === productId);
            },

            clearWishlist: () => set({ items: [] }),

            setIsLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),
            clearError: () => set({ error: null }),

            getItemCount: () => {
                return get().items.length;
            },
        }),
        {
            name: 'wishlist-store',
            partialize: (state) => ({
                items: state.items,
            }),
        }
    )
);
