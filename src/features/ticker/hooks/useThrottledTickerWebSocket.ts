// src/features/ticker/hooks/useThrottledTickerWebSocket.ts
import { useEffect, useRef } from "react";
import { useTickerStore } from "../stores/useTickerStore";

export const useThrottledTickerWebSocket = (url: string) => {
  const setPrices = useTickerStore((state) => state.setPrices);
  const bufferRef = useRef<Record<string, number>>({}); // 메모리 버퍼 객체, vdom 연산 회피

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      bufferRef.current[data.symbol] = data.price;
    };

    let animationFrameId: number;

    // 버퍼 쌓이면 zustand update
    const flushBuffer = () => {
      const symbols = Object.keys(bufferRef.current);

      if (symbols.length > 0) {
        setPrices(bufferRef.current); // rerender
        bufferRef.current = {};
      }
      // 예약
      animationFrameId = requestAnimationFrame(flushBuffer);
    };

    animationFrameId = requestAnimationFrame(flushBuffer);

    return () => {
      cancelAnimationFrame(animationFrameId);
      ws.close();
    };
  }, [url, setPrices]);
};
