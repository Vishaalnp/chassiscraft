import React from 'react';
import { BodyCategory } from '../../types';
import { ArrowRight, CheckCircle2, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { useConfigurator } from '../../store/ConfiguratorContext';

interface BusTypesProps {
  setActiveTab: (tab: string) => void;
}

interface BusCategoryDetail {
  title: BodyCategory;
  tagline: string;
  badge: string;
  seatingRange: string;
  chassisLength: string;
  suitableChassis: string;
  keyFeatures: string[];
  indicativePrice: string;
  image: string;
}

export const BusTypes: React.FC<BusTypesProps> = ({ setActiveTab }) => {
  const { resetConfig, updateConfig } = useConfigurator();

  const categories: BusCategoryDetail[] = [
    {
      title: 'Tourist & Luxury Coach',
      tagline: 'High-deck intercity executive coach engineered for premium travel, tours, and corporate transit across South India.',
      badge: 'Karur Benchmark',
      seatingRange: '36 to 45 Harita Pushback Seats',
      chassisLength: '11.8M to 12.0M',
      suitableChassis: 'Ashok Leyland 12M Viking 225HP, BharatBenz 1624, Tata LPO 1618',
      keyFeatures: [
        'Pushback recliner seats with USB fast charging',
        '24kW roof-mounted air conditioning',
        'Underfloor deep luggage bellies (300+ Cu.Ft)',
        'Fixed panoramic flush toughened glass'
      ],
      indicativePrice: '₹14,50,000 - ₹26,00,000',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Sleeper Coach (2+1)',
      tagline: 'Spacious 2+1 individual AC sleeper berths engineered for overnight Chennai-Bangalore-Coimbatore routes.',
      badge: 'Overnight Luxury',
      seatingRange: '30 to 36 Berths (15 Lower / 15 Upper)',
      chassisLength: '12.0M to 13.5M',
      suitableChassis: 'Ashok Leyland 12M Air Suspension, BharatBenz 1624 Glider, Volvo B11R',
      keyFeatures: [
        'Aviation-inspired private berth curtains & dimmable LED',
        'Reinforced tubular steel anti-roll sleeper skeleton',
        'Individual mobile fast chargers and water bottle holders',
        'AIS-052 Rev II Rollover Test Certification'
      ],
      indicativePrice: '₹17,50,000 - ₹28,50,000',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Mofussil & Route Bus',
      tagline: 'The undisputed workhorse of Tamil Nadu district transit, built for continuous daily operation on state highways and rural routes.',
      badge: 'High Endurance',
      seatingRange: '48 to 54 Semi-Deluxe Highback Seats',
      chassisLength: '11.0M to 11.95M',
      suitableChassis: 'Ashok Leyland Viking 1616, Tata LPO 1618 BS6',
      keyFeatures: [
        'Sturdy tubular roof carrier with rear access ladder',
        'Stainless steel grab handrails and anti-slip chequered flooring',
        'Tinted sliding windows with safety glass louvres',
        'Front and rear heavy-duty impact crash bumpers'
      ],
      indicativePrice: '₹9,80,000 - ₹15,50,000',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'School & College Bus',
      tagline: 'Built with AIS-063 code of practice for school child safety, visibility, and emergency egress.',
      badge: 'AIS-063 School Safe',
      seatingRange: '40 to 60 Student Seats (3+2 / 3+3)',
      chassisLength: '9.0M to 11.2M',
      suitableChassis: 'Eicher Skyline Pro 6016, Tata LPO 1618, Ashok Leyland Oyster',
      keyFeatures: [
        'School Bus Yellow (Golden Yellow) polyurethane paint',
        'Emergency exit door with acoustic dashboard alarm',
        'Under-seat school bag storage and lowered first step',
        'ARAI approved speed governor set to 50 km/h'
      ],
      indicativePrice: '₹8,50,000 - ₹14,00,000',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Staff & Institutional Bus',
      tagline: 'Comfortable commute shuttles for IT corridor campuses, industrial manufacturing zones, and universities.',
      badge: 'Corporate Fleet',
      seatingRange: '36 to 48 Highback Seats',
      chassisLength: '10.5M to 11.8M',
      suitableChassis: 'Tata LPO 1618, Ashok Leyland Viking, Eicher Pro 6016',
      keyFeatures: [
        'Ergonomic high-back cushioned fabric seats',
        'Integrated engine-driven 12kW air conditioning',
        'Tinted UV-cut bonded windows for summer heat reduction',
        'Rear wide emergency evacuation door'
      ],
      indicativePrice: '₹11,00,000 - ₹18,00,000',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Town & City Bus',
      tagline: 'High passenger density urban transit body with wide passenger flow doors and low floor entry.',
      badge: 'Urban Transit',
      seatingRange: '32 Seated + 30 Standees',
      chassisLength: '9.5M to 12.0M',
      suitableChassis: 'Ashok Leyland JanBus / Viking, Tata Ultra Transit',
      keyFeatures: [
        'Dual wide pneumatic outward swing doors',
        'Full LED electronic route destination boards front & rear',
        'Sturdy moulded vandal-resistant FRP seating',
        'Continuous horizontal roof stanchion handrails'
      ],
      indicativePrice: '₹10,50,000 - ₹16,50,000',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const handleConfigure = (cat: BodyCategory) => {
    resetConfig('Bus');
    updateConfig({ category: cat });
    setActiveTab('budget-planner');
  };

  return (
    <div className="min-h-screen bg-[#0E1622] text-[#F5F2EB] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="border-b border-[#30363D] pb-6">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E29765] uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4 text-[#B76E3C]" />
            <span>Karur & Coimbatore Bus Coachbuilding Heritage</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Bus Body Building Configurations
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-3xl">
            Explore certified bus body designs engineered for Tamil Nadu operators. Every design satisfies AIS-052 rollover stability, fire-retardant interior norms, and CMVR guidelines.
          </p>
        </div>

        {/* Bus Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-[#172638] rounded-xl border border-[#30363D] hover:border-[#B76E3C]/60 overflow-hidden shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172638] via-transparent to-black/30" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#B76E3C] text-white font-bold text-[10px] px-2.5 py-1 rounded shadow">
                      {cat.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between text-xs">
                    <span className="bg-black/70 backdrop-blur-sm text-slate-200 px-2 py-0.5 rounded text-[11px]">
                      {cat.chassisLength}
                    </span>
                    <span className="bg-[#6E8878] text-white font-semibold px-2 py-0.5 rounded text-[10px]">
                      AIS-052
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h2 className="text-lg font-bold text-white group-hover:text-[#E29765] transition-colors">
                      {cat.title}
                    </h2>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      {cat.tagline}
                    </p>
                  </div>

                  <div className="bg-[#0E1622] p-3 rounded-lg border border-[#30363D] space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Seating:</span>
                      <span className="text-white font-semibold">{cat.seatingRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Indicative:</span>
                      <span className="text-[#8EAB98] font-semibold">{cat.indicativePrice}</span>
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-mono text-[#E29765] uppercase tracking-wider block font-bold">
                      Key Highlights:
                    </span>
                    {cat.keyFeatures.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-[#8EAB98] shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#0E1622]/60 border-t border-[#30363D] flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveTab('find-workshops')}
                  className="text-xs px-3 py-1.5 rounded-lg border border-[#30363D] hover:bg-[#172638] text-slate-300"
                >
                  Workshops
                </button>
                <button
                  onClick={() => handleConfigure(cat.title)}
                  className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Configure</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
