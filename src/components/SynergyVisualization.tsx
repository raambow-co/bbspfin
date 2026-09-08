import React, { useState, useEffect } from 'react';
import { Network, Zap, ArrowRight, Check, Sun, Coins, Building2, GraduationCap, ExternalLink } from 'lucide-react';
import { SYNERGY_LINKS, PILLAR_CATEGORIES } from '../data/ecosystemData';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from './ui/carousel';

interface SynergyVisualizationProps {
  onNavigate: (path: string) => void;
  onOpenPartnerModal?: () => void;
}

export const SynergyVisualization: React.FC<SynergyVisualizationProps> = ({ 
  onNavigate,
  onOpenPartnerModal
}) => {
  const [activeLinkIndex, setActiveLinkIndex] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi>();

  const activeLink = SYNERGY_LINKS[activeLinkIndex];
  const fromCategory = PILLAR_CATEGORIES[activeLink.from];
  const toCategory = PILLAR_CATEGORIES[activeLink.to];

  // Helper mapping category keys to Lucide icons
  const getCategoryIcon = (catId: string, size = 18) => {
    switch (catId) {
      case 'solar': return <Sun size={size} />;
      case 'loans': return <Coins size={size} />;
      case 'real-estate': return <Building2 size={size} />;
      case 'education': return <GraduationCap size={size} />;
      default: return <Network size={size} />;
    }
  };

  // Sync Carousel selection with the active link details pane
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const snapIndex = api.selectedScrollSnap();
      // Match snap index with corresponding synergy link indexes (0 to 3)
      if (snapIndex >= 0 && snapIndex < SYNERGY_LINKS.length) {
        setActiveLinkIndex(snapIndex);
      }
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Sync clicking links/selectors with scrolling Carousel
  const handleSelectLink = (idx: number) => {
    setActiveLinkIndex(idx);
    api?.scrollTo(idx);
  };

  const categories = Object.values(PILLAR_CATEGORIES);

  return (
    <section id="synergy" className="py-12 relative bg-[#FAF9F6] overflow-hidden border-b border-stone-200 bg-grainy">
      {/* Background subtle glowing radial highlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-[#D57530]/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-[#D57530]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#D57530] text-[9px] font-bold uppercase tracking-widest px-3 py-1 bg-stone-100 border border-stone-200 mb-2 subheading-font rounded-full">
            <Network size={14} />
            <span>Integrated Network Model</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold heading-font text-stone-900">
            Ecosystem Synergy Slider
          </h2>
          <span className="block text-xs sm:text-sm font-bold mt-2 text-[#D57530] tracking-[0.2em] subheading-font uppercase">
            Interactive Partners Carousel
          </span>
          <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-normal">
            Swipe or drag through the member companies below to trace active synergy interlocks, operational scopes, and check how they unlock pre-approved financing.
          </p>
        </div>

        {/* Synergy Refined 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Living Carousel Panel (Left 8 cols) */}
          <div className="lg:col-span-8 bg-[#FFFFFF] border border-stone-200 rounded-2xl relative flex flex-col justify-between overflow-hidden shadow-inner p-6 sm:p-8 shadow-sm">
            
            {/* Reusable Embla Carousel component */}
            <Carousel 
              setApi={setApi}
              opts={{
                align: "start",
                loop: true
              }}
              className="w-full z-10 flex flex-col justify-between h-full"
            >
              {/* Header Details with Navigation Arrows */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block subheading-font">
                  Ecosystem Member Profiles
                </span>
                <div className="flex items-center gap-2">
                  <CarouselPrevious className="relative top-0 left-0 border-stone-200 hover:bg-stone-100" />
                  <CarouselNext className="relative top-0 right-0 border-stone-200 hover:bg-stone-100" />
                </div>
              </div>
              <CarouselContent>
                {categories.map((pillar) => {
                  const company = pillar.companies[0];
                  return (
                    <CarouselItem key={pillar.id} className="basis-full md:basis-1/2">
                      <div className="bg-stone-50/60 border border-stone-200 p-6 rounded-xl hover:-translate-y-1 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between min-h-[300px]">
                        <div>
                          {/* Header badge & icon */}
                          <div className="flex items-center gap-3 mb-4">
                            <span className="p-2 bg-stone-100 text-[#D57530] border border-stone-200 rounded-lg shadow-sm">
                              {getCategoryIcon(pillar.id, 18)}
                            </span>
                            <div className="text-left">
                              <span 
                                className="badge-tag text-[8px] font-bold tracking-wider rounded-none uppercase"
                                style={{
                                  backgroundColor: `${pillar.accentColor}15`,
                                  color: pillar.accentColor,
                                  borderColor: `${pillar.accentColor}30`
                                }}
                              >
                                {company.badge}
                              </span>
                              <h4 className="text-sm sm:text-base font-bold text-stone-900 heading-font tracking-tight mt-0.5">
                                {company.name}
                              </h4>
                            </div>
                          </div>

                          <p className="text-stone-600 text-xs italic mb-4 font-normal leading-relaxed text-left">
                            "{company.tagline}"
                          </p>

                          {/* Capabilities checks */}
                          <div className="space-y-1.5 mb-4 text-left">
                            <span className="text-[8px] font-bold text-[#D57530] uppercase tracking-widest block subheading-font">
                              Key Capabilities:
                            </span>
                            <div className="space-y-1 text-[11px] text-stone-700 font-medium">
                              {company.keyServices.slice(0, 2).map((service, idx) => (
                                <div key={idx} className="flex items-center gap-1.5">
                                  <Check size={11} className="text-[#D57530] shrink-0" />
                                  <span className="truncate">{service}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Slide footer actions */}
                        <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                          <button
                            onClick={() => onNavigate(`/${pillar.id}`)}
                            className="text-xs font-semibold text-stone-600 hover:text-[#D57530] flex items-center gap-1 bg-transparent border-none cursor-pointer p-0 subheading-font"
                          >
                            <span>Explore Page</span>
                            <ArrowRight size={13} />
                          </button>
                          
                          <span className="text-[10px] text-stone-500 font-mono">
                            {company.metrics[0].value} {company.metrics[0].label.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>

            {/* Glowing dots overlay */}
            <div className="absolute bottom-6 right-6 w-12 h-12 bg-[#D57530]/5 rounded-full blur-md pointer-events-none" />
          </div>

          {/* Synergy Detail Card (Right side 4 cols) */}
          <div className="lg:col-span-4 bg-[#FFFFFF] p-6 sm:p-8 border border-stone-200 rounded-2xl text-left flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#D57530] mb-4 subheading-font">
                <Zap size={16} />
                <span>Zap Active Cross-Industry Synergy</span>
              </div>

              {/* Interlock Header */}
              <div className="flex items-center gap-3 bg-stone-50/60 p-3 border border-stone-200 rounded-xl mb-6 shadow-sm">
                <button
                  onClick={() => onNavigate(`/${fromCategory.id}`)}
                  className="flex items-center gap-1.5 font-bold text-[9px] text-stone-800 hover:text-[#D57530] bg-transparent border-none cursor-pointer p-0 subheading-font uppercase tracking-widest"
                >
                  <span className="text-[#D57530]">{getCategoryIcon(fromCategory.id, 14)}</span>
                  <span>{fromCategory.title.split('/')[0]}</span>
                </button>
                <ArrowRight size={12} className="text-[#D57530]" />
                <button
                  onClick={() => onNavigate(`/${toCategory.id}`)}
                  className="flex items-center gap-1.5 font-bold text-[9px] text-stone-800 hover:text-[#D57530] bg-transparent border-none cursor-pointer p-0 subheading-font uppercase tracking-widest"
                >
                  <span className="text-[#D57530]">{getCategoryIcon(toCategory.id, 14)}</span>
                  <span>{toCategory.title.split('/')[0]}</span>
                </button>
              </div>

              <h3 className="text-base font-bold text-stone-900 heading-font mb-3 uppercase tracking-wider leading-tight">
                {activeLink.title}
              </h3>

              <p className="text-stone-600 text-xs leading-relaxed mb-6 font-normal">
                {activeLink.description}
              </p>

              {/* Synergy Selection Selector Pills */}
              <div>
                <span className="text-[9px] font-bold text-stone-500 uppercase tracking-widest block mb-3 subheading-font">
                  Explore Other Synergies:
                </span>
                <div className="space-y-2">
                  {SYNERGY_LINKS.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectLink(idx)}
                      className={`w-full text-left p-2.5 text-[9px] font-bold uppercase tracking-widest transition-all flex items-center justify-between border cursor-pointer subheading-font rounded-lg ${
                        activeLinkIndex === idx
                          ? 'bg-stone-100 border-[#D57530] text-stone-900 shadow-sm'
                          : 'bg-transparent border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300'
                      }`}
                    >
                      <span>{link.title}</span>
                      {activeLinkIndex === idx && <Check size={14} className="text-[#D57530]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
