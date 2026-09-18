import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SynergyConceptSectionProps {
  onNavigate: (path: string) => void;
  onOpenPartnerModal: () => void;
}

export const SynergyConceptSection: React.FC<SynergyConceptSectionProps> = ({
  onNavigate,
  onOpenPartnerModal,
}) => {
  const synergyInterlocks = [
    {
      badge: 'Solar → Real Estate',
      title: 'Solar & Real Estate Integration',
      desc: 'Turnkey rooftop solar installations, commercial microgrids, and green power solutions deployed directly across industrial parks, commercial complexes, and residential developments.',
      linkPath: '/solar',
      number: '01'
    },
    {
      badge: 'Capital Finance → Solar',
      title: 'Subsidized Solar Financing',
      desc: 'Fast-track debt financing, zero-down capital placement, and institutional lending for utility-scale setups, commercial rooftop solar, and PM Surya Ghar initiatives.',
      linkPath: '/loans',
      number: '02'
    },
    {
      badge: 'Real Estate → EdTech',
      title: 'Campus & Academy Infrastructure',
      desc: 'Dedicated Grade-A physical infrastructure, smart labs, and skill development academies hosted within strategically located commercial and educational hubs.',
      linkPath: '/real-estate',
      number: '03'
    },
    {
      badge: 'EdTech → Ecosystem',
      title: 'Certified Technical Talent Pipeline',
      desc: 'Industry-certified engineering, financial analysis, and renewable technician graduates recruited directly into regional operations, site projects, and corporate networks.',
      linkPath: '/education',
      number: '04'
    }
  ];

  return (
    <section id="synergy" className="py-20 sm:py-24 bg-[#FAF9F6] text-stone-900 border-t border-b border-stone-200 relative overflow-hidden text-left">
      
      {/* Subtle Warm Background Glow Accents */}
      <div className="absolute top-12 left-1/3 w-96 h-96 bg-[#10367D]/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-[#D57530]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom max-w-6xl mx-auto px-6 relative z-10 space-y-20">
        
        {/* ======================================================== */}
        {/* PART 1 — THE SYNERGY CONCEPT EXPLAINED IN FEW LINES */}
        {/* ======================================================== */}
        <div className="space-y-12">
          
          {/* Clean Executive Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-block px-4 py-1 rounded-full bg-stone-100 border border-stone-200 text-[#10367D] text-[11px] font-bold uppercase tracking-widest">
              The Synergy Model
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#10367D] heading-font tracking-tight uppercase">
              How Synergy Drives Compound Value
            </h2>
            
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              In business, synergy occurs when interconnected sectors reinforce one another. Build Bharat connects <strong>Solar Energy</strong>, <strong>Capital Loans</strong>, <strong>Real Estate</strong>, and <strong>EdTech</strong> into an integrated ecosystem—unlocking speed, cross-sector deal flow, and compounded value for partners.
            </p>
          </div>

          {/* 4 Clean Minimalist Corporate Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {synergyInterlocks.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white border border-stone-200 hover:border-[#10367D] p-7 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                onClick={() => onNavigate(item.linkPath)}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
                      {item.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-stone-400">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 heading-font mb-2 group-hover:text-[#10367D] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#10367D]">
                  <span className="uppercase tracking-wider">Explore Segment</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ======================================================== */}
        {/* PART 2 — FOUNDER & LEADERSHIP SECTION */}
        {/* ======================================================== */}
        <div className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
            
            {/* Left: Founder Portrait Card */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative group w-full max-w-[340px]">
                
                {/* Photo Frame Container */}
                <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-lg aspect-[3/4] w-full">
                  <img 
                    src="/bbsp-founder.png" 
                    alt="D Sudheer Reddy - Founder & Managing Director" 
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Shade at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block mb-0.5">
                      Founder & Managing Director
                    </span>
                    <h3 className="text-xl font-bold heading-font tracking-tight text-white">
                      D Sudheer Reddy
                    </h3>
                  </div>
                </div>

                {/* Verified Brand Label */}
                <div className="mt-4 text-center text-xs font-semibold text-stone-600 bg-stone-50 py-2 px-4 rounded-xl border border-stone-200">
                  Build Bharat Synergy Partners
                </div>
              </div>
            </div>

            {/* Right: Vision, Message & Highlights */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-[#10367D] text-xs font-bold uppercase tracking-wider">
                  Executive Leadership
                </div>
                
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#10367D] heading-font tracking-tight uppercase">
                  Building India's Integrated Tomorrow
                </h3>
              </div>

              {/* Founder's Direct Quote */}
              <div className="bg-[#FAF9F6] border-l-4 border-[#10367D] p-5 sm:p-6 rounded-r-2xl">
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic font-serif">
                  "Our vision is straightforward: eliminate the friction between clean energy, capital loans, real estate infrastructure, and skilled technical talent. By aligning these sectors under a unified synergy framework, Indian enterprises scale faster, smarter, and with lasting stability."
                </p>
                <div className="mt-3 text-xs font-bold text-[#10367D] uppercase tracking-wider font-sans">
                  — D Sudheer Reddy, Founder & MD
                </div>
              </div>

              {/* 3 Core Leadership Highlights (25+ Years) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-lg sm:text-xl font-extrabold text-[#10367D] block">25+ Years</span>
                  <span className="text-xs text-stone-600 font-medium">Industry Experience & Leadership</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-lg sm:text-xl font-extrabold text-[#10367D] block">4 Pillars</span>
                  <span className="text-xs text-stone-600 font-medium">Unified Synergy Framework</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-lg sm:text-xl font-extrabold text-[#10367D] block">5 States</span>
                  <span className="text-xs text-stone-600 font-medium">Active South India Network</span>
                </div>

              </div>

              {/* Contact & Partner Action */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-stone-600">
                  <span>Hyderabad HQ</span>
                  <span>•</span>
                  <span>sudheer@buildbharatsp.com</span>
                </div>

                <button
                  onClick={onOpenPartnerModal}
                  className="bg-[#10367D] hover:bg-[#10367D]/90 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full flex items-center gap-2 shadow-sm transition-all cursor-pointer border-none"
                >
                  <span>Connect with Founder</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default SynergyConceptSection;
