import React from 'react';
import { BarChart2, TrendingUp, PieChart, Download } from 'lucide-react';
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip } from 'recharts';

export const Reports: React.FC = () => {
  const brandShare = [
    { name: 'Ashok Leyland', value: 45 },
    { name: 'Tata Motors', value: 30 },
    { name: 'Eicher', value: 15 },
    { name: 'BharatBenz', value: 10 },
  ];

  const COLORS = ['#F43F5E', '#38BDF8', '#F59E0B', '#10B981'];

  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white">Reports & Industrial Analytics</h1>
          <p className="text-slate-400 text-xs mt-1">Vehicle manufacturing throughput, OEM chassis share, monthly revenue trends.</p>
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 text-xs font-mono font-bold px-4 py-2 rounded-xl flex items-center space-x-1">
          <Download className="w-4 h-4" />
          <span>Export PDF Summary</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white">OEM Chassis Share Breakdown</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie data={brandShare} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                  {brandShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0B0F17', borderColor: '#334155', color: '#FFF' }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
