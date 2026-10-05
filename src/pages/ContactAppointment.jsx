import React, { useState } from 'react';
import { useWatch } from '../context/WatchContext';
import { BOUTIQUES } from '../data/watches';
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck,
  User,
  Wine,
  Eye,
  MessageSquare
} from 'lucide-react';

export default function ContactAppointment() {
  const { 
    watches, 
    bookAppointment, 
    submitInquiry, 
    user, 
    navigateTo, 
    showToast 
  } = useWatch();

  // Selected Boutique
  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState('geneva');
  
  // Appointment Form States
  const [aptName, setAptName] = useState(user ? user.name : '');
  const [aptEmail, setAptEmail] = useState(user ? user.email : '');
  const [aptPhone, setAptPhone] = useState('+41 79 330 19 28');
  const [selectedWatchRef, setSelectedWatchRef] = useState(watches[0].name + ' (' + watches[0].ref + ')');
  const [aptDate, setAptDate] = useState('2026-10-18');
  const [aptTime, setAptTime] = useState('14:30 CET');
  const [guestsCount, setGuestsCount] = useState('2 Guests');
  const [preferences, setPreferences] = useState([
    'Champagne Reception',
    'Private VIP Salon',
    'Master Watchmaker Consultation'
  ]);
  const [aptConfirmed, setAptConfirmed] = useState(null);

  // General Inquiry Form
  const [inqName, setInqName] = useState('');
  const [inqEmail, setInqEmail] = useState('');
  const [inqSubject, setInqSubject] = useState('General Maison Inquiry');
  const [inqMsg, setInqMsg] = useState('');

  const activeBoutique = BOUTIQUES.find(b => b.id === selectedBoutiqueId) || BOUTIQUES[0];

  const togglePreference = (pref) => {
    if (preferences.includes(pref)) {
      setPreferences(preferences.filter(p => p !== pref));
    } else {
      setPreferences([...preferences, pref]);
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const newApt = bookAppointment({
      name: aptName || 'Lord Julian Blackwood',
      email: aptEmail || 'collector@haute-horlogerie.ch',
      phone: aptPhone,
      boutiqueId: activeBoutique.id,
      boutiqueName: activeBoutique.city,
      date: aptDate,
      timeSlot: aptTime,
      timepieceInterest: selectedWatchRef,
      guests: guestsCount,
      preferences,
      conciergeAssigned: activeBoutique.curator
    });
    setAptConfirmed(newApt);
  };

  const handleGeneralInquirySubmit = (e) => {
    e.preventDefault();
    submitInquiry({
      name: inqName,
      email: inqEmail,
      subject: inqSubject,
      message: inqMsg,
      timepiece: 'General Inquiry'
    });
    setInqMsg('');
    showToast("Your confidential inquiry has been received by the Geneva Secretariat.", "gold");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)] pt-8 pb-24 transition-colors duration-300">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center space-x-2 text-[var(--color-primary)] text-xs font-cinzel tracking-[0.35em] uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          <span>Private Salon & Boutique Concierge</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif font-light text-[var(--text-title)] max-w-3xl mx-auto">
          Book a Private Salon Viewing
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-4 max-w-2xl mx-auto font-light leading-relaxed">
          Experience our grand complications in the intimacy of our private salons in Geneva, London, New York, Tokyo, Paris, Zurich, and Dubai.
        </p>
      </div>

      {/* BOUTIQUE LOCATOR & APPOINTMENT WIZARD CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Salon Selector Cards */}
        <div className="mb-12">
          <div className="text-xs font-cinzel uppercase tracking-[0.25em] text-slate-400 mb-4">
            Select Maison Salon Location
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {BOUTIQUES.map(boutique => (
              <button
                key={boutique.id}
                onClick={() => setSelectedBoutiqueId(boutique.id)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedBoutiqueId === boutique.id
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                    : 'bg-[#0E111A] border-white/10 text-slate-400 hover:border-white/30 hover:text-slate-200'
                }`}
              >
                <MapPin className={`w-4 h-4 mx-auto mb-1 ${selectedBoutiqueId === boutique.id ? 'text-amber-400' : 'text-slate-500'}`} />
                <span className="font-serif text-sm font-semibold block">{boutique.city.split(' ')[0]}</span>
                <span className="text-[10px] text-slate-500 block">Salon VIP</span>
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Grid: Active Boutique Details (Left) & Appointment Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Active Boutique Details Card (Left 5 Cols) */}
          <div className="lg:col-span-5 bg-[#0C0F17] border border-amber-500/25 rounded-2xl p-8 shadow-2xl space-y-6">
            <div className="relative rounded-xl overflow-hidden border border-white/10 h-48">
              <img 
                src={activeBoutique.image} 
                alt={activeBoutique.city} 
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-mono text-amber-400 bg-black/80 px-2 py-0.5 rounded border border-amber-500/30">
                  {activeBoutique.coordinates}
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-100 mt-1">{activeBoutique.city}</h3>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Address</div>
                  <div className="text-slate-400">{activeBoutique.address}</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Opening Hours</div>
                  <div className="text-slate-400">{activeBoutique.hours}</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Direct Salon Concierge</div>
                  <div className="text-slate-400">{activeBoutique.phone}</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <User className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Salon Curator & Master Advisor</div>
                  <div className="text-amber-300 font-serif">{activeBoutique.curator}</div>
                </div>
              </div>

              <div className="p-3 bg-[#131724] border border-amber-500/20 rounded-lg text-[11px] text-amber-200/90">
                <strong>Private Lounge:</strong> {activeBoutique.privateSalon}
              </div>
            </div>
          </div>

          {/* Appointment Booking Form (Right 7 Cols) */}
          <div className="lg:col-span-7 bg-[#0E111A] border border-amber-500/30 rounded-2xl p-8 sm:p-10 shadow-2xl">
            
            {aptConfirmed ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="text-xs uppercase font-cinzel tracking-widest text-amber-400 font-semibold">
                  Appointment Confirmed
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-100">
                  We look forward to receiving you, {aptConfirmed.name}
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Your private viewing at <strong>{aptConfirmed.boutiqueName}</strong> has been confirmed for <strong>{aptConfirmed.date} at {aptConfirmed.timeSlot}</strong> with curator <em>{aptConfirmed.conciergeAssigned}</em>.
                </p>

                <div className="p-4 bg-[#08090E] border border-amber-500/30 rounded-lg max-w-sm mx-auto text-left text-xs font-mono">
                  <div className="text-slate-500 text-[10px]">PASSCODE / REFERENCE:</div>
                  <div className="text-amber-400 text-base font-bold">{aptConfirmed.id}</div>
                  <div className="text-slate-400 text-[11px] mt-1">Timepiece: {aptConfirmed.timepieceInterest}</div>
                </div>

                <div className="pt-4 flex justify-center space-x-3">
                  <button 
                    onClick={() => setAptConfirmed(null)}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 rounded text-xs uppercase tracking-wider text-slate-200"
                  >
                    Book Another Salon
                  </button>
                  <button 
                    onClick={() => navigateTo('dashboard')}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold text-xs uppercase tracking-widest rounded"
                  >
                    View in Collector Vault
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-5 text-xs">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-100">
                    Salon Reservation: {activeBoutique.city}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select your timepiece of interest, appointment date, and VIP hospitality preferences.
                  </p>
                </div>

                {/* Timepiece Interest */}
                <div>
                  <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">
                    Primary Timepiece of Interest
                  </label>
                  <select 
                    value={selectedWatchRef}
                    onChange={(e) => setSelectedWatchRef(e.target.value)}
                    className="w-full bg-[#08090C] border border-white/15 rounded-lg px-3 py-2.5 text-slate-100 focus:outline-none focus:border-amber-400 text-xs"
                  >
                    {watches.map(w => (
                      <option key={w.id} value={`${w.name} (${w.ref})`}>
                        {w.name} — {w.ref} ({w.collection})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date and Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Preferred Date</label>
                    <input 
                      type="date" 
                      value={aptDate}
                      onChange={(e) => setAptDate(e.target.value)}
                      required
                      className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Time Slot</label>
                    <select 
                      value={aptTime}
                      onChange={(e) => setAptTime(e.target.value)}
                      className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                    >
                      <option value="11:00 CET">11:00 (Morning Salon)</option>
                      <option value="14:30 CET">14:30 (Afternoon Viewing)</option>
                      <option value="16:30 CET">16:30 (Tea & Horology)</option>
                      <option value="18:00 CET">18:00 (Evening Champagne Reception)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Guest Party</label>
                    <select 
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(e.target.value)}
                      className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                    >
                      <option value="1 Guest">Solo Private Viewing</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3-4 Guests">Private Party (Up to 4)</option>
                    </select>
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Full Name / Title</label>
                    <input 
                      type="text" 
                      value={aptName}
                      onChange={(e) => setAptName(e.target.value)}
                      placeholder="e.g. Lord Julian Blackwood"
                      required
                      className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Confidential Email</label>
                    <input 
                      type="email" 
                      value={aptEmail}
                      onChange={(e) => setAptEmail(e.target.value)}
                      placeholder="collector@private.ch"
                      required
                      className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Direct Phone</label>
                    <input 
                      type="tel" 
                      value={aptPhone}
                      onChange={(e) => setAptPhone(e.target.value)}
                      required
                      className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* VIP Preferences */}
                <div>
                  <label className="block text-slate-400 mb-2 uppercase tracking-wider text-[10px]">
                    VIP Salon Hospitality Preferences
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Champagne Reception',
                      'Private VIP Salon',
                      'Master Watchmaker Consultation',
                      'Wrist Sizing & Custom Strap Fitting',
                      'Heritage Archive Appraisal'
                    ].map(pref => {
                      const active = preferences.includes(pref);
                      return (
                        <label 
                          key={pref}
                          onClick={() => togglePreference(pref)}
                          className={`flex items-center space-x-2 p-2 rounded cursor-pointer border transition-colors ${
                            active ? 'bg-amber-500/15 border-amber-400/60 text-amber-300' : 'border-white/10 bg-[#08090C] text-slate-400'
                          }`}
                        >
                          <input 
                            type="checkbox" 
                            checked={active}
                            onChange={() => {}}
                            className="rounded border-slate-700 text-amber-500 focus:ring-0"
                          />
                          <span className="text-[11px]">{pref}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 mt-2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-black font-semibold text-xs uppercase tracking-[0.25em] rounded-lg shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:brightness-110 transition-all text-center"
                >
                  Confirm Boutique Appointment
                </button>
              </form>
            )}

          </div>

        </div>

        {/* GENERAL CONCIERGE INQUIRY & BESPOKE COMMISSIONS */}
        <div className="bg-[#0A0C13] border border-amber-500/20 rounded-2xl p-8 sm:p-12">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h3 className="font-serif text-3xl font-light text-slate-100">
              Direct Geneva Maison Inquiries & Bespoke Commissions
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              For custom gem-setting, bespoke caseback engravings, or questions regarding historical references.
            </p>
          </div>

          <form onSubmit={handleGeneralInquirySubmit} className="max-w-xl mx-auto space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input 
                type="text" 
                placeholder="Your Full Name"
                value={inqName}
                onChange={(e) => setInqName(e.target.value)}
                required
                className="bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
              />
              <input 
                type="email" 
                placeholder="Confidential Email"
                value={inqEmail}
                onChange={(e) => setInqEmail(e.target.value)}
                required
                className="bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>

            <input 
              type="text" 
              placeholder="Subject (e.g. Unique Piece Commission)"
              value={inqSubject}
              onChange={(e) => setInqSubject(e.target.value)}
              required
              className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
            />

            <textarea 
              rows={4}
              placeholder="Describe your bespoke request or horological inquiry..."
              value={inqMsg}
              onChange={(e) => setInqMsg(e.target.value)}
              required
              className="w-full bg-[#08090C] border border-white/15 rounded p-3 text-slate-100 focus:outline-none focus:border-amber-400"
            />

            <button 
              type="submit"
              className="w-full py-3 bg-[#131724] hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold text-xs uppercase tracking-widest rounded transition-all"
            >
              Transmit Confidential Message
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
