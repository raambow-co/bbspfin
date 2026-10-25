import React, { useState } from 'react';
import { X, ShieldCheck, Lock, AlertCircle, ArrowRight, Sparkles, CheckCircle2, Mail } from 'lucide-react';

interface MemberLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin?: (memberData: any) => void;
  onOpenPartnerModal?: () => void;
  onEnterDemoMode?: () => void;
}

export const MemberLoginModal: React.FC<MemberLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
  onOpenPartnerModal,
  onEnterDemoMode
}) => {
  const [emailOrCode, setEmailOrCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const commitLoginSession = (matchedMember: any, email: string, displayName?: string, photoURL?: string | null) => {
    const cleanEmail = email.toLowerCase().trim();
    const memberPayload = {
      id: matchedMember.id || matchedMember.firestoreDocId || matchedMember.membershipCode || 'BBSP-MEMBER',
      name: matchedMember.fullName || matchedMember.name || displayName || 'BBSP Partner',
      email: cleanEmail,
      phone: matchedMember.phone || '',
      cadre: matchedMember.cadre || matchedMember.membershipCadre || 'District Cadre Syndicate Partner',
      memberId: matchedMember.membershipCode || matchedMember.applicationId || matchedMember.memberId || `BBSP-${cleanEmail.slice(0, 4).toUpperCase()}`,
      photoURL: photoURL || null,
      status: 'Approved',
      bankName: matchedMember.bankName || '',
      accountNumber: matchedMember.accountNumber || '',
      joinedAt: matchedMember.timestamp || matchedMember.submittedAt || new Date().toISOString()
    };

    sessionStorage.setItem('bbsp_current_member', JSON.stringify(memberPayload));
    localStorage.setItem('bbsp_current_member', JSON.stringify(memberPayload));

    if (onSuccessLogin) {
      onSuccessLogin(memberPayload);
    }
    onClose();
  };

  // Direct Login using registered Email ID or Membership Code
  const handleDirectSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = emailOrCode.trim().toLowerCase();
    if (!cleanInput) {
      setErrorMessage('Please enter your registered Email ID or Membership Code.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { db, getApprovedMemberByEmail } = await import('../lib/firebase');
      const { collection, getDocs, query, where } = await import('firebase/firestore');

      let isApproved = false;
      let matchedMember: any = null;
      let memberStatus = 'not_found';

      // 1. Direct check using getApprovedMemberByEmail
      if (cleanInput.includes('@')) {
        try {
          const approvedData = await getApprovedMemberByEmail(cleanInput);
          if (approvedData) {
            isApproved = true;
            matchedMember = approvedData;
            memberStatus = 'approved';
          }
        } catch (err) {
          console.warn('getApprovedMemberByEmail check error:', err);
        }
      }

      // 2. Query Firestore submissions collection (by email or membershipCode)
      if (!isApproved) {
        try {
          const subCol = collection(db, 'submissions');
          const isEmail = cleanInput.includes('@');
          const q = isEmail 
            ? query(subCol, where('email', '==', cleanInput))
            : query(subCol, where('membershipCode', '==', cleanInput.toUpperCase()));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((docSnap) => {
              const data = docSnap.data();
              const rawStatus = (data.status || '').toLowerCase().trim();
              memberStatus = rawStatus;
              if (rawStatus === 'approved' || rawStatus === 'sanctioned' || data.isApproved === true) {
                isApproved = true;
                matchedMember = { id: docSnap.id, ...data };
              } else if (!matchedMember) {
                matchedMember = { id: docSnap.id, ...data };
              }
            });
          }
        } catch (err) {
          console.warn('Firestore query error:', err);
        }
      }

      // 3. Fallback check in local storage cache
      if (!isApproved) {
        try {
          const cachedRaw = localStorage.getItem('bbsp_enquiries');
          if (cachedRaw) {
            const cachedLeads = JSON.parse(cachedRaw);
            const found = cachedLeads.find((l: any) => 
              (l.email || '').toLowerCase().trim() === cleanInput ||
              (l.membershipCode || '').toUpperCase() === cleanInput.toUpperCase() ||
              (l.id || '').toUpperCase() === cleanInput.toUpperCase()
            );
            if (found) {
              const rawStatus = (found.status || '').toLowerCase().trim();
              memberStatus = rawStatus;
              if (rawStatus === 'approved' || rawStatus === 'sanctioned' || found.isApproved === true) {
                isApproved = true;
                matchedMember = found;
              } else if (!matchedMember) {
                matchedMember = found;
              }
            }
          }
        } catch (e) {}
      }

      if (isApproved && matchedMember) {
        commitLoginSession(matchedMember, matchedMember.email || cleanInput);
      } else {
        if (memberStatus === 'pending' || memberStatus === 'under review') {
          setErrorMessage(
            `Application Under Review: Your partnership application for "${cleanInput}" is currently awaiting desk verification. Admin approval usually completes within 24 hours.`
          );
        } else if (memberStatus === 'rejected') {
          setErrorMessage(
            `Membership Application Declined: The application associated with "${cleanInput}" was not approved. Please contact our treasury desk.`
          );
        } else {
          setErrorMessage(
            `Access Restricted: "${cleanInput}" is not found or not yet approved. Once the Admin approves your application in the dashboard, access is immediately unlocked.`
          );
        }
      }
    } catch (err: any) {
      console.error('Direct Sign-In Error:', err);
      setErrorMessage(err.message || 'Unable to authenticate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Google Single Sign-On
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { getAuth, GoogleAuthProvider, signInWithPopup, signOut } = await import('firebase/auth');
      const { app, db, getApprovedMemberByEmail } = await import('../lib/firebase');
      const { collection, getDocs, query, where } = await import('firebase/firestore');

      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userEmail = (user.email || '').toLowerCase().trim();

      let isApproved = false;
      let matchedMember: any = null;
      let memberStatus = 'not_found';

      // 1. Direct check using getApprovedMemberByEmail
      try {
        const approvedData = await getApprovedMemberByEmail(userEmail);
        if (approvedData) {
          isApproved = true;
          matchedMember = approvedData;
          memberStatus = 'approved';
        }
      } catch (err) {
        console.warn('getApprovedMemberByEmail check error:', err);
      }

      // 2. Query Firestore submissions
      if (!isApproved) {
        try {
          const q = query(
            collection(db, 'submissions'),
            where('email', '==', userEmail)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((docSnap) => {
              const data = docSnap.data();
              const rawStatus = (data.status || '').toLowerCase().trim();
              memberStatus = rawStatus;
              if (rawStatus === 'approved' || rawStatus === 'sanctioned' || data.isApproved === true) {
                isApproved = true;
                matchedMember = { id: docSnap.id, ...data };
              } else if (!matchedMember) {
                matchedMember = { id: docSnap.id, ...data };
              }
            });
          }
        } catch (err) {
          console.warn('Firestore query error:', err);
        }
      }

      // 3. Check local cache fallback
      if (!isApproved) {
        try {
          const cachedRaw = localStorage.getItem('bbsp_enquiries');
          if (cachedRaw) {
            const cachedLeads = JSON.parse(cachedRaw);
            const found = cachedLeads.find((l: any) => (l.email || '').toLowerCase().trim() === userEmail);
            if (found) {
              const rawStatus = (found.status || '').toLowerCase().trim();
              memberStatus = rawStatus;
              if (rawStatus === 'approved' || rawStatus === 'sanctioned' || found.isApproved === true) {
                isApproved = true;
                matchedMember = found;
              } else if (!matchedMember) {
                matchedMember = found;
              }
            }
          }
        } catch (e) {}
      }

      if (isApproved && matchedMember) {
        commitLoginSession(matchedMember, userEmail, user.displayName || undefined, user.photoURL || null);
      } else {
        await signOut(auth);

        if (memberStatus === 'pending' || memberStatus === 'under review') {
          setErrorMessage(
            `Application Under Review: Your partnership application for "${userEmail}" is awaiting desk verification. Admin approval usually completes within 24 hours.`
          );
        } else if (memberStatus === 'rejected') {
          setErrorMessage(
            `Membership Application Declined: The application associated with "${userEmail}" was not approved. Please reach out to our treasury desk for details.`
          );
        } else {
          setErrorMessage(
            `Access Restricted: "${userEmail}" is not listed as an approved BBSP Partner. Please complete partner onboarding and fee verification first.`
          );
        }
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setErrorMessage(err.message || 'Unable to authenticate with Google. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoMode = () => {
    sessionStorage.setItem('bbsp_current_member', JSON.stringify({
      id: 'demo-member-001',
      name: 'D. Sudheer Reddy (Demo)',
      email: 'sudheer.demo@gmail.com',
      phone: '+91 93530 18855',
      cadre: 'District Cadre Syndicate Partner',
      memberId: 'BBSP-2026-AP0849',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      status: 'Approved',
      joinedAt: '2026-02-15'
    }));

    if (onEnterDemoMode) {
      onEnterDemoMode();
    } else if (onSuccessLogin) {
      onSuccessLogin({
        id: 'demo-member-001',
        name: 'D. Sudheer Reddy (Demo)',
        email: 'sudheer.demo@gmail.com'
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white border border-slate-200/90 rounded-3xl shadow-[0_25px_60px_-15px_rgba(16,54,125,0.25)] p-6 sm:p-8 text-center text-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Brand Lighting */}
        <div className="absolute -top-24 -left-24 w-56 h-56 bg-[#10367D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-[#D57530]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 p-2 rounded-full border border-stone-200 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Official Brand Logo */}
        <div className="flex flex-col items-center justify-center pt-1 mb-4">
          <div className="p-2.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs mb-3">
            <img 
              src="/build-bharat-logo.webp" 
              alt="Build Bharat Synergy Partners" 
              className="h-11 w-auto object-contain" 
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10367D]/10 border border-[#10367D]/20 text-[#10367D] text-[10px] font-bold uppercase tracking-wider font-mono">
            <ShieldCheck size={12} className="text-[#D57530]" />
            <span>Authorized Partner Gateway</span>
          </div>
        </div>

        {/* Title & Editorial Subtext */}
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#10367D] heading-font">
          Member Command Access
        </h2>
        <p className="text-xs text-slate-600 mt-2 mb-5 max-w-sm mx-auto leading-relaxed font-sans">
          Enter your registered Email ID or Membership Code. Once approved by Admin, your portal access is instantly verified.
        </p>

        {/* Error Message Box */}
        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-left flex items-start gap-2.5 text-xs text-red-700 shadow-sm animate-fadeIn">
            <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {/* Direct Email / Membership Code Login Form */}
        <form onSubmit={handleDirectSignIn} className="space-y-2.5 mb-4 text-left">
          <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block ml-1">
            Registered Email or Member ID
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="e.g. partner@gmail.com or BBSP0001"
              value={emailOrCode}
              onChange={(e) => setEmailOrCode(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:border-[#10367D] focus:bg-white transition-all font-medium"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#10367D] hover:bg-[#154699] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer border-none shadow-md flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99]"
          >
            {isLoading ? (
              <span>Verifying Desk Approval...</span>
            ) : (
              <>
                <span>Access Member Dashboard</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-3.5">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">or single sign-on</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Google Authentication Action */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl flex items-center justify-center gap-3 border border-slate-300 hover:border-[#10367D]/50 shadow-xs hover:shadow-sm transition-all transform active:scale-[0.99] cursor-pointer disabled:opacity-60 text-xs sm:text-sm group"
          >
            {/* Google G SVG */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="text-[#10367D] group-hover:text-slate-900 transition-colors">
              Sign In with Google Account
            </span>
          </button>

          {/* Institutional Trust Ribbon */}
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-[11px] text-slate-600 text-left space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Lock size={12} className="text-[#D57530]" />
              <span>Passwordless Security · Admin Sanctioned Access</span>
            </div>
            <p className="leading-relaxed text-slate-500 pl-4">
              Dashboard access is strictly granted to Email IDs approved by D. Sudheer Reddy (Admin & Managing Director).
            </p>
          </div>

          {/* Instant Demo Mode (For Testing and Visual Preview) */}
          <div className="pt-0.5">
            <button
              onClick={handleDemoMode}
              type="button"
              className="w-full py-2.5 px-4 bg-[#10367D]/5 hover:bg-[#10367D]/10 border border-[#10367D]/20 text-[#10367D] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <Sparkles size={14} className="text-[#D57530] group-hover:rotate-12 transition-transform" />
              <span>Explore Member Dashboard UI (Instant Demo Mode)</span>
            </button>
          </div>
        </div>

        {/* Footer Link & Application Callout */}
        <div className="mt-5 pt-3.5 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <span>Not yet a registered partner?</span>
          <button
            onClick={() => {
              onClose();
              if (onOpenPartnerModal) onOpenPartnerModal();
            }}
            className="text-[#10367D] hover:text-[#D57530] font-bold flex items-center gap-1 cursor-pointer bg-transparent border-none transition-colors"
          >
            <span>Apply Now</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};
