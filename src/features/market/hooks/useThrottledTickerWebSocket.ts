// src/features/market/hooks/useThrottledTickerWebSocket.ts
import { useEffect, useRef } from "react";
import { useTickerStore, type TickerPayload } from "../stores/useTickerStore";

export const useThrottledTickerWebSocket = (symbol: string = "BTC") => {
  const setTickerData = useTickerStore((state) => state.setTickerData);
  const requestRef = useRef<number | null>(null);
  const latestDataRef = useRef<TickerPayload | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const wsUrl = `ws://127.0.0.1:8000/ws/ticker/${symbol}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    const updateFrame = () => {
      if (latestDataRef.current) {
        setTickerData(latestDataRef.current);
        latestDataRef.current = null;
      }
      requestRef.current = requestAnimationFrame(updateFrame);
    };

    ws.onopen = () => console.log(`[${symbol}] WebSocket 연결 성공`);

    ws.onmessage = (event) => {
      try {
        const data: TickerPayload = JSON.parse(event.data);
        latestDataRef.current = data;
      } catch (error) {
        console.error(error);
      }
    };

    ws.onerror = (error) => console.log("Websocket 에러", error);
    ws.onclose = () => console.log(`[${symbol}] WebSocket 연결 종료`);

    requestRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (wsRef.current) {
        const ws = wsRef.current;
        // 웹소켓이 연결 중(CONNECTING, 0)이 아닐 때만 정상 종료
        // 연결 중일 때 close()를 호출하면 브라우저 콘솔 에러가 발생하므로 방어
        if (ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [symbol, setTickerData]);
};
