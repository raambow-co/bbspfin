import React, { useState } from 'react';
import { Handshake, MapPin, Phone, Mail, Youtube, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (catId: string) => void;
  onOpenPartner: () => void;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPartner, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      console.log('Newsletter signup submitted for email:', email);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0d2b4e] text-[#dbe4ee] py-10 px-6 sm:px-10 border-t border-[#2c4a6b]/40 font-sans text-left">
      <div className="max-w-[1280px] mx-auto">
        {/* Main 3-column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1.2fr] gap-8 pb-8 border-b border-[#2c4a6b]/30">
          
          {/* Column 1 — Company */}
          <div className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div 
                className="flex items-center cursor-pointer group"
                onClick={() => onNavigate('/')}
              >
                <img 
                  src="/build-bharat-logo.png" 
                  alt="Build Bharat Synergy Partners" 
                  className="h-16 sm:h-20 w-auto object-contain transition-transform group-hover:scale-[1.02]" 
                />
              </div>
              <p className="text-[#b9c6d6] text-xs sm:text-sm leading-relaxed max-w-xl">
                Multi-brand corporate ecosystem across Renewable Energy, Financial Services, Real Estate and EdTech.
              </p>
            </div>

            {/* Contact Details & Muted Line */}
            <div className="space-y-2.5 pt-2">
              <div className="flex flex-col gap-1.5 text-xs text-[#dbe4ee]">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#f0a951] shrink-0" />
                  <span>5-76/03, Surya Vamsi Nagar, Hayath Nagar, Hyderabad</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <a href="tel:+919353018855" className="flex items-center gap-2 hover:text-[#f0a951] transition-colors">
                    <Phone size={14} className="text-[#f0a951] shrink-0" />
                    <span>+91 93530 18855</span>
                  </a>
                  <a href="mailto:sudheer@buildbharatsp.com" className="flex items-center gap-2 hover:text-[#f0a951] transition-colors">
                    <Mail size={14} className="text-[#f0a951] shrink-0" />
                    <span>sudheer@buildbharatsp.com</span>
                  </a>
                </div>
              </div>
              <p className="text-[11px] text-[#7d8ea3] leading-tight">
                Serving Hyderabad (HQ) · Bengaluru · Hubli · Goa · Tamil Nadu · Vijayawada · Vizag
              </p>
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div className="flex flex-col space-y-3">
            <span className="text-[#f0a951] uppercase font-bold tracking-widest text-[12px] block">
              Explore
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-y-2.5 text-xs sm:text-sm">
              <button 
                onClick={() => onNavigate('/solar')} 
                className="hover:text-[#f0a951] transition-colors text-left bg-transparent border-none p-0 cursor-pointer text-[#dbe4ee] font-medium"
              >
                Solar
              </button>
              <button 
                onClick={() => onNavigate('/loans')} 
                className="hover:text-[#f0a951] transition-colors text-left bg-transparent border-none p-0 cursor-pointer text-[#dbe4ee] font-medium"
              >
                Loans
              </button>
              <button 
                onClick={() => onNavigate('/real-estate')} 
                className="hover:text-[#f0a951] transition-colors text-left bg-transparent border-none p-0 cursor-pointer text-[#dbe4ee] font-medium"
              >
                Real estate
              </button>
              <button 
                onClick={() => onNavigate('/education')} 
                className="hover:text-[#f0a951] transition-colors text-left bg-transparent border-none p-0 cursor-pointer text-[#dbe4ee] font-medium"
              >
                Education
              </button>
              <button 
                onClick={() => onNavigate('/companies')} 
                className="hover:text-[#f0a951] transition-colors text-left bg-transparent border-none p-0 cursor-pointer text-[#dbe4ee] font-medium"
              >
                Browse partners
              </button>
              <button 
                onClick={() => {
                  onNavigate('/');
                  setTimeout(() => document.getElementById('regional')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }} 
                className="hover:text-[#f0a951] transition-colors text-left bg-transparent border-none p-0 cursor-pointer text-[#dbe4ee] font-medium"
              >
                About hubs
              </button>
            </div>
          </div>

          {/* Column 3 — Newsletter + CTA */}
          <div className="flex flex-col space-y-3">
            <span className="text-[#f0a951] uppercase font-bold tracking-widest text-[12px] block">
              Stay in the loop
            </span>
            <p className="text-[#b9c6d6] text-xs leading-normal">
              Verified B2B partner matches and clean infrastructure news.
            </p>
            
            <div className="space-y-3 w-full">
              {subscribed ? (
                <div className="text-xs text-[#f0a951] font-semibold bg-[#0a2440] border border-[#2c4a6b] px-3 py-2 rounded-[6px] text-center">
                  ✓ Subscribed successfully!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 w-full">
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#0a2440] border border-[#2c4a6b] text-white text-xs px-3 py-2 rounded-[6px] outline-none focus:border-[#f0a951] flex-grow min-w-0"
                  />
                  <button
                    type="submit"
                    className="bg-[#3a5878] hover:bg-[#4c6e94] text-white text-xs px-4 py-2 rounded-[6px] font-semibold transition-colors cursor-pointer border-none shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}

              <button
                onClick={onOpenPartner}
                className="w-full bg-[#f0a951] hover:bg-[#f2b96d] text-[#3a2205] text-xs font-bold py-2.5 rounded-[6px] transition-colors shadow-sm flex items-center justify-center gap-1.5 border-none cursor-pointer"
              >
                Partner with us
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 mt-6 flex flex-col md:flex-row items-center justify-between gap-6 text-[#7d8ea3] text-xs font-medium">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-2.5 bg-[#0a2440] px-3.5 py-1.5 rounded-full border border-[#2c4a6b]/60 shadow-sm hover:border-[#f0a951]/50 transition-colors">
              <img src="/build-bharat-logo.png" alt="Build Bharat Logo" className="h-5 w-auto object-contain" />
              <span className="text-[#b9c6d6]"><strong className="text-[#f0a951] tracking-wider uppercase font-bold text-[10px]">Build Bharat Synergy Partners</strong></span>
            </div>
            <span>© {new Date().getFullYear()} Build Bharat Synergy Partners. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" aria-label="YouTube" className="text-[#b9c6d6] hover:text-[#f0a951] transition-all hover:scale-110"><Youtube size={18} strokeWidth={1.5} /></a>
              <a href="#" aria-label="Instagram" className="text-[#b9c6d6] hover:text-[#f0a951] transition-all hover:scale-110"><Instagram size={18} strokeWidth={1.5} /></a>
              <a href="#" aria-label="Facebook" className="text-[#b9c6d6] hover:text-[#f0a951] transition-all hover:scale-110"><Facebook size={18} strokeWidth={1.5} /></a>
            </div>
            <span className="hidden md:block w-px h-5 bg-[#2c4a6b]/60"></span>
            <p className="font-semibold text-center md:text-right uppercase tracking-wider text-[10px] text-[#b9c6d6]">
              MD: D Sudheer Reddy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
