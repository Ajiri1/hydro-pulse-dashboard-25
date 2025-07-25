
import React from 'react';
import { useWaterSystem } from '@/contexts/WaterSystemContext';
import { Button } from '@/components/ui/button';
import { Home, Users } from 'lucide-react';

const ModeToggle = () => {
  const { systemData, toggleMode } = useWaterSystem();

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">Operation Mode</h3>
      
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={systemData.mode === 'community' ? toggleMode : undefined}
          variant={systemData.mode === 'household' ? 'default' : 'outline'}
          className={`${
            systemData.mode === 'household' 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
          } transition-all duration-200`}
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
        
        <Button
          onClick={systemData.mode === 'household' ? toggleMode : undefined}
          variant={systemData.mode === 'community' ? 'default' : 'outline'}
          className={`${
            systemData.mode === 'community' 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
          } transition-all duration-200`}
        >
          <Users className="w-4 h-4 mr-2" />
          Community
        </Button>
      </div>
      
      <div className="mt-4 text-xs text-blue-200">
        {systemData.mode === 'household' 
          ? 'Optimized for single household usage'
          : 'Configured for community water management'
        }
      </div>
    </div>
  );
};

export default ModeToggle;
