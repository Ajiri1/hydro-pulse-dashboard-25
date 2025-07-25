
import React from 'react';
import { useWaterSystem } from '@/contexts/WaterSystemContext';
import { AlertTriangle, Zap, Wrench, AlertCircle } from 'lucide-react';

const AlertPanel = () => {
  const { systemData, clearAlert } = useWaterSystem();
  
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'low': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertCircle className="w-4 h-4" />;
      case 'maintenance': return <Wrench className="w-4 h-4" />;
      case 'overflow': return <Zap className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-500/20 border-red-500/50 text-red-300';
      case 'low': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300';
      case 'maintenance': return 'bg-blue-500/20 border-blue-500/50 text-blue-300';
      case 'overflow': return 'bg-purple-500/20 border-purple-500/50 text-purple-300';
      default: return 'bg-gray-500/20 border-gray-500/50 text-gray-300';
    }
  };

  // Simulate some alerts based on tank status
  const activeAlerts = [
    ...(systemData.mainTank.status === 'low' ? [{
      id: 'main-low',
      type: 'low' as const,
      tank: 'main' as const,
      message: 'Main tank water level is low',
      timestamp: new Date(),
      active: true
    }] : []),
    ...(systemData.mainTank.status === 'critical' ? [{
      id: 'main-critical',
      type: 'critical' as const,
      tank: 'main' as const,
      message: 'Main tank critically low - immediate attention required',
      timestamp: new Date(),
      active: true
    }] : []),
    ...(systemData.reservoirTank.status === 'low' ? [{
      id: 'reservoir-low',
      type: 'low' as const,
      tank: 'reservoir' as const,
      message: 'Reservoir tank water level is low',
      timestamp: new Date(),
      active: true
    }] : [])
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">System Alerts</h3>
      
      {activeAlerts.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 mx-auto mb-3 bg-green-500/20 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-green-400 rounded-full" />
          </div>
          <p className="text-green-300 text-sm">All systems normal</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activeAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border ${getAlertColor(alert.type)} transition-all duration-300`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {alert.tank.charAt(0).toUpperCase() + alert.tank.slice(1)} Tank
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => clearAlert(alert.id)}
                  className="text-xs opacity-50 hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertPanel;
