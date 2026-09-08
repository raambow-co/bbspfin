import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroDiscovery } from './components/HeroDiscovery';
import { BuildBharatEcosystem } from './components/build-bharat-ecosystem';
import { SmoothCursor } from './components/ui/smooth-cursor';
import { PartnershipCTA } from './components/PartnershipCTA';
import { Footer } from './components/Footer';
import { CompanyPage } from './pages/CompanyPage';
import { CompanyModal } from './components/CompanyModal';
import { CompanyData } from './data/ecosystemData';
import { ClientMarquee } from './components/ClientMarquee';
 
// Phase 2 components & pages
import { HowItWorks } from './components/HowItWorks';
import { TestimonialSection } from './components/TestimonialSection';
import { FAQSection } from './components/FAQSection';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { CookieConsent } from './components/CookieConsent';
import { FloatingContactButton } from './components/FloatingContactButton';
import { CompaniesDirectoryPage } from './pages/CompaniesDirectoryPage';
import { CompanyProfilePage } from './pages/CompanyProfilePage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { LoansPage } from './pages/LoansPage';
 
export function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState<boolean>(false);
  const [selectedModalCompany, setSelectedModalCompany] = useState<CompanyData | null>(null);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
 
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
 
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
 
  const renderContent = () => {
    // Dynamic Dynamic Route Routing for /companies/[id]
    if (currentPath.startsWith('/companies/')) {
      const companyId = currentPath.replace('/companies/', '');
      return (
        <CompanyProfilePage 
          companyId={companyId} 
          onNavigate={navigate} 
          onOpenPartnerModal={() => setIsPartnerModalOpen(true)} 
        />
      );
    }
 
    switch (currentPath) {
      case '/companies':
        return (
          <CompaniesDirectoryPage 
            onNavigate={navigate}
            onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
          />
        );
      case '/privacy':
        return <PrivacyPage onNavigate={navigate} />;
      case '/terms':
        return <TermsPage onNavigate={navigate} />;
      case '/contact':
        return (
          <ContactPage 
            onNavigate={navigate} 
            onOpenPartnerModal={() => setIsPartnerModalOpen(true)} 
          />
        );
      case '/solar':
      case '/sriram-solar':
        return (
          <CompanyPage 
            category="solar" 
            onNavigate={navigate} 
            onOpenPartnerModal={() => setIsPartnerModalOpen(true)} 
          />
        );
      case '/loans':
        return (
          <LoansPage 
            onNavigate={navigate} 
            onOpenPartnerModal={() => setIsPartnerModalOpen(true)} 
          />
        );
      case '/real-estate':
        return (
          <CompanyPage 
            category="real-estate" 
            onNavigate={navigate} 
            onOpenPartnerModal={() => setIsPartnerModalOpen(true)} 
          />
        );
      case '/education':
      case '/edu-tech':
        return (
          <CompanyPage 
            category="education" 
            onNavigate={navigate} 
            onOpenPartnerModal={() => setIsPartnerModalOpen(true)} 
          />
        );
      default:
        return (
          <>
            {/* SECTION 1 — HERO / DISCOVERY EXPERIENCE */}
            <HeroDiscovery
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => setSelectedCategory(catId)}
              onNavigate={navigate}
              onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
            />

            {/* PARTNER CLIENT LOGO MARQUEE */}
            <ClientMarquee />
 
            {/* SECTION 3 — BENTO GRID ECOSYSTEM GRID */}
            <BuildBharatEcosystem 
              activeRegionFilter={selectedRegionFilter} 
              onClearRegionFilter={() => setSelectedRegionFilter(null)} 
            />
 
            {/* NEW SECTION 2 — HOW IT WORKS EXPLAINER */}
            <HowItWorks />
 
            {/* NEW SECTION 4 — TESTIMONIALS */}
            <TestimonialSection />
 
            {/* NEW SECTION 6 — ACCORDION FAQ */}
            <FAQSection />
          </>
        );
    }
  };
 
  return (
    <>
      <GoogleAnalytics currentPath={currentPath} />
      <SmoothCursor />
      
      <div className="min-h-screen bg-[#070A11] text-white flex flex-col font-sans selection:bg-[#E2B049]/20 selection:text-white bg-grainy">
        {/* Header Navigation */}
        <Header
          onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
          onSelectCategory={(catId: string) => {
            setSelectedCategory(catId);
            navigate('/');
          }}
          onNavigate={navigate}
          currentPath={currentPath}
        />
 
        {/* Main Content Flow */}
        <main className="flex-grow">
          {renderContent()}
 
          {/* SECTION 6 — PARTNERSHIP / CTA */}
          <PartnershipCTA
            isModalOpen={isPartnerModalOpen}
            onCloseModal={() => setIsPartnerModalOpen(false)}
            onOpenModal={() => setIsPartnerModalOpen(true)}
            currentPath={currentPath}
          />
        </main>
 
        {/* Company detail profile modal */}
        <CompanyModal
          company={selectedModalCompany}
          onClose={() => setSelectedModalCompany(null)}
          onOpenPartner={() => setIsPartnerModalOpen(true)}
        />
 
        {/* Footer */}
        <Footer
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            navigate('/');
          }}
          onOpenPartner={() => setIsPartnerModalOpen(true)}
          onNavigate={navigate}
        />
 
        {/* Cookie Consent Alert Banner */}
        <CookieConsent />
 
        {/* Floating WhatsApp Action Button */}
        <FloatingContactButton />
      </div>
    </>
  );
}
 
export default App;
