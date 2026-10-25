import React from 'react';
import { X, Download, ExternalLink, CheckCircle2, ShieldCheck, IndianRupee, Calendar, Layers, Check } from 'lucide-react';

export interface PaymentProofData {
  id: string;
  amount: number;
  segment: string;
  segmentName: string;
  date: string;
  utrNumber?: string;
  screenshotUrl: string;
  status: 'Paid' | 'Processing' | 'Confirmed by Member';
  notes?: string;
  memberName?: string;
  memberId?: string;
  memberEmail?: string;
  memberAcknowledged?: boolean;
  acknowledgedAt?: string;
}

interface PaymentProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PaymentProofData | null;
  onAcknowledge?: (payoutId: string) => void;
}

export const PaymentProofModal: React.FC<PaymentProofModalProps> = ({
  isOpen,
  onClose,
  data,
  onAcknowledge
}) => {
  if (!isOpen || !data) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = data.screenshotUrl;
    link.download = `BBSP-Payment-Proof-${data.id}.png`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isConfirmed = data.memberAcknowledged || data.status === 'Confirmed by Member';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-3xl shadow-[0_25px_60px_-15px_rgba(16,54,125,0.25)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4.5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#10367D]/10 border border-[#10367D]/20 flex items-center justify-center text-[#10367D] shadow-xs">
              <ShieldCheck size={22} className="text-[#10367D]" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#10367D] heading-font flex items-center gap-2">
                <span>Official Disbursement Proof</span>
                {isConfirmed ? (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1 border border-emerald-200">
                    <CheckCircle2 size={11} /> Confirmed by Member
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-100 text-[#10367D] font-bold flex items-center gap-1 border border-blue-200">
                    <CheckCircle2 size={11} /> Verified Transfer
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-500 font-sans">
                Issued & Audited by Build Bharat Synergy Partners Treasury Desk
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 p-2 rounded-full border border-stone-200 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body: Details + Image Preview */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Summary Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                <IndianRupee size={11} className="text-[#D57530]" /> Amount Paid
              </span>
              <span className="text-base sm:text-lg font-black text-[#10367D] font-mono block mt-0.5">
                ₹{data.amount.toLocaleString('en-IN')}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                <Layers size={11} className="text-[#10367D]" /> Business Vertical
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block mt-0.5">
                {data.segmentName || data.segment}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                <Calendar size={11} className="text-[#10367D]" /> Settlement Date
              </span>
              <span className="text-xs sm:text-sm font-mono font-semibold text-slate-700 block mt-0.5">
                {data.date}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500">
                UTR / Reference ID
              </span>
              <span className="text-[11px] font-mono font-bold text-[#10367D] truncate block mt-0.5" title={data.utrNumber || 'N/A'}>
                {data.utrNumber || 'Direct Bank/UPI'}
              </span>
            </div>
          </div>

          {data.notes && (
            <div className="bg-[#10367D]/5 border border-[#10367D]/15 rounded-2xl px-4 py-2.5 text-xs text-slate-700">
              <strong className="text-[#10367D]">Closure Note:</strong> {data.notes}
            </div>
          )}

          {/* Screenshot Container */}
          <div className="relative group bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-3 min-h-[260px]">
            {data.screenshotUrl ? (
              <img 
                src={data.screenshotUrl} 
                alt="Bank Transfer Screenshot Proof" 
                className="max-h-[50vh] w-auto object-contain rounded-xl shadow-md border border-slate-200"
              />
            ) : (
              <div className="py-12 text-center text-slate-400 text-xs">
                No screenshot image attached to this record.
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-slate-500">
            Audit ID: <span className="font-bold text-slate-700">{data.id}</span>
          </span>

          <div className="flex items-center gap-2">
            {!isConfirmed && onAcknowledge && (
              <button
                onClick={() => {
                  onAcknowledge(data.id);
                  onClose();
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <Check size={14} />
                <span>Mark as Received in Bank</span>
              </button>
            )}

            {data.screenshotUrl && (
              <>
                <a
                  href={data.screenshotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#10367D] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <ExternalLink size={13} />
                  <span>Open Full Size</span>
                </a>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-[#10367D] hover:bg-[#1A4594] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer"
                >
                  <Download size={13} />
                  <span>Download Receipt</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="px-3.5 py-2 bg-slate-200/70 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer border-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
