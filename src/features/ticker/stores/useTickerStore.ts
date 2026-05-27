// src/features/ticker/stores/useTickerStore.ts
import { create } from "zustand";

interface TickerState {
  prices: Record<string, number>;
  setPrices: (newPrices: Record<string, number>) => void;
}

export const useTickerStore = create<TickerState>((set) => ({
  prices: {},
  setPrices: (newPrices) =>
    set((state) => ({
      prices: { ...state.prices, ...newPrices },
    })),
}));
