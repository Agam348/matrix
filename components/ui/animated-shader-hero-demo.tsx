"use client";

import React from "react";
import Hero from "./animated-shader-hero";

// Demo Component showing how to use the Hero
const HeroDemo: React.FC = () => {
  const handlePrimaryClick = () => {
    console.log("Get Started clicked!");
  };

  const handleSecondaryClick = () => {
    console.log("Explore Features clicked!");
  };

  return (
    <div className="w-full min-h-screen bg-black">
      {/* 
        This is a demo layout displaying standard prop configuration.
        We feed the background canvas shader component direct content
        to demonstrate its layout style.
      */}
      <Hero>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          
          {/* Trust Badge */}
          <div className="mb-8 animate-fade-in-down">
            <div className="flex items-center gap-2 px-6 py-3 bg-indigo-950/20 backdrop-blur-md border border-indigo-500/25 rounded-full text-sm uppercase font-space tracking-widest text-indigo-300">
              <span className="text-indigo-400">✨</span>
              <span className="text-indigo-100">Trusted by forward-thinking teams.</span>
            </div>
          </div>

          <div className="text-center space-y-6 max-w-5xl mx-auto px-4">
            {/* Main Heading with Animation */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-zinc-100 via-indigo-200 to-zinc-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
                Launch Your
              </h1>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-indigo-300 via-cyan-400 to-indigo-500 bg-clip-text text-transparent animate-fade-in-up animation-delay-400 font-orbitron">
                Workflow Into Orbit
              </h1>
            </div>
            
            {/* Subtitle with Animation */}
            <div className="max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
              <p className="text-lg md:text-xl lg:text-2xl text-indigo-100/90 font-light leading-relaxed font-sora">
                Supercharge productivity with AI-powered automation and integrations built for the next generation of teams — fast, seamless and limitless.
              </p>
            </div>
            
            {/* CTA Buttons with Animation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-in-up animation-delay-800 font-space">
              <button 
                onClick={handlePrimaryClick}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/25 cursor-pointer"
              >
                Get Started for Free
              </button>
              <button 
                onClick={handleSecondaryClick}
                className="px-8 py-4 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-300/30 hover:border-indigo-300/50 text-indigo-100 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm cursor-pointer"
              >
                Explore Features
              </button>
            </div>
          </div>
          
        </div>
      </Hero>
      
      {/* Additional documentation content below hero */}
      <div className="bg-zinc-950 p-8 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto font-sora">
          <h2 className="text-3xl font-bold text-white mb-4 font-orbitron">
            HOW TO USE THE HERO COMPONENT
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg shadow-sm">
            <pre className="text-sm text-zinc-400 overflow-x-auto font-mono">
{`<Hero>
  <div className="your-content-overlay-styles">
     <!-- Render whatever layout layers you desire over the shifting WebGL background -->
  </div>
</Hero>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDemo;
