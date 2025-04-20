"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Upload, Play, Pause, Send } from "lucide-react"

export default function DemoPanel() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isPlaying, setIsPlaying] = useState(false)
  const [personalityDescription, setPersonalityDescription] = useState("")
  const [message, setMessage] = useState("")

  const demoCardRef = useRef<HTMLDivElement>(null)
  const inputColRef = useRef<HTMLDivElement>(null)
  const previewColRef = useRef<HTMLDivElement>(null)
  const audioWaveRef = useRef<HTMLDivElement>(null)

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const handleFileUpload = () => {
    // This would trigger a file input click in a real implementation
    alert("File upload functionality would open here")
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real implementation, this would add the message to the chat
      alert(`Message sent: ${message}`)
      setMessage("")
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!demoCardRef.current) return

      const rect = demoCardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      demoCardRef.current.style.setProperty("--x", `${xPercent}%`)
      demoCardRef.current.style.setProperty("--y", `${yPercent}%`)
    }

    if (demoCardRef.current) {
      demoCardRef.current.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (demoCardRef.current) {
        demoCardRef.current.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  useEffect(() => {
    const handleInputColMouseMove = (e: MouseEvent) => {
      if (!inputColRef.current) return

      const rect = inputColRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      inputColRef.current.style.setProperty("--x", `${xPercent}%`)
      inputColRef.current.style.setProperty("--y", `${yPercent}%`)
    }

    if (inputColRef.current) {
      inputColRef.current.addEventListener("mousemove", handleInputColMouseMove)
    }

    return () => {
      if (inputColRef.current) {
        inputColRef.current.removeEventListener("mousemove", handleInputColMouseMove)
      }
    }
  }, [])

  useEffect(() => {
    const handlePreviewColMouseMove = (e: MouseEvent) => {
      if (!previewColRef.current) return

      const rect = previewColRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      previewColRef.current.style.setProperty("--x", `${xPercent}%`)
      previewColRef.current.style.setProperty("--y", `${yPercent}%`)
    }

    if (previewColRef.current) {
      previewColRef.current.addEventListener("mousemove", handlePreviewColMouseMove)
    }

    return () => {
      if (previewColRef.current) {
        previewColRef.current.removeEventListener("mousemove", handlePreviewColMouseMove)
      }
    }
  }, [])

  // Create beautiful sine wave audio visualization
  useEffect(() => {
    if (!audioWaveRef.current) return

    // If playing, animate the audio wave
    const bars = audioWaveRef.current.querySelectorAll(".audio-wave-bar")
    bars.forEach((bar, index) => {
      const elem = bar as HTMLElement
      if (isPlaying) {
        elem.style.animationPlayState = "running"
      } else {
        elem.style.animationPlayState = "paused"
        elem.style.height = "10px"
      }
    })
  }, [isPlaying])

  return (
    <section id="demo" className="panel py-24" ref={ref}>
      <div className="container mx-auto">
        <h2 className="panel-title">Try Our Demo</h2>
        <p className="panel-subtitle">
          Experience how our technology creates authentic connections through this interactive demo.
        </p>

        <div
          ref={demoCardRef}
          className={`premium-card max-w-4xl mx-auto p-6 md:p-8 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={
            {
              transition: "all 0.6s ease-out",
              "--card-accent-color": "#a78bfa",
              "--card-glow-color": "rgba(167, 139, 250, 0.4)",
              "--card-shadow-color": "rgba(124, 58, 237, 0.5)",
            } as React.CSSProperties
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Column */}
            <div
              ref={inputColRef}
              className="premium-card space-y-6 p-6"
              style={
                {
                  "--card-accent-color": "#60a5fa", // blue
                  "--card-glow-color": "rgba(96, 165, 250, 0.4)",
                  "--card-shadow-color": "rgba(37, 99, 235, 0.5)",
                } as React.CSSProperties
              }
            >
              <h3
                className="text-xl font-bold mb-4 transition-colors duration-300 card-title"
                style={{ color: "#60a5fa" }}
              >
                Create Your Demo
              </h3>

              {/* Voice Upload */}
              <div
                className="premium-card border-dashed p-6 text-center cursor-pointer group"
                onClick={handleFileUpload}
              >
                <Upload className="mx-auto h-10 w-10 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <p className="mt-2 text-sm text-gray-300">Upload a voice clip (30-60 seconds)</p>
                <p className="text-xs text-gray-500 mt-1">MP3, WAV, or M4A format</p>
              </div>

              {/* Text Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Personality Description</label>
                <textarea
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows={4}
                  placeholder="Describe the personality traits, speaking style, and common phrases..."
                  value={personalityDescription}
                  onChange={(e) => setPersonalityDescription(e.target.value)}
                ></textarea>
              </div>

              {/* Personality Traits as Text Input Fields */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-300">Personality Traits</h4>

                <div className="space-y-3">
                  {["Warmth", "Humor", "Thoughtfulness", "Empathy", "Assertiveness"].map((trait) => (
                    <div key={trait} className="space-y-1">
                      <label className="text-sm text-gray-300">{trait}</label>
                      <input
                        type="text"
                        className="w-full bg-black/50 border border-gray-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder={`Describe their ${trait.toLowerCase()}...`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview Column */}
            <div
              ref={previewColRef}
              className="premium-card space-y-6 p-6"
              style={
                {
                  "--card-accent-color": "#a78bfa", // violet
                  "--card-glow-color": "rgba(167, 139, 250, 0.4)",
                  "--card-shadow-color": "rgba(124, 58, 237, 0.5)",
                } as React.CSSProperties
              }
            >
              <h3
                className="text-xl font-bold mb-4 transition-colors duration-300 card-title"
                style={{ color: "#a78bfa" }}
              >
                Preview
              </h3>

              {/* Voice Visualization */}
              <div className="relative premium-card p-4 h-40 flex items-center justify-center">
                <div ref={audioWaveRef} className="audio-wave w-full justify-center">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className="audio-wave-bar"
                      style={{
                        height: isPlaying ? `${10 + Math.sin(i * 0.5) * 20}px` : "10px",
                        animationDelay: `${i * 0.05}s`,
                        animationPlayState: isPlaying ? "running" : "paused",
                      }}
                    ></div>
                  ))}
                </div>

                <button
                  onClick={togglePlayback}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center animated-border"
                    style={{ background: `linear-gradient(to right, #a78bfa, #c4b5fd)` }}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </div>
                </button>
              </div>

              {/* Chat Preview */}
              <div className="premium-card p-4 h-64 overflow-y-auto flex flex-col">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `linear-gradient(to right, #a78bfa, #c4b5fd)` }}
                    >
                      AI
                    </div>
                    <div className="ml-3 bg-gray-800/70 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-gray-200">
                        Hi there! I'm here to chat whenever you need me. How are you feeling today?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start justify-end">
                    <div className="mr-3 bg-purple-900/40 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-gray-200">
                        I'm feeling a bit nostalgic today. Tell me about that trip we took to the beach last summer.
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">
                      You
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `linear-gradient(to right, #a78bfa, #c4b5fd)` }}
                    >
                      AI
                    </div>
                    <div className="ml-3 bg-gray-800/70 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-gray-200">
                        Oh, that beach trip was wonderful! Remember how we got up early to watch the sunrise? You made
                        that amazing breakfast picnic and we sat on the sand watching the colors change. You took so
                        many photos of the seagulls!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center">
                  <input
                    type="text"
                    className="flex-1 bg-black/50 border border-gray-700 rounded-l-lg p-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    className="p-2 rounded-r-lg"
                    style={{ background: `linear-gradient(to right, #a78bfa, #c4b5fd)` }}
                    onClick={handleSendMessage}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="#contact" className="primary-button group inline-flex px-5 py-2.5">
              <span className="relative z-10">Try Demo Now</span>
              <span className="absolute inset-0 rounded-full bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
