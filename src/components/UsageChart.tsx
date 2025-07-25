
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useWaterSystem } from '@/contexts/WaterSystemContext';

const UsageChart = () => {
  const { systemData } = useWaterSystem();
  
  const chartData = systemData.weeklyUsage.map((usage, index) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
    usage,
    date: new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000).toLocaleDateString()
  }));

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Weekly Usage Trends</h3>
        <div className="text-sm text-blue-200 mt-2 sm:mt-0">
          Average: {(systemData.weeklyUsage.reduce((a, b) => a + b, 0) / 7).toFixed(1)}L/day
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="day" 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              unit="L"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value: any) => [`${value}L`, 'Usage']}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="usage" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#06B6D4', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#06B6D4' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageChart;
