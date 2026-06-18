// src/features/market/stores/useTickerStore.ts
import { create } from "zustand";

// 단일 호가 정보
export interface OrderBookUnit {
  price: number;
  volume: number;
}

export interface TickerPayload {
  symbol: string;
  price: number;
  asks: OrderBookUnit[];
  bids: OrderBookUnit[];
  total_ask_volume: number;
  total_bid_volume: number;
  timestamp: number;
}

// 스토어 내부 상태 정의
interface TickerState {
  tickerData: Record<string, { price: number; timestamp: number }>;

  asks: OrderBookUnit[];
  bids: OrderBookUnit[];
  totalAskVolume: number;
  totalBidVolume: number;

  setTickerData: (payload: TickerPayload) => void;
}

export const useTickerStore = create<TickerState>((set) => ({
  tickerData: {},
  asks: [],
  bids: [],
  totalAskVolume: 0,
  totalBidVolume: 0,

  setTickerData: (payload) => {
    set((state) => ({
      tickerData: {
        ...state.tickerData,
        [payload.symbol]: {
          price: payload.price,
          timestamp: payload.timestamp,
        },
      },
      asks: payload.asks,
      bids: payload.bids,
      totalAskVolume: payload.total_ask_volume,
      totalBidVolume: payload.total_bid_volume,
    }));
  },
}));
