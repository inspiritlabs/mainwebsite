"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Clock, Users, Brain, MessageCircle, Sparkles } from "lucide-react"

export default function JourneyPanel() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeStep, setActiveStep] = useState(0)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const contentRef = useRef<(HTMLDivElement | null)[]>([])

  const journeySteps = [
    {
      title: "Initial Connection",
      description: "Begin with just a 1-minute voice recording and a few photos to create the foundation.",
      emotion: "Simplicity",
      quote: "The initial process was surprisingly simple. Just one minute of voice and a few photos to get started.",
      icon: <Clock className="h-6 w-6 card-icon transition-colors duration-300" />,
      accentColor: "#60a5fa", // blue
      glowColor: "rgba(96, 165, 250, 0.4)",
      shadowColor: "rgba(37, 99, 235, 0.5)",
    },
    {
      title: "Expert Collaboration",
      description: "Our team of therapists and playwrights work with you to build an authentic personality model.",
      emotion: "Expertise",
      quote:
        "The collaboration with professional therapists and playwrights brought a level of authenticity I never expected.",
      icon: <Users className="h-6 w-6 card-icon transition-colors duration-300" />,
      accentColor: "#f59e0b", // amber
      glowColor: "rgba(245, 158, 11, 0.4)",
      shadowColor: "rgba(217, 119, 6, 0.5)",
    },
    {
      title: "Rigorous Development",
      description: "Our AI experts work meticulously for 4 weeks to create the most accurate digital replica possible.",
      emotion: "Precision",
      quote:
        "Knowing that AI experts spent 4 full weeks fine-tuning the model gave me complete confidence in the result.",
      icon: <Brain className="h-6 w-6 card-icon transition-colors duration-300" />,
      accentColor: "#a78bfa", // violet
      glowColor: "rgba(167, 139, 250, 0.4)",
      shadowColor: "rgba(124, 58, 237, 0.5)",
    },
    {
      title: "Comprehensive Onboarding",
      description: "Multiple consultation sessions to capture personality traits, mannerisms, and unique expressions.",
      emotion: "Thoroughness",
      quote:
        "The detailed onboarding process captured nuances I hadn't even considered important, but made all the difference.",
      icon: <MessageCircle className="h-6 w-6 card-icon transition-colors duration-300" />,
      accentColor: "#f472b6", // pink
      glowColor: "rgba(244, 114, 182, 0.4)",
      shadowColor: "rgba(219, 39, 119, 0.5)",
    },
    {
      title: "Advanced Connection",
      description: "Experience our state-of-the-art AI model that evolves and deepens with each interaction.",
      emotion: "Innovation",
      quote: "This isn't just a static replica - it actually learns and evolves with each conversation we have.",
      icon: <Sparkles className="h-6 w-6 card-icon transition-colors duration-300" />,
      accentColor: "#2dd4bf", // teal
      glowColor: "rgba(45, 212, 191, 0.4)",
      shadowColor: "rgba(20, 184, 166, 0.5)",
    },
  ]

  useEffect(() => {
    stepsRef.current = stepsRef.current.slice(0, journeySteps.length)
    contentRef.current = contentRef.current.slice(0, journeySteps.length)

    const handleStepMouseMove = (e: MouseEvent, index: number) => {
      const step = stepsRef.current[index]
      if (!step) return

      const rect = step.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      step.style.setProperty("--x", `${xPercent}%`)
      step.style.setProperty("--y", `${yPercent}%`)
    }

    const handleContentMouseMove = (e: MouseEvent, index: number) => {
      const content = contentRef.current[index]
      if (!content) return

      const rect = content.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      content.style.setProperty("--x", `${xPercent}%`)
      content.style.setProperty("--y", `${yPercent}%`)
    }

    stepsRef.current.forEach((step, index) => {
      if (step) {
        step.addEventListener("mousemove", (e) => handleStepMouseMove(e, index))
      }
    })

    contentRef.current.forEach((content, index) => {
      if (content) {
        content.addEventListener("mousemove", (e) => handleContentMouseMove(e, index))
      }
    })

    return () => {
      stepsRef.current.forEach((step, index) => {
        if (step) {
          step.removeEventListener("mousemove", (e) => handleStepMouseMove(e, index))
        }
      })

      contentRef.current.forEach((content, index) => {
        if (content) {
          content.removeEventListener("mousemove", (e) => handleContentMouseMove(e, index))
        }
      })
    }
  }, [journeySteps.length])

  return (
    <section id="journey" className="panel py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="panel-title">Your 4-Week Journey</h2>
        <p className="panel-subtitle">
          Our rigorous 4-week development process combines cutting-edge AI with human expertise to create the most
          authentic digital replicas possible.
        </p>

        <div
          className={`max-w-4xl mx-auto mt-16 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transition: "all 0.8s ease-out" }}
        >
          {/* Journey Path Visualization */}
          <div className="relative">
            {/* Path Line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-px bg-white/20 rounded-full"></div>

            {/* Journey Steps */}
            <div className="space-y-20 relative z-10">
              {journeySteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Step Circle */}
                  <div
                    ref={(el) => (stepsRef.current[index] = el)}
                    className={`premium-card w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 animated-border ${
                      activeStep === index ? "border-opacity-60" : "border-white/10"
                    }`}
                    onClick={() => setActiveStep(index)}
                    style={
                      {
                        transition: `all 0.5s ease-out ${index * 0.1}s`,
                        opacity: inView ? 1 : 0,
                        "--card-accent-color": step.accentColor,
                        "--card-glow-color": step.glowColor,
                        "--card-shadow-color": step.shadowColor,
                        boxShadow:
                          activeStep === index ? `0 0 15px ${step.glowColor}, 0 0 5px ${step.shadowColor}` : "none",
                      } as React.CSSProperties
                    }
                  >
                    <div className="card-content z-10">{step.icon}</div>
                  </div>

                  {/* Content */}
                  <div
                    ref={(el) => (contentRef.current[index] = el)}
                    className={`premium-card p-6 mt-4 md:mt-0 ${
                      index % 2 === 0 ? "md:ml-8" : "md:mr-8"
                    } flex-1 max-w-md rounded-xl ${
                      activeStep === index ? "border-opacity-60 bg-black/40" : "border-white/10"
                    }`}
                    style={
                      {
                        transition: `all 0.5s ease-out ${index * 0.1 + 0.2}s`,
                        opacity: inView ? (activeStep === index ? 1 : 0.7) : 0,
                        transform: inView ? (activeStep === index ? "scale(1.02)" : "scale(1)") : "scale(0.95)",
                        "--card-accent-color": step.accentColor,
                        "--card-glow-color": step.glowColor,
                        "--card-shadow-color": step.shadowColor,
                        boxShadow:
                          activeStep === index ? `0 10px 30px ${step.shadowColor}, 0 0 15px ${step.glowColor}` : "none",
                      } as React.CSSProperties
                    }
                  >
                    <div className="card-content">
                      <h3
                        className="text-xl font-bold mb-2 transition-colors duration-300 card-title"
                        style={{
                          color: activeStep === index ? step.accentColor : "white",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-gray-300 mb-3">{step.description}</p>
                      <div className="flex justify-between items-center">
                        <span
                          className="text-sm transition-colors duration-300"
                          style={{
                            color: activeStep === index ? step.accentColor : "rgb(216, 180, 254)",
                          }}
                        >
                          {step.emotion}
                        </span>
                        {activeStep === index && (
                          <div className="text-xs italic text-gray-400 mt-4 animate-fadeIn">"{step.quote}"</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process Highlights */}
          <div className="mt-16 premium-card p-6">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Why Our Process Stands Out</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-xs text-blue-400">✓</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    <span className="text-white font-medium">Professional Collaboration</span> — Work directly with
                    therapists and playwrights
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-xs text-amber-400">✓</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    <span className="text-white font-medium">4-Week Development</span> — Meticulous AI training and
                    refinement
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-xs text-violet-400">✓</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    <span className="text-white font-medium">Comprehensive Onboarding</span> — Multiple consultation
                    sessions
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-xs text-pink-400">✓</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    <span className="text-white font-medium">State-of-the-Art AI</span> — The most advanced personality
                    modeling
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-xs text-teal-400">✓</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    <span className="text-white font-medium">Evolving Connection</span> — Continuous learning and
                    improvement
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-xs text-indigo-400">✓</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    <span className="text-white font-medium">Human-Centered Design</span> — Focused on emotional
                    connection
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <button className="primary-button group">
              <span className="relative z-10">Begin Your 4-Week Journey</span>
              <span className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
