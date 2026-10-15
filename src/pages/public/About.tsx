import React from 'react';
import { Award, ShieldCheck, Factory, Users, Wrench, CheckCircle } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-slate-200">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-rose-500 font-semibold bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/50">
          About BODYCRAFT AUTOMOTIVE
        </span>
        <h1 className="text-4xl font-black text-white">Engineering Every Journey</h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Founded in 2008, BODYCRAFT AUTOMOTIVE has grown from a specialized coachbuilder into one of South Asia's leading technology-driven commercial vehicle body manufacturing facilities.
        </p>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
        <div>
          <span className="text-3xl font-black font-mono text-rose-500">18+</span>
          <p className="text-xs text-slate-400 mt-1">Years of Manufacturing</p>
        </div>
        <div>
          <span className="text-3xl font-black font-mono text-cyan-400">1,200+</span>
          <p className="text-xs text-slate-400 mt-1">Vehicles Delivered</p>
        </div>
        <div>
          <span className="text-3xl font-black font-mono text-amber-400">120,000 sq ft</span>
          <p className="text-xs text-slate-400 mt-1">Factory Plant Area</p>
        </div>
        <div>
          <span className="text-3xl font-black font-mono text-emerald-400">AIS-052</span>
          <p className="text-xs text-slate-400 mt-1">Safety Certification</p>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">State-of-the-Art Coach Factory</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Our modern manufacturing facility features dedicated bays for structural steel framing, composite paneing, dust-free automotive paint baking, and high-capacity electrical fitting lines.
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            {['Robotic CNC tube bending & laser sheet cutting', 'Acoustic thermal insulation fitting bays', 'Automotive grade 2K polyurethane paint spray booths', 'Rollover cage strength calculation & shower leak test chamber'].map((item, idx) => (
              <li key={idx} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 p-2">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
            alt="Manufacturing Facility"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
