// src/features/order/components/AssetSummary.tsx

import { useAssetStore } from "../stores/useAssetStore";

export const AssetSummary = () => {
  const balance = useAssetStore((state) => state.balance);

  return (
    <div
      className='flex flex-col px-4 pt-2.5 pb-1.5 border-r border-wts-border 
    text-wts-text-tertiary justify-between shrink-0 min-w-[280px]'
    >
      <h2 className='font-semibold text-xs '>자산 현황</h2>

      <div className='flex flex-col gap-2 flex-1 justify-center text-xs'>
        <div className='flex justify-between items-center'>
          <span>총평가금액</span>
          <span>10,000,000원</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>총매입금액</span>
          <span>0원</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>평가손익</span>
          <span>0원</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>수익률</span>
          <span>0%</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>예수금</span>
          <span>10,000,000원</span>
        </div>
      </div>
    </div>
  );
};
