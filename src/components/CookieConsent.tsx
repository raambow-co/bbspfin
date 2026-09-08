import { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
 
export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
 
  useEffect(() => {
    const consent = localStorage.getItem('buildBharatCookieConsent');
    if (!consent) {
      // Show banner after short delay for user entry transition
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);
 
  const handleAccept = () => {
    localStorage.setItem('buildBharatCookieConsent', 'accepted');
    setIsOpen(false);
    console.log('[Cookie Consent] User accepted cookies.');
  };
 
  const handleDecline = () => {
    localStorage.setItem('buildBharatCookieConsent', 'declined');
    setIsOpen(false);
    console.log('[Cookie Consent] User declined cookies.');
  };
 
  if (!isOpen) return null;
 
  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-stone-900 border border-stone-850 p-5 rounded-2xl shadow-2xl z-[9999] text-left animate-slideUp text-white flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <span className="p-2 bg-[#D57530]/10 border border-[#D57530]/20 text-[#D57530] rounded-xl shrink-0 mt-0.5">
          <ShieldCheck size={18} />
        </span>
        <div className="space-y-1">
          <h4 className="font-bold text-sm tracking-wide uppercase font-serif text-white">
            Cookie Consent
          </h4>
          <p className="text-stone-300 text-xs leading-relaxed font-sans font-normal">
            We use essential cookies and tracking technology to optimize your partner directory lookup experience and analyze platform traffic.
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-2.5 pt-1">
        <button
          onClick={handleDecline}
          className="px-4 py-2 border border-stone-800 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-5 py-2 bg-[#D57530] hover:bg-[#D57530]/90 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
        >
          Accept All
        </button>
      </div>
 
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 text-stone-400 hover:text-white cursor-pointer"
        aria-label="Close cookies alert"
      >
        <X size={14} />
      </button>
    </div>
  );
}
