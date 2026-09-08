import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface ComponentCard {
  image: string;
  badge: string;
  title: string;
  href: string;
  hasSpecsLink?: boolean;
}

const COMPONENTS: ComponentCard[] = [
  {
    image: "/solar-panels.png",
    badge: "A-GRADE MONO/POLY",
    title: "Solar Panels",
    href: "#"
  },
  {
    image: "/inverters.png",
    badge: "GRID-TIED & HYBRID",
    title: "High-End Inverters",
    href: "#",
    hasSpecsLink: true
  },
  {
    image: "/acdb-dcdb.png",
    badge: "PROTECTION UNITS",
    title: "ACDB & DCDB",
    href: "#"
  },
  {
    image: "/cables-accessories.png",
    badge: "STANDARD GRADE",
    title: "Cables & Accs",
    href: "#"
  }
];

export const SolarComponentsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

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

  return (
    <section className="py-12 bg-[#FBF8F2] relative overflow-hidden border-b border-[#EBE6DD]">
      <div className="container-custom max-w-5xl mx-auto px-6 relative">
        
        {/* Header Row: 2-column layout on desktop aligned with page theme */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-10 text-left">
          <div className="md:col-span-7 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#D57530] block font-sans">
              INVENTORY & SUPPLIES
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold heading-font uppercase tracking-wider leading-tight">
              <span className="text-[#1F1D1A] block">Premium Solar</span>
              <span className="text-[#D57530] block">Components</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:text-right">
            <p className="text-[#6E6A61] text-xs sm:text-sm leading-relaxed max-w-md md:ml-auto font-sans font-normal">
              We supply only the highest quality components from global industry leaders for maximum efficiency.
            </p>
          </div>
        </div>

        {/* Card Grid Container with Floating Pill Badge */}
        <div className="relative pt-6">
          
          {/* Floating Pill Badge "OUR PRODUCTS" matching brandGold */}
          <div className="absolute -top-4 right-6 z-20 bg-[#D57530] text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full shadow-md select-none">
            OUR PRODUCTS
          </div>

          {/* Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {COMPONENTS.map((comp, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="relative h-[380px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group cursor-pointer border border-[#EBE6DD] bg-white flex flex-col justify-end"
              >
                {/* Full-bleed background photo */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={comp.image}
                    alt={comp.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Charcoal gradient overlay (solid-ish at the bottom, fading to transparent by mid-card) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F1D1A] via-[#1F1D1A]/40 to-transparent" />
                </div>

                {/* Content Overlay (Near bottom) */}
                <div className="relative z-10 p-5 text-left space-y-2.5">
                  
                  {/* Category Pill Badge (semi-transparent charcoal background, gold text) */}
                  <div className="inline-block bg-[#1F1D1A]/80 border border-[#D57530]/20 px-2.5 py-1 rounded-md">
                    <span className="text-[#D57530] text-[8px] font-extrabold uppercase tracking-widest block font-sans">
                      {comp.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-extrabold text-lg tracking-wide uppercase heading-font leading-tight">
                    {comp.title}
                  </h3>

                  {/* Card 2's Technical Specs link */}
                  {comp.hasSpecsLink && (
                    <div className="flex items-center gap-2 pt-1 border-t border-white/10 mt-1">
                      <span className="text-white text-[10px] font-bold uppercase tracking-wider font-sans group-hover:text-[#D57530] transition-colors">
                        Technical Specs
                      </span>
                      <div className="w-5 h-5 rounded-full bg-[#D57530] text-white flex items-center justify-center transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                        <ArrowUpRight size={10} className="stroke-[3]" />
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
export default SolarComponentsSection;
