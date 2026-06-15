// src/features/order/OrderBook.tsx

import { useParams } from "react-router-dom";
import { useTickerStore } from "../ticker/stores/useTickerStore";
import { OrderBookList } from "./OrderBookList";
import { OrderPanel } from "./OrderPanel";

export const OrderBook = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const currentSymbol = symbol || "";
  const orderBook = useTickerStore((state) => state.orderBooks[currentSymbol]);
  const currentPrice = useTickerStore((state) => state.prices[currentSymbol]);

  const mockUserBalance = 5000000;

  if (!orderBook || !orderBook.asks || !orderBook.bids || !currentPrice) {
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
        asks={orderBook.asks}
        bids={orderBook.bids}
        totalAskVolume={orderBook.totalAskVolume}
        totalBidVolume={orderBook.totalBidsVolume}
        currentPrice={currentPrice}
      />

      <OrderPanel currentPrice={currentPrice} userBalance={mockUserBalance} />
    </div>
  );
};
