import React, { useState } from 'react';
import { MOCK_CHASSIS } from '../../data/mockChassis';
import { ChassisBrand } from '../../types';
import { formatCurrencyINR } from '../../utils/formatters';
import { Truck, Check, ArrowRight, ShieldCheck, Filter } from 'lucide-react';
import { useConfigurator } from '../../store/ConfiguratorContext';

interface ChassisCatalogProps {
  setActiveTab: (tab: string) => void;
}

export const ChassisCatalog: React.FC<ChassisCatalogProps> = ({ setActiveTab }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const { updateConfig } = useConfigurator();

  const brands: (ChassisBrand | 'All')[] = ['All', 'Ashok Leyland', 'Tata Motors', 'Eicher', 'BharatBenz', 'Volvo', 'Scania', 'Force Motors'];

  const filteredChassis = selectedBrand === 'All'
    ? MOCK_CHASSIS
    : MOCK_CHASSIS.filter(c => c.brand === selectedBrand);

  const handleSelectChassis = (item: typeof MOCK_CHASSIS[0]) => {
    updateConfig({ chassis: item, domain: item.domain === 'Both' ? 'Bus' : item.domain });
    setActiveTab('budget-planner');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-100">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/50">
          OEM Chassis Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Select OEM Bus & Lorry Chassis</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Compare specs, wheelbases, GVW ratings, and baseline prices across India's top commercial vehicle manufacturers.
        </p>
      </div>

      {/* Brand Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {brands.map((b) => (
          <button
            key={b}
            onClick={() => setSelectedBrand(b)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all ${
              selectedBrand === b
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChassis.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono text-rose-400 font-bold uppercase">{item.brand}</span>
                  <h3 className="text-lg font-bold text-white">{item.model}</h3>
                </div>
                <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono px-2.5 py-1 rounded-full">
                  Stock: {item.stockAvailable} units
                </span>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>

              {/* Specifications Table */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 font-mono">
                <div>
                  <span className="text-slate-500 block">Wheelbase</span>
                  <span className="text-white font-semibold">{item.wheelbaseMm} mm</span>
                </div>
                <div>
                  <span className="text-slate-500 block">GVW Rating</span>
                  <span className="text-white font-semibold">{item.gvwKg} kg</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Engine Output</span>
                  <span className="text-white font-semibold">{item.enginePowerHp} HP</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Fuel Type</span>
                  <span className="text-white font-semibold">{item.fuelType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Max Body Length</span>
                  <span className="text-white font-semibold">{item.maxRecommendedBodyLengthMm} mm</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Est. Base Price</span>
                  <span className="text-amber-400 font-bold">{formatCurrencyINR(item.basePriceINR)}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-1">Recommended Body Builds:</span>
                <div className="flex flex-wrap gap-1">
                  {item.suitableBodyTypes.map((bt, i) => (
                    <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      {bt}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelectChassis(item)}
              className="w-full mt-4 bg-slate-800 hover:bg-rose-600 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-2"
            >
              <span>Build Body on this Chassis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
