import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, X, ArrowRight, CheckCircle2, HelpCircle, ShieldCheck, Sun, Coins, Building2, GraduationCap } from 'lucide-react';
import { PILLAR_CATEGORIES, matchQueryToPillar } from '../data/ecosystemData';
import { Globe } from './ui/globe';

interface HeroDiscoveryProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  onSelectCategory: (catId: string) => void;
  onNavigate: (path: string) => void;
  onOpenPartnerModal?: () => void;
}

// Cubic ease-out counter animation component
const AnimatedCounter: React.FC<{
  targetValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  trigger: boolean;
}> = ({ targetValue, prefix = '', suffix = '', decimals = 0, trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    const duration = 2200; // 2.2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);

      // Cubic ease-out: f(t) = 1 - (1-t)^3
      const easeOutRatio = 1 - Math.pow(1 - progressRatio, 3);

      setCount(easeOutRatio * targetValue);

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [trigger, targetValue]);

  return (
    <span>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const HeroDiscovery: React.FC<HeroDiscoveryProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  onSelectCategory,
  onNavigate,
  onOpenPartnerModal
}) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [matchResult, setMatchResult] = useState<ReturnType<typeof matchQueryToPillar>>({
    matchedCategory: null,
    confidence: 0,
    matchedKeywords: [],
    isExactMatch: false
  });

  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Rooftop solar solar arrays',
    'MSME project debt financing',
    'LEED commercial IT parks'
  ]);

  const trendingQueries = [
    { query: 'BuildBharat Solar panels', category: 'solar' },
    { query: 'BuildBharat Loans capital', category: 'loans' },
    { query: 'BuildBharat Real Estate IT parks', category: 'real-estate' },
    { query: 'EduTech career bootcamps', category: 'education' }
  ];

  const dropdownRef = useRef<HTMLDivElement>(null);
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      const res = matchQueryToPillar(searchQuery);
      setMatchResult(res);
      if (res.matchedCategory) {
        onSelectCategory(res.matchedCategory.id);
      }
    } else {
      setMatchResult({
        matchedCategory: null,
        confidence: 0,
        matchedKeywords: [],
        isExactMatch: false
      });
    }
  }, [searchQuery]);

  // Handle outside click to close search popup
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Intersection observer for viewport animated counters trigger
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStatsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSearchSelect = (queryText: string, catId: string) => {
    setSearchQuery(queryText);
    onSelectCategory(catId);
    setSearchFocused(false);

    // Add to recent searches (keep unique, max 3)
    if (!recentSearches.includes(queryText)) {
      setRecentSearches(prev => [queryText, ...prev.slice(0, 2)]);
    }

    // Direct routing to the matching company page
    if (catId === 'solar') {
      onNavigate('/solar');
    } else if (catId === 'loans') {
      onNavigate('/loans');
    } else if (catId === 'real-estate') {
      onNavigate('/real-estate');
    } else if (catId === 'education') {
      onNavigate('/education');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const res = matchQueryToPillar(searchQuery);
      if (res.matchedCategory) {
        const catId = res.matchedCategory.id;
        if (catId === 'solar') {
          onNavigate('/solar');
        } else if (catId === 'loans') {
          onNavigate('/loans');
        } else if (catId === 'real-estate') {
          onNavigate('/real-estate');
        } else if (catId === 'education') {
          onNavigate('/education');
        }
        setSearchFocused(false);
      }
    }
  };

  const scrollToPathways = () => {
    const el = document.getElementById('pathways');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = Object.values(PILLAR_CATEGORIES);

  // Filter suggested items based on user query
  const autocompleteSuggestions = searchQuery.trim()
    ? categories.filter(c =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.intentKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    : [];

  return (
    <section id="discovery" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-grid-pattern bg-[var(--bg-dark)] bg-grainy border-b border-white/10">
      {/* Subtle Glow background blob */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-[#A5CEE0]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* Two-Column Responsive Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center text-left">

          {/* Left Side: Copywriting & Search Action (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-1">

            {/* Simplified Hero Heading & Brand Intro */}
            <div className="space-y-4 text-left">
              <img
                src="/build-bharat-logo.png"
                alt="Build Bharat Synergy Partners Logo"
                className="h-16 sm:h-24 w-auto object-contain object-left mb-2 hover:scale-105 transition-all duration-700 ease-out drop-shadow-md"
              />

              {/* Mobile/Tablet 3D Globe (Shown right below Logo on Mobile screens) */}
              <div className="block lg:hidden relative my-4 w-full">
                <div className="absolute inset-0 max-w-[280px] sm:max-w-[380px] max-h-[380px] m-auto bg-gradient-to-tr from-[#A5CEE0]/20 via-[#10367D]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="relative w-full max-w-[260px] sm:max-w-[360px] mx-auto aspect-square flex items-center justify-center">
                  <Globe className="w-full h-full" />
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl sm:whitespace-nowrap font-extrabold text-[#10367D] tracking-tight leading-tight heading-font">
                &ldquo;What are you looking for?&rdquo;
              </h1>
            </div>

            {/* Interactive Search Autocomplete Box */}
            <div className="relative max-w-xl z-30" ref={dropdownRef}>
              <form
                onSubmit={handleFormSubmit}
                className="discovery-wrapper flex items-center px-5 py-4 rounded-full border transition-all duration-300"
              >
                <Search className="text-[#10367D] mr-3 shrink-0" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="e.g. 'I want to install solar panels' or 'I need a business loan'..."
                  className="w-full bg-transparent border-none outline-none text-[#10367D] text-sm sm:text-base placeholder-[#10367D]/45 font-medium"
                  aria-label="Natural language search input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      onSelectCategory('all');
                    }}
                    className="text-slate-500 hover:text-[#10367D] bg-transparent border-none cursor-pointer p-1"
                    aria-label="Clear input"
                  >
                    <X size={16} />
                  </button>
                )}
              </form>
              <div className="mt-2 text-xs text-stone-750 font-semibold pl-4 text-left">
                Tell us what you need — we'll connect you with a verified partner.
              </div>

              {/* Autocomplete & Matching Popover Panel */}
              {searchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#FFFFFF] border border-[#10367D]/10 p-5 shadow-2xl animate-fadeIn text-left z-50 rounded-2xl glass-panel shadow-lg">

                  {/* Matching Results (If typing) */}
                  {searchQuery.trim() !== '' ? (
                    <div className="space-y-3">
                      <span className="text-[8px] font-bold text-[#10367D] uppercase tracking-widest block subheading-font">
                        Ecosystem Matches
                      </span>
                      {autocompleteSuggestions.length > 0 ? (
                        <div className="space-y-2">
                          {autocompleteSuggestions.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => handleSearchSelect(cat.title.split('/')[0], cat.id)}
                              className="w-full text-left p-2.5 bg-slate-50 hover:bg-[#A5CEE0]/15 border border-slate-100 hover:border-[#10367D]/20 transition-all flex items-center justify-between cursor-pointer rounded-xl text-[#10367D] shadow-sm"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{cat.emoji}</span>
                                <div>
                                  <span className="font-bold text-xs text-[#10367D] block">{cat.title}</span>
                                  <span className="text-[10px] text-slate-500 block">{cat.subtitle}</span>
                                </div>
                              </div>
                              <ArrowRight size={12} className="text-[#10367D]" />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 py-2 flex items-center gap-2 bg-slate-100 p-3 border border-slate-200 rounded-xl">
                          <HelpCircle size={14} className="text-[#10367D]" />
                          <span>No direct match. Hit enter to parse query or select a category below.</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Default Dropdown Suggestions (When empty) */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* Left Side: Trending Searches */}
                      <div className="space-y-3">
                        <span className="text-[8px] font-bold text-[#10367D] uppercase tracking-widest block subheading-font">
                          Trending Searches
                        </span>
                        <div className="space-y-1.5">
                          {trendingQueries.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSearchSelect(item.query, item.category)}
                              className="w-full text-left hover:text-[#10367D] text-slate-500 text-xs flex items-center gap-1.5 bg-transparent border-none cursor-pointer py-1"
                            >
                              <Sparkles size={11} className="text-[#10367D] shrink-0" />
                              <span className="truncate">"{item.query}"</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Right Side: Recent Searches */}
                      <div className="space-y-3">
                        <span className="text-[8px] font-bold text-[#10367D] uppercase tracking-widest block subheading-font">
                          Recent Searches
                        </span>
                        {recentSearches.length > 0 ? (
                          <div className="space-y-1.5">
                            {recentSearches.map((term, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  const matched = categories.find(c => c.intentKeywords.some(k => term.toLowerCase().includes(k))) || categories[0];
                                  handleSearchSelect(term, matched.id);
                                }}
                                className="w-full text-left hover:text-[#10367D] text-slate-500 text-xs flex items-center justify-between bg-transparent border-none cursor-pointer py-1"
                              >
                                <span className="truncate">"{term}"</span>
                                <span className="text-[9px] text-slate-400">Search again</span>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic block">No recent searches</span>
                        )}
                      </div>

                    </div>
                  )}

                  {/* Quick Smart Categories row inside dropdown footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                    <span className="text-[8px] font-bold text-[#10367D] uppercase tracking-widest block mr-2 subheading-font">
                      Or Filter:
                    </span>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleSearchSelect(cat.title.split('/')[0], cat.id)}
                        className="text-[10px] font-bold bg-slate-50 hover:bg-[#A5CEE0]/15 border border-slate-250 px-2.5 py-1 text-[#10367D] uppercase tracking-wider transition-all cursor-pointer rounded shadow-sm"
                      >
                        {cat.emoji} {cat.title.split('/')[0]}
                      </button>
                    ))}
                  </div>

                </div>
              )}
            </div>

            {/* Quick Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenPartnerModal}
                className="btn-gold flex items-center gap-2 px-7 py-3.5 rounded-full cursor-pointer text-xs uppercase tracking-wider font-bold shadow-lg animate-pulse"
              >
                <span>Partner With Us</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => handleSearchSelect('I want to install solar panels', 'solar')}
                className="bg-transparent hover:bg-[#10367D]/5 text-[#10367D] border border-[#10367D]/25 flex items-center gap-1.5 px-6 py-3.5 rounded-full cursor-pointer text-xs uppercase tracking-wider font-bold transition-all"
              >
                <span>Try Example Search</span>
              </button>
            </div>

          </div>

          {/* Right Side: Interactive 3D Globe (Desktop only) */}
          <div className="hidden lg:flex lg:col-span-6 relative items-center justify-center min-h-[520px] lg:min-h-[620px] overflow-visible">
            {/* Ambient Radial Glow around Globe */}
            <div className="absolute inset-0 max-w-[480px] max-h-[480px] m-auto bg-gradient-to-tr from-[#A5CEE0]/20 via-[#10367D]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-[620px] aspect-square flex items-center justify-center">
              <Globe className="w-full h-full" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
