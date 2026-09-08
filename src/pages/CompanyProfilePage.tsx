import React from 'react';
import { ArrowLeft, Check, ExternalLink, ArrowRight, ShieldCheck, Sun, Coins, Building2, GraduationCap } from 'lucide-react';
import { ALL_COMPANIES, PILLAR_CATEGORIES } from '../data/ecosystemData';
import { GovernmentInitiativeSection } from '../components/GovernmentInitiativeSection';
import { JourneySection } from '../components/JourneySection';
import { SolarComponentsSection } from '../components/SolarComponentsSection';
import { SolarTestimonialsSection } from '../components/SolarTestimonialsSection';
 
interface CompanyProfilePageProps {
  companyId: string;
  onNavigate: (path: string) => void;
  onOpenPartnerModal: () => void;
}
 
export const CompanyProfilePage: React.FC<CompanyProfilePageProps> = ({ companyId, onNavigate, onOpenPartnerModal }) => {
  const company = ALL_COMPANIES.find(c => c.id === companyId);
 
  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 text-stone-900">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Company Not Found</h2>
          <button 
            onClick={() => onNavigate('/companies')}
            className="btn-gold rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider"
          >
            Go to Directory
          </button>
        </div>
      </div>
    );
  }
 
  const pillar = PILLAR_CATEGORIES[company.category];
 
  const themes = {
    solar: {
      accentText: 'text-[#A5CEE0]',
      accentBg: 'bg-[#A5CEE0]/10',
      accentBorder: 'border-[#A5CEE0]/20',
      icon: <Sun className="text-[#A5CEE0]" size={28} />,
      heroImage: '/solar_hero_premium.png',
      badgeColor: 'border-[#A5CEE0]/30 text-[#A5CEE0] bg-[#A5CEE0]/10',
      taglineColor: 'text-[#A5CEE0]'
    },
    loans: {
      accentText: 'text-[#80B5CE]',
      accentBg: 'bg-[#80B5CE]/10',
      accentBorder: 'border-[#80B5CE]/20',
      icon: <Coins className="text-[#80B5CE]" size={28} />,
      heroImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
      badgeColor: 'border-[#80B5CE]/30 text-[#80B5CE] bg-[#80B5CE]/10',
      taglineColor: 'text-[#80B5CE]'
    },
    'real-estate': {
      accentText: 'text-[#5A9CBE]',
      accentBg: 'bg-[#5A9CBE]/10',
      accentBorder: 'border-[#5A9CBE]/20',
      icon: <Building2 className="text-[#5A9CBE]" size={28} />,
      heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      badgeColor: 'border-[#5A9CBE]/30 text-[#5A9CBE] bg-[#5A9CBE]/10',
      taglineColor: 'text-[#5A9CBE]'
    },
    education: {
      accentText: 'text-[#3B7E9F]',
      accentBg: 'bg-[#3B7E9F]/10',
      accentBorder: 'border-[#3B7E9F]/20',
      icon: <GraduationCap className="text-[#3B7E9F]" size={28} />,
      heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      badgeColor: 'border-[#3B7E9F]/30 text-[#3B7E9F] bg-[#3B7E9F]/10',
      taglineColor: 'text-[#3B7E9F]'
    }
  };
 
  const currentTheme = themes[company.category];
 
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 selection:bg-[#D57530]/20 selection:text-stone-900 font-sans">
      
      {/* Sub-Header Navigation Banner */}
      <div className="bg-[#FFFFFF]/90 border-b border-stone-200 py-3 sticky top-0 z-40 backdrop-blur-md">
        <div className="container-custom flex items-center justify-between">
          <button 
            onClick={() => onNavigate('/companies')}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors bg-transparent border-none cursor-pointer p-0"
          >
            <ArrowLeft size={14} />
            <span>Back to Directory</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <ShieldCheck size={14} className={company.verified ? "text-[#D57530]" : "text-stone-400"} />
            <span className="hidden sm:inline">Verification:</span>
            <span className={`font-bold uppercase tracking-wider text-xs ${company.verified ? "text-emerald-700" : "text-amber-700"}`}>
              {company.verified ? "Audit Passed" : "Pending Audit"}
            </span>
          </div>
        </div>
      </div>
 
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 border-b border-stone-200 overflow-hidden">
        {/* Background Subtle Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        
        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="h-20 w-auto aspect-square bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-center">
                <span className="text-3xl">{pillar.emoji}</span>
              </div>
              <div className="space-y-1.5">
                <span className={`badge-tag ${currentTheme.badgeColor} font-bold rounded-full inline-block text-[10px] uppercase tracking-widest px-2.5 py-0.5 border`}>
                  {pillar.title}
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold heading-font tracking-wide leading-tight text-stone-900 uppercase">
                  {company.name}
                </h1>
              </div>
            </div>
            
            <p className={`text-sm sm:text-base font-semibold subheading-font tracking-normal ${currentTheme.taglineColor}`}>
              {company.tagline}
            </p>
            
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {company.fullDescription}
            </p>
 
            {/* Metric Board */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200 max-w-lg">
              {company.metrics.map((m, idx) => (
                <div key={idx} className="bg-stone-50 border border-stone-200 p-4 rounded-xl text-center shadow-sm">
                  <span className="block text-2xl font-bold heading-font text-stone-900 leading-none mb-1 uppercase tracking-tight" style={{ color: pillar.accentColor }}>
                    {m.value}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-stone-500 tracking-widest block subheading-font">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
 
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6">
              <button 
                onClick={onOpenPartnerModal}
                className="btn-gold justify-center rounded-full px-5 py-2.5 flex items-center gap-1.5 cursor-pointer text-xs uppercase tracking-wider font-bold"
              >
                <span>Partner With Us</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
 
          {/* Hero Visual Card (Right 5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-2xl aspect-[4/3] sm:aspect-video lg:aspect-[4/3]">
              <img 
                src={currentTheme.heroImage} 
                alt={`${company.name} Core Operations`} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/20 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 text-left text-white space-y-1">
                <span className="text-[9px] font-bold tracking-widest text-[#D57530] uppercase block">
                  SYNERGY HIGHLIGHT
                </span>
                <p className="text-xs font-semibold leading-relaxed drop-shadow-sm text-stone-200">
                  {company.synergyHighlight}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* Government Initiative Spotlight Section */}
      {company.category === 'solar' && <GovernmentInitiativeSection />}
 
      {/* Solar Journey 4-Steps Flow Section */}
      {company.category === 'solar' && <JourneySection />}
 
      {/* Premium Solar Components Section */}
      {company.category === 'solar' && <SolarComponentsSection />}
 
      {/* Solar Testimonials Section */}
      {company.category === 'solar' && <SolarTestimonialsSection />}
 
      {/* Services Board */}
      <section className="py-20 bg-[#FFFFFF] border-b border-stone-200 text-left">
        <div className="container-custom max-w-4xl">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D57530] block mb-2 subheading-font">
            Core Enterprise Services
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 heading-font mb-8 uppercase tracking-wide">
            Ecosystem Specializations
          </h2>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {company.keyServices.map((service, idx) => (
              <div 
                key={idx} 
                className="p-5 border border-stone-200 rounded-xl bg-stone-50 flex items-start gap-3 hover:border-stone-300 transition-colors shadow-sm"
              >
                <span className="p-1 bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-md shrink-0 mt-0.5">
                  <Check size={14} className="stroke-[3]" />
                </span>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide heading-font">{service}</h4>
                  <span className="text-[9px] text-stone-500 font-bold uppercase mt-1 tracking-wider block">
                    Vetted Service Line
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
