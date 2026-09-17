"use client"
 
import type { FC, ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useSpring } from "motion/react"
 
export interface SmoothCursorProps {
  cursor?: ReactNode
}
 
export const SmoothCursor: FC<SmoothCursorProps> = ({ cursor }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isIdle, setIsIdle] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
 
  // Use springs to smooth the motion and start offscreen to avoid layout artifacts
  const cursorX = useSpring(-100, { damping: 25, stiffness: 250, mass: 0.5 })
  const cursorY = useSpring(-100, { damping: 25, stiffness: 250, mass: 0.5 })
  
  const resetIdleTimer = () => {
    setIsIdle(false)
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true)
    }, 2000) // Auto-hide after 2 seconds of inactivity
  }
 
  useEffect(() => {
    setIsMounted(true)
    
    // Check if device is touch-based
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return
 
    const handleMouseMove = (e: MouseEvent) => {
      // Ignore initial dummy browser load events at exactly (0, 0)
      if (e.clientX === 0 && e.clientY === 0 && !isVisible) return
      
      resetIdleTimer()
 
      const targetX = e.clientX - 16
      const targetY = e.clientY - 16
      if (!isVisible) {
        cursorX.jump(targetX)
        cursorY.jump(targetY)
        setIsVisible(true)
      } else {
        cursorX.set(targetX)
        cursorY.set(targetY)
      }
    }
 
    const handleMouseLeave = () => {
      setIsVisible(false)
    }
 
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }
 
    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseover", handleMouseOver)
 
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseover", handleMouseOver)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [cursorX, cursorY, isVisible])
 
  if (!isMounted || !isVisible || isIdle) return null
 
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: cursorX,
        y: cursorY,
        pointerEvents: "none",
        zIndex: 9999,
      }}
      animate={{
        scale: isHovered ? 1.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
    >
      {cursor ? (
        cursor
      ) : (
        <div className="w-8 h-8 rounded-full border border-[#D57530]/40 bg-[#D57530]/5 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D57530]" />
        </div>
      )}
    </motion.div>
  )
}
