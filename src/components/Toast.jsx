import React from 'react';
import { useWatch } from '../context/WatchContext';
import { Sparkles, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { notification } = useWatch();

  if (!notification) return null;

  const isError = notification.type === 'error';
  const isInfo = notification.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-center space-x-3 px-5 py-3.5 rounded-lg backdrop-blur-md shadow-2xl border transition-all ${
        isError 
          ? 'bg-[#1D0C0C]/90 border-red-500/40 text-red-200' 
          : isInfo 
            ? 'bg-[#0E131E]/90 border-blue-500/40 text-blue-200'
            : 'bg-[#151208]/95 border-amber-500/50 text-amber-100 shadow-[0_0_25px_rgba(212,175,55,0.25)]'
      }`}>
        <div className="flex-shrink-0">
          {isError ? (
            <AlertCircle className="w-5 h-5 text-red-400" />
          ) : isInfo ? (
            <Info className="w-5 h-5 text-blue-400" />
          ) : (
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center text-black">
              <Sparkles className="w-3 h-3 text-black" />
            </div>
          )}
        </div>
        <div className="text-xs sm:text-sm font-medium tracking-wide">
          {notification.message}
        </div>
      </div>
    </div>
  );
}
