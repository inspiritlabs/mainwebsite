"use client"

import type React from "react"

import { useInView } from "react-intersection-observer"
import { Calendar, Mail, Phone } from "lucide-react"
import { useRef, useEffect } from "react"

export default function ClosingSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const closingRef = useRef<HTMLDivElement>(null)
  const contactCardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!closingRef.current) return

      const rect = closingRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      closingRef.current.style.setProperty("--x", `${xPercent}%`)
      closingRef.current.style.setProperty("--y", `${yPercent}%`)
    }

    if (closingRef.current) {
      closingRef.current.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (closingRef.current) {
        closingRef.current.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  useEffect(() => {
    contactCardsRef.current = contactCardsRef.current.slice(0, 3)

    const handleCardMouseMove = (e: MouseEvent, index: number) => {
      const card = contactCardsRef.current[index]
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      card.style.setProperty("--x", `${xPercent}%`)
      card.style.setProperty("--y", `${yPercent}%`)
    }

    contactCardsRef.current.forEach((card, index) => {
      if (card) {
        card.addEventListener("mousemove", (e) => handleCardMouseMove(e, index))
      }
    })

    return () => {
      contactCardsRef.current.forEach((card, index) => {
        if (card) {
          card.removeEventListener("mousemove", (e) => handleCardMouseMove(e, index))
        }
      })
    }
  }, [])

  const contactOptions = [
    {
      icon: <Calendar className="h-6 w-6 card-icon transition-colors duration-300" />,
      title: "Schedule Consultation",
      description: "Book a 30-minute call with a memory consultant",
      accentColor: "#60a5fa", // blue
      glowColor: "rgba(96, 165, 250, 0.4)",
      shadowColor: "rgba(37, 99, 235, 0.5)",
    },
    {
      icon: <Mail className="h-6 w-6 card-icon transition-colors duration-300" />,
      title: "Email Us",
      description: "info@inspirtlabs.com",
      accentColor: "#f472b6", // pink
      glowColor: "rgba(244, 114, 182, 0.4)",
      shadowColor: "rgba(219, 39, 119, 0.5)",
    },
    {
      icon: <Phone className="h-6 w-6 card-icon transition-colors duration-300" />,
      title: "Speak with a Consultant",
      description: "+1 (800) 555-MEMORY",
      accentColor: "#a78bfa", // violet
      glowColor: "rgba(167, 139, 250, 0.4)",
      shadowColor: "rgba(124, 58, 237, 0.5)",
    },
  ]

  return (
    <section className="panel py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div
          ref={closingRef}
          className={`premium-card max-w-4xl mx-auto text-center p-8 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={
            {
              transition: "all 0.8s ease-out",
              "--card-accent-color": "#a78bfa",
              "--card-glow-color": "rgba(167, 139, 250, 0.4)",
              "--card-shadow-color": "rgba(124, 58, 237, 0.5)",
            } as React.CSSProperties
          }
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Begin Your Memory Preservation
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Create a lasting connection that transcends time. Preserve the voice, wisdom, and personality of your loved
            ones for generations to come.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button className="primary-button group text-base inline-flex px-5 py-2.5">
              <span className="relative z-10">Create Your Replica</span>
              <span className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {contactOptions.map((item, index) => (
              <div
                key={index}
                ref={(el) => (contactCardsRef.current[index] = el)}
                className="premium-card p-6 flex flex-col items-center"
                style={
                  {
                    transition: `all 0.5s ease-out ${index * 0.15 + 0.5}s`,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(20px)",
                    "--card-accent-color": item.accentColor,
                    "--card-glow-color": item.glowColor,
                    "--card-shadow-color": item.shadowColor,
                  } as React.CSSProperties
                }
              >
                <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3
                  className="text-lg font-bold mb-2 transition-colors duration-300"
                  style={{ color: item.accentColor }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Cosmic particles converging on CTA */}
          <div className="relative h-40 mt-12">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white/40"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0,
                  animation: inView ? `convergeParticle 3s forwards ${Math.random() * 2}s` : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes convergeParticle {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
            top: 50%;
            left: 50%;
          }
        }
      `}</style>
    </section>
  )
}
