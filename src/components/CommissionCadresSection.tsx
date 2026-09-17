import React, { useState } from 'react';
import { submitToFirestore } from '../lib/firebase';
import { 
  FileText, 
  Download, 
  Eye, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  X, 
  Phone, 
  User, 
  Printer, 
  Loader2,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export interface CadreItem {
  cadre: string;
  cadreNumber: number;
  di: string;
  percentageFormatted: string;
  amountFormatted: string;
  amount: number;
}

export const CADRE_DATA: CadreItem[] = [
  { cadre: "REFERAL & 1", cadreNumber: 1, di: "—", percentageFormatted: "20%", amountFormatted: "₹1,000", amount: 1000 },
  { cadre: "Cadre 2", cadreNumber: 2, di: "1", percentageFormatted: "5%", amountFormatted: "₹250", amount: 250 },
  { cadre: "Cadre 3", cadreNumber: 3, di: "2", percentageFormatted: "4%", amountFormatted: "₹200", amount: 200 },
  { cadre: "Cadre 4", cadreNumber: 4, di: "2", percentageFormatted: "3%", amountFormatted: "₹150", amount: 150 },
  { cadre: "Cadre 5", cadreNumber: 5, di: "3", percentageFormatted: "2%", amountFormatted: "₹100", amount: 100 },
  { cadre: "Cadre 6", cadreNumber: 6, di: "3", percentageFormatted: "1%", amountFormatted: "₹50", amount: 50 },
  { cadre: "Cadre 7", cadreNumber: 7, di: "3", percentageFormatted: "1%", amountFormatted: "₹50", amount: 50 },
  { cadre: "Cadre 8", cadreNumber: 8, di: "3", percentageFormatted: "1%", amountFormatted: "₹50", amount: 50 },
  { cadre: "Cadre 9", cadreNumber: 9, di: "3", percentageFormatted: "1%", amountFormatted: "₹50", amount: 50 },
  { cadre: "Cadre 10", cadreNumber: 10, di: "3", percentageFormatted: "1%", amountFormatted: "₹50", amount: 50 },
];

interface CommissionCadresSectionProps {
  onOpenPartnerModal: () => void;
}

export const CommissionCadresSection: React.FC<CommissionCadresSectionProps> = ({ onOpenPartnerModal }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'prime' | 'growth'>('all');
  const [directReferrals, setDirectReferrals] = useState<number>(5);
  const [teamMultiplier, setTeamMultiplier] = useState<number>(5);
  const [calcDepth, setCalcDepth] = useState<number>(3);

  // Lead Gate & Document Viewer States
  const [isLeadGateOpen, setIsLeadGateOpen] = useState<boolean>(false);
  const [isDocViewerOpen, setIsDocViewerOpen] = useState<boolean>(false);
  const [leadName, setLeadName] = useState<string>('');
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [leadError, setLeadError] = useState<string>('');
  const [leadLoading, setLeadLoading] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return typeof window !== 'undefined' && !!localStorage.getItem('bbsp_cadre_unlocked');
  });

  const filteredCadres = CADRE_DATA.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'prime') return item.cadreNumber <= 5;
    if (activeTab === 'growth') return item.cadreNumber >= 6;
    return true;
  });

  const levelCalculations = [
    { 
      cadreNum: 1, 
      cadreName: 'Cadre 1 (Directs)', 
      ratePct: '20%', 
      rateAmt: 1000, 
      members: directReferrals, 
      earnings: directReferrals * 1000 
    },
    { 
      cadreNum: 2, 
      cadreName: 'Cadre 2', 
      ratePct: '5%', 
      rateAmt: 250, 
      members: directReferrals * teamMultiplier, 
      earnings: (directReferrals * teamMultiplier) * 250 
    },
    { 
      cadreNum: 3, 
      cadreName: 'Cadre 3', 
      ratePct: '4%', 
      rateAmt: 200, 
      members: directReferrals * Math.pow(teamMultiplier, 2), 
      earnings: (directReferrals * Math.pow(teamMultiplier, 2)) * 200 
    },
    { 
      cadreNum: 4, 
      cadreName: 'Cadre 4', 
      ratePct: '3%', 
      rateAmt: 150, 
      members: directReferrals * Math.pow(teamMultiplier, 3), 
      earnings: (directReferrals * Math.pow(teamMultiplier, 3)) * 150 
    },
    { 
      cadreNum: 5, 
      cadreName: 'Cadre 5', 
      ratePct: '2%', 
      rateAmt: 100, 
      members: directReferrals * Math.pow(teamMultiplier, 4), 
      earnings: (directReferrals * Math.pow(teamMultiplier, 4)) * 100 
    }
  ];

  const visibleLevels = levelCalculations.slice(0, calcDepth);
  const totalTeamMembers = visibleLevels.reduce((acc, curr) => acc + curr.members, 0);
  const totalProjectedIncome = visibleLevels.reduce((acc, curr) => acc + curr.earnings, 0);

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
      source: '10 Cadres Commission PDF',
      requestedDocument: 'BuildBharat 10 Cadres Commission Structure',
      status: 'Document Downloaded',
      timestamp: new Date().toLocaleDateString('en-GB'),
      unlockedAt: new Date().toISOString()
    };

    try {
      await submitToFirestore(leadRecord, 'submissions');
      await submitToFirestore(leadRecord, 'document_leads');
    } catch {
      // ignore
    }

    try {
      fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadRecord),
      }).catch(() => {});
    } catch {
      // ignore
    }

    try {
      const existingEnquiries = JSON.parse(localStorage.getItem('bbsp_enquiries') || '[]');
      localStorage.setItem('bbsp_enquiries', JSON.stringify([leadRecord, ...existingEnquiries]));
      localStorage.setItem('bbsp_cadre_unlocked', 'true');
      localStorage.setItem('bbsp_cadre_lead', JSON.stringify(leadRecord));
    } catch {
      // ignore
    }

    setLeadLoading(false);
    setIsUnlocked(true);
    setIsLeadGateOpen(false);
    setIsDocViewerOpen(true);
    setLeadError('');
  };

  return (
    <section id="commission-structure" className="py-16 bg-[#FAF6EE] border-t border-b border-[#EBE6DD] text-left">
      <div className="container-custom max-w-7xl px-4 sm:px-6">
        
        {/* Simple & Clean Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10367D]/10 text-[#10367D] text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingUp size={13} className="text-[#D57530]" />
            <span>10 Cadres Commission Structure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F1D1A] heading-font tracking-tight uppercase">
            Referral & 10 Cadres Commission
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Total 49% (₹2,450) distribution on the ₹5,000 lifetime membership.
          </p>
        </div>

        {/* 2-Column Clean Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: 10 Cadres Matrix Table & PDF Download Below (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* 10 Cadres Matrix Table Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EBE6DD] shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#10367D] heading-font uppercase">
                    10 Cadres Breakdown Matrix
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    DI = Direct Introductions required to unlock tier payout
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold self-start sm:self-auto">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'all' 
                        ? 'bg-[#10367D] text-white shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All (1–10)
                  </button>
                  <button
                    onClick={() => setActiveTab('prime')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'prime' 
                        ? 'bg-[#10367D] text-white shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Prime (1–5)
                  </button>
                  <button
                    onClick={() => setActiveTab('growth')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'growth' 
                        ? 'bg-[#10367D] text-white shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Growth (6–10)
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-2.5 px-3">Cadre Tier</th>
                      <th className="py-2.5 px-3 text-center">D.I Required</th>
                      <th className="py-2.5 px-3 text-right">Commission %</th>
                      <th className="py-2.5 px-3 text-right">Payout (Amt)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCadres.map((item) => (
                      <tr 
                        key={item.cadreNumber}
                        className={`hover:bg-slate-50 transition-colors ${
                          item.cadreNumber === 1 ? 'bg-amber-50/50 font-semibold' : ''
                        }`}
                      >
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                              item.cadreNumber === 1 
                                ? 'bg-[#10367D] text-white' 
                                : item.cadreNumber <= 5 
                                ? 'bg-[#10367D]/10 text-[#10367D]' 
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {item.cadreNumber}
                            </span>
                            <span className="font-bold text-slate-900">{item.cadre}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.di === '—' 
                              ? 'bg-slate-100 text-slate-500' 
                              : 'bg-blue-50 text-[#10367D] border border-blue-200'
                          }`}>
                            {item.di === '—' ? 'None' : `DI: ${item.di}`}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-700">
                          {item.percentageFormatted}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-extrabold text-[#10367D]">
                          {item.amountFormatted}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pool Footnotes */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/60">
                  <span className="text-slate-500 block text-[10px] font-bold">Cadres 1–10 Total</span>
                  <span className="font-bold text-slate-900">39% (₹1,950)</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/60">
                  <span className="text-slate-500 block text-[10px] font-bold">Franchise Pool</span>
                  <span className="font-bold text-slate-900">8% (₹400)</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/60">
                  <span className="text-slate-500 block text-[10px] font-bold">Loyalty Pool</span>
                  <span className="font-bold text-slate-900">2% (₹100)</span>
                </div>
                <div className="bg-[#10367D]/10 p-2 rounded-xl border border-[#10367D]/20">
                  <span className="text-[#10367D] block text-[10px] font-bold">Total Pool</span>
                  <span className="font-extrabold text-[#10367D]">49% (₹2,450)</span>
                </div>
              </div>
            </div>

            {/* Official PDF Document Card (Right Below Table) */}
            <div className="bg-gradient-to-r from-[#10367D] to-[#0B2147] text-white rounded-2xl p-5 sm:p-6 border border-blue-900/60 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white heading-font uppercase">
                      Official 10 Cadres Commission PDF
                    </h4>
                    <span className="text-[11px] text-white/70">
                      Official Schedule
                    </span>
                  </div>
                </div>
                {isUnlocked ? (
                  <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-400/30 flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>Unlocked</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2.5 py-1 bg-amber-400/20 text-amber-300 rounded-full border border-amber-300/30 flex items-center gap-1">
                    <Lock size={12} />
                    <span>Verified Document</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-white/80 my-3">
                View or download the full verified Referral & 10 Cadres Commission Structure document. Enter your name & WhatsApp number to view.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  onClick={handleDocumentAccessClick}
                  className="flex-1 bg-white text-[#10367D] hover:bg-amber-400 hover:text-slate-900 text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Eye size={14} />
                  <span>{isUnlocked ? 'View Official Document' : 'Unlock & View PDF'}</span>
                </button>
                <button
                  onClick={handleDocumentAccessClick}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/20"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT: Live Earnings Simulator (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EBE6DD] shadow-sm">
              <div className="flex items-center gap-1.5 text-[#10367D] text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles size={14} className="text-[#D57530]" />
                <span>Earnings Simulator</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 heading-font uppercase mb-1">
                Simulate Network Growth
              </h3>
              <p className="text-xs text-slate-500 mb-4 font-sans">
                See projected returns based on team duplication.
              </p>

              {/* Slider: Direct Referrals */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 mb-3.5">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-700 font-bold">Direct Referrals (Cadre 1):</span>
                  <span className="text-xs font-black text-[#10367D] bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">
                    {directReferrals} Partners (₹{(directReferrals * 1000).toLocaleString()})
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={directReferrals}
                  onChange={(e) => setDirectReferrals(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#10367D]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                  <span>1 (₹1k)</span>
                  <span>5 (₹5k)</span>
                  <span>15 (₹15k)</span>
                </div>
              </div>

              {/* Multiplier: Duplication */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 mb-4">
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span className="text-slate-700 font-bold">Each Member Refers:</span>
                  <span className="text-xs font-bold text-[#D57530] font-mono">
                    {teamMultiplier} members each
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[2, 3, 4, 5].map((mult) => (
                    <button
                      key={mult}
                      type="button"
                      onClick={() => setTeamMultiplier(mult)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                        teamMultiplier === mult
                          ? 'bg-[#10367D] text-white border-[#10367D]'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {mult} Each
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Breakdown List */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
                  <span>Level-by-Level Payout</span>
                  <div className="flex gap-1 bg-slate-100 p-0.5 rounded">
                    <button
                      type="button"
                      onClick={() => setCalcDepth(3)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                        calcDepth === 3 ? 'bg-[#D57530] text-white' : 'text-slate-600'
                      }`}
                    >
                      3 Levels
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcDepth(5)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                        calcDepth === 5 ? 'bg-[#D57530] text-white' : 'text-slate-600'
                      }`}
                    >
                      5 Levels
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {visibleLevels.map((lvl) => (
                    <div 
                      key={lvl.cadreNum}
                      className="p-2 rounded-lg border border-slate-200/80 bg-slate-50/70 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold ${
                          lvl.cadreNum === 1 ? 'bg-[#10367D] text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {lvl.cadreNum}
                        </span>
                        <div>
                          <span className="font-bold text-slate-800">{lvl.cadreName}</span>
                          <span className="text-[10px] text-slate-500 ml-1.5">
                            ({lvl.members.toLocaleString()} members × ₹{lvl.rateAmt})
                          </span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#10367D]">
                        ₹{lvl.earnings.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Projected Return Box */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Network: {totalTeamMembers.toLocaleString()} Members
                  </span>
                  <span className="text-xs font-bold text-emerald-950">
                    Total Projected Return:
                  </span>
                </div>
                <span className="text-xl font-black text-emerald-700 font-mono tracking-tight">
                  ₹{totalProjectedIncome.toLocaleString()}
                </span>
              </div>

              {/* Partner CTA */}
              <button
                onClick={onOpenPartnerModal}
                className="btn-gold w-full py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.01] transition-transform"
              >
                <span>Activate Partner Account (₹5,000)</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* LEAD GATE MODAL */}
      {isLeadGateOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsLeadGateOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-scaleUp p-6">
            
            <button
              onClick={() => setIsLeadGateOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors cursor-pointer bg-transparent border-none"
            >
              <X size={18} />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-xl bg-[#10367D]/10 text-[#10367D] flex items-center justify-center mx-auto mb-2.5">
                <FileText size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#10367D] heading-font uppercase">
                Unlock Official 10 Cadres Commission
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Enter your details to view and download the official schedule.
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-3.5 text-left">
              {leadError && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 font-semibold">
                  {leadError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => {
                      setLeadName(e.target.value);
                      if (leadError) setLeadError('');
                    }}
                    placeholder="Enter your name"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-xs focus:ring-2 focus:ring-[#10367D] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
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
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-xs focus:ring-2 focus:ring-[#10367D] focus:border-transparent outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={leadLoading}
                  className="btn-gold w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-75"
                >
                  {leadLoading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Unlocking...</span>
                    </>
                  ) : (
                    <>
                      <span>Access Document Now</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-[10px] text-stone-400 flex items-center justify-center gap-1">
                <ShieldCheck size={12} className="text-emerald-600" />
                <span>100% Confidential</span>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* OFFICIAL 10 CADRES DOCUMENT VIEWER MODAL */}
      {isDocViewerOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
          <div 
            className="fixed inset-0 bg-stone-950/85 backdrop-blur-md transition-opacity"
            onClick={() => setIsDocViewerOpen(false)}
          />
          <div className="relative w-full max-w-2xl max-h-[92vh] bg-stone-900 rounded-2xl shadow-2xl border border-stone-700 flex flex-col overflow-hidden z-10 animate-scaleUp">
            
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-stone-800 flex items-center justify-between bg-stone-950 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#10367D] flex items-center justify-center text-amber-300 text-xs font-bold">
                  <FileText size={16} />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  BuildBharat 10 Cadres Commission Structure
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/documents/referral-and-10-cadres-commission-structure.pdf"
                  download="BuildBharat-10-Cadres-Commission-Structure.pdf"
                  className="p-1.5 rounded-lg text-amber-300 hover:text-white hover:bg-stone-800 transition-colors flex items-center gap-1 text-xs font-semibold no-underline border border-amber-300/40 bg-[#10367D]/60"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  onClick={() => window.print()}
                  className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors flex items-center gap-1 text-xs font-semibold border border-stone-700 bg-stone-800/60 cursor-pointer"
                >
                  <Printer size={14} />
                  <span className="hidden sm:inline">Print</span>
                </button>
                <button
                  onClick={() => setIsDocViewerOpen(false)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer border-none bg-transparent"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-900 flex justify-center items-start">
              <div className="w-full max-w-xl bg-white rounded-xl shadow-xl overflow-hidden border border-stone-200 text-center">
                {/* Top Banner */}
                <div className="bg-[#10367D] text-white pt-6 pb-6 px-6 relative rounded-b-3xl">
                  <div className="flex justify-center mb-1.5">
                    <img 
                      src="/build-bharat-logo.png" 
                      alt="BuildBharat" 
                      className="h-10 w-auto object-contain bg-white/95 p-1 rounded-lg"
                    />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300 block">
                    SYNERGY PARTNERS
                  </span>
                </div>

                {/* Table */}
                <div className="p-5 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-black text-[#10367D] uppercase tracking-tight mb-4">
                    REFERAL & 10 CADRES COMMISSION<br />STRUCTURE
                  </h2>

                  <div className="border-2 border-stone-900 rounded-lg overflow-hidden mb-4">
                    <table className="w-full text-center text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#10367D] text-white border-b-2 border-stone-900 font-extrabold text-[11px]">
                          <th className="py-2 px-2 border-r-2 border-stone-900">CADERS</th>
                          <th className="py-2 px-2 border-r-2 border-stone-900">DI</th>
                          <th className="py-2 px-2 border-r-2 border-stone-900">COMM %</th>
                          <th className="py-2 px-2">COMM AMT</th>
                        </tr>
                      </thead>
                      <tbody className="font-semibold text-stone-900 divide-y-2 divide-stone-900 text-xs">
                        <tr className="bg-amber-50/70 font-bold">
                          <td className="py-1.5 px-2 border-r-2 border-stone-900 text-[#10367D]">REFERAL & 1</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900 text-stone-400">—</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900 font-bold">20</td>
                          <td className="py-1.5 px-2 font-bold text-[#10367D]">1000</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">2</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">1</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900 font-mono">5</td>
                          <td className="py-1.5 px-2 font-mono font-bold">250</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">3</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">2</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900 font-mono">4</td>
                          <td className="py-1.5 px-2 font-mono font-bold">200</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">4</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">2</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900 font-mono">3</td>
                          <td className="py-1.5 px-2 font-mono font-bold">150</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">5</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">3</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900 font-mono">2</td>
                          <td className="py-1.5 px-2 font-mono font-bold">100</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">6</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">3</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900 font-mono">1</td>
                          <td className="py-1.5 px-2 font-mono font-bold">50</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">7</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">3</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900 font-mono">1</td>
                          <td className="py-1.5 px-2 font-mono font-bold">50</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">8</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">3</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900 font-mono">1</td>
                          <td className="py-1.5 px-2 font-mono font-bold">50</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">9</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">3</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900 font-mono">1</td>
                          <td className="py-1.5 px-2 font-mono font-bold">50</td>
                        </tr>
                        <tr>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">10</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900">3</td>
                          <td className="py-1.5 px-2 border-r-2 border-stone-900 font-mono">1</td>
                          <td className="py-1.5 px-2 font-mono font-bold">50</td>
                        </tr>
                        {/* Subtotal */}
                        <tr className="bg-slate-100 font-bold text-[#10367D]">
                          <td className="py-2 px-2 border-r-2 border-stone-900 text-left pl-3">SUBTOTAL (1–10)</td>
                          <td className="py-2 px-2 border-r-2 border-stone-900"></td>
                          <td className="py-2 px-2 border-r-2 border-stone-900 font-mono">39</td>
                          <td className="py-2 px-2 font-mono">1950</td>
                        </tr>
                        {/* Franchise */}
                        <tr className="bg-blue-50/60 font-bold text-[#10367D]">
                          <td className="py-2 px-2 border-r-2 border-stone-900 text-left pl-3">FRANCHISE</td>
                          <td className="py-2 px-2 border-r-2 border-stone-900"></td>
                          <td className="py-2 px-2 border-r-2 border-stone-900 font-mono">8</td>
                          <td className="py-2 px-2 font-mono">400</td>
                        </tr>
                        {/* Loyalty */}
                        <tr className="bg-amber-50/60 font-bold text-[#10367D]">
                          <td className="py-2 px-2 border-r-2 border-stone-900 text-left pl-3">LOYALTY</td>
                          <td className="py-2 px-2 border-r-2 border-stone-900"></td>
                          <td className="py-2 px-2 border-r-2 border-stone-900 font-mono">2</td>
                          <td className="py-2 px-2 font-mono">100</td>
                        </tr>
                        {/* Grand Total */}
                        <tr className="bg-[#10367D] text-white font-black">
                          <td className="py-2.5 px-2 border-r-2 border-stone-900 text-left pl-3 text-xs uppercase">TOTAL ECOSYSTEM POOL</td>
                          <td className="py-2.5 px-2 border-r-2 border-stone-900"></td>
                          <td className="py-2.5 px-2 border-r-2 border-stone-900 font-mono text-amber-300">49</td>
                          <td className="py-2.5 px-2 font-mono text-amber-300">2450</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-[10px] text-stone-500 font-sans">
                    Calculated on ₹5,000 Lifetime Membership Fee.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
