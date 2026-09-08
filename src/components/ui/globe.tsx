"use client"

import React, { useEffect, useRef } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"

function cn(
  ...classes: (string | undefined | null | boolean | Record<string, boolean>)[]
) {
  return classes.filter(Boolean).join(" ")
}

const MOVEMENT_DAMPING = 1400

const GLOBE_CONFIG: COBEOptions = {
  width: 1200,
  height: 1200,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [165 / 255, 206 / 255, 224 / 255],
  markerColor: [213 / 255, 117 / 255, 48 / 255],
  glowColor: [235 / 255, 235 / 255, 235 / 255],
  markers: [
    { location: [12.9716, 77.5946], size: 0.08 }, // Bengaluru
    { location: [17.385, 78.4867], size: 0.07 }, // Hyderabad
    { location: [13.0827, 80.2707], size: 0.07 }, // Chennai
    { location: [19.076, 72.8777], size: 0.07 }, // Mumbai
    { location: [28.6139, 77.209], size: 0.07 }, // Delhi NCR
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const globeRef = useRef<any>(null)

  const phiRef = useRef(0)
  const widthRef = useRef(0)

  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)

  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value

    if (canvasRef.current) {
      canvasRef.current.style.cursor =
        value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current

      pointerInteractionMovement.current = delta

      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const updateWidth = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth || 500
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)

    const globe = createGlobe(canvasRef.current, {
      ...GLOBE_CONFIG,
      ...config,
      devicePixelRatio: 2,
      width: (widthRef.current || 500) * 2,
      height: (widthRef.current || 500) * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phiRef.current += 0.005
        }

        state.phi = phiRef.current + rs.get()
        state.width = (widthRef.current || 500) * 2
        state.height = (widthRef.current || 500) * 2
      },
    })

    globeRef.current = globe

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    }, 50)

    return () => {
      globe.destroy()
      window.removeEventListener("resize", updateWidth)
    }
  }, [config, rs])

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[600px] flex items-center justify-center",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0 transition-opacity duration-700 cursor-grab active:cursor-grabbing select-none"
        style={{ width: "100%", height: "100%", maxWidth: "100%", aspectRatio: "1", touchAction: "pan-y" }}
        onPointerDown={(e) => {
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchStart={(e) => {
          if (e.touches[0]) {
            updatePointerInteraction(e.touches[0].clientX)
          }
        }}
        onTouchEnd={() => updatePointerInteraction(null)}
        onTouchCancel={() => updatePointerInteraction(null)}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            updateMovement(e.touches[0].clientX)
          }
        }}
      />
    </div>
  )
}