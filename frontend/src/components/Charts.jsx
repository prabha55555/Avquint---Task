import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';

export const CompletionPieChart = ({ data }) => {
  const COLORS = ['#10B981', '#F59E0B']; // Emerald and Amber

  // Filter out zero value data points to keep pie clean
  const validData = data.filter((item) => item.value > 0);

  return (
    <div className="h-64 w-full">
      {validData.length === 0 ? (
        <div className="h-full flex items-center justify-center text-slate-400 text-sm">
          No task data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={validData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {validData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.1)',
                background: 'rgba(255, 255, 255, 0.9)',
              }}
              itemStyle={{ color: '#0F172A' }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export const WeeklyProductivityChart = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} stroke="#94A3B8" />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} stroke="#94A3B8" />
          <Tooltip
            contentStyle={{
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.1)',
              background: 'rgba(255, 255, 255, 0.9)',
            }}
            itemStyle={{ color: '#0F172A' }}
          />
          <Bar dataKey="completed" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={28} name="Completed Tasks" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PendingVsCompletedTrendChart = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} stroke="#94A3B8" />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} stroke="#94A3B8" />
          <Tooltip
            contentStyle={{
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.1)',
              background: 'rgba(255, 255, 255, 0.9)',
            }}
            itemStyle={{ color: '#0F172A' }}
          />
          <Legend verticalAlign="top" height={36} />
          <Area
            type="monotone"
            dataKey="completed"
            stroke="#10B981"
            fillOpacity={1}
            fill="url(#colorCompleted)"
            strokeWidth={2}
            name="Completed"
          />
          <Area
            type="monotone"
            dataKey="pending"
            stroke="#EF4444"
            fillOpacity={1}
            fill="url(#colorPending)"
            strokeWidth={2}
            name="Pending"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
