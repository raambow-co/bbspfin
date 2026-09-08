import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
 
interface PrivacyPageProps {
  onNavigate: (path: string) => void;
}
 
export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
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
            <span>Privacy & Security Compliance</span>
          </div>
        </div>
      </div>
 
      {/* Article Content */}
      <article className="py-20 px-6 max-w-3xl mx-auto space-y-8">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#D57530] block mb-2">
            LEGAL COMPLIANCE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 heading-font uppercase tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-stone-500 text-xs mt-1 font-mono uppercase">
            LAST MODIFIED: JULY 31, 2026
          </p>
        </div>
 
        <p className="text-stone-750 text-base leading-relaxed">
          At BuildBharat Synergy Partners, we take the confidentiality and security of our B2B ecosystem seriously. This Privacy Policy details how we compile, audit, use, and protect your organizational and contact details when using our matching and directory services.
        </p>
 
        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-wide text-stone-900 heading-font">
            1. Information Collection
          </h2>
          <p className="text-stone-650 text-sm sm:text-base leading-relaxed font-normal">
            We collect company registry numbers, technical licenses, credit rating documents, contact representative names, emails, and phone coordinates during the onboarding and verification cycles. This data is strictly used to verify competence and execute secure partner connections.
          </p>
        </section>
 
        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-wide text-stone-900 heading-font">
            2. Vetted Data Sharing
          </h2>
          <p className="text-stone-650 text-sm sm:text-base leading-relaxed font-normal">
            Your technical details and credentials are only shared with audited members of our platform after direct authorization. We do not sell, rent, or trade partner registry information to third-party list brokers.
          </p>
        </section>
 
        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-wide text-stone-900 heading-font">
            3. Contact & Inquiries
          </h2>
          <p className="text-stone-650 text-sm sm:text-base leading-relaxed font-normal">
            If you have questions regarding our legal compliance framework or data encryption protocols, please reach out to our legal officer at <strong className="text-stone-905">sudheer@buildbharatsp.com</strong>.
          </p>
        </section>
      </article>
    </div>
  );
};
export default PrivacyPage;
