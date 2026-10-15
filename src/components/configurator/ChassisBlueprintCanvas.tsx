import React from 'react';
import { ChassisSpec } from '../../types';
import { validateChassisDimensions } from '../../utils/calculators';
import { AlertTriangle, CheckCircle, ShieldCheck, Ruler } from 'lucide-react';

interface ChassisBlueprintCanvasProps {
  chassis: ChassisSpec | null;
  lengthMm: number;
  widthMm: number;
  heightMm: number;
  onLengthChange: (length: number) => void;
  onWidthChange: (width: number) => void;
}

export const ChassisBlueprintCanvas: React.FC<ChassisBlueprintCanvasProps> = ({
  chassis,
  lengthMm,
  widthMm,
  heightMm,
  onLengthChange,
  onWidthChange
}) => {
  const wheelbase = chassis?.wheelbaseMm || 5900;
  const frontOverhang = chassis?.frontOverhangMm || 2100;
  const rearOverhang = Math.max(800, lengthMm - wheelbase - frontOverhang);

  const validation = validateChassisDimensions(wheelbase, lengthMm, frontOverhang, rearOverhang);

  return (
    <div className="space-y-6">
      {/* Interactive Controls */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-white flex items-center">
            <Ruler className="w-5 h-5 text-rose-500 mr-2" /> Adjust Body Dimensions
          </h3>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
            Wheelbase Fixed: {wheelbase} mm
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
              <span>Overall Body Length:</span>
              <strong className="text-rose-400 text-sm">{(lengthMm / 1000).toFixed(2)} m ({lengthMm} mm)</strong>
            </div>
            <input
              type="range"
              min={7000}
              max={chassis?.maxRecommendedBodyLengthMm || 13800}
              step={100}
              value={lengthMm}
              onChange={(e) => onLengthChange(Number(e.target.value))}
              className="w-full accent-rose-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>7.0 M</span>
              <span>Max: {((chassis?.maxRecommendedBodyLengthMm || 12000) / 1000).toFixed(1)} M</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-2">
              <span>Overall Body Width:</span>
              <strong className="text-amber-400 text-sm">{(widthMm / 1000).toFixed(2)} m ({widthMm} mm)</strong>
            </div>
            <input
              type="range"
              min={2200}
              max={2600}
              step={50}
              value={widthMm}
              onChange={(e) => onWidthChange(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>2.20 M Standard</span>
              <span>2.60 M AIS Limit</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2D Interactive Blueprint SVG Canvas */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden bg-blueprint">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping mr-2" />
            2D CAD Engineering Blueprint View
          </span>
          <span className="text-[11px] font-mono text-slate-400">Scale: 1:50 Blueprint rendering</span>
        </div>

        {/* Blueprint SVG Representation */}
        <div className="w-full overflow-x-auto py-6">
          <svg viewBox="0 0 1000 320" className="w-full max-w-4xl mx-auto drop-shadow-xl">
            {/* Background Grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1000" height="320" fill="url(#grid)" />

            {/* Ground Line */}
            <line x1="50" y1="260" x2="950" y2="260" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />

            {/* Bus Outer Body Outline */}
            <rect
              x="100"
              y="60"
              width="800"
              height="160"
              rx="16"
              fill="rgba(15, 23, 42, 0.7)"
              stroke={validation.isValid ? "#38BDF8" : "#EF4444"}
              strokeWidth="2.5"
            />

            {/* Windshield & Windows */}
            <path d="M 110 75 Q 150 75 160 120 L 110 120 Z" fill="rgba(56, 189, 248, 0.2)" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="180" y="75" width="100" height="45" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="#38BDF8" strokeWidth="1" />
            <rect x="290" y="75" width="100" height="45" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="#38BDF8" strokeWidth="1" />
            <rect x="400" y="75" width="100" height="45" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="#38BDF8" strokeWidth="1" />
            <rect x="510" y="75" width="100" height="45" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="#38BDF8" strokeWidth="1" />
            <rect x="620" y="75" width="100" height="45" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="#38BDF8" strokeWidth="1" />
            <rect x="730" y="75" width="100" height="45" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="#38BDF8" strokeWidth="1" />

            {/* Wheel Arch & Wheels */}
            {/* Front Wheel */}
            <circle cx="250" cy="220" r="32" fill="#0B0F17" stroke="#64748B" strokeWidth="4" />
            <circle cx="250" cy="220" r="14" fill="#334155" />
            
            {/* Rear Wheels (Dual Axle representation) */}
            <circle cx="680" cy="220" r="32" fill="#0B0F17" stroke="#64748B" strokeWidth="4" />
            <circle cx="680" cy="220" r="14" fill="#334155" />

            {/* Dimension Lines & Labels */}
            {/* Overall Length Dimension */}
            <line x1="100" y1="35" x2="900" y2="35" stroke="#E11D48" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="500" y="28" fill="#F43F5E" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              Total Length: {lengthMm} mm ({(lengthMm / 1000).toFixed(2)} M)
            </text>

            {/* Wheelbase Dimension */}
            <line x1="250" y1="280" x2="680" y2="280" stroke="#F59E0B" strokeWidth="1.5" />
            <text x="465" y="298" fill="#F59E0B" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              Wheelbase: {wheelbase} mm
            </text>

            {/* Front Overhang */}
            <line x1="100" y1="280" x2="250" y2="280" stroke="#38BDF8" strokeWidth="1.5" />
            <text x="175" y="298" fill="#38BDF8" fontSize="10" fontFamily="monospace" textAnchor="middle">
              F.OH: {frontOverhang}mm
            </text>

            {/* Rear Overhang */}
            <line x1="680" y1="280" x2="900" y2="280" stroke={validation.isValid ? "#10B981" : "#EF4444"} strokeWidth="1.5" />
            <text x="790" y="298" fill={validation.isValid ? "#10B981" : "#EF4444"} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              R.OH: {rearOverhang}mm ({validation.rearOverhangPercentage}%)
            </text>
          </svg>
        </div>

        {/* Dynamic AIS Validation Warning Box */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          {!validation.isValid ? (
            <div className="bg-rose-950/60 border border-rose-800 p-4 rounded-xl flex items-start space-x-3 text-xs text-rose-300">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-rose-400 font-mono uppercase">Engineering Warning (AIS-052 Code):</span>
                {validation.warnings.map((w, i) => (
                  <p key={i}>{w}</p>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-emerald-950/40 border border-emerald-800/80 p-3.5 rounded-xl flex items-center space-x-3 text-xs text-emerald-300 font-mono">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Dimension specs fully validated under AIS-052 code of practice. Rear overhang ratio ({validation.rearOverhangPercentage}%) is within safe engineering limits.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
