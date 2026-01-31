"use client";

import React from 'react';

const Footer = () => (
  <footer className="bg-gray-50 py-12 border-t border-gray-100 font-serif">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <span className="text-lg font-bold tracking-widest text-gray-900">KOKI</span>
        <p className="text-gray-500 text-xs mt-2 tracking-wider">Designed & Built by Koki</p>
      </div>
      <div className="text-gray-400 text-xs tracking-widest">
        &copy; 2026 KOKI. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default Footer;