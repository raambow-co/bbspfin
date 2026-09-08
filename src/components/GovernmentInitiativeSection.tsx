import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Zap, Banknote, ShieldCheck, BadgeCheck, ArrowUpRight } from 'lucide-react';

// Factual figures are sourced from the official PM Surya Ghar portal (pmsuryaghar.gov.in) as of 2026.
// Note: Schemes are subject to revision by the Ministry of New and Renewable Energy (MNRE).

export const GovernmentInitiativeSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="py-12 bg-gradient-to-b from-[#FBF8F2] to-[#FFFFFF] border-t-2 border-stone-200 relative overflow-hidden text-left"
    >
      {/* Saffron & Green Accent Lines at the top border */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="w-1/3 bg-[#FF9933]" />
        <div className="w-1/3 bg-white" />
        <div className="w-1/3 bg-[#138808]" />
      </div>

      <div className="container-custom max-w-5xl mx-auto px-6">
        
        {/* Main Grid: Info + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Text Content Block */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow Badge with subtle tricolor accent dot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1F1D1A]/5 border border-[#1F1D1A]/10 rounded-full">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#FF9933]" />
                <span className="w-2 h-2 rounded-full bg-stone-300" />
                <span className="w-2 h-2 rounded-full bg-[#138808]" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E6A61] font-sans">
                Government of India Initiative
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold heading-font text-[#1F1D1A] uppercase tracking-wide leading-tight">
              PM Surya Ghar:<br />Muft Bijli Yojana
            </h2>

            {/* Intro Paragraph */}
            <p className="text-[#6E6A61] text-base leading-relaxed font-sans">
              Launched in February 2024 by the Government of India, this is the country's flagship rooftop solar scheme, aiming to bring solar power to one crore (10 million) households. It provides direct financial subsidy plus up to 300 units of free electricity every month through net metering.
            </p>

            {/* Highlights Chips Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { text: "Up to 300 units free electricity/month", icon: <Zap size={16} className="text-[#FF9933]" /> },
                { text: "Subsidy paid directly to bank account", icon: <Banknote size={16} className="text-[#138808]" /> },
                { text: "Collateral-free loans at concessional rates", icon: <ShieldCheck size={16} className="text-[#B08B54]" /> },
                { text: "MNRE-approved vendor network access", icon: <BadgeCheck size={16} className="text-[#B08B54]" /> }
              ].map((chip, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 p-3 bg-white border border-[#EBE6DD] rounded-xl shadow-sm hover:border-[#B08B54]/40 transition-colors"
                >
                  <span className="shrink-0">{chip.icon}</span>
                  <span className="text-[#1F1D1A] text-xs font-semibold font-sans">{chip.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a 
                href="https://pmsuryaghar.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#B08B54] hover:bg-[#1F1D1A] text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-all"
              >
                <span>Learn More on Official Portal</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

          </div>

          {/* Strong Visual Image panel */}
          <div className="lg:col-span-5">
            <div className="relative border border-[#EBE6DD] p-2 bg-[#FFFFFF] rounded-2xl shadow-xl overflow-hidden group">
              <img 
                src="/pm-surya-ghar.png" 
                alt="PM Surya Ghar Rooftop Solar Installation in India"
                className="w-full h-80 object-cover rounded-xl filter grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white text-[10px] font-bold uppercase tracking-wider bg-black/40 px-3 py-1.5 rounded-lg inline-block w-fit backdrop-blur-sm">
                Swadeshi Solar Energy Scheme
              </div>
            </div>
          </div>

        </div>
        
        {/* Sleek Features Section instead of Subsidy Matrix */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-white rounded-2xl border border-[#EBE6DD] p-8 shadow-sm flex flex-col sm:flex-row items-center gap-8 justify-between relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF9933]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
          
          <div className="flex-1">
            <h3 className="text-2xl font-extrabold text-[#1F1D1A] heading-font tracking-tight uppercase mb-2">Net Metering Advantage</h3>
            <p className="text-[#6E6A61] text-sm leading-relaxed font-sans max-w-lg">
              Install a solar plant and seamlessly integrate it with the local grid. Unused power generated during the day is exported to the grid, drastically reducing your electricity bills to near zero.
            </p>
          </div>
          
          <div className="shrink-0 relative z-10 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#FBF8F2] to-white rounded-xl border border-[#EBE6DD]">
            <span className="text-[#FF9933] text-4xl mb-2"><Zap size={40} /></span>
            <span className="text-xl font-extrabold heading-font tracking-tight text-[#1F1D1A]">Up to 300 Units</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#6E6A61] font-sans mt-1">Free Electricity / Month</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
export default GovernmentInitiativeSection;
