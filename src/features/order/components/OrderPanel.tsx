// src/features/order/OrderPanel.tsx

import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface OrderPanelProps {
  currentPrice: number;
  userBalance: number;
}

export const OrderPanel = ({ currentPrice, userBalance }: OrderPanelProps) => {
  const [orderSide, setOrderSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [quantity, setQuantity] = useState<number>(1);

  const theme = {
    buy: {
      bg: "bg-wts-bid",
      text: "text-wts-bid",
      lightBg: "bg-wts-bid/13",
      border: "border-wts-bid",
      hoverBorder: "hover: border-wts-bid",
      label: "매수",
    },
    sell: {
      bg: "bg-wts-ask",
      text: "text-wts-ask",
      lightBg: "bg-wts-ask/13",
      border: "border-wts-ask",
      hoverBorder: "hover: border-wts-ask",
      label: "매수",
    },
  };

  const currentTheme = theme[orderSide];

  return (
    <div className='bg-wts-bg border border-wts-border p-3 flex flex-col gap-2.5'>
      <div className='flex h-8.5 border border-wts-border rounded-md'>
        <button
          onClick={() => setOrderSide("buy")}
          className={`flex-1 font-semibold text-sm rounded-s transition-all duration-300 bg-[#111d30] ${orderSide === "buy" ? "bg-wts-bid text-white" : "text-wts-text-tertiary hover:text-wts-text-secondary"}`}
        >
          매수
        </button>
        <button
          onClick={() => setOrderSide("sell")}
          className={`flex-1 font-semibold text-sm rounded-e transition-all duration-300 bg-[#111d30] ${orderSide === "sell" ? "bg-wts-ask text-white" : "text-wts-text-tertiary hover:text-wts-text-secondary"}`}
        >
          매도
        </button>
      </div>

      <div className='flex items-center text-xs text-wts-text-tertiary gap-2'>
        <span className='w-13'>주문유형</span>
        <div className='flex gap-1'>
          <button
            onClick={() => setOrderType("market")}
            className={`rounded-sm px-2.5 py-1 transition-colors duration-300 
              ${
                orderType === "market"
                  ? `${currentTheme.lightBg} border ${currentTheme.border} ${currentTheme.text}`
                  : "border border-wts-border hover:text-wts-text-secondary"
              }`}
          >
            시장가
          </button>
          <button
            onClick={() => setOrderType("limit")}
            className={`rounded-sm px-2.5 py-1 transition-colors duration-300
              ${
                orderType === "limit"
                  ? `${currentTheme.lightBg} border ${currentTheme.border} ${currentTheme.text}`
                  : "border border-wts-border hover:text-wts-text-secondary"
              }`}
          >
            지정가
          </button>
        </div>
      </div>

      <div className='flex items-center text-xs text-wts-text-tertiary gap-2'>
        <span className='w-13'>수량</span>
        <div
          className={`flex-1 flex bg-[#111d30] border border-[#2a3a54] rounded-sm 
            focus-within:${currentTheme.border} overflow-hidden items-center px-1 py-0.5 transition-colors duration-300`}
        >
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className='px-1'
          >
            <FiMinus />
          </button>
          <input
            type='text'
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value.replace(/[^0-9]/g, "")))
            }
            className='flex-1 mx-3 pt-0.5 bg-transparent text-start text-wts-text-primary'
          />
          <button onClick={() => setQuantity((q) => q + 1)} className='px-1'>
            <FiPlus />
          </button>
        </div>
        <span>주</span>
      </div>

      <div className='bg-[#111d30] py-2 px-2.5 text-wts-text-tertiary text-xs flex flex-col gap-1 rounded-sm'>
        <div className='flex justify-between'>
          <span>주문단가</span>
          <span className='text-wts-text-primary'>시장가</span>
        </div>
        <div className='flex justify-between'>
          <span>주문수량</span>
          <span className='text-wts-text-primary'>{quantity}주</span>
        </div>
        <div className='flex justify-between pt-1 border-t border-wts-border'>
          <span className='font-semibold text-wts-text-secondary'>
            주문총액
          </span>
          <span className={`${currentTheme.text} font-bold text-[0.9rem]`}>
            {(currentPrice || 0).toLocaleString()}원
          </span>
        </div>
        <div className='flex justify-between'>
          <span>주문가능 예수금</span>
          <span className='text-wts-text-muted'>
            {userBalance.toLocaleString()}원
          </span>
        </div>
      </div>

      <button
        className={`h-10 rounded-[5px] text-[#ffffff] font-bold text-base transition-colors duration-300 ${currentTheme.bg}`}
      >
        매수 {quantity}주
      </button>
    </div>
  );
};
