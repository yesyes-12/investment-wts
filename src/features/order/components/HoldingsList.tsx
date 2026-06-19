// src/features/order/components/HoldingsList.tsx

import { useAssetStore } from "../stores/useAssetStore";

export const HoldingsList = () => {
  const holdings = useAssetStore((state) => state.holdings);

  return (
    <div className='flex-1 flex flex-col overflow-hidden'>
      {/* header */}
      <div className='flex gap-4 h-6 items-center px-3 border-b border-wts-border text-xs text-wts-text-tertiary'>
        <div style={{ flex: 1.2 }}>종목명</div>
        <div style={{ flex: 1, textAlign: "right" }}>평균단가</div>
        <div style={{ flex: 1, textAlign: "right" }}>현재가</div>
        <div style={{ flex: 0.7, textAlign: "right" }}>보유수량</div>
        <div style={{ flex: 1, textAlign: "right" }}>평가금액</div>
        <div style={{ flex: 1, textAlign: "right" }}>평가손익</div>
        <div style={{ flex: 0.8, textAlign: "right" }}>수익률</div>
      </div>

      {/* rows */}
      <div className=''></div>
    </div>
  );
};
