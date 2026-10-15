import React from 'react';
import { useApp } from '../../store/AppContext';
import { formatCurrencyINR } from '../../utils/formatters';
import { DollarSign, CheckCircle2, Clock } from 'lucide-react';

export const PaymentManagement: React.FC = () => {
  const { projectsList } = useApp();

  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h1 className="text-2xl font-black text-white">Payment Milestones & Invoicing</h1>
        <p className="text-slate-400 text-xs mt-1">Track advance booking, structural completion, interior fitment, and final delivery payments.</p>
      </div>

      <div className="space-y-6">
        {projectsList.map((p) => (
          <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">{p.projectCode}</span>
                <h2 className="text-base font-bold text-white">{p.vehicleTitle}</h2>
                <p className="text-xs text-slate-400">{p.customerName}</p>
              </div>
              <span className="text-amber-400 font-mono font-bold text-lg">{formatCurrencyINR(p.contractAmountINR)}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
              {p.paymentMilestones.map((pm) => (
                <div key={pm.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-300">{pm.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] ${pm.status === 'Paid' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>
                      {pm.status}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white">{formatCurrencyINR(pm.amountINR)}</p>
                  <p className="text-[10px] text-slate-500">
                    {pm.status === 'Paid' ? `Settled on ${pm.paidDate || 'Verification'}` : `Share: ${pm.percentage}% of contract`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
