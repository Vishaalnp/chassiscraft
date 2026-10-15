import React from 'react';
import { 
  ArrowRightLeft, 
  Trash2, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  X,
  Truck
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { formatCurrencyINR } from '../../utils/formatters';

interface CompareWorkshopsProps {
  setActiveTab: (tab: string) => void;
}

export const CompareWorkshops: React.FC<CompareWorkshopsProps> = ({ setActiveTab }) => {
  const { workshopsList, comparisonWorkshopIds, toggleCompareWorkshop, clearComparison } = useApp();

  const selectedWorkshops = workshopsList.filter(ws => comparisonWorkshopIds.includes(ws.id));

  return (
    <div className="min-h-screen bg-[#0E1622] text-[#F5F2EB] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#30363D] pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#E29765] uppercase tracking-wider mb-1">
              <ArrowRightLeft className="w-4 h-4 text-[#B76E3C]" />
              <span>Multi-Workshop Analysis Matrix</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Compare Workshops</h1>
            <p className="text-slate-400 text-xs mt-1">
              Side-by-side evaluation of Tamil Nadu coachbuilders and lorry fabricators (up to 3 simultaneous builders).
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('find-workshops')}
              className="text-xs bg-[#172638] hover:bg-[#1E324A] text-slate-300 hover:text-white px-3.5 py-2 rounded-lg border border-[#30363D] transition-all"
            >
              + Add More Workshops
            </button>
            {selectedWorkshops.length > 0 && (
              <button
                onClick={clearComparison}
                className="text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 px-3 py-2 rounded-lg border border-rose-900/50 flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* If no workshops selected */}
        {selectedWorkshops.length === 0 ? (
          <div className="bg-[#172638] rounded-2xl p-12 text-center border border-[#30363D] space-y-4 max-w-xl mx-auto">
            <ArrowRightLeft className="w-12 h-12 text-[#B76E3C] mx-auto opacity-70" />
            <h3 className="text-lg font-bold text-white">No workshops selected for comparison</h3>
            <p className="text-xs text-slate-400">
              Browse our verified Tamil Nadu coachbuilders and lorry body builders directory and click "Compare" on any workshop card to compare ratings, warranties, and turnaround times.
            </p>
            <button
              onClick={() => setActiveTab('find-workshops')}
              className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow"
            >
              Go to Find Workshops
            </button>
          </div>
        ) : (
          /* Comparison Table */
          <div className="bg-[#172638] rounded-xl border border-[#30363D] overflow-x-auto shadow-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#30363D] bg-[#0E1622]/80">
                  <th className="p-4 w-1/4 font-mono uppercase text-slate-400 text-[11px]">Feature / Attribute</th>
                  {selectedWorkshops.map(ws => (
                    <th key={ws.id} className="p-4 w-1/4 align-top">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <span className="font-bold text-white text-sm block">{ws.name}</span>
                          <span className="text-[10px] text-[#E29765] font-mono flex items-center">
                            <MapPin className="w-3 h-3 mr-1" /> {ws.district} Hub
                          </span>
                        </div>
                        <button
                          onClick={() => toggleCompareWorkshop(ws.id)}
                          className="text-slate-400 hover:text-rose-400 p-1"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                  {Array.from({ length: 3 - selectedWorkshops.length }).map((_, i) => (
                    <th key={i} className="p-4 w-1/4 bg-[#0E1622]/40 text-center text-slate-600 font-mono text-[11px] align-middle">
                      <button
                        onClick={() => setActiveTab('find-workshops')}
                        className="hover:text-[#E29765] border border-dashed border-[#30363D] p-4 rounded-lg w-full block transition-colors"
                      >
                        + Select Workshop
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#30363D]/60 text-slate-300">
                {/* Verification & Rating */}
                <tr>
                  <td className="p-4 font-semibold text-slate-400 bg-[#0E1622]/40">Rating & Status</td>
                  {selectedWorkshops.map(ws => (
                    <td key={ws.id} className="p-4">
                      <div className="flex items-center space-x-1.5 mb-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-white text-sm">{ws.rating} / 5.0</span>
                        <span className="text-slate-400 text-[10px]">({ws.reviewCount} verified reviews)</span>
                      </div>
                      {ws.verified ? (
                        <span className="inline-flex items-center text-[10px] text-[#8EAB98] font-bold bg-[#6E8878]/15 px-2 py-0.5 rounded border border-[#8EAB98]/30">
                          <ShieldCheck className="w-3 h-3 mr-1" /> ARAI KYC Verified
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500">Standard Onboarded</span>
                      )}
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedWorkshops.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-[#0E1622]/20" />
                  ))}
                </tr>

                {/* Vehicle Domain */}
                <tr>
                  <td className="p-4 font-semibold text-slate-400 bg-[#0E1622]/40">Vehicle Specialization</td>
                  {selectedWorkshops.map(ws => (
                    <td key={ws.id} className="p-4">
                      <span className="bg-[#B76E3C] text-white font-bold text-[10px] px-2 py-0.5 rounded mb-2 inline-block">
                        {ws.vehicleDomain === 'Both' ? 'Bus & Lorry Bodies' : `${ws.vehicleDomain} Specialist`}
                      </span>
                      <div className="space-y-1">
                        {ws.specializations.map((spec, i) => (
                          <div key={i} className="text-[11px] text-slate-300 flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E29765] mr-1.5" />
                            {spec}
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedWorkshops.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-[#0E1622]/20" />
                  ))}
                </tr>

                {/* Indicative Price Range */}
                <tr>
                  <td className="p-4 font-semibold text-slate-400 bg-[#0E1622]/40">Indicative Price Range</td>
                  {selectedWorkshops.map(ws => (
                    <td key={ws.id} className="p-4">
                      <div className="text-sm font-bold text-white">
                        {formatCurrencyINR(ws.indicativePriceRange.minINR)} - {formatCurrencyINR(ws.indicativePriceRange.maxINR)}
                      </div>
                      <span className="text-[10px] text-slate-500">Subject to chassis & specifications</span>
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedWorkshops.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-[#0E1622]/20" />
                  ))}
                </tr>

                {/* Turnaround Lead Time */}
                <tr>
                  <td className="p-4 font-semibold text-slate-400 bg-[#0E1622]/40">Turnaround Lead Time</td>
                  {selectedWorkshops.map(ws => (
                    <td key={ws.id} className="p-4">
                      <div className="flex items-center space-x-1.5 text-white font-bold">
                        <Clock className="w-3.5 h-3.5 text-[#E29765]" />
                        <span>{ws.leadTimeWeeks} Weeks</span>
                      </div>
                      <span className="text-[10px] text-slate-400">From chassis inward inspection</span>
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedWorkshops.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-[#0E1622]/20" />
                  ))}
                </tr>

                {/* Warranty Terms */}
                <tr>
                  <td className="p-4 font-semibold text-slate-400 bg-[#0E1622]/40">Structural Warranty</td>
                  {selectedWorkshops.map(ws => (
                    <td key={ws.id} className="p-4">
                      <div className="flex items-center space-x-1.5 text-[#8EAB98] font-bold">
                        <Award className="w-3.5 h-3.5 text-[#8EAB98]" />
                        <span>{ws.warrantyMonths} Months Warranty</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Covers roll cage and frame welding</span>
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedWorkshops.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-[#0E1622]/20" />
                  ))}
                </tr>

                {/* Approvals & Standards */}
                <tr>
                  <td className="p-4 font-semibold text-slate-400 bg-[#0E1622]/40">Government Certifications</td>
                  {selectedWorkshops.map(ws => (
                    <td key={ws.id} className="p-4">
                      <div className="space-y-1">
                        {ws.certifications.map((c, i) => (
                          <div key={i} className="text-[11px] text-[#8EAB98] flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1.5 shrink-0" />
                            {c}
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedWorkshops.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-[#0E1622]/20" />
                  ))}
                </tr>

                {/* Yard Address */}
                <tr>
                  <td className="p-4 font-semibold text-slate-400 bg-[#0E1622]/40">Location & Hub</td>
                  {selectedWorkshops.map(ws => (
                    <td key={ws.id} className="p-4">
                      <div className="text-white font-medium">{ws.town}, {ws.district}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{ws.address}</div>
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedWorkshops.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-[#0E1622]/20" />
                  ))}
                </tr>

                {/* Action CTA */}
                <tr className="bg-[#0E1622]/80">
                  <td className="p-4 font-bold text-white">Action</td>
                  {selectedWorkshops.map(ws => (
                    <td key={ws.id} className="p-4">
                      <button
                        onClick={() => setActiveTab('budget-planner')}
                        className="w-full bg-[#B76E3C] hover:bg-[#CF8754] text-white py-2 px-3 rounded-lg font-bold text-xs shadow flex items-center justify-center space-x-1.5 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Request Quote</span>
                      </button>
                    </td>
                  ))}
                  {Array.from({ length: 3 - selectedWorkshops.length }).map((_, i) => (
                    <td key={i} className="p-4 bg-[#0E1622]/20" />
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
