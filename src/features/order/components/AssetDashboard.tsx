// src/features/order/components/AssetDashboard.tsx

import { AssetSummary } from "./AssetSummary";
import { HoldingsList } from "./HoldingsList";

export const AssetDashboard = () => {
  return (
    <div className='flex bg-wts-bg h-full overflow-hidden'>
      <AssetSummary />

      <HoldingsList />
    </div>
  );
};
