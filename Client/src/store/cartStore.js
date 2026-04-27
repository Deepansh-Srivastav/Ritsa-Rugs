import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            coupon: null,
            discount: 0,
            isLoading: false,
            error: null,

            addItem: (product, quantity = 1) =>
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.id === product.id
                    );

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { ...product, quantity }],
                    };
                }),

            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                })),

            updateQuantity: (productId, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === productId ? { ...item, quantity } : item
                    ),
                })),

            clearCart: () => set({ items: [], coupon: null, discount: 0 }),

            applyCoupon: (coupon) =>
                set({
                    coupon,
                    discount: coupon.discountAmount || 0,
                }),

            removeCoupon: () =>
                set({
                    coupon: null,
                    discount: 0,
                }),

            setIsLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),
            clearError: () => set({ error: null }),

            // Computed getters
            getSubtotal: () => {
                return get().items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                );
            },

            getTotal: () => {
                const subtotal = get().getSubtotal();
                return subtotal - get().discount;
            },

            getItemCount: () => {
                return get().items.reduce((sum, item) => sum + item.quantity, 0);
            },
        }),
        {
            name: 'cart-store',
            partialize: (state) => ({
                items: state.items,
                coupon: state.coupon,
                discount: state.discount,
            }),
        }
    )
);
