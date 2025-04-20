"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { FileText, Users, Heart, Brain, Shield } from "lucide-react"

export default function EthicsPanel() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeEthic, setActiveEthic] = useState<number | null>(null)
  const circlesRef = useRef<(HTMLDivElement | null)[]>([])
  const caseStudyRef = useRef<HTMLDivElement>(null)

  const ethics = [
    {
      icon: <FileText className="h-8 w-8 card-icon transition-colors duration-300" />,
      title: "Pre-Death Consent",
      description: "We only create replicas with explicit permission from the individual before passing.",
      caseStudy: "Maria recorded her consent and memories to help her children cope after her terminal diagnosis.",
      accentColor: "#60a5fa", // blue
      glowColor: "rgba(96, 165, 250, 0.4)",
      shadowColor: "rgba(37, 99, 235, 0.5)",
    },
    {
      icon: <Users className="h-8 w-8 card-icon transition-colors duration-300" />,
      title: "Family Agreement",
      description: "All immediate family members must approve the creation of a digital replica.",
      caseStudy:
        "The Johnson family collectively decided to create a replica of their grandfather to preserve his stories for future generations.",
      accentColor: "#f59e0b", // amber
      glowColor: "rgba(245, 158, 11, 0.4)",
      shadowColor: "rgba(217, 119, 6, 0.5)",
    },
    {
      icon: <Heart className="h-8 w-8 card-icon transition-colors duration-300" />,
      title: "Ethical Framework",
      description: "Our AI development follows strict ethical guidelines reviewed by independent experts.",
      caseStudy:
        "Our ethics board includes psychologists, AI researchers, and grief counselors who review all technology updates.",
      accentColor: "#f472b6", // pink
      glowColor: "rgba(244, 114, 182, 0.4)",
      shadowColor: "rgba(219, 39, 119, 0.5)",
    },
    {
      icon: <Brain className="h-8 w-8 card-icon transition-colors duration-300" />,
      title: "Grief Advisors",
      description: "Licensed grief counselors guide users through the emotional journey of digital connection.",
      caseStudy:
        "Our advisors helped the Williams family use their father's replica in a healthy way that supported their grieving process.",
      accentColor: "#a78bfa", // violet
      glowColor: "rgba(167, 139, 250, 0.4)",
      shadowColor: "rgba(124, 58, 237, 0.5)",
    },
    {
      icon: <Shield className="h-8 w-8 card-icon transition-colors duration-300" />,
      title: "Security Protocol",
      description: "Military-grade encryption and strict access controls protect all personal data.",
      caseStudy: "Our security system has successfully prevented all unauthorized access attempts since our founding.",
      accentColor: "#2dd4bf", // teal
      glowColor: "rgba(45, 212, 191, 0.4)",
      shadowColor: "rgba(20, 184, 166, 0.5)",
    },
  ]

  // Handle mouse movement for circle elements
  const handleCircleMouseMove = (e: React.MouseEvent, index: number) => {
    const circle = circlesRef.current[index]
    if (!circle) return

    const rect = circle.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const xPercent = Math.floor((x / rect.width) * 100)
    const yPercent = Math.floor((y / rect.height) * 100)

    circle.style.setProperty("--x", `${xPercent}%`)
    circle.style.setProperty("--y", `${yPercent}%`)
  }

  // Handle mouse movement for case study
  const handleCaseStudyMouseMove = (e: React.MouseEvent) => {
    if (!caseStudyRef.current || activeEthic === null) return

    const rect = caseStudyRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const xPercent = Math.floor((x / rect.width) * 100)
    const yPercent = Math.floor((y / rect.height) * 100)

    caseStudyRef.current.style.setProperty("--x", `${xPercent}%`)
    caseStudyRef.current.style.setProperty("--y", `${yPercent}%`)
  }

  // Handle click on ethics circle
  const handleEthicClick = (index: number) => {
    setActiveEthic(activeEthic === index ? null : index)
  }

  // Handle hover on ethics circle
  const handleEthicHover = (index: number | null) => {
    setActiveEthic(index)
  }

  return (
    <section id="ethics" className="panel py-24 bg-black/30" ref={ref}>
      <div className="container mx-auto">
        <h2 className="panel-title">Our Ethical Commitments</h2>
        <p className="panel-subtitle">
          Inspirt Labs is built on a foundation of ethical principles that guide every aspect of our technology and
          service.
        </p>

        <div className="flex flex-wrap justify-center max-w-5xl mx-auto relative mt-16">
          {ethics.map((ethic, index) => (
            <div
              key={index}
              ref={(el) => (circlesRef.current[index] = el)}
              className={`premium-card w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full 
                flex flex-col items-center justify-center p-4 sm:p-6 text-center m-3 sm:m-4 transition-all duration-500 cursor-pointer relative
                ${activeEthic === index ? "transform scale-110 border-opacity-60 z-20" : "z-10"}
                ${inView ? "opacity-100" : "opacity-0"}`}
              style={
                {
                  transition: `all 0.5s ease-out ${index * 0.15}s`,
                  boxShadow:
                    activeEthic === index
                      ? `0 10px 30px ${ethic.shadowColor}, 0 0 15px ${ethic.glowColor}`
                      : "0 10px 30px rgba(0, 0, 0, 0.25)",
                  "--card-accent-color": ethic.accentColor,
                  "--card-glow-color": ethic.glowColor,
                  "--card-shadow-color": ethic.shadowColor,
                } as React.CSSProperties
              }
              onClick={() => handleEthicClick(index)}
              onMouseEnter={() => handleEthicHover(index)}
              onMouseLeave={() => handleEthicHover(null)}
              onMouseMove={(e) => handleCircleMouseMove(e, index)}
            >
              {/* Pulsing ring animation */}
              <div
                className="absolute w-full h-full rounded-full border border-white/20"
                style={{
                  animation: "pulse-ring 3s infinite",
                }}
              ></div>

              <div className="card-content z-10">
                <div className="mb-3 sm:mb-4">{ethic.icon}</div>
                <h3
                  className="text-base sm:text-lg font-bold mb-1 sm:mb-2 transition-colors duration-300 card-title"
                  style={{
                    color: activeEthic === index ? ethic.accentColor : "white",
                    textShadow: activeEthic === index ? `0 0 8px ${ethic.glowColor}` : "none",
                  }}
                >
                  {ethic.title}
                </h3>

                {/* Description that appears on hover */}
                <div
                  className={`transition-all duration-300 ${
                    activeEthic === index ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"
                  }`}
                >
                  <p className="text-xs text-white/80">{ethic.description}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Case Study Display */}
          {activeEthic !== null && (
            <div
              ref={caseStudyRef}
              className="mt-8 premium-card p-6 max-w-lg mx-auto animate-fadeIn"
              style={
                {
                  "--card-accent-color": ethics[activeEthic].accentColor,
                  "--card-glow-color": ethics[activeEthic].glowColor,
                  "--card-shadow-color": ethics[activeEthic].shadowColor,
                } as React.CSSProperties
              }
              onMouseMove={handleCaseStudyMouseMove}
            >
              <div className="card-content">
                <h4
                  className="text-lg font-bold mb-2 transition-colors duration-300"
                  style={{ color: ethics[activeEthic].accentColor }}
                >
                  Case Study
                </h4>
                <p className="text-sm text-gray-300">{ethics[activeEthic].caseStudy}</p>
              </div>
            </div>
          )}
        </div>

        {/* Security Protocol Details Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="premium-card p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Security Protocol Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-900/30 flex items-center justify-center shrink-0">
                    <Shield className="h-5 w-5 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">AES-256 Encryption</h4>
                    <p className="text-sm text-gray-300">
                      All data is encrypted using military-grade AES-256 encryption, the same standard used by financial
                      institutions and government agencies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center shrink-0">
                    <Shield className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Biometric Authentication</h4>
                    <p className="text-sm text-gray-300">
                      Access to digital replicas requires multi-factor authentication including biometric verification
                      for maximum security.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-900/30 flex items-center justify-center shrink-0">
                    <Shield className="h-5 w-5 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Isolated Storage</h4>
                    <p className="text-sm text-gray-300">
                      Your data is stored in isolated environments with no third-party access, ensuring complete privacy
                      and security.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-900/30 flex items-center justify-center shrink-0">
                    <Shield className="h-5 w-5 text-pink-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Regular Security Audits</h4>
                    <p className="text-sm text-gray-300">
                      We conduct regular security audits and penetration testing to ensure our systems remain
                      impenetrable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto text-center">
          <p className="text-white/80">
            Our ethical framework is developed in collaboration with leading experts in psychology, AI ethics, and grief
            counseling. We believe that technology should serve human needs with compassion and respect.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.03);
            opacity: 0.4;
          }
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
