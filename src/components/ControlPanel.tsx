
import React from 'react';
import { useWaterSystem } from '@/contexts/WaterSystemContext';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

const ControlPanel = () => {
  const { systemData, triggerOverride } = useWaterSystem();
  
  const handleOverride = () => {
    if (systemData.overrideEnabled) {
      triggerOverride();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">Emergency Controls</h3>
      
      <div className="space-y-4">
        <div className="text-sm text-blue-200 mb-4">
          Manual override controls for emergency situations
        </div>
        
        <Button
          onClick={handleOverride}
          disabled={!systemData.overrideEnabled}
          className={`w-full ${
            systemData.overrideEnabled 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
          } transition-all duration-200`}
        >
          <Zap className="w-4 h-4 mr-2" />
          Emergency Override
        </Button>
        
        {!systemData.overrideEnabled && (
          <p className="text-xs text-gray-400 text-center">
            Override disabled - normal operation
          </p>
        )}
        
        <div className="border-t border-white/20 pt-4 mt-4">
          <div className="text-sm text-white/70 mb-2">System Status</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white/5 p-2 rounded">
              <div className="text-white/50">Pumps</div>
              <div className="text-white">Auto</div>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <div className="text-white/50">Valves</div>
              <div className="text-white">Normal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
