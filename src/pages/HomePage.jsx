import { useState } from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import TrustedBy from "../components/landing/TrustedBy";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import MachineShowcase from "../components/landing/MachineShowcase";
import Contact from "../components/landing/Contact";
import Footer from "../components/landing/Footer";
import DemoModal from "../components/landing/DemoModal";

export default function HomePage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <>
      <Navbar onDemoClick={() => setIsDemoOpen(true)} />
      <Hero onDemoClick={() => setIsDemoOpen(true)} />
      <TrustedBy />
      <HowItWorks />
      <Features />
      <MachineShowcase />
      <Contact onDemoClick={() => setIsDemoOpen(true)} />
      <Footer />
      <DemoModal open={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  );
}
