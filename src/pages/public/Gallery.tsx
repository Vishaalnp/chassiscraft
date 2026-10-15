import React, { useState } from 'react';

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const galleryItems = [
    { title: 'Apex Executive Tourist Coach 12M', category: 'Coaches', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800' },
    { title: 'Royal AC Sleeper Coach 30-Berth', category: 'Sleeper', img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800' },
    { title: 'Greenline Academy School Bus 54-Seater', category: 'School', img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800' },
    { title: 'Heavy Duty 10-Wheeler Container Body', category: 'Lorry', img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800' },
    { title: 'Airport Shuttle Deluxe Mini Bus', category: 'Mini Bus', img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800' },
    { title: 'Mobile Medical ICU Clinic Bus', category: 'Special', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800' }
  ];

  const filtered = filter === 'All' ? galleryItems : galleryItems.filter(g => g.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-100">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-widest text-rose-500 font-semibold bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/50">
          Built Vehicles Portfolio
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Bodycraft Vehicle Gallery</h1>
        <p className="text-slate-400 text-sm">Real completed customer builds delivered from our manufacturing facility.</p>
      </div>

      <div className="flex justify-center space-x-2">
        {['All', 'Coaches', 'Sleeper', 'School', 'Lorry', 'Special'].map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
              filter === c ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-rose-500/50 transition-all">
            <div className="h-56 relative overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-mono bg-rose-600 text-white px-2 py-0.5 rounded">{item.category}</span>
                <h3 className="text-sm font-bold text-white mt-1">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
