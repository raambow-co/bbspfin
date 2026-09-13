import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Building2, Sun, Coins, GraduationCap, ArrowLeft, Award } from 'lucide-react';
import { PILLAR_CATEGORIES } from '../data/ecosystemData';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
 
interface HeaderProps {
  onOpenPartnerModal: () => void;
  onSelectCategory?: (catId: string) => void;
  onNavigate: (path: string) => void;
  currentPath: string;
}
 
interface EcosystemDrawerProps {
  onNavigate: (path: string) => void;
  onOpenPartnerModal: () => void;
  triggerButton: React.ReactElement;
  onCloseParentMenu?: () => void;
}
 
const EcosystemDrawer: React.FC<EcosystemDrawerProps> = ({
  onNavigate,
  onOpenPartnerModal,
  triggerButton,
  onCloseParentMenu
}) => {
  const categories = Object.values(PILLAR_CATEGORIES);
 
  const getIcon = (catId: string, size = 15) => {
    switch (catId) {
      case 'solar': return <Sun size={size} />;
      case 'loans': return <Coins size={size} />;
      case 'real-estate': return <Building2 size={size} />;
      case 'education': return <GraduationCap size={size} />;
      default: return <Building2 size={size} />;
    }
  };
 
  return (
    <Drawer>
      <DrawerTrigger render={triggerButton} />
      <DrawerContent className="w-[85vw] sm:w-96 bg-[#FFFFFF] border-l border-slate-200/40 p-6 flex flex-col justify-between h-full shadow-2xl">
        <div>
          <DrawerHeader className="p-0 mb-6 text-left">
            <DrawerTitle className="text-xl font-bold text-[#10367D] heading-font flex items-center gap-2">
              <Building2 className="text-[#A5CEE0]" size={20} />
              <span>Ecosystem Portfolio</span>
            </DrawerTitle>
            <DrawerDescription className="text-xs text-slate-500 font-normal mt-1">
              Active corporate operating entities and certified member brands across the Synergy Network.
            </DrawerDescription>
          </DrawerHeader>
 
          {/* Scrollable list of 4 companies */}
          <div className="space-y-4 overflow-y-auto max-h-[65vh] pr-1">
            {categories.map((pillar) => {
              const company = pillar.companies[0];
              return (
                <DrawerClose 
                  key={pillar.id}
                  render={
                    <div 
                      className="bg-slate-50 border border-slate-100 rounded-xl p-4 hover:border-[#10367D]/20 hover:-translate-y-0.5 transition-all duration-300 shadow-sm cursor-pointer group text-left"
                    />
                  }
                  onClick={() => {
                    if (onCloseParentMenu) onCloseParentMenu();
                    onNavigate(`/${pillar.id}`);
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={company.logo} 
                          alt={company.name} 
                          className="h-8 w-auto object-contain bg-white p-1 rounded-lg border border-slate-200 group-hover:scale-105 transition-transform" 
                        />
                        <h4 className="text-sm font-bold text-[#10367D] heading-font">
                          {company.name}
                        </h4>
                      </div>
                      
                      <span className="text-[9px] font-bold px-2 py-0.5 bg-[#10367D]/10 text-[#10367D] rounded-full uppercase tracking-wider font-mono">
                        {company.metrics[0].value}
                      </span>
                    </div>
 
                    <p className="text-slate-600 text-[11px] font-normal leading-relaxed">
                      {company.shortDescription}
                    </p>
 
                    <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-slate-500 group-hover:text-[#10367D] transition-colors pt-2.5 border-t border-slate-100">
                      <span className="uppercase tracking-wider font-bold subheading-font">Enter Profile Portal</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </DrawerClose>
              );
            })}
          </div>
        </div>
 
        <DrawerFooter className="p-0 mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
          <DrawerClose 
            render={
              <button
                className="bg-[#10367D]/10 hover:bg-[#10367D]/20 text-[#10367D] border border-transparent w-full justify-center text-xs py-2.5 flex items-center gap-2 rounded-full cursor-pointer transition-all font-bold"
              >
                <span>Initiate Partner Inquiry</span>
                <ArrowRight size={13} />
              </button>
            }
            onClick={() => {
              if (onCloseParentMenu) onCloseParentMenu();
              onOpenPartnerModal();
            }}
          />
          <DrawerClose render={
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 w-full justify-center text-xs py-2.5 rounded-full cursor-pointer">
              Close Directory
            </button>
          } />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
 
export const Header: React.FC<HeaderProps> = ({ 
  onOpenPartnerModal, 
  onSelectCategory,
  onNavigate,
  currentPath
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
 
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset mobile menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  // Reset mobile menu if resizing to desktop screen sizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentPath !== '/') {
      onNavigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
 
  const isSubPage = currentPath !== '/';

  const getSubPageTitle = () => {
    if (currentPath.startsWith('/companies/')) return "Partner Profile";
    switch (currentPath) {
      case '/solar': return "BuildBharat Solar";
      case '/loans': return "BuildBharat Loans";
      case '/real-estate': return "BuildBharat Real Estate";
      case '/education': return "BuildBharat EduTech";
      case '/companies': return "Companies Directory";
      case '/privacy': return "Privacy Policy";
      case '/terms': return "Terms of Service";
      case '/contact': return "Contact Desk";
      case '/discovery': return "Discovery Hub";
      default: return "Ecosystem Member";
    }
  };

  const getSubPageLogo = () => {
    switch (currentPath) {
      case '/solar': return "/build-bharat-solar.png";
      case '/loans': return "/build-bharat-loans.png";
      case '/real-estate': return "/build-bharat-real-estate.png";
      case '/education': return "/build-bharat-education.png";
      case '/discovery': return "/build-bharat-logo.png";
      default: return null;
    }
  };

  if (isSubPage) {
    return (
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200/50 flex flex-col">
        {/* Row 1 — Utility bar */}
        <div className="bg-[#fafaf9] border-b border-slate-200/40 py-2.5 px-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#6b7280] hover:text-[#1e3a6b] transition-colors bg-transparent border-none cursor-pointer p-0 font-sans"
          >
            <ArrowLeft size={14} />
            <span>Back to Build Bharat</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#6b7280] font-sans">
            <Award size={14} className="text-[#e0762c]" />
            <span>Ecosystem member: <strong className="text-[#1e3a6b] font-bold">{getSubPageTitle()}</strong></span>
          </div>
        </div>

        {/* Row 2 — Main nav */}
        <div className="py-4 px-6 flex items-center justify-between">
          {/* Left: logo mark */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('/')}
          >
            {getSubPageLogo() ? (
              <img 
                src={getSubPageLogo() || ""} 
                alt={getSubPageTitle()} 
                className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105" 
              />
            ) : (
              <>
                <div className="w-8 h-8 bg-[#1e3a6b] rounded-lg flex items-center justify-center text-white font-black text-sm transition-transform group-hover:scale-105">
                  B
                </div>
                <span className="text-[#1e3a6b] font-extrabold text-lg tracking-tight font-sans">
                  BuildBharat
                </span>
              </>
            )}
          </div>

          {/* Center: nav links */}
          <nav className="hidden md:flex items-center gap-[28px] text-[14px] text-[#374151] font-medium font-sans">
            <button
              onClick={() => onNavigate('/discovery')}
              className={`hover:text-[#1e3a6b] transition-colors bg-transparent border-none cursor-pointer p-0 font-sans text-[14px] font-medium ${
                currentPath === '/discovery' ? 'text-[#1e3a6b] font-bold border-b-2 border-[#1e3a6b]' : ''
              }`}
            >
              Discovery
            </button>
            <button
              onClick={() => scrollToSection('pathways')}
              className="hover:text-[#1e3a6b] transition-colors bg-transparent border-none cursor-pointer p-0 font-sans text-[14px] font-medium"
            >
              Business pillars
            </button>
            <button
              onClick={() => scrollToSection('synergy')}
              className="hover:text-[#1e3a6b] transition-colors bg-transparent border-none cursor-pointer p-0 font-sans text-[14px] font-medium"
            >
              Synergy concept
            </button>
            <button
              onClick={() => scrollToSection('regional')}
              className="hover:text-[#1e3a6b] transition-colors bg-transparent border-none cursor-pointer p-0 font-sans text-[14px] font-medium"
            >
              Regional reach
            </button>
          </nav>

          {/* Right: buttons */}
          <div className="hidden md:flex items-center gap-3">
            <EcosystemDrawer 
              onNavigate={onNavigate}
              onOpenPartnerModal={onOpenPartnerModal}
              triggerButton={
                <button className="bg-white hover:bg-slate-50 border border-slate-200 text-[#374151] text-[14px] rounded-[8px] px-4 h-[38px] flex items-center gap-2 cursor-pointer shadow-sm transition-all font-sans font-medium">
                  <Building2 size={14} className="text-[#374151]" />
                  <span>Companies</span>
                </button>
              }
            />
            <button
              onClick={onOpenPartnerModal}
              className="bg-[#1e3a6b] hover:bg-[#1e3a6b]/90 text-white text-[14px] font-bold rounded-[8px] px-5 h-[38px] flex items-center justify-center transition-all cursor-pointer border-none font-sans"
            >
              Partner with us
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-600 hover:text-[#1e3a6b] p-2 flex items-center justify-center bg-transparent border-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 px-6 py-6 space-y-4 bg-white text-left animate-fadeIn">
            <div className="flex flex-col space-y-3 font-semibold text-sm text-[#374151]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/discovery');
                }}
                className={`text-left py-2.5 hover:text-[#1e3a6b] border-b border-slate-100 bg-transparent font-sans ${
                  currentPath === '/discovery' ? 'text-[#1e3a6b] font-bold' : ''
                }`}
              >
                Discovery
              </button>
              <button
                onClick={() => scrollToSection('pathways')}
                className="text-left py-2.5 hover:text-[#1e3a6b] border-b border-slate-100 bg-transparent font-sans"
              >
                Business pillars
              </button>
              <button
                onClick={() => scrollToSection('synergy')}
                className="text-left py-2.5 hover:text-[#1e3a6b] border-b border-slate-100 bg-transparent font-sans"
              >
                Synergy concept
              </button>
              <button
                onClick={() => scrollToSection('regional')}
                className="text-left py-2.5 hover:text-[#1e3a6b] border-b border-slate-100 bg-transparent font-sans"
              >
                Regional reach
              </button>
            </div>
            
            <div className="pt-2 flex flex-col gap-2">
              <EcosystemDrawer 
                onNavigate={onNavigate}
                onOpenPartnerModal={onOpenPartnerModal}
                onCloseParentMenu={() => setMobileMenuOpen(false)}
                triggerButton={
                  <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#374151] text-xs font-bold uppercase tracking-wider rounded-lg py-2.5 flex items-center justify-center gap-2 cursor-pointer w-full shadow-sm transition-all font-sans">
                    <Building2 size={14} className="text-[#374151]" />
                    <span>Companies</span>
                  </button>
                }
              />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartnerModal();
                }}
                className="bg-[#1e3a6b] hover:bg-[#1e3a6b]/90 text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer border-none font-sans"
              >
                <span>Partner With Us</span>
              </button>
            </div>
          </div>
        )}
      </header>
    );
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 pr-6 md:pr-8 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-b border-slate-200/40"
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-4 pl-12 md:pl-24">
          <a 
            href="/" 
            className="flex items-center group text-decoration-none shrink-0"
            onClick={(e) => {
              e.preventDefault();
              if (currentPath !== '/') {
                onNavigate('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img 
              src="/build-bharat-logo.png" 
              alt="Build Bharat Synergy Partners" 
              className="h-9 sm:h-12 w-auto object-contain group-hover:scale-[1.03] transition-transform duration-300" 
            />
          </a>
        </div>
 
        {/* Center: Center-Aligned Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-900">
          <button
            onClick={() => onNavigate('/discovery')}
            className="hover:text-[#10367D] transition-colors bg-transparent border-none cursor-pointer p-0 text-slate-900 font-bold text-sm subheading-font"
          >
            Discovery
          </button>
          <button
            onClick={() => scrollToSection('pathways')}
            className="hover:text-[#10367D] transition-colors bg-transparent border-none cursor-pointer p-0 text-slate-900 font-bold text-sm subheading-font"
          >
            Business Pillars
          </button>
          <button
            onClick={() => scrollToSection('synergy')}
            className="hover:text-[#10367D] transition-colors bg-transparent border-none cursor-pointer p-0 text-slate-900 font-bold text-sm subheading-font"
          >
            Synergy Concept
          </button>
          <button
            onClick={() => scrollToSection('regional')}
            className="hover:text-[#10367D] transition-colors bg-transparent border-none cursor-pointer p-0 text-slate-900 font-bold text-sm subheading-font"
          >
            Regional Reach
          </button>
        </nav>
 
        {/* Right: Primary Call-To-Action Button Group */}
        <div className="hidden md:flex items-center gap-4">
          <EcosystemDrawer 
            onNavigate={onNavigate}
            onOpenPartnerModal={onOpenPartnerModal}
            triggerButton={
              <button className="bg-white hover:bg-slate-50 border border-slate-200 text-[#10367D] text-xs font-bold uppercase tracking-wider rounded-full px-4 py-2.5 flex items-center gap-2 cursor-pointer shadow-sm transition-all">
                <Building2 size={14} className="text-[#10367D]" />
                <span>Companies</span>
              </button>
            }
          />
          
          <button
            onClick={onOpenPartnerModal}
            className="btn-gold px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Partner With Us
          </button>
        </div>
 
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-600 hover:text-[#10367D] p-3 min-w-[44px] min-h-[44px] flex items-center justify-center bg-transparent border-none cursor-pointer relative"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
 
      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-200/45 px-6 py-6 mt-3 space-y-4 animate-fadeIn bg-[#FFFFFF] shadow-lg rounded-b-2xl text-left">
          

          <div className="flex flex-col space-y-3 font-semibold text-sm text-slate-600">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/discovery');
              }}
              className="text-left py-2.5 hover:text-[#10367D] border-b border-slate-100 bg-transparent text-slate-600 font-semibold"
            >
              Discovery
            </button>
            <button
              onClick={() => scrollToSection('pathways')}
              className="text-left py-2.5 hover:text-[#10367D] border-b border-slate-100 bg-transparent"
            >
              Business Pillars
            </button>
            <button
              onClick={() => scrollToSection('synergy')}
              className="text-left py-2.5 hover:text-[#10367D] border-b border-slate-100 bg-transparent"
            >
              Synergy Concept
            </button>
            <button
              onClick={() => scrollToSection('regional')}
              className="text-left py-2.5 hover:text-[#10367D] border-b border-slate-100 bg-transparent"
            >
              Regional Reach
            </button>
          </div>
 
          <div className="pt-2 flex flex-col gap-2">
            <EcosystemDrawer 
              onNavigate={onNavigate}
              onOpenPartnerModal={onOpenPartnerModal}
              onCloseParentMenu={() => setMobileMenuOpen(false)}
              triggerButton={
                <button className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#10367D] text-xs font-bold uppercase tracking-wider rounded-full py-2.5 flex items-center justify-center gap-2 cursor-pointer w-full shadow-sm transition-all">
                  <Building2 size={14} className="text-[#10367D]" />
                  <span>Companies Directory</span>
                </button>
              }
            />
 
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPartnerModal();
              }}
              className="btn-gold w-full text-xs font-bold uppercase tracking-wider py-2.5 rounded-full flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Partner With Us</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
