import React from 'react';
import { Search, Compass, ShieldCheck } from 'lucide-react';
 
export function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Search by Need',
      supportingDesc: 'Tell us what you need — solar, loans, real estate, or training.',
      icon: <Search className="text-[#10367D]" size={20} />,
      iconBg: 'bg-[#10367D]/10 border-[#10367D]/20 text-[#10367D]',
      badge: 'Step 1'
    },
    {
      num: '02',
      title: 'Get Verified Matches',
      supportingDesc: 'We match you with verified, qualified partners in your region.',
      icon: <Compass className="text-[#B08B54]" size={20} />,
      iconBg: 'bg-[#B08B54]/10 border-[#B08B54]/20 text-[#B08B54]',
      badge: 'Step 2'
    },
    {
      num: '03',
      title: 'Connect & Execute',
      supportingDesc: 'Connect directly and start your project with confidence.',
      icon: <ShieldCheck className="text-emerald-600" size={20} />,
      iconBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600',
      badge: 'Step 3'
    }
  ];
 
  return (
    <section className="py-16 bg-gradient-to-b from-[#F5EFE6] via-[#FAF6EE] to-[#FBF8F2] border-t border-b border-[#EBE6DD] relative overflow-hidden text-left">
      
      {/* Background Ambient Glow Blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#B08B54]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-[#10367D]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header Block */}
        <div className="max-w-xl mx-auto text-center mb-16 relative z-10 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#10367D] bg-[#10367D]/10 px-4 py-2 rounded-full border border-[#10367D]/20 shadow-sm inline-block font-sans">
            Ecosystem Directory Flow
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1F1D1A] heading-font leading-tight tracking-tight uppercase">
            How Verification Works
          </h2>
        </div>
 
        {/* Steps Grid Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-stretch max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200/60 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:border-[#10367D]/30 hover:-translate-y-2 transition-all duration-500 flex flex-col relative z-10 text-center group"
            >
              <div className="flex flex-col items-center justify-center">
                {/* Card Icon & Step Number */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-inner ${step.iconBg} transform group-hover:scale-110 transition-transform duration-500`}>
                    {React.cloneElement(step.icon, { size: 36 })}
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-xs font-bold text-slate-500">
                    {step.num}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-extrabold text-[#10367D] heading-font uppercase tracking-wide mb-3">
                  {step.title}
                </h3>
                <div className="mt-auto pt-4 border-t border-slate-100 w-full">
                  <p className="text-[#10367D]/70 text-[10px] font-bold uppercase tracking-widest font-sans">
                    {step.supportingDesc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
