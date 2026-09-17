import React from 'react';

export function ClientMarquee() {
  const logos = [
    { src: '/build-bharat-loans.png', alt: 'BuildBharat Loans' },
    { src: '/build-bharat-real-estate.png', alt: 'BuildBharat Real Estate' },
    { src: '/build-bharat-education.png', alt: 'BuildBharat EduTech' },
    { src: '/build-bharat-solar.png', alt: 'BuildBharat Solar' },
  ];

  // Triple-duplicate so scroll is truly seamless at any speed
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-10 bg-[#F4F1EA] border-b border-stone-200/80 overflow-hidden relative">
      <style>{`
        @keyframes marquee-infinite {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-infinite 18s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="text-center mb-6">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-stone-400 font-sans select-none">
          Trusted by businesses across South India
        </span>
      </div>

      {/* Full-width, edge-to-edge with narrow fade mask */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent, white 4%, white 96%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, white 4%, white 96%, transparent)',
        }}
      >
        <div className="marquee-track">
          {marqueeLogos.map((logo, idx) => (
            <div
              key={idx}
              className="mx-4 w-[200px] h-[80px] bg-white rounded-2xl shadow-sm border border-stone-100 flex items-center justify-center px-5 py-3 flex-shrink-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                width="160"
                height="60"
                className="max-h-full max-w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
