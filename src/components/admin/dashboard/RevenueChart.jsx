// components/RevenueChart.js
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import ChartContainer from '../dashboard/ChartContainer';

const RevenueChart = ({ data, darkMode }) => {
  return (
    <ChartContainer title="Revenue Overview" darkMode={darkMode}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
          <XAxis 
            dataKey="name" 
            stroke={darkMode ? "#9ca3af" : "#6b7280"} 
          />
          <YAxis 
            stroke={darkMode ? "#9ca3af" : "#6b7280"} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              borderColor: darkMode ? '#374151' : '#e5e7eb',
              color: darkMode ? '#f3f4f6' : '#1f2937'
            }} 
            formatter={(value) => [`$${value}`, 'Revenue']}
          />
          <Bar 
            dataKey="amount" 
            name="Revenue" 
            fill="#10b981" 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RevenueChart;