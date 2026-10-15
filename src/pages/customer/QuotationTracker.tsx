import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { formatCurrencyINR, formatDate } from '../../utils/formatters';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Download, 
  MessageSquare, 
  XCircle, 
  AlertCircle, 
  Building2, 
  ArrowRight,
  Printer,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Quotation } from '../../types';

interface QuotationTrackerProps {
  setActiveTab?: (tab: string) => void;
}

export const QuotationTracker: React.FC<QuotationTrackerProps> = ({ setActiveTab }) => {
  const { quotationsList, acceptQuotation, rejectQuotation, requestQuotationRevision } = useApp();
  const [selectedQuoteForRevision, setSelectedQuoteForRevision] = useState<Quotation | null>(null);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [activeTabFilter, setActiveTabFilter] = useState<'All' | 'Quotation Sent' | 'Accepted' | 'Under Review'>('All');

  const filteredQuotes = quotationsList.filter(q => {
    if (activeTabFilter === 'All') return true;
    return q.status === activeTabFilter;
  });

  const handleAccept = (quoteId: string) => {
    if (confirm('Accept this quotation? This will confirm your vehicle manufacturing order and initialize the live 15-stage production tracking.')) {
      acceptQuotation(quoteId);
      if (setActiveTab) {
        setActiveTab('project-tracking');
      }
    }
  };

  const handleReject = (quoteId: string) => {
    const reason = prompt('Please provide a reason for rejecting this quotation (e.g., budget exceeded, preferred another workshop):');
    if (reason !== null) {
      rejectQuotation(quoteId, reason);
    }
  };

  const handleSendRevision = () => {
    if (!selectedQuoteForRevision || !revisionNotes.trim()) return;
    requestQuotationRevision(selectedQuoteForRevision.id, revisionNotes);
    setSelectedQuoteForRevision(null);
    setRevisionNotes('');
    alert('Modification request sent to the workshop.');
  };

  return (
    <div className="space-y-6 text-[#F5F2EB]">
      {/* Header */}
      <div className="bg-[#172638] border border-[#30363D] p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E29765] uppercase">
            <FileText className="w-3.5 h-3.5 text-[#B76E3C]" />
            <span>Customer Quotation Portal</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Vehicle Quotations & Proposals</h1>
          <p className="text-slate-400 text-xs mt-1">
            Compare received workshop quotes, review itemized pricing, request specification revisions, and accept confirmed builds.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-1.5 bg-[#0E1622] p-1 rounded-lg border border-[#30363D] text-xs">
          {(['All', 'Quotation Sent', 'Accepted', 'Under Review'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTabFilter(tab)}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeTabFilter === tab
                  ? 'bg-[#B76E3C] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Quotation Cards */}
      <div className="space-y-6">
        {filteredQuotes.map((quote) => (
          <div key={quote.id} className="bg-[#172638] border border-[#30363D] hover:border-[#B76E3C]/50 transition-all rounded-2xl p-6 space-y-6 shadow-xl">
            {/* Header info */}
            <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-[#30363D]">
              <div>
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-sm font-bold text-[#E29765]">{quote.quoteNumber}</span>
                  <span className={`text-xs font-mono px-3 py-1 rounded-full border ${
                    quote.status === 'Accepted' ? 'bg-[#6E8878]/30 text-[#8EAB98] border-[#8EAB98] font-bold' :
                    quote.status === 'Quotation Sent' ? 'bg-[#B76E3C]/20 text-[#E29765] border-[#B76E3C] font-bold' :
                    quote.status === 'Revision Requested' ? 'bg-amber-950/50 text-amber-400 border-amber-800' :
                    'bg-[#0E1622] text-slate-400 border-[#30363D]'
                  }`}>
                    ● {quote.status}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1.5">{quote.configuration.title}</h2>
                <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                  <span className="flex items-center text-white font-medium">
                    <Building2 className="w-3.5 h-3.5 mr-1 text-[#B76E3C]" />
                    {quote.workshopName} ({quote.workshopDistrict})
                  </span>
                  <span>•</span>
                  <span>Issued: {formatDate(quote.createdAt)}</span>
                  <span>•</span>
                  <span>Valid for: {quote.validityDays} Days</span>
                </div>
              </div>

              {/* Price card */}
              <div className="text-left sm:text-right bg-[#0E1622] px-5 py-3 rounded-xl border border-[#30363D]">
                <span className="text-[11px] text-slate-400 font-mono block">Agreed Final Amount (incl. 18% GST)</span>
                <span className="text-2xl font-black text-[#E29765] font-mono">{formatCurrencyINR(quote.finalPriceINR)}</span>
                {quote.discountINR > 0 && (
                  <span className="text-[10px] text-[#8EAB98] block mt-0.5">Includes ₹{quote.discountINR.toLocaleString('en-IN')} promotional discount</span>
                )}
              </div>
            </div>

            {/* Itemized Pricing Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-[#0E1622] p-4 rounded-xl border border-[#30363D] text-xs font-mono">
              <div>
                <span className="text-slate-500 block">Base Fabrication</span>
                <span className="text-white font-semibold">{formatCurrencyINR(quote.baseBodyPriceINR)}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Materials</span>
                <span className="text-white font-semibold">{formatCurrencyINR(quote.materialsPriceINR)}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Interior / Seats</span>
                <span className="text-white font-semibold">{formatCurrencyINR(quote.interiorSeatsPriceINR)}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Paint & Electrical</span>
                <span className="text-white font-semibold">{formatCurrencyINR(quote.electricalPaintPriceINR)}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Labour & GST (18%)</span>
                <span className="text-white font-semibold">{formatCurrencyINR(quote.labourPriceINR + quote.taxGST18INR)}</span>
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2">
                <span className="text-[11px] font-mono uppercase text-[#8EAB98] font-bold block">Scope Inclusions:</span>
                <div className="space-y-1">
                  {quote.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-[#8EAB98] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2">
                <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">Scope Exclusions:</span>
                <div className="space-y-1">
                  {quote.exclusions.map((exc, i) => (
                    <div key={i} className="flex items-start text-slate-400">
                      <span className="text-rose-400 mr-2 shrink-0">✕</span>
                      <span>{exc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Workshop Engineer Notes */}
            {quote.workshopNotes && (
              <div className="bg-[#0E1622] p-3.5 rounded-xl border border-[#30363D] text-xs flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-[#E29765] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Workshop Engineer Remarks:</span>
                  <p className="text-slate-300 mt-0.5">{quote.workshopNotes}</p>
                </div>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-[#E29765]" />
                <span>Estimated Completion: <strong>{quote.estimatedDeliveryWeeks} Weeks</strong> ({quote.warrantyMonths}m Warranty)</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => window.print()}
                  className="bg-[#0E1622] hover:bg-[#1E324A] text-slate-300 text-xs px-3.5 py-2 rounded-lg border border-[#30363D] flex items-center space-x-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>

                {quote.status === 'Quotation Sent' && (
                  <>
                    <button
                      onClick={() => setSelectedQuoteForRevision(quote)}
                      className="bg-[#0E1622] hover:bg-[#1E324A] text-[#E29765] text-xs px-3.5 py-2 rounded-lg border border-[#B76E3C]/40 flex items-center space-x-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Request Revision</span>
                    </button>
                    <button
                      onClick={() => handleReject(quote.id)}
                      className="bg-rose-950/30 hover:bg-rose-900/40 text-rose-400 text-xs px-3.5 py-2 rounded-lg border border-rose-800/40"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleAccept(quote.id)}
                      className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-5 py-2 rounded-lg shadow flex items-center space-x-1.5 transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Accept & Start Production</span>
                    </button>
                  </>
                )}

                {quote.status === 'Accepted' && (
                  <button
                    onClick={() => setActiveTab && setActiveTab('project-tracking')}
                    className="bg-[#6E8878] hover:bg-[#5C7365] text-white text-xs font-bold px-4 py-2 rounded-lg shadow flex items-center space-x-1"
                  >
                    <span>View Active Production Tracking →</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredQuotes.length === 0 && (
          <div className="bg-[#172638] rounded-xl p-12 text-center border border-[#30363D] space-y-3">
            <FileText className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No quotations found in this filter</h3>
            <p className="text-xs text-slate-400">Use the Budget Planner to configure your bus or lorry and request quotes from Tamil Nadu workshops.</p>
          </div>
        )}
      </div>

      {/* Revision Modal */}
      {selectedQuoteForRevision && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#172638] border border-[#30363D] rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#E29765] font-bold">Quotation Modification</span>
              <h3 className="text-lg font-bold text-white mt-1">Request Changes for {selectedQuoteForRevision.quoteNumber}</h3>
              <p className="text-xs text-slate-400 mt-1">Specify changes to seating, materials, paint scheme, or delivery schedule for {selectedQuoteForRevision.workshopName}.</p>
            </div>

            <textarea
              rows={4}
              value={revisionNotes}
              onChange={(e) => setRevisionNotes(e.target.value)}
              placeholder="E.g., Please change the seating from pushback to semi-deluxe to reduce total cost by ₹1.2 Lakhs. Also confirm if delivery can be expedited by 1 week."
              className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#B76E3C]"
            />

            <div className="flex justify-end items-center space-x-3 pt-2">
              <button
                onClick={() => setSelectedQuoteForRevision(null)}
                className="text-xs text-slate-400 hover:text-white px-3 py-1.5"
              >
                Cancel
              </button>
              <button
                onClick={handleSendRevision}
                className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-4 py-2 rounded-lg shadow"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
