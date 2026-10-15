import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { ChassisSpec } from '../../types';
import { formatCurrencyINR } from '../../utils/formatters';
import { Truck, Plus, Trash2, Edit } from 'lucide-react';

export const ChassisManagement: React.FC = () => {
  const { chassisList, updateChassis, deleteChassis, addChassis } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-black text-white">OEM Chassis Model Management</h1>
          <p className="text-slate-400 text-xs mt-1">Manage OEM chassis specifications, wheelbases, GVW ratings, and baseline prices.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chassisList.map((c) => (
          <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-rose-400 font-bold uppercase">{c.brand}</span>
                <h3 className="text-sm font-bold text-white">{c.model}</h3>
              </div>
              <button onClick={() => deleteChassis(c.id)} className="text-slate-500 hover:text-rose-400 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-between"><span>Wheelbase:</span> <strong className="text-white">{c.wheelbaseMm} mm</strong></div>
              <div className="flex justify-between"><span>GVW:</span> <strong className="text-white">{c.gvwKg} kg</strong></div>
              <div className="flex justify-between"><span>Base Price:</span> <strong className="text-amber-400">{formatCurrencyINR(c.basePriceINR)}</strong></div>
              <div className="flex justify-between"><span>Stock:</span> <strong className="text-emerald-400">{c.stockAvailable} units</strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
