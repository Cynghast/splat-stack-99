import React, { useState } from 'react';
import DumpsterGame from './components/DumpsterGame';
import { TelemetryLog } from './types';
import { Skull } from 'lucide-react';

export default function App() {
  // Telemetry Log Store
  const [logs, setLogs] = useState<TelemetryLog[]>([
    {
      timestamp: new Date().toLocaleTimeString(),
      message: 'CRITICAL STARTUP: SPLAT STACK CLASS OF 99 ACTIVE PHYSICS CONTAINER BOOTED.',
      type: 'info'
    },
    {
      timestamp: new Date().toLocaleTimeString(),
      message: 'VISUAL COMPILER: Procedural raster hand-drawn assets activated. "AI SLOP" filters set to 100% BLOCKED.',
      type: 'info'
    },
    {
      timestamp: new Date().toLocaleTimeString(),
      message: 'RETENTION ENGINE: Continuous horizontal drop aiming slider armed with infinite prepare constraint.',
      type: 'info'
    },
    {
      timestamp: new Date().toLocaleTimeString(),
      message: 'POP COULOMB SCALAR: Chain merge pushes neighbors upward by 8.5 pixels force vector.',
      type: 'collision'
    }
  ]);

  const [stats, setStats] = useState({ score: 0, merges: 0, cascades: 0 });

  // Handle adding a log event to terminal console
  const handleAddLog = (log: TelemetryLog) => {
    setTimeout(() => {
      setLogs((prev) => {
        // Keep only most recent 40 logs to protect memory footprint
        const sliceAmt = prev.length > 40 ? 15 : 0;
        return [...prev.slice(sliceAmt), log];
      });
    }, 0);
  };

  // Dispatch a manual engineer simulation log injection
  const handleAddManualLog = (message: string, type: TelemetryLog['type']) => {
    handleAddLog({
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    });
  };

  const [scale, setScale] = useState(1);

  React.useEffect(() => {
    const resizeGame = () => {
      const baseW = 2560;
      const baseH = 1440;
      const currentScale = Math.min(
        window.innerWidth / baseW,
        window.innerHeight / baseH
      );
      setScale(currentScale);

      const wrapper = document.getElementById('game-viewport-wrapper');
      if (wrapper) {
        wrapper.style.transform = `scale(${currentScale})`;
      }
    };

    resizeGame();
    window.addEventListener('resize', resizeGame);
    return () => window.removeEventListener('resize', resizeGame);
  }, []);

  const handleStatsUpdate = (newStats: { score: number; merges: number; cascades: number }) => {
    setTimeout(() => {
      setStats(newStats);
    }, 0);
  };

  return (
    <div 
      id="game_app_root" 
      className="fixed inset-0 bg-neutral-950 overflow-hidden select-none flex items-center justify-center p-0 m-0"
      style={{
        backgroundColor: '#000000', // Solid matte black
      }}
    >
      {/* Background ink splatter ambient noise decoration */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Universal Viewport Scale Wrapper (Letterbox Engine) */}
      <div
        id="game-viewport-wrapper"
        className="relative bg-neutral-950 border-t-8 border-b-8 border-[#39ff14] flex flex-col items-center justify-between py-12 px-10 overflow-hidden shrink-0 shadow-2xl"
        style={{
          width: '2560px',
          height: '1440px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Secondary inner background ink splatter ambient noise */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Main Masthead Banner */}
        <header className="text-center w-full max-w-xl mx-auto select-none relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/90 border-2 border-black rotate-[-1.5deg] text-xs font-bold text-white uppercase tracking-wider shadow-[3px_3px_0px_#000] mb-3">
            <Skull className="w-3.5 h-3.5 text-white" />
            <span>Underground Counter-Culture Retro Clone</span>
          </div>

          {/* Huge hand-drawn stippled-like typography logo */}
          <h1 
            id="main_title" 
            className="text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-[#39ff14] to-yellow-300 uppercase select-none cursor-default drop-shadow-[5px_5px_0px_#000000] font-sans rotate-[-1deg]"
          >
            Splat Stack <span className="block text-3xl font-mono tracking-widest text-[#f97316] font-extrabold mt-1">Class of '99</span>
          </h1>
          
          {/* Irreverent grungy tagline */}
          <p className="mt-3 text-[#39ff14] font-mono text-xs max-w-md mx-auto tracking-normal uppercase bg-[#121312] py-2 px-4 rounded-md border-2 border-dashed border-zinc-800 shadow-[3px_3px_0px_#000]">
            ☣️ Snot / Slime / Brains / Mutant Eyeballs ☣️
            <span className="block text-[9.5px] text-zinc-500 font-mono mt-1">
              Inspired by Suika Game | Rendered in 100% Procedural Hand-Drawn Ink
            </span>
          </p>
        </header>

        {/* Widescreen Desktop Game Dashboard Frame */}
        <main className="w-full h-auto flex justify-center relative z-10 px-4">
          <DumpsterGame 
            onTelemetryUpdate={handleAddLog} 
            onStatsUpdate={handleStatsUpdate}
            logs={logs}
          />
        </main>

        {/* Footer copyright section */}
        <footer className="w-full text-center text-[10.5px] font-mono text-zinc-600 max-w-xl leading-normal select-none relative z-10 border-t border-zinc-900 pt-3">
          SPLAT STACK: CLASS OF '99 // POST-GRUNGE LOWBROW CARTOON REALISM STYLES & JETPACK COMPOSE PHYSICS LOOPS.
          <span className="block mt-1 text-zinc-700">
            STRICTLY HAND-INKED INK SHADE OVERLAY // NO AI PLASTIC SLOP // © 1999 C-CORP LABS CO.
          </span>
        </footer>
      </div>
    </div>
  );
}
