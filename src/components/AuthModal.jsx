import React, { useState } from 'react';
import { useWatch } from '../context/WatchContext';
import { X, ShieldCheck, Lock, User, Mail, Key, Sparkles, ChevronRight } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, loginAs, showToast, user } = useWatch();
  const [tab, setTab] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [tier, setTier] = useState('Grand Complication Patron');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === 'forgot') {
      showToast(`Confidential password reset dispatched to ${email}`, 'gold');
      setTab('login');
      return;
    }

    if (tab === 'register') {
      loginAs('collector');
      showToast(`Welcome to the Chronova Geneva Vault Society, ${name || 'Collector'}.`, 'gold');
      return;
    }

    // Login
    if (email.includes('admin') || email.includes('geneve')) {
      loginAs('admin');
    } else {
      loginAs('collector');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      <div className="relative bg-[#0E1119] border border-amber-500/30 rounded-xl max-w-md w-full p-6 sm:p-8 shadow-2xl overflow-hidden z-10 text-slate-200">
        
        {/* Close */}
        <button 
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 mx-auto rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-300 mb-2">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-cinzel text-xl font-bold text-amber-200 tracking-wider">
            Chronova Collector Vault
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Haute Horlogerie Provenance & Private Salon Portal
          </p>
        </div>

        {/* Demo Fast Login Switcher Banner */}
        <div className="p-3 bg-[#131724] border border-amber-500/20 rounded-lg mb-6 text-xs">
          <div className="text-[11px] font-semibold text-amber-300 mb-2 flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1" /> Quick One-Click Demo Profiles:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button 
              type="button"
              onClick={() => loginAs('collector')}
              className="py-1.5 px-2 bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400 rounded text-slate-200 text-[11px] text-center transition-all"
            >
              VIP Patron Login
            </button>
            <button 
              type="button"
              onClick={() => loginAs('admin')}
              className="py-1.5 px-2 bg-amber-500/15 hover:bg-amber-500/30 border border-amber-500/40 rounded text-amber-300 text-[11px] text-center font-semibold transition-all"
            >
              Maison Admin Login
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-6 text-xs uppercase tracking-wider">
          <button 
            onClick={() => setTab('login')}
            className={`flex-1 pb-2.5 font-medium text-center border-b-2 transition-colors ${
              tab === 'login' ? 'border-amber-400 text-amber-300 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setTab('register')}
            className={`flex-1 pb-2.5 font-medium text-center border-b-2 transition-colors ${
              tab === 'register' ? 'border-amber-400 text-amber-300 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Register Vault
          </button>
          <button 
            onClick={() => setTab('forgot')}
            className={`flex-1 pb-2.5 font-medium text-center border-b-2 transition-colors ${
              tab === 'forgot' ? 'border-amber-400 text-amber-300 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Recovery
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {tab === 'register' && (
            <div>
              <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Full Name / Title</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lord Julian Blackwood" 
                  required
                  className="w-full bg-[#08090C] border border-white/15 rounded pl-9 pr-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Confidential Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="collector@haute-horlogerie.ch" 
                required
                className="w-full bg-[#08090C] border border-white/15 rounded pl-9 pr-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {tab !== 'forgot' && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-slate-400 uppercase tracking-wider text-[10px]">Vault Security Password</label>
                {tab === 'login' && (
                  <button 
                    type="button" 
                    onClick={() => setTab('forgot')}
                    className="text-[10px] text-amber-400 hover:underline"
                  >
                    Forgot passcode?
                  </button>
                )}
              </div>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  required
                  className="w-full bg-[#08090C] border border-white/15 rounded pl-9 pr-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          {tab === 'register' && (
            <div>
              <label className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Collector Society Tier</label>
              <select 
                value={tier} 
                onChange={(e) => setTier(e.target.value)}
                className="w-full bg-[#08090C] border border-white/15 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-400 text-xs"
              >
                <option value="Grand Complication Patron">Grand Complication Patron (3+ Timepieces)</option>
                <option value="Calatrava Club">Calatrava Club (Private Collector)</option>
                <option value="Bespoke Horology Society">Bespoke Horology Society (Commission Member)</option>
              </select>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-black font-semibold text-xs uppercase tracking-widest rounded shadow-lg hover:brightness-110 transition-all text-center"
          >
            {tab === 'login' ? 'Access Collector Vault' : tab === 'register' ? 'Register Vault Membership' : 'Request Password Recovery'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center text-[11px] text-slate-500">
          Encrypted under Swiss Financial-Grade Horological Data Charter
        </div>
      </div>
    </div>
  );
}
