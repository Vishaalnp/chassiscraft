import React from 'react';
import { useApp } from '../../store/AppContext';
import { formatCurrencyINR } from '../../utils/formatters';
import { Layers, PackageCheck, AlertCircle } from 'lucide-react';

export const MaterialManagement: React.FC = () => {
  const { materialsList, updateMaterialStock } = useApp();

  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h1 className="text-2xl font-black text-white">Raw Material Inventory Control</h1>
        <p className="text-slate-400 text-xs mt-1">Manage stock inventory levels for tubular steel, FRP fiberglass panels, toughened glass, and paint.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="p-3">Category</th>
              <th className="p-3">Material Symbol</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Manufacturer</th>
              <th className="p-3">Unit Cost</th>
              <th className="p-3">Stock Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {materialsList.map((m) => (
              <tr key={m.id} className="hover:bg-slate-950">
                <td className="p-3 font-bold text-cyan-400">{m.category}</td>
                <td className="p-3 text-white font-bold">{m.name}</td>
                <td className="p-3 text-slate-300">{m.grade}</td>
                <td className="p-3 text-slate-400">{m.manufacturer}</td>
                <td className="p-3 text-amber-400 font-bold">{formatCurrencyINR(m.unitCostINR)} / {m.unit}</td>
                <td className="p-3">
                  <span className={`px-2.5 py-1 rounded border font-bold ${
                    m.inStock < 500 ? 'bg-rose-950 text-rose-400 border-rose-800' : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                  }`}>
                    {m.inStock} {m.unit}s
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
