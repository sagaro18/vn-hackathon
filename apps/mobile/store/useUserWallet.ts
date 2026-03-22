import { create } from 'zustand';

// If you are using plain JavaScript, you can delete this interface block
interface WalletState {
    currentGems: number;
    addGems: (amount: number) => void;
    deductGems: (amount: number) => void;
}

export const useUserWallet = create<WalletState>((set) => ({
    // The user's starting balance
    currentGems: 100,

    // Function to call on the Store Screen after a successful RevenueCat purchase
    addGems: (amount) =>
        set((state) => ({ currentGems: state.currentGems + amount })),

    // Function to call on the Paywall Screen when they buy a scene
    deductGems: (amount) =>
        set((state) => ({
            // Math.max ensures the balance never accidentally goes below 0
            currentGems: Math.max(0, state.currentGems - amount)
        })),
}));