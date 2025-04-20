"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Brain, Zap, Heart, Sparkles, Lightbulb } from "lucide-react"

export default function EmotionalConnectionPanel() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeArea, setActiveArea] = useState<string | null>(null)
  const brainCardRef = useRef<HTMLDivElement>(null)
  const quoteCardRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])

  const brainAreas = [
    {
      id: "memory",
      name: "Memory Formation",
      icon: <Brain className="h-6 w-6 card-icon transition-colors duration-300" />,
      position: { top: "20%", left: "30%" },
      description:
        "Our technology activates the same neural pathways involved in forming and retrieving memories of loved ones.",
      fact: "The hippocampus plays a crucial role in converting short-term memories to long-term memories.",
      accentColor: "#60a5fa", // blue
      glowColor: "rgba(96, 165, 250, 0.3)",
      shadowColor: "rgba(37, 99, 235, 0.4)",
    },
    {
      id: "emotion",
      name: "Emotional Response",
      icon: <Heart className="h-6 w-6 card-icon transition-colors duration-300" />,
      position: { top: "35%", left: "70%" },
      description:
        "Digital replicas trigger authentic emotional responses in the brain's limbic system, similar to real interactions.",
      fact: "The amygdala processes emotional reactions, including those associated with meaningful relationships.",
      accentColor: "#f472b6", // pink
      glowColor: "rgba(244, 114, 182, 0.3)",
      shadowColor: "rgba(219, 39, 119, 0.4)",
    },
    {
      id: "recognition",
      name: "Voice Recognition",
      icon: <Zap className="h-6 w-6 card-icon transition-colors duration-300" />,
      position: { top: "60%", left: "25%" },
      description:
        "Familiar voice patterns activate specialized regions in the temporal lobe, creating a sense of presence.",
      fact: "The superior temporal gyrus is specialized for processing the human voice and speech patterns.",
      accentColor: "#fbbf24", // amber
      glowColor: "rgba(251, 191, 36, 0.3)",
      shadowColor: "rgba(217, 119, 6, 0.4)",
    },
    {
      id: "connection",
      name: "Social Connection",
      icon: <Sparkles className="h-6 w-6 card-icon transition-colors duration-300" />,
      position: { top: "70%", left: "65%" },
      description:
        "Conversations with digital replicas stimulate the brain's social network, supporting emotional well-being.",
      fact: "The ventromedial prefrontal cortex is involved in processing social relationships and attachments.",
      accentColor: "#2dd4bf", // teal
      glowColor: "rgba(45, 212, 191, 0.3)",
      shadowColor: "rgba(20, 184, 166, 0.4)",
    },
    {
      id: "meaning",
      name: "Meaning Making",
      icon: <Lightbulb className="h-6 w-6 card-icon transition-colors duration-300" />,
      position: { top: "40%", left: "50%" },
      description:
        "Sharing experiences with replicas helps the brain create meaning and narrative continuity after loss.",
      fact: "The posterior cingulate cortex helps integrate memories and emotions into a coherent personal narrative.",
      accentColor: "#a78bfa", // violet
      glowColor: "rgba(167, 139, 250, 0.3)",
      shadowColor: "rgba(124, 58, 237, 0.4)",
    },
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!brainCardRef.current) return

      const rect = brainCardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      brainCardRef.current.style.setProperty("--x", `${xPercent}%`)
      brainCardRef.current.style.setProperty("--y", `${yPercent}%`)
    }

    if (brainCardRef.current) {
      brainCardRef.current.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (brainCardRef.current) {
        brainCardRef.current.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  useEffect(() => {
    const handleQuoteCardMouseMove = (e: MouseEvent) => {
      if (!quoteCardRef.current) return

      const rect = quoteCardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      quoteCardRef.current.style.setProperty("--x", `${xPercent}%`)
      quoteCardRef.current.style.setProperty("--y", `${yPercent}%`)
    }

    if (quoteCardRef.current) {
      quoteCardRef.current.addEventListener("mousemove", handleQuoteCardMouseMove)
    }

    return () => {
      if (quoteCardRef.current) {
        quoteCardRef.current.removeEventListener("mousemove", handleQuoteCardMouseMove)
      }
    }
  }, [])

  useEffect(() => {
    nodeRefs.current = nodeRefs.current.slice(0, brainAreas.length)

    const handleNodeMouseMove = (e: MouseEvent, index: number) => {
      const node = nodeRefs.current[index]
      if (!node) return

      const rect = node.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      node.style.setProperty("--x", `${xPercent}%`)
      node.style.setProperty("--y", `${yPercent}%`)
    }

    nodeRefs.current.forEach((node, index) => {
      if (node) {
        node.addEventListener("mousemove", (e) => handleNodeMouseMove(e, index))
      }
    })

    return () => {
      nodeRefs.current.forEach((node, index) => {
        if (node) {
          node.removeEventListener("mousemove", (e) => handleNodeMouseMove(e, index))
        }
      })
    }
  }, [brainAreas.length])

  return (
    <section id="emotional-connection" className="panel py-24 bg-black/30" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="panel-title">The Science of Connection</h2>
        <p className="panel-subtitle">
          Our technology is built on neuroscience research about memory, emotion, and human connection.
        </p>

        <div
          ref={brainCardRef}
          className={`max-w-4xl mx-auto mt-16 premium-card p-8 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={
            {
              transition: "all 0.8s ease-out",
              "--card-accent-color": activeArea
                ? brainAreas.find((area) => area.id === activeArea)?.accentColor
                : "#a78bfa",
              "--card-glow-color": activeArea
                ? brainAreas.find((area) => area.id === activeArea)?.glowColor
                : "rgba(167, 139, 250, 0.2)",
              "--card-shadow-color": activeArea
                ? brainAreas.find((area) => area.id === activeArea)?.shadowColor
                : "rgba(124, 58, 237, 0.3)",
            } as React.CSSProperties
          }
        >
          {/* Interactive Brain Visualization */}
          <div className="relative h-[500px] mb-8">
            {/* Brain outline */}
            <div className="absolute w-[300px] h-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg viewBox="0 0 200 260" className="w-full h-full">
                <path
                  d="M100,20 C140,20 170,50 170,100 C170,150 140,180 100,220 C60,180 30,150 30,100 C30,50 60,20 100,20 Z"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
                <path
                  d="M100,20 C140,20 170,50 170,100 C170,150 140,180 100,220"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
                <path
                  d="M100,220 C60,180 30,150 30,100 C30,50 60,20 100,20"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
                <path
                  d="M30,100 C30,150 60,180 100,220 C140,180 170,150 170,100"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
                <path
                  d="M100,20 L100,220"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
                <path
                  d="M30,100 L170,100"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>

            {/* Neural connections */}
            <div className="absolute inset-0">
              <svg className="w-full h-full" style={{ overflow: "visible" }}>
                <defs>
                  <radialGradient id="neuralGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </radialGradient>
                </defs>
                {brainAreas.map((area, i) => (
                  <g key={i}>
                    {brainAreas.map(
                      (targetArea, j) =>
                        i !== j && (
                          <line
                            key={`${i}-${j}`}
                            x1={area.position.left}
                            y1={area.position.top}
                            x2={targetArea.position.left}
                            y2={targetArea.position.top}
                            stroke={
                              activeArea === area.id || activeArea === targetArea.id
                                ? activeArea === area.id
                                  ? area.accentColor
                                  : targetArea.accentColor
                                : "rgba(255,255,255,0.1)"
                            }
                            strokeWidth="1"
                            strokeDasharray={activeArea ? "none" : "3,3"}
                            style={{
                              transition: "all 0.5s ease",
                              opacity: activeArea === area.id || activeArea === targetArea.id ? 0.6 : 0.2,
                            }}
                          />
                        ),
                    )}
                  </g>
                ))}
              </svg>
            </div>

            {/* Interactive nodes */}
            {brainAreas.map((area, index) => (
              <div
                key={area.id}
                ref={(el) => (nodeRefs.current[index] = el)}
                className={`absolute cursor-pointer transition-all duration-300 ${
                  activeArea === area.id ? "z-20" : "z-10"
                }`}
                style={{
                  top: area.position.top,
                  left: area.position.left,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseEnter={() => setActiveArea(area.id)}
                onMouseLeave={() => setActiveArea(null)}
              >
                <div
                  className={`premium-card relative rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeArea === area.id ? "w-16 h-16 border-opacity-60" : "w-10 h-10 border-white/20"
                  }`}
                  style={
                    {
                      "--card-accent-color": area.accentColor,
                      "--card-glow-color": area.glowColor,
                      "--card-shadow-color": area.shadowColor,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                      activeArea === area.id ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background: `radial-gradient(circle, ${area.glowColor} 0%, rgba(255,255,255,0) 70%)`,
                      animation: activeArea === area.id ? "pulse 2s infinite" : "none",
                    }}
                  ></div>
                  {area.icon}
                </div>

                {/* Info popup */}
                <div
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 premium-card p-4 transition-all duration-300 ${
                    activeArea === area.id
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                  style={
                    {
                      "--card-accent-color": area.accentColor,
                      "--card-glow-color": area.glowColor,
                      "--card-shadow-color": area.shadowColor,
                    } as React.CSSProperties
                  }
                >
                  <h4
                    className="text-lg font-bold mb-2 transition-colors duration-300"
                    style={{ color: area.accentColor }}
                  >
                    {area.name}
                  </h4>
                  <p className="text-sm text-gray-300 mb-2">{area.description}</p>
                  <div className="text-xs text-white/60 italic">{area.fact}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Expert Quote */}
          <div
            ref={quoteCardRef}
            className="premium-card p-6 border-l-4 max-w-2xl mx-auto"
            style={
              {
                borderLeftColor: "#a78bfa",
                "--card-accent-color": "#a78bfa",
                "--card-glow-color": "rgba(167, 139, 250, 0.2)",
                "--card-shadow-color": "rgba(124, 58, 237, 0.3)",
              } as React.CSSProperties
            }
          >
            <p className="text-sm italic text-gray-300">
              "The Inspirt Labs approach to digital memory preservation represents a breakthrough in how we understand
              grief and connection. Their ethical framework ensures these tools support healthy processing rather than
              dependency."
            </p>
            <p className="text-xs text-white/60 mt-2">— Dr. Sarah Chen, Neuroscientist & Grief Psychology Researcher</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }
      `}</style>
    </section>
  )
}
