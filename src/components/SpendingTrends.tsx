import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useFinanceStore } from '../store';

const data = [
  { name: 'Mon', value: 35 },
  { name: 'Tue', value: 55 },
  { name: 'Wed', value: 85 },
  { name: 'Thu', value: 45 },
  { name: 'Fri', value: 95 },
  { name: 'Sat', value: 65 },
  { name: 'Sun', value: 75 },
];

export const SpendingTrends: React.FC = () => {
    const { timeRange, setTimeRange } = useFinanceStore();
    return (
      <div className="glass-card rounded-[48px] p-12 shadow-2xl relative overflow-hidden group border-white/40 min-h-[400px]">
        <div className="flex items-center justify-between mb-16 relative z-10">
          <div>
            <h3 className="text-3xl font-black tracking-tight mb-2 dark:text-white">Portfolio Velocity</h3>
            <p className="text-sm font-bold text-slate-400 opacity-60 uppercase tracking-widest leading-none">Real-time Data Sync Enabled</p>
          </div>
          <div className="flex gap-2">
            {(['1W', '1M', '1Y'] as const).map(t => (
              <button 
                key={t} 
                onClick={() => setTimeRange(t)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${timeRange === t ? 'bg-sky-500 text-white shadow-lg' : 'dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

      <div className="h-64 mt-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
            />
            <Tooltip 
              cursor={{ fill: 'rgba(14, 165, 233, 0.05)', radius: 12 }}
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#0f172a',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '800'
              }}
            />
            <Bar 
              dataKey="value" 
              radius={[10, 10, 10, 10]} 
              barSize={20}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 4 ? '#0ea5e9' : '#0ea5e933'} 
                  className={index === 4 ? 'filter drop-shadow-[0_-5px_15px_rgba(14,165,233,0.5)]' : ''}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-12 flex justify-between items-center text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
          <span className="text-[10px] font-black uppercase tracking-widest">Inflow Stream</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />
          <span className="text-[10px] font-black uppercase tracking-widest">Base Reference</span>
        </div>
      </div>
    </div>
  );
};
