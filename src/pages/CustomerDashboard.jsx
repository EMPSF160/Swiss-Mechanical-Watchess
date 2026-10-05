import React, { useState } from 'react';
import { useWatch } from '../context/WatchContext';
import { 
  User, 
  ShieldCheck, 
  Award, 
  Heart, 
  Calendar, 
  Package, 
  FileText, 
  Sparkles, 
  Truck, 
  Clock, 
  ExternalLink, 
  Trash2, 
  Printer, 
  QrCode,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function CustomerDashboard() {
  const { 
    user, 
    orders, 
    appointments, 
    wishlist, 
    watches, 
    toggleWishlist, 
    formatPrice, 
    navigateTo, 
    startAcquisition, 
    logout,
    setIsAuthModalOpen 
  } = useWatch();

  const [activeTab, setActiveTab] = useState('vault'); // 'vault' | 'certificates' | 'orders' | 'appointments' | 'wishlist'
  const [selectedCert, setSelectedCert] = useState(null);

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#07080B] text-slate-200 p-4">
        <div className="text-center max-w-md bg-[#0D1017] border border-amber-500/30 rounded-2xl p-8 shadow-2xl">
          <Lock className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="font-cinzel text-2xl font-bold text-amber-200">Collector Vault Restricted</h2>
          <p className="text-xs text-slate-400 mt-2">
            Please sign in with your VIP credentials to access your registered timepieces, certificates, and white-glove orders.
          </p>
          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold text-xs uppercase tracking-widest rounded"
          >
            Access Vault
          </button>
        </div>
      </div>
    );
  }

  const wishlistedWatches = watches.filter(w => wishlist.includes(w.id));

  // Registered Vault Pieces
  const registeredPieces = user.registeredWatches || [];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-body)] pt-8 pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* VIP Profile Header Card */}
        <div className="bg-[#0C0E16] border border-amber-500/30 rounded-2xl p-6 sm:p-8 mb-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-radial-gold opacity-10 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center text-black font-serif text-2xl font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase tracking-widest font-cinzel text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded">
                    {user.tier}
                  </span>
                  <span className="text-xs text-slate-500">Member Since {user.memberSince}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100 mt-1">
                  {user.name}
                </h1>
                <div className="text-xs text-slate-400 font-mono">{user.email}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigateTo('contact')}
                className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded text-amber-300 text-xs uppercase tracking-wider font-cinzel transition-colors"
              >
                Direct Concierge
              </button>
              <button 
                onClick={logout}
                className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-slate-400 hover:text-white text-xs uppercase tracking-wider transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-white/10 overflow-x-auto space-x-8 mb-8 text-xs uppercase tracking-[0.25em] font-cinzel">
          <button
            onClick={() => setActiveTab('vault')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
              activeTab === 'vault' ? 'border-amber-400 text-amber-300 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>My Timepiece Vault ({registeredPieces.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
              activeTab === 'certificates' ? 'border-amber-400 text-amber-300 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Authenticity Passports</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
              activeTab === 'orders' ? 'border-amber-400 text-amber-300 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Armored Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
              activeTab === 'appointments' ? 'border-amber-400 text-amber-300 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Salon Appointments ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3 border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
              activeTab === 'wishlist' ? 'border-amber-400 text-amber-300 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlistedWatches.length})</span>
          </button>
        </div>

        {/* TAB 1: MY VAULT / COLLECTION */}
        {activeTab === 'vault' && (
          <div className="space-y-6">
            {registeredPieces.length === 0 ? (
              <div className="bg-[#0B0D14] border border-amber-500/20 rounded-xl p-12 text-center">
                <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-serif text-slate-200">No Timepieces Registered Yet</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Acquire a masterpiece to register its unique serial and certificate in your Geneva vault.
                </p>
                <button 
                  onClick={() => navigateTo('collection')}
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold text-xs uppercase tracking-widest rounded"
                >
                  Explore Timepieces
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {registeredPieces.map((piece, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#0B0E17] border border-amber-500/25 rounded-xl p-6 shadow-xl flex items-center space-x-6 relative overflow-hidden"
                  >
                    <img 
                      src={piece.image} 
                      alt={piece.model} 
                      className="w-24 h-24 object-contain bg-black/40 rounded p-1 flex-shrink-0"
                    />
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        {piece.serial}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-slate-100 truncate">{piece.model}</h3>
                      <p className="text-xs text-slate-400">{piece.ref}</p>
                      <div className="text-[11px] text-slate-500">
                        Registered: {piece.acquiredDate} • {piece.hallmark}
                      </div>
                      <div className="pt-2">
                        <button 
                          onClick={() => {
                            setSelectedCert(piece);
                            setActiveTab('certificates');
                          }}
                          className="text-[11px] font-cinzel text-amber-300 hover:text-amber-200 underline uppercase tracking-wider flex items-center space-x-1"
                        >
                          <FileText className="w-3 h-3" />
                          <span>View Official Certificate</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CERTIFICATE OF AUTHENTICITY & PROVENANCE PASSPORT */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="max-w-3xl mx-auto bg-[#0A0C13] border-2 border-amber-500/50 rounded-2xl p-8 sm:p-12 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden text-slate-200" id="certificate-print-area">
              
              {/* Guilloche border motif */}
              <div className="absolute inset-2 border border-amber-500/20 rounded-xl pointer-events-none"></div>
              
              {/* Header */}
              <div className="text-center pb-8 border-b border-amber-500/25 relative">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 mb-3 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  <Award className="w-7 h-7 text-amber-400" />
                </div>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 uppercase">
                  CHRONOVA GENÈVE
                </h2>
                <div className="text-[10px] uppercase tracking-[0.4em] text-slate-400 mt-1 font-cinzel">
                  Certificat d'Origine et de Garantie Horlogère
                </div>
              </div>

              {/* Body Details */}
              <div className="py-8 space-y-6 text-xs">
                <p className="text-center font-serif italic text-sm text-slate-300 max-w-lg mx-auto">
                  “We hereby certify that this mechanical timepiece was entirely conceived, manufactured, hand-beveled, and chronometrically tested in the Canton of Geneva in accordance with the strict regulations of the Geneva Seal.”
                </p>

                <div className="grid grid-cols-2 gap-4 p-5 bg-[#07080D] border border-amber-500/20 rounded-xl font-mono text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-sans">Patron Owner:</span>
                    <span className="text-slate-100 font-semibold">{user.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-sans">Certificate Dossier:</span>
                    <span className="text-amber-400 font-bold">{selectedCert ? selectedCert.certificateId : "CH-GE-6002G-884920"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-sans">Masterpiece Model:</span>
                    <span className="text-slate-100">{selectedCert ? selectedCert.model : "Celestial Sky Grand Tourbillon"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-sans">Serial Number:</span>
                    <span className="text-slate-100 font-bold">{selectedCert ? selectedCert.serial : "CHR-6002-884920"}</span>
                  </div>
                </div>

                {/* Signatures and QR Code Verification */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 items-end text-center">
                  <div>
                    <div className="font-serif italic text-base text-amber-300 border-b border-white/20 pb-1">
                      Jean-Pierre de Valmont
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-slate-500 mt-1">Master Watchmaker Signature</div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-white p-1 rounded shadow-lg flex items-center justify-center">
                      <QrCode className="w-14 h-14 text-black" />
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-slate-500 mt-1">Geneva Vault Verification</div>
                  </div>

                  <div>
                    <div className="font-serif italic text-base text-amber-300 border-b border-white/20 pb-1">
                      Poinçon de Genève
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-slate-500 mt-1">Official Canton Stamp</div>
                  </div>
                </div>
              </div>

              {/* Print Button */}
              <div className="pt-6 border-t border-amber-500/20 text-center">
                <button 
                  onClick={() => window.print()}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold text-xs uppercase tracking-widest rounded shadow flex items-center space-x-2 mx-auto"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Official Certificate Dossier</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: ORDERS & ARMORED COURIER TRACKING */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.map(order => (
              <div 
                key={order.id}
                className="bg-[#0B0E16] border border-amber-500/20 rounded-xl p-6 sm:p-8 shadow-xl space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="font-serif text-lg font-bold text-slate-100">{order.watchName}</h3>
                      <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        {order.ref}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">Order ID: {order.id} • Date: {order.orderDate}</div>
                  </div>

                  <div className="text-right">
                    <div className="font-cinzel text-lg font-bold text-amber-300">{formatPrice(order.price)}</div>
                    <div className="text-xs text-emerald-400 font-medium">{order.status}</div>
                  </div>
                </div>

                {/* Progress Bar for Delivery */}
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-2 font-cinzel">
                    Acquisition & Handover Status:
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                    <div className="p-2 bg-amber-500/20 text-amber-300 rounded border border-amber-400 font-semibold">
                      1. Order Bonded
                    </div>
                    <div className="p-2 bg-amber-500/20 text-amber-300 rounded border border-amber-400 font-semibold">
                      2. Calibre Inspected
                    </div>
                    <div className={`p-2 rounded border font-semibold ${
                      order.status.includes('Armored') || order.status.includes('Delivered')
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                        : 'bg-white/5 text-slate-500 border-white/10'
                    }`}>
                      3. Armored Escort
                    </div>
                    <div className={`p-2 rounded border font-semibold ${
                      order.status.includes('Delivered')
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                        : 'bg-white/5 text-slate-500 border-white/10'
                    }`}>
                      4. Certified Handover
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-[#08090E] p-4 rounded-lg">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Delivery Protocol:</span>
                    <span className="text-slate-200">{order.deliveryType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Destination:</span>
                    <span className="text-slate-200 truncate block">{order.destination}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Custom Engraving:</span>
                    <span className="font-serif italic text-amber-300">{order.engraving}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: SALON APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            {appointments.map(apt => (
              <div 
                key={apt.id}
                className="bg-[#0B0E16] border border-amber-500/20 rounded-xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      {apt.id}
                    </span>
                    <h3 className="font-serif text-base font-bold text-slate-100">{apt.boutiqueName}</h3>
                  </div>
                  <p className="text-xs text-slate-300">
                    <strong>Date & Time:</strong> {apt.date} at {apt.timeSlot}
                  </p>
                  <p className="text-xs text-slate-400">
                    <strong>Timepiece:</strong> {apt.timepieceInterest} • <strong>Advisor:</strong> {apt.conciergeAssigned}
                  </p>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded font-semibold">
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            {wishlistedWatches.length === 0 ? (
              <div className="text-center py-16 bg-[#0B0D14] border border-amber-500/20 rounded-xl p-8">
                <Heart className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-serif text-slate-200">Your Wishlist is Empty</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Browse our Swiss collections and click the heart icon on any timepiece to save it here.
                </p>
                <button 
                  onClick={() => navigateTo('collection')}
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold text-xs uppercase tracking-widest rounded"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedWatches.map(watch => (
                  <div 
                    key={watch.id}
                    className="bg-[#0B0E16] border border-amber-500/20 rounded-xl p-5 shadow-xl flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono text-slate-400">{watch.ref}</span>
                      <button 
                        onClick={() => toggleWishlist(watch.id)}
                        className="text-slate-500 hover:text-red-400"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div 
                      className="py-4 cursor-pointer flex justify-center"
                      onClick={() => navigateTo('details', watch.id)}
                    >
                      <img src={watch.images[0]} alt={watch.name} className="h-44 object-contain" />
                    </div>

                    <div className="space-y-2 border-t border-white/5 pt-3">
                      <h4 className="font-serif text-sm font-semibold text-slate-100 truncate">{watch.name}</h4>
                      <div className="font-cinzel text-sm font-bold text-amber-400">{formatPrice(watch.price)}</div>
                      <div className="flex space-x-2 pt-1">
                        <button 
                          onClick={() => startAcquisition(watch)}
                          className="flex-1 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-semibold text-[11px] uppercase tracking-wider rounded"
                        >
                          Acquire
                        </button>
                        <button 
                          onClick={() => navigateTo('details', watch.id)}
                          className="px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] uppercase tracking-wider rounded"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
