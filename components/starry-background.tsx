"use client"

import { useEffect, useRef } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 5 // Make canvas taller for scrolling
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create stars
    const stars: { x: number; y: number; radius: number; opacity: number; speed: number }[] = []
    const createStars = () => {
      stars.length = 0
      const starCount = Math.min(3000, Math.floor((canvas.width * canvas.height) / 800))

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2,
          opacity: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.03,
        })
      }
    }

    createStars()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars with improved animation
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        if (!prefersReducedMotion) {
          star.opacity = 0.3 + Math.sin(Date.now() * star.speed) * 0.3
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [prefersReducedMotion])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full deep-space-bg z-0" aria-hidden="true" />
}
