"use client"
 
import React, { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
 
interface BentoCardProps {
  name: string
  description: string
  href: string
  cta: string
  background: ReactNode
  className?: string
  logo?: string
  stat?: string
}
 
export function BentoGrid({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`grid w-full auto-rows-[220px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 ${className}`}
    >
      {children}
    </div>
  )
}
 
export function BentoCard({
  name,
  description,
  href,
  cta,
  background,
  className = "",
  logo,
  stat,
}: BentoCardProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it is a normal left click without modifier keys, intercept to perform SPA transition
    if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      window.history.pushState({}, '', href);
      // Dispatch popstate event so App.tsx popstate listener wakes up and shifts currentPath state
      const popStateEvent = new PopStateEvent('popstate');
      window.dispatchEvent(popStateEvent);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
 
  return (
    <a
      href={href}
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#10367D] p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${className}`}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">{background}</div>
 
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/10 via-transparent to-black/20" />
 
      {/* Content */}
      <div className="relative z-20 flex h-full flex-col justify-between items-center text-center">
        <div className="w-full flex flex-col items-center">
          {logo ? (
            <div className="flex justify-center w-full mb-3">
              <div className="bg-white/95 px-6 py-3 rounded-2xl border border-white/10 shadow-md flex items-center justify-center group-hover:scale-[1.03] transition-transform duration-500">
                <img 
                  src={logo} 
                  alt={name} 
                  className="h-12 sm:h-14 w-auto object-contain" 
                />
              </div>
            </div>
          ) : (
            <h3 className="max-w-[240px] text-2xl font-medium tracking-tight text-white md:text-3xl font-serif">
              {name}
            </h3>
          )}
 
          <p className="mt-2 max-w-[280px] text-xs sm:text-sm leading-relaxed text-[#A5CEE0]">
            {description}
          </p>
 
          {stat && (
            <span className="mt-3 inline-block text-[10px] font-extrabold px-2.5 py-1 bg-white/10 text-white rounded-full uppercase tracking-wider border border-white/10 shadow-sm backdrop-blur-sm select-none">
              {stat}
            </span>
          )}
        </div>
 
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#A5CEE0] group-hover:text-white transition-colors duration-300">
          <span>{cta}</span>
          <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </a>
  )
}
