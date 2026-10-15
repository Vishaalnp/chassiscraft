import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Wrench, 
  Truck, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  FileText, 
  MapPin, 
  Star, 
  ArrowRightLeft, 
  Compass, 
  Clock, 
  Phone, 
  Mail, 
  HelpCircle,
  Eye
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { useConfigurator } from '../../store/ConfiguratorContext';
import { BodyCategory, Workshop } from '../../types';
import { formatCurrencyINR } from '../../utils/formatters';

interface HomeProps {
  setActiveTab: (tab: string) => void;
  onSelectWorkshop?: (workshop: Workshop) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab, onSelectWorkshop }) => {
  const { workshopsList, reviewsList, comparisonWorkshopIds, toggleCompareWorkshop } = useApp();
  const { resetConfig, updateConfig } = useConfigurator();

  const [activeGalleryFilter, setActiveGalleryFilter] = useState<'All' | 'Bus' | 'Lorry'>('All');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryDistrict, setEnquiryDistrict] = useState('Karur');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  const vehicleCategories = [
    {
      domain: 'Bus' as const,
      category: 'Tourist & Luxury Coach' as BodyCategory,
      title: 'Tourist & Luxury Coaches',
      desc: 'High-deck intercity executive coaches with luxury Harita pushback seats, 24kW AC, and deep underfloor luggage bays.',
      useCase: 'Intercity private tours, pilgrim packages & corporate transit',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600',
      badge: 'Karur Benchmark'
    },
    {
      domain: 'Bus' as const,
      category: 'Sleeper Coach (2+1)' as BodyCategory,
      title: 'Sleeper Coaches (2+1)',
      desc: 'Comfortable individual lower and upper berths with privacy curtains, dimmable LED, and USB fast charging.',
      useCase: 'Long-haul overnight routes (Chennai–Bangalore–Coimbatore)',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=600',
      badge: 'Overnight Luxury'
    },
    {
      domain: 'Bus' as const,
      category: 'Mofussil & Route Bus' as BodyCategory,
      title: 'Mofussil & Route Buses',
      desc: 'Rugged district transit bodies with luggage roof carriers, crash bumpers, and high-durability tubular cages.',
      useCase: 'State highway point-to-point daily route operation',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600',
      badge: 'High Endurance'
    },
    {
      domain: 'Bus' as const,
      category: 'School & College Bus' as BodyCategory,
      title: 'School & College Buses',
      desc: 'AIS-063 school bus code compliant with child-padded seating, emergency door sensor alarms, and speed governor.',
      useCase: 'Institutions, schools, colleges & university transit fleets',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=600',
      badge: 'AIS-063 Safety'
    },
    {
      domain: 'Bus' as const,
      category: 'Staff & Institutional Bus' as BodyCategory,
      title: 'Staff & Institutional Buses',
      desc: 'Ergonomic 36 to 48 seater high-back shuttles with engine-driven AC and bonded UV-cut glass windows.',
      useCase: 'IT corridor employee transport & industrial plant shuttles',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600',
      badge: 'Corporate Fleet'
    },
    {
      domain: 'Bus' as const,
      category: 'Town & City Bus' as BodyCategory,
      title: 'Town & City Transit Buses',
      desc: 'Urban transit bodies with low-floor passenger entry, wide pneumatic outward doors, and LED destination displays.',
      useCase: 'City transit, municipal corporations & metro feeders',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600',
      badge: 'Urban Transit'
    },
    {
      domain: 'Lorry' as const,
      category: 'Tipper & Dumper Body' as BodyCategory,
      title: 'Tipper & Dumper Bodies',
      desc: 'Heavy rock bodies (14-22 Cu.M) with 6mm Hardox wear plate, Hyva/Penta hydraulic tipping rams, and canopy shield.',
      useCase: 'Quarry granite, mining, construction blue metal & sand haulage',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600',
      badge: 'Namakkal Mining Benchmark'
    },
    {
      domain: 'Lorry' as const,
      category: 'Container & Cargo Body' as BodyCategory,
      title: 'Container & Cargo Bodies',
      desc: 'Corrugated steel or marine aluminium high-cube containers with phenolic marine plywood flooring and cam locks.',
      useCase: 'National e-commerce parcel logistics, textiles & FMCG transport',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=600',
      badge: 'All-Weather Sealed'
    },
    {
      domain: 'Lorry' as const,
      category: 'Open-Body Goods Lorry' as BodyCategory,
      title: 'Open-Body Goods Lorries',
      desc: 'Traditional dropside wooden and steel workhorses with removable side gates and reinforced headboard bulkheads.',
      useCase: 'Agricultural produce, heavy machinery & regional freight',
      image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=600',
      badge: 'Versatile Workhorse'
    },
    {
      domain: 'Lorry' as const,
      category: 'Refrigerated & Insulated Body' as BodyCategory,
      title: 'Refrigerated Reefer Bodies',
      desc: 'PUF-insulated cargo boxes (-20°C to +15°C) with Carrier/Thermo King direct drive units and food-grade GRP walls.',
      useCase: 'Milk, dairy pouches, pharmaceuticals & seafood export',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=600',
      badge: 'Cold Chain Logistics'
    }
  ];

  const galleryItems = [
    { title: 'Vetri 36-Berth Luxury AC Sleeper', domain: 'Bus', workshop: 'Karur Classic Coach Crafts', district: 'Karur', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600' },
    { title: '16 Cu.M Heavy Rock Tipper on Tata Signa', domain: 'Lorry', workshop: 'Namakkal Heavy Trailer & Tipper Bodies', district: 'Namakkal', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600' },
    { title: 'AIS-063 Educational 54-Seater School Bus', domain: 'Bus', workshop: 'Kovai Commercial Coach Builders', district: 'Coimbatore', image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=600' },
    { title: '28-Ft High Cube E-Commerce Container', domain: 'Lorry', workshop: 'Chennai Metro Commercial Fabricators', district: 'Chennai', image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=600' },
    { title: 'Trichy–Erode Mofussil Semi-Deluxe Bus', domain: 'Bus', workshop: 'Salem Royal Bus & Truck Fab', district: 'Salem', image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=600' },
    { title: 'Temperature-Controlled Reefer Milk Carrier', domain: 'Lorry', workshop: 'Madurai Southern Coach Works', district: 'Madurai', image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=600' },
  ];

  const filteredGallery = galleryItems.filter(item => {
    if (activeGalleryFilter === 'All') return true;
    return item.domain === activeGalleryFilter;
  });

  const faqs = [
    {
      q: 'How does BODYCRAFT TN ensure ARAI and AIS-052 compliance?',
      a: 'All onboarded workshops across Karur, Namakkal, and Coimbatore are verified against their ARAI body builder accreditation. Structures are designed with certified tubular steel rollover cages and fire-retardant interior specifications meeting AIS-052 Rev II and CMVR rules.'
    },
    {
      q: 'Can I build a vehicle body if I already have my own chassis?',
      a: 'Yes. In the Budget Planner, select "Chassis Available". You will only configure and pay for body fabrication, interior fitment, and paint. The workshop coordinates delivery directly to their bay.'
    },
    {
      q: 'What is the typical turnaround time for a bus or lorry in Tamil Nadu?',
      a: 'A standard lorry or tipper body typically requires 3 to 4 weeks. A route or school bus requires 4 to 5 weeks. High-deck luxury sleeper coaches require 6 to 8 weeks due to berth framing, HVAC testing, and acoustic insulation.'
    },
    {
      q: 'How does live 15-stage manufacturing tracking work?',
      a: 'Once your quotation is accepted, a dedicated project code is generated. Your workshop foremen log real-time status updates, engineering notes, and inspection photos across all 15 stages from chassis inspection to final RTO clearance.'
    }
  ];

  const handleConfigureCategory = (domain: 'Bus' | 'Lorry', cat: BodyCategory) => {
    resetConfig(domain);
    updateConfig({ category: cat });
    setActiveTab('budget-planner');
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryPhone) return;
    setEnquirySuccess(true);
  };

  return (
    <div className="space-y-20 pb-16 text-[#F5F2EB]">
      {/* SECTION B: HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#101b27] via-[#172638] to-[#0e1622] pb-24 pt-12">
        <div className="absolute inset-0 bg-blueprint opacity-35 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#B76E3C]/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="animate-rise-in lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full border border-[#b76e3c]/40 bg-[#0e1622]/90 px-3.5 py-1.5 text-xs font-bold text-[#f0b184] shadow-inner">
                <ShieldCheck className="w-4 h-4 text-[#8EAB98]" />
                <span>Built for Tamil Nadu's transport economy</span>
              </div>

              <h1 className="font-display text-4xl font-bold leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-7xl">
                A better way to <br />
                <span className="text-[#f0a875]">build your next vehicle.</span>
              </h1>

              <p className="max-w-2xl text-base font-light leading-relaxed text-slate-300 sm:text-lg">
                Discover trusted body builders, configure your bus or lorry with confidence, and follow the work from the first drawing to final delivery.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('budget-planner')}
                  className="bg-gradient-to-r from-[#B76E3C] to-[#8E4C1E] hover:from-[#CF8754] hover:to-[#B76E3C] text-white font-extrabold px-6 py-3.5 rounded-xl text-sm flex items-center space-x-2 shadow-xl shadow-orange-950/40 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Start a build plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('find-workshops')}
                  className="bg-[#172638] hover:bg-[#1E324A] text-slate-200 hover:text-white font-bold px-6 py-3.5 rounded-xl text-sm border border-[#30363D] transition-all flex items-center space-x-2 shadow-sm"
                >
                  <Compass className="w-4 h-4 text-[#B76E3C]" />
                  <span>Meet verified builders</span>
                </button>
              </div>

              {/* Trust Features Bar */}
              <div className="grid grid-cols-1 gap-4 border-t border-[#30363D]/80 pt-6 text-xs font-mono text-slate-300 sm:grid-cols-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8EAB98] shrink-0" />
                  <span>Verified TN Builders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8EAB98] shrink-0" />
                  <span>Transparent Itemized Quotes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8EAB98] shrink-0" />
                  <span>15-Stage Progress Tracking</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Presentation */}
            <div className="animate-rise-in-delay relative lg:col-span-5">
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0e1622] shadow-2xl shadow-black/30">
                <img
                  src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=85&w=1000"
                  alt="Commercial bus travelling on a highway"
                  className="h-[27rem] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1622] via-transparent to-black/30" />

                <div className="absolute bottom-4 left-4 right-4 space-y-2 rounded-2xl border border-white/10 bg-[#172638]/90 p-4 backdrop-blur-md">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono font-bold text-[#f0b184]">Regional build reference</span>
                    <span className="bg-[#6E8878] text-white px-2 py-0.5 rounded text-[10px] font-bold">Specification ready</span>
                  </div>
                  <div className="text-xs text-white font-semibold">
                    Luxury coach body · Karur builder network
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1 border-t border-[#30363D]/60 font-mono">
                    <span>Indicative lead time · 6 weeks</span>
                    <span className="text-[#8EAB98] font-bold">From ₹18.5L*</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: VEHICLE SELECTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#30363D] pb-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#E29765] font-bold">
              Comprehensive Vehicle Portfolio
            </span>
            <h2 className="text-3xl font-black text-white mt-1">Bus & Commercial Lorry Body Configurations</h2>
            <p className="text-slate-400 text-xs mt-1">
              Engineered according to chassis wheelbase, payload limits, and Tamil Nadu RTO standards.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('bus-types')}
              className="text-xs text-[#E29765] hover:text-white font-bold px-3 py-1.5 rounded-lg border border-[#B76E3C]/40 hover:bg-[#172638]"
            >
              All Buses →
            </button>
            <button
              onClick={() => setActiveTab('lorry-types')}
              className="text-xs text-[#8EAB98] hover:text-white font-bold px-3 py-1.5 rounded-lg border border-[#6E8878]/40 hover:bg-[#172638]"
            >
              All Lorries →
            </button>
          </div>
        </div>

        {/* 10 Vehicle Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicleCategories.map((veh, i) => (
            <div
              key={i}
              className="bg-[#172638] rounded-xl border border-[#30363D] hover:border-[#B76E3C]/60 overflow-hidden shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={veh.image}
                    alt={veh.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172638] via-transparent to-black/30" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#B76E3C] text-white font-bold text-[10px] px-2.5 py-0.5 rounded shadow">
                      {veh.badge}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#0E1622]/80 text-slate-300 font-mono text-[10px] px-2 py-0.5 rounded">
                      {veh.domain} Body
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="text-base font-bold text-white group-hover:text-[#E29765] transition-colors">
                    {veh.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {veh.desc}
                  </p>
                  <div className="pt-2 border-t border-[#30363D]/60 text-[11px] text-slate-400 font-mono">
                    <strong className="text-slate-300">Use Case:</strong> {veh.useCase}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#0E1622]/60 border-t border-[#30363D] flex justify-between items-center">
                <button
                  onClick={() => setActiveTab(veh.domain === 'Bus' ? 'bus-types' : 'lorry-types')}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleConfigureCategory(veh.domain, veh.category)}
                  className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Configure</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION D: HOW IT WORKS (5-STEP PROCESS) */}
      <section className="bg-[#101B27] py-16 border-y border-[#30363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase text-[#E29765] font-bold">Simple 5-Step Process</span>
            <h2 className="text-3xl font-black text-white">How BODYCRAFT TN Works</h2>
            <p className="text-slate-400 text-xs">
              A transparent, customer-oriented journey from vehicle concept to delivery on Tamil Nadu roads.
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              { num: '01', title: 'Choose Bus or Lorry', desc: 'Select application, OEM chassis platform (Ashok Leyland, Tata, BharatBenz, Eicher), and body category.' },
              { num: '02', title: 'Enter Budget & Needs', desc: 'Set your budget cap, scope (body only vs chassis+body), seating layout, materials tier, and amenities.' },
              { num: '03', title: 'Compare Workshops', desc: 'Inspect verified Karur & Namakkal builders, examine warranties, turnaround times, and ARAI certifications.' },
              { num: '04', title: 'Receive & Approve Quotes', desc: 'Receive itemized transparent workshop bids. Request revisions or accept confirmed pricing snapshot.' },
              { num: '05', title: 'Track Fabrication', desc: 'Follow live 15-stage manufacturing progress with inspection notes, delay alerts, and photo uploads.' }
            ].map((step, idx) => (
              <div key={idx} className="bg-[#172638] border border-[#30363D] rounded-xl p-5 space-y-3 relative group hover:border-[#B76E3C] transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black text-[#E29765] font-mono">{step.num}</span>
                  <div className="w-2 h-2 rounded-full bg-[#8EAB98]" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#E29765] transition-colors">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setActiveTab('budget-planner')}
              className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              Start With Step 1: Plan Your Build →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION E: FEATURED WORKSHOPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#30363D] pb-5">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#E29765] font-bold">
              Verified Industrial Network
            </span>
            <h2 className="text-3xl font-black text-white mt-1">Featured Tamil Nadu Workshops</h2>
            <p className="text-slate-400 text-xs mt-1">
              Specialist bus coachbuilders in Karur and heavy haulage lorry fabricators in Namakkal.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('find-workshops')}
            className="text-xs bg-[#172638] hover:bg-[#1E324A] text-slate-300 hover:text-white px-4 py-2 rounded-lg border border-[#30363D] font-bold"
          >
            View All Workshops ({workshopsList.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workshopsList.slice(0, 3).map(ws => {
            const isComparing = comparisonWorkshopIds.includes(ws.id);
            return (
              <div
                key={ws.id}
                className="bg-[#172638] rounded-xl border border-[#30363D] hover:border-[#B76E3C]/60 overflow-hidden shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={ws.coverImage}
                      alt={ws.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#172638] via-transparent to-black/30" />
                    <div className="absolute top-3 left-3 flex space-x-1.5">
                      <span className="bg-[#0E1622]/90 text-white font-bold text-[10px] px-2 py-0.5 rounded border border-white/10 flex items-center">
                        <MapPin className="w-3 h-3 mr-1 text-[#B76E3C]" />
                        {ws.district}
                      </span>
                    </div>
                    {ws.verified && (
                      <div className="absolute top-3 right-3 bg-[#6E8878] text-white font-bold text-[10px] px-2 py-0.5 rounded shadow flex items-center">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        <span>Profile verified</span>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between text-xs text-white">
                      <div className="flex items-center space-x-1 bg-black/60 px-2 py-0.5 rounded">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="font-bold">{ws.rating}</span>
                        <span className="text-slate-400 text-[10px]">({ws.reviewCount})</span>
                      </div>
                      <span className="bg-black/60 px-2 py-0.5 rounded text-[10px]">
                        Est. {ws.establishedYear}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#E29765] transition-colors">
                        {ws.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{ws.tagline}</p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {ws.specializations.slice(0, 2).map((s, i) => (
                        <span key={i} className="bg-[#0E1622] text-slate-300 text-[10px] px-2 py-0.5 rounded border border-[#30363D]">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#30363D]/60 flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Indicative:</span>
                      <span className="text-white font-bold">{formatCurrencyINR(ws.indicativePriceRange.minINR)} +</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#0E1622]/60 border-t border-[#30363D] flex justify-between items-center gap-2">
                  <button
                    onClick={() => toggleCompareWorkshop(ws.id)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg border flex items-center space-x-1 ${
                      isComparing ? 'bg-[#6E8878]/30 border-[#8EAB98] text-[#8EAB98]' : 'border-[#30363D] text-slate-300'
                    }`}
                  >
                    <ArrowRightLeft className="w-3 h-3" />
                    <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onSelectWorkshop) onSelectWorkshop(ws);
                      setActiveTab('budget-planner');
                    }}
                    className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION F: BUILD REFERENCE GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#30363D] pb-4">
          <div>
            <span className="text-xs font-mono uppercase text-[#E29765] font-bold">Build references</span>
            <h2 className="text-2xl font-black text-white mt-0.5">Vehicle body inspirations</h2>
          </div>

          <div className="flex bg-[#172638] p-1 rounded-lg border border-[#30363D] text-xs">
            {(['All', 'Bus', 'Lorry'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveGalleryFilter(tab)}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  activeGalleryFilter === tab ? 'bg-[#B76E3C] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'All' ? 'All Builds' : `${tab} Bodies`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((proj, idx) => (
            <div key={idx} className="bg-[#172638] rounded-xl border border-[#30363D] overflow-hidden shadow-lg group">
              <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#172638] via-transparent to-black/20" />
                <div className="absolute top-3 left-3 bg-[#0E1622]/80 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                  {proj.district} Yard
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-white group-hover:text-[#E29765] transition-colors">{proj.title}</h4>
                <p className="text-[11px] text-slate-400">Reference brief · {proj.workshop}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION G: MANUFACTURING PROCESS SHOWCASE (15 STAGES) */}
      <section className="bg-[#101B27] py-16 border-y border-[#30363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase text-[#E29765] font-bold">Engineering Quality Assurance</span>
            <h2 className="text-3xl font-black text-white">The 15-Stage Manufacturing Journey</h2>
            <p className="text-slate-400 text-xs">
              Every bus coach and commercial lorry undergoes rigorous stage-by-stage fabrication and ARAI safety compliance.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
            {[
              { num: 1, name: 'Order Confirmation' },
              { num: 2, name: 'Chassis Receiving' },
              { num: 3, name: 'Chassis Inspection' },
              { num: 4, name: 'Design Approval' },
              { num: 5, name: 'Material Procurement' },
              { num: 6, name: 'Frame Fabrication' },
              { num: 7, name: 'Sheet Metal Paneling' },
              { num: 8, name: 'Doors & Windows' },
              { num: 9, name: 'Anti-Rust & 2K Paint' },
              { num: 10, name: 'Electrical Installation' },
              { num: 11, name: 'Interior & Seating' },
              { num: 12, name: 'Safety & Quality (ARAI)' },
              { num: 13, name: 'Road Testing & Trial' },
              { num: 14, name: 'RTO Clearance' },
              { num: 15, name: 'Vehicle Handover' }
            ].map(stage => (
              <div key={stage.num} className="bg-[#172638] border border-[#30363D] p-3 rounded-lg flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#B76E3C] text-white flex items-center justify-center font-bold font-mono text-[10px] shrink-0">
                  {stage.num}
                </span>
                <span className="text-slate-200 font-medium text-[11px] leading-tight">{stage.name}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setActiveTab('process')}
              className="text-xs text-[#E29765] hover:underline font-bold"
            >
              Explore Full Engineering Process Details →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION H: AUTHENTIC REVIEWS & ENQUIRY / FAQS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Customer Testimonials */}
        <div className="space-y-6">
          <div className="border-b border-[#30363D] pb-3">
            <span className="text-xs font-mono uppercase text-[#E29765] font-bold">Verified Feedback</span>
            <h2 className="text-2xl font-black text-white mt-0.5">Operator & Transporter Reviews</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviewsList.slice(0, 3).map(rev => (
              <div key={rev.id} className="bg-[#172638] rounded-xl border border-[#30363D] p-5 space-y-3 text-xs shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-white text-sm block">{rev.customerName}</span>
                    <span className="text-slate-400 text-[11px]">{rev.customerCompany}</span>
                  </div>
                  <div className="flex items-center space-x-0.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-white ml-1">{rev.overallRating}.0</span>
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed italic bg-[#0E1622] p-3 rounded-lg border border-[#30363D]">
                  "{rev.comment}"
                </p>

                <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1 border-t border-[#30363D]/60 font-mono">
                  <span>{rev.vehicleType}</span>
                  <span className="text-[#8EAB98] font-bold">Verified Build</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enquiry Form & FAQs 2-column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick Enquiry Form (6 cols) */}
          <div className="lg:col-span-6 bg-[#172638] rounded-2xl border border-[#30363D] p-6 space-y-4 shadow-xl">
            <div>
              <span className="text-xs font-mono uppercase text-[#E29765] font-bold">Quick Contact</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Send a Fleet Enquiry</h3>
              <p className="text-xs text-slate-400">
                Need guidance on chassis selection or fleet body pricing? Our Tamil Nadu technical desk will contact you within 24 hours.
              </p>
            </div>

            {enquirySuccess ? (
              <div className="bg-[#6E8878]/20 border border-[#8EAB98]/50 p-6 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#8EAB98] mx-auto" />
                <h4 className="font-bold text-white text-sm">Enquiry Received</h4>
                <p className="text-xs text-slate-300">
                  Our regional coordinator will call you back shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Your Name / Operator Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., R. Sundaram"
                    value={enquiryName}
                    onChange={(e) => setEnquiryName(e.target.value)}
                    className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Mobile Number (+91):</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 94431 XXXXX"
                    value={enquiryPhone}
                    onChange={(e) => setEnquiryPhone(e.target.value)}
                    className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Preferred Workshop District:</label>
                  <select
                    value={enquiryDistrict}
                    onChange={(e) => setEnquiryDistrict(e.target.value)}
                    className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2.5 text-white"
                  >
                    <option value="Karur">Karur (Bus Coach Capital)</option>
                    <option value="Namakkal">Namakkal (Lorry & Tipper Capital)</option>
                    <option value="Coimbatore">Coimbatore (Staff & Institutional)</option>
                    <option value="Salem">Salem (Mofussil & Freight)</option>
                    <option value="Chennai">Chennai (City & Containers)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Message / Requirements:</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly state your intended route, passenger count, or freight load..."
                    value={enquiryMessage}
                    onChange={(e) => setEnquiryMessage(e.target.value)}
                    className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2.5 text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#B76E3C] hover:bg-[#CF8754] text-white font-bold py-2.5 rounded-lg shadow text-xs transition-all"
                >
                  Submit Fleet Enquiry
                </button>
              </form>
            )}
          </div>

          {/* FAQs Accordion (6 cols) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="border-b border-[#30363D] pb-2">
              <span className="text-xs font-mono uppercase text-[#E29765] font-bold">Frequently Asked Questions</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Commercial Vehicle FAQs</h3>
            </div>

            <div className="space-y-2.5">
              {faqs.map((faq, idx) => {
                const isOpen = faqOpenIndex === idx;
                return (
                  <div key={idx} className="bg-[#172638] rounded-xl border border-[#30363D] overflow-hidden">
                    <button
                      onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left font-bold text-xs text-white flex justify-between items-center"
                    >
                      <span>{faq.q}</span>
                      <span className="text-[#E29765] ml-2 text-base">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-[#30363D]/60 pt-2 bg-[#0E1622]/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
