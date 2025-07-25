
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface TankData {
  level: number; // 0-100 percentage
  capacity: number; // liters
  currentVolume: number; // liters
  status: 'normal' | 'low' | 'critical' | 'full';
}

export interface SystemData {
  mainTank: TankData;
  reservoirTank: TankData;
  dailyUsage: number;
  weeklyUsage: number[];
  alerts: Alert[];
  mode: 'household' | 'community';
  overrideEnabled: boolean;
  isConnected: boolean;
}

export interface Alert {
  id: string;
  type: 'low' | 'critical' | 'maintenance' | 'overflow';
  tank: 'main' | 'reservoir';
  message: string;
  timestamp: Date;
  active: boolean;
}

interface WaterSystemContextType {
  systemData: SystemData;
  updateTankData: (tank: 'main' | 'reservoir', data: Partial<TankData>) => void;
  toggleMode: () => void;
  clearAlert: (alertId: string) => void;
  triggerOverride: () => void;
}

const WaterSystemContext = createContext<WaterSystemContextType | undefined>(undefined);

export const WaterSystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [systemData, setSystemData] = useState<SystemData>({
    mainTank: {
      level: 0,
      capacity: 1000,
      currentVolume: 0,
      status: 'normal'
    },
    reservoirTank: {
      level: 0,
      capacity: 2000,
      currentVolume: 0,
      status: 'normal'
    },
    dailyUsage: 0,
    weeklyUsage: [120, 150, 89, 203, 175, 95, 134],
    alerts: [],
    mode: 'household',
    overrideEnabled: false,
    isConnected: false
  });

  // Simulate ESP32 connection and data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate receiving data from ESP32
      simulateESP32Data();
    }, 5000);

    // Simulate initial connection
    setTimeout(() => {
      setSystemData(prev => ({ ...prev, isConnected: true }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const simulateESP32Data = () => {
    // This function will be replaced with actual ESP32 communication
    const mainLevel = Math.max(0, Math.min(100, systemData.mainTank.level + (Math.random() - 0.5) * 5));
    const reservoirLevel = Math.max(0, Math.min(100, systemData.reservoirTank.level + (Math.random() - 0.5) * 3));
    
    updateTankData('main', { 
      level: mainLevel,
      currentVolume: (mainLevel / 100) * systemData.mainTank.capacity,
      status: mainLevel < 20 ? 'low' : mainLevel < 10 ? 'critical' : 'normal'
    });
    
    updateTankData('reservoir', { 
      level: reservoirLevel,
      currentVolume: (reservoirLevel / 100) * systemData.reservoirTank.capacity,
      status: reservoirLevel < 15 ? 'low' : reservoirLevel < 5 ? 'critical' : 'normal'
    });
  };

  const updateTankData = (tank: 'main' | 'reservoir', data: Partial<TankData>) => {
    setSystemData(prev => ({
      ...prev,
      [`${tank}Tank`]: { ...prev[`${tank}Tank` as keyof SystemData] as TankData, ...data }
    }));
  };

  const toggleMode = () => {
    setSystemData(prev => ({
      ...prev,
      mode: prev.mode === 'household' ? 'community' : 'household'
    }));
  };

  const clearAlert = (alertId: string) => {
    setSystemData(prev => ({
      ...prev,
      alerts: prev.alerts.filter(alert => alert.id !== alertId)
    }));
  };

  const triggerOverride = () => {
    console.log('Manual override triggered - ESP32 will receive this command');
    // ESP32 communication will be implemented here
  };

  return (
    <WaterSystemContext.Provider value={{
      systemData,
      updateTankData,
      toggleMode,
      clearAlert,
      triggerOverride
    }}>
      {children}
    </WaterSystemContext.Provider>
  );
};

export const useWaterSystem = () => {
  const context = useContext(WaterSystemContext);
  if (context === undefined) {
    throw new Error('useWaterSystem must be used within a WaterSystemProvider');
  }
  return context;
};
