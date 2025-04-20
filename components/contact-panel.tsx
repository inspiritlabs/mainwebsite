"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Send, Calendar, Phone, Mail, MapPin } from "lucide-react"

export default function ContactPanel() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    preferredContact: "email",
    budget: "",
    timeline: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const formCardRef = useRef<HTMLDivElement>(null)
  const successCardRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const card = isSubmitted ? successCardRef.current : formCardRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = Math.floor((x / rect.width) * 100)
      const yPercent = Math.floor((y / rect.height) * 100)

      card.style.setProperty("--x", `${xPercent}%`)
      card.style.setProperty("--y", `${yPercent}%`)
    }

    const currentCard = isSubmitted ? successCardRef.current : formCardRef.current
    if (currentCard) {
      currentCard.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (currentCard) {
        currentCard.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [isSubmitted])

  const accentColor = "#60a5fa" // blue
  const glowColor = "rgba(96, 165, 250, 0.2)"
  const shadowColor = "rgba(37, 99, 235, 0.3)"

  return (
    <section id="contact" className="panel py-24" ref={ref}>
      <div className="container mx-auto">
        <h2 className="panel-title">Contact Us</h2>
        <p className="panel-subtitle">
          Have questions or ready to begin your memory preservation journey? Our team is here to help.
        </p>

        <div
          className={`max-w-4xl mx-auto mt-16 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transition: "all 0.8s ease-out" }}
        >
          {!isSubmitted ? (
            <div
              ref={formCardRef}
              className="premium-card p-8 rounded-xl"
              style={
                {
                  "--card-accent-color": accentColor,
                  "--card-glow-color": glowColor,
                  "--card-shadow-color": shadowColor,
                } as React.CSSProperties
              }
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-2">
                      I'm Interested In
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="creating-replica">Creating a Digital Replica</option>
                      <option value="memory-consultant">Speaking with a Memory Consultant</option>
                      <option value="grief-support">Learning about Grief Support</option>
                      <option value="pricing">Pricing Information</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Contact Method</label>
                    <div className="space-y-2">
                      {["Email", "Phone", "Video Call"].map((method) => (
                        <label key={method} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="preferredContact"
                            value={method.toLowerCase()}
                            checked={formData.preferredContact === method.toLowerCase()}
                            onChange={handleChange}
                            className="text-blue-500 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-300">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      <option value="under-1000">Under $1,000</option>
                      <option value="1000-2000">$1,000 - $2,000</option>
                      <option value="2000-3000">$2,000 - $3,000</option>
                      <option value="3000-5000">$3,000 - $5,000</option>
                      <option value="over-5000">Over $5,000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                  >
                    <option value="" disabled>
                      When would you like to start?
                    </option>
                    <option value="immediately">Immediately</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="3-months">Within 3 months</option>
                    <option value="6-months">Within 6 months</option>
                    <option value="exploring">Just exploring options</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                    placeholder="Share any specific questions or details..."
                  ></textarea>
                </div>

                <div className="flex justify-center">
                  <button type="submit" className="primary-button group flex items-center gap-2">
                    <span>Send Message</span>
                    <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/20 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Schedule a Consultation</h3>
                    <p className="text-xs text-gray-400 mt-1">30-minute personalized session</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-900/20 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Call Us</h3>
                    <p className="text-xs text-gray-400 mt-1">+1 (800) 555-MEMORY</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-900/20 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Email Us</h3>
                    <p className="text-xs text-gray-400 mt-1">info@inspirtlabs.com</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              ref={successCardRef}
              className="premium-card p-8 rounded-xl text-center"
              style={
                {
                  "--card-accent-color": accentColor,
                  "--card-glow-color": glowColor,
                  "--card-shadow-color": shadowColor,
                } as React.CSSProperties
              }
            >
              <div className="w-20 h-20 rounded-full bg-black/50 border border-white/20 mx-auto flex items-center justify-center mb-6">
                <Send className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
              <p className="text-gray-300 mb-6">
                Thank you for reaching out. A member of our team will contact you within 24 hours to discuss your memory
                preservation journey and provide detailed pricing information.
              </p>
              <div className="premium-card p-4 max-w-md mx-auto">
                <h4 className="text-lg font-medium text-white mb-2">Next Steps</h4>
                <ul className="text-sm text-gray-300 text-left space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-white">1.</span>
                    <span>Check your email for a confirmation message</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">2.</span>
                    <span>Schedule your initial consultation call</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">3.</span>
                    <span>Begin gathering voice recordings and photos</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="premium-card p-6">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Visit Our Office</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Headquarters</h4>
                    <p className="text-gray-300 text-sm">
                      123 Memory Lane, Suite 500
                      <br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Phone</h4>
                    <p className="text-gray-300 text-sm">+1 (800) 555-MEMORY</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Email</h4>
                    <p className="text-gray-300 text-sm">info@inspirtlabs.com</p>
                  </div>
                </div>
              </div>
              <div className="premium-card h-64 flex items-center justify-center bg-black/40">
                <p className="text-gray-400">Interactive Map Would Appear Here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
