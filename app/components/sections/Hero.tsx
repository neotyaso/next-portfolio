"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
  <div id="Home" className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden perspective-1000">
    {/* 背景装飾 */}
    <motion.div 
      style={{ y: y1, rotate: 10 }}
      className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full blur-3xl opacity-60 pointer-events-none"
    />
    <motion.div 
      style={{ y: y2, rotate: -10 }}
      className="absolute bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] bg-gradient-to-tr from-gray-100 to-gray-50 rounded-full blur-3xl opacity-60 pointer-events-none"
    />

    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ scale }}
      className="text-center text-white z-10 max-w-4xl mx-auto px-6"
    >
      <img className='w-full max-w-xs md:max-w-md mx-auto'  src="/images/nekoportfolio.png" />
    </motion.div>
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-black animate-bounce flex flex-col items-center"
    >
      <span className="text-sm tracking-widest">SCROLL</span>
      <ChevronDown className="w-6 h-6" />
    </motion.div>
  </div>
  );
};

export default Hero;