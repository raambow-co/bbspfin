import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Star, ChevronRight, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

// Fictional, illustrative customer review records for Build Bharat Solar.
// CRITICAL NOTICE: All reviews below are temporary placeholder data and MUST be replaced 
// with real, consented customer testimonials and verified feedback before this section goes live in production.
interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  rating: number;
  avatarInitial: string;
  platform: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh K.",
    location: "VIJAYAWADA, AP",
    quote: "Switching to solar was completely hassle-free. Build Bharat handled the entire grid connection and subsidy process. Outstanding support from start to finish!",
    rating: 5,
    avatarInitial: "R",
    platform: "VERIFIED CUSTOMER"
  },
  {
    id: 2,
    name: "Srinivas Rao",
    location: "GUNTUR, AP",
    quote: "The panel build quality and installation execution are top-tier. My monthly electricity utility bill has already dropped by 85%. Highly recommend their clean energy setups.",
    rating: 5,
    avatarInitial: "S",
    platform: "VERIFIED CUSTOMER"
  },
  {
    id: 3,
    name: "Latha M.",
    location: "VISAKHAPATNAM, AP",
    quote: "Professional engineers, timely site audit, and complete clarity on direct bank subsidies. The system was mounted and commissioned within 48 hours without any issues.",
    rating: 5,
    avatarInitial: "L",
    platform: "VERIFIED CUSTOMER"
  },
  {
    id: 4,
    name: "Kalyan C.",
    location: "TIRUPATI, AP",
    quote: "Excellent collateral-free financing options aligned through their loans gateway made the investment extremely simple. The system runs flawlessly.",
    rating: 5,
    avatarInitial: "K",
    platform: "VERIFIED CUSTOMER"
  }
];

export const SolarTestimonialsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 340;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 bg-[#FAF9F6] relative overflow-hidden border-b border-[#EBE6DD]">
      <div className="container-custom max-w-5xl mx-auto px-6">
        
        {/* Header Block (Centered) */}
        <div className="text-center mb-10 space-y-3">
          <span className="inline-flex items-center px-3.5 py-1.5 bg-[#D57530]/10 border border-[#D57530]/20 rounded-full">
            <span className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-[#D57530] font-sans">
              SOCIAL PROOF
            </span>
          </span>
          
          <h2 className="text-2xl md:text-4xl font-extrabold heading-font uppercase tracking-wider text-[#1F1D1A]">
            Trusted by <span className="text-[#D57530]">Thousands</span> of Customers
          </h2>
          
          <p className="text-[#6E6A61] text-xs sm:text-sm font-sans max-w-xl mx-auto leading-relaxed">
            We take pride in our service quality. See what our happy customers have to say about switching to Build Bharat Solar.
          </p>
          <div className="w-12 h-px bg-[#D57530] mx-auto mt-4" />
        </div>

        {/* Carousel Wrapper with custom controls */}
        <div className="relative group">
          
          {/* Scrollable Row */}
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-4 scrollbar-none px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {TESTIMONIALS_DATA.map((t, idx) => (
              <motion.div
                key={t.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="min-w-[280px] sm:min-w-[320px] max-w-[340px] flex-shrink-0 bg-white border border-[#EBE6DD] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 snap-center relative flex flex-col justify-between"
              >
                {/* Subtle Watermark quote icon */}
                <div className="absolute top-4 left-4 text-stone-200/40 pointer-events-none select-none">
                  <Quote size={32} className="opacity-15" />
                </div>

                <div className="space-y-4">
                  {/* Top Row: Stars + Platform Badge */}
                  <div className="flex items-center justify-between gap-2 relative z-10">
                    <div className="flex items-center gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-[#D57530] text-[#D57530]" />
                      ))}
                    </div>
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#6E6A61] bg-[#FAF9F6] border border-[#EBE6DD] px-2 py-1 rounded-md">
                      {t.platform}
                    </span>
                  </div>

                  {/* Fictional Quote text */}
                  <p className="text-[#1F1D1A] text-xs leading-relaxed italic font-sans relative z-10 pt-2 font-normal">
                    "{t.quote}"
                  </p>
                </div>

                {/* Bottom Row: User Avatar + Name/Location + Stylistic chevron */}
                <div className="flex items-center justify-between border-t border-[#EBE6DD] pt-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FAF9F6] border border-[#EBE6DD] flex items-center justify-center text-xs font-bold text-[#D57530]">
                      {t.avatarInitial}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase text-[#1F1D1A] heading-font tracking-wide">
                        {t.name}
                      </h4>
                      <span className="text-[9px] font-bold text-[#6E6A61]/70 block tracking-wider font-sans">
                        {t.location}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-[#6E6A61] stroke-[2] opacity-50" />
                </div>

              </motion.div>
            ))}
          </div>

          {/* Left/Right Floating Navigation Chevron controls */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden md:block">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white border border-[#EBE6DD] shadow-sm flex items-center justify-center text-[#1F1D1A] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
          </div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block">
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-white border border-[#EBE6DD] shadow-sm flex items-center justify-center text-[#1F1D1A] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
            >
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
export default SolarTestimonialsSection;
