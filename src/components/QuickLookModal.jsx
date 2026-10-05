import React from 'react';
import { useWatch } from '../context/WatchContext';
import { X, Heart, Scale, Shield, Sparkles, ChevronRight, Clock, Award } from 'lucide-react';

export default function QuickLookModal() {
  const { 
    isQuickLookOpen, 
    setIsQuickLookOpen, 
    quickLookWatch, 
    formatPrice, 
    toggleWishlist, 
    wishlist, 
    toggleCompare, 
    compareList, 
    navigateTo, 
    startAcquisition 
  } = useWatch();

  if (!isQuickLookOpen || !quickLookWatch) return null;

  const isWishlisted = wishlist.includes(quickLookWatch.id);
  const isCompared = compareList.includes(quickLookWatch.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsQuickLookOpen(false)}
      />

      <div className="relative bg-[#0E1119] border border-amber-500/30 rounded-xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl overflow-hidden z-10 text-slate-200">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsQuickLookOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Image Showcase */}
          <div className="relative bg-[#08090C] rounded-lg p-6 border border-white/5 flex items-center justify-center min-h-[300px]">
            <img 
              src={quickLookWatch.images[0]} 
              alt={quickLookWatch.name} 
              className="max-h-72 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
            />
            <div className="absolute top-3 left-3 flex flex-col space-y-1">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-mono">
                {quickLookWatch.ref}
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-amber-400 font-cinzel">
                {quickLookWatch.collection}
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-100 mt-1">
                {quickLookWatch.name}
              </h2>
              <div className="text-xl font-cinzel font-bold text-amber-300 mt-2">
                {formatPrice(quickLookWatch.price)}
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {quickLookWatch.tagline}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-white/10">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Calibre</span>
                <span className="font-mono text-slate-200">{quickLookWatch.calibre}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Case Material</span>
                <span className="text-slate-200">{quickLookWatch.caseMaterial}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Dimensions</span>
                <span className="text-slate-200">{quickLookWatch.caseDiameter} • {quickLookWatch.caseThickness}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Power Reserve</span>
                <span className="text-amber-400 font-semibold">{quickLookWatch.powerReserve}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setIsQuickLookOpen(false);
                    startAcquisition(quickLookWatch);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-black font-semibold text-xs uppercase tracking-widest rounded shadow-lg hover:brightness-110 transition-all text-center"
                >
                  Acquire Timepiece
                </button>
                <button 
                  onClick={() => toggleWishlist(quickLookWatch.id)}
                  className={`p-3 rounded border transition-colors ${
                    isWishlisted 
                      ? 'bg-amber-500/20 border-amber-400 text-amber-400' 
                      : 'border-white/10 text-slate-300 hover:border-amber-400 hover:text-amber-400'
                  }`}
                  title="Collector's Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button 
                  onClick={() => toggleCompare(quickLookWatch.id)}
                  className={`p-3 rounded border transition-colors ${
                    isCompared 
                      ? 'bg-amber-500/20 border-amber-400 text-amber-400' 
                      : 'border-white/10 text-slate-300 hover:border-amber-400 hover:text-amber-400'
                  }`}
                  title="Compare Calibre"
                >
                  <Scale className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={() => {
                  setIsQuickLookOpen(false);
                  navigateTo('details', quickLookWatch.id);
                }}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center space-x-1"
              >
                <span>Full Horological Blueprint & 360 View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
