"use client"

import type React from "react"

import { ChevronDown } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRef, useEffect } from "react"

export default function HeroPanel() {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const heroRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<(HTMLDivElement | null)[]>([])

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("workflow")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return

      const rect = heroRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Calculate position in percentage
      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      heroRef.current.style.setProperty("--x", `${xPercent}%`)
      heroRef.current.style.setProperty("--y", `${yPercent}%`)
    }

    if (heroRef.current) {
      heroRef.current.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (heroRef.current) {
        heroRef.current.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  useEffect(() => {
    badgesRef.current = badgesRef.current.slice(0, 3)

    const handleBadgeMouseMove = (e: MouseEvent, index: number) => {
      const badge = badgesRef.current[index]
      if (!badge) return

      const rect = badge.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      badge.style.setProperty("--x", `${xPercent}%`)
      badge.style.setProperty("--y", `${yPercent}%`)
    }

    badgesRef.current.forEach((badge, index) => {
      if (badge) {
        badge.addEventListener("mousemove", (e) => handleBadgeMouseMove(e, index))
      }
    })

    return () => {
      badgesRef.current.forEach((badge, index) => {
        if (badge) {
          badge.removeEventListener("mousemove", (e) => handleBadgeMouseMove(e, index))
        }
      })
    }
  }, [])

  const badges = [
    {
      title: "HIPAA-grade Encryption",
      icon: "🔒",
      accentColor: "#60a5fa", // blue
      glowColor: "rgba(96, 165, 250, 0.4)",
      shadowColor: "rgba(37, 99, 235, 0.5)",
    },
    {
      title: "Licensed Grief Advisors",
      icon: "🤝",
      accentColor: "#f59e0b", // amber
      glowColor: "rgba(245, 158, 11, 0.4)",
      shadowColor: "rgba(217, 119, 6, 0.5)",
    },
    {
      title: "AES-256 Secure Storage",
      icon: "🛡️",
      accentColor: "#a78bfa", // violet
      glowColor: "rgba(167, 139, 250, 0.4)",
      shadowColor: "rgba(124, 58, 237, 0.5)",
    },
  ]

  return (
    <section
      ref={heroRef}
      className="panel min-h-screen flex flex-col justify-center items-center pt-24 pb-16 relative"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(96, 165, 250, 0.15) 0%, transparent 70%)",
          transition: "background 0.3s ease",
        }}
      ></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 animate-[fadeIn_1.5s_ease-in-out_forwards] tracking-tight">
          Inspirt Labs
        </h1>

        <h2 className="text-xl md:text-2xl lg:text-3xl text-white mb-6 animate-[fadeIn_1s_ease-in-out_0.5s_forwards] opacity-0 leading-tight">
          Create a safe, AI-guided space to speak with the people you miss
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto mb-10 animate-[fadeIn_1s_ease-in-out_1s_forwards] opacity-0 leading-relaxed">
          Our ethical digital replicas preserve the essence of your loved ones through advanced AI. We collaborate with
          professional therapists and playwrights to build the most accurate personality models, creating meaningful
          connections that evolve with each conversation.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-[fadeIn_1s_ease-in-out_1.5s_forwards] opacity-0">
          <button className="primary-button group inline-flex px-5 py-2.5">
            <span className="relative z-10">Create a Replica</span>
            <span className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
          </button>
          <a href="#demo" className="primary-button group inline-flex px-5 py-2.5">
            <span className="relative z-10">Try Demo</span>
            <span className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
          </a>
        </div>

        <div className="flex justify-center gap-6 flex-wrap mb-16 animate-[fadeIn_1s_ease-in-out_2s_forwards] opacity-0">
          {badges.map((badge, index) => (
            <div
              key={index}
              ref={(el) => (badgesRef.current[index] = el)}
              className="premium-card px-4 py-3 flex items-center gap-2"
              style={
                {
                  "--card-accent-color": badge.accentColor,
                  "--card-glow-color": badge.glowColor,
                  "--card-shadow-color": badge.shadowColor,
                } as React.CSSProperties
              }
            >
              <span className="text-xl">{badge.icon}</span>
              <span className="text-sm text-gray-300 transition-colors duration-300">{badge.title}</span>
            </div>
          ))}
        </div>

        <button
          onClick={scrollToNextSection}
          className="animate-bounce mt-8 text-white animate-[fadeIn_1s_ease-in-out_2.5s_forwards] opacity-0"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  )
}
