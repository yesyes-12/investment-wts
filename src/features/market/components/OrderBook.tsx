// src/features/market/components/OrderBook.tsx

import React from "react";
import { OrderBookList } from "./OrderBookList";
import { useTickerStore } from "../stores/useTickerStore";
import { OrderPanel, useAssetStore } from "../../order";

interface OrderBookProps {
  symbol: string;
}

export const OrderBook = ({ symbol }: OrderBookProps) => {
  const currentPrice = useTickerStore(
    (state) => state.tickerData[symbol]?.price || 0,
  );
  const asks = useTickerStore((state) => state.asks);
  const bids = useTickerStore((state) => state.bids);
  const totalAskVolume = useTickerStore((state) => state.totalAskVolume);
  const totalBidVolume = useTickerStore((state) => state.totalBidVolume);

  const userBalance = useAssetStore((state) => state.balance);
  //const mockUserBalance = 5000000;

  if (!asks || !bids || !currentPrice) {
    return (
      <div className='w-full h-[600px] bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-slate-500 shadow-2xl'>
        <div className='animate-spin w-8 h-8 border-4 border-slate-700 border-t-red-500 rounded-full mb-4'></div>
        <p className='font-semibold text-sm'>
          실시간 호가 데이터 연결 대기 중...
        </p>
      </div>
    );
  }

  return (
    <div>
      <OrderBookList
        asks={asks}
        bids={bids}
        totalAskVolume={totalAskVolume}
        totalBidVolume={totalBidVolume}
        currentPrice={currentPrice}
      />

      <OrderPanel currentPrice={currentPrice} userBalance={userBalance} />
    </div>
  );
};
