"use client"

import type React from "react"

import { useInView } from "react-intersection-observer"
import { Lock, ImageIcon, Phone, Shield, MessageCircle, RefreshCw } from "lucide-react"
import { useEffect, useRef } from "react"

export default function ServicesPanel() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    {
      icon: <Lock className="w-6 h-6 card-icon transition-colors duration-300" />,
      title: "Privacy",
      description: "All memories are protected. Your data is never shared without consent.",
      accentColor: "#60a5fa", // blue
      glowColor: "rgba(96, 165, 250, 0.4)",
      shadowColor: "rgba(37, 99, 235, 0.5)",
    },
    {
      icon: <ImageIcon className="w-6 h-6 card-icon transition-colors duration-300" />,
      title: "What You Need",
      description: "1-minute voice clip, 3+ photos, personality notes, and family consent.",
      accentColor: "#2dd4bf", // teal
      glowColor: "rgba(45, 212, 191, 0.4)",
      shadowColor: "rgba(20, 184, 166, 0.5)",
    },
    {
      icon: <Phone className="w-6 h-6 card-icon transition-colors duration-300" />,
      title: "24/7 Access",
      description: "Custom phone number & app to converse with your loved ones anytime, anywhere.",
      accentColor: "#818cf8", // indigo
      glowColor: "rgba(129, 140, 248, 0.4)",
      shadowColor: "rgba(79, 70, 229, 0.5)",
    },
    {
      icon: <Shield className="w-6 h-6 card-icon transition-colors duration-300" />,
      title: "Secure by Design",
      description: "Hosted on private infrastructure. Encrypted. Ethical. Yours only.",
      accentColor: "#22d3ee", // cyan
      glowColor: "rgba(34, 211, 238, 0.4)",
      shadowColor: "rgba(6, 182, 212, 0.5)",
    },
    {
      icon: <MessageCircle className="w-6 h-6 card-icon transition-colors duration-300" />,
      title: "Personal Connection",
      description: "A dedicated line & custom interface for natural conversations with your digital replica.",
      accentColor: "#a78bfa", // violet
      glowColor: "rgba(167, 139, 250, 0.4)",
      shadowColor: "rgba(124, 58, 237, 0.5)",
    },
    {
      icon: <RefreshCw className="w-6 h-6 card-icon transition-colors duration-300" />,
      title: "Continuous Learning",
      description: "Each interaction refines the model, creating a more authentic connection over time.",
      accentColor: "#f472b6", // pink
      glowColor: "rgba(244, 114, 182, 0.4)",
      shadowColor: "rgba(219, 39, 119, 0.5)",
    },
  ]

  // Track mouse position for hover effect
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, services.length)

    const handleMouseMove = (e: MouseEvent, index: number) => {
      const card = cardsRef.current[index]
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left // x position within the element
      const y = e.clientY - rect.top // y position within the element

      // Calculate position in percentage
      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      card.style.setProperty("--x", `${xPercent}%`)
      card.style.setProperty("--y", `${yPercent}%`)
    }

    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.addEventListener("mousemove", (e) => handleMouseMove(e, index))
      }
    })

    return () => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          card.removeEventListener("mousemove", (e) => handleMouseMove(e, index))
        }
      })
    }
  }, [services.length])

  return (
    <section id="services" className="panel py-24 bg-black/30" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="panel-title">Our Services</h2>
        <p className="panel-subtitle">
          Inspirt Labs provides a comprehensive suite of memory preservation services designed with privacy,
          accessibility, and authenticity at their core.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`premium-card p-8 transition-all duration-500 hover:translate-y-[-8px] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={
                {
                  transition: `all 0.5s ease-out ${index * 0.15}s`,
                  "--card-accent-color": service.accentColor,
                  "--card-glow-color": service.glowColor,
                  "--card-shadow-color": service.shadowColor,
                } as React.CSSProperties
              }
            >
              <div className="flex flex-col h-full card-content">
                <div className="mb-6 w-14 h-14 rounded-full bg-black/50 border border-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 animated-border">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 transition-colors duration-300 card-title">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto text-center">
          <p className="text-white/80">
            While we only need a minute of voice recording to start, our comprehensive onboarding process involves
            multiple consultations to gather detailed information about personality traits, mannerisms, and memories.
            This ensures the most accurate and respectful digital representation possible.
          </p>
        </div>
      </div>
    </section>
  )
}
