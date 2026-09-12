import React from 'react';
import { ArrowLeft, ShieldCheck, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
 
interface ContactPageProps {
  onNavigate: (path: string) => void;
  onOpenPartnerModal: () => void;
}
 
export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenPartnerModal }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 selection:bg-[#10367D]/15 selection:text-[#10367D] font-sans text-left">
      
      {/* Contact Panel Grid */}
      <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10367D]/5 border border-[#10367D]/15 text-[#10367D] text-[11px] font-bold uppercase tracking-widest shadow-sm mb-3">
              <ShieldCheck size={14} className="text-[#D57530]" />
              <span>DIRECT EXECUTIVE COMMUNICATIONS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 heading-font uppercase tracking-tight">
              Contact <span className="luxury-gradient-text">Headquarters</span>
            </h1>
            <p className="text-stone-600 text-sm sm:text-base mt-2 leading-relaxed">
              Reach out to our corporate headquarters for partnership eligibility, technical audits, or platform developer queries.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-6 border border-stone-200/90 rounded-2xl bg-white flex items-start gap-4 shadow-sm hover:shadow transition-all">
              <span className="p-3 bg-[#10367D]/5 border border-[#10367D]/15 text-[#10367D] rounded-xl mt-0.5 shrink-0">
                <MapPin size={20} />
              </span>
              <div>
                <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide heading-font">Office Headquarters</h4>
                <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                  5-76/03, Surya Vamsi Nagar, Hayath Nagar, Hyderabad, TS - 501505
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="mailto:sudheer@buildbharatsp.com"
                className="p-5 border border-stone-200/90 rounded-2xl bg-white flex items-start gap-3.5 shadow-sm hover:shadow hover:border-[#10367D]/30 transition-all text-decoration-none group"
              >
                <span className="p-2.5 bg-[#10367D]/5 border border-[#10367D]/15 text-[#10367D] rounded-xl mt-0.5 group-hover:scale-105 transition-transform">
                  <Mail size={18} />
                </span>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide heading-font">Email Desk</h4>
                  <span className="text-stone-600 text-xs mt-1 block">sudheer@buildbharatsp.com</span>
                </div>
              </a>

              <a 
                href="tel:+919353018855"
                className="p-5 border border-stone-200/90 rounded-2xl bg-white flex items-start gap-3.5 shadow-sm hover:shadow hover:border-[#10367D]/30 transition-all text-decoration-none group"
              >
                <span className="p-2.5 bg-[#10367D]/5 border border-[#10367D]/15 text-[#10367D] rounded-xl mt-0.5 group-hover:scale-105 transition-transform">
                  <Phone size={18} />
                </span>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide heading-font">Hotline</h4>
                  <span className="text-stone-600 text-xs mt-1 block">+91 93530 18855</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 bg-gradient-to-br from-[#0B1E3D] via-[#10367D] to-[#17489E] text-white p-8 sm:p-9 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#A5CEE0]/15 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-4 relative z-10">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#A5CEE0] block">MEMBERSHIP NETWORK</span>
            <h3 className="text-2xl font-extrabold heading-font uppercase tracking-wide text-white">
              Partner Collaboration
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              Are you an audited Solar provider, MSME credit institution, developer, or vocational skill school? Join our synergy platform to list services and connect with verified clients.
            </p>
            <div className="text-xs text-slate-300 pt-2 leading-relaxed border-t border-white/10">
              <strong className="text-white">MD Contact:</strong> D Sudheer Reddy
            </div>
          </div>

          <button
            onClick={onOpenPartnerModal}
            className="luxury-btn-gold justify-center text-xs py-4 px-6 rounded-full cursor-pointer uppercase tracking-wider font-bold flex items-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all relative z-10 border-none"
          >
            <span>Partner With Us</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
};
export default ContactPage;
