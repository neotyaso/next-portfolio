"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // メニューが開いているときはスクロールをロック
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 w-full bg-white backdrop-blur-md z-50 border-b">
      <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <a href="#Home">
            <img className='w-24 md:w-32'  src="/images/nekoportfolio.png" />
          </a>
        </div>
        
        <nav className="hidden md:flex space-x-8 text-center text-lg font-semibold">
          {[
            { name: 'Home', href: '#Home' },
            { name: 'About', href: '#about' },
            { name: 'Projects', href: '#projects' },
            { name: 'Playground', href: '#playground' },
            { name: 'Journey', href: '#timeline' },
            { name: 'Contact', href: '#contact' },
          ].map((link) => (
            <a key={link.name} href={link.href} className="relative text-black font-medium after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-300 hover:after:scale-x-100">
              {link.name}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden p-2 text-gray-600 hover:text-black transition-colors duration-200"
          onClick={toggleMenu}
          aria-label="メニューを開く"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* モバイルメニュー */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 bg-white z-[60]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='12' viewBox='0 0 20 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 12c0-.622-.095-1.221-.27-1.785A5.982 5.982 0 0 0 0 12h1.838a4.14 4.14 0 0 1 8.324 0H12zM2.162 0a4.14 4.14 0 0 1 8.324 0H12.325a5.982 5.982 0 0 0-10.65 0H2.162z' fill='%239ca3af' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
            }}
          >
            <div className="flex flex-col h-full relative">
              <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <a href="#Home" onClick={closeMenu}>
                    <img className='w-24' src="/images/nekoportfolio.png" />
                  </a>
                </div>
                <button onClick={closeMenu} className="p-2 text-gray-600 hover:text-black transition-colors duration-200">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center px-8">
                <div className="space-y-6">
                  {[
                    { href: "#Home", label: "Home" },
                    { href: "#about", label: "About" },
                    { href: "#projects", label: "Projects" },
                    { href: "#playground", label: "Playground" },
                    { href: "#timeline", label: "Journey" },
                    { href: "#contact", label: "Contact" },
                  ].map((item, i) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="block text-3xl font-serif font-bold text-gray-800 hover:text-black transition-colors duration-200 tracking-widest"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;