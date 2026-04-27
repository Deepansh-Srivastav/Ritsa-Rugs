import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
    persist(
        (set) => ({
            profile: null,
            addresses: [],
            isLoading: false,
            error: null,

            setProfile: (profile) => set({ profile }),

            setAddresses: (addresses) => set({ addresses }),

            addAddress: (address) =>
                set((state) => ({
                    addresses: [...state.addresses, address],
                })),

            updateAddress: (addressId, updatedAddress) =>
                set((state) => ({
                    addresses: state.addresses.map((addr) =>
                        addr.id === addressId ? { ...addr, ...updatedAddress } : addr
                    ),
                })),

            deleteAddress: (addressId) =>
                set((state) => ({
                    addresses: state.addresses.filter((addr) => addr.id !== addressId),
                })),

            setIsLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),
            clearError: () => set({ error: null }),

            clearUserData: () => set({ profile: null, addresses: [] }),
        }),
        {
            name: 'user-store',
            partialize: (state) => ({
                profile: state.profile,
                addresses: state.addresses,
            }),
        }
    )
);
