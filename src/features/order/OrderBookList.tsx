// src/feauters/order/OrderBookList.tsx
import type { OrderBookUnit } from "../ticker/stores/useTickerStore";
import { OrderBookRow } from "./OrderBookRow";

interface OrderBookListProps {
  asks: OrderBookUnit[];
  bids: OrderBookUnit[];
  totalAskVolume: number;
  totalBidVolume: number;
  currentPrice: number;
}

export const OrderBookList = ({
  asks,
  bids,
  totalAskVolume,
  totalBidVolume,
  currentPrice,
}: OrderBookListProps) => {
  const allVolumes = [...asks, ...bids].map((v) => v.volume);
  const maxVolume = Math.max(...allVolumes, 1);
  const totalVol = totalAskVolume + totalBidVolume;

  const askPercent =
    totalVol > 0 ? ((totalAskVolume / totalVol) * 100).toFixed(1) : "50.0";
  const bidPercent =
    totalVol > 0 ? ((totalBidVolume / totalVol) * 100).toFixed(1) : "50.0";

  return (
    <div className='bg-wts-bg overflow-hidden shadow-2xl'>
      <div className='px-4 py-2.5 bg-wts-card flex justify-between text-xs text-wts-text-secondary border-b border-wts-border'>
        <span className='font-semibold'>호가창</span>
        <div className='flex gap-2'>
          <span className='text-wts-text-tertiary'>
            잔량{" "}
            <span className='text-wts-ask'>
              {totalAskVolume.toLocaleString()}
            </span>
          </span>
          <span className='text-wts-text-tertiary'>
            잔량{" "}
            <span className='text-wts-bid'>
              {totalBidVolume.toLocaleString()}
            </span>
          </span>
        </div>
      </div>

      <div className='flex flex-col'>
        {asks.map((ask) => (
          <OrderBookRow
            key={`ask-${ask.price}`}
            price={ask.price}
            volume={ask.volume}
            maxVolume={maxVolume}
            type='ask'
          />
        ))}
      </div>

      <div className='py-2 flex justify-center text-center items-center bg-[#111d30] border-y border-wts-border gap-2'>
        <span className='text-lg font-bold'>
          {currentPrice?.toLocaleString()}
        </span>
        <span className='text-xs'>▲ +2,500 (+3.43%)</span>
      </div>

      <div className='flex flex-col'>
        {bids.map((bid) => (
          <OrderBookRow
            key={`bid-${bid.price}`}
            price={bid.price}
            volume={bid.volume}
            maxVolume={maxVolume}
            type='bid'
          />
        ))}
      </div>

      <div className='p-1 px-2 bg-wts-card border border-wts-border text-[11px]'>
        <div className='flex justify-between'>
          <span className='text-wts-ask'>매도 {askPercent}%</span>
          <span className='text-wts-text-tertiary'>매도/매수 비율</span>
          <span className='text-wts-bid'>매수 {bidPercent}%</span>
        </div>
        <div className='w-full h-1 bg-wts-border rounded-full overflow-hidden flex'>
          <div
            className='bg-wts-ask h-full transition-all duration-500 ease-out'
            style={{ width: `${askPercent}%` }}
          />
          <div
            className='bg-wts-bid h-full transition-all duration-500 ease-out'
            style={{ width: `${bidPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
