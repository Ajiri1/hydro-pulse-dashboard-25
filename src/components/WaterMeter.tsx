
import React from 'react';

interface WaterMeterProps {
  level: number;
  capacity: number;
  currentVolume: number;
  status: 'normal' | 'low' | 'critical' | 'full';
  type: 'main' | 'reservoir';
}

const WaterMeter: React.FC<WaterMeterProps> = ({ 
  level, 
  capacity, 
  currentVolume, 
  status, 
  type 
}) => {
  const circumference = 2 * Math.PI * 80; // radius = 80
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (level / 100) * circumference;
  
  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'text-red-400';
      case 'low': return 'text-yellow-400';
      case 'full': return 'text-green-400';
      default: return 'text-blue-400';
    }
  };

  const getWaveColor = () => {
    switch (status) {
      case 'critical': return 'from-red-500 to-red-300';
      case 'low': return 'from-yellow-500 to-yellow-300';
      case 'full': return 'from-green-500 to-green-300';
      default: return 'from-blue-500 to-cyan-300';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 mb-4">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="none"
          />
          
          {/* Progress Circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className={`text-3xl font-bold ${getStatusColor()}`}>
            {level.toFixed(1)}%
          </div>
          <div className="text-white/70 text-sm mt-1">
            {currentVolume.toFixed(0)}L
          </div>
          <div className="text-white/50 text-xs">
            of {capacity}L
          </div>
        </div>
        
        {/* Animated Water Waves */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className={`w-16 h-2 bg-gradient-to-r ${getWaveColor()} rounded-full opacity-60 animate-pulse`} 
               style={{ 
                 transform: `scaleX(${level / 100})`,
                 transition: 'transform 1s ease-out'
               }} 
          />
        </div>
      </div>
      
      {/* Status Indicator */}
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
        status === 'critical' ? 'bg-red-500/20 text-red-300' :
        status === 'low' ? 'bg-yellow-500/20 text-yellow-300' :
        status === 'full' ? 'bg-green-500/20 text-green-300' :
        'bg-blue-500/20 text-blue-300'
      }`}>
        {status.toUpperCase()}
      </div>
    </div>
  );
};

export default WaterMeter;
