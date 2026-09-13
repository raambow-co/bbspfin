import React from 'react';
import { X, ExternalLink, FileText, Image as ImageIcon, Download, Eye } from 'lucide-react';

export interface PreviewableDocument {
  file?: File;
  previewUrl: string;
  name: string;
  sizeFormatted?: string;
}

interface DocumentPreviewModalProps {
  document: PreviewableDocument | null;
  onClose: () => void;
  title?: string;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  document,
  onClose,
  title = 'Document Preview',
}) => {
  if (!document) return null;

  const isImage = 
    document.file?.type.startsWith('image/') ||
    /\.(jpg|jpeg|png|webp|gif|svg|bmp)$/i.test(document.name) ||
    document.previewUrl.startsWith('data:image/');

  const isPdf = 
    document.file?.type === 'application/pdf' ||
    /\.pdf$/i.test(document.name);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden z-10 animate-scaleUp">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/90">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#10367D]/10 border border-[#10367D]/20 text-[#10367D] flex items-center justify-center shrink-0">
              {isImage ? <ImageIcon size={20} /> : <FileText size={20} />}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#10367D] block">
                {title}
              </span>
              <h3 className="text-sm font-bold text-stone-900 truncate max-w-md">
                {document.name}
              </h3>
              {document.sizeFormatted && (
                <span className="text-[11px] text-stone-500 font-mono">
                  {document.sizeFormatted}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={document.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-stone-600 hover:text-[#10367D] hover:bg-stone-200/60 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Open in new window / full screen"
            >
              <ExternalLink size={16} />
              <span className="hidden sm:inline">Open Full</span>
            </a>
            
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 transition-colors cursor-pointer border-none bg-transparent"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-stone-100 flex items-center justify-center min-h-[300px]">
          {isImage ? (
            <div className="relative max-h-[70vh] flex items-center justify-center">
              <img 
                src={document.previewUrl} 
                alt={document.name}
                className="max-h-[68vh] max-w-full w-auto object-contain rounded-xl shadow-lg border border-stone-200 bg-white"
              />
            </div>
          ) : isPdf ? (
            <iframe 
              src={document.previewUrl} 
              title={document.name}
              className="w-full h-[68vh] rounded-xl border border-stone-300 bg-white shadow-inner"
            />
          ) : (
            <div className="text-center p-8 bg-white rounded-2xl border border-stone-200 shadow-sm max-w-md">
              <FileText size={48} className="mx-auto text-stone-400 mb-3" />
              <h4 className="font-bold text-stone-900 text-sm mb-1">{document.name}</h4>
              <p className="text-xs text-stone-500 mb-4">
                Preview for this document format is best viewed in a new window.
              </p>
              <a
                href={document.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#10367D] text-white rounded-xl text-xs font-bold shadow-sm hover:bg-[#10367D]/90 transition-all"
              >
                <ExternalLink size={14} />
                <span>Open in New Tab</span>
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-white flex items-center justify-between">
          <span className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
            <Eye size={14} className="text-emerald-600" />
            <span>Document verified and ready for secure upload</span>
          </span>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer border border-stone-200"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
