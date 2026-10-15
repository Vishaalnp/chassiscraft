import React from 'react';
import { 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Compass, 
  Hammer, 
  Award,
  Maximize2
} from 'lucide-react';
import { useConfigurator } from '../../store/ConfiguratorContext';
import { BodyCategory } from '../../types';

interface LorryTypesProps {
  setActiveTab: (tab: string) => void;
}

export const LorryTypes: React.FC<LorryTypesProps> = ({ setActiveTab }) => {
  const { resetConfig, updateConfig } = useConfigurator();

  const lorryCategories = [
    {
      title: 'Tipper & Dumper Bodies (14 – 22 Cu.M)',
      category: 'Tipper & Dumper Body' as BodyCategory,
      badge: 'Namakkal Mining Benchmark',
      description: 'Engineered for high-abrasion granite, blue metal, coal, and sand transport. Fabricated with heavy subframes and Penta or Hyva hydraulic cylinders.',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
      specs: [
        'Hardox / Sailhard 6mm high tensile steel floor',
        'Hyva FE 149 / Penta 3-stage tipping ram',
        'Automatic release top-hinged tail door',
        'Canopy cabin protection shield'
      ],
      idealChassis: 'Tata Signa 2823.K, Ashok Leyland 2825, BharatBenz 2828C',
      indicativePrice: '₹4,50,000 - ₹9,50,000'
    },
    {
      title: 'Container & Closed Cargo Bodies (20 – 32 Ft)',
      category: 'Container & Cargo Body' as BodyCategory,
      badge: 'E-Commerce & High-Cube',
      description: 'Leak-proof weather-tight container bodies for courier, electronics, textile, and FMCG parcels across national highway corridors.',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800',
      specs: [
        'Corrugated MS steel or marine aluminium panels',
        '18mm chem-treated phenolic plywood flooring',
        'Full-height rear double doors with cam locks',
        'Internal cargo lashing rings & LED strip lights'
      ],
      idealChassis: 'Ashok Leyland BOSS 1920, Tata Ultra T.16, Eicher Pro 3019',
      indicativePrice: '₹3,80,000 - ₹7,20,000'
    },
    {
      title: 'Open-Body Goods Lorries (Dropside)',
      category: 'Open-Body Goods Lorry' as BodyCategory,
      badge: 'Traditional Tamil Nadu Workhorse',
      description: 'The versatile backbone of South Indian transport. Heavy timber and chequered plate floors with removable drop-side flaps for agricultural produce and heavy machinery.',
      image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=800',
      specs: [
        '3-way drop down side gates with spring locks',
        'Heavy ISMC 100/125 channel cross-members',
        'Removable top canopy tarpaulin bow frame',
        'Sturdy headboard cabin protection bulkhead'
      ],
      idealChassis: 'Tata 1616, Ashok Leyland Ecomet, BharatBenz 1617R',
      indicativePrice: '₹3,20,000 - ₹5,80,000'
    },
    {
      title: 'Refrigerated & Insulated Reefer Bodies',
      category: 'Refrigerated & Insulated Body' as BodyCategory,
      badge: 'Cold Chain Logistics',
      description: 'Temperature-controlled cargo boxes (-20°C to +15°C) for dairy, milk pouches, pharmaceuticals, sea-food, and frozen vegetables.',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=800',
      specs: [
        '100mm to 125mm high density injected PUF insulation',
        'GRP/FRP seamless inner and outer food-grade walls',
        'Carrier Transicold / Thermo King direct engine unit',
        'Stainless steel T-profile air circulation floor'
      ],
      idealChassis: 'BharatBenz 1617R, Ashok Leyland BOSS 1415, Eicher Pro 2095',
      indicativePrice: '₹6,50,000 - ₹14,00,000'
    }
  ];

  const handleConfigure = (cat: BodyCategory) => {
    resetConfig('Lorry');
    updateConfig({ category: cat });
    setActiveTab('budget-planner');
  };

  return (
    <div className="min-h-screen bg-[#0E1622] text-[#F5F2EB] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="border-b border-[#30363D] pb-6">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E29765] uppercase tracking-wider mb-2">
            <Truck className="w-4 h-4 text-[#B76E3C]" />
            <span>Namakkal & Salem Commercial Fabrication Heritage</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Commercial Lorry & Truck Body Building
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-3xl">
            From heavy rock tippers in Namakkal to all-weather e-commerce container boxes and refrigerated reefer units. Build durable, payload-optimized truck bodies engineered with certified Tata & Jindal structural steel channels.
          </p>
        </div>

        {/* Lorry Body Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lorryCategories.map((item, index) => (
            <div
              key={index}
              className="bg-[#172638] rounded-2xl border border-[#30363D] hover:border-[#B76E3C]/60 overflow-hidden shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172638] via-transparent to-black/30" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#B76E3C] text-white font-bold text-xs px-3 py-1 rounded-md shadow">
                      {item.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs">
                    <span className="bg-black/70 backdrop-blur-sm text-slate-200 px-2.5 py-1 rounded">
                      Indicative: {item.indicativePrice}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#E29765] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-1.5 pt-2 border-t border-[#30363D]/60">
                    <span className="text-[11px] font-mono text-[#E29765] uppercase tracking-wider block font-bold">
                      Fabrication Highlights:
                    </span>
                    {item.specs.map((sp, i) => (
                      <div key={i} className="flex items-center text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-[#8EAB98] shrink-0" />
                        <span>{sp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Compatible Chassis */}
                  <div className="bg-[#0E1622] p-3 rounded-lg border border-[#30363D] text-xs">
                    <span className="text-slate-500 text-[10px] block font-mono">Recommended Chassis:</span>
                    <span className="text-white font-medium">{item.idealChassis}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 bg-[#0E1622]/60 border-t border-[#30363D] flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveTab('find-workshops')}
                  className="text-xs px-3.5 py-2 rounded-lg border border-[#30363D] hover:bg-[#172638] text-slate-300 font-medium"
                >
                  Find Namakkal Builders
                </button>
                <button
                  onClick={() => handleConfigure(item.category)}
                  className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-4 py-2 rounded-lg shadow flex items-center space-x-1.5 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Configure This Body</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Manufacturing Standards Banner */}
        <div className="bg-[#172638] rounded-2xl p-6 border border-[#30363D] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#B76E3C]/20 text-[#E29765] flex items-center justify-center shrink-0">
              <Hammer className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Certified Subframe Welding</h4>
              <p className="text-slate-400 mt-0.5">Heavy channel web-reinforcement bolted with 10.9 high-tensile flanged fasteners to withstand rough quarry roads.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#6E8878]/20 text-[#8EAB98] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Shot-Blasting Anti-Corrosion</h4>
              <p className="text-slate-400 mt-0.5">Automated shot blasting followed by high-build epoxy red oxide primer prevents rust under harsh chemical and fertilizer loads.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">ARAI & CMVR Approval</h4>
              <p className="text-slate-400 mt-0.5">All lorry dimensions, underrun protection (RUPD/SUPD), and reflective tape contours satisfy RTO fitness criteria.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
