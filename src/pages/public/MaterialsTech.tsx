import React from 'react';
import { MOCK_MATERIALS } from '../../data/mockMaterials';
import { formatCurrencyINR } from '../../utils/formatters';

export const MaterialsTech: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-100">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/50">
          Certified Metallurgy & Composites
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Materials & Engineering Technology</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          We use high-tensile structural steel, flame-retardant FRP composites, E-marked safety glass, and 2K polyurethane paint systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_MATERIALS.map((mat) => (
          <div key={mat.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono bg-slate-800 text-cyan-300 px-2.5 py-0.5 rounded border border-slate-700">
                {mat.category}
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold">
                {mat.durabilityRatingYears} Yr Rating
              </span>
            </div>
            <h3 className="text-base font-bold text-white">{mat.name}</h3>
            <p className="text-slate-400 text-xs leading-relaxed">{mat.description}</p>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-xs font-mono text-slate-300">
              <span>Grade: <strong className="text-white">{mat.grade}</strong></span>
              <span>Rate: <strong className="text-amber-400">{formatCurrencyINR(mat.unitCostINR)}/{mat.unit}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
