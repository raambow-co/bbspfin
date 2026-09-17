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
import { DiscoveryPage } from './pages/DiscoveryPage';
import { SynergyConceptSection } from './components/SynergyConceptSection';
import { CommissionCadresSection } from './components/CommissionCadresSection';
import { SEOHead } from './components/SEOHead';

const getSeoProps = (path: string) => {
  if (path === '/solar' || path === '/sriram-solar') {
    return {
      title: 'BuildBharat Solar Solutions | Rooftop PV & PM Surya Ghar Subsidies',
      description: 'MNRE-approved residential and commercial solar installations across South India. Get up to ₹78,000 direct bank subsidy and a 25-year warranty with Sriram Solar.',
      keywords: 'Solar Panels Hyderabad, Rooftop Solar Subsidy, PM Surya Ghar Muft Bijli Yojana, Commercial Solar Plant Telangana, Sriram Solar, BuildBharat Solar',
      canonicalPath: '/solar'
    };
  }
  if (path === '/loans') {
    return {
      title: 'BuildBharat Financial Loans | Home, Business & Personal Loan Services',
      description: 'Access low-interest home loans, collateral-free MSME business loans, and loan against property with 40+ premier banking partners and rapid approvals.',
      keywords: 'Home Loans Hyderabad, MSME Business Loans, Low Interest Loan DSA, Mortgage Loan Against Property, Instant Personal Loan, BuildBharat Loans',
      canonicalPath: '/loans'
    };
  }
  if (path === '/real-estate') {
    return {
      title: 'BuildBharat Real Estate | HMDA & DTCP Approved Open Plots & Farmlands',
      description: 'Premium HMDA, DTCP, and RERA-approved residential open plots, gated communities, and high-appreciation farmlands in Hyderabad and South India growth corridors.',
      keywords: 'Open Plots Hyderabad, HMDA Approved Plots, Farmland Investment Telangana, Gated Community Villas, Real Estate South India, BuildBharat Real Estate',
      canonicalPath: '/real-estate'
    };
  }
  if (path === '/education' || path === '/edu-tech') {
    return {
      title: 'BuildBharat EdTech | Industry-Aligned Upskilling & Career Certifications',
      description: 'Comprehensive professional training in Full-Stack Web Development, AI & ML, Data Science, and Solar Engineering with 100% placement assistance.',
      keywords: 'EdTech Certification India, Full Stack Developer Course Hyderabad, AI ML Training, Solar Technical Training, Placement Assistance, BuildBharat Education',
      canonicalPath: '/education'
    };
  }
  if (path === '/companies') {
    return {
      title: 'Operating Companies Directory | Build Bharat Synergy Partners',
      description: 'Explore the full portfolio of operating enterprises across Solar Energy, Financial Services, Real Estate Developments, and Education.',
      keywords: 'BuildBharat Companies, Sriram Solar, BuildBharat Loans, BuildBharat Real Estate, BuildBharat EdTech, Business Directory',
      canonicalPath: '/companies'
    };
  }
  if (path === '/discovery') {
    return {
      title: 'Interactive Ecosystem Explorer | Build Bharat Synergy Partners',
      description: 'Search, filter, and discover multi-industry business services, partner benefits, and 10-Cadre revenue sharing opportunities.',
      keywords: 'Business Discovery Explorer, BuildBharat Services, Synergy Network Finder, Multi Industry Portal',
      canonicalPath: '/discovery'
    };
  }
  if (path === '/contact') {
    return {
      title: 'Contact Corporate Headquarters | Build Bharat Synergy Partners Hyderabad',
      description: 'Get in touch with Build Bharat Synergy Partners leadership, customer support, and regional branch desks across Telangana and South India.',
      keywords: 'Contact BuildBharat, Hyderabad Corporate Office, Hayath Nagar HQ, Partner Support Desk',
      canonicalPath: '/contact'
    };
  }
  if (path === '/privacy') {
    return {
      title: 'Privacy Policy | Build Bharat Synergy Partners',
      description: 'Official privacy policy outlining customer data protection, digital security protocols, and confidential lead processing.',
      keywords: 'Privacy Policy, Data Protection, BuildBharat Terms',
      canonicalPath: '/privacy'
    };
  }
  if (path === '/terms') {
    return {
      title: 'Terms and Conditions | Build Bharat Synergy Partners',
      description: 'Official terms and conditions governing partner memberships, 10-Cadre commissions, refunds, and ecosystem service usage.',
      keywords: 'Terms and Conditions, Partnership Agreement, 10 Cadre Policy',
      canonicalPath: '/terms'
    };
  }
  if (path.startsWith('/companies/')) {
    const name = path.replace('/companies/', '').replace(/-/g, ' ').toUpperCase();
    return {
      title: `${name} | Build Bharat Synergy Partner Company`,
      description: `Official enterprise profile for ${name} within the Build Bharat Synergy Partners multi-industry conglomerate.`,
      keywords: `${name}, BuildBharat Partner Company, Business Profile`,
      canonicalPath: path
    };
  }
  return {
    title: 'Build Bharat Synergy Partners | Multi-Industry Business Ecosystem & Partner Network',
    description: 'Build Bharat Synergy Partners (BBSP) is an integrated conglomerate connecting Solar Energy, Financial Loans, Real Estate, and EdTech with verified 10-Cadre revenue distribution.',
    keywords: 'Build Bharat Synergy Partners, BBSP, Solar Energy, Financial Loans, Real Estate Hyderabad, EdTech, Sriram Solar, 10 Cadres Commission, Business Partnership India',
    canonicalPath: '/'
  };
};

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
 
            {/* OFFICIAL 10 CADRES COMMISSION & REVENUE SHARING SECTION */}
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
      <SEOHead {...getSeoProps(currentPath)} />
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
