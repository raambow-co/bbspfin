import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Search, ClipboardCheck, Settings, Zap } from 'lucide-react';

interface JourneyStep {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: "01",
    icon: <Search size={28} className="stroke-[2]" />,
    title: "Consultation",
    description: "We analyze your energy needs and roof health for a custom proposal."
  },
  {
    number: "02",
    icon: <ClipboardCheck size={28} className="stroke-[2]" />,
    title: "Site Survey",
    description: "Our engineers visit your site to ensure precision in design and shadows."
  },
  {
    number: "03",
    icon: <Settings size={28} className="stroke-[2]" />,
    title: "Installation",
    description: "Expert team installs the high-performance system within 48 hours."
  },
  {
    number: "04",
    icon: <Zap size={28} className="stroke-[2]" />,
    title: "Commissioning",
    description: "We handle the net-metering and switch on your savings!"
  }
];

export const JourneySection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
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
    <section className="py-12 bg-[#FBF8F2] relative overflow-hidden text-center border-b border-[#EBE6DD]">
      <div className="container-custom max-w-5xl mx-auto px-6">
        
        {/* Centered Eyebrow and Heading aligned with theme tokens */}
        <div className="mb-10 space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#D57530] block font-sans">
            HOW IT WORKS
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold heading-font uppercase tracking-wider">
            <span className="text-[#1F1D1A]">Your Journey to </span>
            <span className="text-[#D57530]">Solar in 4 Steps</span>
          </h2>
          <div className="w-12 h-px bg-[#D57530] mx-auto mt-4" />
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 items-start"
        >
          {JOURNEY_STEPS.map((step, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="flex flex-col items-center group relative text-center"
            >
              
              {/* Icon Container with Badge */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-2xl bg-[#F2F3F5] flex items-center justify-center text-[#D57530] group-hover:bg-[#D57530]/10 transition-colors duration-300 shadow-sm shrink-0 border border-[#EBE6DD]">
                  {step.icon}
                </div>

                {/* Overlapping Step Number Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border border-[#EBE6DD] flex items-center justify-center shadow-sm select-none">
                  <span className="text-xs font-bold text-[#D57530]">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Horizontal Dashed Divider */}
              <div className="w-full h-px border-t border-dashed border-[#EBE6DD] mb-6 max-w-[160px] mx-auto" />

              {/* Title & Description */}
              <h3 className="text-[#1F1D1A] font-extrabold text-sm uppercase tracking-wide heading-font mb-2">
                {step.title}
              </h3>
              <p className="text-[#6E6A61] text-xs leading-relaxed max-w-[200px] mx-auto font-sans font-normal">
                {step.description}
              </p>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
export default JourneySection;
