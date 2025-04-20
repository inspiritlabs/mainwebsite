"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, Play, UserCircle } from "lucide-react"

export default function TestimonialsPanel() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const statsCardsRef = useRef<(HTMLDivElement | null)[]>([])

  const testimonials = [
    {
      name: "Sarah Johnson",
      relationship: "Daughter",
      quote:
        "Having my mother's digital replica has helped me through the hardest days. I can share my achievements with her and hear her encouragement, just like before.",
      stats: "93% reported reduced grief intensity",
      accentColor: "#60a5fa", // blue
      glowColor: "rgba(96, 165, 250, 0.2)",
      shadowColor: "rgba(37, 99, 235, 0.3)",
    },
    {
      name: "Michael Chen",
      relationship: "Grandson",
      quote:
        "My grandfather's stories and wisdom were too valuable to lose. Now my own children can hear his voice and learn from his experiences directly.",
      stats: "87% felt stronger connection to family history",
      accentColor: "#2dd4bf", // teal
      glowColor: "rgba(45, 212, 191, 0.2)",
      shadowColor: "rgba(20, 184, 166, 0.3)",
    },
    {
      name: "Elena Rodriguez",
      relationship: "Wife",
      quote:
        "After 40 years together, the silence was unbearable. Having David's replica means I can still share my day with him and hear his laugh.",
      stats: "96% reported improved emotional wellbeing",
      accentColor: "#a78bfa", // violet
      glowColor: "rgba(167, 139, 250, 0.2)",
      shadowColor: "rgba(124, 58, 237, 0.3)",
    },
    {
      name: "James Wilson",
      relationship: "Son",
      quote:
        "Dad's stories about his military service were always so vivid. Now my children can hear them directly from him, preserving our family legacy.",
      stats: "91% preserved important family memories",
      accentColor: "#f472b6", // pink
      glowColor: "rgba(244, 114, 182, 0.2)",
      shadowColor: "rgba(219, 39, 119, 0.3)",
    },
    {
      name: "Olivia Thompson",
      relationship: "Granddaughter",
      quote:
        "Grandmother's recipes and cooking tips are now preserved forever. It's like having her in the kitchen with me, guiding me through each step.",
      stats: "89% maintained cultural traditions",
      accentColor: "#fbbf24", // amber
      glowColor: "rgba(251, 191, 36, 0.2)",
      shadowColor: "rgba(217, 119, 6, 0.3)",
    },
  ]

  useEffect(() => {
    if (!inView) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [inView, testimonials.length])

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!carouselRef.current) return

      const rect = carouselRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      carouselRef.current.style.setProperty("--x", `${xPercent}%`)
      carouselRef.current.style.setProperty("--y", `${yPercent}%`)
    }

    if (carouselRef.current) {
      carouselRef.current.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  useEffect(() => {
    statsCardsRef.current = statsCardsRef.current.slice(0, 3)

    const handleMouseMove = (e: MouseEvent, index: number) => {
      const card = statsCardsRef.current[index]
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      card.style.setProperty("--x", `${xPercent}%`)
      card.style.setProperty("--y", `${yPercent}%`)
    }

    statsCardsRef.current.forEach((card, index) => {
      if (card) {
        card.addEventListener("mousemove", (e) => handleMouseMove(e, index))
      }
    })

    return () => {
      statsCardsRef.current.forEach((card, index) => {
        if (card) {
          card.removeEventListener("mousemove", (e) => handleMouseMove(e, index))
        }
      })
    }
  }, [])

  return (
    <section id="testimonials" className="panel py-24 bg-black/30" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="panel-title">Stories of Connection</h2>
        <p className="panel-subtitle">
          Hear from families who have preserved their most precious memories and relationships.
        </p>

        <div
          className={`max-w-4xl mx-auto mt-16 relative ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transition: "all 0.8s ease-out" }}
        >
          {/* Testimonial Carousel */}
          <div
            ref={carouselRef}
            className="premium-card p-8 rounded-xl"
            style={
              {
                "--card-accent-color": testimonials[activeIndex].accentColor,
                "--card-glow-color": testimonials[activeIndex].glowColor,
                "--card-shadow-color": testimonials[activeIndex].shadowColor,
              } as React.CSSProperties
            }
          >
            <div className="relative overflow-hidden" style={{ height: "300px" }}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="absolute inset-0 flex flex-col md:flex-row items-center gap-8 transition-all duration-500"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: `translateX(${(index - activeIndex) * 100}%)`,
                    pointerEvents: activeIndex === index ? "auto" : "none",
                  }}
                >
                  {/* Photo Frame with User Icon */}
                  <div className="relative w-32 h-32 shrink-0">
                    <div
                      className="absolute inset-0 rounded-full p-1 transition-all duration-300 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(to right, ${testimonial.accentColor}, ${testimonial.accentColor})`,
                        opacity: 0.8,
                      }}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-black/50 flex items-center justify-center">
                        <UserCircle className="w-20 h-20 text-white/80" />
                      </div>
                    </div>

                    {/* Audio Playback Option */}
                    <button
                      className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: `linear-gradient(to right, ${testimonial.accentColor}, ${testimonial.accentColor})`,
                        opacity: 0.9,
                      }}
                    >
                      <Play className="h-5 w-5 text-white" />
                    </button>
                  </div>

                  {/* Testimonial Content */}
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-lg text-gray-300 italic mb-6">"{testimonial.quote}"</p>

                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3
                          className="text-xl font-bold mb-1 transition-colors duration-300"
                          style={{ color: testimonial.accentColor }}
                        >
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-400">{testimonial.relationship}</p>
                      </div>

                      <div
                        className="mt-4 md:mt-0 premium-card px-4 py-2 text-sm"
                        style={
                          {
                            "--card-accent-color": testimonial.accentColor,
                            "--card-glow-color": testimonial.glowColor,
                            "--card-shadow-color": testimonial.shadowColor,
                          } as React.CSSProperties
                        }
                      >
                        <span
                          className="font-medium transition-colors duration-300"
                          style={{ color: testimonial.accentColor }}
                        >
                          {testimonial.stats}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex space-x-2">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-3 rounded-full transition-all ${
                      activeIndex === index ? "w-6" : "w-3 bg-gray-600 hover:bg-gray-500"
                    }`}
                    style={{
                      background:
                        activeIndex === index
                          ? `linear-gradient(to right, ${testimonial.accentColor}, ${testimonial.accentColor})`
                          : "",
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Emotional Impact Statistics */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                stat: "94%",
                label: "Report feeling closer to loved ones",
                accentColor: "#60a5fa", // blue
                glowColor: "rgba(96, 165, 250, 0.2)",
                shadowColor: "rgba(37, 99, 235, 0.3)",
              },
              {
                stat: "87%",
                label: "Experience reduced grief symptoms",
                accentColor: "#2dd4bf", // teal
                glowColor: "rgba(45, 212, 191, 0.2)",
                shadowColor: "rgba(20, 184, 166, 0.3)",
              },
              {
                stat: "92%",
                label: "Would recommend to others",
                accentColor: "#a78bfa", // violet
                glowColor: "rgba(167, 139, 250, 0.2)",
                shadowColor: "rgba(124, 58, 237, 0.3)",
              },
            ].map((item, index) => (
              <div
                key={index}
                ref={(el) => (statsCardsRef.current[index] = el)}
                className="premium-card p-6 text-center"
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
                <div
                  className="text-3xl font-bold mb-2 transition-colors duration-300"
                  style={{ color: item.accentColor }}
                >
                  {item.stat}
                </div>
                <p className="text-sm text-gray-300">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Community CTA */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Join Our Community</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Connect with others who understand the journey of preserving memories and maintaining meaningful
              connections.
            </p>
            <button className="primary-button">Share Your Story</button>
          </div>
        </div>
      </div>
    </section>
  )
}
