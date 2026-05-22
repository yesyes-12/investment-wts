import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import type { IChartApi, ISeriesApi } from "lightweight-charts";

export const useCandlestickChart = (data: any[]) => {
  const chartContainerRef = useRef<HTMLDivElement>(null); // 차트 마운트용 ref
  const chartInstanceRef = useRef<IChartApi | null>(null); // 생성된 차트 인스턴스
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 차트 초기화
    const chart = createChart(chartContainerRef.current, {
      layout: { background: { color: "#0f172a" }, textColor: "#cbd5e1" },
      grid: {
        vertLines: { color: "#1e293b" },
        horzLines: { color: "#1e293b" },
      },
      crosshair: { mode: 0 },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#ef4444",
      wickUpColor: "#ef4444",
      downColor: "#3b82f6",
      wickDownColor: "#3b82f6",
      borderVisible: false,
    });

    // 바인딩, 인스턴스 저장
    candlestickSeries.setData(data);
    chartInstanceRef.current = chart;
    seriesRef.current = candlestickSeries;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [data]);

  return { chartContainerRef };
};
