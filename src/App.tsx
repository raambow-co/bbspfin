import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { HeroDiscovery } from './components/HeroDiscovery';
import { BuildBharatEcosystem } from './components/build-bharat-ecosystem';
import { ClientMarquee } from './components/ClientMarquee';
import { Footer } from './components/Footer';
import { CompanyData } from './data/ecosystemData';
import { GoogleAnalytics } from './components/GoogleAnalytics';

// Dynamic lazy-loaded below-the-fold components for ultra-fast initial page load
const SynergyConceptSection = lazy(() => import('./components/SynergyConceptSection'));
const HowItWorks = lazy(() => import('./components/HowItWorks').then(m => ({ default: m.HowItWorks })));
const CommissionCadresSection = lazy(() => import('./components/CommissionCadresSection').then(m => ({ default: m.CommissionCadresSection })));
const TestimonialSection = lazy(() => import('./components/TestimonialSection').then(m => ({ default: m.TestimonialSection })));
const FAQSection = lazy(() => import('./components/FAQSection').then(m => ({ default: m.FAQSection })));
const SmoothCursor = lazy(() => import('./components/ui/smooth-cursor').then(m => ({ default: m.SmoothCursor })));
const CookieConsent = lazy(() => import('./components/CookieConsent').then(m => ({ default: m.CookieConsent })));
const FloatingContactButton = lazy(() => import('./components/FloatingContactButton').then(m => ({ default: m.FloatingContactButton })));

// Dynamic lazy-loaded routes & modals
const CompanyPage = lazy(() => import('./pages/CompanyPage').then(m => ({ default: m.CompanyPage })));
const CompaniesDirectoryPage = lazy(() => import('./pages/CompaniesDirectoryPage').then(m => ({ default: m.CompaniesDirectoryPage })));
const CompanyProfilePage = lazy(() => import('./pages/CompanyProfilePage').then(m => ({ default: m.CompanyProfilePage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const DiscoveryPage = lazy(() => import('./pages/DiscoveryPage').then(m => ({ default: m.DiscoveryPage })));
const PartnershipCTA = lazy(() => import('./components/PartnershipCTA').then(m => ({ default: m.PartnershipCTA })));
const CompanyModal = lazy(() => import('./components/CompanyModal').then(m => ({ default: m.CompanyModal })));
 
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
      case '/discovery':
        return (
          <DiscoveryPage 
            onNavigate={navigate}
            onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
          />
        );
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
          <CompanyPage 
            category="loans" 
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

            {/* SECTION 4 — SYNERGY CONCEPT & FOUNDER SECTION */}
            <SynergyConceptSection
              onNavigate={navigate}
              onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
            />
 
            {/* NEW SECTION 2 — HOW IT WORKS EXPLAINER */}
            <HowItWorks />
 
            {/* OFFICIAL 20 CADRES COMMISSION & REVENUE SHARING SECTION */}
            <CommissionCadresSection 
              onOpenPartnerModal={() => setIsPartnerModalOpen(true)} 
            />

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
      <Suspense fallback={null}>
        <SmoothCursor />
      </Suspense>
      
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
          <Suspense fallback={
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-[#10367D] border-t-transparent animate-spin" />
            </div>
          }>
            {renderContent()}
          </Suspense>

          {/* SECTION 6 — PARTNERSHIP / CTA */}
          <Suspense fallback={null}>
            <PartnershipCTA
              isModalOpen={isPartnerModalOpen}
              onCloseModal={() => setIsPartnerModalOpen(false)}
              onOpenModal={() => setIsPartnerModalOpen(true)}
              currentPath={currentPath}
            />
          </Suspense>
        </main>
 
        {/* Company detail profile modal */}
        {selectedModalCompany && (
          <Suspense fallback={null}>
            <CompanyModal
              company={selectedModalCompany}
              onClose={() => setSelectedModalCompany(null)}
              onOpenPartner={() => setIsPartnerModalOpen(true)}
            />
          </Suspense>
        )}
 
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
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
 
        {/* Floating WhatsApp Action Button */}
        <Suspense fallback={null}>
          <FloatingContactButton />
        </Suspense>
      </div>
    </>
  );
}
 
export default App;
