// src/features/ticker/hooks/useThrottledTickerWebSocket.ts
import { useEffect, useRef } from "react";
import { useTickerStore } from "../stores/useTickerStore";

export const useThrottledTickerWebSocket = (url: string) => {
  const bufferRef = useRef<any>({});

  useEffect(() => {
    let ws: WebSocket;
    let animationFrameId: number;
    let reconnectTimeoutId: number;

    // [Fault Tolerance] 소켓 연결 로직을 함수로 분리하여 재사용성 확보
    const connect = () => {
      ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("🟢 웹소켓 서버와 정상적으로 연결되었습니다.");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        bufferRef.current = data; // O(1) 버퍼 적재 유지
      };

      // 서버가 죽거나 네트워크가 끊겼을 때의 예외 처리
      ws.onclose = () => {
        console.warn(
          "🔴 웹소켓 연결이 끊어졌습니다. 3초 뒤 재연결을 시도합니다...",
        );
        // 3초 후 (Auto-Reconnect)
        reconnectTimeoutId = setTimeout(connect, 3000);
      };

      ws.onerror = (error) => {
        console.error("웹소켓 통신 에러 발생:", error);
        ws.close(); // 에러 발생 시 명시적으로 닫아 onclose 재연결 트리거
      };
    };

    // 최초 연결 실행
    connect();

    // rAF 렌더링 배칭 로직 유지
    const flushBuffer = () => {
      if (bufferRef.current.symbol) {
        useTickerStore.getState().setTickerData(bufferRef.current);
        bufferRef.current = {};
      }
      animationFrameId = requestAnimationFrame(flushBuffer);
    };
    animationFrameId = requestAnimationFrame(flushBuffer);

    // 컴포넌트가 정상적으로 언마운트될 때의 초기화
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(reconnectTimeoutId); // 예약된 재연결 시도 취소
      if (ws) {
        ws.onclose = null; // 의도적인 종료이므로 재연결 로직이 돌지 않게 콜백 해제
        ws.close();
      }
    };
  }, [url]);
};
