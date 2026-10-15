import React from 'react';
import { useApp } from '../../store/AppContext';
import { useConfigurator } from '../../store/ConfiguratorContext';
import { formatCurrencyINR, formatDate } from '../../utils/formatters';
import { Truck, Sparkles, Trash2, Edit, FileText, ArrowRight } from 'lucide-react';

interface MyVehiclesProps {
  setActiveTab: (tab: string) => void;
}

export const MyVehicles: React.FC<MyVehiclesProps> = ({ setActiveTab }) => {
  const { savedDesigns, deleteSavedDesign, createQuoteRequest } = useApp();
  const { loadConfig } = useConfigurator();

  const handleEdit = (design: typeof savedDesigns[0]) => {
    loadConfig(design);
    setActiveTab('budget-planner');
  };

  const handleRequestQuote = (design: typeof savedDesigns[0]) => {
    createQuoteRequest({
      customerId: 'cust-01',
      customerName: 'M. Selvakumar',
      customerPhone: '+91 94431 82910',
      customerEmail: 'selvakumar@vetritravels.demo.in',
      customerCompany: 'Vetri Intercity Travels',
      targetWorkshops: ['ws-karur-01'],
      configuration: design,
      targetBudgetINR: design.targetBudgetINR,
      customerNotes: 'Quotation request submitted from My Saved Vehicles dashboard.'
    });
    setActiveTab('quotation-tracker');
  };

  return (
    <div className="space-y-6 text-[#F5F2EB]">
      <div className="flex justify-between items-center bg-[#172638] border border-[#30363D] p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-black text-white">My Saved Vehicle Designs</h1>
          <p className="text-slate-400 text-xs mt-1">Review saved configurations, resume editing, or request official factory quotations.</p>
        </div>
        <button
          onClick={() => setActiveTab('budget-planner')}
          className="bg-gradient-to-r from-[#B76E3C] to-[#8E4C1E] hover:from-[#CF8754] hover:to-[#B76E3C] text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>New Design</span>
        </button>
      </div>

      {savedDesigns.length === 0 ? (
        <div className="bg-[#172638] border border-[#30363D] rounded-2xl p-12 text-center space-y-4">
          <Truck className="w-12 h-12 text-slate-600 mx-auto" />
          <h2 className="text-lg font-bold text-white">No Saved Vehicle Designs Yet</h2>
          <p className="text-slate-400 text-xs max-w-md mx-auto">
            Use our 8-step interactive configurator to select a chassis, design layout, customize materials, and save your build.
          </p>
          <button
            onClick={() => setActiveTab('budget-planner')}
            className="bg-[#B76E3C] hover:bg-[#CF8754] text-white font-bold px-5 py-2.5 rounded-xl text-xs inline-flex items-center space-x-2"
          >
            <span>Launch Vehicle Planner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedDesigns.map((design) => (
            <div key={design.id} className="bg-[#172638] border border-[#30363D] rounded-2xl p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono text-[#E29765] font-bold uppercase">{design.category}</span>
                    <h2 className="text-lg font-bold text-white">{design.title}</h2>
                  </div>
                  <button
                    onClick={() => deleteSavedDesign(design.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-[#0E1622]"
                    title="Delete Design"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-[#0E1622] p-3 rounded-xl border border-[#30363D] font-mono">
                  <div>
                    <span className="text-slate-500 block">Chassis Model</span>
                    <span className="text-white font-semibold">{design.chassis?.model || 'Custom'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Domain / Tier</span>
                    <span className="text-white font-semibold">{design.domain} • {design.materialTier}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Target Budget</span>
                    <span className="text-[#8EAB98] font-semibold">{formatCurrencyINR(design.targetBudgetINR)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Est. Cost</span>
                    <span className="text-[#E29765] font-bold">{formatCurrencyINR(design.costBreakdown?.totalEstimatedINR || design.targetBudgetINR)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-3 border-t border-[#30363D]">
                <button
                  onClick={() => handleEdit(design)}
                  className="flex-1 bg-[#0E1622] hover:bg-[#1E324A] text-slate-200 font-semibold py-2 rounded-xl text-xs flex items-center justify-center space-x-1 border border-[#30363D]"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit in Wizard</span>
                </button>
                <button
                  onClick={() => handleRequestQuote(design)}
                  className="flex-1 bg-[#B76E3C] hover:bg-[#CF8754] text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1 shadow"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Request Quote</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
