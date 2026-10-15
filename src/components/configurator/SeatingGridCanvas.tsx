import React, { useState } from 'react';
import { SeatConfig } from '../../types';
import { UserCheck, Plus, Trash2, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

interface SeatingGridCanvasProps {
  seats: SeatConfig[];
  seatingLayout: '2+1' | '2+2' | '3+2' | 'sleeper-hybrid' | 'executive-lounge';
  onSeatsChange: (seats: SeatConfig[]) => void;
  onLayoutChange: (layout: '2+1' | '2+2' | '3+2' | 'sleeper-hybrid' | 'executive-lounge') => void;
}

export const SeatingGridCanvas: React.FC<SeatingGridCanvasProps> = ({
  seats,
  seatingLayout,
  onSeatsChange,
  onLayoutChange
}) => {
  const [selectedSeatType, setSelectedSeatType] = useState<SeatConfig['type']>('pushback');
  const [selectedSeatMaterial, setSelectedSeatMaterial] = useState<SeatConfig['material']>('synthetic-leather');

  const generatePresetLayout = (layout: typeof seatingLayout) => {
    onLayoutChange(layout);
    let count = 36;
    if (layout === '2+1') count = 27;
    if (layout === '3+2') count = 54;
    if (layout === 'sleeper-hybrid') count = 30;
    if (layout === 'executive-lounge') count = 20;

    const newSeats: SeatConfig[] = Array.from({ length: count }, (_, i) => ({
      id: `seat-${i + 1}`,
      number: `S${i + 1}`,
      row: Math.floor(i / (layout === '2+1' ? 3 : (layout === '3+2' ? 5 : 4))) + 1,
      col: (i % (layout === '2+1' ? 3 : (layout === '3+2' ? 5 : 4))) + 1,
      type: layout === 'sleeper-hybrid' ? (i % 2 === 0 ? 'sleeper-lower' : 'sleeper-upper') : selectedSeatType,
      material: selectedSeatMaterial,
      priceINR: layout === 'sleeper-hybrid' ? 14000 : 5500
    }));

    onSeatsChange(newSeats);
  };

  const handleSeatClick = (seatId: string) => {
    // Toggle seat configuration or remove/type update
    const updated = seats.map(s => {
      if (s.id === seatId) {
        return {
          ...s,
          type: selectedSeatType,
          material: selectedSeatMaterial
        };
      }
      return s;
    });
    onSeatsChange(updated);
  };

  const handleAddSeat = () => {
    const nextNum = seats.length + 1;
    const newSeat: SeatConfig = {
      id: `seat-${Date.now()}`,
      number: `S${nextNum}`,
      row: Math.ceil(nextNum / 4),
      col: (nextNum % 4) || 4,
      type: selectedSeatType,
      material: selectedSeatMaterial,
      priceINR: 5500
    };
    onSeatsChange([...seats, newSeat]);
  };

  const handleRemoveSeat = () => {
    if (seats.length > 5) {
      onSeatsChange(seats.slice(0, seats.length - 1));
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Layout Presets Selection */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center">
          <Sparkles className="w-5 h-5 text-amber-400 mr-2" /> Select Seating Layout Matrix
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {(['2+2', '2+1', '3+2', 'sleeper-hybrid', 'executive-lounge'] as const).map((lay) => (
            <button
              key={lay}
              onClick={() => generatePresetLayout(lay)}
              className={`p-3 rounded-xl border text-xs font-mono font-bold transition-all ${
                seatingLayout === lay
                  ? 'bg-rose-600 text-white border-rose-500 shadow-lg'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="uppercase">{lay.replace('-', ' ')}</div>
              <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                {lay === '2+2' ? '36-45 Seats' : (lay === '2+1' ? '27 Luxury' : (lay === '3+2' ? '54 Transit' : (lay === 'sleeper-hybrid' ? '30 Berths' : '20 Lounge')))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Seat Type & Material Tool Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs font-mono">
        <div>
          <label className="block text-slate-400 mb-1">Active Seat Type Brush:</label>
          <select
            value={selectedSeatType}
            onChange={(e) => setSelectedSeatType(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white outline-none focus:border-rose-500"
          >
            <option value="pushback">Push-Back Executive Recliner (₹5,500)</option>
            <option value="standard">Standard High-Back Fixed (₹3,200)</option>
            <option value="recliner">Luxury 160° Deep Recliner (₹8,500)</option>
            <option value="sleeper-lower">Lower AC Sleeper Berth (₹14,000)</option>
            <option value="sleeper-upper">Upper AC Sleeper Berth (₹12,500)</option>
            <option value="wheelchair">Wheelchair Accessible Bay (₹0)</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 mb-1">Seat Material Upholstery:</label>
          <select
            value={selectedSeatMaterial}
            onChange={(e) => setSelectedSeatMaterial(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white outline-none focus:border-rose-500"
          >
            <option value="synthetic-leather">Breathable PU Synthetic Leather</option>
            <option value="leather">Genuine Automotive Leather</option>
            <option value="fabric">Fire-Retardant Velvet Fabric</option>
          </select>
        </div>
      </div>

      {/* Interactive Seating Layout Canvas */}
      <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="text-white font-bold">Passenger Seats: <strong className="text-rose-400 text-sm">{seats.length}</strong></span>
            <span>•</span>
            <span className="text-slate-400">Driver & Conductor Cab Included</span>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleAddSeat}
              className="bg-slate-800 hover:bg-slate-700 text-emerald-400 font-mono text-xs px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Seat</span>
            </button>
            <button
              onClick={handleRemoveSeat}
              className="bg-slate-800 hover:bg-slate-700 text-rose-400 font-mono text-xs px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove Seat</span>
            </button>
          </div>
        </div>

        {/* Bus Floor Seating Visual Grid */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 relative overflow-x-auto">
          {/* Driver Cabin Area */}
          <div className="flex justify-between items-center bg-slate-950 border border-slate-800 p-3 rounded-lg mb-6 text-xs font-mono text-slate-400">
            <div className="flex items-center space-x-2 text-rose-400 font-bold">
              <span>[DRIVING CABIN & STEERING WHEEL]</span>
            </div>
            <div className="text-emerald-400 font-bold">
              FRONT ENTRANCE PNEUMATIC DOOR ➔
            </div>
          </div>

          {/* Seat Grid Map */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9 gap-3">
            {seats.map((seat, index) => (
              <div
                key={seat.id}
                onClick={() => handleSeatClick(seat.id)}
                className={`p-3 rounded-xl border text-center cursor-pointer transition-all hover:scale-105 ${
                  seat.type.includes('sleeper')
                    ? 'bg-amber-950/60 border-amber-700 text-amber-300'
                    : (seat.type === 'recliner'
                        ? 'bg-rose-950/60 border-rose-700 text-rose-300'
                        : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500')
                }`}
              >
                <div className="text-xs font-mono font-black">{seat.number}</div>
                <div className="text-[9px] font-mono text-slate-400 truncate capitalize mt-0.5">
                  {seat.type.replace('-', ' ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
