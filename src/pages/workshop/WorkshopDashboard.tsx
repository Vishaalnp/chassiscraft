import React, { useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import { useApp } from '../../store/AppContext';
import { formatCurrencyINR, formatDate } from '../../utils/formatters';
import { 
  Building2, 
  Layers, 
  FileText, 
  Star, 
  BarChart2, 
  Settings, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Send, 
  ShieldCheck, 
  Plus, 
  Save, 
  Camera, 
  UserCheck,
  TrendingUp,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { Workshop, StageStatus, ManufacturingStage } from '../../types';

interface WorkshopDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const WorkshopDashboard: React.FC<WorkshopDashboardProps> = ({ setActiveTab }) => {
  const { user } = useAuth();
  const { 
    workshopsList, 
    updateWorkshopProfile, 
    quoteRequestsList, 
    quotationsList, 
    projectsList, 
    updateProjectStage,
    createWorkshopQuotation,
    reviewsList,
    replyToReview
  } = useApp();

  // Find the workshop owned by the current logged-in user (default to Karur if none specified)
  const currentWorkshop = workshopsList.find(w => w.id === user?.workshopId) || workshopsList[0];

  const [activeTab, setActiveInternalTab] = useState<'rfqs' | 'projects' | 'profile' | 'reviews' | 'analytics'>('projects');

  // Stage updater state
  const workshopProjects = projectsList.filter(p => p.workshopId === currentWorkshop.id);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(workshopProjects[0]?.id || projectsList[0]?.id || '');
  const activeProject = projectsList.find(p => p.id === selectedProjectId) || projectsList[0];

  const [editingStageNumber, setEditingStageNumber] = useState<number>(activeProject?.currentStageIndex ? activeProject.currentStageIndex + 1 : 1);
  const [stageStatus, setStageStatus] = useState<StageStatus>('in-progress');
  const [assignedStaff, setAssignedStaff] = useState<string>('Er. K. Soundarrajan');
  const [stageNotes, setStageNotes] = useState<string>('');
  const [stageDelayReason, setStageDelayReason] = useState<string>('');
  const [stagePhotoUrl, setStagePhotoUrl] = useState<string>('');

  // RFQ Quote Generator state
  const [selectedRFQId, setSelectedRFQId] = useState<string | null>(null);
  const [quoteBaseBody, setQuoteBaseBody] = useState<number>(650000);
  const [quoteMaterials, setQuoteMaterials] = useState<number>(300000);
  const [quoteInteriors, setQuoteInteriors] = useState<number>(380000);
  const [quotePaintElectrical, setQuotePaintElectrical] = useState<number>(180000);
  const [quoteLabour, setQuoteLabour] = useState<number>(160000);
  const [quoteDiscount, setQuoteDiscount] = useState<number>(30000);
  const [quoteLeadWeeks, setQuoteLeadWeeks] = useState<number>(6);
  const [quoteWarrantyMonths, setQuoteWarrantyMonths] = useState<number>(24);
  const [quoteNotes, setQuoteNotes] = useState<string>('');

  // Review reply state
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  // Workshop Profile Edit state
  const [profileName, setProfileName] = useState(currentWorkshop.name);
  const [profileTagline, setProfileTagline] = useState(currentWorkshop.tagline);
  const [profilePhone, setProfilePhone] = useState(currentWorkshop.phone);
  const [profileAddress, setProfileAddress] = useState(currentWorkshop.address);
  const [profileHours, setProfileHours] = useState(currentWorkshop.workingHours);
  const [profileMinPrice, setProfileMinPrice] = useState(currentWorkshop.indicativePriceRange.minINR);
  const [profileMaxPrice, setProfileMaxPrice] = useState(currentWorkshop.indicativePriceRange.maxINR);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkshopProfile(currentWorkshop.id, {
      name: profileName,
      tagline: profileTagline,
      phone: profilePhone,
      address: profileAddress,
      workingHours: profileHours,
      indicativePriceRange: {
        minINR: Number(profileMinPrice),
        maxINR: Number(profileMaxPrice)
      }
    });
    alert('Workshop profile updated successfully!');
  };

  const handleUpdateStage = () => {
    if (!activeProject) return;

    updateProjectStage(
      activeProject.id,
      editingStageNumber,
      stageStatus,
      stageNotes || undefined,
      stageDelayReason || undefined,
      stagePhotoUrl || undefined
    );

    alert(`Stage ${editingStageNumber} updated to ${stageStatus.toUpperCase()}!`);
    setStageNotes('');
    setStageDelayReason('');
    setStagePhotoUrl('');
  };

  const handleSendQuotation = (rfqId: string) => {
    const rfq = quoteRequestsList.find(r => r.id === rfqId);
    if (!rfq) return;

    const subtotal = quoteBaseBody + quoteMaterials + quoteInteriors + quotePaintElectrical + quoteLabour - quoteDiscount;
    const gst18 = Math.round(subtotal * 0.18);
    const finalTotal = subtotal + gst18;

    createWorkshopQuotation({
      quoteRequestId: rfq.id,
      workshopId: currentWorkshop.id,
      workshopName: currentWorkshop.name,
      workshopDistrict: currentWorkshop.district,
      customerId: rfq.customerId,
      customerName: rfq.customerName,
      customerPhone: rfq.customerPhone,
      customerCompany: rfq.customerCompany,
      configuration: rfq.configuration,
      status: 'Quotation Sent',
      baseBodyPriceINR: quoteBaseBody,
      materialsPriceINR: quoteMaterials,
      interiorSeatsPriceINR: quoteInteriors,
      electricalPaintPriceINR: quotePaintElectrical,
      labourPriceINR: quoteLabour,
      discountINR: quoteDiscount,
      taxGST18INR: gst18,
      finalPriceINR: finalTotal,
      estimatedDeliveryWeeks: quoteLeadWeeks,
      warrantyMonths: quoteWarrantyMonths,
      validityDays: 30,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      inclusions: [
        'Tata Structura IS 2062 Grade structural steel frame',
        '2K Polyurethane bake oven exterior paint',
        'AIS-052 / ARAI compliance inspection report',
        'Complete automotive grade electrical wiring harness'
      ],
      exclusions: [
        'OEM Chassis ex-showroom supply (customer scope)',
        'RTO road tax and registration fees'
      ],
      workshopNotes: quoteNotes || `Official proposal by ${currentWorkshop.name}. Ready for bay staging.`
    });

    setSelectedRFQId(null);
    alert('Quotation dispatched to customer!');
  };

  const handleReviewReply = (reviewId: string) => {
    const reply = replyTextMap[reviewId];
    if (!reply || !reply.trim()) return;
    replyToReview(reviewId, reply);
    setReplyTextMap(prev => ({ ...prev, [reviewId]: '' }));
    alert('Official workshop reply posted.');
  };

  const workshopReviews = reviewsList.filter(r => r.workshopId === currentWorkshop.id);
  const relevantRFQs = quoteRequestsList.filter(r => r.targetWorkshops.includes(currentWorkshop.id));

  return (
    <div className="space-y-6 text-[#F5F2EB]">
      {/* Top Header */}
      <div className="bg-[#172638] border border-[#30363D] p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E29765] font-semibold">
            <Building2 className="w-3.5 h-3.5 text-[#B76E3C]" />
            <span>WORKSHOP OWNER PORTAL • {currentWorkshop.district.toUpperCase()} CLUSTER</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">{currentWorkshop.name}</h1>
          <p className="text-slate-400 text-xs mt-1">
            {currentWorkshop.tagline} • Est. {currentWorkshop.establishedYear} • Rating: <strong className="text-amber-400">{currentWorkshop.rating}★</strong> ({currentWorkshop.reviewCount} reviews)
          </p>
        </div>

        {/* Quick Nav Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-[#0E1622] p-1 rounded-xl border border-[#30363D] text-xs">
          <button
            onClick={() => setActiveInternalTab('projects')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'projects' ? 'bg-[#B76E3C] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Manufacturing Tracking ({workshopProjects.length})
          </button>
          <button
            onClick={() => setActiveInternalTab('rfqs')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'rfqs' ? 'bg-[#B76E3C] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Customer RFQs ({relevantRFQs.length})
          </button>
          <button
            onClick={() => setActiveInternalTab('reviews')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'reviews' ? 'bg-[#B76E3C] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Reviews ({workshopReviews.length})
          </button>
          <button
            onClick={() => setActiveInternalTab('profile')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'profile' ? 'bg-[#B76E3C] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Profile & Rates
          </button>
          <button
            onClick={() => setActiveInternalTab('analytics')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'analytics' ? 'bg-[#B76E3C] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* TAB 1: MANUFACTURING PROJECTS & 15-STAGE UPDATER */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          {activeProject ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Project Status Overview (7 cols) */}
              <div className="lg:col-span-7 bg-[#172638] border border-[#30363D] rounded-2xl p-6 space-y-5 shadow-xl">
                <div className="flex justify-between items-start border-b border-[#30363D] pb-4">
                  <div>
                    <span className="text-xs font-mono text-[#E29765] block font-bold">PROJECT CODE: {activeProject.projectCode}</span>
                    <h2 className="text-xl font-bold text-white mt-0.5">{activeProject.vehicleTitle}</h2>
                    <span className="text-xs text-slate-400">
                      Customer: {activeProject.customerName} ({activeProject.customerPhone})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-mono block">Overall Progress</span>
                    <span className="text-2xl font-black text-[#8EAB98] font-mono">{activeProject.overallProgressPercentage}%</span>
                  </div>
                </div>

                {/* Stages List */}
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {activeProject.stages.map((stg) => {
                    const isSelected = editingStageNumber === stg.stageNumber;
                    return (
                      <div
                        key={stg.id}
                        onClick={() => {
                          setEditingStageNumber(stg.stageNumber);
                          setStageStatus(stg.status);
                          setStageNotes(stg.notes || '');
                          setStageDelayReason(stg.delayReason || '');
                        }}
                        className={`p-3 rounded-xl border cursor-pointer text-xs flex justify-between items-center transition-all ${
                          isSelected
                            ? 'bg-[#0E1622] border-[#B76E3C] ring-1 ring-[#B76E3C]'
                            : 'bg-[#0E1622]/60 border-[#30363D] hover:border-slate-500'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                            stg.status === 'completed' ? 'bg-[#8EAB98] text-[#0E1622]' :
                            stg.status === 'in-progress' ? 'bg-[#B76E3C] text-white' :
                            stg.status === 'delayed' ? 'bg-rose-600 text-white' :
                            'bg-[#172638] text-slate-500'
                          }`}>
                            {stg.stageNumber}
                          </span>
                          <div>
                            <span className="font-bold text-white block">{stg.name}</span>
                            <span className="text-[10px] text-slate-400">{stg.assignedStaff}</span>
                          </div>
                        </div>

                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                          stg.status === 'completed' ? 'bg-[#6E8878]/30 text-[#8EAB98]' :
                          stg.status === 'in-progress' ? 'bg-[#B76E3C]/30 text-[#E29765]' :
                          stg.status === 'delayed' ? 'bg-rose-950 text-rose-400' :
                          'bg-[#172638] text-slate-500'
                        }`}>
                          {stg.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Stage Status Updater Form (5 cols) */}
              <div className="lg:col-span-5 bg-[#172638] border border-[#30363D] rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="border-b border-[#30363D] pb-3">
                  <span className="text-[10px] font-mono uppercase text-[#E29765] font-bold">Factory Foreman Action</span>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    Update Stage #{editingStageNumber}: {activeProject.stages[editingStageNumber - 1]?.name}
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Status Toggle */}
                  <div>
                    <label className="text-slate-400 block mb-1 font-semibold">Stage Production Status:</label>
                    <select
                      value={stageStatus}
                      onChange={(e) => setStageStatus(e.target.value as StageStatus)}
                      className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2.5 text-white text-xs"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="delayed">Delayed</option>
                      <option value="on-hold">On Hold</option>
                    </select>
                  </div>

                  {/* Assigned Staff */}
                  <div>
                    <label className="text-slate-400 block mb-1 font-semibold">Assigned Technician / Lead:</label>
                    <input
                      type="text"
                      value={assignedStaff}
                      onChange={(e) => setAssignedStaff(e.target.value)}
                      placeholder="E.g., Er. K. Soundarrajan / Master Welder Palanisamy"
                      className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2.5 text-white text-xs"
                    />
                  </div>

                  {/* Stage Notes */}
                  <div>
                    <label className="text-slate-400 block mb-1 font-semibold">Technical Progress Note:</label>
                    <textarea
                      rows={3}
                      value={stageNotes}
                      onChange={(e) => setStageNotes(e.target.value)}
                      placeholder="E.g., Rollover cage diagonals welded. Stress deflection passed inspection."
                      className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2.5 text-white text-xs"
                    />
                  </div>

                  {/* Delay Reason (Conditional) */}
                  {stageStatus === 'delayed' && (
                    <div>
                      <label className="text-rose-400 block mb-1 font-semibold">Delay Explanation Reason:</label>
                      <input
                        type="text"
                        value={stageDelayReason}
                        onChange={(e) => setStageDelayReason(e.target.value)}
                        placeholder="E.g., 2-day delay awaiting specialized hydraulic valve from supplier"
                        className="w-full bg-rose-950/30 border border-rose-800 rounded-lg p-2.5 text-rose-200 text-xs"
                      />
                    </div>
                  )}

                  {/* Photo URL */}
                  <div>
                    <label className="text-slate-400 block mb-1 font-semibold">Upload Inspection Photo (URL):</label>
                    <input
                      type="text"
                      value={stagePhotoUrl}
                      onChange={(e) => setStagePhotoUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2.5 text-white text-xs"
                    />
                  </div>

                  <button
                    onClick={handleUpdateStage}
                    className="w-full bg-[#B76E3C] hover:bg-[#CF8754] text-white font-bold py-2.5 rounded-lg shadow text-xs flex items-center justify-center space-x-1.5 transition-all mt-4"
                  >
                    <Save className="w-4 h-4" />
                    <span>Publish Stage Update to Customer</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#172638] rounded-2xl p-12 text-center text-slate-400 border border-[#30363D]">
              No active vehicle builds underway in this workshop currently.
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CUSTOMER RFQS & QUOTATION BUILDER */}
      {activeTab === 'rfqs' && (
        <div className="space-y-6">
          <div className="bg-[#172638] border border-[#30363D] rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center">
              <FileText className="w-4 h-4 mr-2 text-[#B76E3C]" />
              Incoming Quotation Requests (RFQs)
            </h3>

            <div className="space-y-4">
              {relevantRFQs.map(rfq => (
                <div
                  key={rfq.id}
                  className="bg-[#0E1622] border border-[#30363D] p-5 rounded-xl space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#30363D] pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-[#E29765] font-bold block">{rfq.rfqNumber}</span>
                      <h4 className="text-base font-bold text-white mt-0.5">{rfq.configuration.title}</h4>
                      <span className="text-xs text-slate-400">
                        From: {rfq.customerName} ({rfq.customerPhone}) • {rfq.customerCompany || 'Transport Operator'}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 font-mono block">Customer Target Budget</span>
                      <span className="text-lg font-black text-[#8EAB98] font-mono">{formatCurrencyINR(rfq.targetBudgetINR)}</span>
                    </div>
                  </div>

                  {/* Customer Notes */}
                  {rfq.customerNotes && (
                    <div className="text-xs text-slate-300 bg-[#172638] p-3 rounded-lg border border-[#30363D]">
                      <strong className="text-white block mb-0.5">Customer Scope Request:</strong>
                      {rfq.customerNotes}
                    </div>
                  )}

                  {/* Action */}
                  <div className="flex justify-end items-center space-x-3 pt-2">
                    {selectedRFQId === rfq.id ? (
                      <button
                        onClick={() => setSelectedRFQId(null)}
                        className="text-xs text-slate-400 hover:text-white px-3 py-1.5"
                      >
                        Collapse Builder
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedRFQId(rfq.id)}
                        className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-4 py-2 rounded-lg shadow flex items-center space-x-1"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        <span>Craft Itemized Quotation</span>
                      </button>
                    )}
                  </div>

                  {/* Quotation Builder Expandable Form */}
                  {selectedRFQId === rfq.id && (
                    <div className="bg-[#172638] p-5 rounded-xl border border-[#B76E3C]/50 space-y-4 mt-3">
                      <h4 className="text-sm font-bold text-white flex items-center">
                        <Send className="w-4 h-4 mr-1.5 text-[#E29765]" />
                        Craft Official Workshop Quotation for {rfq.rfqNumber}
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="text-slate-400 block mb-1">Base Body Frame (₹):</label>
                          <input
                            type="number"
                            value={quoteBaseBody}
                            onChange={(e) => setQuoteBaseBody(Number(e.target.value))}
                            className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1">Structural Materials (₹):</label>
                          <input
                            type="number"
                            value={quoteMaterials}
                            onChange={(e) => setQuoteMaterials(Number(e.target.value))}
                            className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1">Interior / Seating (₹):</label>
                          <input
                            type="number"
                            value={quoteInteriors}
                            onChange={(e) => setQuoteInteriors(Number(e.target.value))}
                            className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1">Paint & Electrical (₹):</label>
                          <input
                            type="number"
                            value={quotePaintElectrical}
                            onChange={(e) => setQuotePaintElectrical(Number(e.target.value))}
                            className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1">Labour Charges (₹):</label>
                          <input
                            type="number"
                            value={quoteLabour}
                            onChange={(e) => setQuoteLabour(Number(e.target.value))}
                            className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1">Commercial Discount (₹):</label>
                          <input
                            type="number"
                            value={quoteDiscount}
                            onChange={(e) => setQuoteDiscount(Number(e.target.value))}
                            className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2 text-white font-mono text-[#8EAB98]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-slate-400 block mb-1">Estimated Turnaround (Weeks):</label>
                          <input
                            type="number"
                            value={quoteLeadWeeks}
                            onChange={(e) => setQuoteLeadWeeks(Number(e.target.value))}
                            className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 block mb-1">Structural Warranty (Months):</label>
                          <input
                            type="number"
                            value={quoteWarrantyMonths}
                            onChange={(e) => setQuoteWarrantyMonths(Number(e.target.value))}
                            className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2 text-white font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-slate-400 block mb-1 text-xs">Remarks / Special Commitments:</label>
                        <input
                          type="text"
                          value={quoteNotes}
                          onChange={(e) => setQuoteNotes(e.target.value)}
                          placeholder="E.g., Festive priority slot allocated. Pre-delivery trial at Karur test track included."
                          className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2 text-xs text-white"
                        />
                      </div>

                      <div className="pt-3 border-t border-[#30363D] flex justify-between items-center">
                        <div className="text-xs">
                          <span className="text-slate-400">Total Calculated (incl. 18% GST):</span>{' '}
                          <strong className="text-[#E29765] font-mono text-base ml-1">
                            {formatCurrencyINR(Math.round((quoteBaseBody + quoteMaterials + quoteInteriors + quotePaintElectrical + quoteLabour - quoteDiscount) * 1.18))}
                          </strong>
                        </div>

                        <button
                          onClick={() => handleSendQuotation(rfq.id)}
                          className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow flex items-center space-x-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Dispatch Quotation to Customer</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {relevantRFQs.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-400">
                  No new customer RFQs pending. New quote requests from the Budget Planner will appear here automatically.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMER REVIEWS & REPLIES */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="bg-[#172638] border border-[#30363D] rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center">
              <Star className="w-4 h-4 mr-2 text-amber-400 fill-amber-400" />
              Verified Customer Reviews & Responses
            </h3>

            <div className="space-y-4">
              {workshopReviews.map(rev => (
                <div key={rev.id} className="bg-[#0E1622] p-5 rounded-xl border border-[#30363D] space-y-3 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-white text-sm block">{rev.customerName}</span>
                      <span className="text-slate-400 text-[11px]">{rev.customerCompany} • {formatDate(rev.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-white text-sm">{rev.overallRating}.0</span>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed bg-[#172638]/40 p-3 rounded-lg border border-[#30363D]/40">
                    "{rev.comment}"
                  </p>

                  {/* Existing Reply */}
                  {rev.workshopReply ? (
                    <div className="bg-[#172638] p-3 rounded-lg border border-[#6E8878]/30 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#8EAB98] block">Your Workshop Response:</span>
                      <p className="text-slate-300 text-xs">{rev.workshopReply}</p>
                    </div>
                  ) : (
                    /* Response Composer */
                    <div className="space-y-2 pt-2">
                      <label className="text-[11px] text-slate-400 font-semibold block">Respond to this Review:</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Write respectful workshop acknowledgment..."
                          value={replyTextMap[rev.id] || ''}
                          onChange={(e) => setReplyTextMap(prev => ({ ...prev, [rev.id]: e.target.value }))}
                          className="flex-1 bg-[#172638] border border-[#30363D] rounded-lg p-2 text-xs text-white"
                        />
                        <button
                          onClick={() => handleReviewReply(rev.id)}
                          className="bg-[#B76E3C] hover:bg-[#CF8754] text-white font-bold px-3 py-2 rounded-lg text-xs shrink-0"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {workshopReviews.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-400">
                  No customer reviews yet. Reviews submitted by customers upon project handover will appear here.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WORKSHOP PROFILE & RATES */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-[#172638] border border-[#30363D] rounded-2xl p-6 shadow-xl space-y-5 text-xs">
          <div className="border-b border-[#30363D] pb-3">
            <h3 className="text-base font-bold text-white flex items-center">
              <Settings className="w-4 h-4 mr-2 text-[#B76E3C]" />
              Manage Workshop Profile & Public Catalog
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">
              Updates made here appear live on the Find Workshops discovery marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 block mb-1 font-semibold">Workshop Legal Business Name:</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1 font-semibold">Tagline / Specialization Header:</label>
              <input
                type="text"
                value={profileTagline}
                onChange={(e) => setProfileTagline(e.target.value)}
                className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1 font-semibold">Contact Phone Number:</label>
              <input
                type="text"
                value={profilePhone}
                onChange={(e) => setProfilePhone(e.target.value)}
                className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1 font-semibold">Working Hours:</label>
              <input
                type="text"
                value={profileHours}
                onChange={(e) => setProfileHours(e.target.value)}
                className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2.5 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-slate-300 block mb-1 font-semibold">Fabrication Yard Physical Address:</label>
              <input
                type="text"
                value={profileAddress}
                onChange={(e) => setProfileAddress(e.target.value)}
                className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1 font-semibold">Indicative Starting Price (Min INR):</label>
              <input
                type="number"
                value={profileMinPrice}
                onChange={(e) => setProfileMinPrice(Number(e.target.value))}
                className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2.5 text-white font-mono"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1 font-semibold">Indicative Ceiling Price (Max INR):</label>
              <input
                type="number"
                value={profileMaxPrice}
                onChange={(e) => setProfileMaxPrice(Number(e.target.value))}
                className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg p-2.5 text-white font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#30363D] flex justify-end">
            <button
              type="submit"
              className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Workshop Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 5: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-[#172638] border border-[#30363D] rounded-xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-mono">Total RFQs Received</span>
              <p className="text-3xl font-black text-white font-mono">{relevantRFQs.length + 8}</p>
              <span className="text-[10px] text-[#8EAB98] font-bold">↑ 18% month over month</span>
            </div>
            <div className="bg-[#172638] border border-[#30363D] rounded-xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-mono">Quotation Win Rate</span>
              <p className="text-3xl font-black text-[#8EAB98] font-mono">68%</p>
              <span className="text-[10px] text-slate-500">Industry avg: 42%</span>
            </div>
            <div className="bg-[#172638] border border-[#30363D] rounded-xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-mono">Active Factory Builds</span>
              <p className="text-3xl font-black text-[#E29765] font-mono">{workshopProjects.length}</p>
              <span className="text-[10px] text-slate-500">Live 15-stage workflow</span>
            </div>
            <div className="bg-[#172638] border border-[#30363D] rounded-xl p-5 space-y-1">
              <span className="text-xs text-slate-400 font-mono">Average Turnaround</span>
              <p className="text-3xl font-black text-amber-400 font-mono">{currentWorkshop.leadTimeWeeks} Wks</p>
              <span className="text-[10px] text-slate-500">Committed lead time</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
