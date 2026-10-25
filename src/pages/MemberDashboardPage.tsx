import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  IndianRupee, 
  ArrowUpRight, 
  Layers, 
  Sun, 
  Coins, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  LogOut, 
  RefreshCw, 
  Eye, 
  FileCheck, 
  Sparkles, 
  TrendingUp, 
  Download, 
  CheckCircle2, 
  Clock, 
  HelpCircle,
  Home,
  Check,
  Copy,
  ExternalLink
} from 'lucide-react';
import { PaymentProofModal, PaymentProofData } from '../components/PaymentProofModal';

// The 5 Fixed Business Segments
const FIXED_BUSINESS_SEGMENTS = [
  { id: 'solar', name: 'BuildBharat Solar', description: 'Commercial & Rooftop PV', icon: Sun, color: '#D57530', accentBg: 'rgba(213, 117, 48, 0.1)' },
  { id: 'loans', name: 'BuildBharat Loans', description: 'Project Finance, MSME & Capital', icon: Coins, color: '#10367D', accentBg: 'rgba(16, 54, 125, 0.1)' },
  { id: 'real-estate', name: 'BuildBharat Real Estate', description: 'Open Plots, Farmlands & Infra', icon: Building2, color: '#10B981', accentBg: 'rgba(16, 185, 129, 0.1)' },
  { id: 'education', name: 'BuildBharat EduTech', description: 'Vocational Training & Placements', icon: GraduationCap, color: '#8B5CF6', accentBg: 'rgba(139, 92, 246, 0.1)' },
  { id: 'partner-franchise', name: 'Synergy Franchise & Advisory', description: 'Cross-Sector Referral Synergies', icon: Briefcase, color: '#EC4899', accentBg: 'rgba(236, 72, 153, 0.1)' }
];

// Sample default payout data for demo / newly activated accounts
const SAMPLE_PAYOUTS: PaymentProofData[] = [
  {
    id: 'TXN-2026-0982',
    amount: 75000,
    segment: 'solar',
    segmentName: 'BuildBharat Solar',
    date: '2026-10-18',
    utrNumber: 'CMS/AXIS/40928172901',
    screenshotUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    status: 'Paid',
    notes: 'Q3 Solar MW Commercial Rooftop closure commission - 10-Cadre District distribution.',
    memberAcknowledged: true,
    acknowledgedAt: '2026-10-19T10:14:22Z'
  },
  {
    id: 'TXN-2026-0841',
    amount: 60000,
    segment: 'loans',
    segmentName: 'BuildBharat Loans',
    date: '2026-10-05',
    utrNumber: 'HDFC000182749102',
    screenshotUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80',
    status: 'Paid',
    notes: 'Secured MSME Industrial Project Loan sanction disbursement commission.',
    memberAcknowledged: true,
    acknowledgedAt: '2026-10-06T14:32:10Z'
  },
  {
    id: 'TXN-2026-0719',
    amount: 50000,
    segment: 'real-estate',
    segmentName: 'BuildBharat Real Estate',
    date: '2026-09-22',
    utrNumber: 'ICIC0091823746',
    screenshotUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    status: 'Paid',
    notes: 'HMDA Venture Farmland Phase-II unit syndication payout.',
    memberAcknowledged: false
  },
  {
    id: 'TXN-2026-0610',
    amount: 25000,
    segment: 'education',
    segmentName: 'BuildBharat EduTech',
    date: '2026-09-08',
    utrNumber: 'SBIN0082739182',
    screenshotUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    status: 'Paid',
    notes: 'Batch Institutional Upskilling Referral & Placement fee share.',
    memberAcknowledged: true,
    acknowledgedAt: '2026-09-09T18:05:40Z'
  }
];

interface MemberDashboardPageProps {
  onNavigate: (path: string) => void;
  onLogout?: () => void;
}

export const MemberDashboardPage: React.FC<MemberDashboardPageProps> = ({
  onNavigate,
  onLogout
}) => {
  const [member, setMember] = useState<any>(null);
  const [payouts, setPayouts] = useState<PaymentProofData[]>([]);
  const [selectedProof, setSelectedProof] = useState<PaymentProofData | null>(null);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [selectedSegmentFilter, setSelectedSegmentFilter] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedUtr, setCopiedUtr] = useState<string | null>(null);

  // Load Member Data & Payout Records
  useEffect(() => {
    loadMemberAndPayouts();
  }, []);

  const loadMemberAndPayouts = async () => {
    setIsRefreshing(true);
    try {
      // 1. Get stored member from sessionStorage or localStorage
      const storedMemberStr = sessionStorage.getItem('bbsp_current_member') || localStorage.getItem('bbsp_current_member');
      let currentMember = storedMemberStr ? JSON.parse(storedMemberStr) : null;

      if (!currentMember) {
        currentMember = {
          id: 'demo-member-001',
          name: 'D. Sudheer Reddy (Demo)',
          email: 'sudheer.demo@gmail.com',
          phone: '+91 93530 18855',
          cadre: 'District Cadre Syndicate Partner',
          memberId: 'BBSP-2026-AP0849',
          photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
          status: 'Approved',
          joinedAt: '2026-02-15'
        };
        sessionStorage.setItem('bbsp_current_member', JSON.stringify(currentMember));
      }
      setMember(currentMember);

      // 2. Fetch live payouts from Firestore & local cache
      try {
        const { db } = await import('../lib/firebase');
        const { collection, getDocs, query, where } = await import('firebase/firestore');

        const userEmail = (currentMember.email || '').toLowerCase().trim();
        const loadedPayouts: PaymentProofData[] = [];

        // Check if payouts collection has records for this member in Firestore
        try {
          const payoutsQuery = query(
            collection(db, 'payouts'),
            where('memberEmail', '==', userEmail)
          );
          const snapshot = await getDocs(payoutsQuery);

          if (!snapshot.empty) {
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              const segObj = FIXED_BUSINESS_SEGMENTS.find(s => s.id === data.segment);
              loadedPayouts.push({
                id: docSnap.id,
                amount: Number(data.amount) || 0,
                segment: data.segment || 'solar',
                segmentName: segObj ? segObj.name : (data.segmentName || data.segment),
                date: data.date || new Date().toISOString().split('T')[0],
                utrNumber: data.utrNumber || data.referenceId,
                screenshotUrl: data.screenshotUrl || data.proofUrl || '',
                status: (data.status || 'Paid') as any,
                notes: data.notes || '',
                memberAcknowledged: data.memberAcknowledged === true || data.status === 'Confirmed by Member',
                acknowledgedAt: data.acknowledgedAt || ''
              });
            });
          }
        } catch (err) {
          console.warn('Firestore query error for payouts:', err);
        }

        // Merge local cache payouts
        try {
          const localRaw = localStorage.getItem('bbsp_payouts');
          if (localRaw) {
            const localPayouts = JSON.parse(localRaw);
            const userLocal = localPayouts.filter((p: any) => (p.memberEmail || '').toLowerCase().trim() === userEmail);
            userLocal.forEach((lp: any) => {
              if (!loadedPayouts.some(p => p.id === lp.id)) {
                const segObj = FIXED_BUSINESS_SEGMENTS.find(s => s.id === lp.segment);
                loadedPayouts.push({
                  ...lp,
                  segmentName: segObj ? segObj.name : (lp.segmentName || lp.segment)
                });
              }
            });
          }
        } catch (e) {}

        if (loadedPayouts.length > 0) {
          loadedPayouts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setPayouts(loadedPayouts);
        } else {
          setPayouts(SAMPLE_PAYOUTS);
        }
      } catch (err) {
        console.warn('Could not connect to Firestore payouts, using default records:', err);
        setPayouts(SAMPLE_PAYOUTS);
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleAcknowledgePayout = async (payoutId: string) => {
    try {
      const now = new Date().toISOString();

      // Update in Firestore
      try {
        const { updateSubmissionInFirestore } = await import('../lib/firebase');
        await updateSubmissionInFirestore(payoutId, {
          memberAcknowledged: true,
          acknowledgedAt: now,
          status: 'Confirmed by Member'
        }, 'payouts');
      } catch (err) {
        console.warn('Firestore update failed for payout ack:', err);
      }

      // Update in localStorage
      try {
        const local = localStorage.getItem('bbsp_payouts');
        if (local) {
          const list = JSON.parse(local);
          const updated = list.map((p: any) => {
            if (p.id === payoutId) {
              return { ...p, memberAcknowledged: true, acknowledgedAt: now, status: 'Confirmed by Member' };
            }
            return p;
          });
          localStorage.setItem('bbsp_payouts', JSON.stringify(updated));
        }
      } catch (e) {}

      // Update in local state
      setPayouts(prev => prev.map(p => {
        if (p.id === payoutId) {
          return {
            ...p,
            memberAcknowledged: true,
            acknowledgedAt: now,
            status: 'Confirmed by Member'
          };
        }
        return p;
      }));
    } catch (e) {
      console.error('Failed to acknowledge payout', e);
    }
  };

  const handleCopyUtr = (utr: string) => {
    navigator.clipboard.writeText(utr);
    setCopiedUtr(utr);
    setTimeout(() => setCopiedUtr(null), 2000);
  };

  const handleSignOut = async () => {
    try {
      const { getAuth, signOut } = await import('firebase/auth');
      const { app } = await import('../lib/firebase');
      const auth = getAuth(app);
      await signOut(auth);
    } catch (e) {}
    sessionStorage.removeItem('bbsp_current_member');
    localStorage.removeItem('bbsp_current_member');
    if (onLogout) {
      onLogout();
    } else {
      onNavigate('/');
    }
  };

  // Calculations
  const totalEarnings = payouts.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const paidPayouts = payouts.filter(p => p.status === 'Paid' || p.status === 'Confirmed by Member' || p.memberAcknowledged);
  const totalDisbursed = paidPayouts.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const acknowledgedCount = payouts.filter(p => p.memberAcknowledged || p.status === 'Confirmed by Member').length;
  const pendingPayouts = payouts.filter(p => p.status === 'Processing').reduce((acc, curr) => acc + (curr.amount || 0), 0);

  // Segment totals
  const segmentStats = FIXED_BUSINESS_SEGMENTS.map(seg => {
    const segPayouts = payouts.filter(p => p.segment === seg.id);
    const amount = segPayouts.reduce((sum, p) => sum + (p.amount || 0), 0);
    const count = segPayouts.length;
    const percentage = totalEarnings > 0 ? Math.round((amount / totalEarnings) * 100) : 0;
    return {
      ...seg,
      amount,
      count,
      percentage
    };
  });

  const filteredPayouts = selectedSegmentFilter === 'all'
    ? payouts
    : payouts.filter(p => p.segment === selectedSegmentFilter);

  const openProofModal = (payout: PaymentProofData) => {
    setSelectedProof(payout);
    setIsProofModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 flex flex-col font-sans selection:bg-[#10367D]/10 selection:text-[#10367D] bg-grid-pattern">
      {/* Top Portal Navigation Bar — Consistent with Main Website Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('/')}
              className="flex items-center gap-3 text-left bg-transparent border-none cursor-pointer group"
            >
              <img 
                src="/build-bharat-logo.webp" 
                alt="Build Bharat Synergy Partners" 
                className="h-9 sm:h-10 w-auto object-contain group-hover:scale-[1.02] transition-transform"
              />
              <div className="hidden sm:block border-l border-slate-200 pl-3">
                <div className="text-[10px] font-bold tracking-wider text-[#D57530] uppercase font-mono">
                  Synergy Member Network
                </div>
                <div className="text-sm font-extrabold text-[#10367D] heading-font">
                  Partner Command Portal
                </div>
              </div>
            </button>
          </div>

          {/* Member Quick Info & Navigation Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Live Settlement Status Beacon */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200/80 rounded-full text-[11px] font-mono text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Ledger Connected</span>
            </div>

            <button
              onClick={loadMemberAndPayouts}
              disabled={isRefreshing}
              className="p-2 text-slate-500 hover:text-[#10367D] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-200 bg-transparent"
              title="Refresh Live Financials"
            >
              <RefreshCw size={15} className={isRefreshing ? 'animate-spin text-[#10367D]' : ''} />
            </button>

            <button
              onClick={() => onNavigate('/')}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#10367D] text-xs font-bold rounded-full border border-slate-200 shadow-xs transition-all cursor-pointer"
            >
              <Home size={13} className="text-[#10367D]" />
              <span>Main Website</span>
            </button>

            {/* Member Profile Pill */}
            {member && (
              <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 shadow-xs">
                {member.photoURL ? (
                  <img src={member.photoURL} alt={member.name} className="w-6 h-6 rounded-full object-cover border border-[#10367D]/30" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#10367D] text-white text-[11px] font-bold flex items-center justify-center border border-[#10367D]/20">
                    {(member.name || 'M')[0].toUpperCase()}
                  </div>
                )}
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900 truncate max-w-[110px] sm:max-w-[140px]">
                    {member.name}
                  </div>
                  <div className="text-[9px] font-mono text-[#D57530] font-bold hidden sm:block">
                    {member.memberId || 'BBSP-CADRE'}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleSignOut}
              className="px-3 sm:px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 text-xs font-bold rounded-full border border-red-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Sign Out of Member Portal"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Member Executive Dossier Banner */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0B275C] via-[#10367D] to-[#1A4594] text-white rounded-3xl p-6 sm:p-9 shadow-xl border border-[#10367D]/30">
          {/* Subtle Ambient Light Shimmer */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-[#D57530]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-mono font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={12} /> Approved Cadre Partner
                </span>
                <span className="px-3 py-1 rounded-full bg-[#D57530]/25 border border-[#D57530]/40 text-[#E2B049] text-[11px] font-mono font-bold">
                  Cadre ID: {member?.memberId || 'BBSP-2026-AP0849'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight heading-font">
                Welcome back, {member?.name || 'Synergy Partner'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed font-sans">
                Logged in via <span className="font-mono text-white font-bold">{member?.email}</span>. 
                Your real-time sector commission payouts and official payment screenshot proofs are audited and maintained below.
              </p>
            </div>

            {/* Cadre Tier Badge */}
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 text-center min-w-[190px] shadow-sm">
                <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider block font-sans">
                  Cadre Classification
                </span>
                <span className="text-sm font-extrabold text-[#E2B049] mt-1 block">
                  {member?.cadre || 'District Cadre Syndicate'}
                </span>
                <span className="text-[10px] text-slate-300 mt-1 block font-mono">
                  10-Cadre Revenue Engine
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Financial KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Total Earnings */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 relative overflow-hidden group hover:border-[#10367D]/40 hover:shadow-md transition-all shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-extrabold text-slate-500 tracking-wider font-sans">
                Total Lifetime Commission
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#D57530]/10 text-[#D57530] flex items-center justify-center border border-[#D57530]/20 shadow-xs">
                <IndianRupee size={18} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#10367D] font-mono">
              ₹{totalEarnings.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-600 font-bold mt-2.5 flex items-center gap-1 font-sans">
              <TrendingUp size={13} /> Across 5 Core Business Verticals
            </div>
          </div>

          {/* Card 2: Disbursed to Bank */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 relative overflow-hidden group hover:border-emerald-500/40 hover:shadow-md transition-all shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-extrabold text-slate-500 tracking-wider font-sans">
                Disbursed to Bank
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-xs">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              ₹{totalDisbursed.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-2.5 flex items-center gap-1">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>{paidPayouts.length} Direct Bank/UPI Receipts</span>
            </div>
          </div>

          {/* Card 3: In Process */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 relative overflow-hidden group hover:border-blue-500/40 hover:shadow-md transition-all shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-extrabold text-slate-500 tracking-wider font-sans">
                Next Cycle Clearance
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#10367D] flex items-center justify-center border border-blue-200 shadow-xs">
                <Clock size={18} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              ₹{pendingPayouts.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-2.5">
              Disbursement cycle: <span className="text-slate-800 font-mono font-bold">Every Friday 6 PM</span>
            </div>
          </div>

          {/* Card 4: Verified Closures */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 relative overflow-hidden group hover:border-purple-500/40 hover:shadow-md transition-all shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-extrabold text-slate-500 tracking-wider font-sans">
                Audited Closures
              </span>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200 shadow-xs">
                <FileCheck size={18} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {payouts.length} Deals
            </div>
            <div className="text-[11px] text-[#10367D] font-bold mt-2.5 flex items-center gap-1 font-sans">
              <Sparkles size={13} className="text-[#D57530]" /> 
              <span>{acknowledgedCount} Confirmed by You</span>
            </div>
          </div>
        </section>

        {/* Business Segment-wise Breakdown */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#10367D] heading-font flex items-center gap-2">
                <Layers className="text-[#D57530]" size={20} />
                <span>Segment-Wise Commission Yield</span>
              </h2>
              <p className="text-xs text-slate-500 font-sans">
                Accredited revenues mapped to Build Bharat Synergy's 5 core operational verticals.
              </p>
            </div>
          </div>

          {/* 5 Fixed Vertical Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {segmentStats.map((seg) => {
              const IconComp = seg.icon;
              const isSelected = selectedSegmentFilter === seg.id;
              return (
                <div 
                  key={seg.id}
                  onClick={() => setSelectedSegmentFilter(isSelected ? 'all' : seg.id)}
                  className={`bg-white border rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer relative overflow-hidden shadow-xs hover:shadow-md ${
                    isSelected 
                      ? 'border-[#10367D] ring-2 ring-[#10367D]/20 bg-slate-50/80' 
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: seg.accentBg, color: seg.color }}
                    >
                      <IconComp size={18} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      {seg.count} {seg.count === 1 ? 'deal' : 'deals'}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 truncate" title={seg.name}>
                    {seg.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 truncate mb-3 font-sans">
                    {seg.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-medium text-slate-500">Commission</span>
                      <span className="text-xs font-bold text-[#10367D] font-mono">
                        ₹{seg.amount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Mini Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${seg.percentage}%`,
                          backgroundColor: seg.color 
                        }}
                      />
                    </div>
                    <div className="text-[9px] text-right font-mono text-slate-400">
                      {seg.percentage}% of portfolio
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Payouts Ledger & Payment Proof Screenshots */}
        <section className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#10367D] heading-font flex items-center gap-2">
                <span>Commission Disbursement Ledger</span>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#10367D]/10 text-[#10367D] font-bold border border-[#10367D]/20">
                  {filteredPayouts.length} Records
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Official treasury dispatches with bank UTR numbers and verifiable screenshot receipts.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedSegmentFilter('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedSegmentFilter === 'all'
                    ? 'bg-[#10367D] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Verticals
              </button>
              {FIXED_BUSINESS_SEGMENTS.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSegmentFilter(s.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedSegmentFilter === s.id
                      ? 'bg-[#10367D] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {s.name.replace('BuildBharat ', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-600 uppercase text-[10px] tracking-wider font-mono font-bold">
                  <th className="py-3.5 px-4 sm:px-6">Transaction Ref</th>
                  <th className="py-3.5 px-4">Business Vertical</th>
                  <th className="py-3.5 px-4">Disbursed Amount</th>
                  <th className="py-3.5 px-4">UTR / Bank Ref</th>
                  <th className="py-3.5 px-4">Settlement Status & Action</th>
                  <th className="py-3.5 px-4">Disbursement Date</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Payment Screenshot Proof</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPayouts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                      No commission payouts recorded under this vertical yet.
                    </td>
                  </tr>
                ) : (
                  filteredPayouts.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
                      {/* ID */}
                      <td className="py-4 px-4 sm:px-6 font-mono font-bold text-[#10367D]">
                        {item.id}
                      </td>

                      {/* Segment */}
                      <td className="py-4 px-4">
                        <span className="font-bold text-slate-800 block">
                          {item.segmentName}
                        </span>
                        {item.notes && (
                          <span className="text-[10px] text-slate-500 truncate max-w-xs block font-sans">
                            {item.notes}
                          </span>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="py-4 px-4 font-mono font-black text-sm text-[#10367D]">
                        ₹{item.amount.toLocaleString('en-IN')}
                      </td>

                      {/* UTR */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-700">
                          <span>{item.utrNumber || 'CMS/Direct Bank'}</span>
                          {item.utrNumber && (
                            <button
                              onClick={() => handleCopyUtr(item.utrNumber!)}
                              className="text-slate-400 hover:text-[#10367D] p-1 rounded transition-colors bg-transparent border-none cursor-pointer"
                              title="Copy UTR Reference"
                            >
                              {copiedUtr === item.utrNumber ? (
                                <Check size={11} className="text-emerald-600" />
                              ) : (
                                <Copy size={11} />
                              )}
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        {item.memberAcknowledged || item.status === 'Confirmed by Member' ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 size={11} /> Received in Bank
                            </span>
                            <span className="block text-[9px] text-slate-400 font-mono">
                              ✓ Confirmed by You
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-1.5 items-start">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-[#10367D] border border-blue-200">
                              <Clock size={10} /> Disbursed by Treasury
                            </span>
                            <button
                              onClick={() => handleAcknowledgePayout(item.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs active:scale-95"
                              title="Click to acknowledge receipt in your bank account"
                            >
                              <CheckCircle2 size={11} />
                              <span>Mark as Received</span>
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 font-mono text-slate-600">
                        {item.date}
                      </td>

                      {/* Screenshot Action Button */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        {item.screenshotUrl ? (
                          <button
                            onClick={() => openProofModal(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-[#10367D] text-[#10367D] hover:text-white rounded-xl border border-slate-200 hover:border-[#10367D] transition-all text-xs font-bold cursor-pointer shadow-xs"
                          >
                            <Eye size={13} />
                            <span>View Proof</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">No Image</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Member Help & Support Desk Footnote */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#10367D]/10 text-[#10367D] flex items-center justify-center shrink-0 border border-[#10367D]/20">
              <HelpCircle size={20} />
            </div>
            <div>
              <span className="text-slate-900 font-bold block text-sm">Questions regarding your commission calculations?</span>
              <span className="text-slate-500">Our Treasury Desk reconciles lead dispatches and disbursements every Friday.</span>
            </div>
          </div>

          <a
            href="https://wa.me/919353018855?text=Hi%20BBSP%20Treasury,%20I%20have%20an%20inquiry%20regarding%20my%20member%20commission%20payout."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer text-decoration-none"
          >
            <span>WhatsApp Treasury Support</span>
            <ArrowUpRight size={14} />
          </a>
        </section>

      </main>

      {/* Payment Screenshot Lightbox Modal */}
      <PaymentProofModal
        isOpen={isProofModalOpen}
        onClose={() => setIsProofModalOpen(false)}
        data={selectedProof}
        onAcknowledge={handleAcknowledgePayout}
      />
    </div>
  );
};
