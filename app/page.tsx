import StarryBackground from "@/components/starry-background"
import Header from "@/components/header"
import HeroPanel from "@/components/hero-panel"
import WorkflowPanel from "@/components/workflow-panel"
import ServicesPanel from "@/components/services-panel"
import DemoPanel from "@/components/demo-panel"
import EthicsPanel from "@/components/ethics-panel"
import JourneyPanel from "@/components/journey-panel"
import EmotionalConnectionPanel from "@/components/emotional-connection-panel"
import MemoryVaultPanel from "@/components/memory-vault-panel"
import ContactPanel from "@/components/contact-panel"
import TestimonialsPanel from "@/components/testimonials-panel"
import FAQ from "@/components/faq"
import ClosingSection from "@/components/closing-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden font-sans bg-black">
      <StarryBackground />
      <div className="relative z-10">
        <Header />
        <HeroPanel />
        <div id="workflow">
          <WorkflowPanel />
        </div>
        <div id="services">
          <ServicesPanel />
        </div>
        <div id="demo">
          <DemoPanel />
        </div>
        <div id="ethics">
          <EthicsPanel />
        </div>
        <div id="journey">
          <JourneyPanel />
        </div>
        <EmotionalConnectionPanel />
        <MemoryVaultPanel />
        <div id="contact">
          <ContactPanel />
        </div>
        <TestimonialsPanel />
        <ClosingSection />
        <FAQ />
        <Footer />
      </div>
    </main>
  )
}
