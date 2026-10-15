import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { formatCurrencyINR, formatDate } from '../../utils/formatters';
import { 
  Wrench, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Camera, 
  CreditCard, 
  AlertTriangle, 
  Building2, 
  ChevronRight, 
  Layers, 
  Eye, 
  UserCheck,
  Calendar,
  Truck
} from 'lucide-react';
import { Project, ManufacturingStage } from '../../types';

export const ProjectTracking: React.FC = () => {
  const { projectsList } = useApp();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectsList[0]?.id || '');
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState<string | null>(null);

  const activeProject = projectsList.find(p => p.id === selectedProjectId) || projectsList[0];

  if (!activeProject) {
    return (
      <div className="bg-[#172638] border border-[#30363D] rounded-2xl p-12 text-center text-slate-400 text-xs space-y-3">
        <Truck className="w-12 h-12 text-[#B76E3C] mx-auto opacity-70" />
        <h3 className="text-base font-bold text-white">No active manufacturing builds found</h3>
        <p>Once you accept a workshop quotation, live 15-stage fabrication tracking will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-[#F5F2EB]">
      {/* Project Switcher Bar if multiple projects exist */}
      {projectsList.length > 1 && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 shrink-0 font-mono">Active Builds:</span>
          {projectsList.map(proj => (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`px-3 py-1.5 rounded-lg border font-semibold shrink-0 transition-all ${
                proj.id === activeProject.id
                  ? 'bg-[#B76E3C] text-white border-[#B76E3C] shadow'
                  : 'bg-[#172638] text-slate-300 border-[#30363D] hover:bg-[#1E324A]'
              }`}
            >
              {proj.projectCode} • {proj.vehicleTitle}
            </button>
          ))}
        </div>
      )}

      {/* Main Project Header Card */}
      <div className="bg-[#172638] border border-[#30363D] p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#E29765]">
            <span className="w-2 h-2 rounded-full bg-[#8EAB98] animate-ping" />
            <span>LIVE 15-STAGE MANUFACTURING WORKFLOW</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">{activeProject.vehicleTitle}</h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
            <span>Project: <strong className="text-white font-mono">{activeProject.projectCode}</strong></span>
            <span>•</span>
            <span className="flex items-center text-white">
              <Building2 className="w-3.5 h-3.5 mr-1 text-[#B76E3C]" />
              {activeProject.workshopName}
            </span>
            <span>•</span>
            <span>Chassis: <strong className="text-white">{activeProject.chassisBrandModel}</strong></span>
            <span>•</span>
            <span>VIN: <strong className="text-white font-mono">{activeProject.chassisVin}</strong></span>
          </div>
        </div>

        <div className="bg-[#0E1622] px-5 py-3 rounded-xl border border-[#30363D] text-left sm:text-right">
          <span className="text-[10px] text-slate-400 font-mono block">Target Handover Date</span>
          <span className="text-[#8EAB98] font-bold font-mono text-base">{formatDate(activeProject.targetDeliveryDate)}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Contract: {formatCurrencyINR(activeProject.contractAmountINR)}</span>
        </div>
      </div>

      {/* Progress Metric & Overall Bar */}
      <div className="bg-[#172638] border border-[#30363D] rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-slate-300">Overall Fabrication & Inspection Progress</span>
          <span className="text-[#E29765] font-black text-lg">{activeProject.overallProgressPercentage}% Completed</span>
        </div>

        <div className="w-full bg-[#0E1622] h-4 rounded-full overflow-hidden p-0.5 border border-[#30363D]">
          <div
            className="bg-gradient-to-r from-[#B76E3C] via-[#CF8754] to-[#8EAB98] h-full rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${activeProject.overallProgressPercentage}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
          <span>Started: {formatDate(activeProject.startDate)}</span>
          <span>Stage {activeProject.currentStageIndex + 1} of 15 Active</span>
          <span>Target: {formatDate(activeProject.targetDeliveryDate)}</span>
        </div>
      </div>

      {/* 15-Stage Detailed Inspection List */}
      <div className="bg-[#172638] border border-[#30363D] rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b border-[#30363D] pb-3">
          <h3 className="text-base font-bold text-white flex items-center">
            <Layers className="w-4 h-4 mr-2 text-[#B76E3C]" />
            15-Stage Detailed Manufacturing Log
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            {activeProject.stages.filter(s => s.status === 'completed').length} / 15 Stages Cleared
          </span>
        </div>

        <div className="space-y-3">
          {activeProject.stages.map((stg) => {
            const isCompleted = stg.status === 'completed';
            const isInProgress = stg.status === 'in-progress';
            const isDelayed = stg.status === 'delayed';

            return (
              <div
                key={stg.id}
                className={`p-4 rounded-xl border transition-all ${
                  isCompleted ? 'bg-[#6E8878]/10 border-[#8EAB98]/40' :
                  isInProgress ? 'bg-[#B76E3C]/10 border-[#B76E3C] ring-1 ring-[#B76E3C]/40' :
                  isDelayed ? 'bg-rose-950/20 border-rose-800/60' :
                  'bg-[#0E1622]/60 border-[#30363D] opacity-75'
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold ${
                      isCompleted ? 'bg-[#8EAB98] text-[#0E1622]' :
                      isInProgress ? 'bg-[#B76E3C] text-white animate-pulse' :
                      isDelayed ? 'bg-rose-600 text-white' :
                      'bg-[#172638] text-slate-400 border border-[#30363D]'
                    }`}>
                      {stg.stageNumber}
                    </span>
                    <div>
                      <h4 className={`text-sm font-bold ${isCompleted || isInProgress ? 'text-white' : 'text-slate-400'}`}>
                        {stg.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="flex items-center">
                          <UserCheck className="w-3 h-3 mr-1 text-slate-500" />
                          {stg.assignedStaff}
                        </span>
                        {stg.startDate && (
                          <span>• Started: {formatDate(stg.startDate)}</span>
                        )}
                        {stg.completionDate && (
                          <span>• Done: {formatDate(stg.completionDate)}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold uppercase ${
                      isCompleted ? 'bg-[#6E8878]/30 text-[#8EAB98] border border-[#8EAB98]/50' :
                      isInProgress ? 'bg-[#B76E3C]/30 text-[#E29765] border border-[#B76E3C]' :
                      isDelayed ? 'bg-rose-900/40 text-rose-300 border border-rose-700' :
                      'bg-[#172638] text-slate-500 border border-[#30363D]'
                    }`}>
                      {stg.status}
                    </span>
                  </div>
                </div>

                {/* Notes & Delay notice */}
                {stg.notes && (
                  <p className="text-xs text-slate-300 mt-2 pl-9 bg-[#0E1622]/40 p-2 rounded-lg border border-[#30363D]/40">
                    {stg.notes}
                  </p>
                )}

                {isDelayed && stg.delayReason && (
                  <div className="mt-2 pl-9 flex items-center text-xs text-rose-300 bg-rose-950/30 p-2 rounded-lg border border-rose-900/50">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-rose-400 shrink-0" />
                    <span>Delay Notice: {stg.delayReason}</span>
                  </div>
                )}

                {/* Photos if any */}
                {stg.photos && stg.photos.length > 0 && (
                  <div className="mt-3 pl-9 flex items-center space-x-2">
                    <span className="text-[10px] text-slate-400 font-mono">Factory Photos:</span>
                    {stg.photos.map((ph, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPreviewPhotoUrl(ph)}
                        className="w-12 h-9 rounded-md overflow-hidden border border-[#30363D] hover:border-[#B76E3C] transition-all relative group"
                      >
                        <img src={ph} alt="Stage progress" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent flex items-center justify-center">
                          <Eye className="w-3 h-3 text-white" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Milestones Card */}
      <div className="bg-[#172638] border border-[#30363D] rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center">
          <CreditCard className="w-4 h-4 mr-2 text-[#B76E3C]" />
          Project Payment Schedule
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {activeProject.paymentMilestones.map(mile => (
            <div key={mile.id} className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-[10px] font-mono">{mile.percentage}% Milestone</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  mile.status === 'Paid' ? 'bg-[#6E8878]/30 text-[#8EAB98]' : 'bg-[#172638] text-slate-400'
                }`}>
                  {mile.status}
                </span>
              </div>
              <h4 className="font-bold text-white text-xs">{mile.title}</h4>
              <div className="text-sm font-black text-[#E29765] font-mono">
                {formatCurrencyINR(mile.amountINR)}
              </div>
              {mile.paidDate && (
                <span className="text-[10px] text-slate-500 block">Cleared: {formatDate(mile.paidDate)}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Photo Preview Lightbox */}
      {previewPhotoUrl && (
        <div 
          onClick={() => setPreviewPhotoUrl(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="max-w-3xl w-full bg-[#172638] rounded-xl overflow-hidden border border-[#30363D]">
            <img src={previewPhotoUrl} alt="Factory inspection" className="w-full max-h-[80vh] object-contain" />
            <div className="p-3 bg-[#0E1622] text-xs text-center text-slate-400">
              Verified Production Photo • Click anywhere to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
