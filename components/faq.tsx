"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { HelpCircle, X, ChevronDown } from "lucide-react"

export default function FAQ() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)
  const [hoverQuestion, setHoverQuestion] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const faqButtonRef = useRef<HTMLButtonElement>(null)
  const questionRefs = useRef<(HTMLDivElement | null)[]>([])

  const toggleFAQ = () => {
    setIsOpen(!isOpen)
    setActiveQuestion(null)
  }

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index)

    // Scroll the answer into view
    if (activeQuestion !== index && modalRef.current) {
      setTimeout(() => {
        const questionElement = document.getElementById(`faq-question-${index}`)
        if (questionElement) {
          questionElement.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }
      }, 100)
    }
  }

  useEffect(() => {
    const handleButtonMouseMove = (e: MouseEvent) => {
      if (!faqButtonRef.current) return

      const rect = faqButtonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      faqButtonRef.current.style.setProperty("--x", `${xPercent}%`)
      faqButtonRef.current.style.setProperty("--y", `${yPercent}%`)
    }

    if (faqButtonRef.current) {
      faqButtonRef.current.addEventListener("mousemove", handleButtonMouseMove)
    }

    return () => {
      if (faqButtonRef.current) {
        faqButtonRef.current.removeEventListener("mousemove", handleButtonMouseMove)
      }
    }
  }, [])

  useEffect(() => {
    const handleModalMouseMove = (e: MouseEvent) => {
      if (!modalRef.current) return

      const rect = modalRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      modalRef.current.style.setProperty("--x", `${xPercent}%`)
      modalRef.current.style.setProperty("--y", `${yPercent}%\`)t.style.setProperty("--y", \`${yPercent}%`)
    }

    if (modalRef.current) {
      modalRef.current.addEventListener("mousemove", handleModalMouseMove)
    }

    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener("mousemove", handleModalMouseMove)
      }
    }
  }, [])

  const questions = [
    {
      question: "How accurate is the digital replica to the real person?",
      answer:
        "Our digital replicas capture the essence of a person's voice, speech patterns, and personality traits. While no technology can perfectly recreate a human being, our users report that the experience feels authentic and meaningful. The replica becomes more refined over time as it learns from interactions.",
    },
    {
      question: "Is this ethical? What about consent?",
      answer:
        "Ethics are at the core of our approach. We only create replicas with explicit pre-death consent from the individual. We also require family agreement and follow strict ethical guidelines developed with grief counselors, psychologists, and ethicists to ensure our technology supports healthy grief processing.",
    },
    {
      question: "How secure is my personal data?",
      answer:
        "We employ HIPAA-grade encryption and AES-256 secure storage for all data. Your memories and conversations remain private and are never used to train models for other customers. We maintain strict access controls and regular security audits to protect your most precious memories.",
    },
    {
      question: "What inputs do you need to create a digital replica?",
      answer:
        "The basic requirements are a one-minute voice recording, three photos, and personality notes. For enhanced authenticity, we recommend additional voice samples, more photos, and written descriptions of personality traits, stories, and common phrases. The more information provided, the more authentic the replica.",
    },
    {
      question: "How long does it take to create a digital replica?",
      answer:
        "The initial creation process typically takes 2-3 weeks. This includes data processing, model training, and expert human review to ensure quality and ethical standards. After this period, you'll have access to your digital replica, which will continue to improve with each interaction.",
    },
    {
      question: "Can I create a replica of someone who has already passed away?",
      answer:
        "We can only create replicas of individuals who provided explicit consent before passing. However, we do offer memorial services that can help preserve and organize memories, stories, and photos of loved ones who didn't have the opportunity to create a digital replica.",
    },
    {
      question: "How do you support the emotional aspects of this experience?",
      answer:
        "We partner with licensed grief counselors who guide users through the emotional journey. Each plan includes consultation sessions to help you navigate the experience in a healthy way. We also host community support groups and provide resources for understanding digital grief and connection.",
    },
  ]

  return (
    <>
      {/* Floating FAQ Button */}
      <button
        ref={faqButtonRef}
        onClick={toggleFAQ}
        className="premium-card fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        aria-label="Open FAQ"
        style={
          {
            "--card-accent-color": "#a78bfa",
            "--card-glow-color": "rgba(167, 139, 250, 0.2)",
            "--card-shadow-color": "rgba(124, 58, 237, 0.3)",
          } as React.CSSProperties
        }
      >
        <HelpCircle className="h-6 w-6 card-icon transition-colors duration-300" />
      </button>

      {/* FAQ Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="premium-card w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl"
            style={
              {
                "--card-accent-color": "#a78bfa",
                "--card-glow-color": "rgba(167, 139, 250, 0.2)",
                "--card-shadow-color": "rgba(124, 58, 237, 0.3)",
              } as React.CSSProperties
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-black/90 backdrop-blur-md p-6 border-b border-gray-800 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
              <button
                onClick={toggleFAQ}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close FAQ"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {questions.map((item, index) => (
                <div
                  key={index}
                  id={`faq-question-${index}`}
                  ref={(el) => (questionRefs.current[index] = el)}
                  className="border-b border-gray-800 last:border-0 pb-4 last:pb-0"
                  onMouseEnter={() => setHoverQuestion(index)}
                  onMouseLeave={() => setHoverQuestion(null)}
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="flex justify-between items-center w-full text-left py-2 focus:outline-none"
                  >
                    <h3
                      className="text-lg font-medium pr-8 transition-colors duration-300"
                      style={{
                        color: activeQuestion === index || hoverQuestion === index ? "#a78bfa" : "white",
                      }}
                    >
                      {item.question}
                    </h3>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        activeQuestion === index ? "transform rotate-180" : ""
                      }`}
                      style={{
                        color: activeQuestion === index || hoverQuestion === index ? "#a78bfa" : "#9ca3af",
                      }}
                    />
                  </button>

                  <div
                    className={`mt-2 text-gray-300 overflow-hidden transition-all duration-300 ${
                      activeQuestion === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="pb-2">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
