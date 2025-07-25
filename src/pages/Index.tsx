
import React from 'react';
import { WaterSystemProvider } from '@/contexts/WaterSystemContext';
import Header from '@/components/Header';
import WaterMeters from '@/components/WaterMeters';
import UsageChart from '@/components/UsageChart';
import AlertPanel from '@/components/AlertPanel';
import ControlPanel from '@/components/ControlPanel';
import ModeToggle from '@/components/ModeToggle';

const Index = () => {
  return (
    <WaterSystemProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <Header />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Main Water Meters */}
            <div className="lg:col-span-2">
              <WaterMeters />
            </div>
            
            {/* Side Panel */}
            <div className="space-y-6">
              <ModeToggle />
              <AlertPanel />
              <ControlPanel />
            </div>
          </div>
          
          {/* Usage Analytics */}
          <div className="mt-8">
            <UsageChart />
          </div>
        </div>
      </div>
    </WaterSystemProvider>
  );
};

export default Index;
