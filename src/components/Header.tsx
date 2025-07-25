
import React from 'react';
import { useWaterSystem } from '@/contexts/WaterSystemContext';

const Header = () => {
  const { systemData } = useWaterSystem();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          AjiriTank
        </h1>
        <p className="text-blue-200 text-lg">
          {systemData.mode === 'household' ? 'Household Management' : 'Community Management'}
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            systemData.isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'
          }`} />
          <span className="text-white text-sm">
            {systemData.isConnected ? 'ESP32 Connected' : 'Connecting...'}
          </span>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            {systemData.dailyUsage.toFixed(1)}L
          </div>
          <div className="text-blue-200 text-sm">Today's Usage</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
