// src/features/ticker/stores/useTickerStore.ts
import { create } from "zustand";

// 단일 호가 정보
export interface OrderBookUnit {
  price: number;
  volume: number;
}

// 스토어 내부 상태 정의
interface TickerState {
  prices: Record<string, number>;
  orderBooks: Record<
    string,
    {
      asks: OrderBookUnit[];
      bids: OrderBookUnit[];
      totalAskVolume: number;
      totalBidsVolume: number;
    }
  >;
  setTickerData: (payload: any) => void;
}

export const useTickerStore = create<TickerState>((set) => ({
  prices: {},
  orderBooks: {},
  setTickerData: (payload) => {
    set((state) => ({
      prices: { ...state.prices, [payload.symbol]: payload.price },
      orderBooks: {
        ...state.orderBooks,
        [payload.symbol]: {
          asks: payload.asks,
          bids: payload.bids,
          totalAskVolume: payload.total_ask_volume,
          totalBidsVolume: payload.total_bid_volume,
        },
      },
    }));
  },
}));
