import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { Wrench, CheckCircle2, Save, ArrowRight } from 'lucide-react';

export const ProductionTracking: React.FC = () => {
  const { projectsList, updateProjectProgress } = useApp();
  const [selectedProject, setSelectedProject] = useState(projectsList[0] || null);
  const [selectedStage, setSelectedStage] = useState(selectedProject?.stages[0]?.name || '');
  const [progressVal, setProgressVal] = useState(50);
  const [stageNotes, setStageNotes] = useState('');

  const handleUpdate = () => {
    if (!selectedProject || !selectedStage) return;
    updateProjectProgress(selectedProject.id, selectedStage, progressVal, stageNotes);
    alert(`Updated stage "${selectedStage}" progress to ${progressVal}%`);
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h1 className="text-2xl font-black text-white">Factory Assembly Stage Controller</h1>
        <p className="text-slate-400 text-xs mt-1">Update real-time manufacturing stage progress %, log inspection notes, and trigger stage completions.</p>
      </div>

      {selectedProject && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Active Production Order: {selectedProject.projectCode}</h2>
            <p className="text-xs text-slate-400">{selectedProject.vehicleTitle} ({selectedProject.chassisBrandModel})</p>

            <div className="space-y-3 pt-2">
              {selectedProject.stages.map((stg) => (
                <div
                  key={stg.id}
                  onClick={() => {
                    setSelectedStage(stg.name);
                    setProgressVal(stg.completionPercentage);
                    setStageNotes(stg.notes || '');
                  }}
                  className={`p-3 rounded-xl border cursor-pointer font-mono text-xs flex justify-between items-center ${
                    selectedStage === stg.name
                      ? 'bg-rose-950/60 border-rose-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="truncate pr-2 font-medium">#{stg.stageNumber} {stg.name}</span>
                  <span className="font-bold text-amber-400 shrink-0">{stg.completionPercentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Update Stage: {selectedStage}</h2>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Stage Progress Percentage ({progressVal}%):</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={10}
                  value={progressVal}
                  onChange={(e) => setProgressVal(Number(e.target.value))}
                  className="w-full accent-rose-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Quality Inspection Log / Notes:</label>
                <textarea
                  rows={4}
                  value={stageNotes}
                  onChange={(e) => setStageNotes(e.target.value)}
                  placeholder="E.g., Rollover cage weld stress test cleared; epoxy primer applied in paint bay..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-rose-500"
                />
              </div>

              <button
                onClick={handleUpdate}
                className="w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Stage Progress</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
