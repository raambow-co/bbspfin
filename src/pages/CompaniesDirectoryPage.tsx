import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, ShieldCheck, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { ALL_COMPANIES, REGIONAL_HUBS } from '../data/ecosystemData';
 
interface CompaniesDirectoryPageProps {
  onNavigate: (path: string) => void;
  onOpenPartnerModal: () => void;
}
 
export const CompaniesDirectoryPage: React.FC<CompaniesDirectoryPageProps> = ({
  onNavigate,
  onOpenPartnerModal
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVerification, setSelectedVerification] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
 
  // Handle filters logic client-side
  const filteredCompanies = ALL_COMPANIES.filter(company => {
    const matchesRegion = selectedRegion === 'all' || company.region === selectedRegion;
    const matchesCategory = selectedCategory === 'all' || company.category === selectedCategory;
    const matchesVerification = selectedVerification === 'all' || 
      (selectedVerification === 'verified' && company.verified) ||
      (selectedVerification === 'pending' && !company.verified);
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      company.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
 
    return matchesRegion && matchesCategory && matchesVerification && matchesSearch;
  });
 
  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'telangana', name: 'Telangana' },
    { id: 'andhra-pradesh', name: 'Andhra Pradesh' },
    { id: 'karnataka', name: 'Karnataka' },
    { id: 'goa', name: 'Goa' },
    { id: 'tamil-nadu', name: 'Tamil Nadu' }
  ];
 
  const categories = [
    { id: 'all', name: 'All Verticals' },
    { id: 'solar', name: 'Solar' },
    { id: 'loans', name: 'Capital Loans' },
    { id: 'real-estate', name: 'Real Estate' },
    { id: 'education', name: 'EdTech' }
  ];
 
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
            <span>Ecosystem Directory Portal</span>
          </div>
        </div>
      </div>
 
      {/* Hero Header */}
      <section className="bg-stone-100 border-b border-stone-200 py-12 relative overflow-hidden">
        <div className="container-custom relative z-10 max-w-5xl">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#D57530] bg-[#D57530]/5 px-3 py-1 rounded-full border border-[#D57530]/10 inline-block mb-3">
            Verified Partners Database
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 heading-font tracking-tight uppercase">
            Browse Synergy Partners
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Search, filter, and audit verified enterprises operating across India's Solar, Financial Loans, Real Estate, and Vocational Skill training sectors.
          </p>
        </div>
      </section>
 
      {/* Directory & Filters Layout */}
      <section className="py-12 bg-[#FFFFFF] border-b border-stone-200">
        <div className="container-custom max-w-5xl">
          
          {/* Filter Toolbar */}
          <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl mb-8 flex flex-col md:flex-row items-stretch md:items-center gap-4 shadow-sm">
            <div className="flex-grow flex items-center bg-white border border-stone-200 rounded-xl px-4 py-2 text-stone-900">
              <Search className="text-stone-400 mr-2 shrink-0" size={16} />
              <input
                type="text"
                placeholder="Search partner name or tagline..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-medium text-stone-800 placeholder-stone-400"
              />
            </div>
 
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Region Filter */}
              <div className="flex flex-col">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="bg-white border border-stone-200 text-stone-800 rounded-xl text-xs px-3.5 py-2.5 font-bold uppercase tracking-wider outline-none focus:border-[#D57530]"
                >
                  {regions.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
 
              {/* Category Filter */}
              <div className="flex flex-col">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-stone-200 text-stone-800 rounded-xl text-xs px-3.5 py-2.5 font-bold uppercase tracking-wider outline-none focus:border-[#D57530]"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
 
              {/* Verification Filter */}
              <div className="flex flex-col">
                <select
                  value={selectedVerification}
                  onChange={(e) => setSelectedVerification(e.target.value)}
                  className="bg-white border border-stone-200 text-stone-800 rounded-xl text-xs px-3.5 py-2.5 font-bold uppercase tracking-wider outline-none focus:border-[#D57530]"
                >
                  <option value="all">All Verification</option>
                  <option value="verified">Verified Only</option>
                  <option value="pending">Pending Audit</option>
                </select>
              </div>
            </div>
          </div>
 
          {/* Partner Grid Cards */}
          {filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCompanies.map((company) => {
                const regionName = REGIONAL_HUBS.find(h => h.id === company.region)?.state || company.region;
                return (
                  <div 
                    key={company.id}
                    className="border border-stone-200 p-6 rounded-2xl bg-white hover:border-stone-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="px-3.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-center font-bold text-xs uppercase tracking-wide text-stone-900 font-sans shadow-sm select-none">
                          {company.category.split('-')[0].toUpperCase()}
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck size={14} className={company.verified ? "text-[#D57530]" : "text-stone-400"} />
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${company.verified ? 'text-emerald-700' : 'text-amber-700'}`}>
                            {company.verified ? 'VERIFIED' : 'PENDING'}
                          </span>
                        </div>
                      </div>
 
                      <h3 className="text-xl font-bold text-stone-900 heading-font uppercase tracking-wide mb-1">
                        {company.name}
                      </h3>
                      <p className="text-stone-500 text-xs italic font-sans mb-3">
                        "{company.tagline}"
                      </p>
                      <p className="text-stone-650 text-xs sm:text-sm leading-relaxed font-sans font-normal mb-5">
                        {company.shortDescription}
                      </p>
                    </div>
 
                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold">
                      <span className="flex items-center gap-1 text-stone-500 text-[10px] uppercase font-bold tracking-wider">
                        <MapPin size={12} className="text-[#D57530]" /> {regionName}
                      </span>
                      
                      <button
                        onClick={() => onNavigate(`/companies/${company.id}`)}
                        className="bg-[#10367D]/10 hover:bg-[#10367D]/20 text-[#10367D] px-4 py-2 rounded-full flex items-center gap-1 uppercase text-[10px] font-extrabold tracking-wider transition-colors cursor-pointer"
                      >
                        <span>View Profile</span>
                        <ArrowRight size={10} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-stone-50 border border-stone-200 rounded-2xl">
              <span className="text-3xl block mb-2">🔍</span>
              <h3 className="font-bold text-lg text-stone-900 heading-font uppercase tracking-wide">No Partners Match</h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto leading-relaxed">
                Adjust your filters or query to find active Solar, Finance, Real Estate, or EdTech synergy partners.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default CompaniesDirectoryPage;
