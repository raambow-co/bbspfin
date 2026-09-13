import React from 'react';
import { ArrowLeft, Sparkles, Leaf, Zap, ArrowRight, ShieldCheck, Compass } from 'lucide-react';

interface DiscoveryPageProps {
  onNavigate: (path: string) => void;
  onOpenPartnerModal: () => void;
}

export const DiscoveryPage: React.FC<DiscoveryPageProps> = ({
  onNavigate,
  onOpenPartnerModal,
}) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 selection:bg-[#10367D]/20 selection:text-stone-900 font-sans text-left">
      
      {/* Sub-Header Navigation Banner */}
      <div className="bg-[#FFFFFF]/90 border-b border-stone-200 py-3 sticky top-0 z-40 backdrop-blur-md">
        <div className="container-custom max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-[#10367D] transition-colors bg-transparent border-none cursor-pointer p-0"
          >
            <ArrowLeft size={14} />
            <span>Back to Build Bharat</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <Compass size={14} className="text-[#10367D]" />
            <span>Ecosystem Discovery Portal</span>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-stone-100 border-b border-stone-200 py-12 sm:py-16 relative overflow-hidden">
        <div className="container-custom max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          
          {/* Launching Soon Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#10367D]/10 border border-[#10367D]/20 text-[#10367D] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10367D] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10367D]"></span>
            </span>
            <span>Launching Soon</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 heading-font tracking-tight uppercase">
            Ecosystem Discovery
          </h1>
          
          <p className="text-stone-600 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            Expanding the Build Bharat Synergy network with upcoming high-impact industry segments.
          </p>
        </div>
      </section>

      {/* Main Content Area — Distinctive Blue Section */}
      <section className="py-12 sm:py-20 px-6 max-w-5xl mx-auto">
        
        {/* Blue Showcase Section */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0a1e3f] via-[#10367D] to-[#07172e] p-8 sm:p-14 text-white shadow-2xl border border-blue-900/40 overflow-hidden">
          
          {/* Subtle Background Glow Elements */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Section Header */}
          <div className="relative z-10 text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles size={13} className="text-[#f0a951]" />
              <span>Upcoming Segments</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white heading-font uppercase tracking-tight">
              Next-Gen Additions
            </h2>
          </div>

          {/* Symmetrical 2-Column Grid: Agro & EV */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Segment 1: BuildBharat Agro */}
            <div className="bg-[#0b2756]/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 hover:border-emerald-400/50 transition-all duration-300 shadow-xl flex flex-col items-center text-center group hover:-translate-y-1">
              
              {/* White Padded Logo Box */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center w-full max-w-[280px] h-[150px] mb-6 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/build-bharat-logo.png" 
                  alt="BuildBharat Agro" 
                  className="max-h-24 max-w-full w-auto object-contain"
                />
              </div>

              {/* Tag / Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Leaf size={14} className="text-emerald-400" />
                <span>Agro</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white heading-font tracking-tight">
                BuildBharat Agro
              </h3>

              {/* Launching Soon Status Pill */}
              <div className="mt-5 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-blue-100">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="tracking-wide">Launching Soon</span>
              </div>
            </div>

            {/* Segment 2: BuildBharat EV */}
            <div className="bg-[#0b2756]/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 hover:border-cyan-400/50 transition-all duration-300 shadow-xl flex flex-col items-center text-center group hover:-translate-y-1">
              
              {/* White Padded Logo Box */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center w-full max-w-[280px] h-[150px] mb-6 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/build-bharat-logo.png" 
                  alt="BuildBharat EV" 
                  className="max-h-24 max-w-full w-auto object-contain"
                />
              </div>

              {/* Tag / Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Zap size={14} className="text-cyan-400" />
                <span>EV</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white heading-font tracking-tight">
                BuildBharat EV
              </h3>

              {/* Launching Soon Status Pill */}
              <div className="mt-5 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-blue-100">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="tracking-wide">Launching Soon</span>
              </div>
            </div>

          </div>

          {/* Bottom Inquiry Callout */}
          <div className="relative z-10 mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-[#f0a951]">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider heading-font">
                  Early Partner Onboarding
                </h4>
                <p className="text-xs text-blue-200/80">
                  Connect with our leadership team for pilot inquiries and alliance opportunities.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenPartnerModal}
              className="bg-white hover:bg-blue-50 text-[#10367D] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full flex items-center gap-2 shadow-lg transition-all cursor-pointer border-none shrink-0"
            >
              <span>Partner Inquiry</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </section>

    </div>
  );
};
