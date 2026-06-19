// src/features/order/stores/useAssetStore.ts
import { create } from "zustand";

export interface Holding {
  symbol: string;
  quantity: number;
  avgPrice: number;
  totalCost: number;
}

export interface Transaction {
  id: string;
  symbol: string;
  side: "buy" | "sell";
  price: number;
  quantity: number;
  timestamp: number;
}

interface AssetState {
  balance: number;
  holdings: Holding[];
  history: Transaction[];

  executeMarketOrder: (
    side: "buy" | "sell",
    symbol: string,
    currentPrice: number,
    quantitiy: number,
  ) => { success: boolean; message: string };
}

export const useAssetStore = create<AssetState>((set, get) => ({
  balance: 10000000,
  holdings: [],
  history: [],

  executeMarketOrder: (side, symbol, currentPrice, quantity) => {
    if (quantity <= 0)
      return { success: false, message: "수량이 유효하지 않습니다." };

    const { balance, holdings, history } = get();
    const orderTotal = currentPrice * quantity;

    // 매수
    if (side === "buy") {
      if (balance < orderTotal) {
        return { success: false, message: "예수금이 부족합니다." };
      }

      const existingHolding = holdings.find((h) => h.symbol === symbol);
      let updatedHoldings: Holding[];

      if (existingHolding) {
        // [금융 공학 산식]
        // 가중 평균 평단가 계산: (기존 총매수금 + 신규 총매수금) / (기존 수량 + 신규 수량)
        const nextQuantity = existingHolding.quantity + quantity;
        const nextTotalCost = existingHolding.totalCost + orderTotal;
        const nextAvgPrice = Math.floor(nextTotalCost / nextQuantity);

        updatedHoldings = holdings.map((h) =>
          h.symbol === symbol
            ? {
                ...h,
                quantity: nextQuantity,
                totalCost: nextTotalCost,
                avgPrice: nextAvgPrice,
              }
            : h,
        );
      } else {
        // 신규 자산 추가
        updatedHoldings = [
          ...holdings,
          { symbol, quantity, avgPrice: currentPrice, totalCost: orderTotal },
        ];
      }

      const newTransaction: Transaction = {
        id: `tx-${Date.now()}`,
        symbol,
        side: "buy",
        price: currentPrice,
        quantity,
        timestamp: Date.now(),
      };

      set({
        balance: balance - orderTotal,
        holdings: updatedHoldings,
        history: [newTransaction, ...history],
      });

      return { success: true, message: "시장가 매수 체결 완료" };
    }

    // 매도
    if (side === "sell") {
      const existingHolding = holdings.find((h) => h.symbol === symbol);

      if (!existingHolding || existingHolding.quantity < quantity) {
        return {
          success: false,
          message: "매도 가능한 보유 수량이 부족합니다.",
        };
      }

      const nextQuantity = existingHolding.quantity - quantity;
      let updatedHoldings: Holding[];

      if (nextQuantity === 0) {
        // 전량 매도 시 배열에서 제거
        updatedHoldings = holdings.filter((h) => h.symbol !== symbol);
      } else {
        // 잔량 매도 시 평단가는 유지하되 총매수금만 정비례 차감
        const nextTotalCost = nextQuantity * existingHolding.avgPrice;
        updatedHoldings = holdings.map((h) =>
          h.symbol === symbol
            ? { ...h, quantity: nextQuantity, totalCost: nextTotalCost }
            : h,
        );
      }

      const newTransaction: Transaction = {
        id: `tx-${Date.now()}`,
        symbol,
        side: "sell",
        price: currentPrice,
        quantity,
        timestamp: Date.now(),
      };

      set({
        balance: balance + orderTotal,
        holdings: updatedHoldings,
        history: [newTransaction, ...history],
      });

      return { success: true, message: "시장가 매도 체결 완료" };
    }

    return { success: false, message: "알 수 없는 오류" };
  },
}));
