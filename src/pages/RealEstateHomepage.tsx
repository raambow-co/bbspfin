import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Landmark, ChevronDown, Home, Search, Award } from 'lucide-react';

interface RealEstateHomepageProps {
  onNavigate: (path: string) => void;
  onOpenPartnerModal: () => void;
  company: any;
}

export const RealEstateHomepage: React.FC<RealEstateHomepageProps> = ({
  onNavigate,
  onOpenPartnerModal,
  company
}) => {
  // Cities list - exactly synchronized
  const activeCities = [
    "Hyderabad TS (HQ)",
    "Bengaluru KA",
    "Hubli KA",
    "Goa",
    "Tamil Nadu",
    "Vijayawada AP",
    "Vizag AP"
  ];

  // State for search bar
  const [searchLocation, setSearchLocation] = useState(activeCities[0]);
  const [searchBudget, setSearchBudget] = useState("Any Budget");
  const [searchType, setSearchType] = useState("Flats");
  const [searchTriggered, setSearchTriggered] = useState(false);

  // State for FAQ Accordion
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // State for Contact Form
  const [formData, setFormData] = useState({
    fullName: "",
    contactInfo: "",
    preferredLocation: activeCities[0],
    configuration: "2 BHK",
    requirements: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTriggered(true);
    // Smooth scroll down to empty state
    setTimeout(() => {
      const element = document.getElementById("search-results");
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName.trim() && formData.contactInfo.trim()) {
      setFormSubmitted(true);
      // Reset form
      setFormData({
        fullName: "",
        contactInfo: "",
        preferredLocation: activeCities[0],
        configuration: "2 BHK",
        requirements: ""
      });
    }
  };

  const faqs = [
    {
      q: "Do you charge a brokerage fee?",
      a: "As a verified B2B ecosystem partner, BuildBharat operates on a transparent, direct service model. We do not charge traditional double-sided brokerage. Any platform facilitation fees are clearly disclosed upfront during the legal vetting phase."
    },
    {
      q: "Are the flats RERA-registered?",
      a: "Yes. Every residential development listed on BuildBharat is strictly verified for its RERA registration number and regulatory compliance. We do not display layouts or projects without active RERA vetting."
    },
    {
      q: "Which cities do you operate in?",
      a: `We only operate in our authorized regional branch locations: ${activeCities.join(', ')}. This ensures our local team can physically audit and verify every single layout before listing.`
    },
    {
      q: "When will listings go live?",
      a: "BuildBharat is newly launched. We are currently in the physical inspection and legal verification phase for our initial cohort of land parcels, commercial IT parks, and logistics warehouses. Listings are projected to go live in the upcoming quarter. You can register your requirements below to get early priority notifications."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-[#2b5330]/10 selection:text-[#2b5330]">
      
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[320px] bg-stone-950 flex flex-col justify-end pb-16 pt-24 px-6 md:px-12 overflow-hidden">
        {/* Background Image of residential complex/flats */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=1600&q=80" 
            alt="Indian residential complex apartments"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-stone-950/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full text-left space-y-3">
          <div className="inline-block">
            <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-white px-3 py-1 bg-[#2b5330] border border-white/30 rounded-full font-extrabold font-sans">
              BuildBharat Real Estate
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-white heading-font uppercase max-w-3xl leading-tight">
            Find your next home, verified end to end
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            Flats, plots and commercial spaces across growth corridors — under one platform.
          </p>
        </div>
      </section>

      {/* 2. Search Bar Section */}
      <section className="relative z-20 px-6 -mt-8 max-w-5xl mx-auto">
        <form 
          onSubmit={handleSearchSubmit}
          className="bg-white border border-stone-200 rounded-2xl shadow-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          {/* Location field */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Location</label>
            <select
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none focus:border-[#2b5330] transition-colors"
            >
              {activeCities.map((city, idx) => (
                <option key={idx} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Budget field */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Select Budget</label>
            <select
              value={searchBudget}
              onChange={(e) => setSearchBudget(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none focus:border-[#2b5330] transition-colors"
            >
              <option value="Any Budget">Any Budget</option>
              <option value="Under ₹50 Lakhs">Under ₹50 Lakhs</option>
              <option value="₹50 Lakhs - ₹2 Crores">₹50 Lakhs - ₹2 Crores</option>
              <option value="Above ₹2 Crores">Above ₹2 Crores</option>
            </select>
          </div>

          {/* Property type field */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Property Type</label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none focus:border-[#2b5330] transition-colors"
            >
              <option value="Flats">Flats</option>
              <option value="Plots">Plots</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          {/* Find Button */}
          <div>
            <button
              type="submit"
              className="w-full h-11 bg-[#2b5330] hover:bg-[#203f25] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border-none"
            >
              <Search size={14} />
              <span>Find Property</span>
            </button>
          </div>
        </form>
      </section>

      {/* 3. Empty State Section */}
      {searchTriggered && (
        <section id="search-results" className="py-12 px-6 max-w-5xl mx-auto text-center animate-fadeIn">
          <div className="border-2 border-dashed border-stone-200 rounded-2xl p-10 md:p-14 max-w-2xl mx-auto space-y-5 bg-stone-50/50">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
              <Home size={22} className="stroke-[1.5]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-stone-800 uppercase tracking-wide heading-font">
                No flats found
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                We're onboarding verified flats and properties in your selected location. Check back soon or register interest below.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  const formElement = document.getElementById("enquiry-form");
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all border-none cursor-pointer"
              >
                Notify me when listings go live
              </button>
            </div>
          </div>
        </section>
      )}

      {/* About Our Company Section */}
      <section className="py-16 md:py-24 bg-white border-t border-stone-200">
        <div className="container-custom max-w-5xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text details column (7 columns on desktop) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#2b5330] bg-[#2b5330]/5 px-3 py-1 rounded-full border border-[#2b5330]/10 inline-block font-sans">
                  About Our Company
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight tracking-tight heading-font uppercase">
                  Designing Green Spaces for Sustainable Futures
                </h2>
                <div className="w-12 h-0.5 bg-[#2b5330] mt-3" />
              </div>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans font-normal">
                {company.name} is a premier property development and facilitation partner in South India. We design, audit, and curate green residential gated communities, Grade-A commercial IT parks, and integrated plotted developments optimized for the modern era.
              </p>

              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-sans font-normal">
                By integrating solar power grids directly into our architectural blueprints and linking pre-approved credit lines through our ecosystem, we deliver seamless, future-ready spaces. Every project we list is physically audited, legally vetted, and 100% RERA compliant.
              </p>

              {/* Core Pillars List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                {[
                  { title: "LEED Gold Standards", desc: "Energy efficient architectural design and materials." },
                  { title: "Solar Infrastructure", desc: "Pre-installed hybrid solar grids on all flat rooftops." },
                  { title: "Ecosystem Loans", desc: "Digital home loans pre-approved for immediate acquisition." },
                  { title: "Physically Audited", desc: "Every plot and unit verified for active title deeds." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <span className="text-[#2b5330] font-bold text-xs mt-0.5">✦</span>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-stone-850 uppercase tracking-wide heading-font">{item.title}</h4>
                      <p className="text-stone-500 text-[11px] sm:text-xs font-sans mt-0.5 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Architectural Image column (5 columns on desktop) */}
            <div className="lg:col-span-5 relative">
              <div className="border border-stone-200 p-2 bg-[#FFFFFF] rounded-2xl shadow-lg overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
                  alt="Modern gated villa residential architecture"
                  className="w-full h-[400px] object-cover rounded-xl"
                />
              </div>
              {/* Overlay badges for professional trust signal */}
              <div className="absolute -bottom-4 -left-4 bg-[#2b5330] text-white px-4 py-2.5 rounded-xl text-[10px] uppercase font-bold tracking-wider font-sans shadow-lg border border-white/10">
                100% RERA Certified Projects
              </div>
              
              {/* Decorative brackets */}
              <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b border-r border-[#2b5330]/35 pointer-events-none" />
              <div className="absolute -top-6 -left-6 w-12 h-12 border-t border-l border-[#2b5330]/35 pointer-events-none" />
            </div>

          </div>
        </div>
      </section>

      {/* 4. "Why partner with us" Section */}
      <section className="py-16 md:py-20 bg-[#F7F5F0] border-t border-b border-stone-200 text-center">
        <div className="container-custom max-w-5xl px-6">
          <div className="mb-12 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2b5330] block">
              Why partner with us
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold heading-font uppercase tracking-wide text-stone-900">
              Built for verified, transparent home buying
            </h2>
            <div className="w-12 h-px bg-[#2b5330] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Verified builders only",
                desc: "Every flat is checked before it's listed.",
                icon: <ShieldCheck size={26} className="text-[#2b5330]" />
              },
              {
                title: "RERA-compliant projects",
                desc: "We only list registered, compliant developments.",
                icon: <Award size={26} className="text-[#2b5330]" />
              },
              {
                title: "One ecosystem",
                desc: "Financing and legal support under one roof.",
                icon: <Landmark size={26} className="text-[#2b5330]" />
              }
            ].map((card, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-stone-200 p-7 rounded-2xl shadow-sm text-center flex flex-col items-center space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="p-3 bg-[#2b5330]/10 rounded-full">
                  {card.icon}
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-stone-850 uppercase tracking-wide heading-font">
                  {card.title}
                </h4>
                <p className="text-stone-500 text-xs sm:text-sm font-sans max-w-[220px]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. "How it works" Section */}
      <section className="py-16 md:py-20 bg-[#F7F5F0] border-b border-stone-250 text-center">
        <div className="container-custom max-w-5xl px-6">
          <div className="mb-12 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2b5330] block">
              How it works
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold heading-font uppercase tracking-wide text-stone-900">
              Three steps to your new home
            </h2>
            <div className="w-12 h-px bg-[#2b5330] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Tell us your needs",
                desc: "Location, budget, flat size and configuration."
              },
              {
                step: "02",
                title: "We match and verify",
                desc: "Our team shortlists verified, RERA-compliant options."
              },
              {
                step: "03",
                title: "Close with support",
                desc: "Legal and financing help through close."
              }
            ].map((item, idx) => (
              <div key={idx} className="space-y-4 text-center">
                <span className="text-4xl sm:text-5xl font-black text-[#2b5330] block leading-none heading-font">
                  {item.step}
                </span>
                <h4 className="font-extrabold text-sm sm:text-base text-stone-850 uppercase tracking-wide heading-font">
                  {item.title}
                </h4>
                <p className="text-stone-500 text-xs sm:text-sm font-sans max-w-[200px] mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-16 md:py-20 bg-white border-b border-stone-200 text-center">
        <div className="container-custom max-w-3xl px-6">
          <div className="mb-12 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2b5330] block">
              FAQ
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold heading-font uppercase tracking-wide text-stone-900">
              Common questions
            </h2>
            <div className="w-12 h-px bg-[#2b5330] mx-auto mt-3" />
          </div>

          <div className="max-w-[520px] mx-auto text-left border-t border-stone-200 divide-y divide-stone-200">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-stone-800 uppercase tracking-wide heading-font bg-transparent border-none cursor-pointer py-2 focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown 
                      size={16} 
                      className={`text-[#2b5330] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-2 text-xs sm:text-sm text-stone-500 leading-relaxed font-sans pb-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Contact / Enquiry Form Section */}
      <section id="enquiry-form" className="py-16 md:py-20 bg-[#f4f7f2] text-center">
        <div className="container-custom max-w-3xl px-6">
          <div className="mb-10 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2b5330] block">
              Get in touch
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold heading-font uppercase tracking-wide text-stone-900">
              Tell us what home you're looking for
            </h2>
            <div className="w-12 h-px bg-[#2b5330] mx-auto mt-3" />
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl shadow-md p-6 sm:p-8 max-w-[420px] mx-auto">
            {formSubmitted ? (
              <div className="space-y-4 py-6">
                <span className="text-3xl">✉️</span>
                <h3 className="text-base font-extrabold text-[#2b5330] uppercase tracking-wide heading-font">
                  Enquiry Registered
                </h3>
                <p className="text-stone-500 text-xs leading-relaxed font-sans">
                  Thank you! Your requirements have been logged in our database. A BuildBharat verified representative will call you once onboarding matching listings begin.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-bold text-[#2b5330] underline hover:text-[#203f25] bg-transparent border-none cursor-pointer mt-4"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
                {/* Full name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 outline-none focus:border-[#2b5330] transition-colors"
                  />
                </div>

                {/* Phone or email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Phone or Email</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter phone number or email address"
                    value={formData.contactInfo}
                    onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 outline-none focus:border-[#2b5330] transition-colors"
                  />
                </div>

                {/* Preferred location */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Preferred Location</label>
                  <select
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none focus:border-[#2b5330] transition-colors"
                  >
                    {activeCities.map((city, idx) => (
                      <option key={idx} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Configuration */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Configuration</label>
                  <select
                    value={formData.configuration}
                    onChange={(e) => setFormData({ ...formData, configuration: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 outline-none focus:border-[#2b5330] transition-colors"
                  >
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4+ BHK">4+ BHK</option>
                    <option value="Plot">Plot</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                {/* Requirements */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">What are you looking for?</label>
                  <textarea
                    rows={3}
                    placeholder="Describe layout preferences, flat size configurations, or specific building parameters..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 outline-none focus:border-[#2b5330] transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full h-11 bg-[#2b5330] hover:bg-[#203f25] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer border-none mt-2"
                >
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};
