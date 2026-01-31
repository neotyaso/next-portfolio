"use client";

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Playground from './components/sections/Playground';
import Timeline from './components/sections/Timeline';
import Contact from './components/sections/Contact';
import { LoadingScreen, MouseStalker, NoiseOverlay } from './ui/Animations';

export default function PortfolioWebsite() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen">
      <NoiseOverlay />
      <MouseStalker />
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Header />
          <main>
            <Hero />
            <About />
            <Projects />
            <Playground />
            <Timeline />
            <Contact />
            <Footer />
          </main>
        </>
      )}
    </div>
  );
}