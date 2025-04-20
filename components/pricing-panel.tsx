"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { Check, Shield } from "lucide-react"

export default function PricingPanel() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [preservationYears, setPreservationYears] = useState(10)

  const tiers = [
    {
      name: "Memorial Connection",
      price: 1499,
      description: "Create a basic digital replica with essential features",
      features: [
        "Voice pattern preservation",
        "Basic personality modeling",
        "Text chat interface",
        "5 years of secure storage",
        "Annual memory refreshes",
      ],
      highlight: false,
      cta: "Get Started",
    },
    {
      name: "Eternal Connection",
      price: 2499,
      description: "Our most popular option with enhanced features",
      features: [
        "Advanced voice & speech patterns",
        "Deep personality modeling",
        "Text & voice chat interfaces",
        "25 years of secure storage",
        "Quarterly memory refreshes",
        "Family sharing (up to 5 members)",
        "Grief counselor consultation",
      ],
      highlight: true,
      cta: "Recommended Choice",
    },
    {
      name: "Legacy Preservation",
      price: 3999,
      description: "The ultimate memory preservation experience",
      features: [
        "Premium voice & speech patterns",
        "Comprehensive personality modeling",
        "Text, voice & video interfaces",
        "Lifetime secure storage",
        "Monthly memory refreshes",
        "Unlimited family sharing",
        "Dedicated grief counselor",
        "Annual technology upgrades",
        "Legacy message scheduling",
      ],
      highlight: false,
      cta: "Preserve Forever",
    },
  ]

  const calculateROI = (basePrice: number) => {
    // Simple ROI calculation based on years of preservation
    const yearlyValue = basePrice / 5 // Base value divided by 5 years
    const totalValue = yearlyValue * preservationYears
    return totalValue.toFixed(2)
  }

  return (
    <section id="pricing" className="panel py-24 bg-black/30" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="panel-title">Pricing Plans</h2>
        <p className="panel-subtitle">
          Choose the perfect plan to preserve your most precious memories and connections.
        </p>

        <div
          className={`max-w-5xl mx-auto mt-16 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          style={{ transition: "all 0.8s ease-out" }}
        >
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`glass-card p-6 rounded-xl flex flex-col h-full relative transition-all duration-500 ${
                  tier.highlight
                    ? "border-2 border-purple-500/50 transform md:-translate-y-4"
                    : "border border-white/10 hover:border-white/30"
                }`}
                style={{
                  transition: `all 0.5s ease-out ${index * 0.15}s`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? (tier.highlight ? "translateY(-16px)" : "translateY(0)") : "translateY(20px)",
                }}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-white">${tier.price}</span>
                    <span className="text-gray-400 ml-2">one-time</span>
                  </div>
                </div>

                <div className="flex-1">
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                    tier.highlight
                      ? "bg-black/60 border border-white/30 text-white hover:bg-black/80 hover:border-white/50"
                      : "bg-black/60 border border-white/20 text-white hover:bg-black/80 hover:border-white/30"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Trust Element */}
          <div className="mt-12 glass-card p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">30-Day Sensitivity Guarantee</h3>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We understand this is a deeply personal decision. If you feel your digital replica isn't capturing the
              essence of your loved one within 30 days, we'll refund your payment in full.
            </p>
          </div>

          {/* ROI Calculator */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-medium mb-4 text-white">Ready to Preserve Your Memories?</h3>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Choose the plan that best fits your needs and begin your memory preservation journey today.
            </p>
            <button className="primary-button">
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
