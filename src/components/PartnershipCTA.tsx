import { submitToFirestore } from '../lib/firebase';
import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  X,
  FileText,
  Loader2,
  UploadCloud,
  ImageIcon,
  Landmark,
  UserCheck,
  FileCheck,
  Copy,
  AlertCircle,
  Building2,
  Sun,
  Coins,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  MessageSquare,
  Eye,
  EyeOff,
  Trash2,
  RefreshCw,
  Maximize2,
  Users,
  Award,
  BadgeCheck,
  Calendar
} from 'lucide-react';
import { DocumentPreviewModal, PreviewableDocument } from './DocumentPreviewModal';

interface PartnershipCTAProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  onOpenModal: () => void;
  currentPath?: string;
}

interface UploadedDocument {
  file: File;
  previewUrl: string;
  name: string;
  sizeFormatted: string;
}

export const PartnershipCTA: React.FC<PartnershipCTAProps> = ({
  isModalOpen,
  onCloseModal,
  onOpenModal,
  currentPath = ''
}) => {
  const [step, setStep] = useState(1);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Map Section Quick Enquiry State
  const [mapEnquiry, setMapEnquiry] = useState({
    fullName: '',
    phone: '',
    email: '',
    category: 'loans',
    city: '',
    message: ''
  });
  const [mapEnquiryErrors, setMapEnquiryErrors] = useState<Record<string, string>>({});
  const [mapEnquiryLoading, setMapEnquiryLoading] = useState(false);
  const [mapEnquirySuccess, setMapEnquirySuccess] = useState(false);
  const [mapEnquiryId, setMapEnquiryId] = useState('');

  const validateMapEnquiry = () => {
    const errors: Record<string, string> = {};
    if (!mapEnquiry.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!mapEnquiry.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(mapEnquiry.phone.replace(/[^0-9]/g, '').slice(-10))) {
      errors.phone = 'Enter valid 10-digit mobile number';
    }
    if (!mapEnquiry.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(mapEnquiry.email)) {
      errors.email = 'Enter valid email address';
    }
    if (!mapEnquiry.message.trim()) {
      errors.message = 'Please describe your requirement';
    }
    setMapEnquiryErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleMapEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateMapEnquiry()) return;

    setMapEnquiryLoading(true);

    try {
      const generatedId = 'ENQ-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const payload = {
        id: generatedId,
        formType: 'map-enquiry',
        mapServiceInterest: mapEnquiry.category,
        mapEnquiryMessage: mapEnquiry.message,
        timestamp: new Date().toISOString(),
        fullName: mapEnquiry.fullName,
        applicantName: mapEnquiry.fullName,
        phone: mapEnquiry.phone,
        email: mapEnquiry.email,
        category: mapEnquiry.category,
        city: mapEnquiry.city || 'Hyderabad',
        message: mapEnquiry.message,
        status: 'received'
      };

      // Try sending to backend API if available
      try {
        await submitToFirestore(payload, 'submissions');
        await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn('API sync fallback to local storage', err);
      }

      // Persist in localStorage for admin panel & real-time sync
      try {
        const existing = JSON.parse(localStorage.getItem('bbsp_enquiries') || '[]');
        localStorage.setItem('bbsp_enquiries', JSON.stringify([payload, ...existing]));
      } catch (storageErr) {
        console.warn('LocalStorage save error', storageErr);
      }

      setMapEnquiryId(generatedId);
      setMapEnquirySuccess(true);
    } catch (error) {
      console.error('Error submitting enquiry', error);
      alert('Failed to submit enquiry. Please try again or call our hotline.');
    } finally {
      setMapEnquiryLoading(false);
    }
  };

  const handleResetMapEnquiry = () => {
    setMapEnquiry({
      fullName: '',
      phone: '',
      email: '',
      category: 'loans',
      city: '',
      message: ''
    });
    setMapEnquiryErrors({});
    setMapEnquirySuccess(false);
    setMapEnquiryId('');
  };

  // Form State
  const [formData, setFormData] = useState({
    // Step 2: Personal & KYC
    fullName: '',
    email: '',
    phone: '',
    permanentAddress: '',
    dob: '',
    age: '',
    nomineeName: '',
    nomineeRelation: 'Spouse',
    nomineeAge: '',
    existingMemberName: '',
    existingMemberNumber: '',
    aadhaarNumber: '',
    panNumber: '',

    // Step 3: Banking Details
    accountHolderName: '',
    bankName: '',
    branchName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',

    // Step 4: Payment
    refundName: '',
    transactionId: '',
  });

  // Document Uploads
  const [aadhaarDoc, setAadhaarDoc] = useState<UploadedDocument | null>(null);
  const [panDoc, setPanDoc] = useState<UploadedDocument | null>(null);
  const [chequeDoc, setChequeDoc] = useState<UploadedDocument | null>(null);
  const [screenshotDoc, setScreenshotDoc] = useState<UploadedDocument | null>(null);
  const [previewDoc, setPreviewDoc] = useState<{ doc: PreviewableDocument; title: string } | null>(null);
  const [isQrEnlarged, setIsQrEnlarged] = useState<boolean>(false);
  const [membershipCode] = useState<string>('BBSP-MEM-' + Math.floor(100000 + Math.random() * 900000));

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [showConfirmAccountNumber, setShowConfirmAccountNumber] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<UploadedDocument | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setter({
        file,
        previewUrl,
        name: file.name,
        sizeFormatted: formatFileSize(file.size),
      });
    }
  };

  const formatDobToIso = (dob: string): string => {
    if (!dob) return '';
    const parts = dob.split('/');
    if (parts.length === 3 && parts[2]?.length === 4) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return '';
  };

  const handleCalendarDateChange = (isoDate: string) => {
    if (!isoDate) return;
    const [y, m, d] = isoDate.split('-');
    const formattedDob = `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
    const birthYear = parseInt(y, 10);
    const birthMonth = parseInt(m, 10) - 1;
    const birthDay = parseInt(d, 10);

    const today = new Date();
    let calcAge = today.getFullYear() - birthYear;
    const monthDiff = today.getMonth() - birthMonth;
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay)) {
      calcAge--;
    }

    setFormData((prev) => ({
      ...prev,
      dob: formattedDob,
      age: calcAge > 0 && calcAge < 120 ? String(calcAge) : ''
    }));
  };

  // Step 1 Validation
  const handleNextStep1 = () => {
    if (policyAccepted && termsAccepted) {
      setStep(2);
    }
  };

  // Step 2 Validation (KYC & Profile)
  const validateStep2 = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.permanentAddress.trim()) {
      errors.permanentAddress = 'Permanent Address is required';
    }

    if (!formData.dob.trim()) {
      errors.dob = 'Date of Birth (DD/MM/YYYY) is required';
    }

    if (!formData.age.trim()) {
      errors.age = 'Age is required';
    }

    if (!formData.nomineeName.trim()) {
      errors.nomineeName = 'Nominee Full Name is required';
    }

    if (!formData.nomineeRelation.trim()) {
      errors.nomineeRelation = 'Nominee Relation is required';
    }

    if (!formData.nomineeAge.trim()) {
      errors.nomineeAge = 'Nominee Age is required';
    }

    // Aadhaar Number Validation (12 digits)
    const cleanAadhaar = formData.aadhaarNumber.replace(/\s/g, '');
    if (!cleanAadhaar) {
      errors.aadhaarNumber = 'Aadhaar Number is required';
    } else if (!/^\d{12}$/.test(cleanAadhaar)) {
      errors.aadhaarNumber = 'Aadhaar must be a 12-digit number';
    }

    if (!aadhaarDoc) {
      errors.aadhaarDoc = 'Please upload a clear copy of your Aadhaar Card';
    }

    // PAN Card Validation (10 chars e.g. ABCDE1234F)
    const cleanPan = formData.panNumber.trim().toUpperCase();
    if (!cleanPan) {
      errors.panNumber = 'PAN Card Number is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(cleanPan)) {
      errors.panNumber = 'Invalid PAN format (e.g. ABCDE1234F)';
    }

    if (!panDoc) {
      errors.panDoc = 'Please upload a clear copy of your PAN Card';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep2 = () => {
    if (validateStep2()) {
      if (!formData.refundName) {
        setFormData((prev) => ({ ...prev, refundName: prev.fullName }));
      }
      setStep(3);
    }
  };

  // Step 3 Validation (Banking)
  const validateStep3 = () => {
    const errors: Record<string, string> = {};

    if (!formData.accountHolderName.trim()) {
      errors.accountHolderName = 'Account holder name is required';
    }
    if (!formData.bankName.trim()) {
      errors.bankName = 'Bank name is required';
    }
    if (!formData.branchName.trim()) {
      errors.branchName = 'Branch name is required';
    }
    if (!formData.accountNumber.trim()) {
      errors.accountNumber = 'Account number is required';
    } else if (!/^\d{9,18}$/.test(formData.accountNumber.trim())) {
      errors.accountNumber = 'Please enter a valid 9 to 18-digit account number';
    }
    if (!formData.confirmAccountNumber.trim()) {
      errors.confirmAccountNumber = 'Please confirm your account number';
    } else if (formData.accountNumber.trim() !== formData.confirmAccountNumber.trim()) {
      errors.confirmAccountNumber = 'Account numbers do not match';
    }
    if (!formData.ifscCode.trim()) {
      errors.ifscCode = 'IFSC Code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.trim().toUpperCase())) {
      errors.ifscCode = 'Invalid IFSC code (e.g. SBIN0001234)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep3 = () => {
    if (validateStep3()) {
      if (!formData.refundName) {
        setFormData((prev) => ({ ...prev, refundName: prev.fullName }));
      }
      setStep(4);
    }
  };

  // Step 4 Validation (Payment Verification)
  const validateStep4 = () => {
    const errors: Record<string, string> = {};
    if (!formData.refundName.trim()) {
      errors.refundName = 'Refund Account / Beneficiary Name is required';
    }
    if (!screenshotDoc) {
      errors.screenshot = 'Please upload a screenshot of your payment';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmitRegistration = async () => {
    if (!validateStep4()) return;

    setSubmitLoading(true);

    try {
      // Prepare attachments
      const attachmentsPayload: { name: string; type: string; base64: string }[] = [];

      if (screenshotDoc) {
        const b64 = await fileToBase64(screenshotDoc.file);
        attachmentsPayload.push({
          name: `payment-proof_${screenshotDoc.name}`,
          type: screenshotDoc.file.type,
          base64: b64,
        });
      }

      if (aadhaarDoc) {
        const b64 = await fileToBase64(aadhaarDoc.file);
        attachmentsPayload.push({
          name: `aadhaar-card_${aadhaarDoc.name}`,
          type: aadhaarDoc.file.type,
          base64: b64,
        });
      }

      if (panDoc) {
        const b64 = await fileToBase64(panDoc.file);
        attachmentsPayload.push({
          name: `pan-card_${panDoc.name}`,
          type: panDoc.file.type,
          base64: b64,
        });
      }

      if (chequeDoc) {
        const b64 = await fileToBase64(chequeDoc.file);
        attachmentsPayload.push({
          name: `bank-proof_${chequeDoc.name}`,
          type: chequeDoc.file.type,
          base64: b64,
        });
      }

      const payload = {
        formType: 'partner-registration',
        membershipCode: membershipCode,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        permanentAddress: formData.permanentAddress,
        dob: formData.dob,
        age: formData.age,
        nomineeName: formData.nomineeName,
        nomineeRelation: formData.nomineeRelation,
        nomineeAge: formData.nomineeAge,
        existingMemberName: formData.existingMemberName,
        existingMemberNumber: formData.existingMemberNumber,
        aadhaarNumber: formData.aadhaarNumber,
        panNumber: formData.panNumber.toUpperCase(),
        accountHolderName: formData.accountHolderName,
        bankName: formData.bankName,
        branchName: formData.branchName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode.toUpperCase(),
        refundName: formData.refundName || formData.fullName,
        transactionId: formData.transactionId,
        amountPaid: '₹5,000 (100% Refundable Deposit)',
        membershipType: 'Lifetime & Generations',
        attachments: attachmentsPayload,
      };

      const firestorePayload = {
        ...payload,
        status: 'Pending',
        timestamp: new Date().toLocaleDateString('en-GB')
      };
      await submitToFirestore(firestorePayload, 'submissions');
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionId(membershipCode);
        setSubmitSuccess(true);
      } else {
        console.error('Submission failed', data);
        alert(data.error || 'Failed to submit registration. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Error submitting form', error);
      alert('An error occurred while uploading. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setPolicyAccepted(false);
    setTermsAccepted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      permanentAddress: '',
      dob: '',
      age: '',
      nomineeName: '',
      nomineeRelation: 'Spouse',
      nomineeAge: '',
      existingMemberName: '',
      existingMemberNumber: '',
      aadhaarNumber: '',
      panNumber: '',
      accountHolderName: '',
      bankName: '',
      branchName: '',
      accountNumber: '',
      confirmAccountNumber: '',
      ifscCode: '',
      refundName: '',
      transactionId: '',
    });
    setAadhaarDoc(null);
    setPanDoc(null);
    setChequeDoc(null);
    setScreenshotDoc(null);
    setFormErrors({});
    setIsQrEnlarged(false);
    setShowAccountNumber(false);
    setShowConfirmAccountNumber(false);
    setSubmitLoading(false);
    setSubmitSuccess(false);
    setSubmissionId('');
    onCloseModal();
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText('sudheer@buildbharatsp');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const categories = [
    { id: 'solar', name: 'BuildBharat Solar (Clean Energy)', icon: Sun },
    { id: 'loans', name: 'BuildBharat Loans (Capital & Credit)', icon: Coins },
    { id: 'real-estate', name: 'BuildBharat Real Estate (Realty)', icon: Building2 },
    { id: 'education', name: 'EduTech (Vocational & Skill Training)', icon: GraduationCap },
  ];

  return (
    <>
      {/* SECTION CTA BANNER */}
      <section className="py-16 relative bg-grid-pattern overflow-hidden bg-[#FAF9F6] border-b border-stone-200">
        <div className="container-custom relative z-10">
          <div className="bg-[#FFFFFF] rounded-3xl p-8 sm:p-14 border border-stone-200 text-center relative overflow-hidden shadow-2xl glass-panel">
            {/* Background subtle highlights */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#10367D]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#D57530]/5 rounded-full blur-3xl pointer-events-none" />

            {currentPath === '/loans' ? (
              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 text-[#D57530] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 bg-stone-100 border border-stone-200 mb-6 rounded-full subheading-font shadow-sm">
                  <span>RBI-COMPLIANT CREDIT SERVICES</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 heading-font tracking-tight mb-3 uppercase leading-tight">
                  Ready to grow your business?
                </h2>

                <p className="text-xl sm:text-2xl font-bold gradient-gold heading-font mb-6">
                  Apply for BuildBharat Loans today.
                </p>

                <p className="text-stone-650 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
                  Unlock competitive rates, flexible repayment structures, and streamlined digital approvals tailored to your infrastructure or business needs.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={onOpenModal}
                    className="bg-[#10367D] hover:bg-[#10367D]/95 text-white w-full sm:w-auto justify-center text-xs px-8 py-3.5 rounded-full cursor-pointer uppercase tracking-wider font-bold flex items-center gap-1.5 shadow-md border border-[#10367D]"
                  >
                    <span>Apply For Partnership</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => {
                      window.location.href = 'tel:+919353018855';
                    }}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-850 border border-stone-200 w-full sm:w-auto justify-center text-xs px-8 py-3.5 rounded-full cursor-pointer uppercase tracking-wider font-bold shadow-sm"
                  >
                    <span>Talk to an Advisor</span>
                  </button>
                </div>
              </div>
            ) : currentPath === '/solar' || currentPath === '/sriram-solar' ? (
              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 text-[#D57530] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 bg-stone-100 border border-stone-200 mb-6 rounded-full subheading-font shadow-sm">
                  <span>MNRE EMPANELLED SOLAR PROVIDER</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 heading-font tracking-tight mb-3 uppercase leading-tight text-center">
                  Ready to go solar?
                </h2>

                <p className="text-xl sm:text-2xl font-bold gradient-gold heading-font mb-6 text-center">
                  Get your free site survey today.
                </p>

                <p className="text-stone-650 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto font-normal text-center">
                  Our certified engineers will analyze your roof space, sun path, and monthly utility bills to design a custom high-yield solar PV system with a guaranteed 25-year panel warranty.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={onOpenModal}
                    className="bg-[#10367D] hover:bg-[#10367D]/95 text-white w-full sm:w-auto justify-center text-xs px-8 py-3.5 rounded-full cursor-pointer uppercase tracking-wider font-bold flex items-center gap-1.5 shadow-md border border-[#10367D]"
                  >
                    <span>Register as Partner</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => {
                      window.location.href = 'tel:+919353018855';
                    }}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-850 border border-stone-200 w-full sm:w-auto justify-center text-xs px-8 py-3.5 rounded-full cursor-pointer uppercase tracking-wider font-bold shadow-sm"
                  >
                    <span>Talk to an Advisor</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 text-[#D57530] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 bg-stone-100 border border-stone-200 mb-6 rounded-full subheading-font shadow-sm">
                  <span>BUILD BHARAT SYNERGY NETWORK</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 heading-font tracking-tight mb-3 uppercase leading-tight">
                  “Build something bigger.”
                </h2>

                <p className="text-xl sm:text-2xl font-bold gradient-gold heading-font mb-6">
                  Join South India's Premier B2B Multi-Brand Ecosystem.
                </p>


                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                  <button
                    onClick={onOpenModal}
                    className="btn-gold w-full sm:w-auto justify-center text-xs px-8 py-3.5 rounded-full cursor-pointer uppercase tracking-wider font-bold flex items-center gap-2 animate-pulse shadow-lg"
                  >
                    <span>Partner With Us</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => {
                      const el = document.getElementById('pathways');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-850 border border-stone-200 w-full sm:w-auto justify-center text-xs px-8 py-3.5 rounded-full cursor-pointer uppercase tracking-wider font-bold shadow-sm"
                  >
                    <span>Explore Pathways</span>
                  </button>
                </div>
              </div>
            )}

            {/* INTERACTIVE HEADQUARTERS MAP & DIRECT ENQUIRY FORM SECTION (FULL WIDTH) */}
            <div id="map-enquiry-section" className="mt-12 pt-10 border-t border-stone-200 text-left w-full">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 text-[#D57530] text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 bg-[#FAF9F6] border border-stone-200 rounded-full shadow-sm mb-3">
                  <MapPin size={13} className="text-[#D57530]" />
                  <span>REGIONAL HEADQUARTERS & FAST ENQUIRY DESK</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-stone-900 heading-font uppercase tracking-tight">
                  Visit Us or Send an Instant Enquiry
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-2xl mx-auto leading-relaxed font-normal">
                  Locate our corporate headquarters in Hayath Nagar, Hyderabad, or send a direct query to our regional branch specialists.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
                
                {/* LEFT COLUMN: INTERACTIVE MAP & OFFICE INFO (5 Cols) */}
                <div className="lg:col-span-5 bg-[#FAF9F6] border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2.5 bg-[#10367D]/10 text-[#10367D] rounded-2xl">
                          <MapPin size={20} />
                        </span>
                        <div>
                          <h4 className="font-extrabold text-stone-900 text-base heading-font uppercase tracking-wide">
                            Corporate Headquarters
                          </h4>
                          <span className="text-xs text-stone-500 font-sans">Hayath Nagar, Hyderabad</span>
                        </div>
                      </div>
                      <a
                        href="https://maps.google.com/?q=17.320444,78.627167"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#10367D] bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all text-decoration-none shadow-sm"
                      >
                        <Navigation size={13} />
                        <span>Directions</span>
                      </a>
                    </div>

                    {/* Embedded Responsive Map */}
                    <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-inner h-64 sm:h-72 lg:h-[300px] w-full relative bg-white mb-5">
                      <iframe
                        src="https://maps.google.com/maps?q=17.320444,78.627167&hl=en&z=15&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Build Bharat Synergy Partners Location"
                      ></iframe>
                    </div>

                    {/* Address & Quick Contacts */}
                    <div className="space-y-3 text-xs text-stone-700">
                      <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                        <MapPin size={18} className="text-[#D57530] shrink-0 mt-0.5" />
                        <span className="leading-relaxed text-xs sm:text-[13px]">
                          <strong className="text-stone-900">Address:</strong> 5-76/03, Surya Vamsi Nagar, Hayath Nagar, Hyderabad, Telangana - 501505
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <a
                          href="tel:+919353018855"
                          className="flex items-center gap-3 bg-white hover:bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-stone-800 transition-all text-decoration-none shadow-sm"
                        >
                          <span className="p-2 bg-blue-50 text-[#10367D] rounded-xl shrink-0">
                            <Phone size={16} />
                          </span>
                          <div className="truncate">
                            <span className="text-[10px] text-stone-500 uppercase font-bold block">Hotline</span>
                            <span className="font-bold text-xs sm:text-sm text-stone-900">+91 93530 18855</span>
                          </div>
                        </a>

                        <a
                          href="mailto:sudheer@buildbharatsp.com"
                          className="flex items-center gap-3 bg-white hover:bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-stone-800 transition-all text-decoration-none shadow-sm"
                        >
                          <span className="p-2 bg-blue-50 text-[#10367D] rounded-xl shrink-0">
                            <Mail size={16} />
                          </span>
                          <div className="truncate">
                            <span className="text-[10px] text-stone-500 uppercase font-bold block">Email Desk</span>
                            <span className="font-bold text-xs sm:text-[13px] text-stone-900 truncate">sudheer@buildbharatsp.com</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                    <span className="flex items-center gap-1.5 font-sans">
                      <Clock size={14} className="text-emerald-600" /> Mon - Sat: 9:30 AM - 6:30 PM
                    </span>
                    <span className="font-bold text-stone-800 font-sans">Verified TS Hub</span>
                  </div>
                </div>

                {/* RIGHT COLUMN: QUICK ENQUIRY FORM (7 Cols) */}
                <div className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-6 sm:p-9 shadow-md flex flex-col justify-between">
                  {mapEnquirySuccess ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-8">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mb-4 shadow-sm animate-bounce">
                        <CheckCircle2 size={36} />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full mb-2">
                        Enquiry Successfully Logged
                      </span>
                      <h4 className="text-2xl sm:text-3xl font-extrabold text-stone-900 heading-font uppercase">
                        Thank You, {mapEnquiry.fullName}!
                      </h4>
                      <p className="text-stone-600 text-xs sm:text-sm max-w-md mt-2 mb-6 leading-relaxed">
                        Your enquiry has been routed to our regional desk for <strong>{mapEnquiry.category.toUpperCase()}</strong>. We will contact you at <strong>{mapEnquiry.phone}</strong> shortly.
                      </p>

                      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 w-full max-w-md text-xs sm:text-sm space-y-2.5 mb-6 text-left shadow-sm">
                        <div className="flex justify-between">
                          <span className="text-stone-500 font-semibold">Tracking Reference:</span>
                          <span className="font-mono font-bold text-[#10367D]">{mapEnquiryId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500 font-semibold">Contact Number:</span>
                          <span className="font-bold text-stone-800">{mapEnquiry.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500 font-semibold">Location:</span>
                          <span className="font-bold text-stone-800">{mapEnquiry.city || 'Hyderabad'}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <a
                          href={`https://wa.me/919353018855?text=${encodeURIComponent(`Hello Build Bharat Team, I submitted an enquiry (Ref: ${mapEnquiryId}) regarding ${mapEnquiry.category}. Name: ${mapEnquiry.fullName}, Phone: ${mapEnquiry.phone}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-full flex items-center gap-2 shadow-md text-decoration-none"
                        >
                          <span>Connect on WhatsApp</span>
                          <ArrowRight size={14} />
                        </a>

                        <button
                          type="button"
                          onClick={handleResetMapEnquiry}
                          className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full border border-stone-200 cursor-pointer"
                        >
                          Submit Another Enquiry
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleMapEnquirySubmit} className="space-y-4">
                      <div className="border-b border-stone-150 pb-4">
                        <div className="flex items-center gap-2 text-[#D57530] text-[11px] font-extrabold uppercase tracking-wider mb-1">
                          <MessageSquare size={14} />
                          <span>DIRECT INQUIRY FORM</span>
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-extrabold text-stone-900 heading-font uppercase">
                          Quick Service & Partnership Enquiry
                        </h4>
                        <p className="text-stone-500 text-xs sm:text-sm mt-1">
                          Fill in your details below to receive priority assistance and customized proposals.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={mapEnquiry.fullName}
                            onChange={(e) => setMapEnquiry({ ...mapEnquiry, fullName: e.target.value })}
                            placeholder="e.g. Rajesh Kumar"
                            className="w-full bg-[#FAF9F6] border border-stone-250 rounded-xl px-4 py-3 text-stone-900 text-xs sm:text-sm focus:bg-white focus:border-[#10367D] outline-none shadow-sm transition-all"
                          />
                          {mapEnquiryErrors.fullName && (
                            <span className="text-xs text-red-500 font-semibold block mt-1">{mapEnquiryErrors.fullName}</span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-3 text-xs sm:text-sm text-stone-400 font-semibold">+91</span>
                            <input
                              type="tel"
                              maxLength={10}
                              value={mapEnquiry.phone}
                              onChange={(e) => setMapEnquiry({ ...mapEnquiry, phone: e.target.value.replace(/[^0-9]/g, '') })}
                              placeholder="98765 43210"
                              className="w-full bg-[#FAF9F6] border border-stone-250 rounded-xl pl-12 pr-4 py-3 text-stone-900 text-xs sm:text-sm font-mono focus:bg-white focus:border-[#10367D] outline-none shadow-sm transition-all"
                            />
                          </div>
                          {mapEnquiryErrors.phone && (
                            <span className="text-xs text-red-500 font-semibold block mt-1">{mapEnquiryErrors.phone}</span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            value={mapEnquiry.email}
                            onChange={(e) => setMapEnquiry({ ...mapEnquiry, email: e.target.value })}
                            placeholder="rajesh@company.com"
                            className="w-full bg-[#FAF9F6] border border-stone-250 rounded-xl px-4 py-3 text-stone-900 text-xs sm:text-sm focus:bg-white focus:border-[#10367D] outline-none shadow-sm transition-all"
                          />
                          {mapEnquiryErrors.email && (
                            <span className="text-xs text-red-500 font-semibold block mt-1">{mapEnquiryErrors.email}</span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Service / Ecosystem Vertical <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={mapEnquiry.category}
                            onChange={(e) => setMapEnquiry({ ...mapEnquiry, category: e.target.value })}
                            className="w-full bg-[#FAF9F6] border border-stone-250 rounded-xl px-4 py-3 text-stone-900 text-xs sm:text-sm focus:bg-white focus:border-[#10367D] outline-none shadow-sm transition-all cursor-pointer"
                          >
                            <option value="loans">BuildBharat Loans (Project Finance & Capital)</option>
                            <option value="solar">BuildBharat Solar (Commercial / Rooftop PV)</option>
                            <option value="real-estate">BuildBharat Real Estate (Realty & IT Parks)</option>
                            <option value="education">BuildBharat EduTech (Vocational & Skill)</option>
                            <option value="partner-franchise">Synergy Franchise / Partner Registration</option>
                            <option value="general-inquiry">Corporate / Other Inquiry</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                          Your City / Location
                        </label>
                        <input
                          type="text"
                          value={mapEnquiry.city}
                          onChange={(e) => setMapEnquiry({ ...mapEnquiry, city: e.target.value })}
                          placeholder="e.g. Hyderabad, Bengaluru, Vijayawada, Warangal"
                          className="w-full bg-[#FAF9F6] border border-stone-250 rounded-xl px-4 py-3 text-stone-900 text-xs sm:text-sm focus:bg-white focus:border-[#10367D] outline-none shadow-sm transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                          Enquiry Details / Requirements <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={3}
                          value={mapEnquiry.message}
                          onChange={(e) => setMapEnquiry({ ...mapEnquiry, message: e.target.value })}
                          placeholder="Briefly describe your loan requirement, solar capacity, real estate needs, or franchise inquiry..."
                          className="w-full bg-[#FAF9F6] border border-stone-250 rounded-xl p-3.5 text-stone-900 text-xs sm:text-sm focus:bg-white focus:border-[#10367D] outline-none shadow-sm transition-all resize-none"
                        />
                        {mapEnquiryErrors.message && (
                          <span className="text-xs text-red-500 font-semibold block mt-1">{mapEnquiryErrors.message}</span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3">
                        <span className="text-xs text-stone-500 flex items-center gap-1.5">
                          <ShieldCheck size={15} className="text-[#10367D]" />
                          End-to-End SSL Encrypted & Verified
                        </span>

                        <button
                          type="submit"
                          disabled={mapEnquiryLoading}
                          className="w-full sm:w-auto bg-[#10367D] hover:bg-[#10367D]/90 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider px-9 py-3.5 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
                        >
                          {mapEnquiryLoading ? (
                            <>
                              <Loader2 className="animate-spin" size={15} />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Quick Enquiry</span>
                              <ArrowRight size={15} />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LARGE FULL-FEATURED PARTNER ONBOARDING MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md animate-fadeIn text-left">
          <div className="bg-[#FFFFFF] w-full max-w-4xl lg:max-w-5xl rounded-3xl border border-stone-200 p-6 sm:p-10 relative shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Close Button */}
            <button
              onClick={handleReset}
              className="absolute top-6 right-6 text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 p-2.5 border border-stone-200 transition-all cursor-pointer rounded-full z-20 shadow-sm"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {submitSuccess ? (
              /* STEP 5: SUCCESS CONFIRMATION */
              <div className="text-center py-8 flex flex-col items-center justify-center overflow-y-auto max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-200 rounded-full shadow-inner animate-bounce">
                  <CheckCircle2 size={52} />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 mb-2">
                  Application Successfully Logged
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#10367D] heading-font mb-3 uppercase tracking-tight">
                  Welcome to Build Bharat!
                </h3>
                <p className="text-stone-600 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                  Thank you, <strong className="text-stone-900">{formData.fullName}</strong>. Your KYC credentials, bank settlement information, and payment proof have been securely transferred for verification.
                </p>

                <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-6 w-full text-left mb-8 text-xs space-y-3 shadow-sm">
                  <div className="flex justify-between border-b border-stone-200/60 pb-2.5">
                    <span className="text-stone-500 font-bold uppercase tracking-wider">Application Tracking ID</span>
                    <span className="font-mono font-extrabold text-[#10367D] text-sm">{submissionId}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200/60 pb-2.5">
                    <span className="text-stone-500 font-bold uppercase tracking-wider">Contact Email</span>
                    <span className="font-bold text-stone-900">{formData.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200/60 pb-2.5">
                    <span className="text-stone-500 font-bold uppercase tracking-wider">Membership Tier</span>
                    <span className="font-bold text-[#10367D] uppercase">Lifetime & Generations</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200/60 pb-2.5">
                    <span className="text-stone-500 font-bold uppercase tracking-wider">Registered Nominee</span>
                    <span className="font-bold text-stone-900">{formData.nomineeName} ({formData.nomineeRelation})</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200/60 pb-2.5">
                    <span className="text-stone-500 font-bold uppercase tracking-wider">Bank Settlement A/C</span>
                    <span className="font-mono font-bold text-stone-900">XXXX{formData.accountNumber.slice(-4)} ({formData.bankName})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500 font-bold uppercase tracking-wider">Activation Status</span>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full">Pending Desk Verification (24 Hrs)</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="bg-[#10367D] hover:bg-[#10367D]/90 text-white text-xs rounded-full px-10 py-4 uppercase font-bold tracking-wider cursor-pointer transition-all shadow-md"
                >
                  Finish & Close
                </button>
              </div>
            ) : (
              <div className="flex flex-col h-full overflow-hidden">
                {/* Modal Header */}
                <div className="mb-6 pr-12">
                  <div className="flex items-center gap-2 text-[#10367D] text-xs font-bold uppercase tracking-wider mb-1">
                    <ShieldCheck size={16} className="text-[#D57530]" />
                    <span>Official Partner Onboarding & KYC Registration</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#10367D] heading-font uppercase tracking-tight">
                    Partner With Build Bharat
                  </h3>
                </div>

                {/* Stepper Progress Bar (4 Steps) */}
                <div className="mb-6 select-none shrink-0 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
                    <div className={`py-1 px-2 rounded-xl transition-all ${step === 1 ? 'bg-[#10367D] text-white shadow-sm' : step > 1 ? 'text-emerald-700 bg-emerald-50' : 'text-stone-400'}`}>
                      <span>1. Terms & Rules</span>
                    </div>
                    <div className={`py-1 px-2 rounded-xl transition-all ${step === 2 ? 'bg-[#10367D] text-white shadow-sm' : step > 2 ? 'text-emerald-700 bg-emerald-50' : 'text-stone-400'}`}>
                      <span>2. Profile & KYC</span>
                    </div>
                    <div className={`py-1 px-2 rounded-xl transition-all ${step === 3 ? 'bg-[#10367D] text-white shadow-sm' : step > 3 ? 'text-emerald-700 bg-emerald-50' : 'text-stone-400'}`}>
                      <span>3. Bank Settlement</span>
                    </div>
                    <div className={`py-1 px-2 rounded-xl transition-all ${step === 4 ? 'bg-[#10367D] text-white shadow-sm' : 'text-stone-400'}`}>
                      <span>4. Fee & Proof</span>
                    </div>
                  </div>
                </div>

                {/* Main Scrollable Content Body */}
                <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 pb-6 space-y-6">
                  
                      {/* STEP 1: Terms, Rules, and Policies */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 text-stone-700 text-xs sm:text-sm space-y-4">
                        <div className="flex items-center gap-2.5 text-[#10367D] font-bold pb-3 border-b border-slate-200">
                          <FileText size={18} />
                          <h4 className="text-sm font-bold uppercase tracking-wider heading-font">
                            Synergy Partnership Agreement & Guidelines
                          </h4>
                        </div>

                        <div className="max-h-64 overflow-y-auto pr-3 space-y-3 text-xs leading-relaxed text-stone-600">
                          <ul className="list-disc pl-5 space-y-2.5">
                            <li><strong className="text-stone-900">Ecosystem Multi-Category Access:</strong> Partners are empanelled across Solar, Real Estate, Loans, and EdTech corporate pipelines.</li>
                            <li><strong className="text-stone-900">Member ID & Referral System:</strong> Receive a verified unique Member ID and Membership Code to monitor transactions.</li>
                            <li><strong className="text-stone-900">Direct Payout Settlements:</strong> Commission and referral payouts are directly credited to your verified bank account with zero platform deduction.</li>
                            <li><strong className="text-stone-900">Lifetime & Generations Membership:</strong> Your synergy partner status is valid for <strong>Lifetime and across Generations</strong> with full succession rights for your registered nominee.</li>
                            <li><strong className="text-stone-900">₹5,000/- Refund Policy:</strong> Note: If the member does not earn any income, even a single rupee, during the five-year membership period, the full membership amount will be refunded upon completion of five years from the date of membership issuance, subject to the applicable terms and conditions.</li>
                            <li><strong className="text-stone-900">Instant WhatsApp Notification:</strong> Upon successful submission, a confirmation WhatsApp message and membership registration receipt are dispatched to your mobile number.</li>
                            <li><strong className="text-stone-900">Mandatory KYC & Nominee Record:</strong> Statutory Aadhaar, PAN Card, Bank Details, and Nominee declaration are recorded for compliance.</li>
                          </ul>
                        </div>
                      </div>

                      {/* Policy Checkboxes */}
                      <div className="space-y-3 pt-2 bg-stone-50/50 p-4 rounded-2xl border border-stone-200/60">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={policyAccepted}
                            onChange={(e) => setPolicyAccepted(e.target.checked)}
                            className="mt-1 rounded border-stone-300 text-[#10367D] focus:ring-[#10367D] h-4 w-4 shrink-0"
                          />
                          <span className="text-xs text-stone-700 leading-relaxed group-hover:text-stone-900 transition-colors">
                            I agree to the <strong>Privacy Policy</strong> and authorize Build Bharat Synergy Partners to process my KYC identity, nominee records, and bank details for payout facilitation.
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            className="mt-1 rounded border-stone-300 text-[#10367D] focus:ring-[#10367D] h-4 w-4 shrink-0"
                          />
                          <span className="text-xs text-stone-700 leading-relaxed group-hover:text-stone-900 transition-colors">
                            I accept the <strong>Lifetime & Generations Partnership Terms</strong> and <strong>₹5,000/- Refund Policy</strong>, certifying all submitted documents are accurate.
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Profile & Legal KYC Identity */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10367D] block mb-1">
                          SECTION 2.1 — APPLICANT PROFILE & PERMANENT ADDRESS
                        </span>
                        <p className="text-stone-600 text-xs leading-relaxed">
                          Enter your personal identity, residential address, and date of birth details.
                        </p>
                      </div>

                      {/* Row 1: Full Name, Email, Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="e.g. Sudheer Reddy"
                            className="w-full bg-white border border-stone-250 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] focus:ring-1 focus:ring-[#10367D] outline-none shadow-sm"
                          />
                          {formErrors.fullName && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.fullName}</span>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="sudheer@example.com"
                            className="w-full bg-white border border-stone-250 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] focus:ring-1 focus:ring-[#10367D] outline-none shadow-sm"
                          />
                          {formErrors.email && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.email}</span>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Phone Number (10+ digits) *
                          </label>
                          <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 93530 18855"
                            className="w-full bg-white border border-stone-250 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] focus:ring-1 focus:ring-[#10367D] outline-none shadow-sm"
                          />
                          {formErrors.phone && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.phone}</span>}
                        </div>
                      </div>

                      {/* Row 2: Permanent Address (Required) */}
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                          Permanent Residential Address *
                        </label>
                        <textarea
                          rows={2}
                          value={formData.permanentAddress}
                          onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
                          placeholder="House / Flat No, Street, Landmark, City, District, State, PIN Code"
                          className="w-full bg-white border border-stone-250 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] focus:ring-1 focus:ring-[#10367D] outline-none shadow-sm resize-none"
                        />
                        {formErrors.permanentAddress && (
                          <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.permanentAddress}</span>
                        )}
                      </div>

                      {/* Row 3: Date of Birth & Age (Calendar & Direct Input) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                            <span>Date of Birth (DD/MM/YYYY) *</span>
                            <span className="text-[10px] text-[#10367D] font-bold">Pick via Calendar or Type</span>
                          </label>
                          <div className="relative flex items-center">
                            <input
                              type="text"
                              value={formData.dob}
                              onChange={(e) => {
                                const val = e.target.value;
                                setFormData({ ...formData, dob: val });
                                const parts = val.split('/');
                                if (parts.length === 3 && parts[2]?.length === 4) {
                                  const birthYear = parseInt(parts[2], 10);
                                  const birthMonth = parseInt(parts[1], 10) - 1;
                                  const birthDay = parseInt(parts[0], 10);
                                  const today = new Date();
                                  let calcAge = today.getFullYear() - birthYear;
                                  const monthDiff = today.getMonth() - birthMonth;
                                  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay)) {
                                    calcAge--;
                                  }
                                  if (!isNaN(calcAge) && calcAge > 0 && calcAge < 120) {
                                    setFormData((prev) => ({ ...prev, dob: val, age: String(calcAge) }));
                                  }
                                }
                              }}
                              placeholder="DD/MM/YYYY (e.g. 15/08/1988)"
                              className="w-full bg-white border border-stone-250 rounded-xl pl-4 pr-11 py-2.5 text-stone-900 text-sm focus:border-[#10367D] focus:ring-1 focus:ring-[#10367D] outline-none shadow-sm font-mono tracking-wider"
                            />
                            {/* Calendar Trigger */}
                            <div className="absolute right-2 flex items-center">
                              <label
                                className="p-2 text-[#10367D] hover:bg-slate-100 rounded-lg cursor-pointer transition-colors flex items-center justify-center relative"
                                title="Open Calendar Picker"
                              >
                                <Calendar size={18} />
                                <input
                                  type="date"
                                  max={new Date().toISOString().split('T')[0]}
                                  min="1920-01-01"
                                  value={formatDobToIso(formData.dob)}
                                  onChange={(e) => handleCalendarDateChange(e.target.value)}
                                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                                />
                              </label>
                            </div>
                          </div>
                          {formErrors.dob && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.dob}</span>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Age (Auto Calculated) *
                          </label>
                          <input
                            type="number"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            placeholder="e.g. 36"
                            className="w-full bg-white border border-stone-250 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] focus:ring-1 focus:ring-[#10367D] outline-none shadow-sm font-mono"
                          />
                          {formErrors.age && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.age}</span>}
                        </div>
                      </div>

                      {/* SECTION 2.2 — NOMINATION DETAILS (LIFETIME & GENERATIONS) */}
                      <div className="pt-4 border-t border-slate-200 space-y-4">
                        <div className="flex items-center gap-2 text-[#10367D] text-xs font-bold uppercase tracking-wider">
                          <Users size={16} />
                          <span>SECTION 2.2 — NOMINATION DETAILS (LIFETIME SUCCESSION)</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                              Nominee Full Name *
                            </label>
                            <input
                              type="text"
                              value={formData.nomineeName}
                              onChange={(e) => setFormData({ ...formData, nomineeName: e.target.value })}
                              placeholder="e.g. Sravanthi Reddy"
                              className="w-full bg-white border border-stone-250 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] focus:ring-1 focus:ring-[#10367D] outline-none shadow-sm"
                            />
                            {formErrors.nomineeName && (
                              <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.nomineeName}</span>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                              Nominee Relationship *
                            </label>
                            <select
                              value={formData.nomineeRelation}
                              onChange={(e) => setFormData({ ...formData, nomineeRelation: e.target.value })}
                              className="w-full bg-white border border-stone-250 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] focus:ring-1 focus:ring-[#10367D] outline-none shadow-sm cursor-pointer"
                            >
                              <option value="Spouse">Spouse</option>
                              <option value="Son">Son</option>
                              <option value="Daughter">Daughter</option>
                              <option value="Father">Father</option>
                              <option value="Mother">Mother</option>
                              <option value="Brother">Brother</option>
                              <option value="Sister">Sister</option>
                              <option value="Other">Other</option>
                            </select>
                            {formErrors.nomineeRelation && (
                              <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.nomineeRelation}</span>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                              Nominee Age (Years) *
                            </label>
                            <input
                              type="number"
                              value={formData.nomineeAge}
                              onChange={(e) => setFormData({ ...formData, nomineeAge: e.target.value })}
                              placeholder="e.g. 32"
                              className="w-full bg-white border border-stone-250 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] focus:ring-1 focus:ring-[#10367D] outline-none shadow-sm font-mono"
                            />
                            {formErrors.nomineeAge && (
                              <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.nomineeAge}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* SECTION 2.3 — REFERRAL / EXISTING MEMBER REFERENCE */}
                      <div className="pt-4 border-t border-slate-200 space-y-4">
                        <div className="flex items-center gap-2 text-stone-600 text-xs font-bold uppercase tracking-wider">
                          <BadgeCheck size={16} className="text-[#10367D]" />
                          <span>SECTION 2.3 — EXISTING MEMBER REFERENCE (OPTIONAL)</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                              Existing Member Name
                            </label>
                            <input
                              type="text"
                              value={formData.existingMemberName}
                              onChange={(e) => setFormData({ ...formData, existingMemberName: e.target.value })}
                              placeholder="Name of member who referred you"
                              className="w-full bg-white border border-stone-250 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                              Existing Membership Number
                            </label>
                            <input
                              type="text"
                              value={formData.existingMemberNumber}
                              onChange={(e) => setFormData({ ...formData, existingMemberNumber: e.target.value.toUpperCase() })}
                              placeholder="e.g. BBSP-MEM-123456"
                              className="w-full bg-white border border-stone-250 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm font-mono uppercase"
                            />
                          </div>
                        </div>
                      </div>

                      {/* SECTION 2.2 — LEGAL KYC DETAILS */}
                      <div className="pt-4 border-t border-slate-200 space-y-4">
                        <div className="flex items-center gap-2 text-[#D57530] text-xs font-bold uppercase tracking-wider">
                          <UserCheck size={16} />
                          <span>SECTION 2.2 — STATUTORY KYC DOCUMENTS (AADHAAR & PAN)</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Aadhaar Card Box */}
                          <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/90 space-y-3">
                            <label className="block text-xs font-bold text-[#10367D] uppercase tracking-wider">
                              Aadhaar Card Number (12 Digits) *
                            </label>
                            <input
                              type="text"
                              maxLength={14}
                              value={formData.aadhaarNumber}
                              onChange={(e) => {
                                const raw = e.target.value.replace(/\D/g, '').slice(0, 12);
                                const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
                                setFormData({ ...formData, aadhaarNumber: formatted });
                              }}
                              placeholder="XXXX XXXX XXXX"
                              className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm font-mono tracking-widest focus:border-[#10367D] outline-none shadow-sm"
                            />
                            {formErrors.aadhaarNumber && (
                              <span className="text-[10px] text-red-500 font-bold block">{formErrors.aadhaarNumber}</span>
                            )}

                            {/* Aadhaar Upload Box */}
                            <div className="pt-2">
                              <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                                <span>Upload Aadhaar Card (PDF / Image) *</span>
                                {aadhaarDoc && <span className="text-emerald-600 font-bold text-[10px]">✓ Attached</span>}
                              </label>

                              {aadhaarDoc ? (
                                <div className="bg-white border border-stone-200 rounded-xl p-3.5 shadow-sm space-y-2.5">
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <div className="w-8 h-8 rounded-lg bg-[#10367D]/10 text-[#10367D] flex items-center justify-center shrink-0">
                                        <FileText size={16} />
                                      </div>
                                      <div className="min-w-0">
                                        <p className="text-xs font-bold text-stone-800 truncate max-w-[180px]">
                                          {aadhaarDoc.name}
                                        </p>
                                        <span className="text-[10px] text-stone-400 font-mono">
                                          {aadhaarDoc.sizeFormatted}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => setPreviewDoc({ doc: aadhaarDoc, title: 'Aadhaar Card Preview' })}
                                        className="px-2.5 py-1.5 bg-[#10367D] hover:bg-[#10367D]/90 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all shadow-sm border-none"
                                      >
                                        <Eye size={13} />
                                        <span>Preview</span>
                                      </button>

                                      <label className="px-2 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-all border border-stone-200">
                                        <RefreshCw size={11} />
                                        <input
                                          type="file"
                                          accept="image/*,application/pdf"
                                          onChange={(e) => handleFileUpload(e, setAadhaarDoc)}
                                          className="hidden"
                                        />
                                      </label>

                                      <button
                                        type="button"
                                        onClick={() => setAadhaarDoc(null)}
                                        className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer border-none bg-transparent"
                                        title="Remove"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <label className="border-2 border-dashed border-slate-300 hover:border-[#10367D] bg-white rounded-xl p-3.5 flex flex-col items-center justify-center cursor-pointer transition-colors text-center group">
                                  <UploadCloud size={20} className="text-slate-400 group-hover:text-[#10367D] mb-1" />
                                  <span className="text-xs text-stone-700 font-medium">
                                    Click to select Aadhaar document
                                  </span>
                                  <span className="text-[10px] text-stone-400 mt-0.5">
                                    PDF, JPG, PNG (Max 15MB)
                                  </span>
                                  <input
                                    type="file"
                                    accept="image/*,application/pdf"
                                    onChange={(e) => handleFileUpload(e, setAadhaarDoc)}
                                    className="hidden"
                                  />
                                </label>
                              )}
                              
                              {formErrors.aadhaarDoc && (
                                <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.aadhaarDoc}</span>
                              )}
                            </div>
                          </div>

                          {/* PAN Card Box */}
                          <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/90 space-y-3">
                            <label className="block text-xs font-bold text-[#10367D] uppercase tracking-wider">
                              PAN Card Number (10 Alphanumeric) *
                            </label>
                            <input
                              type="text"
                              maxLength={10}
                              value={formData.panNumber}
                              onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                              placeholder="ABCDE1234F"
                              className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm font-mono tracking-widest uppercase focus:border-[#10367D] outline-none shadow-sm"
                            />
                            {formErrors.panNumber && (
                              <span className="text-[10px] text-red-500 font-bold block">{formErrors.panNumber}</span>
                            )}

                            {/* PAN Upload Box */}
                            <div className="pt-2">
                              <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                                <span>Upload PAN Card (PDF / Image) *</span>
                                {panDoc && <span className="text-emerald-600 font-bold text-[10px]">✓ Attached</span>}
                              </label>

                              {panDoc ? (
                                <div className="bg-white border border-stone-200 rounded-xl p-3.5 shadow-sm space-y-2.5">
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                      <div className="w-8 h-8 rounded-lg bg-[#10367D]/10 text-[#10367D] flex items-center justify-center shrink-0">
                                        <FileText size={16} />
                                      </div>
                                      <div className="min-w-0">
                                        <p className="text-xs font-bold text-stone-800 truncate max-w-[180px]">
                                          {panDoc.name}
                                        </p>
                                        <span className="text-[10px] text-stone-400 font-mono">
                                          {panDoc.sizeFormatted}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => setPreviewDoc({ doc: panDoc, title: 'PAN Card Preview' })}
                                        className="px-2.5 py-1.5 bg-[#10367D] hover:bg-[#10367D]/90 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all shadow-sm border-none"
                                      >
                                        <Eye size={13} />
                                        <span>Preview</span>
                                      </button>

                                      <label className="px-2 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-all border border-stone-200">
                                        <RefreshCw size={11} />
                                        <input
                                          type="file"
                                          accept="image/*,application/pdf"
                                          onChange={(e) => handleFileUpload(e, setPanDoc)}
                                          className="hidden"
                                        />
                                      </label>

                                      <button
                                        type="button"
                                        onClick={() => setPanDoc(null)}
                                        className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer border-none bg-transparent"
                                        title="Remove"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <label className="border-2 border-dashed border-slate-300 hover:border-[#10367D] bg-white rounded-xl p-3.5 flex flex-col items-center justify-center cursor-pointer transition-colors text-center group">
                                  <UploadCloud size={20} className="text-slate-400 group-hover:text-[#10367D] mb-1" />
                                  <span className="text-xs text-stone-700 font-medium">
                                    Click to select PAN document
                                  </span>
                                  <span className="text-[10px] text-stone-400 mt-0.5">
                                    PDF, JPG, PNG (Max 15MB)
                                  </span>
                                  <input
                                    type="file"
                                    accept="image/*,application/pdf"
                                    onChange={(e) => handleFileUpload(e, setPanDoc)}
                                    className="hidden"
                                  />
                                </label>
                              )}

                              {formErrors.panDoc && (
                                <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.panDoc}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Banking & Payout Settlement Details */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                        <div className="flex items-center gap-2 text-[#10367D] font-bold text-xs uppercase tracking-wider mb-1">
                          <Landmark size={16} />
                          <span>Direct Settlement Bank Account Details</span>
                        </div>
                        <p className="text-stone-600 text-xs leading-relaxed">
                          Provide the bank account to receive all business referral earnings and commission payouts directly.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Account Holder Name (As per Bank) *
                          </label>
                          <input
                            type="text"
                            value={formData.accountHolderName}
                            onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                            placeholder="e.g. D SUDHEER REDDY"
                            className="w-full bg-white border border-stone-250 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                          />
                          {formErrors.accountHolderName && (
                            <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.accountHolderName}</span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Bank Name *
                          </label>
                          <input
                            type="text"
                            value={formData.bankName}
                            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                            placeholder="e.g. State Bank of India"
                            className="w-full bg-white border border-stone-250 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                          />
                          {formErrors.bankName && (
                            <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.bankName}</span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                            Branch Name *
                          </label>
                          <input
                            type="text"
                            value={formData.branchName}
                            onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                            placeholder="e.g. Hayath Nagar Branch"
                            className="w-full bg-white border border-stone-250 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                          />
                          {formErrors.branchName && (
                            <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.branchName}</span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                            <span>Bank Account Number *</span>
                            <span className="text-[10px] text-stone-400 font-normal">9-18 digits</span>
                          </label>
                          <div className="relative flex items-center">
                            <input
                              type={showAccountNumber ? 'text' : 'password'}
                              value={formData.accountNumber}
                              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, '') })}
                              placeholder="Enter 9-18 digit account number"
                              className="w-full bg-white border border-stone-250 rounded-xl pl-4 pr-11 py-2.5 text-stone-900 text-sm font-mono tracking-wider focus:border-[#10367D] outline-none shadow-sm"
                            />
                            <button
                              type="button"
                              onClick={() => setShowAccountNumber(!showAccountNumber)}
                              className="absolute right-3 p-1 text-stone-400 hover:text-[#10367D] transition-colors cursor-pointer bg-transparent border-none"
                              title={showAccountNumber ? 'Hide Account Number' : 'Show Account Number'}
                            >
                              {showAccountNumber ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                          {formErrors.accountNumber && (
                            <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.accountNumber}</span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                            <span>Confirm Account Number *</span>
                            <span className="text-[10px] text-stone-400 font-normal">Must match</span>
                          </label>
                          <div className="relative flex items-center">
                            <input
                              type={showConfirmAccountNumber ? 'text' : 'password'}
                              value={formData.confirmAccountNumber}
                              onChange={(e) => setFormData({ ...formData, confirmAccountNumber: e.target.value.replace(/\D/g, '') })}
                              placeholder="Re-enter account number"
                              className="w-full bg-white border border-stone-250 rounded-xl pl-4 pr-11 py-2.5 text-stone-900 text-sm font-mono tracking-wider focus:border-[#10367D] outline-none shadow-sm"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmAccountNumber(!showConfirmAccountNumber)}
                              className="absolute right-3 p-1 text-stone-400 hover:text-[#10367D] transition-colors cursor-pointer bg-transparent border-none"
                              title={showConfirmAccountNumber ? 'Hide Confirm Account Number' : 'Show Confirm Account Number'}
                            >
                              {showConfirmAccountNumber ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                          {formErrors.confirmAccountNumber && (
                            <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.confirmAccountNumber}</span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                              IFSC Code *
                            </label>
                            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              ✓ Verification: Zero Extra Charges
                            </span>
                          </div>
                          <input
                            type="text"
                            maxLength={11}
                            value={formData.ifscCode}
                            onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                            placeholder="e.g. SBIN0001234"
                            className="w-full bg-white border border-stone-250 rounded-xl px-4 py-2.5 text-stone-900 text-sm font-mono uppercase tracking-wider focus:border-[#10367D] outline-none shadow-sm"
                          />
                          {formErrors.ifscCode && (
                            <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.ifscCode}</span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                            <span>Bank Statement / Cancelled Cheque (Optional)</span>
                            {chequeDoc && <span className="text-emerald-600 font-bold text-[10px]">✓ Attached</span>}
                          </label>

                          {chequeDoc ? (
                            <div className="bg-white border border-stone-200 rounded-xl p-3 flex items-center justify-between gap-2 shadow-sm">
                              <div className="flex items-center gap-2 min-w-0">
                                <FileText size={15} className="text-[#10367D] shrink-0" />
                                <span className="text-xs text-stone-700 truncate max-w-[140px] font-medium">
                                  {chequeDoc.name}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => setPreviewDoc({ doc: chequeDoc, title: 'Bank Statement / Cancelled Cheque Preview' })}
                                  className="px-2 py-1 bg-[#10367D] hover:bg-[#10367D]/90 text-white rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all border-none"
                                >
                                  <Eye size={12} />
                                  <span>Preview</span>
                                </button>
                                
                                <button
                                  type="button"
                                  onClick={() => setChequeDoc(null)}
                                  className="p-1 text-stone-400 hover:text-red-600 rounded cursor-pointer border-none bg-transparent"
                                  title="Remove"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <label className="border border-dashed border-slate-300 hover:border-[#10367D] bg-white rounded-xl px-4 py-2 flex items-center justify-between cursor-pointer transition-colors shadow-sm">
                              <span className="text-xs text-stone-600 truncate max-w-[200px]">
                                Upload statement / cheque
                              </span>
                              <UploadCloud size={16} className="text-[#10367D] shrink-0" />
                              <input
                                type="file"
                                accept="image/*,application/pdf"
                                onChange={(e) => handleFileUpload(e, setChequeDoc)}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      {/* NOMINATING FORM PREVIEW CARD */}
                      <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10367D] flex items-center gap-1.5">
                            <FileText size={13} />
                            <span>Nominating Form Declaration Preview</span>
                          </span>
                          <span className="text-[10px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-full border border-blue-200">
                            Lifetime Transmission Rights
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-700 bg-white p-3 rounded-xl border border-blue-100">
                          <div><strong className="text-stone-900">Nominee Name:</strong> {formData.nomineeName || 'Pending entry'}</div>
                          <div><strong className="text-stone-900">Relationship:</strong> {formData.nomineeRelation || 'Spouse'}</div>
                          <div><strong className="text-stone-900">Nominee Age:</strong> {formData.nomineeAge ? `${formData.nomineeAge} Yrs` : '—'}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Fee Payment & Screenshot Proof */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                        
                        {/* Left QR Code Box (5 Cols) */}
                        <div className="md:col-span-5 bg-slate-50 border border-slate-200/90 rounded-2xl p-5 text-center space-y-4 shadow-sm">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10367D] block mb-1">
                              MEMBERSHIP FEE — LIFETIME & GENERATIONS
                            </span>
                            <div className="text-3xl font-black text-[#10367D] heading-font">
                              ₹5,000
                            </div>
                            <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-block mt-1">
                              100% Refundable Deposit
                            </span>
                          </div>

                          <div
                            onClick={() => setIsQrEnlarged(true)}
                            className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm inline-block relative group cursor-pointer overflow-hidden select-none"
                          >
                            {/* Blurred QR Container */}
                            <div className="relative overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center">
                              <img
                                src="/bbsp-qr.png"
                                alt="Build Bharat Bank UPI QR Code"
                                className="w-48 h-48 sm:w-52 sm:h-52 object-contain mx-auto rounded-xl filter blur-[8px] scale-105 transition-all duration-300 group-hover:scale-110 opacity-70"
                              />
                              {/* Dark Frosted Tint Overlay */}
                              <div className="absolute inset-0 bg-[#10367D]/15 backdrop-blur-[2px]" />

                              {/* Centered Click to View Button & Helper */}
                              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsQrEnlarged(true);
                                  }}
                                  className="bg-[#10367D] hover:bg-[#10367D]/95 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-full shadow-2xl border border-white/40 flex items-center gap-2 transition-transform transform group-hover:scale-105 active:scale-95 cursor-pointer"
                                >
                                  <Eye size={15} />
                                  <span>Click to View</span>
                                </button>
                                <span className="text-[10px] text-white font-semibold drop-shadow-md bg-black/45 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                                  Tap to pop up & scan
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 text-left bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
                            <div className="flex justify-between items-center text-[11px] pb-1.5 border-b border-slate-100">
                              <span className="text-stone-500 font-medium">Beneficiary:</span>
                              <strong className="text-[#10367D] font-bold">Build Bharat Bank</strong>
                            </div>
                            <div className="flex justify-between items-center text-[11px]">
                              <span className="text-stone-500 font-medium">Primary UPI ID:</span>
                              <span className="font-mono font-bold text-stone-900">buildbharat@bank</span>
                            </div>
                            <button
                              type="button"
                              onClick={copyUpiId}
                              className="w-full text-xs font-bold text-[#10367D] bg-stone-50 hover:bg-stone-100 border border-slate-200 py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-sm mt-2"
                            >
                              <Copy size={13} />
                              <span>{copiedUpi ? 'UPI ID Copied!' : 'Copy UPI: sudheer@buildbharatsp'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Right Proof Upload & Application Summary (7 Cols) */}
                        <div className="md:col-span-7 space-y-5">
                          
                          {/* Payment Screenshot Box */}
                          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-[#10367D] uppercase tracking-wider flex items-center gap-1.5">
                                <ImageIcon size={15} />
                                <span>Step 4.1: Upload Payment Screenshot *</span>
                              </h4>
                              {screenshotDoc && (
                                <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                                  <CheckCircle2 size={13} /> Attached
                                </span>
                              )}
                            </div>

                            {screenshotDoc ? (
                              <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm space-y-3">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-12 h-12 rounded-xl border border-stone-200 bg-stone-50 overflow-hidden shrink-0 flex items-center justify-center">
                                      <img
                                        src={screenshotDoc.previewUrl}
                                        alt="Payment proof thumbnail"
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-xs font-bold text-stone-900 truncate max-w-[200px]">
                                        {screenshotDoc.name}
                                      </p>
                                      <span className="text-[10px] text-stone-400 font-mono">
                                        {screenshotDoc.sizeFormatted} · Image Proof
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => setPreviewDoc({ doc: screenshotDoc, title: 'Payment Receipt Screenshot Preview' })}
                                      className="px-3 py-1.5 bg-[#10367D] hover:bg-[#10367D]/90 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer border-none"
                                    >
                                      <Eye size={14} />
                                      <span>Preview Screenshot</span>
                                    </button>

                                    <label className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all border border-stone-200" title="Replace Screenshot">
                                      <RefreshCw size={12} />
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, setScreenshotDoc)}
                                        className="hidden"
                                      />
                                    </label>

                                    <button
                                      type="button"
                                      onClick={() => setScreenshotDoc(null)}
                                      className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer border-none bg-transparent"
                                      title="Remove"
                                    >
                                      <Trash2 size={15} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <label className="border-2 border-dashed border-slate-300 hover:border-[#10367D] bg-white rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all text-center group shadow-sm">
                                <UploadCloud size={28} className="text-[#10367D] mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold text-stone-800">
                                  Click or Drag to Upload Payment Receipt
                                </span>
                                <span className="text-[10px] text-stone-400 mt-1">
                                  Supports PNG, JPG, JPEG, WEBP (Max 15MB)
                                </span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e, setScreenshotDoc)}
                                  className="hidden"
                                />
                              </label>
                            )}

                            {formErrors.screenshot && (
                              <span className="text-[10px] text-red-500 font-bold block">{formErrors.screenshot}</span>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                              <div>
                                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                                  Refund Account / Nominee Name *
                                </label>
                                <input
                                  type="text"
                                  value={formData.refundName}
                                  onChange={(e) => setFormData({ ...formData, refundName: e.target.value })}
                                  placeholder="Full Name for 100% Refund Claim"
                                  className="w-full bg-white border border-stone-250 rounded-xl px-4 py-2 text-stone-900 text-xs focus:border-[#10367D] outline-none shadow-sm"
                                />
                                {formErrors.refundName && (
                                  <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.refundName}</span>
                                )}
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                                  UTR / Reference ID (Optional)
                                </label>
                                <input
                                  type="text"
                                  value={formData.transactionId}
                                  onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                                  placeholder="e.g. 423456789012"
                                  className="w-full bg-white border border-stone-250 rounded-xl px-4 py-2 text-stone-900 text-xs font-mono focus:border-[#10367D] outline-none shadow-sm"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Instant Application Preview Card */}
                          <div className="bg-stone-50/80 border border-stone-200 rounded-2xl p-4 text-xs space-y-2.5">
                            <div className="flex items-center justify-between border-b border-stone-200/60 pb-1.5">
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10367D]">
                                Application Verification Dossier
                              </span>
                              <span className="text-[10px] font-mono font-bold text-[#10367D] bg-white px-2 py-0.5 rounded border border-slate-200">
                                Code: {membershipCode}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-stone-700">
                              <div><strong className="text-stone-900">Partner:</strong> {formData.fullName} ({formData.age} Yrs)</div>
                              <div><strong className="text-stone-900">Membership:</strong> Lifetime & Generations</div>
                              <div><strong className="text-stone-900">Nominee:</strong> {formData.nomineeName} ({formData.nomineeRelation})</div>
                              <div><strong className="text-stone-900">Refund Name:</strong> {formData.refundName || formData.fullName}</div>
                              <div><strong className="text-stone-900">Bank & Branch:</strong> {formData.bankName} - {formData.branchName}</div>
                              <div><strong className="text-stone-900">Aadhaar / PAN:</strong> Verified Documents</div>
                            </div>

                            <div className="pt-2 border-t border-stone-200/60 text-[11px] text-emerald-700 font-medium flex items-center gap-1.5">
                              <span>📱 Instant WhatsApp registration confirmation & deposit receipt will be sent to {formData.phone || 'your phone'}.</span>
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-200 shrink-0">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep((prev) => prev - 1)}
                      disabled={submitLoading}
                      className="bg-stone-100 hover:bg-stone-200 disabled:opacity-50 text-stone-850 border border-stone-200 rounded-full px-6 py-2.5 flex items-center justify-center gap-1.5 cursor-pointer text-xs uppercase tracking-wider font-bold transition-all shadow-sm"
                    >
                      <ArrowLeft size={15} />
                      <span>Previous</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step === 1 && (
                    <button
                      type="button"
                      onClick={handleNextStep1}
                      disabled={!policyAccepted || !termsAccepted}
                      className="bg-[#10367D] hover:bg-[#10367D]/95 disabled:opacity-50 text-white rounded-full px-8 py-3 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider font-bold transition-all ml-auto shadow-md"
                    >
                      <span>Agree & Continue</span>
                      <ArrowRight size={15} />
                    </button>
                  )}

                  {step === 2 && (
                    <button
                      type="button"
                      onClick={handleNextStep2}
                      className="bg-[#10367D] hover:bg-[#10367D]/95 text-white rounded-full px-8 py-3 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider font-bold transition-all ml-auto shadow-md"
                    >
                      <span>Proceed to Banking</span>
                      <ArrowRight size={15} />
                    </button>
                  )}

                  {step === 3 && (
                    <button
                      type="button"
                      onClick={handleNextStep3}
                      className="bg-[#10367D] hover:bg-[#10367D]/95 text-white rounded-full px-8 py-3 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider font-bold transition-all ml-auto shadow-md"
                    >
                      <span>Proceed to Payment</span>
                      <ArrowRight size={15} />
                    </button>
                  )}

                  {step === 4 && (
                    <button
                      type="button"
                      onClick={handleSubmitRegistration}
                      disabled={submitLoading || !screenshotDoc}
                      className="bg-[#D57530] hover:bg-[#b95d1d] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full px-10 py-3.5 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider font-extrabold transition-all ml-auto shadow-lg"
                    >
                      {submitLoading ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          <span>Encrypting & Submitting...</span>
                        </>
                      ) : (
                        <>
                          <FileCheck size={16} />
                          <span>Submit Lifetime KYC Application</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ENLARGED HIGH-RES QR CODE MODAL */}
      {isQrEnlarged && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn text-left">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-stone-200 shadow-2xl text-center space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="text-left">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Direct Payment Gate</span>
                <h4 className="text-base font-extrabold text-[#10367D] heading-font">Build Bharat Bank</h4>
              </div>
              <button
                onClick={() => setIsQrEnlarged(false)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors border-none cursor-pointer bg-transparent"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
              <img
                src="/bbsp-qr.png"
                alt="Build Bharat Bank Large QR"
                className="w-64 h-64 sm:w-72 sm:h-72 object-contain mx-auto rounded-xl shadow-sm bg-white p-2"
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-mono text-stone-700 bg-stone-100 p-2 rounded-xl border border-stone-200">
                UPI: <strong>buildbharat@bank</strong> / <strong>sudheer@buildbharatsp</strong>
              </div>
              <p className="text-[11px] text-stone-500">
                Scan with any UPI App (GPay, PhonePe, Paytm, BHIM) to pay ₹5,000.
              </p>
            </div>

            <button
              onClick={() => setIsQrEnlarged(false)}
              className="w-full py-2.5 bg-[#10367D] hover:bg-[#10367D]/90 text-white font-bold text-xs uppercase tracking-wider rounded-full cursor-pointer shadow-md"
            >
              Close QR Preview
            </button>
          </div>
        </div>
      )}

      {/* Global Document & Screenshot Preview Modal */}
      <DocumentPreviewModal
        document={previewDoc?.doc || null}
        title={previewDoc?.title}
        onClose={() => setPreviewDoc(null)}
      />
    </>
  );
};

export default PartnershipCTA;
