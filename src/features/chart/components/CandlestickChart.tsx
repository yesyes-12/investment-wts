// src/features/chart/components/CandlestickChart.tsx

import { useParams } from "react-router-dom";
import { useCandlestickChart } from "../hooks/useCandlestickChart";
import { useTickerStore } from "../../ticker/stores/useTickerStore";
import { useEffect, useRef } from "react";

const INITIAL_DATA = [
  {
    time: "2026-05-19" as any,
    open: 92000000,
    high: 93500000,
    low: 91500000,
    close: 93000000,
  },
  {
    time: "2026-05-20" as any,
    open: 93000000,
    high: 95000000,
    low: 92800000,
    close: 94500000,
  },
  {
    time: "2026-05-21" as any,
    open: 94500000,
    high: 94800000,
    low: 93000000,
    close: 93500000,
  },
  {
    time: "2026-05-22" as any,
    open: 93500000,
    high: 96000000,
    low: 93500000,
    close: 95800000,
  },
];

export const CandlestickChart = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const currentSymbol = symbol || "";

  const { chartContainerRef, updateCandle } = useCandlestickChart(INITIAL_DATA);
  const livePrice = useTickerStore((state) => state.prices[currentSymbol]);
  const liveCandleRef = useRef({ ...INITIAL_DATA[INITIAL_DATA.length - 1] });

  useEffect(() => {
    if (!livePrice) return;

    const currentCandle = liveCandleRef.current;

    currentCandle.close = livePrice;

    if (livePrice > currentCandle.high) currentCandle.high = livePrice;
    if (livePrice < currentCandle.low) currentCandle.low = livePrice;

    updateCandle(currentCandle);
  }, [livePrice, updateCandle]);

  return (
    <div className='w-full h-full min-h-[400px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-xl flex flex-col'>
      <div className='p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50'>
        <h2 className='text-lg font-bold text-slate-200'>
          {currentSymbol}/KRW 실시간 차트
        </h2>
        <div className='flex items-center gap-3'>
          {/* 실시간 가격 깜빡임 UI 바인딩 */}
          <span
            className={`text-lg font-bold ${
              livePrice > liveCandleRef.current.open
                ? "text-red-500"
                : "text-blue-500"
            }`}
          >
            {livePrice ? livePrice.toLocaleString() : "로딩중..."}
          </span>
          <span className='text-xs font-semibold px-2.5 py-1 bg-red-500/10 text-red-400 rounded-md animate-pulse'>
            Live
          </span>
        </div>
      </div>
      <div ref={chartContainerRef} className='flex-1 w-full' />
    </div>
  );
};
