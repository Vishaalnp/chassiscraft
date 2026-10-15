import React from 'react';
import { Wrench, ShieldCheck, Sparkles, Paintbrush, Zap, RefreshCw, ArrowRight } from 'lucide-react';

interface ServicesProps {
  setActiveTab: (tab: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ setActiveTab }) => {
  const servicesList = [
    {
      title: 'Bus Body Fabrication',
      desc: 'Complete turnkey body building for city transit, intercity luxury coaches, school buses, and staff shuttles on all major OEM chassis.',
      icon: Wrench,
      tag: 'Core Specialty'
    },
    {
      title: 'Chassis Extension & Modifications',
      desc: 'Wheelbase adjustments, rear overhang extensions, and structural reinforcement certified under OEM engineering guidelines.',
      icon: RefreshCw,
      tag: 'Engineering'
    },
    {
      title: 'Luxury Interior Fitting',
      desc: 'Executive recliners, sleeper berth layouts, ambient RGB ceiling lights, AC ducting, audio-visual entertainment systems.',
      icon: Sparkles,
      tag: 'Comfort'
    },
    {
      title: 'Automotive Painting & Fleet Livery',
      desc: '2K Polyurethane high-gloss clearcoat paints with custom company graphics, vinyl wraps, and anti-scratch clear coatings.',
      icon: Paintbrush,
      tag: 'Aesthetics'
    },
    {
      title: 'Safety Audit & AIS Certification',
      desc: 'AIS-052 code of practice compliance audits, emergency exit fitting, fire detection & suppression system installations.',
      icon: ShieldCheck,
      tag: 'Compliance'
    },
    {
      title: 'Fleet Refurbishment & Repair',
      desc: 'Complete overhaul of aging bus fleets, panel replacement, seat re-upholstery, and electrical harness rewiring.',
      icon: Zap,
      tag: 'Maintenance'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/50">
          Our Services
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Full-Spectrum Body Building Services</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          From concept design to final RTO registration handover, BODYCRAFT AUTOMOTIVE delivers end-to-end commercial vehicle solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesList.map((srv, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 text-rose-400">
                  <srv.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  {srv.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{srv.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{srv.desc}</p>
            </div>

            <button
              onClick={() => setActiveTab('configurator-wizard')}
              className="w-full mt-4 pt-3 border-t border-slate-800 text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center justify-between"
            >
              <span>Configure Requirements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
