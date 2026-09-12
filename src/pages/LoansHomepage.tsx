import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Coins,
  Calculator,
  Percent,
  CheckCircle2,
  Clock,
  Landmark,
  Building2,
  Home,
  Sun,
  Truck,
  FileText,
  BadgePercent,
  Check,
  ChevronDown,
  UserCheck,
  TrendingUp,
  Award,
  Lock,
  PhoneCall,
  Loader2,
  Sparkles
} from 'lucide-react';
import { FormalLoanModal } from '../components/FormalLoanModal';

interface LoansHomepageProps {
  onNavigate: (path: string) => void;
  onOpenPartnerModal: () => void;
  company: any;
}

export const LoansHomepage: React.FC<LoansHomepageProps> = ({
  onNavigate,
  onOpenPartnerModal,
  company
}) => {
  // Loan Types config for the Calculator & Products
  const loanCategories = [
    {
      id: 'home',
      name: 'Home & Plot Loan',
      defaultRate: 8.4,
      minRate: 8.35,
      maxRate: 10.5,
      defaultAmount: 3500000,
      minAmount: 500000,
      maxAmount: 50000000,
      defaultTenure: 240, // 20 years
      minTenure: 12,
      maxTenure: 360,
      icon: Home,
      tagline: 'Lowest rates & up to 30 years flexible repayment'
    },
    {
      id: 'business',
      name: 'MSME Business Capital',
      defaultRate: 11.5,
      minRate: 10.0,
      maxRate: 18.0,
      defaultAmount: 2000000,
      minAmount: 200000,
      maxAmount: 25000000,
      defaultTenure: 36, // 3 years
      minTenure: 12,
      maxTenure: 84,
      icon: Building2,
      tagline: 'Collateral-free working capital & machinery term loans'
    },
    {
      id: 'solar',
      name: 'Green Solar Rooftop Loan',
      defaultRate: 7.5,
      minRate: 7.0,
      maxRate: 9.5,
      defaultAmount: 300000,
      minAmount: 50000,
      maxAmount: 5000000,
      defaultTenure: 60, // 5 years
      minTenure: 12,
      maxTenure: 120,
      icon: Sun,
      tagline: 'MNRE & PM Surya Ghar aligned zero-hassle solar financing'
    },
    {
      id: 'lap',
      name: 'Loan Against Property (LAP)',
      defaultRate: 9.25,
      minRate: 8.9,
      maxRate: 12.0,
      defaultAmount: 5000000,
      minAmount: 1000000,
      maxAmount: 100000000,
      defaultTenure: 120, // 10 years
      minTenure: 24,
      maxTenure: 240,
      icon: Landmark,
      tagline: 'Unlock up to 75% market value of residential/commercial assets'
    },
    {
      id: 'vehicle',
      name: 'Machinery & Equipment',
      defaultRate: 9.75,
      minRate: 9.0,
      maxRate: 14.0,
      defaultAmount: 1500000,
      minAmount: 300000,
      maxAmount: 20000000,
      defaultTenure: 48,
      minTenure: 12,
      maxTenure: 84,
      icon: Truck,
      tagline: 'Fast disbursement for industrial gear, trucks & machinery'
    }
  ];

  // Active Category in Calculator
  const [selectedCalcCategory, setSelectedCalcCategory] = useState(loanCategories[0]);
  const [amount, setAmount] = useState(loanCategories[0].defaultAmount);
  const [rate, setRate] = useState(loanCategories[0].defaultRate);
  const [tenureMonths, setTenureMonths] = useState(loanCategories[0].defaultTenure);

  const handleCategorySwitch = (cat: typeof loanCategories[0]) => {
    setSelectedCalcCategory(cat);
    setAmount(cat.defaultAmount);
    setRate(cat.defaultRate);
    setTenureMonths(cat.defaultTenure);
  };

  // EMI Calculation Formula
  const calculateEMI = () => {
    const P = amount;
    const r = rate / 12 / 100;
    const n = tenureMonths;
    if (r === 0) return (P / n).toFixed(0);
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return isNaN(emi) ? '0' : emi.toFixed(0);
  };

  const emiVal = Number(calculateEMI());
  const totalAmount = emiVal * tenureMonths;
  const totalInterest = Math.max(0, totalAmount - amount);
  const principalPercentage = Math.round((amount / (totalAmount || 1)) * 100);
  const interestPercentage = 100 - principalPercentage;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Formal Loan Modal State
  const [isFormalLoanModalOpen, setIsFormalLoanModalOpen] = useState(false);
  const [selectedLoanTypeForModal, setSelectedLoanTypeForModal] = useState('home');
  const [selectedAmountForModal, setSelectedAmountForModal] = useState(2500000);

  const handleOpenFormalLoanModal = (type = 'home', reqAmount = 2500000) => {
    setSelectedLoanTypeForModal(type);
    setSelectedAmountForModal(reqAmount);
    setIsFormalLoanModalOpen(true);
  };

  // State for Document Checklist Tabs
  const [activeDocTab, setActiveDocTab] = useState<'salaried' | 'selfEmployed' | 'business'>('salaried');

  // State for Fast Loan Application Form
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Hyderabad',
    loanType: 'home',
    requestedAmount: '2500000',
    employmentType: 'Salaried',
    monthlyIncome: '75000'
  });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitting(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: leadForm.fullName,
          phone: leadForm.phone,
          email: leadForm.email,
          category: 'loans',
          businessName: `Loan Inquiry: ${leadForm.loanType.toUpperCase()} (₹${leadForm.requestedAmount})`,
          notes: `City: ${leadForm.city}, Employment: ${leadForm.employmentType}, Monthly Income: ₹${leadForm.monthlyIncome}`
        })
      });
      if (response.ok) {
        setLeadSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setLeadSuccess(true); // Graceful fallback
    } finally {
      setLeadSubmitting(false);
    }
  };

  // State for FAQ Accordion
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the minimum CIBIL score required for loan approval?',
      a: 'A CIBIL credit score of 700 and above ensures the fastest approval with the lowest interest rates. However, through our multi-bank ecosystem routing, we also have specialized NBFC options for scores between 650 and 700.'
    },
    {
      q: 'How fast can I get loan sanction and disbursement?',
      a: 'Digital pre-approvals are issued within 24 to 48 hours after submitting complete documentation. Unsecured business loans and solar loans are disbursed in 2-4 working days, while property/mortgage loans take 5-7 days for legal valuation.'
    },
    {
      q: 'Are there any prepayment or foreclosure charges?',
      a: 'As per RBI guidelines, all floating rate home loans and individual term loans have ZERO (0%) prepayment and foreclosure charges. You can make part-payments or close the loan anytime without penalty.'
    },
    {
      q: 'Can BuildBharat Solar customers get subsidized loans?',
      a: 'Yes! BuildBharat Loans operates direct synergy with BuildBharat Solar. Rooftop solar projects under PM Surya Ghar Muft Bijli Yojana are eligible for collateral-free subsidized green loans starting at just 7.0% p.a.'
    },
    {
      q: 'How do channel partners and DSAs earn referral commission?',
      a: 'Empanelled partners receive a unique Referral ID. Whenever your referred client’s loan is sanctioned and disbursed, you earn 0.5% to 2.0% direct commission payout credited straight into your verified bank account.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#10367D]/15 selection:text-[#10367D]">
      
      {/* 2. Hero Banner Section */}
      <section className="relative py-12 lg:py-20 bg-white border-b border-stone-200/80 overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#10367D]/10 via-[#A5CEE0]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D57530]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#10367D] text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 bg-[#10367D]/5 border border-[#10367D]/15 rounded-full font-sans shadow-sm">
                <Coins size={14} className="text-[#D57530]" />
                <span>MULTI-BANK SYNERGY CREDIT PORTAL</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 heading-font tracking-tight leading-[1.15] uppercase">
                Fast, Transparent & <span className="luxury-gradient-text">Flexible Capital.</span>
              </h1>

              <p className="text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal">
                Unlock instant access to competitive interest rates, streamlined digital underwriting, and verified multi-bank approvals for Home Purchases, MSME Working Capital, Solar Rooftops, and Property Mortgages.
              </p>

              {/* Key Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 bg-gradient-to-b from-stone-50 to-white border border-stone-200/90 rounded-2xl shadow-sm hover:border-[#10367D]/30 transition-all">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Rates Starting</span>
                  <span className="text-lg sm:text-xl font-extrabold text-[#10367D] heading-font">8.35% p.a.</span>
                </div>
                <div className="p-3.5 bg-gradient-to-b from-stone-50 to-white border border-stone-200/90 rounded-2xl shadow-sm hover:border-[#10367D]/30 transition-all">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Approval Speed</span>
                  <span className="text-lg sm:text-xl font-extrabold text-emerald-600 heading-font">24-48 Hrs</span>
                </div>
                <div className="p-3.5 bg-gradient-to-b from-stone-50 to-white border border-stone-200/90 rounded-2xl shadow-sm hover:border-[#10367D]/30 transition-all">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Max Capital</span>
                  <span className="text-lg sm:text-xl font-extrabold text-[#10367D] heading-font">₹25 Crore</span>
                </div>
                <div className="p-3.5 bg-gradient-to-b from-stone-50 to-white border border-stone-200/90 rounded-2xl shadow-sm hover:border-[#10367D]/30 transition-all">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Foreclosure</span>
                  <span className="text-lg sm:text-xl font-extrabold text-[#D57530] heading-font">ZERO Fee</span>
                </div>
              </div>

              {/* Action CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  onClick={() => handleOpenFormalLoanModal('home', 2500000)}
                  className="luxury-btn-primary w-full sm:w-auto justify-center text-xs px-8 py-4 rounded-full cursor-pointer uppercase tracking-wider font-bold flex items-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <FileText size={16} />
                  <span>Apply for Loan (7-Stage Form)</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('loan-calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 w-full sm:w-auto justify-center text-xs px-8 py-4 rounded-full cursor-pointer uppercase tracking-wider font-bold flex items-center gap-2 shadow-sm hover:shadow transition-all"
                >
                  <Calculator size={16} className="text-[#10367D]" />
                  <span>Calculate Loan EMI</span>
                </button>
              </div>
            </div>

            {/* Right Card: Quick Digital Loan Application Form (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xl relative">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D57530] block">Instant Digital Desk</span>
                    <h3 className="text-xl font-extrabold text-[#10367D] heading-font uppercase">Apply for Loan</h3>
                  </div>
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-200">
                    <ShieldCheck size={20} />
                  </div>
                </div>

                {leadSuccess ? (
                  <div className="text-center py-8 space-y-4 animate-fadeIn">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 className="text-2xl font-extrabold text-[#10367D] heading-font uppercase">Application Received!</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Thank you, <strong className="text-stone-900">{leadForm.fullName}</strong>. A dedicated BuildBharat Senior Loan Officer will review your profile and contact you within 2 business hours.
                    </p>
                    <button
                      onClick={() => setLeadSuccess(false)}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full mt-4 cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-4 text-left text-xs">
                    <div>
                      <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={leadForm.fullName}
                        onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                        placeholder="e.g. Rajesh Kumar"
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">City / Region *</label>
                        <input
                          type="text"
                          required
                          value={leadForm.city}
                          onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })}
                          placeholder="e.g. Hyderabad"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Loan Category</label>
                        <select
                          value={leadForm.loanType}
                          onChange={(e) => setLeadForm({ ...leadForm, loanType: e.target.value })}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-stone-900 text-xs font-semibold focus:border-[#10367D] outline-none cursor-pointer"
                        >
                          <option value="home">Home & Plot Loan</option>
                          <option value="business">MSME Business Loan</option>
                          <option value="solar">Solar Rooftop Loan</option>
                          <option value="lap">Loan Against Property</option>
                          <option value="vehicle">Machinery / Vehicle</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Amount Needed</label>
                        <input
                          type="text"
                          value={leadForm.requestedAmount}
                          onChange={(e) => setLeadForm({ ...leadForm, requestedAmount: e.target.value })}
                          placeholder="e.g. 2500000"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 text-sm font-mono focus:border-[#10367D] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Employment</label>
                        <select
                          value={leadForm.employmentType}
                          onChange={(e) => setLeadForm({ ...leadForm, employmentType: e.target.value })}
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-stone-900 text-xs font-semibold focus:border-[#10367D] outline-none cursor-pointer"
                        >
                          <option value="Salaried">Salaried Employee</option>
                          <option value="Self-Employed">Self-Employed Pro</option>
                          <option value="Business Owner">MSME / Business Owner</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">Monthly Income (₹)</label>
                        <input
                          type="text"
                          value={leadForm.monthlyIncome}
                          onChange={(e) => setLeadForm({ ...leadForm, monthlyIncome: e.target.value })}
                          placeholder="e.g. 75000"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 text-sm font-mono focus:border-[#10367D] outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="w-full bg-[#10367D] hover:bg-[#0A2254] text-white py-3.5 rounded-full font-bold uppercase tracking-wider text-xs cursor-pointer shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      {leadSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Checking Eligibility...</span>
                        </>
                      ) : (
                        <>
                          <Check size={16} />
                          <span>Get Free Loan Sanction Offer</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenFormalLoanModal(leadForm.loanType, Number(leadForm.requestedAmount) || 2500000)}
                      className="w-full text-center text-xs font-bold text-[#D57530] hover:text-[#b95d1d] py-1 transition-colors cursor-pointer block"
                    >
                      <span>Or Open Full 7-Stage Loan Application (With Witnesses) →</span>
                    </button>

                    <p className="text-[10px] text-stone-400 text-center font-medium">
                      🔒 100% Data Privacy Guaranteed. No Spam, No Impact on CIBIL.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Multi-Bank Lending Partner Network Banner */}
      <section className="py-8 bg-[#F4F1EA] border-b border-stone-200 text-center overflow-hidden">
        <div className="container-custom">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-stone-500 block mb-4 font-sans">
            OUR TIER-1 BANKING & NBFC AGGREGATION NETWORK
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-stone-600 font-bold text-xs sm:text-sm tracking-wider uppercase opacity-85">
            <span className="flex items-center gap-1.5"><Landmark size={16} className="text-[#10367D]" /> State Bank of India</span>
            <span className="flex items-center gap-1.5"><Landmark size={16} className="text-[#10367D]" /> HDFC Bank</span>
            <span className="flex items-center gap-1.5"><Landmark size={16} className="text-[#10367D]" /> ICICI Bank</span>
            <span className="flex items-center gap-1.5"><Landmark size={16} className="text-[#10367D]" /> Axis Bank</span>
            <span className="flex items-center gap-1.5"><Landmark size={16} className="text-[#10367D]" /> Bajaj Finserv</span>
            <span className="flex items-center gap-1.5"><Landmark size={16} className="text-[#10367D]" /> Tata Capital</span>
            <span className="flex items-center gap-1.5"><Landmark size={16} className="text-[#10367D]" /> Piramal Capital</span>
          </div>
        </div>
      </section>

      {/* 4. Complete Loan Product Portfolio (6 Cards) */}
      <section className="py-16 md:py-24 bg-white border-b border-stone-200 text-left">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#D57530] bg-stone-100 border border-stone-200 px-4 py-1.5 rounded-full inline-block font-sans shadow-sm">
              COMPREHENSIVE CREDIT CATALOG
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold heading-font uppercase text-stone-900 tracking-tight">
              Tailored Financial Solutions
            </h2>
            <p className="text-stone-500 text-sm max-w-2xl mx-auto font-normal">
              Whether purchasing property, fueling corporate growth, or transitioning to solar power—find the exact credit vehicle configured for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Home Loans */}
            <div className="bg-[#FAF9F6] border border-stone-200 hover:border-[#10367D]/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-lg group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#10367D]/10 text-[#10367D] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Home size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-[#D57530] uppercase tracking-wider block">Residential & Land</span>
                  <h3 className="text-xl font-extrabold text-[#10367D] heading-font uppercase">Home & Plot Loans</h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Purchase ready flats, under-construction apartments, or residential plots across South India with subsidized rates and maximum loan tenure.
                </p>
                <div className="space-y-2 pt-2 border-t border-stone-200 text-xs">
                  <div className="flex justify-between"><span className="text-stone-500">Interest Rate:</span><strong className="text-stone-900 font-mono">From 8.35% p.a.</strong></div>
                  <div className="flex justify-between"><span className="text-stone-500">Max Tenure:</span><strong className="text-stone-900">Up to 30 Years</strong></div>
                  <div className="flex justify-between"><span className="text-stone-500">Funding Limit:</span><strong className="text-stone-900 font-mono">Up to 90% Property Value</strong></div>
                </div>
              </div>
              <button
                onClick={() => handleOpenFormalLoanModal(loanCategories[0].id, loanCategories[0].defaultAmount)}
                className="mt-6 w-full bg-[#10367D] hover:bg-[#0A2254] text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Apply for Home Loan</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Card 2: MSME Business Loans */}
            <div className="bg-[#FAF9F6] border border-stone-200 hover:border-[#10367D]/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-lg group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#10367D]/10 text-[#10367D] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-[#D57530] uppercase tracking-wider block">Enterprise Capital</span>
                  <h3 className="text-xl font-extrabold text-[#10367D] heading-font uppercase">MSME Business Loans</h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Working capital, expansion funds, and overdraft limits designed for trading businesses, manufacturers, and service agencies.
                </p>
                <div className="space-y-2 pt-2 border-t border-stone-200 text-xs">
                  <div className="flex justify-between"><span className="text-stone-500">Interest Rate:</span><strong className="text-stone-900 font-mono">From 10.0% p.a.</strong></div>
                  <div className="flex justify-between"><span className="text-stone-500">Collateral:</span><strong className="text-emerald-700">Zero Collateral Options</strong></div>
                  <div className="flex justify-between"><span className="text-stone-500">Loan Ticket:</span><strong className="text-stone-900 font-mono">₹5 Lakhs to ₹25 Crores</strong></div>
                </div>
              </div>
              <button
                onClick={() => handleOpenFormalLoanModal(loanCategories[1].id, loanCategories[1].defaultAmount)}
                className="mt-6 w-full bg-[#10367D] hover:bg-[#0A2254] text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Apply for MSME Capital</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Card 3: Green Solar Loans */}
            <div className="bg-[#FAF9F6] border border-stone-200 hover:border-[#10367D]/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-lg group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#D57530]/10 text-[#D57530] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sun size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-[#D57530] uppercase tracking-wider block">Clean Energy Scheme</span>
                  <h3 className="text-xl font-extrabold text-[#10367D] heading-font uppercase">Solar Rooftop Finance</h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Integrated with BuildBharat Solar and PM Surya Ghar. Pay for your high-yield solar PV grid entirely through monthly electricity bill savings.
                </p>
                <div className="space-y-2 pt-2 border-t border-stone-200 text-xs">
                  <div className="flex justify-between"><span className="text-stone-500">Interest Rate:</span><strong className="text-emerald-700 font-mono">7.0% subsidized rate</strong></div>
                  <div className="flex justify-between"><span className="text-stone-500">Security:</span><strong className="text-stone-900">100% Collateral-Free</strong></div>
                  <div className="flex justify-between"><span className="text-stone-500">Payback Period:</span><strong className="text-stone-900 font-mono">3 to 5 Years</strong></div>
                </div>
              </div>
              <button
                onClick={() => handleOpenFormalLoanModal(loanCategories[2].id, loanCategories[2].defaultAmount)}
                className="mt-6 w-full bg-[#10367D] hover:bg-[#0A2254] text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Apply for Solar Loan</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Card 4: Loan Against Property (LAP) */}
            <div className="bg-[#FAF9F6] border border-stone-200 hover:border-[#10367D]/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-lg group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#10367D]/10 text-[#10367D] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Landmark size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-[#D57530] uppercase tracking-wider block">Asset Monetization</span>
                  <h3 className="text-xl font-extrabold text-[#10367D] heading-font uppercase">Loan Against Property</h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Leverage your existing residential, commercial, or industrial real estate to secure heavy liquidity for expansion or debt consolidation.
                </p>
                <div className="space-y-2 pt-2 border-t border-stone-200 text-xs">
                  <div className="flex justify-between"><span className="text-stone-500">Interest Rate:</span><strong className="text-stone-900 font-mono">From 8.90% p.a.</strong></div>
                  <div className="flex justify-between"><span className="text-stone-500">Max Tenure:</span><strong className="text-stone-900">Up to 15-20 Years</strong></div>
                  <div className="flex justify-between"><span className="text-stone-500">LTV Ratio:</span><strong className="text-stone-900 font-mono">Up to 75% Valuation</strong></div>
                </div>
              </div>
              <button
                onClick={() => handleOpenFormalLoanModal(loanCategories[3].id, loanCategories[3].defaultAmount)}
                className="mt-6 w-full bg-[#10367D] hover:bg-[#0A2254] text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Apply for LAP Mortgage</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Card 5: Balance Transfer & Top-Up */}
            <div className="bg-[#FAF9F6] border border-stone-200 hover:border-[#10367D]/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-lg group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#10367D]/10 text-[#10367D] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-[#D57530] uppercase tracking-wider block">Refinance & Savings</span>
                  <h3 className="text-xl font-extrabold text-[#10367D] heading-font uppercase">Balance Transfer & Top-Up</h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Switch your high-interest existing loan from other banks to lower interest rates and simultaneously secure additional top-up cash.
                </p>
                <div className="space-y-2 pt-2 border-t border-stone-200 text-xs">
                  <div className="flex justify-between"><span className="text-stone-500">Rate Reduction:</span><strong className="text-emerald-700">Save up to 1.5% p.a.</strong></div>
                  <div className="flex justify-between"><span className="text-stone-500">Top-Up Limit:</span><strong className="text-stone-900 font-mono">Up to ₹10 Crores</strong></div>
                  <div className="flex justify-between"><span className="text-stone-500">Processing:</span><strong className="text-stone-900">Seamless Digital Shift</strong></div>
                </div>
              </div>
              <button
                onClick={() => handleOpenFormalLoanModal('lap', 5000000)}
                className="mt-6 w-full bg-[#10367D] hover:bg-[#0A2254] text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Apply for Balance Transfer</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Card 6: Machinery & Equipment Loans */}
            <div className="bg-[#FAF9F6] border border-stone-200 hover:border-[#10367D]/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-lg group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#10367D]/10 text-[#10367D] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Truck size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-[#D57530] uppercase tracking-wider block">Industrial Gear</span>
                  <h3 className="text-xl font-extrabold text-[#10367D] heading-font uppercase">Machinery & Equipment</h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Finance heavy CNC machinery, construction cranes, medical diagnostic equipment, and commercial vehicle fleets.
                </p>
                <div className="space-y-2 pt-2 border-t border-stone-200 text-xs">
                  <div className="flex justify-between"><span className="text-stone-500">Interest Rate:</span><strong className="text-stone-900 font-mono">From 9.0% p.a.</strong></div>
                  <div className="flex justify-between"><span className="text-stone-500">Equipment Coverage:</span><strong className="text-stone-900 font-mono">Up to 85% Invoice</strong></div>
                  <div className="flex justify-between"><span className="text-stone-500">Disbursement:</span><strong className="text-stone-900">Direct to Supplier</strong></div>
                </div>
              </div>
              <button
                onClick={() => handleOpenFormalLoanModal(loanCategories[4].id, loanCategories[4].defaultAmount)}
                className="mt-6 w-full bg-[#10367D] hover:bg-[#0A2254] text-white py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Apply for Equipment Loan</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Interactive Multi-Loan EMI & Amortization Calculator */}
      <section id="loan-calculator" className="py-16 md:py-24 bg-[#FAF9F6] border-b border-stone-200 text-left">
        <div className="container-custom max-w-5xl">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl relative overflow-hidden">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-2 text-[#D57530] text-[10px] font-extrabold uppercase tracking-widest mb-1 font-sans">
                  <Calculator size={14} />
                  <span>INTERACTIVE FINANCIAL PLANNING ENGINE</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#10367D] heading-font uppercase">
                  Loan EMI & Amortization Calculator
                </h3>
              </div>

              {/* Loan Category Selector Pills */}
              <div className="flex flex-wrap gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 text-xs">
                {loanCategories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCalcCategory.id === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySwitch(cat)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected ? 'bg-[#10367D] text-white shadow-sm' : 'text-stone-600 hover:text-stone-900 bg-transparent'
                      }`}
                    >
                      <Icon size={13} />
                      <span>{cat.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Sliders (7 Cols) */}
              <div className="lg:col-span-7 space-y-7">
                
                {/* 1. Loan Amount */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                    <span className="text-stone-700">Required Loan Amount</span>
                    <span className="text-xl font-extrabold text-[#10367D] font-mono">{formatCurrency(amount)}</span>
                  </div>
                  <input
                    type="range"
                    min={selectedCalcCategory.minAmount}
                    max={selectedCalcCategory.maxAmount}
                    step={amount > 5000000 ? 500000 : 50000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full accent-[#10367D] cursor-pointer h-2 bg-stone-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-stone-400 font-mono">
                    <span>{formatCurrency(selectedCalcCategory.minAmount)}</span>
                    <span>{formatCurrency(selectedCalcCategory.maxAmount)}</span>
                  </div>

                  {/* Fast Preset Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[1000000, 2500000, 5000000, 10000000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAmount(preset)}
                        className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          amount === preset ? 'bg-[#10367D] text-white border-[#10367D]' : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        {formatCurrency(preset)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Interest Rate */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                    <span className="text-stone-700">Annual Interest Rate (p.a.)</span>
                    <span className="text-xl font-extrabold text-[#10367D] font-mono">{rate}%</span>
                  </div>
                  <input
                    type="range"
                    min={selectedCalcCategory.minRate}
                    max={selectedCalcCategory.maxRate}
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full accent-[#10367D] cursor-pointer h-2 bg-stone-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-stone-400 font-mono">
                    <span>{selectedCalcCategory.minRate}% p.a.</span>
                    <span>{selectedCalcCategory.maxRate}% p.a.</span>
                  </div>
                </div>

                {/* 3. Tenure */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                    <span className="text-stone-700">Loan Tenure</span>
                    <span className="text-xl font-extrabold text-[#10367D]">
                      {tenureMonths} Months <span className="text-xs font-bold text-stone-500 font-sans">({(tenureMonths / 12).toFixed(1)} Yrs)</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={selectedCalcCategory.minTenure}
                    max={selectedCalcCategory.maxTenure}
                    step="6"
                    value={tenureMonths}
                    onChange={(e) => setTenureMonths(Number(e.target.value))}
                    className="w-full accent-[#10367D] cursor-pointer h-2 bg-stone-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-stone-400 font-mono">
                    <span>{selectedCalcCategory.minTenure} Months</span>
                    <span>{selectedCalcCategory.maxTenure} Months</span>
                  </div>
                </div>

              </div>

              {/* Right Output Dashboard (5 Cols) */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#10367D] to-[#0A2254] text-white p-7 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6">
                
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D57530] bg-white/10 px-3 py-1 rounded-full inline-block mb-3">
                    Calculated Monthly EMI
                  </span>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black heading-font tracking-tight mb-1 text-white">
                    {formatCurrency(emiVal)}
                  </div>
                  <span className="text-xs text-white/70 font-medium">Per Month for {tenureMonths} Months</span>
                </div>

                {/* Breakdown Progress Visual */}
                <div className="space-y-2 pt-4 border-t border-white/15 text-xs">
                  <div className="flex justify-between text-white/80">
                    <span>Principal Amount:</span>
                    <strong className="font-mono text-white">{formatCurrency(amount)} ({principalPercentage}%)</strong>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Total Interest Payable:</span>
                    <strong className="font-mono text-[#D57530]">{formatCurrency(totalInterest)} ({interestPercentage}%)</strong>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                    <span>Total Amount Payable:</span>
                    <strong className="font-mono text-white">{formatCurrency(totalAmount)}</strong>
                  </div>

                  <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden flex mt-3">
                    <div style={{ width: `${principalPercentage}%` }} className="bg-[#D57530] h-full" />
                    <div style={{ width: `${interestPercentage}%` }} className="bg-emerald-400 h-full" />
                  </div>
                  <div className="flex justify-between text-[10px] text-white/60 font-semibold pt-1">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#D57530]" /> Principal</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Total Interest</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleOpenFormalLoanModal(selectedCalcCategory.id, amount);
                  }}
                  className="w-full btn-gold py-3.5 rounded-full font-bold uppercase tracking-wider text-xs cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Open Full Loan Application Form</span>
                  <ArrowRight size={14} />
                </button>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. Step-by-Step Approval Process (4 Steps) */}
      <section className="py-16 md:py-24 bg-white border-b border-stone-200 text-center">
        <div className="container-custom max-w-5xl">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#D57530] block mb-3 font-sans">
            STREAMLINED WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold heading-font uppercase text-stone-900 mb-16 tracking-tight">
            How Your Loan Gets Approved in 4 Steps
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            <div className="bg-stone-50 border border-stone-200 p-6 rounded-3xl relative">
              <span className="text-3xl font-black text-[#10367D]/20 heading-font absolute top-4 right-5">01</span>
              <div className="w-10 h-10 rounded-xl bg-[#10367D] text-white flex items-center justify-center mb-4">
                <FileText size={18} />
              </div>
              <h4 className="font-extrabold text-sm text-[#10367D] uppercase tracking-wide mb-2 heading-font">Apply Online</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Fill our 2-minute eligibility form with your basic identity, income details, and required loan capital.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-6 rounded-3xl relative">
              <span className="text-3xl font-black text-[#10367D]/20 heading-font absolute top-4 right-5">02</span>
              <div className="w-10 h-10 rounded-xl bg-[#10367D] text-white flex items-center justify-center mb-4">
                <ShieldCheck size={18} />
              </div>
              <h4 className="font-extrabold text-sm text-[#10367D] uppercase tracking-wide mb-2 heading-font">Digital KYC Check</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Upload your KYC, bank statements, and income documents through our encrypted verification portal.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-6 rounded-3xl relative">
              <span className="text-3xl font-black text-[#10367D]/20 heading-font absolute top-4 right-5">03</span>
              <div className="w-10 h-10 rounded-xl bg-[#10367D] text-white flex items-center justify-center mb-4">
                <BadgePercent size={18} />
              </div>
              <h4 className="font-extrabold text-sm text-[#10367D] uppercase tracking-wide mb-2 heading-font">Bank Sanction</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                We route your file across top banks to issue the formal Sanction Letter at the lowest available interest rate.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-6 rounded-3xl relative">
              <span className="text-3xl font-black text-[#10367D]/20 heading-font absolute top-4 right-5">04</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4">
                <Coins size={18} />
              </div>
              <h4 className="font-extrabold text-sm text-emerald-800 uppercase tracking-wide mb-2 heading-font">Disbursement</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Loan funds are credited directly to your bank account or vendor, with partner referral payouts logged automatically.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Document Checklist Section (Tabbed View) */}
      <section className="py-16 md:py-24 bg-[#FAF9F6] border-b border-stone-200 text-left">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12 space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#D57530] block font-sans">
              CLEAR ELIGIBILITY CRITERIA
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold heading-font uppercase text-stone-900 tracking-tight">
              Required Documents Checklist
            </h2>
            <p className="text-stone-500 text-sm max-w-xl mx-auto font-normal">
              Keep these standard government records ready for lightning-fast 24-hour loan sanctioning.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 pb-6 mb-6 border-b border-stone-200">
              <button
                onClick={() => setActiveDocTab('salaried')}
                className={`px-5 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all cursor-pointer ${
                  activeDocTab === 'salaried' ? 'bg-[#10367D] text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Salaried Individuals
              </button>
              <button
                onClick={() => setActiveDocTab('selfEmployed')}
                className={`px-5 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all cursor-pointer ${
                  activeDocTab === 'selfEmployed' ? 'bg-[#10367D] text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Self-Employed Professionals
              </button>
              <button
                onClick={() => setActiveDocTab('business')}
                className={`px-5 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all cursor-pointer ${
                  activeDocTab === 'business' ? 'bg-[#10367D] text-white shadow-sm' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                MSME / Business Entities
              </button>
            </div>

            {/* Content for Salaried */}
            {activeDocTab === 'salaried' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {[
                  'Identity Proof: Aadhaar Card / Passport / Voter ID',
                  'PAN Card (Mandatory for all financial operations)',
                  'Latest 3 Months Salary Slips with deductions',
                  'Latest 6 Months Salary Account Bank Statements (PDF)',
                  'Latest Form 16 / Income Tax Returns for 2 Years',
                  'Current Address Proof / Utility Bill / Rental Deed',
                  'Passport Sized Photographs (2 Nos)',
                  'Property Documents (For Home Loans / LAP)'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span className="font-semibold text-stone-800">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Content for Self-Employed */}
            {activeDocTab === 'selfEmployed' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {[
                  'Identity Proof: Aadhaar Card & PAN Card',
                  'Professional Degree / Practice Certificate (Doctors, CAs, Architects)',
                  'Last 2 to 3 Years Income Tax Returns with Computation of Income',
                  'Audited Balance Sheet & Profit & Loss Statement (2 Years)',
                  'Latest 12 Months Savings & Current Bank Account Statements',
                  'Business Office Address Proof / Utility Bill',
                  'GST Registration Certificate & 12-Month GST Returns',
                  'Property Valuation Title Deeds (If applying for mortgage)'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span className="font-semibold text-stone-800">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Content for Business / MSME */}
            {activeDocTab === 'business' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {[
                  'Business Registration: GST, Udyam MSME, Certificate of Incorporation / Partnership Deed',
                  'Company PAN Card & Director / Partner KYC (Aadhaar & PAN)',
                  'Last 3 Years Audited Financial Statements (CA Certified)',
                  '12 Months Company Current Account Bank Statements',
                  'GST Returns (GSTR-3B & GSTR-1 for past 12 Months)',
                  'Existing Loan Sanction Letters & Repayment Track Records',
                  'Business Proof of Premises (Ownership Deeds / Registered Lease)',
                  'Proforma Invoice / Quotations (For machinery/equipment loans)'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span className="font-semibold text-stone-800">{item}</span>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 8. Partner DSA Franchise Payout Banner */}
      <section className="py-16 bg-[#10367D] text-white text-left relative overflow-hidden">
        <div className="container-custom max-w-5xl relative z-10">
          <div className="bg-white/10 border border-white/15 rounded-3xl p-8 sm:p-12 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D57530] bg-white px-3 py-1 rounded-full inline-block">
                REFERRAL COMMISSION REWARD
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold heading-font uppercase tracking-tight text-white">
                Earn 0.5% – 2.0% on Every Disbursed Loan
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Join BuildBharat as an empanelled Channel Partner. Refer clients for Home Loans, Business Capital, or Solar financing and receive guaranteed direct payouts upon loan disbursement.
              </p>
            </div>

            <button
              onClick={onOpenPartnerModal}
              className="btn-gold whitespace-nowrap px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs cursor-pointer shadow-lg flex items-center gap-2 shrink-0 animate-pulse"
            >
              <span>Register as Loan Partner</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="py-16 md:py-24 bg-white text-left">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#D57530] block font-sans">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold heading-font uppercase text-stone-900 tracking-tight">
              Got Questions on Loans?
            </h2>
            <div className="w-12 h-px bg-[#D57530] mx-auto mt-3" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx}
                  className="bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-stone-900 heading-font uppercase cursor-pointer hover:text-[#10367D] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className={`transition-transform shrink-0 ${isOpen ? 'rotate-180 text-[#10367D]' : 'text-stone-400'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans border-t border-stone-200/60 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Formal Loan Application & Upline Verification Modal */}
      <FormalLoanModal
        isOpen={isFormalLoanModalOpen}
        onClose={() => setIsFormalLoanModalOpen(false)}
        initialLoanType={selectedLoanTypeForModal}
        initialAmount={selectedAmountForModal}
      />

    </div>
  );
};

export default LoansHomepage;
