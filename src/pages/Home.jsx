import React, { useState, useRef } from 'react';
import { useWatch } from '../context/WatchContext';
import { 
  playMinuteRepeaterChime, 
  playMechanicalTick 
} from '../utils/audioEngine';
import { getAssetUrl } from '../utils/assets';
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Compass, 
  ShieldCheck, 
  Award, 
  Eye, 
  Heart, 
  Scale, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  CheckCircle2,
  Calendar,
  Layers,
  Flame,
  Check
} from 'lucide-react';

export default function Home() {
  const { 
    watches, 
    formatPrice, 
    navigateTo, 
    toggleWishlist, 
    wishlist, 
    toggleCompare, 
    compareList, 
    openQuickLook, 
    startAcquisition,
    themeMode 
  } = useWatch();

  const [activeComplicationTab, setActiveComplicationTab] = useState('tourbillon');
  const [isPlayingChime, setIsPlayingChime] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const videoRef = useRef(null);

  // Spotlight watches
  const heroWatch = watches.find(w => w.id === 'chr-6002g') || watches[0];
  const featuredWatches = watches.slice(0, 4);

  const handleChimeDemo = () => {
    setIsPlayingChime(true);
    playMinuteRepeaterChime('full');
    setTimeout(() => {
      setIsPlayingChime(false);
    }, 4500);
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
        setVideoPlaying(false);
      } else {
        videoRef.current.play();
        setVideoPlaying(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)] overflow-x-hidden transition-colors duration-300">
      
      {/* 1. HERO SECTION WITH LUXURY VIDEO / CANVASES */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[var(--border-subtle)]">
        
        {/* Video Background with dynamic light/dark luxury gradient overlays */}
        <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            className={`w-full h-full object-cover scale-105 filter ${themeMode === 'light' ? 'opacity-25 brightness-105' : 'opacity-35 brightness-90 contrast-125'}`}
          >
            <source src={getAssetUrl('videos/204582-925146042_medium.mp4')} type="video/mp4" />
          </video>
          <div className={`absolute inset-0 bg-gradient-to-t ${
            themeMode === 'light' 
              ? 'from-[#F8F7F4] via-[#F8F7F4]/85 to-[#F8F7F4]/95' 
              : 'from-[#07080B] via-[#07080B]/60 to-[#07080B]/90'
          }`}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          
          {/* Subtle Golden Crest Tag */}
          <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full border border-[var(--border-card)] text-[11px] uppercase tracking-[0.35em] text-[var(--color-primary)] font-cinzel mb-6 shadow-sm bg-[var(--bg-card)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span>SWISS HAUTE HORLOGERIE • GENÈVE</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[var(--text-title)] max-w-4xl leading-[1.15] tracking-tight">
            Time, <span className="font-serif italic font-normal text-transparent bg-clip-text text-gold-gradient drop-shadow">Engineered</span> to Last Generations.
          </h1>

          <p className="mt-6 text-sm sm:text-base lg:text-lg text-[var(--text-body)] max-w-2xl font-light leading-relaxed">
            Where centuries of Geneva craftsmanship converge with micro-mechanical precision. Hand-assembled calibres, grand complications, and timeless aesthetic sovereignty.
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 w-full sm:w-auto">
            <button 
              onClick={() => navigateTo('collection')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-white font-semibold text-xs uppercase tracking-[0.25em] rounded shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2 group"
            >
              <span>Explore 2026 Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => navigateTo('contact')}
              className="w-full sm:w-auto px-8 py-4 border border-[var(--border-card)] hover:border-[var(--color-primary)] text-[var(--text-title)] font-medium text-xs uppercase tracking-[0.25em] rounded transition-all bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] shadow-sm flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
              <span>Book Salon Viewing</span>
            </button>
          </div>

          {/* Quick Calibre Live Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 max-w-4xl w-full pt-10 border-t border-[var(--border-subtle)] text-center">
            <div>
              <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--color-primary)]">1839</div>
              <div className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] mt-1">Geneva Foundation</div>
            </div>
            <div>
              <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--color-primary)]">705</div>
              <div className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] mt-1">Max Movement Parts</div>
            </div>
            <div>
              <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--color-primary)]">28,800</div>
              <div className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] mt-1">Vibrations / Hour (4Hz)</div>
            </div>
            <div>
              <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--color-primary)]">100%</div>
              <div className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] mt-1">Poinçon de Genève</div>
            </div>
          </div>
        </div>

        {/* Video control bottom right */}
        <button 
          onClick={toggleVideoPlayback}
          className="absolute bottom-4 right-4 z-20 p-2.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-body)] hover:text-[var(--color-primary)] shadow-md transition-colors text-xs flex items-center space-x-1.5"
          title={videoPlaying ? "Pause Atelier Footage" : "Play Atelier Footage"}
        >
          {videoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline text-[10px] tracking-wider uppercase font-cinzel">Vallée de Joux Atelier</span>
        </button>
      </section>

      {/* 2. MASTERPIECE SPOTLIGHT (GRAND COMPLICATION INTERACTIVE SHOWCASE) */}
      <section className="py-24 relative overflow-hidden bg-[var(--bg-section)] border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)] font-cinzel">
              Haute Horlogerie Showcase
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[var(--text-title)] mt-2">
              The Celestial Sky Tourbillon
            </h2>
            <div className="w-16 h-[1.5px] bg-[var(--color-primary)] mx-auto mt-4"></div>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-4 leading-relaxed">
              Ref. 6002G-010 • Dual-dial astronomical movement with 12 complications and cathedral minute repeater.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Complication Selector */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-cinzel text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] mb-2">
                Mechanical Innovations
              </h3>

              {[
                {
                  id: 'tourbillon',
                  title: 'One-Minute Tourbillon Cage',
                  desc: 'Weighing only 0.3 grams, rotating continuously to counteract the gravitational pull on the balance spring.'
                },
                {
                  id: 'repeater',
                  title: 'Cathedral Minute Repeater',
                  desc: 'Twin gongs wrapped almost twice around the calibre creating deep, resonant acoustic resonance.'
                },
                {
                  id: 'celestial',
                  title: 'Sidereal Northern Sky Chart',
                  desc: 'Sapphire crystal disc reproducing the apparent motion of stars, Milky Way, and lunar orbit.'
                },
                {
                  id: 'perpetual',
                  title: 'Retrograde Perpetual Calendar',
                  desc: 'Automatically adjusts for leap years until the year 2100 with instantaneous retrograde flyback.'
                }
              ].map(comp => (
                <div
                  key={comp.id}
                  onClick={() => {
                    playMechanicalTick(1.2);
                    setActiveComplicationTab(comp.id);
                  }}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    activeComplicationTab === comp.id
                      ? 'bg-[var(--bg-card)] border-[var(--color-primary)] shadow-md ring-1 ring-[var(--color-primary)]'
                      : 'bg-[var(--bg-card-subtle)] border-[var(--border-subtle)] hover:border-[var(--color-primary)] opacity-85 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className={`font-serif text-base font-semibold ${
                      activeComplicationTab === comp.id ? 'text-[var(--color-primary)]' : 'text-[var(--text-title)]'
                    }`}>
                      {comp.title}
                    </h4>
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      activeComplicationTab === comp.id ? 'bg-[var(--color-primary)] shadow-sm' : 'bg-[var(--border-subtle)]'
                    }`} />
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">
                    {comp.desc}
                  </p>
                </div>
              ))}

              {/* Minute Repeater Sound Audition Button */}
              <div className="pt-2">
                <button 
                  onClick={handleChimeDemo}
                  disabled={isPlayingChime}
                  className="w-full py-3.5 px-4 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-card)] rounded-xl text-[var(--color-primary)] text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Volume2 className={`w-4 h-4 text-[var(--color-primary)] ${isPlayingChime ? 'animate-bounce' : ''}`} />
                  <span>{isPlayingChime ? 'Chiming Cathedral Gongs...' : 'Audition Minute Repeater Chime'}</span>
                </button>
              </div>
            </div>

            {/* Center Column: Interactive Timepiece Display with 360 Aura */}
            <div className="lg:col-span-7 flex flex-col items-center relative">
              <div className="relative w-full max-w-lg aspect-square flex items-center justify-center bg-[var(--bg-card)] rounded-2xl border border-[var(--border-card)] p-8 shadow-xl">
                
                {/* Rotating Aura Rings */}
                <div className="absolute inset-4 border border-[var(--border-card)] rounded-full animate-spin-slow pointer-events-none opacity-60"></div>
                <div className="absolute inset-10 border border-dashed border-[var(--border-card)] rounded-full animate-spin-reverse-slow pointer-events-none opacity-40"></div>

                {/* Watch Showcase Image */}
                <img 
                  src={heroWatch.images[0]} 
                  alt={heroWatch.name} 
                  className="relative z-10 max-h-[85%] max-w-[85%] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 cursor-pointer"
                  onClick={() => navigateTo('details', heroWatch.id)}
                />
              </div>

              {/* Bottom Specs Bar */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--text-body)]">
                <span className="font-mono bg-[var(--bg-card)] px-3 py-1 rounded-md border border-[var(--border-subtle)] shadow-sm">
                  Calibre CHR-27-SID
                </span>
                <span className="text-[var(--color-primary)] font-semibold font-cinzel text-sm">
                  {formatPrice(heroWatch.price)}
                </span>
                <button 
                  onClick={() => navigateTo('details', heroWatch.id)}
                  className="text-[var(--text-title)] hover:text-[var(--color-primary)] uppercase tracking-widest text-[11px] underline underline-offset-4 flex items-center space-x-1 transition-colors"
                >
                  <span>Explore Blueprint</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. CURATED MASTERPIECE COLLECTIONS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[var(--border-subtle)]">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)] font-cinzel">
              The 2026 Collection
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[var(--text-title)] mt-2">
              Featured Swiss Timepieces
            </h2>
          </div>
          <button 
            onClick={() => navigateTo('collection')}
            className="mt-4 md:mt-0 text-xs uppercase tracking-[0.25em] text-[var(--color-primary)] hover:text-[var(--color-primary-light)] flex items-center space-x-2 font-medium"
          >
            <span>View Complete 8 Masterpieces</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Watch Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredWatches.map((watch) => {
            const isWishlisted = wishlist.includes(watch.id);
            const isCompared = compareList.includes(watch.id);

            return (
              <div 
                key={watch.id}
                className="group relative bg-[var(--bg-card)] border border-[var(--border-card)] rounded-xl overflow-hidden shadow-lg hover:border-[var(--color-primary)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Badge */}
                <div className="p-4 pb-0 flex justify-between items-start z-10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--text-muted)] bg-[var(--bg-card-subtle)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                    {watch.ref}
                  </span>
                  <div className="flex space-x-1">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(watch.id);
                      }}
                      className={`p-1.5 rounded-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] transition-colors ${
                        isWishlisted ? 'text-[var(--color-primary)] border-[var(--color-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--color-primary)]'
                      }`}
                      title="Wishlist"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompare(watch.id);
                      }}
                      className={`p-1.5 rounded-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] transition-colors ${
                        isCompared ? 'text-[var(--color-primary)] border-[var(--color-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--color-primary)]'
                      }`}
                      title="Compare"
                    >
                      <Scale className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Watch Imagery with Zoom Hover */}
                <div 
                  className="p-6 relative flex items-center justify-center min-h-[260px] cursor-pointer"
                  onClick={() => navigateTo('details', watch.id)}
                >
                  <img 
                    src={watch.images[0]} 
                    alt={watch.name} 
                    className="max-h-56 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Quick Look overlay button */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuickLook(watch);
                      }}
                      className="px-4 py-2 bg-[var(--color-primary)] text-white font-semibold text-[11px] uppercase tracking-wider rounded shadow-lg hover:brightness-110 transition-colors flex items-center space-x-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick Blueprint</span>
                    </button>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-5 bg-[var(--bg-card-subtle)] border-t border-[var(--border-subtle)] space-y-2">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)] font-cinzel">
                    {watch.collection}
                  </div>
                  <h3 
                    onClick={() => navigateTo('details', watch.id)}
                    className="font-serif text-base font-semibold text-[var(--text-title)] hover:text-[var(--color-primary)] transition-colors cursor-pointer truncate"
                  >
                    {watch.name}
                  </h3>
                  <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">
                    {watch.movementType} • {watch.caseMaterial}
                  </p>
                  
                  <div className="pt-2 flex items-center justify-between">
                    <span className="font-cinzel text-sm font-bold text-[var(--color-primary)]">
                      {formatPrice(watch.price)}
                    </span>
                    <button 
                      onClick={() => startAcquisition(watch)}
                      className="px-3 py-1.5 bg-[var(--bg-card)] hover:bg-[var(--color-primary)] hover:text-white border border-[var(--border-card)] rounded text-[11px] uppercase tracking-wider text-[var(--text-title)] transition-all font-medium"
                    >
                      Acquire
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* 4. THE SWISS ATELIER HERITAGE & METIERS D'ART */}
      <section className="py-24 bg-[var(--bg-section)] relative overflow-hidden border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Heritage Text */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)] font-cinzel">
                Geneva Watchmaking Legacy
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[var(--text-title)] leading-tight">
                Crafting the Soul of Mechanical Chronometry
              </h2>
              <p className="text-sm text-[var(--text-body)] leading-relaxed font-light">
                Since 1839 in Geneva, Chronova has upheld an unbroken chain of independent Swiss watchmaking. Every timepiece is entirely designed, engineered, hand-beveled, and assembled under one roof by master horologists who dedicate their lives to the mastery of time.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="border-l-2 border-[var(--color-primary)] pl-4 space-y-1">
                  <div className="font-cinzel text-lg text-[var(--text-title)] font-bold">100% Hand-Anglage</div>
                  <div className="text-xs text-[var(--text-muted)]">All bridge bevels polished by hand using gentian wood stems.</div>
                </div>
                <div className="border-l-2 border-[var(--color-primary)] pl-4 space-y-1">
                  <div className="font-cinzel text-lg text-[var(--text-title)] font-bold">Grand Feu Enamel</div>
                  <div className="text-xs text-[var(--text-muted)]">Fired in kilns at 850°C for permanent color luster over centuries.</div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => navigateTo('heritage')}
                  className="px-6 py-3.5 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-card)] text-[var(--color-primary)] font-medium text-xs uppercase tracking-[0.2em] rounded transition-colors flex items-center space-x-2 shadow-sm"
                >
                  <span>Explore Atelier Craftsmanship & History</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Heritage Video / Imagery Showcase */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border-card)] shadow-2xl bg-black">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-[400px] object-cover opacity-80"
                >
                  <source src={getAssetUrl('videos/10853-226632937_medium.mp4')} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-white">
                  <div>
                    <div className="font-serif font-bold text-sm text-[var(--color-primary)]">Vallée de Joux Master Atelier</div>
                    <div className="text-[11px] text-slate-300">Assembly of Calibre 240 Micro-Rotor</div>
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--color-primary)] border border-[var(--color-primary)] px-2 py-1 rounded">
                    Geneva Seal
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. BOUTIQUE SALONS & PRIVATE APPOINTMENT CTA */}
      <section className="py-24 relative overflow-hidden bg-[var(--bg-page)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div className="w-12 h-12 mx-auto rounded-full bg-[var(--bg-card)] border border-[var(--border-card)] flex items-center justify-center text-[var(--color-primary)] mb-6 shadow-sm">
            <Calendar className="w-6 h-6" />
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)] font-cinzel">
            Private VIP Salons
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[var(--text-title)] mt-2 max-w-2xl mx-auto">
            Experience Haute Horlogerie in Geneva, London, or New York
          </h2>

          <p className="text-sm text-[var(--text-muted)] max-w-xl mx-auto mt-4 leading-relaxed font-light">
            We invite you to a private viewing accompanied by our master horologists. Examine rare complications under loupe magnification with complimentary champagne reception.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigateTo('contact')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-white font-semibold text-xs uppercase tracking-[0.25em] rounded shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2"
            >
              <span>Book Private Boutique Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigateTo('collection')}
              className="w-full sm:w-auto px-8 py-4 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] text-[var(--text-title)] border border-[var(--border-card)] text-xs uppercase tracking-[0.25em] rounded transition-colors shadow-sm"
            >
              Browse Catalog First
            </button>
          </div>

          {/* Cities badge */}
          <div className="mt-12 text-[11px] uppercase tracking-[0.35em] text-[var(--text-muted)] flex flex-wrap justify-center gap-6">
            <span>Genève</span>
            <span>•</span>
            <span>Zürich</span>
            <span>•</span>
            <span>London</span>
            <span>•</span>
            <span>New York</span>
            <span>•</span>
            <span>Paris</span>
            <span>•</span>
            <span>Tokyo</span>
            <span>•</span>
            <span>Dubai</span>
          </div>

        </div>
      </section>

    </div>
  );
}
