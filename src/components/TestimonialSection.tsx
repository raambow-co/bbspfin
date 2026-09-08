import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export function TestimonialSection() {
  const testimonials = [
    {
      author: 'Aditya Sai N',
      quote: 'Joining this ecosystem completely transformed our supply chain. We benefited immensely from the verified network and closed deals faster than ever before.',
      category: 'Solar',
      companyName: 'Aditya Energy Solutions',
      role: 'CEO'
    },
    {
      author: 'Yuvan D',
      quote: 'The membership provided us unparalleled access to premium real estate projects. The verification framework gave us the confidence to invest heavily and securely.',
      category: 'Real Estate',
      companyName: 'Yuvan Infra',
      role: 'Managing Partner'
    },
    {
      author: 'Teja Dumpa',
      quote: 'We secured project financing seamlessly through the platform. This membership has been a game-changer for our working capital and expansion plans.',
      category: 'Loans',
      companyName: 'Dumpa Enterprises',
      role: 'Director of Finance'
    },
    {
      author: 'D Sudheer Reddy',
      quote: 'Our hiring process for tech talent became incredibly efficient. Benefiting from this membership meant we could source top-tier trained engineers without the hassle.',
      category: 'EdTech',
      companyName: 'BuildBharat EduTech',
      role: 'Operations Head'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="py-24 bg-[#FAFAFA] border-t border-b border-[#EBE6DD] text-center relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-[#B08B54]/5 to-transparent pointer-events-none blur-3xl"></div>

      <div className="container-custom relative z-10 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#B08B54] bg-[#B08B54]/10 px-4 py-2 rounded-full border border-[#B08B54]/20 shadow-xs inline-block font-sans">
            Ecosystem Impact
          </span>
        </div>

        {/* Minimalist Carousel */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          
          <div className="absolute inset-0 flex items-center justify-between z-20 px-4 md:px-0">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 md:-ml-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#10367D] hover:border-[#10367D]/30 shadow-sm transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 md:-mr-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#10367D] hover:border-[#10367D]/30 shadow-sm transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div 
            key={activeIndex} 
            className="w-full max-w-3xl px-8 md:px-12 animate-fadeIn"
          >
            <div className="flex justify-center mb-8">
              <Quote size={32} className="text-[#B08B54]/40" />
            </div>
            
            <p className="text-xl md:text-3xl text-slate-800 font-light italic leading-relaxed mb-10 subheading-font">
              "{activeTestimonial.quote}"
            </p>
            
            <div className="flex flex-col items-center">
              <h4 className="font-extrabold text-sm uppercase text-[#10367D] tracking-widest heading-font mb-1">
                {activeTestimonial.author}
              </h4>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-sans font-semibold">
                {activeTestimonial.role}, {activeTestimonial.companyName}
              </span>
            </div>
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-500 rounded-full ${
                activeIndex === idx 
                  ? 'w-8 h-1.5 bg-[#B08B54]' 
                  : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
