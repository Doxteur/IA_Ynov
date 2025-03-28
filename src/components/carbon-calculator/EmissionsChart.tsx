import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface EmissionsChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const EmissionsChart: React.FC<EmissionsChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={75}
          outerRadius={95}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EmissionsChart;
