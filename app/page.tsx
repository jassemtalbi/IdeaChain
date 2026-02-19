import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturedIdeas from "@/components/landing/FeaturedIdeas";
import CTASection from "@/components/landing/CTASection";

export default function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#050a14" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <FeaturedIdeas />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
