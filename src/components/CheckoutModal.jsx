import React, { useState } from 'react';
import { useWatch } from '../context/WatchContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle, 
  Sparkles, 
  Gift, 
  FileText, 
  Lock,
  ChevronRight,
  MapPin,
  Clock
} from 'lucide-react';

export default function CheckoutModal() {
  const { 
    isCheckoutModalOpen, 
    setIsCheckoutModalOpen, 
    checkoutWatch, 
    formatPrice, 
    completeOrder, 
    user 
  } = useWatch();

  const [step, setStep] = useState(1); // 1: Customization, 2: Delivery, 3: Payment, 4: Confirmation
  const [engraving, setEngraving] = useState('J.B. — MMXXVI');
  const [boxSelection, setBoxSelection] = useState('Hand-carved Swiss Walnut & Leather Vault Box');
  const [deliveryType, setDeliveryType] = useState('White-Glove Armored Escort (Brinks Global)');
  const [destination, setDestination] = useState('Rue du Rhône 41, 1204 Genève, Switzerland');
  const [name, setName] = useState(user ? user.name : 'Lord Julian Blackwood');
  const [email, setEmail] = useState(user ? user.email : 'j.blackwood@mayfair-estates.co.uk');
  const [paymentMethod, setPaymentMethod] = useState('Swiss Bank Wire Escrow (Banque Cantonale de Genève)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrderData, setCompletedOrderData] = useState(null);

  if (!isCheckoutModalOpen || !checkoutWatch) return null;

  const handleAcquisitionSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newOrder = completeOrder({
        name,
        email,
        engraving,
        boxSelection,
        deliveryType,
        destination,
        paymentMethod
      });
      setCompletedOrderData(newOrder);
      setStep(4);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#F3E5AB', '#FFFFFF', '#B8860B']
        });
      } catch (e) {
        console.debug("Confetti error:", e);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={() => {
          if (step !== 4) setIsCheckoutModalOpen(false);
        }}
      />

      <div className="relative bg-[#0D1017] border border-amber-500/40 rounded-xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden z-10 text-slate-200">
        
        {/* Close */}
        <button 
          onClick={() => setIsCheckoutModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="text-center pb-4 border-b border-white/10 mb-6">
          <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-cinzel tracking-widest uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Maison Chronova Private Acquisition Protocol</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-100">
            {step === 4 ? "Timepiece Allocation Confirmed" : `Acquiring ${checkoutWatch.name}`}
          </h2>
          <div className="text-xs font-mono text-amber-300 mt-1">
            {checkoutWatch.ref} • {formatPrice(checkoutWatch.price)}
          </div>
        </div>

        {/* Step Progress Bar (1 to 3) */}
        {step < 4 && (
          <div className="flex items-center justify-between mb-8 px-4 text-xs font-cinzel">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-amber-400' : 'text-slate-600'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 1 ? 'border-amber-400 bg-amber-400/20' : 'border-slate-700'}`}>1</div>
              <span className="hidden sm:inline">Bespoke Options</span>
            </div>
            <div className={`h-[1px] flex-1 mx-2 ${step >= 2 ? 'bg-amber-400' : 'bg-slate-800'}`}></div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-amber-400' : 'text-slate-600'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 2 ? 'border-amber-400 bg-amber-400/20' : 'border-slate-700'}`}>2</div>
              <span className="hidden sm:inline">White-Glove Delivery</span>
            </div>
            <div className={`h-[1px] flex-1 mx-2 ${step >= 3 ? 'bg-amber-400' : 'bg-slate-800'}`}></div>
            <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-amber-400' : 'text-slate-600'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 3 ? 'border-amber-400 bg-amber-400/20' : 'border-slate-700'}`}>3</div>
              <span className="hidden sm:inline">Settlement</span>
            </div>
          </div>
        )}

        {/* STEP 1: Bespoke Customization */}
        {step === 1 && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#121622] rounded-lg border border-white/5 flex items-center space-x-4">
              <img 
                src={checkoutWatch.images[0]} 
                alt={checkoutWatch.name} 
                className="w-20 h-20 object-contain bg-black/40 rounded p-1"
              />
              <div className="space-y-1">
                <h4 className="font-serif text-sm font-semibold text-slate-100">{checkoutWatch.name}</h4>
                <p className="text-slate-400">{checkoutWatch.caseMaterial} • {checkoutWatch.calibre}</p>
                <div className="text-amber-400 font-bold text-sm">{formatPrice(checkoutWatch.price)}</div>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">
                Complimentary Master Hand-Engraving on Caseback / Clasp
              </label>
              <input 
                type="text" 
                value={engraving} 
                onChange={(e) => setEngraving(e.target.value)}
                placeholder="e.g. Initials, Date, or Motto (Max 28 characters)"
                maxLength={28}
                className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400 font-serif tracking-widest text-sm"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Executed by our Geneva Master Engraver using traditional burin tools.
              </span>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">
                Presentation & Preservation Chest
              </label>
              <select 
                value={boxSelection} 
                onChange={(e) => setBoxSelection(e.target.value)}
                className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2.5 text-slate-200 focus:outline-none focus:border-amber-400"
              >
                <option value="Hand-carved Swiss Walnut & Leather Vault Box">Hand-carved Swiss Walnut & Leather Vault Box (Included)</option>
                <option value="Ebony Macassar Lacquered Winder Chest">Ebony Macassar Lacquered Automatic Winder Chest (Included for Grand Complications)</option>
                <option value="Travel Watch Roll in Saddle Alligator">Travel Watch Roll in Saddle Alligator (Included)</option>
              </select>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full py-3 mt-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-black font-semibold text-xs uppercase tracking-widest rounded shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2"
            >
              <span>Proceed to Courier Protocol</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Delivery Protocol */}
        {step === 2 && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Patron Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Direct Confidential Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">
                Handover Protocol
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: "White-Glove Armored Escort (Brinks Global)",
                    title: "White-Glove Armored Escort (Brinks Global)",
                    desc: "Hand-delivered by an armed security courier directly to your residence or private bank."
                  },
                  {
                    id: "Geneva Maison Salon Handover with Master Horologist",
                    title: "Geneva Salon Handover & Champagne Reception",
                    desc: "Private ceremonial handover at 41 Rue du Rhône with technical walkthrough by Master Watchmaker."
                  },
                  {
                    id: "London Mayfair / New York 5th Ave Boutique Handover",
                    title: "Regional Boutique VIP Handover (London, NY, Tokyo, Dubai)",
                    desc: "Handover in your designated flagship Chronova salon lounge."
                  }
                ].map(opt => (
                  <label 
                    key={opt.id} 
                    className={`block p-3 rounded border cursor-pointer transition-all ${
                      deliveryType === opt.id 
                        ? 'border-amber-400 bg-amber-500/10' 
                        : 'border-white/10 bg-[#08090C] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      <input 
                        type="radio" 
                        name="delivery" 
                        checked={deliveryType === opt.id} 
                        onChange={() => setDeliveryType(opt.id)}
                        className="mt-0.5 text-amber-500 focus:ring-0"
                      />
                      <div>
                        <div className="font-semibold text-slate-200">{opt.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{opt.desc}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">
                Delivery Address / Private Vault Location
              </label>
              <textarea 
                rows={2}
                value={destination} 
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[#08090C] border border-white/15 rounded p-2.5 text-slate-100 focus:outline-none focus:border-amber-400 text-xs"
              />
            </div>

            <div className="flex space-x-3 pt-2">
              <button 
                onClick={() => setStep(1)}
                className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-slate-300 font-semibold text-xs uppercase tracking-wider"
              >
                Back
              </button>
              <button 
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-black font-semibold text-xs uppercase tracking-widest rounded shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2"
              >
                <span>Proceed to Settlement</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Payment & Settlement */}
        {step === 3 && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-[#111520] border border-amber-500/30 rounded-lg">
              <div className="flex justify-between items-center text-sm font-semibold text-slate-200">
                <span>Total Horological Acquisition:</span>
                <span className="text-amber-400 text-lg font-cinzel">{formatPrice(checkoutWatch.price)}</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Includes Swiss VAT, Fully Insured Courier, Master Hand-Finishing, and Official Geneva Hallmark Certificate.
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-2 uppercase tracking-wider text-[10px]">
                Select Settlement Method
              </label>
              <div className="space-y-2">
                {[
                  "Swiss Bank Wire Escrow (Banque Cantonale de Genève)",
                  "Centurion / Private Banking Card Direct",
                  "Cryptographic Escrow (BTC / ETH / USDC Institutional)",
                  "Geneva Maison Confidential Invoice"
                ].map(method => (
                  <label 
                    key={method} 
                    className={`block p-3 rounded border cursor-pointer transition-all ${
                      paymentMethod === method 
                        ? 'border-amber-400 bg-amber-500/10' 
                        : 'border-white/10 bg-[#08090C] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === method} 
                        onChange={() => setPaymentMethod(method)}
                        className="text-amber-500 focus:ring-0"
                      />
                      <span className="text-slate-200 font-medium">{method}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-3 bg-white/[0.02] border border-white/5 rounded text-[11px] text-slate-400 flex items-start space-x-2">
              <Lock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                All acquisitions are bonded by Swiss Haute Horlogerie fiduciary regulations with immediate registration into the Geneva Registry of Master Timepieces.
              </span>
            </div>

            <div className="flex space-x-3 pt-2">
              <button 
                onClick={() => setStep(2)}
                disabled={isProcessing}
                className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-slate-300 font-semibold text-xs uppercase tracking-wider"
              >
                Back
              </button>
              <button 
                onClick={handleAcquisitionSubmit}
                disabled={isProcessing}
                className="flex-1 py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-black font-semibold text-xs uppercase tracking-widest rounded shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:brightness-110 transition-all flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <span className="flex items-center space-x-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    <span>Transmitting to Geneva Vault...</span>
                  </span>
                ) : (
                  <span>Confirm Acquisition & Generate Certificate</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Confirmation & Certificate Preview */}
        {step === 4 && completedOrderData && (
          <div className="space-y-5 text-center text-xs">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 mx-auto animate-pulse">
              <CheckCircle className="w-10 h-10 text-amber-400" />
            </div>

            <div>
              <div className="text-amber-400 uppercase tracking-[0.25em] font-cinzel text-xs font-semibold">
                Allocation Registered in Geneva
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-100 mt-1">
                Congratulations, {completedOrderData.customerName}
              </h3>
              <p className="text-slate-400 mt-1 max-w-md mx-auto">
                Your acquisition of the <strong className="text-slate-200">{completedOrderData.watchName}</strong> has been assigned to our master ateliers.
              </p>
            </div>

            {/* Certificate Passport Summary Box */}
            <div className="bg-[#08090D] border-2 border-amber-500/40 rounded-lg p-5 text-left space-y-3 relative overflow-hidden shadow-2xl">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 border-8 border-amber-500/5 rounded-full pointer-events-none"></div>
              
              <div className="flex justify-between items-center border-b border-amber-500/20 pb-2">
                <div>
                  <div className="font-cinzel text-amber-300 font-bold tracking-widest text-sm">CHRONOVA GENÈVE</div>
                  <div className="text-[9px] uppercase tracking-wider text-slate-400">Digital Certificate of Authenticity & Provenance</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    {completedOrderData.certificateId}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Serial Number:</span>
                  <span className="font-mono text-slate-200 font-semibold">{completedOrderData.serialNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Order Reference:</span>
                  <span className="font-mono text-amber-400 font-semibold">{completedOrderData.id}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Engraving:</span>
                  <span className="font-serif italic text-slate-200">{completedOrderData.engraving}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Status:</span>
                  <span className="text-emerald-400 font-medium">{completedOrderData.status}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button 
                onClick={() => {
                  setIsCheckoutModalOpen(false);
                  window.print();
                }}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-semibold text-xs uppercase tracking-wider rounded"
              >
                Print Official Dossier
              </button>
              <button 
                onClick={() => setIsCheckoutModalOpen(false)}
                className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-semibold text-xs uppercase tracking-widest rounded shadow hover:brightness-110"
              >
                View in Collector's Vault
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
