import React, { useState } from 'react';
import { ArrowLeft, Check, ExternalLink, ArrowRight, ShieldCheck, Sun, Coins, Building2, GraduationCap, Percent, Calendar, Calculator, FileText, CheckCircle2, Clock, Landmark, Smartphone, Zap, Search, Award, Leaf, Lightbulb } from 'lucide-react';
import { CompanyData, PILLAR_CATEGORIES } from '../data/ecosystemData';
import { RealEstateHomepage } from './RealEstateHomepage';
import { LoansHomepage } from './LoansHomepage';
import { GovernmentInitiativeSection } from '../components/GovernmentInitiativeSection';
import { JourneySection } from '../components/JourneySection';
import { SolarComponentsSection } from '../components/SolarComponentsSection';
import { SolarTestimonialsSection } from '../components/SolarTestimonialsSection';
 
interface CompanyPageProps {
  category: 'solar' | 'loans' | 'real-estate' | 'education';
  onNavigate: (path: string) => void;
  onOpenPartnerModal: () => void;
}
 
// Loans EMI Calculator Sub-Component
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
    <div className="bg-[#FFFFFF] border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-sm text-left relative overflow-hidden mb-12">
      <div className="flex items-center gap-2 text-[#D57530] text-[9px] font-bold uppercase tracking-wider mb-2 font-sans">
        <Calculator size={12} />
        <span>Financial Planning Tool</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-extrabold heading-font text-stone-900 uppercase tracking-wide mb-6">
        Ecosystem Loan EMI Calculator
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-stone-600 font-semibold uppercase tracking-wider font-sans">
              <span>Loan Amount</span>
              <span className="text-[#10367D] font-bold text-sm font-mono">{formatCurrency(amount)}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="50000000"
              step="100000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-[#10367D]"
            />
            <div className="flex justify-between text-[9px] font-bold text-stone-400 font-mono">
              <span>₹1 Lakh</span>
              <span>₹5 Crore</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-stone-600 font-semibold uppercase tracking-wider font-sans">
              <span>Interest Rate (p.a.)</span>
              <span className="text-[#10367D] font-bold text-sm font-mono">{rate}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-[#10367D]"
            />
            <div className="flex justify-between text-[9px] font-bold text-stone-400 font-mono">
              <span>5% p.a.</span>
              <span>20% p.a.</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-stone-600 font-semibold uppercase tracking-wider font-sans">
              <span>Repayment Tenure</span>
              <span className="text-[#10367D] font-bold text-sm font-sans">{tenure} Months ({Math.round(tenure/12 * 10)/10} Yrs)</span>
            </div>
            <input
              type="range"
              min="6"
              max="60"
              step="1"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full accent-[#10367D]"
            />
            <div className="flex justify-between text-[9px] font-bold text-stone-400 font-mono">
              <span>6 Months</span>
              <span>60 Months</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 bg-stone-50 border border-stone-200 p-6 rounded-xl flex flex-col justify-between h-full space-y-4">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-stone-500 block subheading-font mb-1">
              Estimated Monthly Payment
            </span>
            <span className="text-3xl font-extrabold heading-font text-[#10367D] tracking-tight block">
              {formatCurrency(emiVal)} <span className="text-xs font-bold text-stone-500">/ mo</span>
            </span>
          </div>
          <div className="border-t border-stone-200 pt-4 space-y-2.5 text-xs text-stone-600 font-semibold font-sans">
            <div className="flex justify-between">
              <span className="text-stone-450 uppercase text-[9px] tracking-wider">Total Principal</span>
              <span className="text-stone-900 font-bold font-mono">{formatCurrency(amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-450 uppercase text-[9px] tracking-wider">Total Interest</span>
              <span className="text-stone-900 font-bold font-mono">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between border-t border-stone-200/50 pt-2.5 font-bold text-stone-900">
              <span className="text-[#D57530] uppercase text-[9px] tracking-wider">Total Amount</span>
              <span className="text-[#D57530] font-mono">{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
// Solar Savings & Sizing Calculator Sub-Component
const SolarSavingsCalculator = () => {
  const [bill, setBill] = useState(5000); // Default monthly utility bill ₹5,000
 
  // Sizing: Average bill divided by ₹8 tariff = consumption in kWh.
  // Recommended system size = Monthly kWh / 120 (since 1kW yields 4 units/day * 30 days = 120 units/mo).
  const calculateSystemSize = () => {
    const size = (bill / 8) / 120;
    return isNaN(size) ? 0 : Math.round(size * 10) / 10;
  };
 
  const systemSize = calculateSystemSize();
  const roofSpace = Math.round(systemSize * 100);
  const costEst = Math.round(systemSize * 55000);
  const annualSavings = Math.round(bill * 0.90 * 12);
 
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };
 
  return (
    <div className="bg-[#FFFFFF] border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-sm text-left relative overflow-hidden mb-12">
      <div className="flex items-center gap-2 text-[#D57530] text-[9px] font-bold uppercase tracking-wider mb-2 font-sans">
        <Calculator size={12} />
        <span>Ecosystem Engineering Tool</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-extrabold heading-font text-stone-900 uppercase tracking-wide mb-6">
        Solar Savings & System Estimator
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Bill input slider */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-stone-600 font-semibold uppercase tracking-wider font-sans">
              <span>Monthly Electricity Bill</span>
              <span className="text-[#10367D] font-bold text-sm font-mono">{formatCurrency(bill)}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="500"
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="w-full accent-[#10367D]"
            />
            <div className="flex justify-between text-[9px] font-bold text-stone-400 font-mono">
              <span>₹1,000 / mo</span>
              <span>₹1 Lakh / mo</span>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-[#10367D] leading-relaxed">
            <strong>Estimator Assumptions:</strong> Based on an average utility power rate of ₹8.00 per unit (kWh), with standard monocrystalline silicon PV arrays yielding 4 hours of peak irradiance daily.
          </div>
        </div>
 
        {/* Sizing outputs */}
        <div className="lg:col-span-5 bg-stone-50 border border-stone-200 p-6 rounded-xl flex flex-col justify-between h-full space-y-4">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-stone-500 block subheading-font mb-1">
              Estimated Annual Savings
            </span>
            <span className="text-3xl font-extrabold heading-font text-emerald-700 tracking-tight block">
              {formatCurrency(annualSavings)} <span className="text-xs font-bold text-stone-500">/ yr</span>
            </span>
          </div>
          <div className="border-t border-stone-200 pt-4 space-y-2.5 text-xs text-stone-600 font-semibold font-sans">
            <div className="flex justify-between">
              <span className="text-stone-450 uppercase text-[9px] tracking-wider">Required PV Array Size</span>
              <span className="text-stone-900 font-bold font-mono">{systemSize} kWp</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-450 uppercase text-[9px] tracking-wider">Required Roof Area</span>
              <span className="text-stone-900 font-bold font-mono">~ {roofSpace} Sq Ft</span>
            </div>
            <div className="flex justify-between border-t border-stone-200/50 pt-2.5 font-bold text-stone-900">
              <span className="text-[#D57530] uppercase text-[9px] tracking-wider">Approx. Install Cost</span>
              <span className="text-[#D57530] font-mono">{formatCurrency(costEst)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
// Helper to draw a mathematically precise scalloped/gear edge with 32 points
const ScallopedCircle: React.FC = () => {
  const points = [];
  const outerRadius = 50;
  const innerRadius = 45;
  const numSpikes = 32;
  for (let i = 0; i < numSpikes * 2; i++) {
    const angle = (i * Math.PI) / numSpikes;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return (
    <polygon 
      points={points.join(" ")} 
      fill="currentColor" 
    />
  );
};

// Circular badge styled like an official certification stamp
const CertificationSeal: React.FC<{
  icon: React.ReactNode;
  line1: string;
  line2: string;
}> = ({ icon, line1, line2 }) => {
  return (
    <div className="relative w-[130px] h-[130px] flex-shrink-0 flex flex-col items-center justify-center text-center select-none">
      <svg className="absolute inset-0 w-full h-full text-[#E8963C]" viewBox="0 0 100 100">
        <ScallopedCircle />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#F7F5F0" strokeWidth="1.2" />
      </svg>
      <div className="relative z-10 flex flex-col items-center justify-center text-[#F7F5F0] px-2.5">
        <div className="text-[#F7F5F0] mb-1.5">{icon}</div>
        <div className="text-[7.5px] font-extrabold tracking-widest uppercase leading-tight font-sans">
          {line1}
        </div>
        <div className="text-[7.5px] font-extrabold tracking-widest uppercase leading-tight font-sans">
          {line2}
        </div>
      </div>
    </div>
  );
};

// Rebuilt Premium Solar Homepage matching Figma template structure and brand colors
const SolarHomepage: React.FC<{
  onNavigate: (path: string) => void;
  onOpenPartnerModal: () => void;
  company: CompanyData;
  pillar: any;
}> = ({ onNavigate, onOpenPartnerModal, company, pillar }) => {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const solarProjects = [
    {
      capacity: "450 kWp",
      category: "Residential Microgrid",
      title: "120-Villa Gated Community Microgrid",
      location: "Srikanya Enclave, Hyderabad",
      desc: "A fully integrated hybrid microgrid featuring 450 kWp rooftop solar arrays paired with battery energy storage (BESS) and intelligent load management, achieving 85% grid independence for 120 luxury villas.",
      tags: ["Residential Microgrid", "BESS Storage", "Grid Independent"],
      image: "/solar_hero_premium.png"
    },
    {
      capacity: "2.5 MWp",
      category: "Commercial Solar",
      title: "Solar-Powered Retail & Logistics Hub",
      location: "GMR Logistics Park, Hyderabad",
      desc: "A massive 2.5 MWp net-metered rooftop installation engineered for a high-throughput distribution hub, offsetting 3,200 metric tons of CO₂ annually with active grid export.",
      tags: ["Commercial Retail", "Net Metering", "Logistics Hub"],
      image: "/pm-surya-ghar.png"
    },
    {
      capacity: "15.0 MWp",
      category: "Utility Scale",
      title: "Off-Grid Utility Solar Farm",
      location: "Deccan Plains, Medchal",
      desc: "A 15 MWp utility-scale ground-mounted plant utilizing single-axis bifacial tracking to boost energy yield by 22%, feeding directly into the regional transmission substation.",
      tags: ["Utility Scale", "Bifacial Trackers", "Clean Generation"],
      image: "/solar-panels.png"
    },
    {
      capacity: "850 kWp",
      category: "Smart BIPV",
      title: "Smart Urban Solar Infrastructure",
      location: "Cyber Gateway IT Park, Gachibowli",
      desc: "Custom Building Integrated Photovoltaics (BIPV) glass facade arrays and solar carports integrated with EV charging stations, powering the common grid of a grade-A corporate park.",
      tags: ["Smart Infrastructure", "EV Charging Carports", "BIPV Facade"],
      image: "/inverters.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1A1A1A] selection:bg-[#E8963C]/20 selection:text-[#1A1A1A] font-sans">
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
          
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium font-sans">
            <ShieldCheck size={14} className="text-[#E8963C]" />
            <span className="hidden sm:inline">Ecosystem Member:</span>
            <span className="font-bold text-[#E8963C]">{company.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-20 border-b border-stone-200 overflow-hidden bg-[#F7F5F0]">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        
        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="space-y-3">
              <span className="border-[#E8963C]/30 text-[#E8963C] bg-[#E8963C]/10 badge-tag font-bold rounded-full inline-block px-3 py-1 text-xs border">
                {pillar.title}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold heading-font tracking-tight leading-tight text-[#1A1A1A] uppercase">
                Clean Renewable<br />Limitless Energy
              </h1>
            </div>
            
            <p className="text-stone-600 text-sm sm:text-base font-semibold subheading-font tracking-normal max-w-xl">
              {company.tagline} — Vetted class-A rooftop grids and smart solar installations across South India.
            </p>
            
            <p className="text-stone-500 text-sm sm:text-base leading-relaxed max-w-2xl font-normal font-sans">
              {company.fullDescription}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
               <button 
                 onClick={onOpenPartnerModal}
                 className="bg-[#E8963C] hover:bg-[#1A1A1A] text-white justify-center rounded-full px-6 py-3 flex items-center gap-1.5 cursor-pointer text-xs uppercase tracking-wider font-bold transition-all shadow-md border-none"
               >
                 <span>Get Free Consultation</span>
                 <ArrowRight size={14} />
               </button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200 max-w-lg">
              {[
                { label: 'Completed Grids', value: '45+ MWp' },
                { label: 'CO₂ Emissions Saved', value: '62,000T' },
                { label: 'Avg Power Savings', value: '70%' }
              ].map((m, idx) => (
                <div key={idx} className="bg-white border border-stone-200 p-4 rounded-xl text-center shadow-sm relative">
                  <span className="block text-xl sm:text-2xl font-extrabold heading-font text-[#1A1A1A] leading-none mb-1 uppercase tracking-tight">
                    {m.value}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-stone-500 tracking-widest block subheading-font font-sans">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Scalloped Trust Certification Stamp Seals */}
            <div className="flex flex-wrap items-center gap-6 pt-4 justify-start">
              <CertificationSeal 
                icon={<ShieldCheck size={22} className="stroke-[2.5]" />}
                line1="MNRE CLASS-A"
                line2="PARTNER"
              />
              <CertificationSeal 
                icon={<Check size={22} className="stroke-[2.5]" />}
                line1="ISO 9001:14001"
                line2="CERTIFIED"
              />
              <CertificationSeal 
                icon={<Landmark size={22} className="stroke-[2.5]" />}
                line1="PM SURYA GHAR"
                line2="VETTED"
              />
            </div>
          </div>

          {/* Hero Architectural Image Panel */}
          <div className="lg:col-span-5 relative">
            <div className="border border-stone-200 p-2 bg-[#FFFFFF] rounded-2xl shadow-md overflow-hidden relative">
              <img 
                src="/solar_hero_premium.png" 
                alt={company.name}
                className="w-full h-[420px] object-cover rounded-xl"
              />
            </div>
            {/* Absolute overlapping card */}
            <div className="absolute -bottom-4 -left-4 bg-white border border-stone-200 p-4 rounded-2xl shadow-lg flex items-center gap-3 max-w-[260px]">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                <img src="/pm-surya-ghar.png" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <span className="text-[8px] font-bold text-[#E8963C] block uppercase tracking-wider font-sans">Live Deployment</span>
                <span className="text-xs font-bold text-[#1A1A1A] block font-sans">15-30 Day Rapid Setups</span>
              </div>
            </div>
            {/* Absolute decoration */}
            <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b border-r border-[#E8963C]/50 pointer-events-none" />
            <div className="absolute -top-6 -left-6 w-12 h-12 border-t border-l border-[#E8963C]/50 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Partner Logo Strip */}
      <section className="py-6 bg-[#FFFFFF] border-b border-stone-200 overflow-hidden">
        <div className="container-custom flex flex-wrap justify-around items-center gap-8 max-w-4xl opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-xs font-bold text-stone-600 uppercase tracking-widest font-sans">⚡ DISCOM Net-Metering</span>
          <span className="text-xs font-bold text-stone-600 uppercase tracking-widest font-sans">🏛️ MNRE Approved</span>
          <span className="text-xs font-bold text-stone-600 uppercase tracking-widest font-sans">💰 BuildBharat Loans</span>
          <span className="text-xs font-bold text-stone-600 uppercase tracking-widest font-sans">🛡️ RBI Compliant</span>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-[#1A1A1A] text-[#F7F5F0] relative overflow-hidden text-left border-b border-stone-800">
        <div className="container-custom max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* List content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8963C] block font-sans">A BETTER LIFE</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold heading-font uppercase tracking-wide">
                The Benefits Of<br />Going Solar With {company.name}
              </h2>
              <div className="w-12 h-0.5 bg-[#E8963C] mt-4" />
            </div>

            <div className="space-y-6">
              {[
                { title: "Significant Cost Savings", desc: "Reduce your monthly utility electricity bills by up to 70% or more immediately.", icon: <Coins size={20} /> },
                { title: "Energy Independence", desc: "Shield your corporate facility or private home from grid outages and rising tariffs.", icon: <Zap size={20} /> },
                { title: "Eco-Friendly Solution", desc: "Lower carbon emissions and demonstrate active environmental responsibility.", icon: <Leaf size={20} /> },
                { title: "Increased Property Value", desc: "Rooftops and industrial parks with solar arrays command premium valuation rates.", icon: <Building2 size={20} /> }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="p-2 bg-[#E8963C]/10 border border-[#E8963C]/20 text-[#E8963C] rounded-xl inline-block mt-1">
                    {item.icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#F7F5F0] uppercase tracking-wide heading-font">{item.title}</h4>
                    <p className="text-stone-400 text-xs sm:text-sm mt-0.5 leading-relaxed font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo side panel */}
          <div className="lg:col-span-5 relative">
            <div className="border border-stone-850 p-2 bg-[#1A1A1A] rounded-2xl shadow-xl">
              <img 
                src="/solar-panels.png" 
                alt="Solar Panel Installation"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#E8963C] text-[#1A1A1A] px-4 py-2.5 rounded-xl text-xs font-bold font-sans shadow-lg">
              62k Tons CO₂ Prevented
            </div>
          </div>
        </div>
      </section>

      {/* PM Surya Ghar Scheme Section */}
      <section className="py-16 md:py-20 bg-white border-b border-stone-200 text-left relative">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left side: Text details (7 columns on desktop) */}
            <div className="lg:col-span-7 border-l-4 border-[#E8963C] pl-6 md:pl-8 space-y-6">
              
              {/* Official Authority Badge and Labels */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-lg border border-stone-250 p-1.5 flex-shrink-0 flex items-center justify-center shadow-sm">
                  <img src="/pm-surya-ghar.png" alt="PM Surya Ghar Emblem" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="text-left font-sans">
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">Authority Signal</span>
                  <span className="text-xs font-extrabold text-[#10367D] block">Govt. of India · MNRE</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2">
                  <span className="bg-stone-100 text-[#E8963C] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-stone-200 font-sans">
                    Government scheme · MNRE-backed
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold heading-font uppercase tracking-wide text-stone-900 leading-tight">
                  PM Surya Ghar: Muft Bijli Yojana
                </h2>
                <p className="text-stone-600 text-sm sm:text-base max-w-xl font-sans leading-relaxed">
                  India's flagship residential rooftop solar scheme, launched in February 2024 with a target of one crore households by March 2027.
                </p>
              </div>

              {/* Sleek Features inside the left block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-white border border-[#10367D]/10 p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#E8963C]/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                  <span className="text-[#E8963C] text-[10px] font-extrabold uppercase tracking-widest block mb-2 font-sans relative z-10">Net Metering</span>
                  <span className="text-xl sm:text-2xl font-extrabold heading-font tracking-tight text-[#10367D] block mb-1 relative z-10">Up to 300 Units Free</span>
                  <p className="text-stone-500 text-[11px] leading-relaxed font-sans relative z-10">Dramatically reduce or completely eliminate your monthly grid electricity bills.</p>
                </div>
                <div className="bg-gradient-to-br from-[#10367D] to-[#0A2254] border border-[#10367D]/20 p-5 rounded-2xl shadow-[0_8px_30px_rgb(16,54,125,0.12)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                  <span className="text-white/60 text-[10px] font-extrabold uppercase tracking-widest block mb-2 font-sans relative z-10">Govt Backed</span>
                  <span className="text-xl sm:text-2xl font-extrabold heading-font tracking-tight text-white block mb-1 relative z-10">Direct Bank Transfer</span>
                  <p className="text-white/70 text-[11px] leading-relaxed font-sans relative z-10">Streamlined MNRE processing with direct deposit straight to your account.</p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex items-center">
                <button
                  onClick={onOpenPartnerModal}
                  className="bg-[#10367D] hover:bg-[#0A2254] text-white text-[11px] font-bold uppercase tracking-widest px-8 py-3.5 rounded-full cursor-pointer transition-all border-none font-sans shadow-md hover:shadow-lg flex items-center gap-2 group"
                >
                  <span>Request Free Site Assessment</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Right side: Large PM Modi / Scheme Image (5 columns on desktop) */}
            <div className="lg:col-span-5 relative w-full h-full min-h-[300px] flex items-center justify-center">
              <div className="border border-stone-200 p-2 bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-[400px]">
                <img 
                  src="/pm-modi-solar.png" 
                  alt="PM Surya Ghar Muft Bijli Yojana Banner featuring PM Narendra Modi"
                  className="w-full h-auto rounded-xl object-cover" 
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Case Studies / Projects Section */}
      <section className="py-16 md:py-20 bg-[#F7F5F0] text-[#1A1A1A] relative text-left border-b border-stone-200">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8963C] block font-sans">PORTFOLIO SHOTS</span>
            <h2 className="text-2xl md:text-4xl font-extrabold heading-font uppercase tracking-wide text-center">
              Our Completed Projects
            </h2>
            <div className="w-12 h-px bg-[#E8963C] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Numbered expandable list */}
            <div className="lg:col-span-6 space-y-4">
              {solarProjects.map((proj, idx) => {
                const isActive = activeProjectIdx === idx;
                return (
                  <div 
                    key={idx}
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-white border-[#E8963C] shadow-sm' 
                        : 'bg-transparent border-stone-200/60 hover:border-[#E8963C]/50 hover:bg-white/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 select-none">
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Typographically native capacity badge carrying real engineering data */}
                        <span className={`font-mono text-xs font-extrabold tracking-tight px-2.5 py-1 rounded border min-w-[80px] text-center transition-colors ${
                          isActive 
                            ? 'bg-[#E8963C]/10 border-[#E8963C]/30 text-[#E8963C]' 
                            : 'bg-stone-100 border-stone-200 text-stone-600'
                        }`}>
                          {proj.capacity}
                        </span>
                        
                        {/* Title: Clickable target with weight/color shift on hover */}
                        <h4 className={`font-bold text-sm sm:text-base text-stone-900 transition-colors tracking-wide heading-font uppercase truncate hover:text-[#E8963C] ${
                          isActive ? 'text-[#E8963C] font-extrabold' : ''
                        }`}>
                          {proj.title}
                        </h4>
                      </div>
                      
                      {/* Tailored SVG Chevron instead of default emoji/triangle disclosure carets */}
                      <span className="flex-shrink-0">
                        <svg 
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            isActive ? 'rotate-180 text-[#E8963C]' : 'text-stone-400'
                          }`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor" 
                          strokeWidth="3"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </span>
                    </div>
                    {isActive && (
                      <div className="mt-3.5 pl-[96px] space-y-2 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed transition-all">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Location:</span>
                          <span className="font-semibold text-stone-700 text-xs">{proj.location}</span>
                        </div>
                        <p className="text-stone-500 font-normal leading-relaxed">{proj.desc}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Big Active Image Panel */}
            <div className="lg:col-span-6 relative">
              <div className="border border-stone-200 p-2 bg-white rounded-2xl shadow-xl overflow-hidden relative">
                <img 
                  src={solarProjects[activeProjectIdx].image} 
                  alt={solarProjects[activeProjectIdx].title}
                  className="w-full h-80 object-cover rounded-xl"
                />
                
                {/* Expandable active image tags */}
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                  {solarProjects[activeProjectIdx].tags.map((tag, tIdx) => (
                    <span key={tIdx} className="bg-black/60 text-[#F7F5F0] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg backdrop-blur-sm shadow-sm border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 bg-[#F7F5F0] text-[#1A1A1A] text-left border-b border-stone-200">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8963C] block font-sans">OUR MOTORS</span>
            <h2 className="text-2xl md:text-4xl font-extrabold heading-font uppercase tracking-wide text-center">
              Our Values At {company.name}
            </h2>
            <div className="w-12 h-px bg-[#E8963C] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Innovation", desc: "Integrating smart microgrids, IoT tracking, and latest monocrystalline PV technologies for maximum grid yield.", icon: <Lightbulb size={20} className="text-[#E8963C]" /> },
              { title: "Sustainability", desc: "Committed to lowering carbon emissions and using recyclable eco-friendly components across our systems.", icon: <Leaf size={20} className="text-[#E8963C]" /> },
              { title: "Customer Commitment", desc: "Offering robust 25-year panel performance warranties, live remote app logs, and prompt maintenance support.", icon: <ShieldCheck size={20} className="text-[#E8963C]" /> }
            ].map((val, idx) => (
              <div key={idx} className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <span className="p-2 bg-[#E8963C]/10 border border-[#E8963C]/20 text-[#E8963C] rounded-xl inline-block">{val.icon}</span>
                <h4 className="font-extrabold text-sm sm:text-base text-[#1A1A1A] uppercase tracking-wide heading-font">{val.title}</h4>
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-sans font-normal">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-20 bg-[#1A1A1A] text-[#F7F5F0] text-left">
        <div className="container-custom max-w-5xl space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8963C] block font-sans">PHOTO GALLERY</span>
            <h2 className="text-2xl md:text-4xl font-extrabold heading-font uppercase tracking-wide text-center">
              See The Power Of Solar In Action
            </h2>
            <div className="w-12 h-px bg-[#E8963C] mx-auto mt-3" />
            <p className="text-stone-400 text-xs sm:text-sm max-w-md mx-auto text-center font-sans">
              Explore our latest real installations, innovative designs, and high-efficiency systems across India.
            </p>
          </div>

          {/* Masonry-style Grid of 4-5 real installation photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-stone-800 h-64 group">
              <img src="/solar_hero_premium.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs font-bold uppercase tracking-wider font-sans text-white">Commercial Rooftop Grid</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-stone-800 h-64 group">
              <img src="/solar-panels.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs font-bold uppercase tracking-wider font-sans text-white">High Efficiency PV</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-stone-800 h-64 group">
              <img src="/inverters.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs font-bold uppercase tracking-wider font-sans text-white">Smart Hybrid Inverter</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-stone-800 h-64 group">
              <img src="/pm-surya-ghar.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs font-bold uppercase tracking-wider font-sans text-white">Residential Net Metering</span>
              </div>
            </div>
            <div className="lg:col-span-3 relative overflow-hidden rounded-2xl border border-stone-800 h-64 group">
              <img src="/acdb-dcdb.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs font-bold uppercase tracking-wider font-sans text-white">Distribution System</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const CompanyPage: React.FC<CompanyPageProps> = ({ category, onNavigate, onOpenPartnerModal }) => {
  const pillar = PILLAR_CATEGORIES[category];
  const company = pillar.companies[0];

  if (category === 'solar') {
    return (
      <SolarHomepage 
        onNavigate={onNavigate}
        onOpenPartnerModal={onOpenPartnerModal}
        company={company}
        pillar={pillar}
      />
    );
  }

  if (category === 'real-estate') {
    return (
      <RealEstateHomepage 
        onNavigate={onNavigate}
        onOpenPartnerModal={onOpenPartnerModal}
        company={company}
      />
    );
  }

  if (category === 'loans') {
    return (
      <LoansHomepage 
        onNavigate={onNavigate}
        onOpenPartnerModal={onOpenPartnerModal}
        company={company}
      />
    );
  }

 
  // Tailored aesthetic setup for each company
  const themes = {
    solar: {
      accentText: 'text-[#A5CEE0]',
      accentBg: 'bg-[#A5CEE0]/10',
      accentBorder: 'border-[#A5CEE0]/20',
      icon: <Sun className="text-[#A5CEE0]" size={28} />,
      heroImage: '/solar_hero_premium.png',
      badgeColor: 'border-[#A5CEE0]/30 text-[#A5CEE0] bg-[#A5CEE0]/10',
      taglineColor: 'text-[#A5CEE0]'
    },
    loans: {
      accentText: 'text-[#80B5CE]',
      accentBg: 'bg-[#80B5CE]/10',
      accentBorder: 'border-[#80B5CE]/20',
      icon: <Coins className="text-[#80B5CE]" size={28} />,
      heroImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
      badgeColor: 'border-[#80B5CE]/30 text-[#80B5CE] bg-[#80B5CE]/10',
      taglineColor: 'text-[#80B5CE]'
    },
    'real-estate': {
      accentText: 'text-[#5A9CBE]',
      accentBg: 'bg-[#5A9CBE]/10',
      accentBorder: 'border-[#5A9CBE]/20',
      icon: <Building2 className="text-[#5A9CBE]" size={28} />,
      heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      badgeColor: 'border-[#5A9CBE]/30 text-[#5A9CBE] bg-[#5A9CBE]/10',
      taglineColor: 'text-[#5A9CBE]'
    },
    education: {
      accentText: 'text-[#3B7E9F]',
      accentBg: 'bg-[#3B7E9F]/10',
      accentBorder: 'border-[#3B7E9F]/20',
      icon: <GraduationCap className="text-[#3B7E9F]" size={28} />,
      heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      badgeColor: 'border-[#3B7E9F]/30 text-[#3B7E9F] bg-[#3B7E9F]/10',
      taglineColor: 'text-[#3B7E9F]'
    }
  };
 
  const currentTheme = themes[category];
  const otherPillars = Object.values(PILLAR_CATEGORIES).filter((p) => p.id !== category);
 
  // Dynamic description mapper for capability cards
  const getCapabilityDescription = (serviceName: string) => {
    const descMap: Record<string, string> = {
      // Solar pillar
      "Rooftop Solar Solutions": "Custom-designed rooftop systems for homes, sized to your energy needs and roof space.",
      "Commercial Energy Audits": "Large-scale rooftop and ground-mounted systems to cut operational energy costs for businesses.",
      "Microgrid & Battery Storage": "Battery storage integration for uninterrupted power and maximum energy independence.",
      "Solar Farm Development": "Ground-mounted solar farms for large energy demands, built to grid-connection standards.",
      // Loans pillar
      "MSME Business Capital": "Working capital and expansion loans for small and medium businesses, with flexible collateral options.",
      "Green Infrastructure Loans": "Financing for solar installations and sustainable infrastructure projects, aligned with BuildBharat Solar.",
      "Residential Home Mortgages": "Home loans for individual buyers and developers, with competitive rates and fast approval.",
      "Skill Education Financing": "Education loans covering tuition and certification costs for BuildBharat EduTech programs and beyond.",
      // Real Estate pillar
      "Strategic Industrial Parks": "Custom built-to-suit manufacturing facilities and warehousing units located near prime logistics hubs.",
      "Commercial IT Complexes": "Modern green corporate offices and software parks built using sustainable materials and energy grids.",
      "Residential Gated Communities": "Premium eco-friendly luxury residential towers and villaments developed using carbon-neutral technologies.",
      "Asset Acquisition Advisory": "Vetted real estate consulting helping global investment groups buy, develop, or lease key assets in South India.",
      // EdTech pillar
      "Software Development Cohorts": "Immersive coding bootcamps covering modern web architectures, cloud operations, and software engineering.",
      "Clean Energy Operations Training": "Vocational certifications training engineering graduates to design, install, and audit utility-scale solar PV grids.",
      "Financial Modeling Certifications": "Specialized curriculum for corporate loans modeling, equity evaluation, and sustainable development finance.",
      "Corporate Recruitment Partnerships": "Placing pre-audited, highly capable skill cohorts straight into active production roles at corporate partner firms."
    };
    return descMap[serviceName] || "Fully integrated with Build Bharat operational standards to deliver maximum synergy value.";
  };
 
  // Dynamic overrides for metrics
  const getMetrics = () => {
    if ((category as string) === 'solar') {
      return [
        { label: 'Total Capacity', value: '45+ MWp Installed' },
        { label: 'Average Payback', value: '4-6 Year Payback' },
        { label: 'Fast Setup', value: '15-30 Day Setup' }
      ];
    }
    return company.metrics;
  };
 
  // Dynamic overrides for full description
  const getFullDescription = () => {
    if ((category as string) === 'solar') {
      return "BuildBharat Solar delivers custom high-yield solar PV installations across South India. We design, deploy, and commission residential rooftop systems, large-scale commercial & industrial rooftop plants, and utility-scale ground-mounted solar farms. In partnership with MNRE-approved manufacturers, we offer a comprehensive 25-year panel performance warranty and seamless grid connection.";
    }
    return company.fullDescription;
  };
 
  const isEducation = category === 'education';

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 selection:bg-[#D57530]/20 selection:text-stone-900 font-sans relative">
      <div className={isEducation ? "filter blur-[18px] select-none pointer-events-none" : ""}>
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
            <span className="hidden sm:inline">Ecosystem Member:</span>
            <span className="font-bold text-[#D57530]">{company.name}</span>
          </div>
        </div>
      </div>
 
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 border-b border-stone-200 overflow-hidden">
        {/* Background Subtle Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        
        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <img 
                src={company.logo} 
                alt={company.name} 
                className="h-20 w-auto object-contain bg-white p-2 rounded-2xl border border-stone-200 shadow-sm self-start" 
              />
              <div className="space-y-1.5">
                <span className={`badge-tag ${currentTheme.badgeColor} font-bold rounded-full inline-block`}>
                  {pillar.title}
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold heading-font tracking-wide leading-tight text-stone-900 uppercase">
                  {company.name}
                </h1>
              </div>
            </div>
            
            <p className={`text-sm sm:text-base font-semibold subheading-font tracking-normal ${currentTheme.taglineColor}`}>
              {company.tagline}
            </p>
            
            <p className="text-stone-750 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {getFullDescription()}
            </p>
 
            {/* Metric Board */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200 max-w-lg">
              {getMetrics().map((m, idx) => (
                <div key={idx} className="bg-stone-50 border border-stone-200 p-4 rounded-xl text-center shadow-sm relative">
                  <span className="block text-xl sm:text-2xl font-bold heading-font text-stone-900 leading-none mb-1 uppercase tracking-tight" style={{ color: pillar.accentColor }}>
                    {m.value}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-stone-500 tracking-widest block subheading-font">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
 
            {/* Trust and Certifications Disclosures */}
            {(category as string) === 'solar' && (
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#D57530] bg-[#D57530]/5 px-3 py-1.5 border border-[#D57530]/10 rounded-xl shadow-sm">
                  MNRE Empanelled Class-A Partner
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-3 py-1.5 border border-stone-200 rounded-xl shadow-sm">
                  ISO 9001 & 14001 Certified
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-3 py-1.5 border border-stone-200 rounded-xl shadow-sm">
                  DISCOM Net-Metering Approved
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-3 py-1.5 border border-stone-200 rounded-xl shadow-sm">
                  PM Surya Ghar Subsidy Vetted (DBT)
                </span>
              </div>
            )}
 
            {(category as string) === 'loans' && (
              <div className="pt-2">
                <p className="text-[10px] uppercase tracking-widest text-[#D57530] font-extrabold bg-[#D57530]/5 px-3.5 py-2 border border-[#D57530]/10 rounded-xl inline-flex items-center gap-1.5 select-none shadow-sm font-sans">
                  <ShieldCheck size={14} className="text-[#D57530]" />
                  <span>In partnership with RBI-registered NBFC partners</span>
                </p>
              </div>
            )}
 
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
               <button 
                 onClick={onOpenPartnerModal}
                 className="btn-gold justify-center rounded-full px-5 py-2.5 flex items-center gap-1.5 cursor-pointer text-xs uppercase tracking-wider font-bold"
               >
                 <span>Partner With Us</span>
                 <ArrowRight size={14} />
               </button>
            </div>
          </div>
 
          {/* Hero Architectural Image Panel (Right 5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="border border-stone-200 p-2 bg-[#FFFFFF] rounded-xl shadow-sm">
              <img 
                src={currentTheme.heroImage} 
                alt={company.name}
                className="w-full h-80 object-cover rounded-lg filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Absolute Decorative Line */}
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b border-l border-[#D57530]/50 pointer-events-none" />
            <div className="absolute -top-4 -right-4 w-12 h-12 border-t border-r border-[#D57530]/50 pointer-events-none" />
          </div>
        </div>
      </section>
 
      {/* Government Initiative Spotlight Section */}
      {(category as string) === 'solar' && <GovernmentInitiativeSection />}
 
      {/* Solar Journey 4-Steps Flow Section */}
      {(category as string) === 'solar' && <JourneySection />}
 
      {/* Premium Solar Components Section */}
      {(category as string) === 'solar' && <SolarComponentsSection />}
 
      {/* Solar Testimonials Section */}
      {(category as string) === 'solar' && <SolarTestimonialsSection />}
 
      {/* Dynamic Sizing / Planning Section */}
      {((category as string) === 'loans' || (category as string) === 'solar') && (
        <section className="py-12 bg-[#FAF9F6]">
          <div className="container-custom max-w-4xl">
            {(category as string) === 'loans' && <EmiCalculator />}
            {(category as string) === 'solar' && <SolarSavingsCalculator />}
          </div>
        </section>
      )}
 
      {/* 2. Loan Parameters Grid (Condition for Loans page) */}
      {(category as string) === 'loans' && (
        <section className="py-12 bg-[#FAF9F6] border-b border-stone-200 text-left">
          <div className="container-custom max-w-4xl">
            <div className="text-center mb-12 space-y-2">
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#D57530] block subheading-font">CREDIT METRICS</span>
              <h2 className="text-2xl md:text-3xl font-extrabold heading-font uppercase tracking-wider text-stone-900">
                Loan Parameters & Terms
              </h2>
              <div className="w-12 h-px bg-[#D57530] mx-auto mt-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between h-44">
                <div>
                  <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center mb-4 text-[#10367D]">
                    <Percent size={18} />
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500 font-sans">Credit Limits</h4>
                  <p className="text-xl font-extrabold heading-font text-stone-900 uppercase tracking-tight mt-1">₹1L – ₹5 Crore</p>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-stone-450">Competitive Rate starting at 9.5%</span>
              </div>
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between h-44">
                <div>
                  <div className="w-9 h-9 bg-orange-50 border border-orange-100 rounded-lg flex items-center justify-center mb-4 text-[#D57530]">
                    <Calendar size={18} />
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500 font-sans">Flexible Tenures</h4>
                  <p className="text-xl font-extrabold heading-font text-stone-900 uppercase tracking-tight mt-1">6 Months – 5 Yrs</p>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-stone-450">Structured custom repayment modes</span>
              </div>
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between h-44">
                <div>
                  <div className="w-9 h-9 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
                    <ShieldCheck size={18} />
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500 font-sans">Eligibility</h4>
                  <p className="text-xl font-extrabold heading-font text-stone-900 uppercase tracking-tight mt-1">Credit Score 680+</p>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-stone-450">Salaried / Self-Employed Applicants</span>
              </div>
            </div>
          </div>
        </section>
      )}
 
      {/* 3. Document Checklist Section (Condition for Loans page) */}
      {(category as string) === 'loans' && (
        <section className="py-12 bg-[#FFFFFF] border-b border-stone-200 text-left">
          <div className="container-custom max-w-3xl">
            <div className="text-center mb-12 space-y-2">
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#D57530] block subheading-font">REQUIRED DOCUMENTS</span>
              <h2 className="text-2xl md:text-3xl font-extrabold heading-font uppercase tracking-wider text-stone-900">
                Application Checklist
              </h2>
              <div className="w-12 h-px bg-[#D57530] mx-auto mt-3" />
            </div>
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              {[
                { title: 'PAN Card', desc: 'Personal PAN card of the applicant/directors and corporate PAN card for enterprises.' },
                { title: 'Aadhaar Card', desc: 'Valid identity and residence proof for verifying credit profiles.' },
                { title: 'Bank Account Statements', desc: 'Latest 6 months statements of the main operating bank account.' },
                { title: 'ITR & Income Proof', desc: 'Income tax filings (last 2 years) or audited balance sheet for corporate lines.' }
              ].map((doc, idx) => (
                <div key={idx} className="flex items-start gap-3.5 pb-4 border-b border-stone-200/50 last:border-b-0 last:pb-0">
                  <span className="p-1 bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-lg shrink-0 mt-0.5">
                    <CheckCircle2 size={16} />
                  </span>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wide subheading-font">{doc.title}</h4>
                    <p className="text-stone-550 text-xs mt-0.5 leading-relaxed font-sans">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
 
 
 
      </div>

      {/* Coming Soon Overlay */}
      {isEducation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/70 backdrop-blur-[12px] p-6 animate-fadeIn">
          <div className="text-center max-w-sm w-full px-6 py-10 bg-white border border-[#EBE6DD] rounded-3xl shadow-xl flex flex-col items-center">
            <img 
              src="/build-bharat-education.png" 
              alt="BuildBharat EduTech Logo" 
              className="h-20 w-auto object-contain mb-5" 
            />
            <div className="text-sm font-extrabold text-[#1F1D1A] tracking-[0.25em] uppercase mb-1">
              BuildBharat EduTech
            </div>
            <div className="text-[9px] text-[#6E6A61] uppercase tracking-[0.2em] font-medium mb-6">
              Ecosystem Partner
            </div>
            <div className="text-xl font-extrabold text-[#10367D] tracking-[0.2em] uppercase heading-font mb-2">
              Launching Soon
            </div>
            <p className="text-[#6E6A61] text-[11px] tracking-wide leading-relaxed font-sans max-w-[250px] font-normal mb-8">
              We're building something great — check back soon.
            </p>
            <button 
              onClick={() => onNavigate('/')}
              className="px-6 py-2.5 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default CompanyPage;
