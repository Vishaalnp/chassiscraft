import React from 'react';
import { Settings as SettingsIcon, ShieldCheck, Save } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h1 className="text-2xl font-black text-white">System & Factory Compliance Settings</h1>
        <p className="text-slate-400 text-xs mt-1">Manage company tax rate settings, AIS-052 validation rules, notification triggers.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 font-mono text-xs">
        <h2 className="text-base font-bold text-white border-b border-slate-800 pb-2">Tax & Compliance Configuration</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">Standard Vehicle GST Rate (%):</label>
            <input type="number" defaultValue={18} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white outline-none" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Max Rear Overhang Wheelbase Ratio (%):</label>
            <input type="number" defaultValue={60} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
