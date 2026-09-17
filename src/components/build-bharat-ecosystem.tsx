"use client"

import React, { useRef } from "react"
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react"
import { REGIONAL_HUBS } from "../data/ecosystemData"

const features = [
  {
    id: "loans",
    name: "BuildBharat Loans",
    logo: "/build-bharat-loans.png",
    description: "Structured corporate financing, project debt placement, and working capital lines for expanding MSMEs.",
    stat: "",
    href: "/loans",
    cta: "Explore BuildBharat Loans",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
  },
  {
    id: "solar",
    name: "BuildBharat Solar",
    logo: "/build-bharat-solar.png",
    description: "Industrial solar installations and clean renewable energy grid integration for commercial developers.",
    stat: "",
    href: "/solar",
    cta: "Explore BuildBharat Solar",
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    id: "about",
    name: "Build Bharat",
    logo: "/build-bharat-logo.png",
    description: "India's premier multi-brand B2B partnership platform. We align sustainable infrastructure, corporate capital solutions, prime real estate developments, and industrial skill training under one unified verification framework.",
    stat: "",
    href: "/about",
    cta: "",
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3 hidden lg:flex",
  },
  {
    id: "real-estate",
    name: "BuildBharat Real Estate",
    logo: "/build-bharat-real-estate.png",
    description: "Strategic commercial developments, Grade-A IT parks, and logistics warehouses across economic growth corridors.",
    stat: "",
    href: "/real-estate",
    cta: "Explore BuildBharat Real Estate",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
  },
  {
    id: "education",
    name: "BuildBharat EduTech",
    logo: "/build-bharat-education.png",
    description: "High-value industrial training bootcamps, talent pipeline development, and tech career certifications.",
    stat: "",
    href: "/education",
    cta: "Explore BuildBharat EduTech",
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
]

interface BuildBharatEcosystemProps {
  activeRegionFilter?: string | null;
  onClearRegionFilter?: () => void;
}

export function BuildBharatEcosystem({
  activeRegionFilter = null,
  onClearRegionFilter
}: BuildBharatEcosystemProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedHub = activeRegionFilter ? REGIONAL_HUBS.find(h => h.id === activeRegionFilter) : null;
  
  // Filter features: if region filter is active, only show the ones operating in that state.
  // The central "about" card is hidden when filtered since it represents the ecosystem hub.
  const filteredFeatures = selectedHub
    ? features.filter(f => f.id !== "about" && selectedHub.pillarsActive.includes(f.id))
    : features;

  const handleCardClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    if (!href || href === '/about') {
      e.preventDefault();
      return;
    }
    if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      window.history.pushState({}, '', href);
      const popStateEvent = new PopStateEvent('popstate');
      window.dispatchEvent(popStateEvent);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="pathways" className="w-full bg-[#eeeeec] py-20 text-left">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Header Block with Navigation Controls */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col items-start text-left max-w-[580px]">
            <span className="text-xs uppercase tracking-[0.25em] text-[#1e3a6b] font-bold font-sans mb-3">
              The Build Bharat ecosystem
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-[#1e3a6b] heading-font uppercase mb-4">
              One vision.<br />
              Four directions.
            </h2>


            {/* Active Region Filter Badge */}
            {selectedHub && (
              <div className="mt-5 inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#1e3a6b]/5 border border-[#1e3a6b]/10 rounded-full shadow-sm">
                <span className="text-[11px] text-stone-700 font-medium">
                  Active in <strong className="text-[#1e3a6b]">{selectedHub.state}</strong>
                </span>
                <button
                  onClick={onClearRegionFilter}
                  className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#f0a951] text-[#3a2205] rounded hover:bg-[#f0a951]/90 cursor-pointer transition-colors border-none"
                >
                  Clear Filter
                </button>
              </div>
            )}
          </div>

          {/* Sideways Scroll Arrow Buttons for Mobile/Tablet */}
          <div className="flex items-center gap-3 lg:hidden self-start md:self-end">
            <button
              onClick={() => handleScroll('left')}
              className="w-10 h-10 rounded-full border border-[#1e3a6b]/20 bg-white text-[#1e3a6b] flex items-center justify-center shadow-sm hover:bg-[#1e3a6b] hover:text-white transition-all cursor-pointer"
              aria-label="Scroll Left"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-10 h-10 rounded-full border border-[#1e3a6b]/20 bg-white text-[#1e3a6b] flex items-center justify-center shadow-sm hover:bg-[#1e3a6b] hover:text-white transition-all cursor-pointer"
              aria-label="Scroll Right"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Responsive Layout: Sideways Scrollable Row on Small/Medium screens, Bento Grid on Desktop */}
        <div
          ref={scrollRef}
          className="flex lg:grid overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scroll-smooth pb-6 lg:pb-0 gap-4 scrollbar-none lg:grid-cols-3 lg:grid-rows-2 auto-rows-fr"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredFeatures.map((card) => {
            const isCenterCard = card.id === "about";
            const cardContent = (
              <>
                <div>
                  {/* White Logo Badge (64x64px) */}
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 mb-5 group-hover:scale-[1.02] transition-transform duration-300">
                    <img 
                      src={card.logo} 
                      alt={card.name} 
                      width="64"
                      height="64"
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Body Text */}
                  <p className="text-[#cdd9ec] text-[13px] leading-relaxed mb-4 max-w-[420px]">
                    {card.description}
                  </p>

                  {/* Translucent Stat Pill */}
                  {card.stat && (
                    <span className="inline-block text-[10px] font-bold text-white px-2.5 py-1 bg-white/12 rounded-full uppercase tracking-wider select-none mb-4">
                      {card.stat}
                    </span>
                  )}
                </div>

                {/* Bottom Explore Link */}
                {card.cta ? (
                  <div className="flex items-center gap-1 text-white font-semibold text-xs group-hover:underline">
                    <span>{card.cta}</span>
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                ) : null}
              </>
            );

            if (isCenterCard) {
              return (
                <div
                  key={card.id}
                  className={`group flex flex-col justify-between p-7 rounded-[12px] bg-gradient-to-br from-[#16305c] to-[#1f4fa0] border border-white/5 shadow-sm transition-all duration-300 min-h-[260px] text-left no-underline w-[280px] sm:w-[320px] lg:w-auto flex-shrink-0 lg:flex-shrink snap-start lg:snap-align-none ${
                    selectedHub ? "h-full" : card.className
                  }`}
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <a
                key={card.id}
                href={card.href}
                onClick={(e) => handleCardClick(e, card.href)}
                className={`group flex flex-col justify-between p-7 rounded-[12px] bg-gradient-to-br from-[#16305c] to-[#1f4fa0] border border-white/5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer min-h-[260px] text-left no-underline w-[280px] sm:w-[320px] lg:w-auto flex-shrink-0 lg:flex-shrink snap-start lg:snap-align-none ${
                  selectedHub ? "h-full" : card.className
                }`}
              >
                {cardContent}
              </a>
            );
          })}
        </div>

      </div>
    </section>
  )
}
