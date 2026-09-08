import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
 
interface TermsPageProps {
  onNavigate: (path: string) => void;
}
 
export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 selection:bg-[#D57530]/20 selection:text-stone-900 font-sans text-left">
      
      {/* Sub-Header Navigation Banner */}
      <div className="bg-[#FFFFFF]/90 border-b border-stone-200 py-3 sticky top-0 z-40 backdrop-blur-md">
        <div className="container-custom flex items-center justify-between">
          <button 
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors bg-transparent border-none cursor-pointer p-0"
          >
            <ArrowLeft size={14} />
            <span>Back to Build Bharat</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <ShieldCheck size={14} className="text-[#D57530]" />
            <span>Ecosystem Membership Terms</span>
          </div>
        </div>
      </div>
 
      {/* Article Content */}
      <article className="py-20 px-6 max-w-3xl mx-auto space-y-8">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#D57530] block mb-2">
            MEMBERSHIP COMPLIANCE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 heading-font uppercase tracking-tight">
            Terms of Service
          </h1>
          <p className="text-stone-500 text-xs mt-1 font-mono uppercase">
            LAST MODIFIED: JULY 31, 2026
          </p>
        </div>
 
        <p className="text-stone-750 text-base leading-relaxed">
          Welcome to the BuildBharat Synergy Partners corporate network. By accessing our platform or applying for verified partner onboarding, you agree to comply with and be bound by the following terms of use.
        </p>
 
        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-wide text-stone-900 heading-font">
            1. Auditing & Accuracy
          </h2>
          <p className="text-stone-650 text-sm sm:text-base leading-relaxed font-normal">
            Every applicant warrants that all business registry details, credit history reports, and technical license documentation submitted during onboarding are 100% accurate and up-to-date. Falsifying credentials results in immediate ban from the B2B platform.
          </p>
        </section>
 
        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-wide text-stone-900 heading-font">
            2. Scope of Connections
          </h2>
          <p className="text-stone-650 text-sm sm:text-base leading-relaxed font-normal">
            BuildBharat serves as a vetted directory and matching gateway for professional synergy. Actual engineering contracts, commercial lease agreements, and debt structures are negotiated directly between authorized corporate entities outside this website.
          </p>
        </section>
 
        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-wide text-stone-900 heading-font">
            3. Operational Integrity
          </h2>
          <p className="text-stone-650 text-sm sm:text-base leading-relaxed font-normal">
            All partners commit to executing services with highest standards of code compliance and safety. Discrepancies or project failures reported by corporate clients trigger immediate re-audit and possible suspension from the portal directory.
          </p>
        </section>
      </article>
    </div>
  );
};
export default TermsPage;
