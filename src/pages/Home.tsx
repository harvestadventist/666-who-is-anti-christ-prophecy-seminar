import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import PrismaticCanvas from '../sections/PrismaticCanvas';
import ParticleCanvas from '../sections/ParticleCanvas';
import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
import SearchBar from '../sections/SearchBar';
import About from '../sections/About';
import Topics from '../sections/Topics';
import FreeGift from '../sections/FreeGift';
import Locations from '../sections/Locations';
import FAQ from '../sections/FAQ';
import CTATicket from '../sections/CTATicket';
import Footer from '../sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <PrismaticCanvas />
      <ParticleCanvas />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <SearchBar />
        <About />
        <Topics />
        <div className="section-padding" style={{ background: '#0a0a0a' }}>
          <FreeGift />
        </div>
        <Locations />
        <FAQ />
        <CTATicket />
      </main>
      <Footer />
    </>
  );
}
