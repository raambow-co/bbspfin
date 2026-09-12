import React from 'react';
import { ArrowLeft, ShieldCheck, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
 
interface ContactPageProps {
  onNavigate: (path: string) => void;
  onOpenPartnerModal: () => void;
}
 
export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenPartnerModal }) => {
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
            <span>Corporate Support Desk</span>
          </div>
        </div>
      </div>
 
      {/* Contact Panel Grid */}
      <section className="py-20 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-7 space-y-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#D57530] block mb-2">
              COMMUNICATION GATES
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 heading-font uppercase tracking-tight">
              Contact Us
            </h1>
            <p className="text-stone-605 text-sm sm:text-base mt-2 leading-relaxed">
              Reach out to our corporate headquarters for partnership eligibility, technical audits, or platform developer queries.
            </p>
          </div>
 
          <div className="space-y-4">
            <div className="p-5 border border-stone-200 rounded-xl bg-white flex items-start gap-3.5 shadow-sm">
              <span className="p-2 bg-blue-50 border border-blue-100 text-[#10367D] rounded-xl mt-0.5">
                <MapPin size={18} />
              </span>
              <div>
                <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide heading-font">Office Headquarters</h4>
                <p className="text-stone-650 text-xs sm:text-sm mt-1 leading-relaxed">
                  5-76/03, Surya Vamsi Nagar, Hayath Nagar, Hyderabad, TS - 501505
                </p>
              </div>
            </div>
 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="mailto:sudheer@buildbharatsp.com"
                className="p-5 border border-stone-200 rounded-xl bg-white flex items-start gap-3.5 shadow-sm hover:border-stone-300 transition-colors text-decoration-none"
              >
                <span className="p-2 bg-blue-50 border border-blue-100 text-[#10367D] rounded-xl mt-0.5">
                  <Mail size={18} />
                </span>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide heading-font">Email Desk</h4>
                  <span className="text-stone-650 text-xs mt-1 block">sudheer@buildbharatsp.com</span>
                </div>
              </a>
 
              <a 
                href="tel:+919353018855"
                className="p-5 border border-stone-200 rounded-xl bg-white flex items-start gap-3.5 shadow-sm hover:border-stone-300 transition-colors text-decoration-none"
              >
                <span className="p-2 bg-blue-50 border border-blue-100 text-[#10367D] rounded-xl mt-0.5">
                  <Phone size={18} />
                </span>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide heading-font">Hotline</h4>
                  <span className="text-stone-650 text-xs mt-1 block">+91 93530 18855</span>
                </div>
              </a>
            </div>
          </div>
        </div>
 
        <div className="md:col-span-5 bg-stone-100 border border-stone-200 p-8 rounded-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-stone-905 heading-font uppercase tracking-wide">
              Partner Collaboration
            </h3>
            <p className="text-stone-600 text-xs leading-relaxed">
              Are you an audited Solar provider, MSME credit institution, developer, or vocational skill school? Join our synergy platform to list services and connect with verified clients.
            </p>
            <div className="text-xs text-stone-500 pt-2 leading-relaxed">
              <strong>MD Contact:</strong> D Sudheer Reddy
            </div>
          </div>
 
          <button
            onClick={onOpenPartnerModal}
            className="btn-gold justify-center text-xs py-3 rounded-full cursor-pointer uppercase tracking-wider font-bold flex items-center gap-1.5 mt-6 shadow-sm"
          >
            <span>Partner With Us</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
};
export default ContactPage;
