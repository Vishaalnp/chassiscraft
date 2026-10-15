import React, { useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import { useApp } from '../../store/AppContext';
import { 
  Truck, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  ChevronRight, 
  PlusCircle, 
  ArrowRight,
  Building2,
  Star,
  Layers,
  MapPin,
  Bookmark,
  MessageSquarePlus,
  Compass
} from 'lucide-react';
import { formatCurrencyINR, formatDate } from '../../utils/formatters';

interface CustomerDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ setActiveTab }) => {
  const { user } = useAuth();
  const { quotationsList, projectsList, savedDesigns, addReview, workshopsList } = useApp();

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewWorkshopId, setReviewWorkshopId] = useState(workshopsList[0]?.id || '');
  const [overallRating, setOverallRating] = useState(5);
  const [workmanshipRating, setWorkmanshipRating] = useState(5);
  const [commRating, setCommRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const activeProject = projectsList[0];
  const pendingQuotesCount = quotationsList.filter(q => q.status === 'Quotation Sent').length;
  const acceptedQuotesCount = quotationsList.filter(q => q.status === 'Accepted').length;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    addReview({
      workshopId: reviewWorkshopId,
      customerId: user?.id || 'cust-01',
      customerName: user?.name || 'M. Selvakumar',
      customerCompany: user?.company || 'Vetri Travels',
      overallRating,
      workmanshipRating,
      communicationRating: commRating,
      deliveryRating,
      comment: reviewComment,
      vehicleType: 'Sleeper Coach (2+1)',
      projectCode: activeProject?.projectCode || 'BC-TN-2026-08',
      verifiedBuild: true
    });

    setShowReviewModal(false);
    setReviewComment('');
    alert('Thank you! Your verified workshop review has been submitted.');
  };

  return (
    <div className="space-y-8 text-[#F5F2EB]">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-[#172638] via-[#1A2D42] to-[#251A14] border border-[#30363D] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-[#E29765] font-mono text-xs mb-1 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#8EAB98] animate-ping" />
            <span>OPERATOR FLEET PORTAL • TAMIL NADU</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome, {user?.name || 'Customer'}
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            {user?.company ? `${user.company} • ${user?.district || 'Madurai'} Fleet Operations` : 'Commercial Bus & Lorry Workspace'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowReviewModal(true)}
            className="bg-[#172638] hover:bg-[#1E324A] text-slate-300 text-xs font-semibold px-4 py-2.5 rounded-xl border border-[#30363D] flex items-center space-x-1.5"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Write Workshop Review</span>
          </button>
          <button
            onClick={() => setActiveTab('budget-planner')}
            className="bg-gradient-to-r from-[#B76E3C] to-[#8E4C1E] hover:from-[#CF8754] hover:to-[#B76E3C] text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Plan New Build</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#172638] border border-[#30363D] rounded-xl p-4 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Active Builds</span>
          <p className="text-2xl font-black text-[#E29765] font-mono">{projectsList.length}</p>
          <span className="text-[10px] text-slate-500">Live 15-stage fabrication</span>
        </div>
        <div className="bg-[#172638] border border-[#30363D] rounded-xl p-4 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Quotations Received</span>
          <p className="text-2xl font-black text-sky-400 font-mono">{pendingQuotesCount}</p>
          <span className="text-[10px] text-slate-500">Awaiting your approval</span>
        </div>
        <div className="bg-[#172638] border border-[#30363D] rounded-xl p-4 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Confirmed Orders</span>
          <p className="text-2xl font-black text-[#8EAB98] font-mono">{acceptedQuotesCount}</p>
          <span className="text-[10px] text-slate-500">In production queue</span>
        </div>
        <div className="bg-[#172638] border border-[#30363D] rounded-xl p-4 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Saved Plans</span>
          <p className="text-2xl font-black text-amber-400 font-mono">{savedDesigns.length}</p>
          <span className="text-[10px] text-slate-500">Draft vehicle specs</span>
        </div>
      </div>

      {/* Active Manufacturing Progress Spotlight */}
      {activeProject && (
        <div className="bg-[#172638] border border-[#30363D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#30363D] pb-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-[#E29765]">
                <Wrench className="w-3.5 h-3.5 text-[#B76E3C]" />
                <span>ACTIVE FACTORY BUILD • {activeProject.projectCode}</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">{activeProject.vehicleTitle}</h2>
              <span className="text-xs text-slate-400">
                Yard: {activeProject.workshopName} • Chassis: {activeProject.chassisBrandModel}
              </span>
            </div>

            <button
              onClick={() => setActiveTab('project-tracking')}
              className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center space-x-1.5 shadow"
            >
              <span>Full 15-Stage Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300">
                Current Stage: <strong className="text-white">{activeProject.stages[activeProject.currentStageIndex]?.name || 'Assembly'}</strong>
              </span>
              <span className="text-[#8EAB98] font-bold">{activeProject.overallProgressPercentage}% Complete</span>
            </div>
            <div className="w-full bg-[#0E1622] h-3 rounded-full overflow-hidden p-0.5 border border-[#30363D]">
              <div
                className="bg-gradient-to-r from-[#B76E3C] to-[#8EAB98] h-full rounded-full transition-all duration-500"
                style={{ width: `${activeProject.overallProgressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>VIN: {activeProject.chassisVin}</span>
              <span>Target Delivery: {formatDate(activeProject.targetDeliveryDate)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Two Column Section: Quotations Received vs Saved Drafts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quotations List */}
        <div className="bg-[#172638] border border-[#30363D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-[#30363D] pb-3">
            <h3 className="text-base font-bold text-white flex items-center">
              <FileText className="w-4 h-4 mr-2 text-[#B76E3C]" />
              Workshop Proposals & Quotes
            </h3>
            <button
              onClick={() => setActiveTab('quotation-tracker')}
              className="text-xs text-[#E29765] hover:underline font-semibold"
            >
              View All ({quotationsList.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {quotationsList.slice(0, 3).map(quote => (
              <div
                key={quote.id}
                className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] flex justify-between items-center text-xs"
              >
                <div>
                  <span className="text-[10px] text-[#E29765] font-mono font-bold block">{quote.quoteNumber}</span>
                  <h4 className="font-bold text-white text-xs">{quote.workshopName}</h4>
                  <span className="text-[11px] text-slate-400">
                    {quote.configuration.title} • {quote.estimatedDeliveryWeeks}w lead
                  </span>
                </div>

                <div className="text-right space-y-1">
                  <span className="font-mono font-bold text-[#8EAB98] block text-sm">
                    {formatCurrencyINR(quote.finalPriceINR)}
                  </span>
                  <button
                    onClick={() => setActiveTab('quotation-tracker')}
                    className="bg-[#172638] hover:bg-[#1E324A] text-slate-200 px-3 py-1 rounded border border-[#30363D] text-[11px]"
                  >
                    Inspect Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Vehicle Plans */}
        <div className="bg-[#172638] border border-[#30363D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-[#30363D] pb-3">
            <h3 className="text-base font-bold text-white flex items-center">
              <Bookmark className="w-4 h-4 mr-2 text-[#B76E3C]" />
              Saved Vehicle Configurations
            </h3>
            <button
              onClick={() => setActiveTab('budget-planner')}
              className="text-xs text-[#E29765] hover:underline font-semibold"
            >
              + Create New
            </button>
          </div>

          {savedDesigns.length > 0 ? (
            <div className="space-y-3">
              {savedDesigns.slice(0, 3).map(d => (
                <div
                  key={d.id}
                  className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] flex justify-between items-center text-xs"
                >
                  <div>
                    <h4 className="font-bold text-white">{d.title}</h4>
                    <span className="text-[11px] text-slate-400">
                      {d.domain} • {d.category} • {d.materialTier} Tier
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#E29765] block font-mono">
                      {formatCurrencyINR(d.targetBudgetINR)}
                    </span>
                    <button
                      onClick={() => setActiveTab('budget-planner')}
                      className="text-[#8EAB98] hover:underline text-[11px]"
                    >
                      Open in Planner →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#0E1622] p-6 rounded-xl border border-[#30363D] text-center text-xs text-slate-400 space-y-2">
              <p>You haven't saved any draft plans yet.</p>
              <button
                onClick={() => setActiveTab('budget-planner')}
                className="text-[#E29765] font-bold hover:underline"
              >
                Plan your first bus or lorry build →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#172638] border border-[#30363D] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#E29765] font-bold">Verified Customer Feedback</span>
              <h3 className="text-lg font-bold text-white mt-1">Submit Workshop Review</h3>
              <p className="text-xs text-slate-400 mt-1">
                Authentic feedback helps Tamil Nadu operators choose reliable builders. Rate workmanship, communication, and delivery punctuality.
              </p>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              {/* Select Workshop */}
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Select Workshop:</label>
                <select
                  value={reviewWorkshopId}
                  onChange={(e) => setReviewWorkshopId(e.target.value)}
                  className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2.5 text-white text-xs"
                >
                  {workshopsList.map(ws => (
                    <option key={ws.id} value={ws.id}>{ws.name} ({ws.district})</option>
                  ))}
                </select>
              </div>

              {/* Multi-Dimensional Ratings */}
              <div className="grid grid-cols-2 gap-3 bg-[#0E1622] p-3 rounded-xl border border-[#30363D]">
                <div>
                  <label className="text-slate-400 text-[10px] block">Overall Rating (1-5★):</label>
                  <select
                    value={overallRating}
                    onChange={(e) => setOverallRating(Number(e.target.value))}
                    className="bg-[#172638] text-white p-1.5 rounded w-full border border-[#30363D] mt-1"
                  >
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 text-[10px] block">Workmanship Rating (1-5★):</label>
                  <select
                    value={workmanshipRating}
                    onChange={(e) => setWorkmanshipRating(Number(e.target.value))}
                    className="bg-[#172638] text-white p-1.5 rounded w-full border border-[#30363D] mt-1"
                  >
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 text-[10px] block">Communication Rating (1-5★):</label>
                  <select
                    value={commRating}
                    onChange={(e) => setCommRating(Number(e.target.value))}
                    className="bg-[#172638] text-white p-1.5 rounded w-full border border-[#30363D] mt-1"
                  >
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 text-[10px] block">Delivery Punctuality (1-5★):</label>
                  <select
                    value={deliveryRating}
                    onChange={(e) => setDeliveryRating(Number(e.target.value))}
                    className="bg-[#172638] text-white p-1.5 rounded w-full border border-[#30363D] mt-1"
                  >
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Your Review Details:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share details regarding structural quality, paint durability, welding inspection, and handover experience..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#B76E3C]"
                />
              </div>

              <div className="flex justify-end items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="text-xs text-slate-400 hover:text-white px-3 py-1.5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-4 py-2 rounded-lg shadow"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
