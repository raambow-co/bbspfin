import { MessageCircle } from 'lucide-react';
 
export function FloatingContactButton() {
  const whatsappUrl = 'https://wa.me/919353018855';
 
  return (
    <div className="fixed bottom-6 right-6 z-[9990]">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA56] text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 group relative text-decoration-none"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} className="fill-white text-[#25D366]" />
        
        {/* Tooltip / Prompt bubble */}
        <span className="absolute right-full mr-3 bg-stone-900 border border-stone-800 text-white font-sans text-xs px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
          Chat with Us
          <span className="absolute top-1/2 -translate-y-1/2 left-full border-4 border-transparent border-l-stone-900" />
        </span>
      </a>
    </div>
  );
}
