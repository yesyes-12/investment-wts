// src/features/order/hooks/useAssetValuation.ts

import { useTickerStore } from "../../market";
import { useAssetStore, type Holding } from "../stores/useAssetStore";

export interface EvaluatedAsset extends Holding {
  currentPrice: number;
  evaluationAmount: number;
  valuationLoss: number;
  roi: number;
}

export const useAssetValuation = (symbol: string) => {
  const holding = useAssetStore((state) =>
    state.holdings.find((h) => h.symbol === symbol),
  );

  const currentPrice = useTickerStore(
    (state) => state.tickerData[symbol]?.price || 0,
  );

  if (!holding || currentPrice === 0) {
    return {
      holding: null,
      valuation: {
        currentPrice,
        evaluationAmount: 0,
        valuationLoss: 0,
        roi: 0,
      },
    };
  }

  const evaluationAmount = holding.quantity * currentPrice;
  const valuationLoss = evaluationAmount - holding.totalCost;
  const roi = (valuationLoss / holding.totalCost) * 100;

  return {
    holding,
    valuation: {
      currentPrice,
      evaluationAmount,
      valuationLoss,
      roi: Number(roi.toFixed(2)),
    },
  };
};
