// src/features/chart/components/CandlestickChart.tsx

import { useParams } from "react-router-dom";
import { useCandlestickChart } from "../hooks/useCandlestickChart";

const DUMMY_DATA = [
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
  const { chartContainerRef } = useCandlestickChart(DUMMY_DATA);

  return (
    <div className='w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-xl'>
      <div className='p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50'>
        <h2 className='text-lg font-bold text-slate-200'>
          {symbol}/KRW 실시간 차트
        </h2>
        <span className='text-xs font-semibold px-2.5 py-1 bg-red-500/10 text-red-400 rounded-md'>
          Live
        </span>
      </div>
      <div ref={chartContainerRef} className='w-full' />
    </div>
  );
};
