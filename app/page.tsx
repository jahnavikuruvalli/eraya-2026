import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TimelineSection } from "@/components/timeline-section"
import { WorkshopsSection } from "@/components/workshops-section"
import { ExhibitionsSection } from "@/components/exhibitions-section"
import { ProShowsSection } from "@/components/pro-shows-section"
import { SponsorsSection } from "@/components/sponsors-section"
import { ContactSection } from "@/components/contact-section"
import { FloatingRegisterButton } from "@/components/floating-register-button"
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget"

export default function Home() {
  return (
    <main className="min-h-screen bg-maroon text-cream selection:bg-gold selection:text-maroon">
      <Navbar />
      <HeroSection />
      <TimelineSection />
      <WorkshopsSection />
      <ExhibitionsSection />
      <ProShowsSection />
      <SponsorsSection />
      <ContactSection />
      <FloatingRegisterButton />
      <ChatbotWidget />
    </main>
  )
}
