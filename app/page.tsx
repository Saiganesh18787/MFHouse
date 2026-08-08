import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import WhyMFHouse from "@/components/home/WhyMFHouse";
import ExploreFunds from "@/components/home/ExploreFunds";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <WhyMFHouse />
      <ExploreFunds />
      <CTA />
      <Footer />
    </main>
  );
}