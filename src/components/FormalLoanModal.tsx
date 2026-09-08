import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Landmark,
  User,
  Users,
  Coins,
  FileText,
  UploadCloud,
  FileCheck,
  Loader2,
  Building2,
  AlertCircle,
  HelpCircle,
  Calendar,
  Lock
} from 'lucide-react';

interface FormalLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLoanType?: string;
  initialAmount?: number;
}

interface UploadedFile {
  file: File;
  name: string;
  sizeFormatted: string;
}

export const FormalLoanModal: React.FC<FormalLoanModalProps> = ({
  isOpen,
  onClose,
  initialLoanType = 'home',
  initialAmount = 2500000,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationId] = useState(
    'BBSP-LN-' + Math.floor(100000 + Math.random() * 900000)
  );

  // Form State
  const [formData, setFormData] = useState({
    // Section 1: Personal Details
    firstName: '',
    middleName: '',
    lastName: '',
    motherName: '',
    dob: '1995-05-15',
    gender: 'Male',
    maritalStatus: 'Single',
    panNumber: '',
    aadhaarNumber: '',
    state: 'Telangana',
    district: 'Hyderabad',
    city: 'Hyderabad',
    pinCode: '',
    presentAddress: '',
    email: '',
    countryCode: '+91',
    contact: '',

    // Section 2: Nominee Details
    nomineeFirstName: '',
    nomineeMiddleName: '',
    nomineeLastName: '',
    nomineeRelation: 'Spouse',
    nomineeAge: '',

    // Section 3: Bank Details
    bankName: '',
    branchName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',

    // Section 4: Loan Particulars
    requiredAmount: initialAmount.toString(),
    sanctionAmount: initialAmount.toString(),
    processingFee: Math.round(initialAmount * 0.01).toString(),
    tenureMonths: '240',
    purpose: 'Home Purchase & Construction',
    processingFeeNonRefundable: true,

    // Section 5: Upline & Executive Details
    uplineFirstName: '',
    uplineMiddleName: '',
    uplineLastName: '',
    uplineIdCode: '',
    sponsorIdCode: '',
    executiveName: '',
    executiveSponsorId: '',
    diCode: '',
    rulesExplained: true,

    // Section 6: Witness 1
    witness1Name: '',
    witness1Mobile: '',
    witness1Address: '',

    // Section 6: Witness 2
    witness2Name: '',
    witness2Mobile: '',
    witness2Address: '',

    // Section 7: Agreement
    agreeTerms: true,
  });

  // Attachments State
  const [aadhaarDoc, setAadhaarDoc] = useState<UploadedFile | null>(null);
  const [panDoc, setPanDoc] = useState<UploadedFile | null>(null);
  const [bankDoc, setBankDoc] = useState<UploadedFile | null>(null);
  const [incomeDoc, setIncomeDoc] = useState<UploadedFile | null>(null);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const indianStates = [
    'Telangana',
    'Andhra Pradesh',
    'Karnataka',
    'Tamil Nadu',
    'Maharashtra',
    'Goa',
    'Kerala',
    'Delhi NCR',
    'Gujarat',
    'Madhya Pradesh',
    'Odisha',
    'West Bengal',
    'Rajasthan',
    'Uttar Pradesh',
    'Other'
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<UploadedFile | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setter({
        file,
        name: file.name,
        sizeFormatted: formatFileSize(file.size),
      });
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const err: Record<string, string> = {};
    if (!formData.firstName.trim()) err.firstName = 'First Name is required';
    if (!formData.lastName.trim()) err.lastName = 'Last Name is required';
    if (!formData.motherName.trim()) err.motherName = 'Mother Name is required';
    if (!formData.dob) err.dob = 'Date of Birth is required';
    
    const cleanPan = formData.panNumber.trim().toUpperCase();
    if (!cleanPan) err.panNumber = 'PAN No. is required';
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(cleanPan)) err.panNumber = 'Invalid PAN format (e.g. ABCDE1234F)';

    const cleanAadhaar = formData.aadhaarNumber.replace(/\s/g, '');
    if (!cleanAadhaar) err.aadhaarNumber = 'Aadhaar No. is required';
    else if (!/^\d{12}$/.test(cleanAadhaar)) err.aadhaarNumber = 'Aadhaar must be 12 digits';

    if (!formData.pinCode.trim() || !/^\d{6}$/.test(formData.pinCode.trim())) err.pinCode = 'Valid 6-digit PIN required';
    if (!formData.presentAddress.trim()) err.presentAddress = 'Present Address is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) err.email = 'Valid Email is required';
    if (!formData.contact.trim() || formData.contact.replace(/\D/g, '').length < 10) err.contact = 'Valid 10-digit Phone required';

    setFormErrors(err);
    return Object.keys(err).length === 0;
  };

  // Step 2 Validation (Nominee & Bank)
  const validateStep2 = () => {
    const err: Record<string, string> = {};
    if (!formData.nomineeFirstName.trim()) err.nomineeFirstName = 'Nominee First Name is required';
    if (!formData.nomineeLastName.trim()) err.nomineeLastName = 'Nominee Last Name is required';
    if (!formData.nomineeAge.trim()) err.nomineeAge = 'Nominee Age is required';

    if (!formData.bankName.trim()) err.bankName = 'Bank Name is required';
    if (!formData.branchName.trim()) err.branchName = 'Branch is required';
    if (!formData.accountNumber.trim()) err.accountNumber = 'Account Number is required';
    else if (formData.accountNumber.trim() !== formData.confirmAccountNumber.trim()) err.confirmAccountNumber = 'Account numbers do not match';

    const cleanIfsc = formData.ifscCode.trim().toUpperCase();
    if (!cleanIfsc) err.ifscCode = 'IFSC Code is required';
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(cleanIfsc)) err.ifscCode = 'Invalid IFSC code (e.g. SBIN0001234)';

    setFormErrors(err);
    return Object.keys(err).length === 0;
  };

  // Step 3 Validation (Loan & Upline)
  const validateStep3 = () => {
    const err: Record<string, string> = {};
    if (!formData.requiredAmount || Number(formData.requiredAmount) < 10000) err.requiredAmount = 'Valid Loan Amount required';
    if (!formData.purpose.trim()) err.purpose = 'Purpose of Loan is required';
    setFormErrors(err);
    return Object.keys(err).length === 0;
  };

  // Step 4 Validation (Witnesses)
  const validateStep4 = () => {
    const err: Record<string, string> = {};
    if (!formData.witness1Name.trim()) err.witness1Name = 'Witness 1 Name is required';
    if (!formData.witness1Mobile.trim()) err.witness1Mobile = 'Witness 1 Mobile is required';
    if (!formData.witness1Address.trim()) err.witness1Address = 'Witness 1 Address is required';

    if (!formData.witness2Name.trim()) err.witness2Name = 'Witness 2 Name is required';
    if (!formData.witness2Mobile.trim()) err.witness2Mobile = 'Witness 2 Mobile is required';
    if (!formData.witness2Address.trim()) err.witness2Address = 'Witness 2 Address is required';

    setFormErrors(err);
    return Object.keys(err).length === 0;
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFinalSubmit = async () => {
    if (!formData.agreeTerms) {
      alert('Please agree to terms and conditions to proceed.');
      return;
    }

    setIsSubmitting(true);
    try {
      const attachmentsPayload: { name: string; type: string; base64: string }[] = [];

      if (aadhaarDoc) {
        attachmentsPayload.push({
          name: `Aadhaar_${aadhaarDoc.name}`,
          type: aadhaarDoc.file.type,
          base64: await fileToBase64(aadhaarDoc.file),
        });
      }

      if (panDoc) {
        attachmentsPayload.push({
          name: `PAN_${panDoc.name}`,
          type: panDoc.file.type,
          base64: await fileToBase64(panDoc.file),
        });
      }

      if (bankDoc) {
        attachmentsPayload.push({
          name: `BankProof_${bankDoc.name}`,
          type: bankDoc.file.type,
          base64: await fileToBase64(bankDoc.file),
        });
      }

      if (incomeDoc) {
        attachmentsPayload.push({
          name: `IncomeProof_${incomeDoc.name}`,
          type: incomeDoc.file.type,
          base64: await fileToBase64(incomeDoc.file),
        });
      }

      const payload = {
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.contact,
        category: 'loan-application',
        loanApplicationData: {
          ...formData,
          applicationId,
        },
        attachments: attachmentsPayload,
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to submit loan application. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while transmitting loan file. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md animate-fadeIn text-left">
      <div className="bg-[#FFFFFF] w-full max-w-4xl lg:max-w-5xl rounded-3xl border border-stone-200 p-6 sm:p-10 relative shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 p-2.5 border border-stone-200 transition-all cursor-pointer rounded-full z-20 shadow-sm"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          /* SUCCESS SCREEN */
          <div className="text-center py-10 flex flex-col items-center justify-center overflow-y-auto max-w-2xl mx-auto space-y-4">
            <div className="w-24 h-24 bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 rounded-full shadow-inner animate-bounce">
              <CheckCircle2 size={56} />
            </div>
            
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-4 py-1 rounded-full border border-emerald-200">
              Loan File Officially Registered
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#10367D] heading-font uppercase tracking-tight">
              Application Dossier Submitted!
            </h3>

            <p className="text-stone-600 text-xs sm:text-sm max-w-lg leading-relaxed">
              Thank you, <strong className="text-stone-900">{formData.firstName} {formData.lastName}</strong>. Your full legal loan requisition (₹{Number(formData.requiredAmount).toLocaleString('en-IN')}) and witness records have been securely transmitted to BuildBharat Lending Desk.
            </p>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 w-full text-left text-xs space-y-3 shadow-sm">
              <div className="flex justify-between border-b border-stone-200 pb-2.5">
                <span className="text-stone-500 font-bold uppercase tracking-wider">Application Ref No.</span>
                <span className="font-mono font-extrabold text-[#10367D] text-sm">{applicationId}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2.5">
                <span className="text-stone-500 font-bold uppercase tracking-wider">Requested Capital</span>
                <span className="font-mono font-bold text-stone-900">₹{Number(formData.requiredAmount).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2.5">
                <span className="text-stone-500 font-bold uppercase tracking-wider">Settlement Bank</span>
                <span className="font-bold text-stone-900">{formData.bankName} (XXXX{formData.accountNumber.slice(-4)})</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2.5">
                <span className="text-stone-500 font-bold uppercase tracking-wider">Nominee Registered</span>
                <span className="font-bold text-stone-900">{formData.nomineeFirstName} {formData.nomineeLastName} ({formData.nomineeRelation})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-bold uppercase tracking-wider">Sanction Status</span>
                <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full">Desk Underwriting (24-48 Hrs)</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="bg-[#10367D] hover:bg-[#0A2254] text-white text-xs rounded-full px-10 py-4 uppercase font-bold tracking-wider cursor-pointer transition-all shadow-md mt-4"
            >
              Finish & Download Receipt
            </button>
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-hidden">
            
            {/* Modal Header */}
            <div className="mb-6 pr-12">
              <div className="flex items-center gap-2 text-[#D57530] text-xs font-bold uppercase tracking-wider mb-1">
                <ShieldCheck size={16} />
                <span>FORMAL LOAN APPLICATION & UPLINE SANCTION DOSSIER</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#10367D] heading-font uppercase tracking-tight">
                  BuildBharat Customer Loan Requisition
                </h3>
                <span className="text-xs font-mono font-bold bg-stone-100 text-[#10367D] px-3 py-1 rounded-lg border border-stone-200 w-fit">
                  Ref: {applicationId}
                </span>
              </div>
            </div>

            {/* Stepper Progress Bar (5 Steps) */}
            <div className="mb-6 select-none shrink-0 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <div className="grid grid-cols-5 gap-1.5 text-center text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider">
                <div className={`py-1.5 px-2 rounded-xl transition-all ${currentStep === 1 ? 'bg-[#10367D] text-white shadow-sm' : currentStep > 1 ? 'text-emerald-700 bg-emerald-50' : 'text-stone-400'}`}>
                  <span>1. Personal & KYC</span>
                </div>
                <div className={`py-1.5 px-2 rounded-xl transition-all ${currentStep === 2 ? 'bg-[#10367D] text-white shadow-sm' : currentStep > 2 ? 'text-emerald-700 bg-emerald-50' : 'text-stone-400'}`}>
                  <span>2. Nominee & Bank</span>
                </div>
                <div className={`py-1.5 px-2 rounded-xl transition-all ${currentStep === 3 ? 'bg-[#10367D] text-white shadow-sm' : currentStep > 3 ? 'text-emerald-700 bg-emerald-50' : 'text-stone-400'}`}>
                  <span>3. Loan & Purpose</span>
                </div>
                <div className={`py-1.5 px-2 rounded-xl transition-all ${currentStep === 4 ? 'bg-[#10367D] text-white shadow-sm' : currentStep > 4 ? 'text-emerald-700 bg-emerald-50' : 'text-stone-400'}`}>
                  <span>4. Upline & Witnesses</span>
                </div>
                <div className={`py-1.5 px-2 rounded-xl transition-all ${currentStep === 5 ? 'bg-[#10367D] text-white shadow-sm' : 'text-stone-400'}`}>
                  <span>5. Docs & Submit</span>
                </div>
              </div>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 pb-6 space-y-6">
              
              {/* STEP 1: PERSONAL & STATUTORY KYC DETAILS */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10367D] block mb-1">
                      SECTION 1 — APPLICANT PERSONAL & STATUTORY KYC DETAILS
                    </span>
                    <p className="text-stone-600 text-xs leading-relaxed">
                      Enter details exactly as they appear on your government-issued Aadhaar & PAN records.
                    </p>
                  </div>

                  {/* Name Triplet */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">First Name *</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="First Name..."
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                      />
                      {formErrors.firstName && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.firstName}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Middle Name</label>
                      <input
                        type="text"
                        value={formData.middleName}
                        onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                        placeholder="Middle Name..."
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Last Name *</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Last Name..."
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                      />
                      {formErrors.lastName && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.lastName}</span>}
                    </div>
                  </div>

                  {/* Mother Name & DOB */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Mother's Name *</label>
                      <input
                        type="text"
                        value={formData.motherName}
                        onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                        placeholder="Mother's Full Name..."
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                      />
                      {formErrors.motherName && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.motherName}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Date of Birth *</label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Sex / Gender *</label>
                      <div className="flex gap-4 pt-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === 'Male'}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="text-[#10367D]"
                          />
                          <span>Male</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === 'Female'}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="text-[#10367D]"
                          />
                          <span>Female</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="Other"
                            checked={formData.gender === 'Other'}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="text-[#10367D]"
                          />
                          <span>Other</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Marital Status, PAN & Aadhaar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Marital Status *</label>
                      <div className="flex gap-4 pt-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
                          <input
                            type="radio"
                            name="maritalStatus"
                            value="Single"
                            checked={formData.maritalStatus === 'Single'}
                            onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                            className="text-[#10367D]"
                          />
                          <span>Single</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
                          <input
                            type="radio"
                            name="maritalStatus"
                            value="Married"
                            checked={formData.maritalStatus === 'Married'}
                            onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                            className="text-[#10367D]"
                          />
                          <span>Married</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">PAN Number *</label>
                      <input
                        type="text"
                        maxLength={10}
                        value={formData.panNumber}
                        onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                        placeholder="ABCDE1234F"
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm font-mono uppercase tracking-widest focus:border-[#10367D] outline-none shadow-sm"
                      />
                      {formErrors.panNumber && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.panNumber}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Aadhaar Number (12 Digits) *</label>
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
                      {formErrors.aadhaarNumber && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.aadhaarNumber}</span>}
                    </div>
                  </div>

                  {/* State, District, City & PIN */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">State *</label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 text-stone-900 text-xs font-semibold focus:border-[#10367D] outline-none cursor-pointer"
                      >
                        {indianStates.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">District *</label>
                      <input
                        type="text"
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        placeholder="e.g. Rangareddy / Hyderabad"
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">City / Town *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Hyderabad"
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">PIN Code *</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={formData.pinCode}
                        onChange={(e) => setFormData({ ...formData, pinCode: e.target.value.replace(/\D/g, '') })}
                        placeholder="500070"
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm font-mono focus:border-[#10367D] outline-none shadow-sm"
                      />
                      {formErrors.pinCode && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.pinCode}</span>}
                    </div>
                  </div>

                  {/* Present Address */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Present Residence Address *</label>
                    <textarea
                      rows={2}
                      value={formData.presentAddress}
                      onChange={(e) => setFormData({ ...formData, presentAddress: e.target.value })}
                      placeholder="Door No, Building, Street, Landmark..."
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                    />
                    {formErrors.presentAddress && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.presentAddress}</span>}
                  </div>

                  {/* Email & Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="applicant@example.com"
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                      />
                      {formErrors.email && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.email}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Contact / Mobile Number *</label>
                      <div className="flex gap-2">
                        <span className="bg-stone-100 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-700 text-xs font-bold flex items-center">
                          {formData.countryCode}
                        </span>
                        <input
                          type="tel"
                          value={formData.contact}
                          onChange={(e) => setFormData({ ...formData, contact: e.target.value.replace(/\D/g, '') })}
                          placeholder="9876543210"
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                        />
                      </div>
                      {formErrors.contact && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.contact}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: NOMINEE & BANK DETAILS */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  
                  {/* Nominee Details Card */}
                  <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/90 space-y-4">
                    <div className="flex items-center gap-2 text-[#D57530] font-bold text-xs uppercase tracking-wider border-b border-slate-200 pb-2">
                      <Users size={16} />
                      <span>SECTION 2 — NOMINEE PARTICULARS</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Nominee First Name *</label>
                        <input
                          type="text"
                          value={formData.nomineeFirstName}
                          onChange={(e) => setFormData({ ...formData, nomineeFirstName: e.target.value })}
                          placeholder="Nominee First Name..."
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                        />
                        {formErrors.nomineeFirstName && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.nomineeFirstName}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Nominee Middle Name</label>
                        <input
                          type="text"
                          value={formData.nomineeMiddleName}
                          onChange={(e) => setFormData({ ...formData, nomineeMiddleName: e.target.value })}
                          placeholder="Nominee Middle Name..."
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Nominee Last Name *</label>
                        <input
                          type="text"
                          value={formData.nomineeLastName}
                          onChange={(e) => setFormData({ ...formData, nomineeLastName: e.target.value })}
                          placeholder="Nominee Last Name..."
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                        />
                        {formErrors.nomineeLastName && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.nomineeLastName}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Relation with Nominee *</label>
                        <select
                          value={formData.nomineeRelation}
                          onChange={(e) => setFormData({ ...formData, nomineeRelation: e.target.value })}
                          className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 text-stone-900 text-xs font-semibold focus:border-[#10367D] outline-none cursor-pointer"
                        >
                          <option value="Spouse">Spouse (Wife / Husband)</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Son">Son</option>
                          <option value="Daughter">Daughter</option>
                          <option value="Brother">Brother</option>
                          <option value="Sister">Sister</option>
                          <option value="Guardian">Legal Guardian</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Nominee Age (Years) *</label>
                        <input
                          type="number"
                          min="1"
                          max="120"
                          value={formData.nomineeAge}
                          onChange={(e) => setFormData({ ...formData, nomineeAge: e.target.value })}
                          placeholder="e.g. 32"
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm font-mono"
                        />
                        {formErrors.nomineeAge && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.nomineeAge}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Bank Details Card */}
                  <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/90 space-y-4">
                    <div className="flex items-center gap-2 text-[#10367D] font-bold text-xs uppercase tracking-wider border-b border-slate-200 pb-2">
                      <Landmark size={16} />
                      <span>SECTION 3 — DISBURSEMENT BANK ACCOUNT DETAILS</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Bank Name *</label>
                        <input
                          type="text"
                          value={formData.bankName}
                          onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                          placeholder="e.g. State Bank of India"
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                        />
                        {formErrors.bankName && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.bankName}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Branch Name *</label>
                        <input
                          type="text"
                          value={formData.branchName}
                          onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                          placeholder="e.g. Hayath Nagar Branch"
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                        />
                        {formErrors.branchName && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.branchName}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Account Number *</label>
                        <input
                          type="password"
                          value={formData.accountNumber}
                          onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, '') })}
                          placeholder="Account No..."
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm font-mono focus:border-[#10367D] outline-none shadow-sm"
                        />
                        {formErrors.accountNumber && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.accountNumber}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Confirm Account Number *</label>
                        <input
                          type="text"
                          value={formData.confirmAccountNumber}
                          onChange={(e) => setFormData({ ...formData, confirmAccountNumber: e.target.value.replace(/\D/g, '') })}
                          placeholder="Re-enter Account No..."
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm font-mono focus:border-[#10367D] outline-none shadow-sm"
                        />
                        {formErrors.confirmAccountNumber && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.confirmAccountNumber}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">IFSC Code *</label>
                        <input
                          type="text"
                          maxLength={11}
                          value={formData.ifscCode}
                          onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                          placeholder="SBIN0001234"
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm font-mono uppercase tracking-wider focus:border-[#10367D] outline-none shadow-sm"
                        />
                        {formErrors.ifscCode && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.ifscCode}</span>}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* STEP 3: CUSTOMER LOAN PARTICULARS */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10367D] block mb-1">
                      SECTION 4 — CUSTOMER LOAN REQUISITION & FINANCIAL PURPOSES
                    </span>
                    <p className="text-stone-600 text-xs leading-relaxed">
                      Specify the required capital, repayment horizon, and non-refundable processing acknowledgement.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Required Loan Amount (₹) *</label>
                      <input
                        type="number"
                        value={formData.requiredAmount}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData({
                            ...formData,
                            requiredAmount: val,
                            sanctionAmount: val,
                            processingFee: Math.round(Number(val) * 0.01).toString(),
                          });
                        }}
                        placeholder="e.g. 3500000"
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm font-mono font-bold focus:border-[#10367D] outline-none shadow-sm"
                      />
                      {formErrors.requiredAmount && <span className="text-[10px] text-red-500 font-bold mt-1 block">{formErrors.requiredAmount}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Sanction Target (₹) *</label>
                      <input
                        type="number"
                        value={formData.sanctionAmount}
                        onChange={(e) => setFormData({ ...formData, sanctionAmount: e.target.value })}
                        placeholder="Sanction Amount..."
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm font-mono focus:border-[#10367D] outline-none shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Processing Fee (Approx. 1%) *</label>
                      <input
                        type="number"
                        value={formData.processingFee}
                        onChange={(e) => setFormData({ ...formData, processingFee: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm font-mono focus:border-[#10367D] outline-none shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Primary Loan Purpose *</label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 text-stone-900 text-xs font-semibold focus:border-[#10367D] outline-none cursor-pointer"
                      >
                        <option value="Home Purchase & Construction">Home Purchase & Construction</option>
                        <option value="Residential Plot Acquisition">Residential Plot Acquisition</option>
                        <option value="MSME Working Capital & Expansion">MSME Working Capital & Expansion</option>
                        <option value="Green Solar Rooftop Installation (PM Surya Ghar)">Green Solar Rooftop Installation (PM Surya Ghar)</option>
                        <option value="Loan Against Property (Mortgage)">Loan Against Property (Mortgage)</option>
                        <option value="Machinery & Heavy Equipment Procurement">Machinery & Heavy Equipment Procurement</option>
                        <option value="Business Debt Refinance & Top-Up">Business Debt Refinance & Top-Up</option>
                        <option value="Skill & Higher Technical Education">Skill & Higher Technical Education</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Requested Tenure (Months)</label>
                      <input
                        type="number"
                        value={formData.tenureMonths}
                        onChange={(e) => setFormData({ ...formData, tenureMonths: e.target.value })}
                        placeholder="e.g. 240 (20 Years)"
                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-stone-900 text-sm font-mono focus:border-[#10367D] outline-none shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/90 text-stone-800 text-xs">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.processingFeeNonRefundable}
                        onChange={(e) => setFormData({ ...formData, processingFeeNonRefundable: e.target.checked })}
                        className="mt-0.5 rounded text-[#10367D] h-4 w-4"
                      />
                      <span className="font-semibold leading-relaxed">
                        * The Amount Paid for Processing is Non-Refundable as per banking administrative compliance.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 4: UP LINE & WITNESS DETAILS */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  
                  {/* Upline & Executive Card */}
                  <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/90 space-y-4">
                    <div className="flex items-center gap-2 text-[#D57530] font-bold text-xs uppercase tracking-wider border-b border-slate-200 pb-2">
                      <User size={16} />
                      <span>SECTION 5 — UP LINE SPONSOR & FIELD EXECUTIVE DETAILS (OPTIONAL)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Up Line First Name</label>
                        <input
                          type="text"
                          value={formData.uplineFirstName}
                          onChange={(e) => setFormData({ ...formData, uplineFirstName: e.target.value })}
                          placeholder="First Name..."
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Up Line ID Code</label>
                        <input
                          type="text"
                          value={formData.uplineIdCode}
                          onChange={(e) => setFormData({ ...formData, uplineIdCode: e.target.value })}
                          placeholder="e.g. BBSP-1092"
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2 text-stone-900 text-sm font-mono focus:border-[#10367D] outline-none shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Sponsor ID Code</label>
                        <input
                          type="text"
                          value={formData.sponsorIdCode}
                          onChange={(e) => setFormData({ ...formData, sponsorIdCode: e.target.value })}
                          placeholder="Sponsor ID..."
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2 text-stone-900 text-sm font-mono focus:border-[#10367D] outline-none shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200/60">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Executive Name</label>
                        <input
                          type="text"
                          value={formData.executiveName}
                          onChange={(e) => setFormData({ ...formData, executiveName: e.target.value })}
                          placeholder="Executive Name..."
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2 text-stone-900 text-sm focus:border-[#10367D] outline-none shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">Executive Sponsor ID</label>
                        <input
                          type="text"
                          value={formData.executiveSponsorId}
                          onChange={(e) => setFormData({ ...formData, executiveSponsorId: e.target.value })}
                          placeholder="Sponsor ID..."
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2 text-stone-900 text-sm font-mono focus:border-[#10367D] outline-none shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">DI Code (District/Taluka)</label>
                        <input
                          type="text"
                          value={formData.diCode}
                          onChange={(e) => setFormData({ ...formData, diCode: e.target.value })}
                          placeholder="DI Code..."
                          className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2 text-stone-900 text-sm font-mono focus:border-[#10367D] outline-none shadow-sm"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 pt-1 text-xs text-stone-700 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.rulesExplained}
                        onChange={(e) => setFormData({ ...formData, rulesExplained: e.target.checked })}
                        className="rounded text-[#10367D] h-4 w-4"
                      />
                      <span>* I have explained all the rules, terms, and repayment schedules of the company to the customer.</span>
                    </label>
                  </div>

                  {/* Two Witnesses Box */}
                  <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/90 space-y-4">
                    <div className="flex items-center gap-2 text-[#10367D] font-bold text-xs uppercase tracking-wider border-b border-slate-200 pb-2">
                      <ShieldCheck size={16} />
                      <span>SECTION 6 — LEGAL WITNESS VERIFICATION (MANDATORY)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Witness 1 */}
                      <div className="bg-white p-4 rounded-xl border border-stone-250 space-y-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10367D] block">
                          WITNESS 1 PARTICULARS *
                        </span>
                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Witness 1 Full Name *</label>
                          <input
                            type="text"
                            value={formData.witness1Name}
                            onChange={(e) => setFormData({ ...formData, witness1Name: e.target.value })}
                            placeholder="Full Name..."
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:border-[#10367D] outline-none"
                          />
                          {formErrors.witness1Name && <span className="text-[10px] text-red-500 font-bold mt-0.5 block">{formErrors.witness1Name}</span>}
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Mobile Number *</label>
                          <input
                            type="tel"
                            value={formData.witness1Mobile}
                            onChange={(e) => setFormData({ ...formData, witness1Mobile: e.target.value })}
                            placeholder="Mobile No..."
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:border-[#10367D] outline-none font-mono"
                          />
                          {formErrors.witness1Mobile && <span className="text-[10px] text-red-500 font-bold mt-0.5 block">{formErrors.witness1Mobile}</span>}
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Address *</label>
                          <input
                            type="text"
                            value={formData.witness1Address}
                            onChange={(e) => setFormData({ ...formData, witness1Address: e.target.value })}
                            placeholder="Full Residential Address..."
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:border-[#10367D] outline-none"
                          />
                          {formErrors.witness1Address && <span className="text-[10px] text-red-500 font-bold mt-0.5 block">{formErrors.witness1Address}</span>}
                        </div>
                      </div>

                      {/* Witness 2 */}
                      <div className="bg-white p-4 rounded-xl border border-stone-250 space-y-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10367D] block">
                          WITNESS 2 PARTICULARS *
                        </span>
                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Witness 2 Full Name *</label>
                          <input
                            type="text"
                            value={formData.witness2Name}
                            onChange={(e) => setFormData({ ...formData, witness2Name: e.target.value })}
                            placeholder="Full Name..."
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:border-[#10367D] outline-none"
                          />
                          {formErrors.witness2Name && <span className="text-[10px] text-red-500 font-bold mt-0.5 block">{formErrors.witness2Name}</span>}
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Mobile Number *</label>
                          <input
                            type="tel"
                            value={formData.witness2Mobile}
                            onChange={(e) => setFormData({ ...formData, witness2Mobile: e.target.value })}
                            placeholder="Mobile No..."
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:border-[#10367D] outline-none font-mono"
                          />
                          {formErrors.witness2Mobile && <span className="text-[10px] text-red-500 font-bold mt-0.5 block">{formErrors.witness2Mobile}</span>}
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Address *</label>
                          <input
                            type="text"
                            value={formData.witness2Address}
                            onChange={(e) => setFormData({ ...formData, witness2Address: e.target.value })}
                            placeholder="Full Residential Address..."
                            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:border-[#10367D] outline-none"
                          />
                          {formErrors.witness2Address && <span className="text-[10px] text-red-500 font-bold mt-0.5 block">{formErrors.witness2Address}</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* STEP 5: DOCUMENT ATTACHMENTS & FINAL CONFIRMATION */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10367D] block mb-1">
                      SECTION 7 — DOCUMENT ATTACHMENTS & FINAL REGISTRATION
                    </span>
                    <p className="text-stone-600 text-xs leading-relaxed">
                      Attach digital copies of your Aadhaar, PAN, and Bank Records to expedite formal underwriting.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Aadhaar Upload */}
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold text-stone-700">
                        <span>Aadhaar Card (PDF / Image)</span>
                        {aadhaarDoc && <span className="text-emerald-600">✓ Ready</span>}
                      </div>
                      <label className="border-2 border-dashed border-stone-300 hover:border-[#10367D] bg-white rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-colors text-center group">
                        <UploadCloud size={20} className="text-stone-400 group-hover:text-[#10367D] mb-1" />
                        <span className="text-xs text-stone-700 font-medium truncate max-w-[200px]">
                          {aadhaarDoc ? aadhaarDoc.name : 'Click to attach Aadhaar file'}
                        </span>
                        <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFileUpload(e, setAadhaarDoc)} className="hidden" />
                      </label>
                    </div>

                    {/* PAN Upload */}
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold text-stone-700">
                        <span>PAN Card (PDF / Image)</span>
                        {panDoc && <span className="text-emerald-600">✓ Ready</span>}
                      </div>
                      <label className="border-2 border-dashed border-stone-300 hover:border-[#10367D] bg-white rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-colors text-center group">
                        <UploadCloud size={20} className="text-stone-400 group-hover:text-[#10367D] mb-1" />
                        <span className="text-xs text-stone-700 font-medium truncate max-w-[200px]">
                          {panDoc ? panDoc.name : 'Click to attach PAN card file'}
                        </span>
                        <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFileUpload(e, setPanDoc)} className="hidden" />
                      </label>
                    </div>

                    {/* Bank Proof Upload */}
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold text-stone-700">
                        <span>Bank Statement / Cheque</span>
                        {bankDoc && <span className="text-emerald-600">✓ Ready</span>}
                      </div>
                      <label className="border-2 border-dashed border-stone-300 hover:border-[#10367D] bg-white rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-colors text-center group">
                        <UploadCloud size={20} className="text-stone-400 group-hover:text-[#10367D] mb-1" />
                        <span className="text-xs text-stone-700 font-medium truncate max-w-[200px]">
                          {bankDoc ? bankDoc.name : 'Click to attach Bank statement'}
                        </span>
                        <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFileUpload(e, setBankDoc)} className="hidden" />
                      </label>
                    </div>

                    {/* Income Proof Upload */}
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold text-stone-700">
                        <span>Salary Slip / ITR (Optional)</span>
                        {incomeDoc && <span className="text-emerald-600">✓ Ready</span>}
                      </div>
                      <label className="border-2 border-dashed border-stone-300 hover:border-[#10367D] bg-white rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-colors text-center group">
                        <UploadCloud size={20} className="text-stone-400 group-hover:text-[#10367D] mb-1" />
                        <span className="text-xs text-stone-700 font-medium truncate max-w-[200px]">
                          {incomeDoc ? incomeDoc.name : 'Click to attach Income proof'}
                        </span>
                        <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFileUpload(e, setIncomeDoc)} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10367D] block">
                      Application Summary Preview
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-stone-700">
                      <div><strong className="text-stone-900">Applicant:</strong> {formData.firstName} {formData.lastName}</div>
                      <div><strong className="text-stone-900">Loan:</strong> ₹{Number(formData.requiredAmount).toLocaleString('en-IN')}</div>
                      <div><strong className="text-stone-900">Aadhaar:</strong> {formData.aadhaarNumber}</div>
                      <div><strong className="text-stone-900">Bank:</strong> {formData.bankName}</div>
                    </div>
                  </div>

                  {/* Final Terms Checkbox */}
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                        className="mt-0.5 rounded text-[#10367D] h-4 w-4"
                      />
                      <span className="text-stone-800 font-medium leading-relaxed">
                        I hereby agree to the terms, conditions, KYC declarations, and verification rules of BuildBharat Synergy Partners. I certify that all supplied applicant, bank, nominee, and witness details are genuine.
                      </span>
                    </label>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Navigation */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-200 shrink-0">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  disabled={isSubmitting}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-850 border border-stone-200 rounded-full px-6 py-2.5 flex items-center justify-center gap-1.5 cursor-pointer text-xs uppercase tracking-wider font-bold transition-all shadow-sm"
                >
                  <ArrowLeft size={15} />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep === 1 && (
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep1()) setCurrentStep(2);
                  }}
                  className="bg-[#10367D] hover:bg-[#0A2254] text-white rounded-full px-8 py-3 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider font-bold transition-all ml-auto shadow-md"
                >
                  <span>Proceed to Nominee & Bank</span>
                  <ArrowRight size={15} />
                </button>
              )}

              {currentStep === 2 && (
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep2()) setCurrentStep(3);
                  }}
                  className="bg-[#10367D] hover:bg-[#0A2254] text-white rounded-full px-8 py-3 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider font-bold transition-all ml-auto shadow-md"
                >
                  <span>Proceed to Loan Particulars</span>
                  <ArrowRight size={15} />
                </button>
              )}

              {currentStep === 3 && (
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep3()) setCurrentStep(4);
                  }}
                  className="bg-[#10367D] hover:bg-[#0A2254] text-white rounded-full px-8 py-3 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider font-bold transition-all ml-auto shadow-md"
                >
                  <span>Proceed to Upline & Witnesses</span>
                  <ArrowRight size={15} />
                </button>
              )}

              {currentStep === 4 && (
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep4()) setCurrentStep(5);
                  }}
                  className="bg-[#10367D] hover:bg-[#0A2254] text-white rounded-full px-8 py-3 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider font-bold transition-all ml-auto shadow-md"
                >
                  <span>Proceed to Document Upload</span>
                  <ArrowRight size={15} />
                </button>
              )}

              {currentStep === 5 && (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting || !formData.agreeTerms}
                  className="bg-[#D57530] hover:bg-[#b95d1d] disabled:opacity-50 text-white rounded-full px-10 py-3.5 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider font-extrabold transition-all ml-auto shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      <span>Encrypting & Registering File...</span>
                    </>
                  ) : (
                    <>
                      <FileCheck size={16} />
                      <span>Submit Official Loan Dossier</span>
                    </>
                  )}
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default FormalLoanModal;
