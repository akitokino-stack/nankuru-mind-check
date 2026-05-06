import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import './WeeklyTrend.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-date">{label}</p>
        <p className="tooltip-score">
          スコア: <span className="tooltip-val">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const WeeklyTrend = ({ history = [] }) => {
  // 直近7件を抽出し、グラフ用に古い順（昇順）に並べ替え
  const chartData = [...history]
    .slice(0, 7)
    .reverse()
    .map(item => ({
      date: item.date.split('-').slice(1).join('/'), // YYYY-MM-DD -> MM/DD
      score: item.score
    }));

  return (
    <div className="trend-card">
      <h2 className="section-title">週間の感情傾向</h2>
      <div className="trend-graph-container">
        {chartData.length === 0 ? (
          <div className="empty-graph-state">
            <p>データが蓄積されるとここにグラフが表示されます</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#95cbe1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#95cbe1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf2f7" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#a0aec0' }} 
                dy={10}
              />
              <YAxis 
                domain={[0, 100]} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#a0aec0' }}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#5ba4cc" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorScore)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default WeeklyTrend;
