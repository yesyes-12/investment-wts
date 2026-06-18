// src/pages/TradePage.tsx
import { useParams } from "react-router-dom";
import { useThrottledTickerWebSocket, OrderBook } from "../features/market";
import { CandlestickChart } from "../features/chart";
import { AssetDashboard } from "../features/order";

export const TradePage = () => {
  const { symbol = "BTC" } = useParams<{ symbol: string }>();

  useThrottledTickerWebSocket(symbol);

  return (
    <div className='flex flex-col overflow-hidden'>
      {/* headers ------------------------ */}
      <div className='flex flex-1 overflow-hidden'>
        <div className='flex-1 overflow-hidden'>
          <CandlestickChart symbol={symbol} />
        </div>
        <div className='flex flex-col overflow-hidden'>
          <OrderBook symbol={symbol} />
        </div>
      </div>
      <div className=''>
        <AssetDashboard />
      </div>
    </div>
  );
};
