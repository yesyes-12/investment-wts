// src/features/market/components/OrderBookRow.tsx
import React from "react";

interface OrderBookRowProps {
  price: number;
  volume: number;
  maxVolume: number;
  type: "ask" | "bid";
}

export const OrderBookRow = React.memo(
  ({ price, volume, maxVolume, type }: OrderBookRowProps) => {
    const barWidth = maxVolume > 0 ? `${(volume / maxVolume) * 100}%` : "0%";

    return (
      <div className='relative flex items-center h-5.5 text-xs'>
        <div
          className={`absolute top-0 bottom-0 opacity-15 transition-all duration-700 ${
            type === "ask" ? "bg-wts-ask left-0" : "bg-wts-bid right-0"
          }`}
          style={{ width: barWidth }}
        />
        <div className='w-1/3 pl-4 z-10 text-wts-text-muted'>
          {type === "ask" ? volume.toLocaleString() : ""}
        </div>
        <div
          className={`w-1/3 text-center font-medium z-10 ${type === "ask" ? "text-wts-ask" : "text-wts-bid"}`}
        >
          {price.toLocaleString()}
        </div>
        <div className='w-1/3 pr-4 text-right z-10 text-wts-text-muted'>
          {type === "bid" ? volume.toLocaleString() : ""}
        </div>
      </div>
    );
  },
);
OrderBookRow.displayName = "OrderBookRow";
