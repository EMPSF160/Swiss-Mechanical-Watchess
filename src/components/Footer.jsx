import React from 'react';
import { useWatch } from '../context/WatchContext';
import { Award, ShieldCheck, Clock, MapPin, Mail, Phone, ChevronRight } from 'lucide-react';

export default function Footer() {
  const { navigateTo } = useWatch();

  return (
    <footer className="bg-[#050608] text-slate-400 border-t border-amber-500/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Heritage Quote */}
        <div className="text-center max-w-3xl mx-auto pb-14 border-b border-white/5">
          <div className="inline-flex items-center justify-center space-x-2 text-amber-400/80 mb-3">
            <span className="h-[1px] w-12 bg-amber-400/40"></span>
            <span className="text-[11px] uppercase tracking-[0.3em] font-medium">Geneva Haute Horlogerie Manifesto</span>
            <span className="h-[1px] w-12 bg-amber-400/40"></span>
          </div>
          <blockquote className="font-serif italic text-2xl sm:text-3xl text-slate-100 leading-relaxed font-light">
            “You never actually own a Chronova. You merely look after it for the next generation.”
          </blockquote>
          <p className="mt-4 text-xs uppercase tracking-[0.25em] text-amber-400/70 font-cinzel">
            Master Watchmakers of Geneva • Founded 1839
          </p>
        </div>

        {/* Hallmark & Standards Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-b border-white/5 text-center">
          <div className="p-4 rounded border border-white/5 bg-white/[0.01]">
            <div className="text-amber-400 font-cinzel text-lg mb-1">Poinçon de Genève</div>
            <div className="text-xs text-slate-400">Official Geneva Seal of Quality & Origin</div>
          </div>
          <div className="p-4 rounded border border-white/5 bg-white/[0.01]">
            <div className="text-amber-400 font-cinzel text-lg mb-1">ISO 3159 Rigor</div>
            <div className="text-xs text-slate-400">-3 to +2 sec/day Chronometric Precision</div>
          </div>
          <div className="p-4 rounded border border-white/5 bg-white/[0.01]">
            <div className="text-amber-400 font-cinzel text-lg mb-1">Lifetime Provenance</div>
            <div className="text-xs text-slate-400">Cryptographic Register in Geneva Archives</div>
          </div>
          <div className="p-4 rounded border border-white/5 bg-white/[0.01]">
            <div className="text-amber-400 font-cinzel text-lg mb-1">Bespoke Concierge</div>
            <div className="text-xs text-slate-400">White-Glove Armored Handover Globally</div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(212,175,55,0.6)]"></div>
              <span className="font-cinzel text-2xl tracking-[0.3em] font-bold text-slate-100">
                CHRONOVA
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 font-light max-w-sm">
              Dedicated to the uninterrupted preservation of Swiss mechanical watchmaking. Hand-finished calibres, acoustic minute repeaters, and grand complications crafted in the Vallée de Joux.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Rue du Rhône 41, 1204 Genève, Switzerland</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+41 (22) 710 88 00 (Geneva Maison Concierge)</span>
              </div>
            </div>
          </div>

          {/* Column 1: Collections */}
          <div>
            <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] text-slate-200 mb-4 border-b border-amber-500/30 pb-2">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('collection', null, 'Grand Complications')} className="hover:text-amber-300 transition-colors">
                  Grand Complications
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('collection', null, 'Complications')} className="hover:text-amber-300 transition-colors">
                  Complications
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('collection', null, 'Calatrava & Dress')} className="hover:text-amber-300 transition-colors">
                  Calatrava & Dress
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('collection', null, 'Aquanautic Sport')} className="hover:text-amber-300 transition-colors">
                  Aquanautic Sport
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('collection', null, 'Skeleton Heritage')} className="hover:text-amber-300 transition-colors">
                  Skeleton & Metiers d'Art
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: The Maison */}
          <div>
            <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] text-slate-200 mb-4 border-b border-amber-500/30 pb-2">
              The Maison
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('heritage')} className="hover:text-amber-300 transition-colors">
                  Geneva Craft & History
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('heritage')} className="hover:text-amber-300 transition-colors">
                  Metiers d’Art & Guilloché
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-amber-300 transition-colors">
                  Global Boutiques
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-amber-300 transition-colors">
                  Book Salon Appointment
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('dashboard')} className="hover:text-amber-300 transition-colors">
                  Collector’s Vault Passport
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Private Salons & Newsletter */}
          <div>
            <h4 className="font-cinzel text-xs uppercase tracking-[0.25em] text-slate-200 mb-4 border-b border-amber-500/30 pb-2">
              Maison Gazette
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Receive confidential dispatches on numbered calibre releases and Geneva salon exhibitions.
            </p>
            <div className="space-y-2">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your confidential email..." 
                  className="w-full bg-[#11141E] border border-amber-500/30 rounded px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <button 
                onClick={() => alert("Thank you. You have been registered for private Geneva Salon allocations.")}
                className="w-full py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-semibold text-xs tracking-widest uppercase rounded transition-all shadow-md"
              >
                Request Dispatch
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Trademark */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} CHRONOVA SA • All Swiss Mechanical Patents & Calibre Rights Reserved.
          </div>
          <div className="flex space-x-6 text-[11px] uppercase tracking-wider">
            <span className="hover:text-amber-300 cursor-pointer">Terms of Haute Horlogerie</span>
            <span className="hover:text-amber-300 cursor-pointer">Geneva Privacy Charter</span>
            <span className="hover:text-amber-300 cursor-pointer">Certificate Verification</span>
            <span className="hover:text-amber-300 cursor-pointer">Heritage Archives</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
