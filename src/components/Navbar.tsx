"use client";
import React, { useState } from "react";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <nav className="w-full px-4 py-3 sm:px-8 sm:py-4 flex items-center justify-between border-b border-gray-200 bg-white/90 dark:bg-[#18181b]/90 shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <img src="/univiewlab-logo.svg" alt="Univiewlab logo" className="w-8 h-8 rounded-full border-2 border-blue-500 bg-white dark:bg-[#23232a]" />
        <span className="font-bold text-lg text-blue-600 tracking-tight">Univiewlab</span>
      </div>
      <button
        className="sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
        aria-label="Toggle navigation menu"
        onClick={() => setNavOpen((v) => !v)}
      >
        <span className={`block w-6 h-0.5 bg-blue-600 mb-1 transition-all ${navOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-blue-600 mb-1 transition-all ${navOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-blue-600 transition-all ${navOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>
      <div className={`flex-col sm:flex-row sm:flex gap-6 font-medium text-base items-center absolute sm:static top-16 left-0 w-full sm:w-auto bg-white dark:bg-[#18181b] border-b sm:border-0 border-gray-200 dark:border-gray-700 shadow-md sm:shadow-none z-10 transition-all ${navOpen ? 'flex' : 'hidden sm:flex'}`}>
        <a href="/preview" className="block px-6 py-3 sm:p-0 text-gray-700 dark:text-gray-200 hover:text-blue-600">Device & Browser Preview</a>
        <a href="/security" className="block px-6 py-3 sm:p-0 text-gray-700 dark:text-gray-200 hover:text-blue-600">Security Check</a>
        <a href="/seo" className="block px-6 py-3 sm:p-0 text-gray-700 dark:text-gray-200 hover:text-blue-600">SEO Analysis</a>
      </div>
    </nav>
  );
}
