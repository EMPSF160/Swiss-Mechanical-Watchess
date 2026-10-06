import React, { useState } from 'react';
import { useWatch } from '../context/WatchContext';
import { getAssetUrl } from '../utils/assets';
import { 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Clock, 
  Compass, 
  ChevronRight, 
  Play, 
  CheckCircle2,
  Calendar,
  Layers,
  Flame,
  Feather,
  Hammer
} from 'lucide-react';

export default function Heritage() {
  const { navigateTo } = useWatch();
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  const timelineEvents = [
    {
      year: "1839",
      title: "Foundation on the Banks of Lake Geneva",
      desc: "Two master watchmakers establish the Maison ateliers on Rue du Rhône, committing to the uninterrupted preservation of traditional Swiss mechanical chronometry.",
      highlight: "Geneva Guild of Master Horologists Recognition"
    },
    {
      year: "1889",
      title: "First Swiss Patent for Perpetual Calendar",
      desc: "Chronova registers an ingenious mechanism capable of mechanically calculating leap years and month lengths without manual intervention until 2100.",
      highlight: "Gold Medal at the Exposition Universelle"
    },
    {
      year: "1927",
      title: "The First Wristwatch Minute Repeater",
      desc: "Miniaturizing church bell acoustics into a 32mm gold wristwatch case with hand-tuned cathedral gongs struck by twin steel hammers.",
      highlight: "Acoustic Resonance Breakthrough"
    },
    {
      year: "1977",
      title: "Calibre 240 Ultra-Thin Micro-Rotor",
      desc: "Introduction of the legendary 2.53 mm thin automatic movement featuring an off-center 22K gold recessed micro-rotor.",
      highlight: "Pinnacle of Ultra-Thin Self-Winding Mechanics"
    },
    {
      year: "1996",
      title: "Invention of the Annual Calendar",
      desc: "Chronova revolutionizes complication horology by introducing the Annual Calendar mechanism, automatically correcting for 30 and 31-day months.",
      highlight: "Patented Worldwide Horological Standard"
    },
    {
      year: "2026",
      title: "The Celestial Grand Complication Era",
      desc: "Combining the celestial northern sky chart, one-minute tourbillon cage, and cathedral minute repeater in hand-engraved 18K white gold.",
      highlight: "Haute Horlogerie Sovereign Masterpiece"
    }
  ];

  const craftPillars = [
    {
      icon: <Hammer className="w-6 h-6 text-amber-400" />,
      title: "Hand-Chamfering & Anglage",
      desc: "Master artisans hand-bevel the interior and exterior angles of every bridge using traditional files and gentian wood pegs soaked in diamond paste, creating a flawless 45° mirror luster."
    },
    {
      icon: <Layers className="w-6 h-6 text-amber-400" />,
      title: "Côtes de Genève Striping",
      desc: "Executed using a rotating wooden abrasive wheel guided by hand across the bridges to create light-reflecting waves reminiscent of the shimmering waters of Lake Geneva."
    },
    {
      icon: <Flame className="w-6 h-6 text-amber-400" />,
      title: "Grand Feu Enameling",
      desc: "Rare Metiers d’Art requiring successive firings in kilns heated to over 850°C. Miniature cloisonné and champlevé techniques that resist aging for centuries."
    },
    {
      icon: <Compass className="w-6 h-6 text-amber-400" />,
      title: "Free-Sprung Gyromax® Balance",
      desc: "Chronova balances are regulated not by modifying the active length of the hairspring, but by adjusting gold poising weights set into the balance wheel rim for extreme rate stability."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: "Perlage Circular Graining",
      desc: "Thousands of overlapping microscopic circles hand-stamped onto the mainplate to capture light and trap stray micro-particles from compromising gear friction."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      title: "Poinçon de Genève Hallmark",
      desc: "Every component is finished to the 12 strict criteria of the Geneva Seal, guaranteeing the origin, chronometric precision, and artisanal provenance of the canton of Geneva."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)] pt-8 pb-24 transition-colors duration-300">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center space-x-2 text-[var(--color-primary)] text-xs font-cinzel tracking-[0.35em] uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          <span>Haute Horlogerie Tradition • 1839</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif font-light text-[var(--text-title)] max-w-3xl mx-auto">
          The Art of Swiss Watchmaking
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-4 max-w-2xl mx-auto font-light leading-relaxed">
          In our Geneva and Vallée de Joux ateliers, time is not merely measured—it is sculpted by hand into mechanical works of eternal art.
        </p>
      </div>

      {/* Atelier Video Feature */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-black">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-[450px] object-cover opacity-75 filter contrast-110"
          >
            <source src={getAssetUrl('videos/34855-403777679_medium.mp4')} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-[#07080B]/50"></div>
          
          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 bg-black/80 px-2.5 py-1 rounded border border-amber-500/30">
                Vallée de Joux Master Atelier
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100 mt-2">
                Where Master Artisans Devote Hundreds of Hours to a Single Calibre
              </h3>
            </div>
            <button 
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold text-xs uppercase tracking-widest rounded shadow hover:brightness-110 flex-shrink-0"
            >
              Book Atelier Visit
            </button>
          </div>
        </div>
      </div>

      {/* INTERACTIVE 180-YEAR TIMELINE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-cinzel">
            Chronological Milestones
          </span>
          <h2 className="text-3xl font-serif font-light text-slate-100 mt-2">
            180+ Years of Mechanical Innovation
          </h2>
        </div>

        {/* Timeline Horizontal Year Scroller */}
        <div className="flex justify-between items-center overflow-x-auto pb-4 mb-8 border-b border-white/10 scrollbar-none">
          {timelineEvents.map((evt, idx) => (
            <button
              key={evt.year}
              onClick={() => setActiveTimelineIndex(idx)}
              className={`px-6 py-3 text-center transition-all flex flex-col items-center flex-shrink-0 border-b-2 -mb-4 ${
                activeTimelineIndex === idx
                  ? 'border-amber-400 text-amber-300 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="font-cinzel text-xl sm:text-2xl">{evt.year}</span>
              <span className="text-[10px] uppercase tracking-widest mt-1 opacity-75">Chapter {idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Active Milestone Card */}
        <div className="bg-[#0C0F17] border border-amber-500/30 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="text-amber-400 font-cinzel text-sm uppercase tracking-[0.25em] font-semibold mb-2">
              Milestone {timelineEvents[activeTimelineIndex].year} • {timelineEvents[activeTimelineIndex].highlight}
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-slate-100 mb-4">
              {timelineEvents[activeTimelineIndex].title}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {timelineEvents[activeTimelineIndex].desc}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
            <span>Archived in the Geneva Musée d'Horlogerie</span>
            <div className="space-x-2">
              <button 
                onClick={() => setActiveTimelineIndex(Math.max(0, activeTimelineIndex - 1))}
                disabled={activeTimelineIndex === 0}
                className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30"
              >
                Previous
              </button>
              <button 
                onClick={() => setActiveTimelineIndex(Math.min(timelineEvents.length - 1, activeTimelineIndex + 1))}
                disabled={activeTimelineIndex === timelineEvents.length - 1}
                className="px-3 py-1.5 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 disabled:opacity-30"
              >
                Next Era
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* THE 6 PILLARS OF METIERS D'ART */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-cinzel">
            Artisanal Disciplines
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-slate-100 mt-2">
            The Pillars of Haute Horlogerie
          </h2>
          <div className="w-16 h-[1px] bg-amber-400/40 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {craftPillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="bg-[#0B0D15] border border-amber-500/20 rounded-xl p-8 hover:border-amber-400/50 transition-all duration-300 shadow-xl space-y-4"
            >
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold text-slate-100">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MASTER CRAFTSMEN MANIFESTO */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-[#090B12] border border-amber-500/30 rounded-2xl p-10 sm:p-14 shadow-2xl">
        <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-300 mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <blockquote className="font-serif italic text-2xl sm:text-3xl text-slate-100 leading-relaxed font-light">
          “In a world driven by planned obsolescence, a mechanical Chronova timepiece is engineered to keep beating precisely two hundred years from now, serviced with the same handcraft tools we forged two centuries ago.”
        </blockquote>
        <div className="mt-6 font-cinzel text-xs uppercase tracking-[0.25em] text-amber-400">
          Jean-Pierre de Valmont • Master Horologist & Atelier Director
        </div>
      </div>

    </div>
  );
}
