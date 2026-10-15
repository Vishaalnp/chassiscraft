import React from 'react';
import { Sparkles, ArrowRight, Layers, CheckCircle } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

interface BodyDesignsProps {
  setActiveTab: (tab: string) => void;
}

export const BodyDesigns: React.FC<BodyDesignsProps> = ({ setActiveTab }) => {
  const presets = [
    {
      title: 'Royal Aerocoach 12M High-Deck',
      category: 'Tourist Coach',
      seats: '36 Executive Recliners',
      length: '11,800 mm',
      estPrice: 4850000,
      tags: ['Aerodynamic FRP', 'RGB Mood Lighting', 'Sub-Engine AC', 'Luggage Belly 280 cu.ft'],
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Sleeper Cruiser 30-Berth Hybrid',
      category: 'Sleeper Coach',
      seats: '30 AC Sleeper Berths',
      length: '12,000 mm',
      estPrice: 6200000,
      tags: ['15 Upper / 15 Lower', 'Individual Smart TV', 'Blackout Curtains', 'AIS-052 Certified'],
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Metro Transit City Master 12M',
      category: 'City Bus',
      seats: '34 Seats + 30 Standing',
      length: '11,950 mm',
      estPrice: 3850000,
      tags: ['Dual Pneumatic Doors', 'LED Destination Screen', 'Low Entrance Step', 'Vandal-proof Seats'],
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Safe Transit School Cruiser 54',
      category: 'School Bus',
      seats: '54 Child Seats',
      length: '11,200 mm',
      estPrice: 3577000,
      tags: ['AIS-052 Safety Bars', 'Emergency Buzzer', 'Padded Headrests', 'Speed Limiter 50 km/h'],
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-100">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/50">
          Design Presets & Blueprint Templates
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Pre-Engineered Body Models</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Select a popular pre-engineered blueprint design to customize further in our digital configurator.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {presets.map((preset, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div className="h-56 relative overflow-hidden">
              <img src={preset.image} alt={preset.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-mono text-cyan-400">
                {preset.category}
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <h3 className="text-lg font-bold text-white">{preset.title}</h3>
                <span className="text-amber-400 font-mono font-bold text-sm bg-slate-950/90 px-3 py-1 rounded-lg">
                  {formatCurrencyINR(preset.estPrice)}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono">
                <div>
                  <span className="text-slate-500 block">Capacity</span>
                  <span className="text-white font-semibold">{preset.seats}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Body Length</span>
                  <span className="text-white font-semibold">{preset.length}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {preset.tags.map((tg, i) => (
                  <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700 flex items-center">
                    <CheckCircle className="w-3 h-3 text-emerald-400 mr-1" />
                    {tg}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setActiveTab('configurator-wizard')}
                className="w-full bg-slate-800 hover:bg-rose-600 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Load & Customize This Template</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
