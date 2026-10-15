import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Filter, 
  ArrowRightLeft, 
  Clock, 
  Phone, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  Truck, 
  Sparkles, 
  Compass, 
  SlidersHorizontal,
  X,
  Layers,
  ChevronRight,
  Eye
} from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { Workshop, TamilNaduDistrict, VehicleDomain } from '../../types';
import { formatCurrencyINR } from '../../utils/formatters';

interface FindWorkshopsProps {
  setActiveTab: (tab: string) => void;
  onSelectWorkshop?: (workshop: Workshop) => void;
}

export const FindWorkshops: React.FC<FindWorkshopsProps> = ({ setActiveTab, onSelectWorkshop }) => {
  const { workshopsList, comparisonWorkshopIds, toggleCompareWorkshop } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<number>(3000000);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedWorkshopForModal, setSelectedWorkshopForModal] = useState<Workshop | null>(null);
  const [activeMapDistrict, setActiveMapDistrict] = useState<string | null>(null);

  const districts: (TamilNaduDistrict | 'All')[] = [
    'All',
    'Karur',
    'Namakkal',
    'Coimbatore',
    'Salem',
    'Chennai',
    'Erode',
    'Tiruchirappalli',
    'Madurai'
  ];

  const specializationsList = [
    'All',
    'Tourist & Luxury Coaches',
    'Sleeper Coaches (2+1)',
    'Mofussil & Route Buses',
    'School & College Buses',
    'Tipper & Dumper Bodies',
    'Container & Closed Cargo Bodies',
    'Open-Body Heavy Lorries',
    'Refrigerated & Insulated Bodies'
  ];

  // Filter workshops
  const filteredWorkshops = useMemo(() => {
    return workshopsList.filter(ws => {
      // Search
      const matchesSearch = 
        ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ws.town.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ws.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ws.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      // District
      const matchesDistrict = selectedDistrict === 'All' || ws.district === selectedDistrict;

      // Domain
      const matchesDomain = selectedDomain === 'All' || ws.vehicleDomain === selectedDomain || ws.vehicleDomain === 'Both';

      // Specialization
      const matchesSpec = selectedSpecialization === 'All' || ws.specializations.some(s => s.includes(selectedSpecialization));

      // Verified
      const matchesVerified = !verifiedOnly || ws.verified;

      // Rating
      const matchesRating = ws.rating >= minRating;

      // Budget
      const matchesBudget = ws.indicativePriceRange.minINR <= maxBudget;

      return matchesSearch && matchesDistrict && matchesDomain && matchesSpec && matchesVerified && matchesRating && matchesBudget;
    });
  }, [workshopsList, searchQuery, selectedDistrict, selectedDomain, selectedSpecialization, verifiedOnly, minRating, maxBudget]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedDistrict('All');
    setSelectedDomain('All');
    setSelectedSpecialization('All');
    setVerifiedOnly(false);
    setMinRating(0);
    setMaxBudget(3000000);
  };

  return (
    <div className="min-h-screen bg-[#0E1622] text-[#F5F2EB] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="border-b border-[#30363D] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#E29765] uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4 text-[#B76E3C]" />
              <span>Tamil Nadu Commercial Bodybuilding Marketplace</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Find Verified Bus & Lorry Workshops
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Explore reputable coachbuilders and heavy fabrication yards in Karur, Namakkal, Coimbatore, and Chennai. Check ARAI certifications, customer ratings, indicative lead times, and compare up to 3 workshops.
            </p>
          </div>

          {/* View Mode Toggle and Compare Pill */}
          <div className="flex items-center space-x-3">
            {comparisonWorkshopIds.length > 0 && (
              <button
                onClick={() => setActiveTab('compare-workshops')}
                className="flex items-center space-x-2 bg-[#6E8878]/20 border border-[#8EAB98] hover:bg-[#6E8878]/30 text-[#8EAB98] px-4 py-2 rounded-lg text-xs font-bold transition-all shadow"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>Compare Selected ({comparisonWorkshopIds.length}/3)</span>
              </button>
            )}

            <div className="flex bg-[#172638] p-1 rounded-lg border border-[#30363D]">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  viewMode === 'grid' ? 'bg-[#B76E3C] text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  viewMode === 'map' ? 'bg-[#B76E3C] text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                District Map
              </button>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#172638] rounded-xl p-5 border border-[#30363D] shadow-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Search workshop name, town, or specialization (e.g., Karur sleeper, Namakkal tipper)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#B76E3C]"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* District Dropdown */}
            <div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#B76E3C]"
              >
                <option value="All">All Tamil Nadu Districts</option>
                {districts.filter(d => d !== 'All').map(d => (
                  <option key={d} value={d}>District: {d}</option>
                ))}
              </select>
            </div>

            {/* Vehicle Type Dropdown */}
            <div>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full bg-[#0E1622] border border-[#30363D] rounded-lg px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#B76E3C]"
              >
                <option value="All">Vehicle Domain: All</option>
                <option value="Bus">Bus Body Building (Coaches, Route, School)</option>
                <option value="Lorry">Lorry & Truck Bodies (Tippers, Cargo)</option>
              </select>
            </div>
          </div>

          {/* Secondary Filters */}
          <div className="pt-3 border-t border-[#30363D]/60 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              {/* Specialization Filter */}
              <div className="flex items-center space-x-1.5">
                <span className="text-slate-400 text-[11px]">Specialization:</span>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="bg-[#0E1622] border border-[#30363D] rounded px-2 py-1 text-xs text-slate-300"
                >
                  {specializationsList.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Verified Only Toggle */}
              <label className="flex items-center space-x-2 cursor-pointer bg-[#0E1622] px-2.5 py-1 rounded border border-[#30363D]">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-[#B76E3C] focus:ring-0"
                />
                <span className="text-slate-300 flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#8EAB98]" /> Verified Only
                </span>
              </label>

              {/* Min Rating */}
              <div className="flex items-center space-x-1.5 bg-[#0E1622] px-2.5 py-1 rounded border border-[#30363D]">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-slate-400 text-[11px]">Rating:</span>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="bg-transparent text-xs text-slate-200 outline-none"
                >
                  <option value={0} className="bg-[#172638]">Any Rating</option>
                  <option value={4.5} className="bg-[#172638]">4.5+ Stars</option>
                  <option value={4.8} className="bg-[#172638]">4.8+ Stars</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-slate-400 text-[11px]">
                Showing <strong className="text-white">{filteredWorkshops.length}</strong> workshops
              </span>
              {(searchQuery || selectedDistrict !== 'All' || selectedDomain !== 'All' || selectedSpecialization !== 'All' || verifiedOnly || minRating > 0) && (
                <button
                  onClick={clearAllFilters}
                  className="text-[#E29765] hover:underline text-[11px] font-semibold"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* View Mode: Map View */}
        {viewMode === 'map' && (
          <div className="bg-[#172638] rounded-xl p-6 border border-[#30363D] shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#30363D] pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-[#B76E3C]" />
                  Tamil Nadu Automotive Bodybuilding Clusters Map
                </h3>
                <p className="text-xs text-slate-400">
                  Click on an industrial cluster below to view onboarded coachbuilders and heavy fabrication yards.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#8EAB98] bg-[#6E8878]/15 px-2.5 py-1 rounded border border-[#8EAB98]/30">
                Hub Coordinates Verified
              </span>
            </div>

            {/* Interactive Cluster Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { name: 'Karur', specialty: 'Bus Coaches & Sleepers', count: 1, lat: '10.96° N', lng: '78.07° E' },
                { name: 'Namakkal', specialty: 'Heavy Tippers & Lorries', count: 1, lat: '11.21° N', lng: '78.16° E' },
                { name: 'Coimbatore', specialty: 'School & Staff Buses', count: 1, lat: '10.92° N', lng: '76.98° E' },
                { name: 'Salem', specialty: 'Route Buses & Dropsides', count: 1, lat: '11.63° N', lng: '78.14° E' },
                { name: 'Madurai', specialty: 'Tourist & Reefer Boxes', count: 1, lat: '9.87° N', lng: '78.03° E' },
                { name: 'Chennai', specialty: 'Urban Transit & Cargo', count: 1, lat: '13.08° N', lng: '80.16° E' }
              ].map(cluster => (
                <button
                  key={cluster.name}
                  onClick={() => {
                    setSelectedDistrict(cluster.name);
                    setActiveMapDistrict(cluster.name);
                    setViewMode('grid');
                  }}
                  className="bg-[#0E1622] hover:bg-[#1E324A] border border-[#30363D] hover:border-[#B76E3C] rounded-lg p-3 text-left transition-all group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white group-hover:text-[#E29765] text-sm">{cluster.name}</span>
                    <span className="w-2 h-2 rounded-full bg-[#8EAB98]" />
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">{cluster.specialty}</div>
                  <div className="mt-2 text-[10px] font-mono text-[#B76E3C]">
                    {cluster.lat}, {cluster.lng}
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-[#0E1622] rounded-lg p-4 border border-[#30363D] text-xs text-slate-400 flex items-center justify-between">
              <span>Looking for workshops in other districts like Tiruchirappalli, Erode, Tiruppur, or Dindigul?</span>
              <button 
                onClick={() => setViewMode('grid')}
                className="text-[#E29765] hover:text-white font-semibold underline ml-2"
              >
                Browse All in Grid View →
              </button>
            </div>
          </div>
        )}

        {/* View Mode: Workshop Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkshops.map(workshop => {
              const isComparing = comparisonWorkshopIds.includes(workshop.id);

              return (
                <div
                  key={workshop.id}
                  className="bg-[#172638] rounded-xl border border-[#30363D] hover:border-[#B76E3C]/60 transition-all shadow-lg flex flex-col justify-between overflow-hidden group"
                >
                  {/* Top Cover & Badges */}
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                      <img
                        src={workshop.coverImage}
                        alt={workshop.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#172638] via-transparent to-black/40" />

                      {/* District & Domain badge */}
                      <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                        <span className="bg-[#0E1622]/90 backdrop-blur-sm text-white font-bold text-[11px] px-2.5 py-1 rounded-md border border-white/10 flex items-center">
                          <MapPin className="w-3 h-3 mr-1 text-[#B76E3C]" />
                          {workshop.district}
                        </span>
                        <span className="bg-[#B76E3C] text-white font-semibold text-[10px] px-2 py-1 rounded-md shadow">
                          {workshop.vehicleDomain === 'Both' ? 'Bus & Lorry' : `${workshop.vehicleDomain} Body`}
                        </span>
                      </div>

                      {/* Verified Badge */}
                      {workshop.verified && (
                        <div className="absolute top-3 right-3 bg-[#6E8878] text-white font-bold text-[10px] px-2.5 py-1 rounded-md shadow flex items-center">
                          <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                          <span>ARAI Verified</span>
                        </div>
                      )}

                      {/* Rating bar at bottom of image */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                        <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="font-bold">{workshop.rating}</span>
                          <span className="text-slate-400 text-[10px]">({workshop.reviewCount} reviews)</span>
                        </div>
                        <div className="text-[11px] text-slate-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded">
                          Est. {workshop.establishedYear}
                        </div>
                      </div>
                    </div>

                    {/* Workshop Info */}
                    <div className="p-5 space-y-3">
                      <div>
                        <h2 className="text-lg font-bold text-white group-hover:text-[#E29765] transition-colors">
                          {workshop.name}
                        </h2>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {workshop.tagline}
                        </p>
                      </div>

                      {/* Specializations Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {workshop.specializations.slice(0, 3).map((spec, i) => (
                          <span
                            key={i}
                            className="bg-[#0E1622] text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-[#30363D]"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      {/* Key Specs */}
                      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#30363D]/60 text-slate-300">
                        <div>
                          <span className="text-slate-500 text-[10px] block">Indicative Range</span>
                          <span className="font-semibold text-white">
                            {formatCurrencyINR(workshop.indicativePriceRange.minINR)} - {formatCurrencyINR(workshop.indicativePriceRange.maxINR)}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">Turnaround / Warranty</span>
                          <span className="font-semibold text-white">
                            {workshop.leadTimeWeeks} wks • {workshop.warrantyMonths}m warranty
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-4 bg-[#0E1622]/60 border-t border-[#30363D] flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleCompareWorkshop(workshop.id)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium flex items-center space-x-1.5 transition-all ${
                        isComparing 
                          ? 'bg-[#6E8878]/30 border-[#8EAB98] text-[#8EAB98]' 
                          : 'border-[#30363D] hover:bg-[#172638] text-slate-300'
                      }`}
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedWorkshopForModal(workshop)}
                        className="text-xs px-3 py-1.5 rounded-lg border border-[#30363D] hover:border-[#B76E3C] hover:text-[#E29765] text-slate-300 font-medium transition-all"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => {
                          if (onSelectWorkshop) onSelectWorkshop(workshop);
                          setActiveTab('budget-planner');
                        }}
                        className="text-xs bg-[#B76E3C] hover:bg-[#CF8754] text-white px-3 py-1.5 rounded-lg font-bold shadow transition-all flex items-center space-x-1"
                      >
                        <span>Request Quote</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredWorkshops.length === 0 && (
          <div className="bg-[#172638] rounded-xl p-12 text-center border border-[#30363D] space-y-4">
            <Truck className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No workshops matched your filters</h3>
            <p className="text-slate-400 text-xs max-w-md mx-auto">
              Try broadening your search or resetting the district and budget filters to view available builders across Tamil Nadu.
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-4 py-2 rounded-lg"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Workshop Detail Modal */}
        {selectedWorkshopForModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#172638] border border-[#30363D] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedWorkshopForModal(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-slate-300 hover:text-white hover:bg-black"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header Cover */}
              <div className="relative h-56 w-full">
                <img
                  src={selectedWorkshopForModal.coverImage}
                  alt={selectedWorkshopForModal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#172638] via-transparent to-black/40" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#E29765] mb-1">
                    <span>{selectedWorkshopForModal.district} Hub</span>
                    <span>•</span>
                    <span>Est. {selectedWorkshopForModal.establishedYear}</span>
                  </div>
                  <h2 className="text-2xl font-black text-white">{selectedWorkshopForModal.name}</h2>
                  <p className="text-xs text-slate-300">{selectedWorkshopForModal.tagline}</p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#E29765] tracking-wider mb-1 font-bold">About Workshop</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{selectedWorkshopForModal.description}</p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0E1622] p-4 rounded-xl border border-[#30363D] text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Rating</span>
                    <div className="flex items-center space-x-1 mt-0.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-white">{selectedWorkshopForModal.rating}</span>
                      <span className="text-slate-400 text-[10px]">({selectedWorkshopForModal.reviewCount})</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Standard Turnaround</span>
                    <span className="font-bold text-white mt-0.5 block">{selectedWorkshopForModal.leadTimeWeeks} Weeks</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Body Warranty</span>
                    <span className="font-bold text-white mt-0.5 block">{selectedWorkshopForModal.warrantyMonths} Months</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Indicative Base</span>
                    <span className="font-bold text-[#8EAB98] mt-0.5 block">{formatCurrencyINR(selectedWorkshopForModal.indicativePriceRange.minINR)}</span>
                  </div>
                </div>

                {/* Specializations & Services */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-[#E29765] tracking-wider mb-2 font-bold">Specializations</h4>
                    <div className="space-y-1 text-xs">
                      {selectedWorkshopForModal.specializations.map((spec, i) => (
                        <div key={i} className="flex items-center text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-[#8EAB98] shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase text-[#E29765] tracking-wider mb-2 font-bold">Factory Services & Equipment</h4>
                    <div className="space-y-1 text-xs">
                      {selectedWorkshopForModal.services.map((serv, i) => (
                        <div key={i} className="flex items-center text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-[#B76E3C] shrink-0" />
                          <span>{serv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#E29765] tracking-wider mb-2 font-bold">Government & ARAI Approvals</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedWorkshopForModal.certifications.map((cert, i) => (
                      <span key={i} className="bg-[#6E8878]/15 border border-[#8EAB98]/40 text-[#8EAB98] text-xs font-medium px-2.5 py-1 rounded-md flex items-center">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Address & Contact */}
                <div className="bg-[#0E1622] p-4 rounded-xl border border-[#30363D] space-y-2 text-xs">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-[#B76E3C] mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-white">Fabrication Yard Address</div>
                      <div className="text-slate-400">{selectedWorkshopForModal.address}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#30363D]/60">
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Phone className="w-3.5 h-3.5 text-[#E29765]" />
                      <span>{selectedWorkshopForModal.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-[#E29765]" />
                      <span>{selectedWorkshopForModal.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 bg-[#0E1622] border-t border-[#30363D] flex items-center justify-between">
                <button
                  onClick={() => {
                    toggleCompareWorkshop(selectedWorkshopForModal.id);
                  }}
                  className="text-xs px-4 py-2 rounded-lg border border-[#30363D] hover:bg-[#172638] text-slate-300 font-semibold flex items-center space-x-1.5"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>
                    {comparisonWorkshopIds.includes(selectedWorkshopForModal.id) ? 'Remove Comparison' : 'Add to Comparison'}
                  </span>
                </button>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedWorkshopForModal(null)}
                    className="text-xs text-slate-400 hover:text-white px-3 py-2"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      if (onSelectWorkshop) onSelectWorkshop(selectedWorkshopForModal);
                      setSelectedWorkshopForModal(null);
                      setActiveTab('budget-planner');
                    }}
                    className="bg-[#B76E3C] hover:bg-[#CF8754] text-white text-xs font-bold px-4 py-2 rounded-lg shadow flex items-center space-x-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Plan Build With This Workshop</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
