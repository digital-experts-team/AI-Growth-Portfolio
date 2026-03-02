import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#000000]">
      
      {/* --- Noise Texture Overlay --- */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay z-10" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      {/* --- Smoke/Fog Layers (Gold/Bronze/Grey) --- */}
      <div className="absolute inset-0 z-0">
          {/* Deep Bronze Base */}
          <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-[#2a1b0a] rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-blob"></div>
          
          {/* Moving Gold Fog */}
          <div className="absolute top-[20%] right-[-20%] w-[70vw] h-[70vw] bg-[#451a03] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
          
          {/* Bottom Warm Haze */}
          <div className="absolute bottom-[-20%] left-[20%] w-[90vw] h-[60vw] bg-[#78350f] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* --- Refined Check Grid (Warm White/Gold) --- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(251, 191, 36, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(251, 191, 36, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
          }}
        />
        
        {/* Larger Structural Grid */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '200px 200px',
            maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 90%)'
          }}
        />
      </div>

      {/* --- Soft Glowing Embers (Gold/Amber) --- */}
      <div className="absolute inset-0 overflow-hidden z-0">
         <div className="absolute top-[30%] left-[25%] w-[100px] h-[100px] bg-amber-500/10 rounded-full blur-2xl animate-pulse"></div>
         <div className="absolute bottom-[40%] right-[20%] w-[150px] h-[150px] bg-yellow-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
         <div className="absolute top-[20%] right-[35%] w-[80px] h-[80px] bg-orange-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* --- Vignette --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80 z-10"></div>

      {/* --- Bottom Horizon Glow (Black/Gold) --- */}
      <div className="absolute bottom-0 left-0 right-0 h-[25vh] z-10 pointer-events-none">
          {/* Base Dark Gold */}
          <div className="absolute bottom-0 inset-x-0 h-full bg-gradient-to-t from-[#2a1805] via-[#451a03]/50 to-transparent blur-3xl"></div>
          {/* Bright Gold Line */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-amber-500/50 blur-[2px]"></div>
          {/* Horizon Light */}
          <div className="absolute bottom-[-50px] inset-x-0 h-[100px] bg-amber-400/20 blur-[50px]"></div>
      </div>
      
    </div>
  );
};