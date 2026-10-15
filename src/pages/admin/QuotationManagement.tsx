import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { formatCurrencyINR, formatDate } from '../../utils/formatters';
import { FileText, CheckCircle2, ShieldCheck, ArrowRight, DollarSign } from 'lucide-react';
import { Quotation } from '../../types';

export const QuotationManagement: React.FC = () => {
  const { quotationsList, updateQuotationStatus, convertQuotationToProject } = useApp();
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(quotationsList[0] || null);
  const [engineerNotes, setEngineerNotes] = useState('');
  const [discountPct, setDiscountPct] = useState(0);

  const handleUpdateStatus = (status: Quotation['status']) => {
    if (!selectedQuote) return;
    const discountedPrice = Math.round(selectedQuote.finalPriceINR * (1 - discountPct / 100));
    updateQuotationStatus(selectedQuote.id, status, discountedPrice, engineerNotes);
    alert(`Quotation status updated to: ${status}`);
  };

  const handleConvertToProject = () => {
    if (!selectedQuote) return;
    convertQuotationToProject(selectedQuote.id);
    alert(`Quotation converted to Active Production Project!`);
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h1 className="text-2xl font-black text-white">Quotation Request Queue Management</h1>
        <p className="text-slate-400 text-xs mt-1">Review incoming customer build requests, adjust structural quotes, assign discounts, and launch production orders.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Quotes List */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h2 className="text-sm font-bold text-white mb-2">Incoming Quotations ({quotationsList.length})</h2>
          <div className="space-y-2">
            {quotationsList.map((q) => (
              <div
                key={q.id}
                onClick={() => {
                  setSelectedQuote(q);
                  setEngineerNotes(q.workshopNotes || '');
                }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedQuote?.id === q.id
                    ? 'bg-rose-950/60 border-rose-500 text-white'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs font-bold text-cyan-400">{q.quoteNumber}</span>
                  <span className="text-[10px] font-mono bg-slate-800 text-amber-400 px-2 py-0.5 rounded">
                    {q.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mt-1">{q.configuration.title}</h3>
                <p className="text-slate-400 text-xs mt-0.5">{q.customerName} ({q.customerCompany || 'Customer'})</p>
                <div className="flex justify-between items-center text-xs font-mono mt-2 pt-2 border-t border-slate-900">
                  <span className="text-slate-500">{formatDate(q.createdAt)}</span>
                  <span className="text-amber-400 font-bold">{formatCurrencyINR(q.finalPriceINR)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Active Quote Action Workspace */}
        {selectedQuote && (
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-rose-400 font-bold">{selectedQuote.quoteNumber}</span>
                <h2 className="text-xl font-bold text-white mt-1">{selectedQuote.configuration.title}</h2>
                <p className="text-slate-400 text-xs">Customer: {selectedQuote.customerName} • {selectedQuote.customerPhone}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-mono block">Current Quoted Rate</span>
                <span className="text-lg font-bold text-amber-400 font-mono">{formatCurrencyINR(selectedQuote.finalPriceINR)}</span>
              </div>
            </div>

            {/* Engineer Notes Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Chief Engineering Review Notes:</label>
                <textarea
                  rows={3}
                  value={engineerNotes}
                  onChange={(e) => setEngineerNotes(e.target.value)}
                  placeholder="Enter structural feedback, approved chassis specs, delivery week estimates..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-center space-x-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Special Fleet Discount (%):</span>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={discountPct}
                  onChange={(e) => setDiscountPct(Number(e.target.value))}
                  className="w-20 bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-white outline-none text-center"
                />
                <span className="text-emerald-400">
                  New Price: {formatCurrencyINR(Math.round(selectedQuote.finalPriceINR * (1 - discountPct / 100)))}
                </span>
              </div>

              {/* Status Actions */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <button
                  onClick={() => handleUpdateStatus('Under Review')}
                  className="bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-800 py-2.5 rounded-xl text-xs font-semibold"
                >
                  Mark In Review
                </button>
                <button
                  onClick={() => handleUpdateStatus('Quotation Sent')}
                  className="bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 py-2.5 rounded-xl text-xs font-semibold"
                >
                  Send Quotation
                </button>
                <button
                  onClick={handleConvertToProject}
                  className="bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold py-2.5 rounded-xl text-xs col-span-2 sm:col-span-1 flex items-center justify-center space-x-1"
                >
                  <span>Launch Production</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
