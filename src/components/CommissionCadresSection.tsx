import React, { useState } from 'react';
import { submitToFirestore } from '../lib/firebase';
import { 
  TrendingUp, 
  Award, 
  FileText, 
  Download, 
  Eye, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Coins, 
  Users, 
  ChevronRight, 
  X, 
  Phone, 
  User, 
  Printer, 
  Info,
  ChevronLeft,
  Percent,
  Loader2
} from 'lucide-react';

export interface CadreItem {
  cadre: string;
  cadreNumber: number;
  di: string;
  percentageFormatted: string;
  amountFormatted: string;
  amount: number;
  category: 'direct' | 'prime' | 'growth' | 'scale';
  notes: string;
}

export const CADRE_DATA: CadreItem[] = [
  { cadre: "REFERAL & 1", cadreNumber: 1, di: "—", percentageFormatted: "20%", amountFormatted: "₹1,000", amount: 1000, category: "direct", notes: "Direct referral bonus on every direct member onboarding" },
  { cadre: "Cadre 2", cadreNumber: 2, di: "1", percentageFormatted: "5%", amountFormatted: "₹250", amount: 250, category: "prime", notes: "Requires 1 Direct Introduction" },
  { cadre: "Cadre 3", cadreNumber: 3, di: "1", percentageFormatted: "5%", amountFormatted: "₹250", amount: 250, category: "prime", notes: "Requires 1 Direct Introduction" },
  { cadre: "Cadre 4", cadreNumber: 4, di: "2", percentageFormatted: "4%", amountFormatted: "₹200", amount: 200, category: "prime", notes: "Requires 2 Direct Introductions" },
  { cadre: "Cadre 5", cadreNumber: 5, di: "2", percentageFormatted: "4%", amountFormatted: "₹200", amount: 200, category: "prime", notes: "Requires 2 Direct Introductions" },
  { cadre: "Cadre 6", cadreNumber: 6, di: "2", percentageFormatted: "4%", amountFormatted: "₹200", amount: 200, category: "growth", notes: "Requires 2 Direct Introductions" },
  { cadre: "Cadre 7", cadreNumber: 7, di: "3", percentageFormatted: "2%", amountFormatted: "₹100", amount: 100, category: "growth", notes: "Requires 3 Direct Introductions" },
  { cadre: "Cadre 8", cadreNumber: 8, di: "3", percentageFormatted: "2%", amountFormatted: "₹100", amount: 100, category: "growth", notes: "Requires 3 Direct Introductions" },
  { cadre: "Cadre 9", cadreNumber: 9, di: "3", percentageFormatted: "2%", amountFormatted: "₹100", amount: 100, category: "growth", notes: "Requires 3 Direct Introductions" },
  { cadre: "Cadre 10", cadreNumber: 10, di: "3", percentageFormatted: "2%", amountFormatted: "₹100", amount: 100, category: "growth", notes: "Requires 3 Direct Introductions" },
  { cadre: "Cadre 11", cadreNumber: 11, di: "4", percentageFormatted: "1%", amountFormatted: "₹100", amount: 100, category: "growth", notes: "Requires 4 Direct Introductions" },
  { cadre: "Cadre 12", cadreNumber: 12, di: "4", percentageFormatted: "1%", amountFormatted: "₹100", amount: 100, category: "growth", notes: "Requires 4 Direct Introductions" },
  { cadre: "Cadre 13", cadreNumber: 13, di: "4", percentageFormatted: "1%", amountFormatted: "₹50", amount: 50, category: "scale", notes: "Requires 4 Direct Introductions" },
  { cadre: "Cadre 14", cadreNumber: 14, di: "4", percentageFormatted: "1%", amountFormatted: "₹50", amount: 50, category: "scale", notes: "Requires 4 Direct Introductions" },
  { cadre: "Cadre 15", cadreNumber: 15, di: "4", percentageFormatted: "1%", amountFormatted: "₹50", amount: 50, category: "scale", notes: "Requires 4 Direct Introductions" },
  { cadre: "Cadre 16", cadreNumber: 16, di: "5", percentageFormatted: "0.6%", amountFormatted: "₹50", amount: 50, category: "scale", notes: "Requires 5 Direct Introductions" },
  { cadre: "Cadre 17", cadreNumber: 17, di: "5", percentageFormatted: "0.6%", amountFormatted: "₹50", amount: 50, category: "scale", notes: "Requires 5 Direct Introductions" },
  { cadre: "Cadre 18", cadreNumber: 18, di: "5", percentageFormatted: "0.6%", amountFormatted: "₹30", amount: 30, category: "scale", notes: "Requires 5 Direct Introductions" },
  { cadre: "Cadre 19", cadreNumber: 19, di: "5", percentageFormatted: "0.6%", amountFormatted: "₹30", amount: 30, category: "scale", notes: "Requires 5 Direct Introductions" },
  { cadre: "Cadre 20", cadreNumber: 20, di: "5", percentageFormatted: "0.6%", amountFormatted: "₹30", amount: 30, category: "scale", notes: "Requires 5 Direct Introductions" },
];

export const SPECIAL_SUMMARY = [
  { label: "Cadres 2–20 Multi-Tier Pool", di: "1 to 5 Directs", percent: "38%", amount: "₹1,900", highlight: false },
  { label: "FRANCHISE COMMISSION", di: "Franchise Partner", percent: "10%", amount: "₹500", highlight: false },
  { label: "LOYALTY POOL", di: "Active Member Status", percent: "2%", amount: "₹100", highlight: false },
  { label: "TOTAL ECOSYSTEM POOL", di: "50% of ₹5,000 Fee", percent: "50%", amount: "₹2,500", highlight: true },
];

interface CommissionCadresSectionProps {
  onOpenPartnerModal: () => void;
}

export const CommissionCadresSection: React.FC<CommissionCadresSectionProps> = ({ onOpenPartnerModal }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'prime' | 'growth' | 'scale'>('all');
  const [referralCount, setReferralCount] = useState<number>(5);
  
  // Lead Gate Modal & Document Viewer States
  const [isLeadGateOpen, setIsLeadGateOpen] = useState<boolean>(false);
  const [isDocViewerOpen, setIsDocViewerOpen] = useState<boolean>(false);
  const [docCurrentPage, setDocCurrentPage] = useState<number>(1);
  const [leadName, setLeadName] = useState<string>('');
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [leadError, setLeadError] = useState<string>('');
  const [leadLoading, setLeadLoading] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return typeof window !== 'undefined' && !!localStorage.getItem('bbsp_cadre_unlocked');
  });

  // Filtered Cadres
  const filteredCadres = CADRE_DATA.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'prime') return item.cadreNumber <= 5;
    if (activeTab === 'growth') return item.cadreNumber >= 6 && item.cadreNumber <= 12;
    if (activeTab === 'scale') return item.cadreNumber >= 13;
    return true;
  });

  // Calculator estimations
  const directIncome = referralCount * 1000;
  // Estimate secondary team referrals (assuming an average multiplier of 2 referrals from Cadres 2-3)
  const estimatedDownlineReferrals = referralCount * 2;
  const estimatedCadre23Income = estimatedDownlineReferrals * 250;
  const totalProjectedIncome = directIncome + estimatedCadre23Income;

  const handleDocumentAccessClick = () => {
    if (isUnlocked) {
      setIsDocViewerOpen(true);
    } else {
      setIsLeadGateOpen(true);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim()) {
      setLeadError('Please enter your full name');
      return;
    }
    const cleanPhone = leadPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setLeadError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLeadLoading(true);

    const leadRecord = {
      formType: 'commission-cadre-pdf-download',
      category: 'document-download',
      fullName: leadName.trim(),
      phone: cleanPhone,
      email: `lead.${cleanPhone}@buildbharatsp.com`,
      businessName: 'Individual Lead',
      source: '20 Cadres Commission Structure PDF Download',
      requestedDocument: 'BuildBharat 20 Cadres Commission Structure',
      status: 'Document Downloaded',
      timestamp: new Date().toLocaleDateString('en-GB'),
      unlockedAt: new Date().toISOString()
    };

    // 1. Submit to Firebase Firestore (Admin Panel Collections)
    try {
      await submitToFirestore(leadRecord, 'submissions');
      await submitToFirestore(leadRecord, 'document_leads');
    } catch (dbErr) {
      console.warn('Firestore lead sync fallback', dbErr);
    }

    // 2. Submit to backend API for admin email dispatch
    try {
      fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadRecord),
      }).catch((apiErr) => console.warn('API lead dispatch error', apiErr));
    } catch (err) {
      console.warn('API fetch error', err);
    }

    // 3. Save lead record in localStorage for local admin panel & real-time sync
    try {
      const existingEnquiries = JSON.parse(localStorage.getItem('bbsp_enquiries') || '[]');
      localStorage.setItem('bbsp_enquiries', JSON.stringify([leadRecord, ...existingEnquiries]));

      const existingDocLeads = JSON.parse(localStorage.getItem('bbsp_document_leads') || '[]');
      localStorage.setItem('bbsp_document_leads', JSON.stringify([leadRecord, ...existingDocLeads]));

      localStorage.setItem('bbsp_cadre_unlocked', 'true');
      localStorage.setItem('bbsp_cadre_lead', JSON.stringify(leadRecord));
    } catch {
      // ignore local storage errors in private browsing
    }

    setLeadLoading(false);
    setIsUnlocked(true);
    setIsLeadGateOpen(false);
    setIsDocViewerOpen(true);
    setLeadError('');
  };

  const handlePrintDocument = () => {
    window.print();
  };

  return (
    <section id="commission-structure" className="py-20 bg-gradient-to-b from-[#FAF6EE] via-[#FDFBF7] to-[#F5EFE6] border-t border-b border-[#EBE6DD] relative overflow-hidden text-left">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#B08B54]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#10367D]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom max-w-7xl relative z-10 px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10367D]/10 border border-[#10367D]/20 text-[#10367D] text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
            <Coins size={14} className="text-[#D57530]" />
            <span>Official Partner Revenue Distribution</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1F1D1A] heading-font tracking-tight uppercase">
            Referral & 20 Cadres Commission
          </h2>
          <p className="text-[#6E6A61] text-sm sm:text-base mt-3 max-w-2xl mx-auto font-sans leading-relaxed">
            A transparent <strong>50% (₹2,500) ecosystem distribution</strong> on the ₹5,000 lifetime membership fee. Earn direct referral bonuses plus multi-tier overrides across 20 Cadres.
          </p>
        </div>

        {/* 3 Key Summary Pillars Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Direct Referral */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EBE6DD] shadow-lg hover:shadow-xl hover:border-[#10367D]/30 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#10367D]/10 text-[#10367D] flex items-center justify-center font-extrabold">
                  <TrendingUp size={24} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                  Instant Payout
                </span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Direct Referral & Cadre 1
              </span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl sm:text-4xl font-black text-[#10367D] heading-font">
                  ₹1,000
                </span>
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  20% per member
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Directly refer 5 members to recover 100% of your ₹5,000 membership fee immediately. Zero qualification threshold.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#10367D]">
              <span>Direct Introductions: None</span>
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
          </div>

          {/* Card 2: 20 Cadre Multi-Level Pool */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EBE6DD] shadow-lg hover:shadow-xl hover:border-[#10367D]/30 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#D57530]/10 text-[#D57530] flex items-center justify-center font-extrabold">
                  <Layers size={24} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                  Multi-Tier Growth
                </span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Cadres 2 to 20 Override Pool
              </span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl sm:text-4xl font-black text-[#10367D] heading-font">
                  ₹1,900
                </span>
                <span className="text-sm font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                  38% pool share
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unlock generational network earnings across 20 deep cadres with straightforward Direct Introduction (DI: 1 to 5) milestones.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#10367D]">
              <span>20 Levels Deep Override</span>
              <Sparkles size={16} className="text-[#D57530]" />
            </div>
          </div>

          {/* Card 3: Franchise & Loyalty Guarantee */}
          <div className="bg-gradient-to-br from-[#0B2147] to-[#10367D] text-white rounded-3xl p-6 sm:p-7 border border-blue-900/50 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-amber-300 flex items-center justify-center font-extrabold">
                  <Award size={24} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-white/15 text-amber-200 rounded-full border border-white/20">
                  Franchise & Loyalty
                </span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/70 block mb-1">
                Franchise (10%) + Loyalty (2%)
              </span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl sm:text-4xl font-black text-white heading-font">
                  ₹600
                </span>
                <span className="text-xs font-bold text-amber-300 bg-white/10 px-2 py-0.5 rounded-md">
                  12% Pool
                </span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                ₹500 franchise hub credit plus ₹100 loyalty pool, backed by a <strong>100% ₹5,000 refund policy</strong> after 5 years if zero income.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-300">
              <span>5-Year Zero-Risk Refund</span>
              <ShieldCheck size={16} className="text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Two-Column Interactive Hub: Interactive Table & Earning Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* LEFT: 20 Cadres Matrix Table (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-7 border border-[#EBE6DD] shadow-lg">
            
            {/* Table Controls Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-extrabold text-[#10367D] heading-font uppercase">
                  Cadre Breakdown Matrix
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  DI = Direct Introductions required to unlock payout
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl text-[10px] sm:text-[11px] font-bold">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'all' 
                      ? 'bg-[#10367D] text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All (1–20)
                </button>
                <button
                  onClick={() => setActiveTab('prime')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'prime' 
                      ? 'bg-[#10367D] text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Prime (1–5)
                </button>
                <button
                  onClick={() => setActiveTab('growth')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'growth' 
                      ? 'bg-[#10367D] text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Growth (6–12)
                </button>
                <button
                  onClick={() => setActiveTab('scale')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'scale' 
                      ? 'bg-[#10367D] text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Scale (13–20)
                </button>
              </div>
            </div>

            {/* Matrix Table List (Scrollable) */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Cadre Tier</th>
                    <th className="py-3 px-3 text-center">D.I Required</th>
                    <th className="py-3 px-3 text-right">Commission %</th>
                    <th className="py-3 px-3 text-right">Payout (Amt)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCadres.map((item) => (
                    <tr 
                      key={item.cadreNumber}
                      className={`hover:bg-slate-50 transition-colors ${
                        item.cadreNumber === 1 ? 'bg-amber-50/50 font-bold' : ''
                      }`}
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${
                            item.cadreNumber === 1 
                              ? 'bg-[#10367D] text-white' 
                              : item.cadreNumber <= 5 
                              ? 'bg-[#10367D]/10 text-[#10367D]' 
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {item.cadreNumber}
                          </span>
                          <span className="font-bold text-slate-900">{item.cadre}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.di === '—' 
                            ? 'bg-slate-100 text-slate-500' 
                            : 'bg-blue-50 text-[#10367D] border border-blue-200'
                        }`}>
                          {item.di === '—' ? 'None' : `DI: ${item.di}`}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-700">
                        {item.percentageFormatted}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-extrabold text-[#10367D]">
                        {item.amountFormatted}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Special Pool Footnotes */}
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Cadres 2–20 Total</span>
                <span className="font-bold text-slate-900">38% (₹1,900)</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Franchise Pool</span>
                <span className="font-bold text-slate-900">10% (₹500)</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 col-span-2 sm:col-span-1">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Loyalty Pool</span>
                <span className="font-bold text-slate-900">2% (₹100)</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Earnings Simulator & Document Download Gate (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Interactive Calculator Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EBE6DD] shadow-lg">
              <div className="flex items-center gap-2 text-[#10367D] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles size={16} className="text-[#D57530]" />
                <span>Instant Earnings Simulator</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 heading-font uppercase mb-4">
                Calculate Potential Payout
              </h3>

              {/* Slider Control */}
              <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 font-bold">Direct Referrals (Cadre 1):</span>
                  <span className="text-base font-black text-[#10367D] bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs font-mono">
                    {referralCount} Partners
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={referralCount}
                  onChange={(e) => setReferralCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#10367D]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>1 Member</span>
                  <span>15 Members</span>
                  <span>30+ Members</span>
                </div>
              </div>

              {/* Real-Time Calculation Breakdown */}
              <div className="space-y-3 pb-5 border-b border-slate-100 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <Users size={14} className="text-slate-400" />
                    <span>Direct Referral Income ({referralCount} × ₹1,000):</span>
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    ₹{directIncome.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <Layers size={14} className="text-slate-400" />
                    <span>Estimated Cadre 2–3 Override (~{estimatedDownlineReferrals} downline):</span>
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    ₹{estimatedCadre23Income.toLocaleString()}
                  </span>
                </div>

                <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900">
                    Total Estimated Return:
                  </span>
                  <span className="text-xl font-black text-emerald-700 font-mono">
                    ₹{totalProjectedIncome.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Partner CTA */}
              <div className="mt-5">
                <button
                  onClick={onOpenPartnerModal}
                  className="btn-gold w-full py-3.5 rounded-2xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] transition-transform"
                >
                  <span>Activate Partner Account (₹5,000)</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Document Download & View Card (Gated) */}
            <div className="bg-gradient-to-br from-[#10367D] to-[#0A2250] text-white rounded-3xl p-6 sm:p-7 border border-blue-900/60 shadow-xl relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300">
                  <FileText size={24} />
                </div>
                {isUnlocked ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-400/30 flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>Access Unlocked</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full border border-amber-300/30 flex items-center gap-1">
                    <Lock size={12} />
                    <span>Free PDF Access</span>
                  </span>
                )}
              </div>

              <h4 className="text-lg font-extrabold text-white heading-font uppercase mb-1">
                Official Commission PDF (3 Pages)
              </h4>
              <p className="text-xs text-white/80 leading-relaxed mb-5">
                View or download the full verified <strong>Referral & 20 Cadres Commission Structure</strong> document. Enter your name & WhatsApp number to view.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDocumentAccessClick}
                  className="flex-1 bg-white text-[#10367D] hover:bg-amber-400 hover:text-slate-900 text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Eye size={15} />
                  <span>{isUnlocked ? 'View Official PDF' : 'Unlock & View PDF'}</span>
                </button>
                <button
                  onClick={handleDocumentAccessClick}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/20"
                >
                  <Download size={15} />
                  <span>Download</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* LEAD GATE MODAL — Collects Name & Phone to unlock document */}
      {isLeadGateOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div 
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsLeadGateOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-scaleUp p-6 sm:p-8">
            
            {/* Close Button */}
            <button
              onClick={() => setIsLeadGateOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors cursor-pointer bg-transparent border-none"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#10367D]/10 text-[#10367D] flex items-center justify-center mx-auto mb-3">
                <FileText size={28} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D57530] block mb-1">
                Verified Document Access
              </span>
              <h3 className="text-xl font-extrabold text-[#10367D] heading-font uppercase">
                Unlock Official Commission Structure
              </h3>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Please provide your contact details to view and download the official 3-page 20 Cadres document instantly.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLeadSubmit} className="space-y-4 text-left">
              {leadError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-semibold">
                  {leadError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => {
                      setLeadName(e.target.value);
                      if (leadError) setLeadError('');
                    }}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 text-stone-900 text-xs focus:ring-2 focus:ring-[#10367D] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  WhatsApp / Mobile Number *
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={leadPhone}
                    onChange={(e) => {
                      setLeadPhone(e.target.value.replace(/\D/g, ''));
                      if (leadError) setLeadError('');
                    }}
                    placeholder="10-digit mobile number"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 text-stone-900 text-xs focus:ring-2 focus:ring-[#10367D] focus:border-transparent outline-none transition-all font-mono"
                  />
                </div>
                <span className="text-[10px] text-stone-400 mt-1 block">
                  A verification copy can also be sent to your WhatsApp.
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={leadLoading}
                  className="btn-gold w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-75"
                >
                  {leadLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Verifying & Unlocking...</span>
                    </>
                  ) : (
                    <>
                      <span>Access Document Now</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-[11px] text-stone-400 flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>100% Secure & Confidential</span>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* FULL HIGH-RES 3-PAGE OFFICIAL DOCUMENT VIEWER MODAL */}
      {isDocViewerOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-6 animate-fadeIn">
          <div 
            className="fixed inset-0 bg-stone-950/85 backdrop-blur-md transition-opacity"
            onClick={() => setIsDocViewerOpen(false)}
          />
          <div className="relative w-full max-w-4xl max-h-[95vh] bg-stone-900 rounded-3xl shadow-2xl border border-stone-700 flex flex-col overflow-hidden z-10 animate-scaleUp">
            
            {/* Modal Header Bar */}
            <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/90 text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#10367D] flex items-center justify-center text-amber-300 font-bold text-xs">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                    BuildBharat Synergy Partners — 20 Cadres Document
                  </h3>
                  <span className="text-[11px] text-stone-400">
                    Page {docCurrentPage} of 3 • Official Schedule
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/documents/referral-and-20-cadres-commission-structure.pdf"
                  download="BuildBharat-20-Cadres-Commission-Structure.pdf"
                  className="p-2 rounded-lg text-amber-300 hover:text-white hover:bg-stone-800 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer border border-amber-300/40 bg-[#10367D]/60 no-underline"
                  title="Download Original PDF File"
                >
                  <Download size={15} />
                  <span className="hidden sm:inline">Download PDF</span>
                </a>
                <button
                  onClick={handlePrintDocument}
                  className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer border border-stone-700 bg-stone-800/60"
                  title="Print / Save as PDF"
                >
                  <Printer size={15} />
                  <span className="hidden sm:inline">Print</span>
                </button>
                <button
                  onClick={() => setIsDocViewerOpen(false)}
                  className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer border-none bg-transparent"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Document Content Canvas (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-stone-900/90 flex justify-center items-start">
              
              {/* PAGE 1 */}
              {docCurrentPage === 1 && (
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 print-document animate-fadeIn">
                  {/* Top Wave Banner */}
                  <div className="bg-[#10367D] text-white pt-8 pb-10 px-8 text-center relative overflow-hidden rounded-b-[40px] shadow-md">
                    <div className="flex justify-center mb-2">
                      <img 
                        src="/build-bharat-logo.png" 
                        alt="BuildBharat" 
                        className="h-12 w-auto object-contain bg-white/90 p-1 rounded-lg"
                      />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-300 block">
                      SYNERGY PARTNERS
                    </span>
                  </div>

                  {/* Document Body */}
                  <div className="p-8 text-center">
                    <h2 className="text-xl sm:text-2xl font-black text-[#10367D] uppercase tracking-tight mb-6">
                      REFERAL & 20 CADRES COMMISSION<br />STRUCTURE
                    </h2>

                    {/* Table */}
                    <div className="border-2 border-stone-900 rounded-lg overflow-hidden shadow-xs mb-8">
                      <table className="w-full text-center text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="bg-white border-b-2 border-stone-900 font-black text-[#10367D]">
                            <th className="py-2.5 px-3 border-r-2 border-stone-900">CADRE</th>
                            <th className="py-2.5 px-3 border-r-2 border-stone-900">DI</th>
                            <th className="py-2.5 px-3 border-r-2 border-stone-900">%</th>
                            <th className="py-2.5 px-3">AMT</th>
                          </tr>
                        </thead>
                        <tbody className="font-semibold text-stone-900 divide-y-2 divide-stone-900">
                          <tr className="bg-amber-50/60 font-bold">
                            <td className="py-2 px-3 border-r-2 border-stone-900 text-[#10367D]">REFERAL & 1</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900"></td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">20</td>
                            <td className="py-2 px-3">1000</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 border-r-2 border-stone-900">2</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">1</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">5</td>
                            <td className="py-2 px-3">250</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 border-r-2 border-stone-900">3</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">1</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">5</td>
                            <td className="py-2 px-3">250</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 border-r-2 border-stone-900">4</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">2</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">4</td>
                            <td className="py-2 px-3">200</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 border-r-2 border-stone-900">5</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">2</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">4</td>
                            <td className="py-2 px-3">200</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 border-r-2 border-stone-900">6</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">2</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">4</td>
                            <td className="py-2 px-3">200</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 border-r-2 border-stone-900">7</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">3</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">2</td>
                            <td className="py-2 px-3">100</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 border-r-2 border-stone-900">8</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">3</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">2</td>
                            <td className="py-2 px-3">100</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3 border-r-2 border-stone-900">9</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">3</td>
                            <td className="py-2 px-3 border-r-2 border-stone-900">2</td>
                            <td className="py-2 px-3">100</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Bottom Blue Wave Footer */}
                    <div className="h-12 bg-gradient-to-r from-[#0A2250] to-[#10367D] rounded-t-[30px] w-full" />
                  </div>
                </div>
              )}

              {/* PAGE 2 */}
              {docCurrentPage === 2 && (
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 print-document animate-fadeIn">
                  {/* Top Wave Banner */}
                  <div className="bg-[#10367D] text-white pt-8 pb-10 px-8 text-center relative overflow-hidden rounded-b-[40px] shadow-md">
                    <div className="flex justify-center mb-2">
                      <img 
                        src="/build-bharat-logo.png" 
                        alt="BuildBharat" 
                        className="h-12 w-auto object-contain bg-white/90 p-1 rounded-lg"
                      />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-300 block">
                      SYNERGY PARTNERS
                    </span>
                  </div>

                  {/* Document Body */}
                  <div className="p-8 text-center">
                    {/* Table */}
                    <div className="border-2 border-stone-900 rounded-lg overflow-hidden shadow-xs mb-8 mt-2">
                      <table className="w-full text-center text-xs sm:text-sm border-collapse">
                        <thead>
                          <tr className="bg-white border-b-2 border-stone-900 font-black text-[#10367D]">
                            <th className="py-2.5 px-3 border-r-2 border-stone-900">CADRE</th>
                            <th className="py-2.5 px-3 border-r-2 border-stone-900">D.I</th>
                            <th className="py-2.5 px-3 border-r-2 border-stone-900">%</th>
                            <th className="py-2.5 px-3">AMT</th>
                          </tr>
                        </thead>
                        <tbody className="font-semibold text-stone-900 divide-y-2 divide-stone-900">
                          <tr>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">10</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">3</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">2</td>
                            <td className="py-1.5 px-3">100</td>
                          </tr>
                          <tr>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">11</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">4</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">1</td>
                            <td className="py-1.5 px-3">100</td>
                          </tr>
                          <tr>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">12</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">4</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">1</td>
                            <td className="py-1.5 px-3">100</td>
                          </tr>
                          <tr>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">13</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">4</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">1</td>
                            <td className="py-1.5 px-3">50</td>
                          </tr>
                          <tr>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">14</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">4</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">1</td>
                            <td className="py-1.5 px-3">50</td>
                          </tr>
                          <tr>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">15</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">4</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">1</td>
                            <td className="py-1.5 px-3">50</td>
                          </tr>
                          <tr>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">16</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">5</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">0.6</td>
                            <td className="py-1.5 px-3">50</td>
                          </tr>
                          <tr>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">17</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">5</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">0.6</td>
                            <td className="py-1.5 px-3">50</td>
                          </tr>
                          <tr>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">18</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">5</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">0.6</td>
                            <td className="py-1.5 px-3">30</td>
                          </tr>
                          <tr>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">19</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">5</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">0.6</td>
                            <td className="py-1.5 px-3">30</td>
                          </tr>
                          <tr>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">20</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">5</td>
                            <td className="py-1.5 px-3 border-r-2 border-stone-900">0.6</td>
                            <td className="py-1.5 px-3">30</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Bottom Blue Wave Footer */}
                    <div className="h-12 bg-gradient-to-r from-[#0A2250] to-[#10367D] rounded-t-[30px] w-full" />
                  </div>
                </div>
              )}

              {/* PAGE 3 */}
              {docCurrentPage === 3 && (
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 print-document animate-fadeIn">
                  {/* Top Wave Banner */}
                  <div className="bg-[#10367D] text-white pt-8 pb-10 px-8 text-center relative overflow-hidden rounded-b-[40px] shadow-md">
                    <div className="flex justify-center mb-2">
                      <img 
                        src="/build-bharat-logo.png" 
                        alt="BuildBharat" 
                        className="h-12 w-auto object-contain bg-white/90 p-1 rounded-lg"
                      />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-300 block">
                      SYNERGY PARTNERS
                    </span>
                  </div>

                  {/* Document Body */}
                  <div className="p-8 text-center">
                    {/* Summary Table */}
                    <div className="border-2 border-stone-900 rounded-lg overflow-hidden shadow-xs mb-8 mt-6">
                      <table className="w-full text-center text-xs sm:text-base border-collapse">
                        <thead>
                          <tr className="bg-white border-b-2 border-stone-900 font-black text-[#10367D]">
                            <th className="py-3 px-3 border-r-2 border-stone-900">CADRE</th>
                            <th className="py-3 px-3 border-r-2 border-stone-900">D.I</th>
                            <th className="py-3 px-3 border-r-2 border-stone-900">%</th>
                            <th className="py-3 px-3">AMT</th>
                          </tr>
                        </thead>
                        <tbody className="font-semibold text-stone-900 divide-y-2 divide-stone-900">
                          <tr>
                            <td className="py-3 px-3 border-r-2 border-stone-900"></td>
                            <td className="py-3 px-3 border-r-2 border-stone-900"></td>
                            <td className="py-3 px-3 border-r-2 border-stone-900 font-bold">38</td>
                            <td className="py-3 px-3 font-bold">1900</td>
                          </tr>
                          <tr className="bg-blue-50/40">
                            <td className="py-3 px-3 border-r-2 border-stone-900 font-bold text-[#10367D]">FRANCHISE</td>
                            <td className="py-3 px-3 border-r-2 border-stone-900"></td>
                            <td className="py-3 px-3 border-r-2 border-stone-900 font-bold">10</td>
                            <td className="py-3 px-3 font-bold">500</td>
                          </tr>
                          <tr className="bg-amber-50/40">
                            <td className="py-3 px-3 border-r-2 border-stone-900 font-bold text-[#10367D]">LOYALITY</td>
                            <td className="py-3 px-3 border-r-2 border-stone-900"></td>
                            <td className="py-3 px-3 border-r-2 border-stone-900 font-bold">2</td>
                            <td className="py-3 px-3 font-bold">100</td>
                          </tr>
                          <tr className="bg-[#10367D]/10 font-black text-[#10367D]">
                            <td className="py-3.5 px-3 border-r-2 border-stone-900"></td>
                            <td className="py-3.5 px-3 border-r-2 border-stone-900"></td>
                            <td className="py-3.5 px-3 border-r-2 border-stone-900 text-lg">50</td>
                            <td className="py-3.5 px-3 text-lg">2500</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Bottom Blue Wave Footer */}
                    <div className="h-12 bg-gradient-to-r from-[#0A2250] to-[#10367D] rounded-t-[30px] w-full" />
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom Pagination Controls */}
            <div className="px-6 py-3.5 border-t border-stone-800 bg-stone-950 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDocCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={docCurrentPage === 1}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold transition-colors cursor-pointer border border-stone-700 flex items-center gap-1"
                >
                  <ChevronLeft size={14} />
                  <span>Previous</span>
                </button>
                <div className="flex items-center gap-1 mx-2">
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      onClick={() => setDocCurrentPage(page)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        docCurrentPage === page
                          ? 'bg-[#10367D] text-amber-300 border border-amber-300/40'
                          : 'bg-stone-800/80 text-stone-400 hover:text-white'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setDocCurrentPage((p) => Math.min(3, p + 1))}
                  disabled={docCurrentPage === 3}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold transition-colors cursor-pointer border border-stone-700 flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-stone-400 hidden sm:inline font-sans">
                  BuildBharat Synergy Partners • Membership Fee ₹5,000
                </span>
                <button
                  onClick={() => setIsDocViewerOpen(false)}
                  className="px-4 py-1.5 text-xs font-bold text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors cursor-pointer border border-stone-700"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
