import React from 'react';
import { useWatch } from '../context/WatchContext';
import { X, Scale, ExternalLink, Trash2, Check, Shield } from 'lucide-react';

export default function CompareDrawer() {
  const { 
    isCompareDrawerOpen, 
    setIsCompareDrawerOpen, 
    compareList, 
    toggleCompare, 
    watches, 
    formatPrice, 
    navigateTo, 
    startAcquisition 
  } = useWatch();

  if (!isCompareDrawerOpen) return null;

  const comparedWatches = watches.filter(w => compareList.includes(w.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsCompareDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-5xl bg-[#0B0D13] border-l border-amber-500/25 flex flex-col justify-between shadow-2xl text-slate-200">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#08090C]">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-cinzel text-lg font-bold text-amber-200 tracking-wider">
                  Calibre Technical Comparison
                </h3>
                <p className="text-xs text-slate-400">
                  Side-by-side Haute Horlogerie matrix ({comparedWatches.length} of 4 maximum)
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsCompareDrawerOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {comparedWatches.length === 0 ? (
              <div className="text-center py-20">
                <Scale className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h4 className="text-lg font-serif text-slate-300">No Timepieces in Comparison</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-2">
                  Add up to four timepieces from our collections to analyze their complications, calibres, and dimensions.
                </p>
                <button 
                  onClick={() => {
                    setIsCompareDrawerOpen(false);
                    navigateTo('collection');
                  }}
                  className="mt-6 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold text-xs uppercase tracking-widest rounded hover:brightness-110"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[650px]">
                  <thead>
                    <tr>
                      <th className="p-3 text-xs uppercase tracking-widest text-slate-400 border-b border-white/10 w-44">
                        Specification
                      </th>
                      {comparedWatches.map(watch => (
                        <th key={watch.id} className="p-3 border-b border-white/10 text-center w-64 align-top">
                          <div className="relative group p-2 bg-[#12151F] border border-amber-500/20 rounded-lg">
                            <button 
                              onClick={() => toggleCompare(watch.id)}
                              className="absolute top-2 right-2 p-1 text-slate-500 hover:text-red-400 transition-colors"
                              title="Remove from comparison"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <img 
                              src={watch.images[0]} 
                              alt={watch.name} 
                              className="w-28 h-28 object-contain mx-auto mb-2"
                            />
                            <h4 className="font-serif text-sm font-semibold text-slate-100 line-clamp-1">{watch.name}</h4>
                            <div className="text-[11px] font-mono text-slate-400">{watch.ref}</div>
                            <div className="text-sm font-bold text-amber-400 mt-1">{formatPrice(watch.price)}</div>
                            <div className="mt-3 flex space-x-1 justify-center">
                              <button 
                                onClick={() => {
                                  setIsCompareDrawerOpen(false);
                                  navigateTo('details', watch.id);
                                }}
                                className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-white/5 hover:bg-white/15 text-slate-200 rounded border border-white/10"
                              >
                                View
                              </button>
                              <button 
                                onClick={() => {
                                  setIsCompareDrawerOpen(false);
                                  startAcquisition(watch);
                                }}
                                className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded border border-amber-500/40 font-semibold"
                              >
                                Acquire
                              </button>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Collection</td>
                      {comparedWatches.map(w => (
                        <td key={w.id} className="p-3 text-center text-amber-300/90 font-medium">{w.collection}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Movement Calibre</td>
                      {comparedWatches.map(w => (
                        <td key={w.id} className="p-3 text-center font-mono text-slate-200">{w.calibre}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Movement Type</td>
                      {comparedWatches.map(w => (
                        <td key={w.id} className="p-3 text-center">{w.movementType}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Case Material</td>
                      {comparedWatches.map(w => (
                        <td key={w.id} className="p-3 text-center font-medium text-slate-200">{w.caseMaterial}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Dimensions</td>
                      {comparedWatches.map(w => (
                        <td key={w.id} className="p-3 text-center font-mono">
                          {w.caseDiameter} × {w.caseThickness}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Power Reserve</td>
                      {comparedWatches.map(w => (
                        <td key={w.id} className="p-3 text-center text-amber-400 font-semibold">{w.powerReserve}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Jewels / Parts</td>
                      {comparedWatches.map(w => (
                        <td key={w.id} className="p-3 text-center font-mono">
                          {w.jewels} Jewels / {w.components} Parts
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Frequency</td>
                      {comparedWatches.map(w => (
                        <td key={w.id} className="p-3 text-center font-mono">{w.frequency}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Water Resistance</td>
                      {comparedWatches.map(w => (
                        <td key={w.id} className="p-3 text-center">{w.waterResistance}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 uppercase tracking-wider text-[11px]">Hallmark</td>
                      {comparedWatches.map(w => (
                        <td key={w.id} className="p-3 text-center text-amber-300 flex items-center justify-center space-x-1">
                          <Shield className="w-3 h-3 text-amber-400" />
                          <span>{w.hallmark}</span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-400 uppercase tracking-wider text-[11px] align-top">Complications</td>
                      {comparedWatches.map(w => (
                        <td key={w.id} className="p-3 text-left align-top">
                          <ul className="space-y-1 text-[11px]">
                            {w.complications.map((c, i) => (
                              <li key={i} className="flex items-start">
                                <Check className="w-3 h-3 text-amber-400 mr-1 flex-shrink-0 mt-0.5" />
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 bg-[#08090C] flex justify-between items-center text-xs text-slate-400">
            <span>Official Chronova Geneva Reference Archives</span>
            <button 
              onClick={() => setIsCompareDrawerOpen(false)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded text-slate-200 tracking-wider uppercase text-[11px]"
            >
              Close Matrix
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
