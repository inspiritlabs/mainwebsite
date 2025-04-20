"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"

export default function WorkflowPanel() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const pathRef = useRef<SVGPathElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (inView && pathRef.current) {
      pathRef.current.style.strokeDashoffset = "0"
    }
  }, [inView])

  const steps = [
    {
      number: 1,
      title: "Share Memories",
      description:
        "Begin with just a one-minute voice clip, three photos, and personality notes to start the creation process.",
      icon: "🎙️",
      accentColor: "#60a5fa", // blue
      glowColor: "rgba(96, 165, 250, 0.4)",
      shadowColor: "rgba(37, 99, 235, 0.5)",
    },
    {
      number: 2,
      title: "Expert Collaboration",
      description:
        "Our team of therapists and playwrights work with you for 4 weeks to build the most accurate personality model.",
      icon: "🤝",
      accentColor: "#f59e0b", // amber
      glowColor: "rgba(245, 158, 11, 0.4)",
      shadowColor: "rgba(217, 119, 6, 0.5)",
    },
    {
      number: 3,
      title: "Talk Anytime",
      description: "Access your personalized digital replica through a dedicated phone number and chat interface.",
      icon: "💬",
      accentColor: "#a78bfa", // violet
      glowColor: "rgba(167, 139, 250, 0.4)",
      shadowColor: "rgba(124, 58, 237, 0.5)",
    },
  ]

  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, steps.length)

    const handleMouseMove = (e: MouseEvent, index: number) => {
      const card = cardsRef.current[index]
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

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
  }, [steps.length])

  return (
    <section id="workflow" className="panel py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="panel-title">How It Works</h2>
        <p className="panel-subtitle">
          Our three-step process makes creating an ethical digital replica simple, secure, and meaningful.
        </p>

        <div className="relative mt-20">
          {/* Desktop Cosmic Path */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 -translate-y-1/2">
            <svg className="w-full h-20" viewBox="0 0 1000 80" preserveAspectRatio="none">
              <path
                ref={pathRef}
                d="M0,40 C200,0 300,80 500,40 C700,0 800,80 1000,40"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
              />
            </svg>
          </div>

          {/* Workflow Steps */}
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`premium-card p-8 flex-1 relative ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={
                  {
                    transition: `all 0.6s ease-out ${index * 0.2}s`,
                    maxWidth: "400px",
                    margin: "0 auto",
                    "--card-accent-color": step.accentColor,
                    "--card-glow-color": step.glowColor,
                    "--card-shadow-color": step.shadowColor,
                  } as React.CSSProperties
                }
              >
                <div className="flex flex-col items-center text-center card-content">
                  <div className="w-16 h-16 rounded-full bg-black/50 border border-white/20 flex items-center justify-center mb-6 text-2xl transition-all duration-300 animated-border">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 transition-colors duration-300 card-title">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 mb-6">{step.description}</p>
                  <div className="text-4xl mb-2 transition-transform duration-300 hover:scale-110">{step.icon}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto text-center">
          <p className="text-white/80">
            <span className="text-white font-medium">Our process takes approximately 4 weeks</span> from initial
            consultation to final delivery. During this time, our team works closely with you to ensure the digital
            replica captures the essence of your loved one with the utmost accuracy and respect.
          </p>
        </div>
      </div>
    </section>
  )
}
