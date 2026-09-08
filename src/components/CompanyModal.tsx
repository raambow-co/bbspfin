import React from 'react';
import { X, ExternalLink, ShieldCheck, CheckCircle2, Zap, ArrowRight, Award } from 'lucide-react';
import { CompanyData, PILLAR_CATEGORIES } from '../data/ecosystemData';

interface CompanyModalProps {
  company: CompanyData | null;
  onClose: () => void;
  onOpenPartner: () => void;
}

export const CompanyModal: React.FC<CompanyModalProps> = ({ company, onClose, onOpenPartner }) => {
  if (!company) return null;

  const pillar = PILLAR_CATEGORIES[company.category];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="glass-panel w-full max-w-2xl rounded-2xl border border-white/20 p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl"
        style={{
          boxShadow: `0 20px 60px ${pillar.accentGlow}`
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 p-2 rounded-full border border-stone-200 transition-all cursor-pointer"
          aria-label="Close detail modal"
        >
          <X size={20} />
        </button>

        {/* Header Branding */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <img 
            src={company.logo} 
            alt={company.name} 
            className="h-16 sm:h-20 w-auto object-contain bg-white p-2 rounded-xl border border-stone-200 shadow-sm" 
          />
          <div>
            <span 
              className="badge-tag text-[10px] inline-block"
              style={{
                backgroundColor: `${pillar.accentColor}20`,
                color: pillar.accentColor
              }}
            >
              {pillar.title}
            </span>
            <h3 className="text-2xl font-extrabold text-stone-900 heading-font mt-1">
              {company.name}
            </h3>
          </div>
        </div>

        <p className="text-[#D57530] font-medium text-sm mb-6 flex items-center gap-2">
          <ShieldCheck size={16} />
          <span>BUILD BHARAT ECOSYSTEM ENTERPRISE PARTNER</span>
        </p>

        {/* Description */}
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 mb-6">
          <h4 className="text-stone-900 font-bold text-sm uppercase tracking-wider mb-2 heading-font">
            About the Enterprise
          </h4>
          <p className="text-stone-600 text-sm leading-relaxed">
            {company.fullDescription}
          </p>
        </div>

        {/* Key Services & Capabilities */}
        <div className="mb-6">
          <h4 className="text-stone-900 font-bold text-sm uppercase tracking-wider mb-3 heading-font flex items-center gap-2">
            <Award size={16} className="text-[#D57530]" /> Key Offerings & Capabilities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {company.keyServices.map((service, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg border border-stone-200 flex items-center gap-2.5 shadow-sm">
                <CheckCircle2 size={16} style={{ color: pillar.accentColor }} />
                <span className="text-stone-800 text-xs font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6 bg-stone-100 p-4 rounded-xl border border-stone-200 text-center">
          {company.metrics.map((m, idx) => (
            <div key={idx}>
              <span className="block text-xl font-extrabold heading-font" style={{ color: pillar.accentColor }}>
                {m.value}
              </span>
              <span className="text-[11px] text-stone-500 font-medium">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Synergy Note */}
        <div className="bg-[#D57530]/10 border border-[#D57530]/30 rounded-xl p-4 mb-8 flex items-start gap-3">
          <Zap size={18} className="text-[#D57530] shrink-0 mt-0.5" />
          <div>
            <h5 className="text-stone-900 font-bold text-xs uppercase tracking-wider">Ecosystem Integration</h5>
            <p className="text-stone-600 text-xs mt-1">
              {company.synergyHighlight}
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-stone-200">
          <a
            href={company.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 w-full sm:w-auto justify-center text-xs text-decoration-none rounded-full px-5 py-2.5 flex items-center gap-1.5 cursor-pointer transition-all font-semibold"
            onClick={(e) => {
              if (company.websiteUrl.includes('example.com')) {
                e.preventDefault();
                alert(`[Official Gateway Redirect]\n\nCompany: ${company.name}\nWebsite Placeholder: ${company.websiteUrl}\n\nIn production, this connects directly to the enterprise's dedicated domain.`);
              }
            }}
          >
            <span>Visit Official Company Website</span>
            <ExternalLink size={14} />
          </a>
 
          <button
            onClick={() => {
              onClose();
              onOpenPartner();
            }}
            className="btn-gold w-full sm:w-auto justify-center text-xs rounded-full px-5 py-2.5 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider font-bold"
          >
            <span>Partner With Us</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};
