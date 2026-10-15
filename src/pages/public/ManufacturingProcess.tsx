import React from 'react';
import { CheckCircle, ShieldCheck, Wrench, Cpu, Paintbrush, Layers, ArrowRight } from 'lucide-react';

export const ManufacturingProcess: React.FC = () => {
  const steps = [
    { stage: 'Stage 1', title: 'Chassis Reception & Inspection', desc: 'OEM chassis frame dimensional inspection, wheel alignment verification, and anti-vibration rubber damper pad mounting.' },
    { stage: 'Stage 2', title: 'Structural Steel Framing & Rollover Cage', desc: 'Welding of high-tensile tubular steel rollover frame (IS 4923 grade) following CAD stress calculations for AIS-052 compliance.' },
    { stage: 'Stage 3', title: 'Sheet Metal & FRP Paneling', desc: 'Stretching and riveted mounting of galvanized steel side panels and molded FRP fiberglass aerodynamic front/rear masks.' },
    { stage: 'Stage 4', title: 'Anti-Corrosion Primer & Paint Shop', desc: '7-tank anti-rust surface treatment followed by epoxy primer and dual-layer polyurethane 2K clearcoat paint baking in sealed booth.' },
    { stage: 'Stage 5', title: 'Flooring, Acoustic & Thermal Insulation', desc: 'Closed-cell NBR nitrile foam insulation lining inside ceiling and side walls; heavy-duty anti-skid vinyl floor hot-welding.' },
    { stage: 'Stage 6', title: 'Interior Fitment & Recliner Seating', desc: 'Installation of plush push-back seats, luggage racks, AC ducts, individual reading lights, and audio-visual displays.' },
    { stage: 'Stage 7', title: 'Electrical Harness & HVAC Integration', desc: 'Wiring of IP67 waterproof harness, 24kW sub-engine roof AC unit, CCTV cameras, reverse sensor system, and LED lightbars.' },
    { stage: 'Stage 8', title: 'Quality Assurance, Leak Test & Certification', desc: '30-minute high-pressure shower leak test, electrical insulation test, tilt stability audit, and final RTO AIS-052 certification.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-slate-100">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/50">
          Factory Precision
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">8-Stage Manufacturing Workflow</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          How every vehicle transitions from raw steel tubes and OEM chassis into a certified luxury coach or commercial hauler.
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((s, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-700 transition-all">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 font-mono text-rose-400 font-bold text-sm flex items-center justify-center shrink-0">
                0{idx + 1}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">{s.stage}</span>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">{s.desc}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-mono bg-emerald-950/50 border border-emerald-800/60 px-3 py-1.5 rounded-lg shrink-0">
              <CheckCircle className="w-4 h-4" />
              <span>Quality Audited</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
