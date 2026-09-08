import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REGIONAL_HUBS, RegionalHub, PILLAR_CATEGORIES } from '../data/ecosystemData';

interface RegionalReachProps {
  onFilterRegion?: (regionId: string) => void;
}

export const RegionalReach: React.FC<RegionalReachProps> = ({ onFilterRegion }) => {
  const [selectedHub, setSelectedHub] = useState<RegionalHub>(REGIONAL_HUBS[0]);

  return (
    <section id="regional" className="py-12 relative bg-[#FAF9F6] border-t border-b border-[#EBE6DD]">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 text-left">
          <div>
            <div className="inline-flex items-center px-3.5 py-1.5 bg-[#D57530]/10 border border-[#D57530]/20 rounded-full mb-2">
              <span className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-[#D57530] font-sans">
                GEOGRAPHIC FOOTPRINT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold heading-font uppercase tracking-wider text-[#1F1D1A]">
              Regional Reach & Operations
            </h2>
            <p className="text-[#6E6A61] text-sm sm:text-base max-w-2xl mt-2 font-sans font-normal leading-relaxed">
              Build Bharat Synergy Partners actively operates across key South Indian economic corridors and growth hubs.
            </p>
          </div>

          {/* Quick Metrics (Startup Footprint) */}
          <div className="flex items-center bg-white px-6 py-4 border border-[#EBE6DD] rounded-xl shadow-sm text-left">
            <div>
              <span className="block text-xl font-extrabold text-[#1F1D1A] heading-font uppercase tracking-wider leading-none mb-1">
                5 States
              </span>
              <span className="text-[10px] uppercase font-extrabold text-[#6E6A61] tracking-[0.2em] font-sans">
                Active Footprint
              </span>
            </div>
          </div>
        </div>

        {/* State Interactive Dashboard Grid (2 Columns: List 4 cols / Detail 8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* State Selectors List (Left 4 cols) */}
          <div className="lg:col-span-4 space-y-3 text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#6E6A61] block mb-2 font-sans">
              Select Region to Explore Hub Details:
            </span>
            {REGIONAL_HUBS.map((hub) => {
              const isSelected = selectedHub.id === hub.id;
              return (
                <div
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  className={`w-full text-left p-4 border transition-all flex items-center justify-between cursor-pointer rounded-xl ${
                    isSelected
                      ? 'bg-[#FAF9F6] border-[#D57530] text-[#1F1D1A] shadow-sm'
                      : 'bg-white border-[#EBE6DD] text-[#6E6A61] hover:text-[#1F1D1A] hover:border-stone-300'
                  }`}
                >
                  <div>
                    <h4 className="font-extrabold text-sm tracking-wider uppercase heading-font text-[#1F1D1A]">
                      {hub.state}
                    </h4>
                    <span className="text-[11px] text-[#6E6A61] block font-sans mt-0.5">
                      {hub.hubCity}
                    </span>
                  </div>

                  <div className="text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onFilterRegion) {
                          onFilterRegion(hub.id);
                        }
                      }}
                      className={`text-[9px] font-extrabold uppercase tracking-[0.2em] px-3 py-1.5 border block font-sans rounded-md cursor-pointer hover:bg-[#D57530] hover:text-white hover:border-[#D57530] transition-colors duration-300 ${
                        isSelected 
                          ? 'border-[#D57530]/30 text-[#D57530] bg-[#D57530]/10' 
                          : 'border-[#EBE6DD] text-[#6E6A61] bg-[#FAF9F6]'
                      }`}
                      title={`Explore operational focus in ${hub.state}`}
                    >
                      EXPLORE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Regional Hub Detail Panel (Right 8 cols) */}
          <div className="lg:col-span-8 p-8 border border-[#EBE6DD] bg-white flex flex-col justify-between text-left rounded-2xl shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#EBE6DD]">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#6E6A61] font-extrabold font-sans block">
                    STATE ECOSYSTEM OPERATIONAL HUB
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F1D1A] heading-font uppercase tracking-wider mt-0.5">
                    {selectedHub.state}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#6E6A61] block font-extrabold font-sans">
                    Headquarters City
                  </span>
                  <span className="text-[#1F1D1A] font-bold text-sm font-sans mt-0.5 block">
                    {selectedHub.hubCity}
                  </span>
                </div>
              </div>

              {/* Hub Highlight */}
              <div className="bg-[#FAF9F6] p-4 border border-[#EBE6DD] mb-6 rounded-xl shadow-sm min-h-[96px] flex flex-col justify-start">
                <h5 className="text-[#D57530] font-extrabold text-[10px] uppercase tracking-[0.2em] font-sans mb-1">
                  Strategic Hub Role:
                </h5>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={selectedHub.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="text-[#6E6A61] text-xs sm:text-sm font-sans leading-relaxed"
                  >
                    {selectedHub.highlight}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Active Pillars in this State */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#6E6A61] font-extrabold font-sans block mb-3">
                  Active Build Bharat Pillars Operating in {selectedHub.state}:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedHub.pillarsActive.map((pillarId) => {
                    const pillar = PILLAR_CATEGORIES[pillarId];
                    return (
                      <div
                        key={pillarId}
                        className="bg-[#FAF9F6] px-4 py-3 border border-[#EBE6DD] flex items-center rounded-xl shadow-sm"
                      >
                        <div className="text-left">
                          <span className="text-[#1F1D1A] font-extrabold text-[11px] block uppercase tracking-wider heading-font">
                            {pillar.title.split('/')[0]}
                          </span>
                          <span className="text-[8px] text-[#6E6A61] font-extrabold uppercase tracking-[0.2em] mt-0.5 block font-sans">
                            Active Operations
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="mt-8 pt-4 border-t border-[#EBE6DD] flex items-center justify-between text-[10px] text-[#6E6A61] font-sans font-medium">
              <span className="font-extrabold tracking-wider uppercase text-[9px]">Verified Infrastructure</span>
              <span className="font-mono text-[9px] text-stone-400 uppercase">
                HUB-REG #{selectedHub.id.toUpperCase()}-2026
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
