import React, { useState, useRef } from 'react';
import { useWatch } from '../context/WatchContext';
import { playMinuteRepeaterChime, playMechanicalTick } from '../utils/audioEngine';
import { 
  Heart, 
  Scale, 
  Share2, 
  ShieldCheck, 
  Award, 
  Clock, 
  Sparkles, 
  Volume2, 
  FileText, 
  Calendar, 
  MessageSquare, 
  Check, 
  ChevronRight, 
  ChevronLeft,
  RotateCw,
  ZoomIn,
  Play,
  Layers,
  Info
} from 'lucide-react';

export default function WatchDetails() {
  const { 
    selectedWatch, 
    formatPrice, 
    navigateTo, 
    toggleWishlist, 
    wishlist, 
    toggleCompare, 
    compareList, 
    startAcquisition, 
    watches,
    submitInquiry,
    showToast
  } = useWatch();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [is360Active, setIs360Active] = useState(false);
  const [loupeActive, setLoupeActive] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 0, y: 0, bgX: 0, bgY: 0 });
  const [isPlayingChime, setIsPlayingChime] = useState(false);
  const [activeTab, setActiveTab] = useState('calibre'); // 'calibre' | 'case' | 'complications' | 'certificate'
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySubject, setInquirySubject] = useState(`Private Concierge Inquiry for ${selectedWatch.name}`);
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');

  const imageRef = useRef(null);

  const isWishlisted = wishlist.includes(selectedWatch.id);
  const isCompared = compareList.includes(selectedWatch.id);

  // Loupe Zoom Handler
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    if (x >= 0 && x <= width && y >= 0 && y <= height) {
      setLoupeActive(true);
      const bgX = (x / width) * 100;
      const bgY = (y / height) * 100;
      setLoupePos({ x, y, bgX, bgY });
    } else {
      setLoupeActive(false);
    }
  };

  const handleMouseLeave = () => {
    setLoupeActive(false);
  };

  const rotate360 = () => {
    playMechanicalTick(1.3);
    setActiveImageIndex((prev) => (prev + 1) % selectedWatch.images.length);
  };

  const handleChimePlay = (mode = 'full') => {
    setIsPlayingChime(true);
    playMinuteRepeaterChime(mode);
    setTimeout(() => {
      setIsPlayingChime(false);
    }, 4500);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    submitInquiry({
      name: inquiryName,
      email: inquiryEmail,
      subject: inquirySubject,
      timepiece: `${selectedWatch.name} (${selectedWatch.ref})`,
      message: inquiryMsg
    });
    setInquiryModalOpen(false);
    setInquiryMsg('');
  };

  // Related watches from same or adjacent collections
  const relatedWatches = watches
    .filter(w => w.id !== selectedWatch.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)] pt-6 pb-24 transition-colors duration-300">
      
      {/* Breadcrumbs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center space-x-2 text-xs text-slate-400 font-cinzel">
          <button onClick={() => navigateTo('home')} className="hover:text-amber-300 transition-colors">
            Maison
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('collection')} className="hover:text-amber-300 transition-colors">
            Collections
          </button>
          <span>/</span>
          <span className="text-amber-400">{selectedWatch.collection}</span>
          <span>/</span>
          <span className="text-slate-200 truncate">{selectedWatch.ref}</span>
        </div>
      </div>

      {/* Main Watch Detail Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT 7 COLUMNS: Interactive Loupe Gallery & 360 Showcase */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Visualizer Container */}
            <div className="relative bg-[#0A0C13] border border-amber-500/25 rounded-2xl p-8 overflow-hidden shadow-2xl flex flex-col items-center justify-center min-h-[480px]">
              
              {/* Dial Radial Light */}
              <div className="absolute inset-0 bg-dark-radial opacity-60"></div>
              <div className="absolute w-72 h-72 rounded-full border border-amber-500/10 pointer-events-none"></div>

              {/* Main Image with Optical Loupe Magnification */}
              <div 
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative z-10 w-full max-w-md aspect-square flex items-center justify-center cursor-crosshair select-none"
              >
                <img 
                  src={selectedWatch.images[activeImageIndex]} 
                  alt={selectedWatch.name} 
                  className="max-h-full max-w-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)] transition-transform duration-300"
                />

                {/* Loupe Magnifier Glass Overlay */}
                {loupeActive && (
                  <div 
                    className="absolute w-44 h-44 rounded-full border-2 border-amber-400 shadow-[0_0_30px_rgba(212,175,55,0.6)] pointer-events-none overflow-hidden z-30"
                    style={{
                      left: `${loupePos.x - 88}px`,
                      top: `${loupePos.y - 88}px`,
                      backgroundImage: `url(${selectedWatch.images[activeImageIndex]})`,
                      backgroundPosition: `${loupePos.bgX}% ${loupePos.bgY}%`,
                      backgroundSize: '350%',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: '#0A0C13'
                    }}
                  >
                    <div className="absolute inset-0 border-4 border-black/30 rounded-full"></div>
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-mono text-amber-300 bg-black/80 px-1 rounded">
                      3.5× LOUPE
                    </div>
                  </div>
                )}
              </div>

              {/* Visualizer Controls Top & Bottom Bar */}
              <div className="absolute top-4 left-4 flex space-x-2 z-20">
                <span className="text-[10px] font-mono text-amber-300 bg-black/70 border border-amber-500/30 px-2.5 py-1 rounded">
                  {selectedWatch.ref}
                </span>
                <span className="text-[10px] font-cinzel text-slate-300 bg-black/70 border border-white/10 px-2 py-1 rounded">
                  {selectedWatch.availability}
                </span>
              </div>

              <div className="absolute bottom-4 right-4 flex items-center space-x-2 z-20">
                <button 
                  onClick={rotate360}
                  className="px-3 py-1.5 bg-black/70 hover:bg-amber-500/20 border border-amber-500/40 rounded text-xs text-amber-300 flex items-center space-x-1.5 backdrop-blur-sm transition-colors"
                  title="Rotate Watch Perspective"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-cinzel">Angle {activeImageIndex + 1}/{selectedWatch.images.length}</span>
                </button>
              </div>

              <div className="absolute bottom-4 left-4 text-[10px] text-slate-400 hidden sm:flex items-center space-x-1.5">
                <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                <span>Hover cursor over dial to activate Swiss Loupe</span>
              </div>
            </div>

            {/* Thumbnail Gallery & Video Trigger */}
            <div className="flex items-center space-x-4 overflow-x-auto pb-2">
              {selectedWatch.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playMechanicalTick(1.1);
                    setActiveImageIndex(idx);
                  }}
                  className={`relative p-2 rounded-lg bg-[#0C0E17] border transition-all flex-shrink-0 ${
                    activeImageIndex === idx 
                      ? 'border-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                      : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-16 h-16 object-contain" />
                </button>
              ))}

              {/* Video Player Modal or Preview */}
              {selectedWatch.video && (
                <div className="flex-shrink-0">
                  <div className="relative group w-20 h-20 rounded-lg overflow-hidden border border-amber-500/30 bg-black flex items-center justify-center cursor-pointer">
                    <video 
                      src={selectedWatch.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-amber-400/90 text-black flex items-center justify-center shadow">
                        <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Minute Repeater Cathedral Acoustic Player (If Complication Exists) */}
            <div className="p-5 bg-[#0C0F18] border border-amber-500/25 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-cinzel text-xs uppercase tracking-wider text-amber-300 font-semibold">
                    Acoustic Movement Chime Simulator
                  </div>
                  <div className="text-xs text-slate-400">
                    Audition hand-tuned Geneva Cathedral gongs synthesized in real-time.
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleChimePlay('hour')}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded text-[11px] uppercase tracking-wider text-slate-200"
                >
                  Hour
                </button>
                <button 
                  onClick={() => handleChimePlay('quarter')}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded text-[11px] uppercase tracking-wider text-slate-200"
                >
                  Quarter
                </button>
                <button 
                  onClick={() => handleChimePlay('full')}
                  disabled={isPlayingChime}
                  className="px-4 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded text-[11px] uppercase tracking-wider text-amber-300 font-semibold"
                >
                  {isPlayingChime ? 'Chiming...' : 'Full Sequence'}
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLUMNS: Pricing, Order CTA, Specs & Inquiries */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Collection Header */}
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-amber-400 font-cinzel flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{selectedWatch.collection}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-100 mt-1">
                {selectedWatch.name}
              </h1>
              <div className="text-xs font-mono text-slate-400 mt-1">
                Reference: <strong className="text-slate-200">{selectedWatch.ref}</strong>
              </div>

              {/* Price Banner */}
              <div className="mt-4 flex items-baseline space-x-3">
                <div className="font-cinzel text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
                  {formatPrice(selectedWatch.price)}
                </div>
                <span className="text-xs text-slate-400">
                  (Incl. Swiss VAT & Armored Courier)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              {selectedWatch.description}
            </p>

            {/* Quick Highlights Pill Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#0D1019] rounded-lg border border-white/5 space-y-1">
                <span className="text-slate-500 block text-[10px] uppercase font-cinzel">Calibre</span>
                <span className="font-mono text-slate-200 font-semibold">{selectedWatch.calibre}</span>
              </div>
              <div className="p-3 bg-[#0D1019] rounded-lg border border-white/5 space-y-1">
                <span className="text-slate-500 block text-[10px] uppercase font-cinzel">Power Reserve</span>
                <span className="text-amber-400 font-semibold">{selectedWatch.powerReserve}</span>
              </div>
              <div className="p-3 bg-[#0D1019] rounded-lg border border-white/5 space-y-1">
                <span className="text-slate-500 block text-[10px] uppercase font-cinzel">Case Diameter</span>
                <span className="text-slate-200 font-medium">{selectedWatch.caseDiameter} • {selectedWatch.caseThickness}</span>
              </div>
              <div className="p-3 bg-[#0D1019] rounded-lg border border-white/5 space-y-1">
                <span className="text-slate-500 block text-[10px] uppercase font-cinzel">Hallmark</span>
                <span className="text-amber-300 font-medium flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span className="truncate">{selectedWatch.hallmark}</span>
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <button 
                onClick={() => startAcquisition(selectedWatch)}
                className="w-full py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-black font-semibold text-xs uppercase tracking-[0.25em] rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:brightness-110 transition-all text-center"
              >
                Acquire Timepiece
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => navigateTo('contact')}
                  className="py-3 px-3 bg-[#111420] hover:bg-white/10 border border-amber-500/30 rounded text-slate-200 text-xs uppercase tracking-wider font-cinzel transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Book Salon Viewing</span>
                </button>
                <button 
                  onClick={() => setInquiryModalOpen(true)}
                  className="py-3 px-3 bg-[#111420] hover:bg-white/10 border border-amber-500/30 rounded text-slate-200 text-xs uppercase tracking-wider font-cinzel transition-colors flex items-center justify-center space-x-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  <span>Maison Concierge</span>
                </button>
              </div>

              {/* Wishlist & Compare Quick bar */}
              <div className="flex space-x-3 pt-1">
                <button 
                  onClick={() => toggleWishlist(selectedWatch.id)}
                  className={`flex-1 py-2.5 px-3 rounded border text-xs flex items-center justify-center space-x-2 transition-colors ${
                    isWishlisted 
                      ? 'bg-amber-500/20 border-amber-400 text-amber-400' 
                      : 'border-white/10 bg-[#0A0C13] text-slate-300 hover:border-amber-400 hover:text-amber-400'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button 
                  onClick={() => toggleCompare(selectedWatch.id)}
                  className={`flex-1 py-2.5 px-3 rounded border text-xs flex items-center justify-center space-x-2 transition-colors ${
                    isCompared 
                      ? 'bg-amber-500/20 border-amber-400 text-amber-400' 
                      : 'border-white/10 bg-[#0A0C13] text-slate-300 hover:border-amber-400 hover:text-amber-400'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{isCompared ? 'Comparing' : 'Compare Calibre'}</span>
                </button>
              </div>
            </div>

            {/* VIP Guarantees */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Certificate of Authenticity with Cryptographic Geneva Register</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Lifetime Atelier Service & Chronometric Maintenance Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Insured White-Glove Armored Handover Globally</span>
              </div>
            </div>

          </div>

        </div>

        {/* HOROLOGICAL SPECIFICATION TABS MATRIX */}
        <div className="mt-20 border-t border-amber-500/20 pt-12">
          
          {/* Tabs Selector */}
          <div className="flex border-b border-white/10 overflow-x-auto space-x-8 text-xs uppercase tracking-[0.25em] font-cinzel">
            <button
              onClick={() => setActiveTab('calibre')}
              className={`pb-3 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'calibre' ? 'border-amber-400 text-amber-300 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Mechanical Calibre Blueprint
            </button>
            <button
              onClick={() => setActiveTab('case')}
              className={`pb-3 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'case' ? 'border-amber-400 text-amber-300 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Case, Dial & Strap
            </button>
            <button
              onClick={() => setActiveTab('complications')}
              className={`pb-3 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'complications' ? 'border-amber-400 text-amber-300 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Complications & Functions
            </button>
          </div>

          {/* TAB 1: Calibre Specs */}
          {activeTab === 'calibre' && selectedWatch.specs && (
            <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-300">
              <div className="bg-[#0B0E16] p-6 rounded-xl border border-white/5 space-y-4">
                <h4 className="font-cinzel text-sm uppercase tracking-wider text-amber-300 font-semibold border-b border-white/10 pb-2">
                  Calibre Architecture
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Calibre Designation</span>
                    <span className="font-mono text-slate-100">{selectedWatch.specs.movement.calibre}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Winding Type</span>
                    <span className="text-slate-100">{selectedWatch.specs.movement.type}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Diameter & Thickness</span>
                    <span className="font-mono text-slate-100">{selectedWatch.specs.movement.diameter} • {selectedWatch.specs.movement.thickness}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Jewel Count & Parts</span>
                    <span className="font-mono text-slate-100">{selectedWatch.specs.movement.jewels} / {selectedWatch.specs.movement.parts}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0B0E16] p-6 rounded-xl border border-white/5 space-y-4">
                <h4 className="font-cinzel text-sm uppercase tracking-wider text-amber-300 font-semibold border-b border-white/10 pb-2">
                  Regulating Organ & Finishing
                </h4>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Balance & Spring</span>
                  <span className="text-slate-100">{selectedWatch.specs.movement.balance}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Master Decoration</span>
                  <span className="text-slate-300 leading-relaxed">{selectedWatch.specs.movement.finishing}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Case & Dial Specs */}
          {activeTab === 'case' && selectedWatch.specs && (
            <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
              <div className="bg-[#0B0E16] p-6 rounded-xl border border-white/5 space-y-3">
                <h4 className="font-cinzel text-sm uppercase tracking-wider text-amber-300 font-semibold border-b border-white/10 pb-2">
                  Case Architecture
                </h4>
                <p><strong>Material:</strong> {selectedWatch.specs.case.material}</p>
                <p><strong>Finishing:</strong> {selectedWatch.specs.case.finishing}</p>
                <p><strong>Sapphire:</strong> {selectedWatch.specs.case.glass}</p>
                <p><strong>Crown:</strong> {selectedWatch.specs.case.crown}</p>
              </div>

              <div className="bg-[#0B0E16] p-6 rounded-xl border border-white/5 space-y-3">
                <h4 className="font-cinzel text-sm uppercase tracking-wider text-amber-300 font-semibold border-b border-white/10 pb-2">
                  Dial Artistry
                </h4>
                <p><strong>Front Dial:</strong> {selectedWatch.specs.dial.front}</p>
                {selectedWatch.specs.dial.back && (
                  <p><strong>Reverse Dial:</strong> {selectedWatch.specs.dial.back}</p>
                )}
              </div>

              <div className="bg-[#0B0E16] p-6 rounded-xl border border-white/5 space-y-3">
                <h4 className="font-cinzel text-sm uppercase tracking-wider text-amber-300 font-semibold border-b border-white/10 pb-2">
                  Strap & Clasp
                </h4>
                <p><strong>Strap:</strong> {selectedWatch.specs.strap.material}</p>
                <p><strong>Clasp:</strong> {selectedWatch.specs.strap.clasp}</p>
              </div>
            </div>
          )}

          {/* TAB 3: Complications */}
          {activeTab === 'complications' && (
            <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-slate-300">
              {selectedWatch.complications.map((comp, idx) => (
                <div key={idx} className="p-4 bg-[#0B0E16] border border-amber-500/20 rounded-lg flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0 text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="font-serif text-sm font-semibold text-slate-100">{comp}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">Hand-adjusted by Geneva Master Horologist.</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* RELATED TIMEPIECES */}
        <div className="mt-20 border-t border-amber-500/20 pt-12">
          <h3 className="font-serif text-2xl font-light text-slate-100 mb-8 text-center">
            Complementary Masterpieces
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedWatches.map(watch => (
              <div 
                key={watch.id}
                onClick={() => navigateTo('details', watch.id)}
                className="bg-[#0B0D14] border border-amber-500/20 rounded-xl p-5 hover:border-amber-400/60 cursor-pointer transition-all duration-300 text-center group"
              >
                <img 
                  src={watch.images[0]} 
                  alt={watch.name} 
                  className="w-36 h-36 object-contain mx-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform"
                />
                <div className="text-[10px] uppercase font-cinzel text-amber-400 mt-4">{watch.collection}</div>
                <h4 className="font-serif text-sm font-semibold text-slate-100 mt-1">{watch.name}</h4>
                <div className="text-amber-400 font-cinzel font-bold text-xs mt-2">{formatPrice(watch.price)}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CONCIERGE DIRECT INQUIRY MODAL */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setInquiryModalOpen(false)} />
          <div className="relative bg-[#0E1119] border border-amber-500/30 rounded-xl max-w-lg w-full p-6 shadow-2xl z-10 text-slate-200">
            <h3 className="font-cinzel text-lg font-bold text-amber-200">Geneva Maison Concierge</h3>
            <p className="text-xs text-slate-400 mt-1">Direct confidential inquiry for {selectedWatch.name}</p>

            <form onSubmit={handleInquirySubmit} className="space-y-4 mt-6 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Your Name</label>
                <input 
                  type="text" 
                  value={inquiryName} 
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="e.g. Lord Julian Blackwood" 
                  required
                  className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Confidential Email</label>
                <input 
                  type="email" 
                  value={inquiryEmail} 
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  placeholder="collector@private.ch" 
                  required
                  className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Inquiry / Customization Notes</label>
                <textarea 
                  rows={3}
                  value={inquiryMsg} 
                  onChange={(e) => setInquiryMsg(e.target.value)}
                  placeholder="Ask about allocation dates, custom precious stone setting, or private salon viewings..." 
                  required
                  className="w-full bg-[#08090C] border border-white/15 rounded p-3 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setInquiryModalOpen(false)}
                  className="py-2.5 px-4 bg-white/5 hover:bg-white/10 rounded text-slate-300 uppercase text-[11px]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold text-xs uppercase tracking-wider rounded shadow hover:brightness-110"
                >
                  Transmit to Geneva Atelier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
