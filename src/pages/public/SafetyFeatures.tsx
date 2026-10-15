import React from 'react';
import { ShieldCheck, Flame, AlertTriangle, Eye, Video, Compass, Award } from 'lucide-react';

export const SafetyFeatures: React.FC = () => {
  const features = [
    { title: 'AIS-052 Rollover Structure Code', desc: 'Tubular rollover cage designed to maintain vital passenger survival space in compliance with ARAI AIS-052 standards.', icon: Award },
    { title: 'Automatic Fire Detection & Suppression', desc: 'Engine bay sensor tube automatically deploys clean agent fire suppressant within 3 seconds of thermal trigger.', icon: Flame },
    { title: 'Emergency Exit Hatch & Rear Doors', desc: 'Pneumatic emergency dump valves, roof emergency exit escape hatches, and breakable safety hammers at all rows.', icon: AlertTriangle },
    { title: 'CCTV Surveillance & Remote Monitoring', desc: '4 to 8 channel IP67 waterproof cameras connected to 4G DVR with live cloud viewing for fleet operator control.', icon: Video },
    { title: 'GPS Tracking & Speed Limiter', desc: 'Mandatory electronic speed governor calibrated to 80 km/h (or 50 km/h for school buses) and real-time telemetry.', icon: Compass },
    { title: 'Anti-Skid Flooring & Emergency Lighting', desc: '3mm fire-retardant anti-slip floor sheeting with illuminated floor aisle strip guides for low-light evacuation.', icon: Eye }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-100">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-rose-500 font-semibold bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/50">
          Passenger Protection First
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">AIS-052 & AIS-153 Safety Compliance</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Every bus body engineered at BODYCRAFT AUTOMOTIVE undergoes structural rollover analysis and is equipped with certified emergency egress systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3 hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 text-rose-400">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
