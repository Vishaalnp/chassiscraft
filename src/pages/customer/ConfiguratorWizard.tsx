import React, { useState } from 'react';
import { useConfigurator } from '../../store/ConfiguratorContext';
import { useApp } from '../../store/AppContext';
import { useAuth } from '../../store/AuthContext';
import { MOCK_CHASSIS } from '../../data/mockChassis';
import { MOCK_MATERIAL_TIERS } from '../../data/mockWorkshops';
import { formatCurrencyINR, formatRupeesShort } from '../../utils/formatters';
import { BodyCategory, ChassisSpec } from '../../types';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Truck, 
  Layers, 
  Zap, 
  Send, 
  SlidersHorizontal,
  AlertTriangle,
  Printer,
  Bookmark,
  Building2,
  MapPin,
  Clock,
  Ruler,
  HelpCircle,
  TrendingDown
} from 'lucide-react';

interface ConfiguratorWizardProps {
  setActiveTab: (tab: string) => void;
}

export const ConfiguratorWizard: React.FC<ConfiguratorWizardProps> = ({ setActiveTab }) => {
  const { 
    currentStep, 
    config, 
    estimate, 
    selectedWorkshopIds,
    setStep, 
    nextStep, 
    prevStep, 
    updateConfig, 
    toggleTargetWorkshop,
    applyOptimization,
    resetConfig 
  } = useConfigurator();

  const { workshopsList, saveDesign, createQuoteRequest } = useApp();
  const { user } = useAuth();

  const [customerNotes, setCustomerNotes] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('All');

  const stepLabels = [
    'Vehicle & Chassis',
    'Budget Scope',
    'Body Configuration',
    'Customization',
    'Materials & Finish',
    'Live Cost Breakdown',
    'Budget Optimizer',
    'Summary & RFQ'
  ];

  const busCategories: BodyCategory[] = [
    'Tourist & Luxury Coach',
    'Sleeper Coach (2+1)',
    'Mofussil & Route Bus',
    'School & College Bus',
    'Staff & Institutional Bus',
    'Town & City Bus'
  ];

  const lorryCategories: BodyCategory[] = [
    'Tipper & Dumper Body',
    'Container & Cargo Body',
    'Open-Body Goods Lorry',
    'Closed-Body Truck',
    'Refrigerated & Insulated Body'
  ];

  const filteredChassis = MOCK_CHASSIS.filter(c => {
    const matchesDomain = c.domain === config.domain || c.domain === 'Both';
    const matchesBrand = selectedBrandFilter === 'All' || c.brand === selectedBrandFilter;
    return matchesDomain && matchesBrand;
  });

  const handleSaveDraft = () => {
    saveDesign(config);
    alert('Vehicle configuration saved to your dashboard drafts!');
  };

  const handleSubmitRFQ = () => {
    if (selectedWorkshopIds.length === 0) {
      alert('Please select at least one workshop to receive your quotation request.');
      return;
    }

    createQuoteRequest({
      customerId: user?.id || 'cust-01',
      customerName: user?.name || 'M. Selvakumar',
      customerPhone: user?.phone || '+91 94431 82910',
      customerEmail: user?.email || 'customer@demo.in',
      customerCompany: user?.company || 'Vetri Travels',
      targetWorkshops: selectedWorkshopIds,
      configuration: config,
      targetBudgetINR: config.targetBudgetINR,
      customerNotes: customerNotes
    });

    setSubmittedSuccess(true);
  };

  const handlePrint = () => {
    window.print();
  };

  if (submittedSuccess) {
    return (
      <div className="min-h-screen bg-[#0E1622] text-[#F5F2EB] py-16 px-4">
        <div className="max-w-2xl mx-auto bg-[#172638] rounded-2xl border border-[#30363D] p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#6E8878]/20 text-[#8EAB98] flex items-center justify-center mx-auto border border-[#8EAB98]/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-[#E29765] tracking-wider font-bold">RFQ Transmitted Successfully</span>
            <h2 className="text-2xl font-black text-white mt-1">Quotation Request Dispatched</h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Your detailed build specification for <strong>{config.title}</strong> has been forwarded to {selectedWorkshopIds.length} workshop(s) in Karur & Namakkal.
            </p>
          </div>

          <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Target Budget:</span>
              <span className="text-white font-bold">{formatCurrencyINR(config.targetBudgetINR)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Estimated Total:</span>
              <span className="text-[#8EAB98] font-bold">{formatCurrencyINR(estimate.totalEstimatedINR)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Selected Workshops:</span>
              <span className="text-white">{selectedWorkshopIds.map(id => workshopsList.find(w => w.id === id)?.name).join(', ')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveTab('quotation-tracker')}
              className="w-full sm:w-auto bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow transition-all"
            >
              Track Quotations
            </button>
            <button
              onClick={() => setActiveTab('customer-dashboard')}
              className="w-full sm:w-auto bg-[#172638] hover:bg-[#1E324A] text-slate-300 text-xs font-semibold px-6 py-2.5 rounded-lg border border-[#30363D]"
            >
              Go to Customer Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E1622] text-[#F5F2EB] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Wizard Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#172638] p-4 rounded-xl border border-[#30363D]">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-mono text-[#E29765] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#B76E3C]" />
              <span>Interactive Vehicle Body Planner</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              {config.title || 'Custom Vehicle Body Plan'}
            </h1>
          </div>

          {/* Quick Domain Switcher */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Build Type:</span>
            <div className="flex bg-[#0E1622] p-1 rounded-lg border border-[#30363D] text-xs">
              <button
                onClick={() => resetConfig('Bus')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  config.domain === 'Bus' ? 'bg-[#B76E3C] text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Bus Coach
              </button>
              <button
                onClick={() => resetConfig('Lorry')}
                className={`px-3 py-1 rounded-md font-bold transition-all ${
                  config.domain === 'Lorry' ? 'bg-[#B76E3C] text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Commercial Lorry
              </button>
            </div>
          </div>
        </div>

        {/* Step Progress Indicators */}
        <div className="bg-[#172638] rounded-xl p-3 border border-[#30363D] overflow-x-auto">
          <div className="flex items-center justify-between min-w-[720px] gap-2">
            {stepLabels.map((lbl, idx) => {
              const stepNumber = idx + 1;
              const isCurrent = currentStep === stepNumber;
              const isPast = currentStep > stepNumber;

              return (
                <button
                  key={idx}
                  onClick={() => setStep(stepNumber)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isCurrent 
                      ? 'bg-[#B76E3C] text-white font-bold shadow' 
                      : isPast 
                      ? 'bg-[#6E8878]/20 text-[#8EAB98] border border-[#8EAB98]/30' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCurrent ? 'bg-white text-[#B76E3C]' : isPast ? 'bg-[#8EAB98] text-[#0E1622]' : 'bg-[#0E1622] text-slate-400'
                  }`}>
                    {stepNumber}
                  </span>
                  <span className="whitespace-nowrap">{lbl}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Layout: Left Content, Right Persistent Summary Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Active Step Wizard Panel (8 Cols) */}
          <div className="lg:col-span-8 bg-[#172638] rounded-xl border border-[#30363D] p-6 space-y-6 shadow-xl">
            {/* STEP 1: SELECT VEHICLE & CHASSIS */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-[#B76E3C]" />
                    Step 1: Select Vehicle Domain & Chassis Platform
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Choose whether you are constructing a bus coach or heavy commercial lorry, and select your underlying chassis platform.
                  </p>
                </div>

                {/* Build Status & Chassis Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2">
                    <span className="text-xs font-mono text-[#E29765] block font-bold">Chassis Availability:</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => updateConfig({ chassisStatus: 'have-chassis' })}
                        className={`p-2.5 rounded-lg border text-center font-medium ${
                          config.chassisStatus === 'have-chassis'
                            ? 'bg-[#B76E3C]/20 border-[#B76E3C] text-white'
                            : 'border-[#30363D] text-slate-400 hover:text-white'
                        }`}
                      >
                        Chassis Available
                      </button>
                      <button
                        onClick={() => updateConfig({ chassisStatus: 'need-procurement' })}
                        className={`p-2.5 rounded-lg border text-center font-medium ${
                          config.chassisStatus === 'need-procurement'
                            ? 'bg-[#B76E3C]/20 border-[#B76E3C] text-white'
                            : 'border-[#30363D] text-slate-400 hover:text-white'
                        }`}
                      >
                        Need Procurement
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2">
                    <span className="text-xs font-mono text-[#E29765] block font-bold">Construction Type:</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => updateConfig({ buildType: 'new-build' })}
                        className={`p-2.5 rounded-lg border text-center font-medium ${
                          config.buildType === 'new-build'
                            ? 'bg-[#B76E3C]/20 border-[#B76E3C] text-white'
                            : 'border-[#30363D] text-slate-400 hover:text-white'
                        }`}
                      >
                        Brand New Body
                      </button>
                      <button
                        onClick={() => updateConfig({ buildType: 'refurbishment' })}
                        className={`p-2.5 rounded-lg border text-center font-medium ${
                          config.buildType === 'refurbishment'
                            ? 'bg-[#B76E3C]/20 border-[#B76E3C] text-white'
                            : 'border-[#30363D] text-slate-400 hover:text-white'
                        }`}
                      >
                        Body Refurbishment
                      </button>
                    </div>
                  </div>
                </div>

                {/* Chassis Filter by OEM Brand */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-[#E29765] uppercase font-bold">Select OEM Chassis Brand:</span>
                    <div className="flex space-x-1 text-xs">
                      {['All', 'Ashok Leyland', 'Tata Motors', 'BharatBenz', 'Eicher'].map(brand => (
                        <button
                          key={brand}
                          onClick={() => setSelectedBrandFilter(brand)}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold ${
                            selectedBrandFilter === brand
                              ? 'bg-[#B76E3C] text-white'
                              : 'bg-[#0E1622] text-slate-400 hover:text-white border border-[#30363D]'
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chassis Selection Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                    {filteredChassis.map(chassis => {
                      const isSelected = config.chassis?.id === chassis.id;
                      return (
                        <div
                          key={chassis.id}
                          onClick={() => updateConfig({ chassis })}
                          className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                            isSelected
                              ? 'bg-[#0E1622] border-[#B76E3C] shadow-lg ring-1 ring-[#B76E3C]'
                              : 'bg-[#0E1622]/60 border-[#30363D] hover:border-slate-500'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] text-[#E29765] font-mono font-bold block">{chassis.brand}</span>
                              <h4 className="font-bold text-white text-xs">{chassis.model}</h4>
                            </div>
                            <span className="text-[10px] bg-[#172638] text-slate-300 px-2 py-0.5 rounded border border-[#30363D]">
                              {chassis.wheelbaseMm}mm WB
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-400 font-mono">
                            <div>Power: <span className="text-white">{chassis.enginePowerHp} HP</span></div>
                            <div>GVW: <span className="text-white">{chassis.gvwKg} Kg</span></div>
                          </div>

                          <div className="text-[11px] text-slate-400 line-clamp-2">
                            {chassis.description}
                          </div>

                          <div className="pt-2 border-t border-[#30363D]/60 flex justify-between items-center text-xs">
                            <span className="text-slate-500 text-[10px]">OEM Chassis Price:</span>
                            <span className="font-bold text-white">{formatCurrencyINR(chassis.basePriceINR)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: ENTER BUDGET & SCOPE */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <SlidersHorizontal className="w-5 h-5 mr-2 text-[#B76E3C]" />
                    Step 2: Define Your Target Budget & Scope
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Set your realistic investment cap. The planner will compare live fabrication costs against this budget and help optimize options.
                  </p>
                </div>

                {/* Budget Slider & Manual Input */}
                <div className="bg-[#0E1622] p-5 rounded-xl border border-[#30363D] space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-[#E29765] font-bold">Total Budget Cap (INR):</span>
                    <span className="text-2xl font-black text-white">{formatCurrencyINR(config.targetBudgetINR)}</span>
                  </div>

                  <input
                    type="range"
                    min="400000"
                    max="4500000"
                    step="50000"
                    value={config.targetBudgetINR}
                    onChange={(e) => updateConfig({ targetBudgetINR: Number(e.target.value) })}
                    className="w-full accent-[#B76E3C] cursor-pointer"
                  />

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap gap-2 text-xs pt-1">
                    {[600000, 1000000, 1500000, 2000000, 2500000, 3500000].map(val => (
                      <button
                        key={val}
                        onClick={() => updateConfig({ targetBudgetINR: val })}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                          config.targetBudgetINR === val
                            ? 'bg-[#B76E3C] text-white border-[#B76E3C]'
                            : 'bg-[#172638] text-slate-300 border-[#30363D] hover:bg-[#1E324A]'
                        }`}
                      >
                        {formatRupeesShort(val)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Inclusions & Scope */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Scope: Body Only vs Chassis + Body */}
                  <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2">
                    <span className="text-xs font-mono text-[#E29765] font-bold block">Budget Scope:</span>
                    <div className="space-y-1.5 text-xs">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="scope"
                          checked={config.budgetScope === 'body-only'}
                          onChange={() => updateConfig({ budgetScope: 'body-only' })}
                          className="text-[#B76E3C] focus:ring-0"
                        />
                        <span className="text-slate-300">Body Building Only</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="scope"
                          checked={config.budgetScope === 'chassis-and-body'}
                          onChange={() => updateConfig({ budgetScope: 'chassis-and-body' })}
                          className="text-[#B76E3C] focus:ring-0"
                        />
                        <span className="text-slate-300">Chassis + Body Building</span>
                      </label>
                    </div>
                  </div>

                  {/* GST Inclusion Toggle */}
                  <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2">
                    <span className="text-xs font-mono text-[#E29765] font-bold block">Tax Consideration:</span>
                    <div className="space-y-1.5 text-xs">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.budgetIncludesGST}
                          onChange={(e) => updateConfig({ budgetIncludesGST: e.target.checked })}
                          className="rounded text-[#B76E3C] focus:ring-0"
                        />
                        <span className="text-slate-300">Amount Includes 18% GST</span>
                      </label>
                    </div>
                  </div>

                  {/* Contingency Buffer */}
                  <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2">
                    <span className="text-xs font-mono text-[#E29765] font-bold block">Contingency Buffer:</span>
                    <div className="flex gap-1.5 text-xs">
                      {[0, 5, 10].map(pct => (
                        <button
                          key={pct}
                          onClick={() => updateConfig({ contingencyPercentage: pct })}
                          className={`flex-1 py-1.5 rounded border text-xs font-bold ${
                            config.contingencyPercentage === pct
                              ? 'bg-[#B76E3C] text-white border-[#B76E3C]'
                              : 'bg-[#172638] text-slate-400 border-[#30363D]'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: SELECT BODY CONFIGURATION */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <Layers className="w-5 h-5 mr-2 text-[#B76E3C]" />
                    Step 3: Choose Body Configuration Category
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select the intended operational body layout compatible with your {config.domain.toLowerCase()} chassis.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(config.domain === 'Bus' ? busCategories : lorryCategories).map(cat => {
                    const isSelected = config.category === cat;
                    return (
                      <div
                        key={cat}
                        onClick={() => updateConfig({ category: cat, title: `${cat} - Custom Plan` })}
                        className={`p-5 rounded-xl border cursor-pointer transition-all space-y-2 ${
                          isSelected
                            ? 'bg-[#0E1622] border-[#B76E3C] shadow-lg ring-1 ring-[#B76E3C]'
                            : 'bg-[#0E1622]/60 border-[#30363D] hover:border-slate-500'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-bold text-white">{cat}</h4>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#B76E3C]" />}
                        </div>
                        <p className="text-xs text-slate-400">
                          {config.domain === 'Bus'
                            ? 'Full AIS-052 compliant tubular structure engineered for South Indian route conditions.'
                            : 'Heavy duty subframe with certified Tata structural steel channel reinforcement.'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: CUSTOMIZE THE BODY */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-[#B76E3C]" />
                    Step 4: Custom Specifications & Fitments
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Configure seats, glazing, doors, air-conditioning, cargo dimensions, and specialized gear.
                  </p>
                </div>

                {config.domain === 'Bus' ? (
                  /* BUS CUSTOMIZATION */
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Seating Capacity */}
                      <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2">
                        <span className="text-xs font-mono text-[#E29765] block font-bold">Seating Capacity:</span>
                        <div className="flex gap-2">
                          {[28, 36, 42, 48, 54].map(seats => (
                            <button
                              key={seats}
                              onClick={() => updateConfig({ seatingCapacity: seats })}
                              className={`flex-1 py-1.5 rounded border text-xs font-bold ${
                                config.seatingCapacity === seats
                                  ? 'bg-[#B76E3C] text-white border-[#B76E3C]'
                                  : 'bg-[#172638] text-slate-400 border-[#30363D]'
                              }`}
                            >
                              {seats}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Seat Type */}
                      <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2">
                        <span className="text-xs font-mono text-[#E29765] block font-bold">Seat Model:</span>
                        <select
                          value={config.seatType}
                          onChange={(e) => updateConfig({ seatType: e.target.value as any })}
                          className="w-full bg-[#172638] border border-[#30363D] rounded-lg p-2 text-xs text-white"
                        >
                          <option value="standard-bench">Standard High-Density Foam Bench</option>
                          <option value="semi-deluxe-highback">Semi-Deluxe High-Back Cushioned</option>
                          <option value="harita-pushback">Harita Pushback Recliner (+₹9,500/seat)</option>
                          <option value="sleeper-berth">2+1 Individual AC Sleeper Berths (+₹18,500/berth)</option>
                        </select>
                      </div>

                      {/* Windows */}
                      <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2">
                        <span className="text-xs font-mono text-[#E29765] block font-bold">Glazing & Windows:</span>
                        <select
                          value={config.windowType}
                          onChange={(e) => updateConfig({ windowType: e.target.value as any })}
                          className="w-full bg-[#172638] border border-[#30363D] rounded-lg p-2 text-xs text-white"
                        >
                          <option value="sliding-tinted">Sliding Tinted Toughened Glass</option>
                          <option value="fixed-toughened-flush">Fixed Toughened Flush Bonded Glass (+₹70,000)</option>
                          <option value="double-glazed-thermal">Double Glazed Acoustic Thermal (+₹1,40,000)</option>
                        </select>
                      </div>

                      {/* Air Conditioning */}
                      <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2">
                        <span className="text-xs font-mono text-[#E29765] block font-bold">Air-Conditioning System:</span>
                        <select
                          value={config.acType}
                          onChange={(e) => updateConfig({ acType: e.target.value as any })}
                          className="w-full bg-[#172638] border border-[#30363D] rounded-lg p-2 text-xs text-white"
                        >
                          <option value="non-ac-blowers">Non-AC Forced Air Blowers</option>
                          <option value="engine-driven-12kw">Engine-Driven 12kW Compressor (+₹2,20,000)</option>
                          <option value="sub-engine-roof-24kw">Sub-Engine 24kW Roof Mounted (+₹4,50,000)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* LORRY CUSTOMIZATION */
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Cargo Length */}
                      <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2">
                        <span className="text-xs font-mono text-[#E29765] block font-bold">Cargo Body Length (Feet):</span>
                        <div className="flex gap-2">
                          {[14, 19, 22, 24, 32].map(ft => (
                            <button
                              key={ft}
                              onClick={() => updateConfig({ cargoLengthFeet: ft })}
                              className={`flex-1 py-1.5 rounded border text-xs font-bold ${
                                config.cargoLengthFeet === ft
                                  ? 'bg-[#B76E3C] text-white border-[#B76E3C]'
                                  : 'bg-[#172638] text-slate-400 border-[#30363D]'
                              }`}
                            >
                              {ft} ft
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Floor Plate */}
                      <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2">
                        <span className="text-xs font-mono text-[#E29765] block font-bold">Floor Plate Construction:</span>
                        <select
                          value={config.floorPlateType}
                          onChange={(e) => updateConfig({ floorPlateType: e.target.value as any })}
                          className="w-full bg-[#172638] border border-[#30363D] rounded-lg p-2 text-xs text-white"
                        >
                          <option value="3.2mm-chequered">3.2mm Standard MS Chequered Plate</option>
                          <option value="4.5mm-heavy-duty-chequered">4.5mm Heavy Duty Quarry Grade</option>
                          <option value="hardwood-timber-reinforced">Hardwood Timber + Steel Runners</option>
                        </select>
                      </div>

                      {/* Side Panel Material */}
                      <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2">
                        <span className="text-xs font-mono text-[#E29765] block font-bold">Side Panel Material:</span>
                        <select
                          value={config.sidePanelMaterial}
                          onChange={(e) => updateConfig({ sidePanelMaterial: e.target.value as any })}
                          className="w-full bg-[#172638] border border-[#30363D] rounded-lg p-2 text-xs text-white"
                        >
                          <option value="tata-steel-flat-sheet">Tata Steel Certified Flat Sheet (1.2mm)</option>
                          <option value="corrugated-ms-sheet">Corrugated Rigid Container Sheet</option>
                          <option value="marine-aluminium">Marine Grade Aluminium (Lightweight)</option>
                        </select>
                      </div>

                      {/* Hydraulics & Tipping */}
                      <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2">
                        <span className="text-xs font-mono text-[#E29765] block font-bold">Tipper Hydraulic Kit:</span>
                        <label className="flex items-center space-x-2 cursor-pointer pt-2">
                          <input
                            type="checkbox"
                            checked={config.tipperHydraulics || config.category === 'Tipper & Dumper Body'}
                            onChange={(e) => updateConfig({ tipperHydraulics: e.target.checked })}
                            className="rounded text-[#B76E3C] focus:ring-0"
                          />
                          <span className="text-xs text-slate-300">Equip Hyva FE 149 / Penta Tipping Cylinder (+₹2,10,000)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 5: MATERIALS & FINISH OPTIONS WITH REAL TRADE-OFFS */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <ShieldCheck className="w-5 h-5 mr-2 text-[#B76E3C]" />
                    Step 5: Material & Finish Engineering Tier
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select material grades. Compare real trade-offs in tare weight, fuel consumption, rust resistance, and maintenance cycles.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {MOCK_MATERIAL_TIERS.map(tier => {
                    const isSelected = config.materialTier === tier.tier;
                    return (
                      <div
                        key={tier.tier}
                        onClick={() => updateConfig({ materialTier: tier.tier as any })}
                        className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
                          isSelected
                            ? 'bg-[#0E1622] border-[#B76E3C] shadow-lg ring-1 ring-[#B76E3C]'
                            : 'bg-[#0E1622]/60 border-[#30363D] hover:border-slate-500'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-mono font-bold text-[#E29765]">{tier.tier} Tier</span>
                            <span className="text-[10px] bg-[#172638] text-slate-300 px-2 py-0.5 rounded border border-[#30363D]">
                              {tier.durabilityYears}y Life
                            </span>
                          </div>
                          <h4 className="font-bold text-white text-sm">{tier.name}</h4>
                          <p className="text-xs text-slate-400">{tier.description}</p>

                          <div className="pt-2 border-t border-[#30363D]/60 space-y-1 text-[11px] font-mono text-slate-300">
                            <div>Steel: <span className="text-white">{tier.steelGrade}</span></div>
                            <div>Paint: <span className="text-white">{tier.paintSystem}</span></div>
                          </div>

                          {/* Pros & Cons Trade-offs */}
                          <div className="pt-2 space-y-1 text-[11px]">
                            <span className="text-[10px] text-[#8EAB98] font-bold block">Key Advantages:</span>
                            {tier.tradeOffs.pros.map((p, i) => (
                              <div key={i} className="text-slate-300 flex items-start">
                                <span className="text-[#8EAB98] mr-1">•</span> {p}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#30363D] text-center">
                          <span className={`text-xs font-bold py-1 px-3 rounded-full inline-block ${
                            isSelected ? 'bg-[#B76E3C] text-white' : 'text-slate-400'
                          }`}>
                            {isSelected ? '✓ Selected Tier' : 'Select This Tier'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 6: LIVE COST BREAKDOWN */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-[#B76E3C]" />
                    Step 6: Live Itemized Cost Breakdown
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Transparent cost calculation computed from realistic Tamil Nadu materials and labor rates.
                  </p>
                </div>

                <div className="bg-[#0E1622] rounded-xl border border-[#30363D] overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#172638] text-slate-400 uppercase font-mono text-[11px]">
                      <tr>
                        <th className="p-3">Manufacturing Component</th>
                        <th className="p-3">Specification Basis</th>
                        <th className="p-3 text-right">Estimated Cost (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#30363D]/60 text-slate-300">
                      <tr>
                        <td className="p-3 font-semibold text-white">Base Frame Fabrication</td>
                        <td className="p-3 text-slate-400">Chassis subframe, cage welding, rollover trusses</td>
                        <td className="p-3 text-right font-mono font-bold text-white">{formatCurrencyINR(estimate.baseFabricationINR)}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-white">Structural Materials</td>
                        <td className="p-3 text-slate-400">{config.materialTier} grade Tata/Jindal steel, sheets</td>
                        <td className="p-3 text-right font-mono font-bold text-white">{formatCurrencyINR(estimate.structuralMaterialsINR)}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-white">Paneling & Paint Finish</td>
                        <td className="p-3 text-slate-400">Exterior skinning, 2K PU bake paint, anti-corrosion primer</td>
                        <td className="p-3 text-right font-mono font-bold text-white">{formatCurrencyINR(estimate.panelingAndFinishINR)}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-white">Interior & Seating / Cargo</td>
                        <td className="p-3 text-slate-400">{config.domain === 'Bus' ? `${config.seatingCapacity} seats, flooring` : `${config.cargoLengthFeet}ft floor, tailgates`}</td>
                        <td className="p-3 text-right font-mono font-bold text-white">{formatCurrencyINR(estimate.interiorAndSeatingINR)}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-white">Electricals & Accessories</td>
                        <td className="p-3 text-slate-400">Harness, LED route boards, safety sensors, cameras</td>
                        <td className="p-3 text-right font-mono font-bold text-white">{formatCurrencyINR(estimate.electricalAndAmenitiesINR)}</td>
                      </tr>
                      {estimate.specializedEquipmentINR > 0 && (
                        <tr>
                          <td className="p-3 font-semibold text-white">Specialized Equipment</td>
                          <td className="p-3 text-slate-400">{config.domain === 'Bus' ? 'AC Compressor Unit' : 'Tipping Hydraulics / Ram'}</td>
                          <td className="p-3 text-right font-mono font-bold text-white">{formatCurrencyINR(estimate.specializedEquipmentINR)}</td>
                        </tr>
                      )}
                      <tr>
                        <td className="p-3 font-semibold text-white">Artisan Labour Charges</td>
                        <td className="p-3 text-slate-400">Karur / Namakkal certified skilled technicians</td>
                        <td className="p-3 text-right font-mono font-bold text-white">{formatCurrencyINR(estimate.labourChargesINR)}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-400">Contingency Allowance ({config.contingencyPercentage}%)</td>
                        <td className="p-3 text-slate-400">Unforeseen steel rate / material buffer</td>
                        <td className="p-3 text-right font-mono text-slate-300">{formatCurrencyINR(estimate.contingencyINR)}</td>
                      </tr>
                      <tr className="bg-[#172638]/60 font-semibold">
                        <td className="p-3 text-white">Subtotal</td>
                        <td className="p-3 text-slate-400">Pre-tax fabrication total</td>
                        <td className="p-3 text-right font-mono text-white">{formatCurrencyINR(estimate.subtotalINR)}</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-slate-400">Applicable GST (18%)</td>
                        <td className="p-3 text-slate-400">Commercial vehicle body GST</td>
                        <td className="p-3 text-right font-mono text-slate-300">{formatCurrencyINR(estimate.taxGST18INR)}</td>
                      </tr>
                      {config.budgetScope === 'chassis-and-body' && (
                        <tr>
                          <td className="p-3 text-slate-400">Chassis Procurement Cost</td>
                          <td className="p-3 text-slate-400">{config.chassis?.brand} {config.chassis?.model}</td>
                          <td className="p-3 text-right font-mono text-slate-300">{formatCurrencyINR(estimate.chassisCostINR)}</td>
                        </tr>
                      )}
                      <tr className="bg-[#0E1622] text-sm font-black border-t-2 border-[#B76E3C]">
                        <td className="p-4 text-white">Total Estimated Build Cost</td>
                        <td className="p-4 text-xs font-mono text-slate-400 font-normal">Indicative Workshop Estimate</td>
                        <td className="p-4 text-right font-mono text-xl text-[#E29765]">{formatCurrencyINR(estimate.totalEstimatedINR)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* STEP 7: SMART BUDGET OPTIMIZER */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <TrendingDown className="w-5 h-5 mr-2 text-[#B76E3C]" />
                    Step 7: Smart Budget Optimizer
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Automated cost-reduction suggestions to align your vehicle build strictly within your ₹{config.targetBudgetINR.toLocaleString('en-IN')} target budget without sacrificing structural safety.
                  </p>
                </div>

                {estimate.isOverBudget ? (
                  <div className="space-y-4">
                    {/* Excess alert */}
                    <div className="bg-rose-950/40 border border-rose-800/60 p-4 rounded-xl flex items-start space-x-3 text-xs">
                      <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block text-sm">
                          Estimate Exceeds Target Budget by {formatCurrencyINR(Math.abs(estimate.budgetDifferenceINR))}
                        </span>
                        <p className="text-rose-200/80 mt-1">
                          The current specifications total {formatCurrencyINR(estimate.totalEstimatedINR)} against your declared budget of {formatCurrencyINR(config.targetBudgetINR)}. Review the intelligent cost-down recommendations below:
                        </p>
                      </div>
                    </div>

                    {/* Suggestions list */}
                    <div className="space-y-3">
                      <span className="text-xs font-mono text-[#E29765] uppercase font-bold block">
                        Recommended Optimizations ({estimate.suggestions.length} Available):
                      </span>

                      {estimate.suggestions.map(sug => (
                        <div
                          key={sug.id}
                          className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-white">{sug.title}</span>
                              <span className="text-[10px] bg-[#6E8878]/20 text-[#8EAB98] font-bold px-2 py-0.5 rounded border border-[#8EAB98]/30">
                                Save {formatCurrencyINR(sug.savingsINR)}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400">{sug.description}</p>
                          </div>

                          <button
                            onClick={() => applyOptimization(sug.applyActionKey)}
                            className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-4 py-2 rounded-lg shrink-0 shadow transition-all"
                          >
                            Apply Optimization
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#6E8878]/20 border border-[#8EAB98]/40 p-6 rounded-xl text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-[#8EAB98] mx-auto" />
                    <h4 className="text-base font-bold text-white">Your Configuration is Within Budget!</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Your estimated build cost of <strong>{formatCurrencyINR(estimate.totalEstimatedINR)}</strong> leaves a favorable buffer of <strong>{formatCurrencyINR(estimate.budgetDifferenceINR)}</strong> under your ₹{config.targetBudgetINR.toLocaleString('en-IN')} cap.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 8: FINAL SUMMARY & RFQ DISPATCH */}
            {currentStep === 8 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <Send className="w-5 h-5 mr-2 text-[#B76E3C]" />
                    Step 8: Final Summary & Workshop RFQ Dispatch
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select verified Tamil Nadu workshops to receive this RFQ. They will review specifications and issue formal itemized quotations.
                  </p>
                </div>

                {/* Printable Summary Card */}
                <div className="bg-[#0E1622] rounded-xl border border-[#30363D] p-5 space-y-4">
                  <div className="flex justify-between items-start border-b border-[#30363D] pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-[#E29765] uppercase">BODYCRAFT TN Specification Sheet</span>
                      <h4 className="text-base font-bold text-white">{config.title}</h4>
                    </div>
                    <button
                      onClick={handlePrint}
                      className="text-xs bg-[#172638] hover:bg-[#1E324A] text-slate-300 px-3 py-1.5 rounded-lg border border-[#30363D] flex items-center space-x-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Summary</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Vehicle Category</span>
                      <span className="text-white font-semibold">{config.category}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Chassis Model</span>
                      <span className="text-white font-semibold">{config.chassis?.model}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Material Tier</span>
                      <span className="text-white font-semibold">{config.materialTier}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Estimated Total</span>
                      <span className="text-[#8EAB98] font-bold">{formatCurrencyINR(estimate.totalEstimatedINR)}</span>
                    </div>
                  </div>
                </div>

                {/* Select Target Workshops */}
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[#E29765] uppercase font-bold block">
                    Select Target Workshops to Receive RFQ (Up to 3):
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {workshopsList.slice(0, 4).map(ws => {
                      const isSelected = selectedWorkshopIds.includes(ws.id);
                      return (
                        <div
                          key={ws.id}
                          onClick={() => toggleTargetWorkshop(ws.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                            isSelected
                              ? 'bg-[#0E1622] border-[#B76E3C] shadow'
                              : 'bg-[#0E1622]/60 border-[#30363D] hover:border-slate-500'
                          }`}
                        >
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-xs font-bold text-white">{ws.name}</span>
                              {ws.verified && <ShieldCheck className="w-3 h-3 text-[#8EAB98]" />}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {ws.district} • {ws.rating}★ • {ws.leadTimeWeeks}w lead
                            </span>
                          </div>

                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                            isSelected ? 'bg-[#B76E3C] text-white' : 'border border-[#30363D]'
                          }`}>
                            {isSelected && '✓'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Customer Note */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#E29765] font-bold block">Additional Instructions or Delivery Deadlines:</span>
                  <textarea
                    rows={3}
                    placeholder="E.g., Require delivery before Diwali festival rush. Route permit already acquired for Chennai-Madurai."
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    className="w-full bg-[#0E1622] border border-[#30363D] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#B76E3C]"
                  />
                </div>
              </div>
            )}

            {/* Wizard Navigation Action Buttons */}
            <div className="pt-4 border-t border-[#30363D] flex justify-between items-center">
              <div>
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="text-xs bg-[#0E1622] hover:bg-[#1E324A] text-slate-300 px-4 py-2 rounded-lg border border-[#30363D] flex items-center space-x-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSaveDraft}
                  className="text-xs text-slate-400 hover:text-white px-3 py-2 flex items-center space-x-1"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save Draft</span>
                </button>

                {currentStep < 8 ? (
                  <button
                    onClick={nextStep}
                    className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow flex items-center space-x-1.5 transition-all"
                  >
                    <span>Next: {stepLabels[currentStep]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitRFQ}
                    className="bg-gradient-to-r from-[#B76E3C] to-[#8E4C1E] hover:from-[#CF8754] hover:to-[#B76E3C] text-white text-xs font-extrabold px-6 py-2.5 rounded-lg shadow-lg flex items-center space-x-2 transition-all"
                  >
                    <Send className="w-4 h-4 text-amber-200" />
                    <span>Submit RFQ to Workshops</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Persistent Sticky Summary Panel (4 Cols) */}
          <div className="lg:col-span-4 bg-[#172638] rounded-xl border border-[#30363D] p-5 space-y-5 sticky top-24 shadow-xl">
            <div className="border-b border-[#30363D] pb-3">
              <span className="text-[10px] font-mono text-[#E29765] uppercase tracking-wider font-bold">
                Live Configuration Summary
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">{config.category}</h3>
            </div>

            {/* Budget vs Estimate Meter */}
            <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Target Budget:</span>
                <span className="text-white font-bold">{formatCurrencyINR(config.targetBudgetINR)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Estimated Total:</span>
                <span className="text-lg font-black text-[#E29765]">{formatCurrencyINR(estimate.totalEstimatedINR)}</span>
              </div>

              {/* Status Badge */}
              <div className="pt-2 border-t border-[#30363D]/60 flex justify-between items-center text-xs">
                <span className="text-slate-400">Status:</span>
                {estimate.isOverBudget ? (
                  <span className="text-[11px] font-bold text-rose-400 bg-rose-950/40 px-2.5 py-0.5 rounded border border-rose-800/60">
                    Over by {formatCurrencyINR(Math.abs(estimate.budgetDifferenceINR))}
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-[#8EAB98] bg-[#6E8878]/20 px-2.5 py-0.5 rounded border border-[#8EAB98]/40">
                    Within Budget (Buffer: {formatCurrencyINR(estimate.budgetDifferenceINR)})
                  </span>
                )}
              </div>
            </div>

            {/* Key Configuration Specs */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-[#30363D]/50">
                <span className="text-slate-400">Domain</span>
                <span className="font-semibold text-white">{config.domain} Body</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#30363D]/50">
                <span className="text-slate-400">Chassis</span>
                <span className="font-semibold text-white text-right line-clamp-1">{config.chassis?.model}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#30363D]/50">
                <span className="text-slate-400">Material Tier</span>
                <span className="font-semibold text-white">{config.materialTier}</span>
              </div>
              {config.domain === 'Bus' ? (
                <>
                  <div className="flex justify-between py-1 border-b border-[#30363D]/50">
                    <span className="text-slate-400">Seats</span>
                    <span className="font-semibold text-white">{config.seatingCapacity} ({config.seatType?.split('-')[0]})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#30363D]/50">
                    <span className="text-slate-400">Glazing</span>
                    <span className="font-semibold text-white">{config.windowType?.split('-')[0]}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between py-1 border-b border-[#30363D]/50">
                    <span className="text-slate-400">Cargo Length</span>
                    <span className="font-semibold text-white">{config.cargoLengthFeet} Feet</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#30363D]/50">
                    <span className="text-slate-400">Floor Plate</span>
                    <span className="font-semibold text-white">{config.floorPlateType}</span>
                  </div>
                </>
              )}
            </div>

            {/* Cost Mini Breakdown */}
            <div className="bg-[#0E1622] p-3 rounded-lg border border-[#30363D] space-y-1.5 text-[11px] font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Fabrication & Frame:</span>
                <span className="text-white">{formatCurrencyINR(estimate.baseFabricationINR)}</span>
              </div>
              <div className="flex justify-between">
                <span>Materials & Panels:</span>
                <span className="text-white">{formatCurrencyINR(estimate.structuralMaterialsINR + estimate.panelingAndFinishINR)}</span>
              </div>
              <div className="flex justify-between">
                <span>Interior / Seating:</span>
                <span className="text-white">{formatCurrencyINR(estimate.interiorAndSeatingINR)}</span>
              </div>
              <div className="flex justify-between">
                <span>Labour & Tax:</span>
                <span className="text-white">{formatCurrencyINR(estimate.labourChargesINR + estimate.taxGST18INR)}</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 text-center">
              * Indicative technical estimate. Non-binding quotation. Workshops confirm final invoice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
