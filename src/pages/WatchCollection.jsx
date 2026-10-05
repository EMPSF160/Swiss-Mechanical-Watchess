import React, { useState, useMemo } from 'react';
import { useWatch } from '../context/WatchContext';
import { COLLECTIONS_LIST } from '../data/watches';
import { 
  Filter, 
  Search, 
  Grid, 
  List, 
  Table, 
  SlidersHorizontal, 
  RotateCcw, 
  Heart, 
  Scale, 
  Eye, 
  ArrowRight, 
  Sparkles, 
  Check, 
  ChevronDown,
  Clock,
  Shield
} from 'lucide-react';

export default function WatchCollection() {
  const { 
    watches, 
    formatPrice, 
    navigateTo, 
    activeFilterCategory, 
    setActiveFilterCategory, 
    toggleWishlist, 
    wishlist, 
    toggleCompare, 
    compareList, 
    openQuickLook, 
    startAcquisition 
  } = useWatch();

  // Filter States
  const [selectedMovement, setSelectedMovement] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [maxPrice, setMaxPrice] = useState(400000);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComplications, setSelectedComplications] = useState([]);
  const [sortBy, setSortBy] = useState('featured'); // 'price-desc' | 'price-asc' | 'featured' | 'complexity'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list' | 'table'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const availableComplications = [
    "Minute Repeater",
    "Tourbillon",
    "Perpetual Calendar",
    "Flyback Chronograph",
    "World Time",
    "Moon Phases",
    "Skeletonized"
  ];

  const toggleComplication = (comp) => {
    if (selectedComplications.includes(comp)) {
      setSelectedComplications(selectedComplications.filter(c => c !== comp));
    } else {
      setSelectedComplications([...selectedComplications, comp]);
    }
  };

  const resetFilters = () => {
    setActiveFilterCategory('all');
    setSelectedMovement('all');
    setSelectedMaterial('all');
    setMaxPrice(400000);
    setSearchQuery('');
    setSelectedComplications([]);
    setSortBy('featured');
  };

  // Filter & Sort Logic
  const filteredWatches = useMemo(() => {
    return watches.filter(watch => {
      // Category filter
      if (activeFilterCategory !== 'all' && watch.collection !== activeFilterCategory) {
        return false;
      }
      // Movement filter
      if (selectedMovement !== 'all' && !watch.movementType.toLowerCase().includes(selectedMovement.toLowerCase())) {
        return false;
      }
      // Material filter
      if (selectedMaterial !== 'all' && !watch.caseMaterial.toLowerCase().includes(selectedMaterial.toLowerCase())) {
        return false;
      }
      // Price filter
      if (watch.price > maxPrice) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matches = 
          watch.name.toLowerCase().includes(q) ||
          watch.ref.toLowerCase().includes(q) ||
          watch.collection.toLowerCase().includes(q) ||
          watch.calibre.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Complications filter
      if (selectedComplications.length > 0) {
        const hasAll = selectedComplications.every(comp => 
          watch.complications.some(c => c.toLowerCase().includes(comp.toLowerCase())) ||
          watch.name.toLowerCase().includes(comp.toLowerCase()) ||
          watch.movementType.toLowerCase().includes(comp.toLowerCase())
        );
        if (!hasAll) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'complexity') return b.components - a.components;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [watches, activeFilterCategory, selectedMovement, selectedMaterial, maxPrice, searchQuery, selectedComplications, sortBy]);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)] pt-8 pb-24 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-[var(--color-primary)] text-xs font-cinzel tracking-[0.3em] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>Geneva Haute Horlogerie Repertoire</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-light text-[var(--text-title)]">
            Swiss Mechanical Masterpieces
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-3 font-light leading-relaxed">
            Explore our handcrafted calibres. Filter by grand complications, case golds, and mechanical movements certified under the strict Poinçon de Genève standards.
          </p>
        </div>

        {/* Collection Category Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto space-x-2 sm:space-x-3 mt-8 pb-2 scrollbar-none">
          {COLLECTIONS_LIST.map(col => (
            <button
              key={col.id}
              onClick={() => setActiveFilterCategory(col.id)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-cinzel transition-all whitespace-nowrap border ${
                activeFilterCategory === col.id
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.2)] font-semibold'
                  : 'bg-[#10131D] text-slate-400 border-white/10 hover:border-white/30 hover:text-slate-200'
              }`}
            >
              {col.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area: Sidebar Filters + Watch Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Controls Bar (Search, View Toggle, Sort, Mobile Filter Trigger) */}
        <div className="bg-[#0D1018] border border-amber-500/20 rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference, calibre, complication..."
              className="w-full bg-[#08090C] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center justify-between w-full md:w-auto space-x-3">
            
            {/* Mobile Filter Toggle */}
            <button 
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center space-x-1.5 px-3 py-2 bg-[#151926] border border-amber-500/30 rounded text-xs text-amber-300"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters ({selectedComplications.length + (selectedMovement !== 'all' ? 1 : 0) + (selectedMaterial !== 'all' ? 1 : 0)})</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400 hidden sm:inline text-[11px] uppercase tracking-wider">Sort:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#08090C] border border-white/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              >
                <option value="featured">Featured & Curated</option>
                <option value="price-desc">Price: Highest to Lowest</option>
                <option value="price-asc">Price: Lowest to Highest</option>
                <option value="complexity">Mechanical Complexity (Parts)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center space-x-1 bg-[#08090C] p-1 rounded border border-white/10">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'table' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
                title="Technical Table View"
              >
                <Table className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* SIDEBAR FILTERS (Desktop & Mobile Drawer) */}
          <div className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-[#0C0E16] border border-amber-500/20 rounded-xl p-5 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2 text-xs font-cinzel uppercase tracking-wider text-amber-300 font-semibold">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Horological Filter</span>
                </div>
                <button 
                  onClick={resetFilters}
                  className="text-[11px] text-slate-400 hover:text-amber-300 flex items-center space-x-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Movement Filter */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-2 font-cinzel">
                  Movement Calibre Type
                </label>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: 'all', label: 'All Movements' },
                    { id: 'manual', label: 'Manual Winding' },
                    { id: 'self-winding', label: 'Self-Winding (Automatic)' },
                    { id: 'skeleton', label: 'Skeletonized Openwork' }
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMovement(m.id)}
                      className={`w-full text-left px-3 py-1.5 rounded transition-colors flex items-center justify-between ${
                        selectedMovement === m.id 
                          ? 'bg-amber-500/20 text-amber-300 font-medium' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                      }`}
                    >
                      <span>{m.label}</span>
                      {selectedMovement === m.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Precious Metal / Case Material */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-2 font-cinzel">
                  Case Material & Metals
                </label>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: 'all', label: 'All Precious Metals' },
                    { id: 'white gold', label: '18K White Gold' },
                    { id: 'rose gold', label: '18K Rose Gold' },
                    { id: 'platinum', label: 'Platinum 950' },
                    { id: 'yellow gold', label: '18K Yellow Gold' }
                  ].map(mat => (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat.id)}
                      className={`w-full text-left px-3 py-1.5 rounded transition-colors flex items-center justify-between ${
                        selectedMaterial === mat.id 
                          ? 'bg-amber-500/20 text-amber-300 font-medium' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                      }`}
                    >
                      <span>{mat.label}</span>
                      {selectedMaterial === mat.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Complications Multi-Select */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-2 font-cinzel">
                  Complications
                </label>
                <div className="space-y-1.5 text-xs">
                  {availableComplications.map(comp => {
                    const isChecked = selectedComplications.includes(comp);
                    return (
                      <label 
                        key={comp}
                        onClick={() => toggleComplication(comp)}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded cursor-pointer transition-colors ${
                          isChecked ? 'bg-amber-500/15 text-amber-300' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          checked={isChecked} 
                          onChange={() => {}}
                          className="rounded border-slate-700 text-amber-500 focus:ring-0"
                        />
                        <span className="text-[11px]">{comp}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex justify-between items-center text-[11px] uppercase tracking-wider text-slate-400 mb-2 font-cinzel">
                  <span>Price Cap</span>
                  <span className="text-amber-400 font-bold">{formatPrice(maxPrice)}</span>
                </div>
                <input 
                  type="range" 
                  min={30000} 
                  max={400000} 
                  step={10000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>30,000 CHF</span>
                  <span>400,000 CHF</span>
                </div>
              </div>

            </div>
          </div>

          {/* MAIN RESULTS DISPLAY */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Results count header */}
            <div className="flex justify-between items-center text-xs text-slate-400 px-1">
              <span>Displaying <strong>{filteredWatches.length}</strong> Swiss Haute Horlogerie timepieces</span>
              {(selectedComplications.length > 0 || selectedMovement !== 'all' || selectedMaterial !== 'all' || activeFilterCategory !== 'all') && (
                <button 
                  onClick={resetFilters} 
                  className="text-amber-400 hover:underline"
                >
                  Clear active criteria
                </button>
              )}
            </div>

            {filteredWatches.length === 0 ? (
              <div className="bg-[#0D1017] border border-amber-500/20 rounded-xl p-12 text-center">
                <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-serif text-slate-200">No Masterpieces Found</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  No timepieces match your active combination of calibres and complications.
                </p>
                <button 
                  onClick={resetFilters}
                  className="mt-4 px-5 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold text-xs uppercase tracking-widest rounded"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* GRID VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredWatches.map(watch => {
                  const isWishlisted = wishlist.includes(watch.id);
                  const isCompared = compareList.includes(watch.id);

                  return (
                    <div 
                      key={watch.id}
                      className="group bg-[#0B0D14] border border-amber-500/20 rounded-xl overflow-hidden shadow-2xl hover:border-amber-400/60 transition-all duration-500 flex flex-col justify-between"
                    >
                      {/* Top Reference & Badges */}
                      <div className="p-4 pb-0 flex justify-between items-start z-10">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                          {watch.ref}
                        </span>
                        <div className="flex space-x-1">
                          <button 
                            onClick={() => toggleWishlist(watch.id)}
                            className={`p-1.5 rounded-full bg-black/60 border border-white/10 transition-colors ${
                              isWishlisted ? 'text-amber-400 border-amber-400' : 'text-slate-400 hover:text-amber-400'
                            }`}
                            title="Wishlist"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                          </button>
                          <button 
                            onClick={() => toggleCompare(watch.id)}
                            className={`p-1.5 rounded-full bg-black/60 border border-white/10 transition-colors ${
                              isCompared ? 'text-amber-400 border-amber-400' : 'text-slate-400 hover:text-amber-400'
                            }`}
                            title="Compare"
                          >
                            <Scale className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Image Showcase */}
                      <div 
                        className="p-6 relative flex items-center justify-center min-h-[240px] cursor-pointer"
                        onClick={() => navigateTo('details', watch.id)}
                      >
                        <img 
                          src={watch.images[0]} 
                          alt={watch.name} 
                          className="max-h-52 object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-700"
                        />
                        
                        {/* Quick Look overlay button */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              openQuickLook(watch);
                            }}
                            className="px-4 py-2 bg-amber-500/90 text-black font-semibold text-[11px] uppercase tracking-wider rounded shadow-xl hover:bg-amber-400 transition-colors flex items-center space-x-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Quick Blueprint</span>
                          </button>
                        </div>
                      </div>

                      {/* Details Footer */}
                      <div className="p-5 bg-[#0E1119] border-t border-white/5 space-y-2">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-amber-400/80 font-cinzel">
                          {watch.collection}
                        </div>
                        <h3 
                          onClick={() => navigateTo('details', watch.id)}
                          className="font-serif text-base font-semibold text-slate-100 hover:text-amber-300 transition-colors cursor-pointer truncate"
                        >
                          {watch.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 line-clamp-1">
                          {watch.movementType} • {watch.caseMaterial}
                        </p>
                        
                        <div className="pt-2 flex items-center justify-between">
                          <span className="font-cinzel text-sm font-bold text-amber-300">
                            {formatPrice(watch.price)}
                          </span>
                          <button 
                            onClick={() => startAcquisition(watch)}
                            className="px-3 py-1.5 bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/60 rounded text-[11px] uppercase tracking-wider text-slate-200 transition-colors"
                          >
                            Acquire
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              /* TABLE VIEW */
              <div className="bg-[#0B0D14] border border-amber-500/20 rounded-xl overflow-x-auto shadow-2xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#08090C] border-b border-white/10 text-[10px] uppercase tracking-widest text-slate-400 font-cinzel">
                    <tr>
                      <th className="p-4">Timepiece</th>
                      <th className="p-4">Reference</th>
                      <th className="p-4">Calibre</th>
                      <th className="p-4">Case Material</th>
                      <th className="p-4">Power Reserve</th>
                      <th className="p-4">Price</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredWatches.map(watch => (
                      <tr key={watch.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 flex items-center space-x-3">
                          <img src={watch.images[0]} alt={watch.name} className="w-10 h-10 object-contain" />
                          <div>
                            <span 
                              onClick={() => navigateTo('details', watch.id)}
                              className="font-serif font-semibold text-slate-100 hover:text-amber-300 cursor-pointer block"
                            >
                              {watch.name}
                            </span>
                            <span className="text-[10px] text-amber-400/70">{watch.collection}</span>
                          </div>
                        </td>
                        <td className="p-4 font-mono text-slate-400">{watch.ref}</td>
                        <td className="p-4 font-mono text-slate-300">{watch.calibre}</td>
                        <td className="p-4">{watch.caseMaterial}</td>
                        <td className="p-4 text-amber-300 font-semibold">{watch.powerReserve}</td>
                        <td className="p-4 font-cinzel font-bold text-amber-400">{formatPrice(watch.price)}</td>
                        <td className="p-4 text-right space-x-2">
                          <button 
                            onClick={() => openQuickLook(watch)}
                            className="p-1.5 rounded bg-white/5 hover:bg-white/15 text-slate-300"
                            title="Quick Preview"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => startAcquisition(watch)}
                            className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded uppercase text-[10px] font-semibold"
                          >
                            Acquire
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
