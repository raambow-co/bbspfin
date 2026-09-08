import React, { useState } from 'react';
import { ArrowLeft, Check, ExternalLink, ArrowRight, ShieldCheck, Coins, Percent, Calendar, Calculator, FileText, CheckCircle2, Clock, Landmark, Smartphone, Info, Home, TrendingUp, Download, X, FileQuestion } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PILLAR_CATEGORIES } from '../data/ecosystemData';

interface LoansPageProps {
  onNavigate: (path: string) => void;
  onOpenPartnerModal: () => void;
}

// Reuse EmiCalculator from original layout for a complete page experience
const EmiCalculator = () => {
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(10.5);
  const [tenure, setTenure] = useState(36);

  const calculateEMI = () => {
    const P = amount;
    const r = rate / 12 / 100;
    const n = tenure;
    if (r === 0) return (P / n).toFixed(0);
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return isNaN(emi) ? '0' : emi.toFixed(0);
  };

  const emiVal = Number(calculateEMI());
  const totalAmount = emiVal * tenure;
  const totalInterest = totalAmount - amount;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#EBE6DD] p-6 sm:p-8 rounded-2xl shadow-sm text-left relative overflow-hidden mb-12">
      <div className="flex items-center gap-2 text-[#B08B54] text-[9px] font-bold uppercase tracking-wider mb-2 font-sans">
        <Calculator size={12} />
        <span>Financial Planning Tool</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-extrabold heading-font text-[#1F1D1A] uppercase tracking-wide mb-6">
        Ecosystem Loan EMI Calculator
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-[#6E6A61] font-semibold uppercase tracking-wider font-sans">
              <span>Loan Amount</span>
              <span className="text-[#B08B54] font-bold text-sm font-mono">{formatCurrency(amount)}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="50000000"
              step="100000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-[#B08B54]"
            />
            <div className="flex justify-between text-[9px] font-bold text-[#6E6A61]/60 font-mono">
              <span>₹1 Lakh</span>
              <span>₹5 Crore</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-[#6E6A61] font-semibold uppercase tracking-wider font-sans">
              <span>Interest Rate (p.a.)</span>
              <span className="text-[#B08B54] font-bold text-sm font-mono">{rate}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-[#B08B54]"
            />
            <div className="flex justify-between text-[9px] font-bold text-[#6E6A61]/60 font-mono">
              <span>5% p.a.</span>
              <span>20% p.a.</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-[#6E6A61] font-semibold uppercase tracking-wider font-sans">
              <span>Repayment Tenure</span>
              <span className="text-[#B08B54] font-bold text-sm font-sans">{tenure} Months ({Math.round(tenure/12 * 10)/10} Yrs)</span>
            </div>
            <input
              type="range"
              min="6"
              max="60"
              step="1"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full accent-[#B08B54]"
            />
            <div className="flex justify-between text-[9px] font-bold text-[#6E6A61]/60 font-mono">
              <span>6 Months</span>
              <span>60 Months</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 bg-[#FAF9F6] border border-[#EBE6DD] p-6 rounded-xl flex flex-col justify-between h-full space-y-4">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#6E6A61] block subheading-font mb-1">
              Estimated Monthly Payment
            </span>
            <span className="text-3xl font-extrabold heading-font text-[#B08B54] tracking-tight block">
              {formatCurrency(emiVal)} <span className="text-xs font-bold text-[#6E6A61]">/ mo</span>
            </span>
          </div>
          <div className="border-t border-[#EBE6DD] pt-4 space-y-2.5 text-xs text-[#6E6A61] font-semibold font-sans">
            <div className="flex justify-between">
              <span className="text-[#6E6A61]/70 uppercase text-[9px] tracking-wider">Total Principal</span>
              <span className="text-[#1F1D1A] font-bold font-mono">{formatCurrency(amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6E6A61]/70 uppercase text-[9px] tracking-wider">Total Interest</span>
              <span className="text-[#1F1D1A] font-bold font-mono">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between border-t border-[#EBE6DD] pt-2.5 font-bold text-[#1F1D1A]">
              <span className="text-[#B08B54] uppercase text-[9px] tracking-wider">Total Amount</span>
              <span className="text-[#B08B54] font-mono">{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// LoanServiceCard Prop Interface
interface LoanServiceCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  pdfUrl?: string;
  onClick?: (e: React.MouseEvent) => void;
}

// Reusable LoanServiceCard Component
const LoanServiceCard: React.FC<LoanServiceCardProps> = ({ icon, title, subtitle, pdfUrl, onClick }) => {
  return (
    <a
      href={pdfUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="group block bg-[#FFFFFF] border border-[#EBE6DD] p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-[#B08B54] transition-all duration-300 -translate-y-0 hover:-translate-y-1 md:hover:-translate-y-1.5 cursor-pointer text-left"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#EBE6DD] flex items-center justify-center text-[#B08B54] group-hover:bg-[#B08B54]/10 transition-colors shrink-0">
            {icon}
          </div>
          <div>
            <h4 className="font-extrabold text-[#1F1D1A] text-sm tracking-wide heading-font uppercase">
              {title}
            </h4>
            <p className="text-[#6E6A61] text-xs mt-0.5 leading-relaxed font-sans font-normal">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="w-9 h-9 rounded-full border border-[#EBE6DD] flex items-center justify-center text-[#6E6A61] group-hover:bg-[#1F1D1A] group-hover:border-[#1F1D1A] group-hover:text-white transition-all duration-300 shrink-0">
          <ExternalLink size={14} />
        </div>
      </div>
    </a>
  );
};

export const LoansPage: React.FC<LoansPageProps> = ({ onNavigate, onOpenPartnerModal }) => {
  const pillar = PILLAR_CATEGORIES['loans'];
  const company = pillar.companies[0];
  const otherPillars = Object.values(PILLAR_CATEGORIES).filter((p) => p.id !== 'loans');
  const shouldReduceMotion = useReducedMotion();

  const [activePdfDoc, setActivePdfDoc] = useState<{ title: string; pdfUrl: string } | null>(null);
  const [notFoundModalTitle, setNotFoundModalTitle] = useState<string | null>(null);

  // 7 services cards configuration linking to uploaded PDF documents or pending state
  const servicesList = [
    {
      title: "Home Loan Interest",
      subtitle: "Competitive annual rates tailored to your credit profile.",
      icon: <TrendingUp size={20} />,
      pdfUrl: "/documents/home-loan-interest-rates.pdf"
    },
    {
      title: "EMI Details",
      subtitle: "Calculate monthly payments and schedule estimates.",
      icon: <Calculator size={20} />,
      pdfUrl: "/documents/emi-details-per-lakh.pdf"
    },
    {
      title: "Loan Information",
      subtitle: "Understand eligibility, interest calculation, and policies.",
      icon: <Info size={20} />,
      pdfUrl: ""
    },
    {
      title: "Loan Packages (Plot Purchase / Construction)",
      subtitle: "Custom finance options for plot purchase and construction.",
      icon: <Home size={20} />,
      pdfUrl: ""
    },
    {
      title: "Documents Required (Salaried)",
      subtitle: "Salary slips, form 16, and employment proof checklist.",
      icon: <FileText size={20} />,
      pdfUrl: "/documents/documents-required-salaried.pdf"
    },
    {
      title: "Documents Required (Business)",
      subtitle: "Audited balance sheet, ITR, and trade license records.",
      icon: <FileText size={20} />,
      pdfUrl: ""
    },
    {
      title: "Loan Repayment Schedule",
      subtitle: "Plan your amortization steps and prepayment periods.",
      icon: <Calendar size={20} />,
      pdfUrl: ""
    }
  ];

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F2] text-[#1F1D1A] selection:bg-[#B08B54]/20 selection:text-[#1F1D1A] font-sans">
      
      {/* Sub-Header Navigation Banner */}
      <div className="bg-[#FFFFFF]/90 border-b border-[#EBE6DD] py-3 sticky top-0 z-40 backdrop-blur-md">
        <div className="container-custom flex items-center justify-between">
          <button 
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6E6A61] hover:text-[#1F1D1A] transition-colors bg-transparent border-none cursor-pointer p-0 font-sans"
          >
            <ArrowLeft size={14} />
            <span>Back to Build Bharat</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs text-[#6E6A61] font-medium font-sans">
            <ShieldCheck size={14} className="text-[#B08B54]" />
            <span className="hidden sm:inline">Ecosystem Member:</span>
            <span className="font-bold text-[#B08B54]">{company.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 border-b border-[#EBE6DD] overflow-hidden bg-[#FAF9F6]">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        
        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <img 
                src={company.logo} 
                alt={company.name} 
                className="h-20 w-auto object-contain bg-white p-2 rounded-2xl border border-[#EBE6DD] shadow-sm self-start" 
              />
              <div className="space-y-1.5">
                <span className="border-[#B08B54]/30 text-[#B08B54] bg-[#B08B54]/10 badge-tag font-bold rounded-full inline-block">
                  {pillar.title}
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold heading-font tracking-wide leading-tight text-[#1F1D1A] uppercase">
                  {company.name}
                </h1>
              </div>
            </div>
            
            <p className="text-sm sm:text-base font-semibold subheading-font tracking-normal text-[#B08B54]">
              {company.tagline}
            </p>
            
            <p className="text-[#6E6A61] text-base sm:text-lg leading-relaxed max-w-2xl font-normal font-sans">
              {company.fullDescription}
            </p>

            {/* Metric Board */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#EBE6DD] max-w-lg">
              {company.metrics.map((m, idx) => (
                <div key={idx} className="bg-white border border-[#EBE6DD] p-4 rounded-xl text-center shadow-sm relative">
                  <span className="block text-xl sm:text-2xl font-bold heading-font text-[#B08B54] leading-none mb-1 uppercase tracking-tight">
                    {m.value}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-[#6E6A61] tracking-widest block subheading-font">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* NBFC Partnership Disclosure */}
            <div className="pt-2">
              <p className="text-[10px] uppercase tracking-widest text-[#B08B54] font-extrabold bg-[#B08B54]/5 px-3.5 py-2 border border-[#B08B54]/10 rounded-xl inline-flex items-center gap-1.5 select-none shadow-sm font-sans">
                <ShieldCheck size={14} className="text-[#B08B54]" />
                <span>In partnership with RBI-registered NBFC partners</span>
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
               <button 
                 onClick={onOpenPartnerModal}
                 className="bg-[#10367D] hover:bg-[#0A2254] text-white justify-center rounded-full px-5 py-2.5 flex items-center gap-1.5 cursor-pointer text-xs uppercase tracking-wider font-bold transition-colors shadow-sm border-none"
               >
                 <span>Request Financing</span>
                 <ArrowRight size={14} />
               </button>
            </div>
          </div>

          {/* Hero Architectural Image Panel */}
          <div className="lg:col-span-5 relative">
            <div className="border border-[#EBE6DD] p-2 bg-[#FFFFFF] rounded-xl shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80" 
                alt={company.name}
                className="w-full h-80 object-cover rounded-lg filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b border-l border-[#B08B54]/50 pointer-events-none" />
            <div className="absolute -top-4 -right-4 w-12 h-12 border-t border-r border-[#B08B54]/50 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Explore Home Loan Services Section */}
      <section className="py-12 bg-[#FBF8F2] relative border-b border-[#EBE6DD]">
        <div className="container-custom max-w-5xl mx-auto px-6">
          {/* Eyebrow, Header and Subtitle */}
          <div className="text-center mb-10 space-y-3">
            <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#B08B54] bg-[#B08B54]/5 px-3.5 py-1.5 rounded-full border border-[#B08B54]/10 inline-block font-sans">
              Loan Services
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold heading-font uppercase tracking-wider text-[#1F1D1A]">
              Explore Home Loan Services
            </h2>
            <p className="text-[#6E6A61] text-xs sm:text-sm font-sans max-w-xl mx-auto leading-relaxed">
              Explore customizable borrowing configurations, document check-lists, and interest options designed for seamless property acquisition.
            </p>
            <div className="w-12 h-px bg-[#B08B54] mx-auto mt-4" />
          </div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {servicesList.map((service, index) => (
              <motion.div key={index} variants={itemVariants}>
                <LoanServiceCard
                  title={service.title}
                  subtitle={service.subtitle}
                  icon={service.icon}
                  pdfUrl={service.pdfUrl}
                  onClick={(e) => {
                    if (!service.pdfUrl) {
                      e.preventDefault();
                      setNotFoundModalTitle(service.title);
                    } else {
                      setActivePdfDoc({ title: service.title, pdfUrl: service.pdfUrl });
                    }
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dynamic Sizing / Planning Section containing EmiCalculator */}
      <section className="py-12 bg-[#FAF9F6]">
        <div className="container-custom max-w-4xl">
          <EmiCalculator />
        </div>
      </section>

      {/* Loan Parameters Grid */}
      <section className="py-12 bg-[#FAF9F6] border-b border-[#EBE6DD] text-left">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[9px] uppercase tracking-widest font-bold text-[#B08B54] block subheading-font">CREDIT METRICS</span>
            <h2 className="text-2xl md:text-3xl font-extrabold heading-font uppercase tracking-wider text-[#1F1D1A]">
              Loan Parameters & Terms
            </h2>
            <div className="w-12 h-px bg-[#B08B54] mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#EBE6DD] p-6 rounded-2xl shadow-sm flex flex-col justify-between h-44">
              <div>
                <div className="w-9 h-9 bg-[#FAF9F6] border border-[#EBE6DD] rounded-lg flex items-center justify-center mb-4 text-[#B08B54]">
                  <Percent size={18} />
                </div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#6E6A61] font-sans">Credit Limits</h4>
                <p className="text-xl font-extrabold heading-font text-[#1F1D1A] uppercase tracking-tight mt-1">₹1L – ₹5 Crore</p>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#6E6A61]/70">Competitive Rate starting at 9.5%</span>
            </div>
            <div className="bg-white border border-[#EBE6DD] p-6 rounded-2xl shadow-sm flex flex-col justify-between h-44">
              <div>
                <div className="w-9 h-9 bg-[#FAF9F6] border border-[#EBE6DD] rounded-lg flex items-center justify-center mb-4 text-[#B08B54]">
                  <Calendar size={18} />
                </div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#6E6A61] font-sans">Flexible Tenures</h4>
                <p className="text-xl font-extrabold heading-font text-[#1F1D1A] uppercase tracking-tight mt-1">6 Months – 5 Yrs</p>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#6E6A61]/70">Structured custom repayment modes</span>
            </div>
            <div className="bg-white border border-[#EBE6DD] p-6 rounded-2xl shadow-sm flex flex-col justify-between h-44">
              <div>
                <div className="w-9 h-9 bg-[#FAF9F6] border border-[#EBE6DD] rounded-lg flex items-center justify-center mb-4 text-[#B08B54]">
                  <ShieldCheck size={18} />
                </div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#6E6A61] font-sans">Eligibility</h4>
                <p className="text-xl font-extrabold heading-font text-[#1F1D1A] uppercase tracking-tight mt-1">Credit Score 680+</p>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#6E6A61]/70">Salaried / Self-Employed Applicants</span>
            </div>
          </div>
        </div>
      </section>

      {/* Document Checklist Section */}
      <section className="py-12 bg-[#FFFFFF] border-b border-[#EBE6DD] text-left">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[9px] uppercase tracking-widest font-bold text-[#B08B54] block subheading-font">REQUIRED DOCUMENTS</span>
            <h2 className="text-2xl md:text-3xl font-extrabold heading-font uppercase tracking-wider text-[#1F1D1A]">
              Application Checklist
            </h2>
            <div className="w-12 h-px bg-[#B08B54] mx-auto mt-3" />
          </div>
          <div className="bg-[#FAF9F6] border border-[#EBE6DD] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
            {[
              { title: 'PAN Card', desc: 'Personal PAN card of the applicant/directors and corporate PAN card for enterprises.' },
              { title: 'Aadhaar Card', desc: 'Valid identity and residence proof for verifying credit profiles.' },
              { title: 'Bank Account Statements', desc: 'Latest 6 months statements of the main operating bank account.' },
              { title: 'ITR & Income Proof', desc: 'Income tax filings (last 2 years) or audited balance sheet for corporate lines.' }
            ].map((doc, idx) => (
              <div key={idx} className="flex items-start gap-3.5 pb-4 border-b border-[#EBE6DD]/50 last:border-b-0 last:pb-0">
                <span className="p-1 bg-[#FAF9F6] border border-[#EBE6DD] text-[#B08B54] rounded-lg shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </span>
                <div>
                  <h4 className="font-bold text-[#1F1D1A] text-sm uppercase tracking-wide subheading-font">{doc.title}</h4>
                  <p className="text-[#6E6A61] text-xs mt-0.5 leading-relaxed font-sans">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Synergy Matrix Integration */}
      <section className="py-10 bg-[#FAF9F6]">
        <div className="container-custom max-w-3xl text-center space-y-4">
          <span className="text-[9px] uppercase tracking-widest font-bold text-[#B08B54] block subheading-font">SYNERGY INTEGRATION</span>
          <h3 className="text-xl md:text-2xl font-bold heading-font uppercase tracking-wider text-[#1F1D1A]">
            Operational Matrix Connection
          </h3>
          <p className="text-[#6E6A61] text-sm md:text-base leading-relaxed max-w-xl mx-auto font-normal italic font-sans">
            "{company.synergyHighlight}"
          </p>
          <div className="pt-4 flex items-center justify-center">
            <div className="bg-[#FFFFFF] border border-[#EBE6DD] px-6 py-4 flex items-center gap-3 text-[10px] text-[#B08B54] font-bold uppercase tracking-widest subheading-font rounded-full shadow-sm">
              <span>{pillar.emoji} {pillar.title.split('/')[0]}</span>
              <span className="text-[#B08B54]">✦</span>
              <span className="text-[#1F1D1A]">Build Bharat Network</span>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Other Companies Bottom Gateway */}
      <section className="py-12 bg-[#FFFFFF] border-t border-[#EBE6DD]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-[9px] uppercase tracking-widest font-bold text-[#6E6A61] block mb-1 subheading-font">ECOSYSTEM GATEWAY</span>
            <h3 className="text-2xl md:text-3xl font-extrabold heading-font uppercase tracking-wider text-[#1F1D1A]">
              Explore Other Pathways
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {otherPillars.map((p) => (
              <button
                key={p.id}
                onClick={() => onNavigate(`/${p.id}`)}
                className="bg-[#FAF9F6] p-6 border border-[#EBE6DD] text-left hover:border-[#B08B54]/40 transition-all group flex flex-col justify-between h-48 cursor-pointer rounded-2xl shadow-sm"
              >
                <div>
                  <span className="text-3xl block mb-2">{p.emoji}</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#1F1D1A] group-hover:text-[#B08B54] transition-colors heading-font">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[#6E6A61] mt-1.5 line-clamp-2 font-sans font-normal">
                    {p.description}
                  </p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#B08B54] flex items-center gap-1 mt-4 font-sans">
                  <span>Enter Profile</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PDF DOCUMENT VIEWER & DOWNLOAD MODAL */}
      {activePdfDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md text-left animate-fadeIn">
          <div className="bg-[#FFFFFF] w-full max-w-5xl rounded-2xl border border-stone-200 p-6 relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#B08B54]/10 text-[#B08B54] rounded-xl">
                  <FileText size={20} />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#B08B54] font-bold block">
                    Official Document Viewer
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 heading-font uppercase">
                    {activePdfDoc.title}
                  </h3>
                </div>
              </div>

              {/* Actions & Close */}
              <div className="flex items-center gap-2">
                <a
                  href={activePdfDoc.pdfUrl}
                  download="Home-Loan-Floating-Interest-Rates.pdf"
                  className="bg-[#B08B54] hover:bg-[#967341] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>

                <a
                  href={activePdfDoc.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full hidden sm:flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink size={14} />
                  <span>Open in New Tab</span>
                </a>

                <button
                  onClick={() => setActivePdfDoc(null)}
                  className="p-2 text-stone-400 hover:text-stone-900 bg-stone-100 rounded-full cursor-pointer transition-colors border border-stone-200 ml-2"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer Frame */}
            <div className="flex-grow bg-stone-100 rounded-xl overflow-hidden border border-stone-200 relative min-h-[500px]">
              <iframe
                src={`${activePdfDoc.pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                title={activePdfDoc.title}
                className="w-full h-full min-h-[550px] border-0"
              />
            </div>

            {/* Modal Bottom Footer Notice */}
            <div className="pt-3 flex items-center justify-between text-xs text-stone-500 shrink-0">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#B08B54]" />
                <span>Build Bharat Synergy Partners - Verified Financial Document</span>
              </span>
              <a
                href={activePdfDoc.pdfUrl}
                download="Home-Loan-Floating-Interest-Rates.pdf"
                className="text-[#B08B54] font-bold hover:underline"
              >
                Click here if download does not start automatically
              </a>
            </div>
          </div>
        </div>
      )}
      {notFoundModalTitle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm text-left animate-fadeIn">
          <div className="bg-[#FFFFFF] w-full max-w-md rounded-2xl border border-stone-200 p-6 relative shadow-2xl overflow-hidden text-center space-y-4">
            <button
              onClick={() => setNotFoundModalTitle(null)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-900 bg-stone-100 rounded-full cursor-pointer transition-colors border border-stone-200"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
            <div className="w-16 h-16 bg-amber-500/10 text-[#B08B54] rounded-full flex items-center justify-center mx-auto border border-[#B08B54]/20 shadow-xs">
              <FileQuestion size={32} />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#B08B54] font-extrabold block mb-1">
                Status: Pending Upload
              </span>
              <h3 className="text-xl font-extrabold text-stone-900 heading-font uppercase">
                File Not Found
              </h3>
              <p className="text-stone-600 text-xs mt-2 leading-relaxed font-sans">
                The document for <strong className="text-stone-900 font-bold">{notFoundModalTitle}</strong> has not been uploaded yet. The official PDF file will be uploaded shortly by the team.
              </p>
            </div>
            <button
              onClick={() => setNotFoundModalTitle(null)}
              className="bg-[#1F1D1A] hover:bg-[#B08B54] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full transition-colors w-full cursor-pointer shadow-sm"
            >
              Got It
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
export default LoansPage;
