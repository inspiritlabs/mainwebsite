"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { FileImage, FileAudio, FileText, FileVideo, Database, Shield, Lock } from "lucide-react"

export default function MemoryVaultPanel() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isVaultOpen, setIsVaultOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const vaultRef = useRef<HTMLDivElement>(null)
  const memoryCardsRef = useRef<(HTMLDivElement | null)[]>([])

  const memoryTypes = [
    {
      id: "photos",
      title: "Photos & Images",
      icon: <FileImage className="w-8 h-8 card-icon transition-colors duration-300" />,
      description: "Upload up to 100 photos that capture personality, expressions, and meaningful moments.",
      technical: "Encrypted storage with AES-256, facial expression analysis, and contextual metadata preservation.",
      accentColor: "#60a5fa", // blue
      glowColor: "rgba(96, 165, 250, 0.2)",
      shadowColor: "rgba(37, 99, 235, 0.3)",
    },
    {
      id: "voice",
      title: "Voice Recordings",
      icon: <FileAudio className="w-8 h-8 card-icon transition-colors duration-300" />,
      description: "Share voice samples to preserve tone, cadence, laugh, and speaking patterns.",
      technical: "Multi-layered voice analysis capturing 37 unique vocal characteristics and emotional markers.",
      accentColor: "#2dd4bf", // teal
      glowColor: "rgba(45, 212, 191, 0.2)",
      shadowColor: "rgba(20, 184, 166, 0.3)",
    },
    {
      id: "journals",
      title: "Journal Entries",
      icon: <FileText className="w-8 h-8 card-icon transition-colors duration-300" />,
      description: "Include written stories, memories, values, beliefs, and personal philosophies.",
      technical: "Natural language processing and contextual understanding with style preservation algorithms.",
      accentColor: "#818cf8", // indigo
      glowColor: "rgba(129, 140, 248, 0.2)",
      shadowColor: "rgba(79, 70, 229, 0.3)",
    },
    {
      id: "videos",
      title: "Video Messages",
      icon: <FileVideo className="w-8 h-8 card-icon transition-colors duration-300" />,
      description: "Record video messages preserving gestures, expressions, and movement patterns.",
      technical: "Motion mapping, micro-expression preservation, and non-verbal communication pattern analysis.",
      accentColor: "#a78bfa", // violet
      glowColor: "rgba(167, 139, 250, 0.2)",
      shadowColor: "rgba(124, 58, 237, 0.3)",
    },
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!vaultRef.current) return

      const rect = vaultRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      vaultRef.current.style.setProperty("--x", `${xPercent}%`)
      vaultRef.current.style.setProperty("--y", `${yPercent}%`)
    }

    if (vaultRef.current) {
      vaultRef.current.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (vaultRef.current) {
        vaultRef.current.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  useEffect(() => {
    memoryCardsRef.current = memoryCardsRef.current.slice(0, memoryTypes.length)

    const handleMouseMove = (e: MouseEvent, index: number) => {
      const card = memoryCardsRef.current[index]
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      card.style.setProperty("--x", `${xPercent}%`)
      card.style.setProperty("--y", `${yPercent}%`)
    }

    memoryCardsRef.current.forEach((card, index) => {
      if (card) {
        card.addEventListener("mousemove", (e) => handleMouseMove(e, index))
      }
    })

    return () => {
      memoryCardsRef.current.forEach((card, index) => {
        if (card) {
          card.removeEventListener("mousemove", (e) => handleMouseMove(e, index))
        }
      })
    }
  }, [memoryTypes.length])

  return (
    <section id="memory-vault" className="panel py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="panel-title">Memory Vault</h2>
        <p className="panel-subtitle">
          Your memories are securely preserved in our state-of-the-art digital vault with military-grade encryption.
        </p>

        <div
          className={`max-w-4xl mx-auto mt-16 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transition: "all 0.8s ease-out" }}
        >
          {/* Vault visualization */}
          <div
            ref={vaultRef}
            className={`premium-card rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden transition-all duration-1000 ${
              isVaultOpen ? "border-purple-500/30" : "border-white/10"
            }`}
            style={
              {
                "--card-accent-color": "#a78bfa",
                "--card-glow-color": "rgba(167, 139, 250, 0.2)",
                "--card-shadow-color": "rgba(124, 58, 237, 0.3)",
              } as React.CSSProperties
            }
            onMouseEnter={() => setIsVaultOpen(true)}
            onMouseLeave={() => setIsVaultOpen(false)}
          >
            {/* Vault door animation effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent transition-opacity duration-1000 ${
                isVaultOpen ? "opacity-100" : "opacity-0"
              }`}
            ></div>

            {/* Vault icon */}
            <div className="flex justify-center mb-8">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-1000 ${
                  isVaultOpen ? "bg-purple-500/10 rotate-[360deg]" : "bg-white/5"
                }`}
              >
                <Database
                  className={`w-12 h-12 transition-colors duration-1000 ${
                    isVaultOpen ? "text-purple-400" : "text-white/60"
                  }`}
                />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center mb-6 text-white">
              {isVaultOpen ? "Memory Vault Access" : "Secure Memory Preservation"}
            </h3>

            {/* Memory artifacts that appear when vault is open */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-1000 ${
                isVaultOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {memoryTypes.map((type, index) => (
                <div
                  key={type.id}
                  ref={(el) => (memoryCardsRef.current[index] = el)}
                  className={`premium-card p-5 text-center transition-all duration-300 cursor-pointer ${
                    activeSection === type.id ? "scale-105" : "hover:bg-black/50"
                  }`}
                  style={
                    {
                      "--card-accent-color": type.accentColor,
                      "--card-glow-color": type.glowColor,
                      "--card-shadow-color": type.shadowColor,
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => setActiveSection(type.id)}
                  onMouseLeave={() => setActiveSection(null)}
                >
                  <div className="flex justify-center mb-3">{type.icon}</div>
                  <h4 className="font-medium mb-2 text-white transition-colors duration-300">{type.title}</h4>

                  {/* Technical details that appear on hover */}
                  <div
                    className={`transition-all duration-300 ${
                      activeSection === type.id ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"
                    }`}
                  >
                    <p className="text-xs text-white/60 mt-2">{type.technical}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Vault closed state */}
            <div
              className={`text-center transition-all duration-500 ${
                isVaultOpen ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
              }`}
            >
              <p className="text-white/80">Hover to access the Memory Vault</p>
            </div>

            {/* Security badges */}
            <div
              className={`mt-8 flex flex-wrap justify-center gap-4 transition-all duration-1000 ${
                isVaultOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {["AES-256 Encryption", "Zero-Knowledge Architecture", "Distributed Storage", "Biometric Access"].map(
                (badge, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-full bg-black/60 text-white/80 text-sm border border-white/10"
                  >
                    {badge}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Technical Details */}
          <div className="text-center">
            <h4 className="text-xl font-medium mb-4 text-white">Your Data Remains Yours</h4>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Your memories are encrypted, securely stored, and never used to train models outside your personal
              replica. You maintain full ownership and control.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div
                className="premium-card p-6"
                style={
                  {
                    "--card-accent-color": "#60a5fa",
                    "--card-glow-color": "rgba(96, 165, 250, 0.2)",
                    "--card-shadow-color": "rgba(37, 99, 235, 0.3)",
                  } as React.CSSProperties
                }
              >
                <h4 className="text-lg font-medium text-white mb-4">Data Security</h4>
                <ul className="space-y-4 text-sm text-gray-300">
                  <li className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-white mb-1">End-to-end encryption</span>
                      <span className="text-white/60">All communications protected with military-grade protocols</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-white mb-1">Biometric access controls</span>
                      <span className="text-white/60">Multi-factor authentication for authorized users only</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Database className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-white mb-1">Isolated storage systems</span>
                      <span className="text-white/60">No third-party access to your personal memory data</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div
                className="premium-card p-6"
                style={
                  {
                    "--card-accent-color": "#2dd4bf",
                    "--card-glow-color": "rgba(45, 212, 191, 0.2)",
                    "--card-shadow-color": "rgba(20, 184, 166, 0.3)",
                  } as React.CSSProperties
                }
              >
                <h4 className="text-lg font-medium text-white mb-4">Preservation Methods</h4>
                <ul className="space-y-4 text-sm text-gray-300">
                  <li className="flex items-start gap-3">
                    <FileImage className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-white mb-1">Visual memory preservation</span>
                      <span className="text-white/60">
                        Advanced image processing to maintain quality for generations
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileAudio className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-white mb-1">Voice pattern analysis</span>
                      <span className="text-white/60">
                        Captures 37 unique vocal characteristics for authentic replication
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-white shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-white mb-1">Narrative preservation</span>
                      <span className="text-white/60">
                        Contextual understanding of personal stories and writing style
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
