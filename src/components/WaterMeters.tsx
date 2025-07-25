
import React from 'react';
import { useWaterSystem } from '@/contexts/WaterSystemContext';
import WaterMeter from './WaterMeter';

const WaterMeters = () => {
  const { systemData } = useWaterSystem();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Main Tank</h3>
        <WaterMeter
          level={systemData.mainTank.level}
          capacity={systemData.mainTank.capacity}
          currentVolume={systemData.mainTank.currentVolume}
          status={systemData.mainTank.status}
          type="main"
        />
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Reservoir Tank</h3>
        <WaterMeter
          level={systemData.reservoirTank.level}
          capacity={systemData.reservoirTank.capacity}
          currentVolume={systemData.reservoirTank.currentVolume}
          status={systemData.reservoirTank.status}
          type="reservoir"
        />
      </div>
    </div>
  );
};

export default WaterMeters;
