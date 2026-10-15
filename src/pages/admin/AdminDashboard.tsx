import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { formatCurrencyINR } from '../../utils/formatters';
import { 
  BarChart2, 
  Truck, 
  FileText, 
  Wrench, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  AlertCircle,
  Building2,
  MapPin,
  Sliders,
  Check,
  X
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

interface AdminDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setActiveTab }) => {
  const { workshopsList, verifyWorkshop, quotationsList, projectsList, quoteRequestsList } = useApp();

  const [activeAdminSubtab, setActiveAdminSubtab] = useState<'overview' | 'workshops' | 'pricing'>('overview');

  // Compute metrics from real state
  const totalGMV = quotationsList.filter(q => q.status === 'Accepted').reduce((acc, q) => acc + q.finalPriceINR, 0);
  const totalVerifiedCount = workshopsList.filter(w => w.verified).length;
  const verifiedPercentage = Math.round((totalVerifiedCount / workshopsList.length) * 100);

  // Recharts Data
  const statusChartData = [
    { name: 'Submitted', count: quoteRequestsList.filter(q => q.status === 'Submitted').length },
    { name: 'Quoted', count: quotationsList.filter(q => q.status === 'Quotation Sent').length },
    { name: 'Accepted', count: quotationsList.filter(q => q.status === 'Accepted').length },
    { name: 'In Build', count: projectsList.length },
  ];

  const districtClusterData = [
    { name: 'Karur', count: workshopsList.filter(w => w.district === 'Karur').length, color: '#B76E3C' },
    { name: 'Namakkal', count: workshopsList.filter(w => w.district === 'Namakkal').length, color: '#CF8754' },
    { name: 'Coimbatore', count: workshopsList.filter(w => w.district === 'Coimbatore').length, color: '#6E8878' },
    { name: 'Salem', count: workshopsList.filter(w => w.district === 'Salem').length, color: '#8EAB98' },
    { name: 'Chennai', count: workshopsList.filter(w => w.district === 'Chennai').length, color: '#38BDF8' },
    { name: 'Madurai', count: workshopsList.filter(w => w.district === 'Madurai').length, color: '#F59E0B' }
  ];

  return (
    <div className="space-y-6 text-[#F5F2EB]">
      {/* Top Banner */}
      <div className="bg-[#172638] border border-[#30363D] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E29765] font-bold mb-1">
            <ShieldCheck className="w-4 h-4 text-[#8EAB98]" />
            <span>STATE PLATFORM ADMINISTRATOR REGISTRY</span>
          </div>
          <h1 className="text-2xl font-black text-white">BODYCRAFT TN Governance Console</h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Oversight of Tamil Nadu coachbuilders, KYC verification compliance, pricing catalogs & ongoing factory builds.
          </p>
        </div>

        <div className="flex bg-[#0E1622] p-1 rounded-xl border border-[#30363D] text-xs">
          <button
            onClick={() => setActiveAdminSubtab('overview')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeAdminSubtab === 'overview' ? 'bg-[#B76E3C] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            System Metrics
          </button>
          <button
            onClick={() => setActiveAdminSubtab('workshops')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeAdminSubtab === 'workshops' ? 'bg-[#B76E3C] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Workshop KYC Onboarding ({workshopsList.length})
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#172638] border border-[#30363D] rounded-xl p-5 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Platform GMV (Accepted Orders)</span>
          <p className="text-2xl font-black text-white font-mono">{formatCurrencyINR(totalGMV)}</p>
          <span className="text-[10px] text-[#8EAB98] font-mono flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> +21.4% this quarter
          </span>
        </div>

        <div className="bg-[#172638] border border-[#30363D] rounded-xl p-5 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Verified Workshops</span>
          <p className="text-2xl font-black text-[#8EAB98] font-mono">{totalVerifiedCount} / {workshopsList.length}</p>
          <span className="text-[10px] text-slate-400 font-mono">
            {verifiedPercentage}% ARAI KYC compliant
          </span>
        </div>

        <div className="bg-[#172638] border border-[#30363D] rounded-xl p-5 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Live 15-Stage Builds</span>
          <p className="text-2xl font-black text-[#E29765] font-mono">{projectsList.length}</p>
          <span className="text-[10px] text-slate-400 font-mono">
            Across Karur & Namakkal bays
          </span>
        </div>

        <div className="bg-[#172638] border border-[#30363D] rounded-xl p-5 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Total Quotation Requests</span>
          <p className="text-2xl font-black text-sky-400 font-mono">{quoteRequestsList.length}</p>
          <span className="text-[10px] text-slate-400 font-mono">
            {quotationsList.length} formal bids submitted
          </span>
        </div>
      </div>

      {/* SUBTAB 1: SYSTEM OVERVIEW & CHARTS */}
      {activeAdminSubtab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart: Quotation Funnel */}
            <div className="bg-[#172638] border border-[#30363D] rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center">
                <BarChart2 className="w-4 h-4 mr-2 text-[#B76E3C]" />
                Customer RFQ to Manufacturing Conversion Funnel
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statusChartData}>
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0E1622', borderColor: '#30363D', color: '#F5F2EB', fontSize: '11px' }} 
                    />
                    <Bar dataKey="count" fill="#B76E3C" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Regional Clusters Breakdown */}
            <div className="bg-[#172638] border border-[#30363D] rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-[#E29765]" />
                Tamil Nadu Automotive Cluster Representation
              </h3>
              <div className="space-y-3 pt-2">
                {districtClusterData.map(dist => (
                  <div key={dist.name} className="flex justify-between items-center text-xs bg-[#0E1622] p-3 rounded-lg border border-[#30363D]">
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: dist.color }} />
                      <span className="font-bold text-white">{dist.name} District</span>
                    </div>
                    <span className="font-mono text-slate-300">
                      {dist.count} Verified Fabricator{dist.count > 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: WORKSHOP ONBOARDING & KYC VERIFICATION */}
      {activeAdminSubtab === 'workshops' && (
        <div className="bg-[#172638] border border-[#30363D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-[#30363D] pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center">
                <Building2 className="w-4 h-4 mr-2 text-[#B76E3C]" />
                Workshop Onboarding & ARAI / CMVR Verification
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Toggle workshop verification status. Verified badges immediately sync to the public marketplace.
              </p>
            </div>
          </div>

          <div className="divide-y divide-[#30363D]/60">
            {workshopsList.map(ws => (
              <div key={ws.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">{ws.name}</span>
                    <span className="text-[10px] bg-[#0E1622] text-[#E29765] font-mono px-2 py-0.5 rounded border border-[#30363D]">
                      {ws.district} Hub
                    </span>
                    {ws.verified ? (
                      <span className="text-[10px] bg-[#6E8878]/30 text-[#8EAB98] font-bold px-2 py-0.5 rounded border border-[#8EAB98]/40 flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                      </span>
                    ) : (
                      <span className="text-[10px] bg-amber-950/40 text-amber-400 font-bold px-2 py-0.5 rounded border border-amber-800/60">
                        Pending KYC
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-[11px]">{ws.address}</p>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Rating: {ws.rating}★ ({ws.reviewCount} reviews) • Lead: {ws.leadTimeWeeks}w • Warranty: {ws.warrantyMonths}m
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {ws.verified ? (
                    <button
                      onClick={() => verifyWorkshop(ws.id, 'rejected')}
                      className="bg-rose-950/30 hover:bg-rose-900/40 text-rose-300 border border-rose-800/40 px-3.5 py-1.5 rounded-lg text-xs font-semibold"
                    >
                      Revoke Verification
                    </button>
                  ) : (
                    <button
                      onClick={() => verifyWorkshop(ws.id, 'verified')}
                      className="bg-[#6E8878] hover:bg-[#5C7365] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow flex items-center space-x-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve ARAI KYC</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
