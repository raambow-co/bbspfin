import React from 'react';
import { ExternalLink, Zap, ArrowRight } from 'lucide-react';
import { PILLAR_CATEGORIES, CompanyData } from '../data/ecosystemData';
 
interface EcosystemPathwaysProps {
  selectedCategory: string | null;
  onSelectCategory: (catId: string) => void;
  onExploreCompany: (company: CompanyData) => void;
}
 
export const EcosystemPathways: React.FC<EcosystemPathwaysProps> = ({
  selectedCategory,
  onSelectCategory,
  onExploreCompany
}) => {
  const allCategories = Object.values(PILLAR_CATEGORIES);
 
  const displayedCategories = selectedCategory && selectedCategory !== 'all'
    ? allCategories.filter((c) => c.id === selectedCategory)
    : allCategories;
 
  return (
    <section id="pathways" className="py-20 px-6 bg-[#090D16] border-b border-white/10 text-left">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10 gap-4">
          <div>
            <span className="text-[#E2B049] text-xs font-bold uppercase tracking-widest block mb-1">
              THE FOUR BUSINESS PILLARS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold heading-font text-white">
              Ecosystem Pathways
            </h2>
          </div>
 
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => onSelectCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all ${
                !selectedCategory || selectedCategory === 'all' 
                  ? 'bg-[#E2B049] border-[#E2B049] text-black font-bold' 
                  : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              All (4)
            </button>
            {allCategories.map((p) => {
              const isActive = selectedCategory === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectCategory(p.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer border transition-all ${
                    isActive 
                      ? 'bg-white border-white text-black font-bold' 
                      : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span>{p.emoji}</span>
                  <span>{p.title.split('/')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
 
        {/* Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayedCategories.map((pillar) => {
            const company = pillar.companies[0]; // Active company in pillar
 
            return (
              <div 
                key={pillar.id} 
                className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between" 
                style={{ background: pillar.bgGradient }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl p-2 bg-white/5 rounded-xl border border-white/10 shadow-sm">{pillar.emoji}</span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white">
                        {company.badge}
                      </span>
                      <h3 className="text-2xl font-bold text-white heading-font mt-1">{pillar.title}</h3>
                    </div>
                  </div>
 
                  <p className="text-slate-300 text-sm mb-6">{pillar.description}</p>
 
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-white/10 mb-6 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <h4 className="text-white font-bold text-sm heading-font">{company.name}</h4>
                      <span className="text-xs text-slate-400 font-mono">ENTERPRISE</span>
                    </div>
                    <p className="text-xs text-slate-400 italic">"{company.tagline}"</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-200">
                      {company.keyServices.map((s, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <span className="text-[#E2B049]">✓</span> <span className="font-medium">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Synergy Highlight banner */}
                  <div className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/40 p-3 border border-white/10 rounded-lg mb-6 shadow-sm">
                    <Zap size={14} className="text-[#E2B049] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      <strong className="text-white font-bold uppercase tracking-widest text-[8px] subheading-font">Synergy Link: </strong> {company.synergyHighlight}
                    </span>
                  </div>
                </div>
 
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <button 
                    onClick={() => onExploreCompany(company)} 
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-full border border-white/20 cursor-pointer shadow-sm transition-all"
                  >
                    View Enterprise Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
 
      </div>
    </section>
  );
};
