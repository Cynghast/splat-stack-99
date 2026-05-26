import React, { useState, useEffect, useRef } from 'react';
import { TelemetryLog, EVOLUTIONARY_LADDER } from '../types';
import { Terminal, Database, LineChart, ShieldAlert, Award, Coffee, BookOpen } from 'lucide-react';

interface DevConsoleProps {
  logs: TelemetryLog[];
  onAddManualLog: (msg: string, type: TelemetryLog['type']) => void;
  gameStats: { score: number; merges: number; cascades: number };
}

export default function DevConsole({ logs, onAddManualLog, gameStats }: DevConsoleProps) {
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<'telemetry' | 'retention' | 'ladder'>('telemetry');

  // Auto-scroll the terminal logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Lead Engineer's witty retention-tuning pitch notes pool
  const retentionPitches = [
    "NOTE: Expanding explosion force from 6.0 to 8.5 to amplify domino merge runs. The slot-machine ripple effect makes users stay up until 2:00 AM.",
    "TACTILE ADDICTION CRITERIA: A user with infinite alignment time makes a deliberate drop choice. When it fails, they blame themselves, not the system. This triggers instant retry loops.",
    "PSYCHO-ACOUSTICS & CHAOS: The 11-tier progression must build anticipation. Merging Opti-Clot produces massive physical screen shook. It is deeply gratifying.",
    "THE 3-SECOND SAVING GRACE: Forcing immediate death on breach is frustrating. A visible 3s countdown sparks immediate panic and releases massive adrenaline rushes during high-stacked saves.",
    "GIGA-BURST CLIMAX TUNING: Giga-Gorge is intentionally massive and hard to merge. When duplicate merges occur, the instant table-clear acts as a structural relief mechanism that rewards pure spatial geometry layout."
  ];

  const handleTriggerPitchNote = () => {
    const randomPitch = retentionPitches[Math.floor(Math.random() * retentionPitches.length)];
    onAddManualLog(`🔧 LEAD ENGINEERS DESIGN INSIGHT: ${randomPitch}`, 'info');
  };

  return (
    <div id="dev_console_root" className="w-full lg:max-w-[460px] flex flex-col h-full bg-zinc-950 border-4 border-black text-white rounded-xl shadow-[6px_6px_0px_#000000] overflow-hidden select-none">
      
      {/* Dev Terminal Header */}
      <div className="bg-zinc-900 px-4 py-3 border-b-4 border-black flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#39ff14] animate-pulse" />
          <div>
            <h2 className="text-sm font-extrabold tracking-tight font-mono text-zinc-100 uppercase">LEAD_ENGINEER_CONSOLE v1.80</h2>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Dumpster Drop Physics & Retention Sandbox</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] bg-black/60 px-2 py-1 rounded border border-zinc-800 text-zinc-500">
          <Database className="w-3 h-3 text-cyan-400" />
          <span>SIM_LIVE</span>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="bg-zinc-900/60 border-b-2 border-black grid grid-cols-3 text-center text-xs font-mono">
        <button
          onClick={() => setActiveTab('telemetry')}
          className={`py-2 px-3 flex items-center justify-center gap-1.5 border-r border-black cursor-pointer transition ${
            activeTab === 'telemetry' 
              ? 'bg-[#121312] text-[#39ff14] font-bold border-b-4 border-b-[#39ff14]' 
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>TELEMETRY</span>
        </button>

        <button
          onClick={() => setActiveTab('retention')}
          className={`py-2 px-3 flex items-center justify-center gap-1.5 border-r border-black cursor-pointer transition ${
            activeTab === 'retention' 
              ? 'bg-[#121312] text-[#ff5e00] font-bold border-b-4 border-b-[#ff5e00]' 
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <LineChart className="w-3.5 h-3.5" />
          <span>RETENTION</span>
        </button>

        <button
          onClick={() => setActiveTab('ladder')}
          className={`py-2 px-3 flex items-center justify-center gap-1.5 cursor-pointer transition ${
            activeTab === 'ladder' 
              ? 'bg-[#121312] text-cyan-400 font-bold border-b-4 border-b-cyan-400' 
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>11-TIERS</span>
        </button>
      </div>

      {/* Live Tab View Content */}
      <div 
        className="flex-1 p-4 bg-[#121312] overflow-y-auto max-h-[480px] relative"
        style={{
          backgroundImage: 'url("/src/assets/images/fanzine_paper_1779614333759.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Semi-transparent dark overlay for high text contrast rendering */}
        <div className="absolute inset-0 bg-zinc-950/85 pointer-events-none z-0" />

        {activeTab === 'telemetry' && (
          <div className="space-y-4 flex flex-col h-full relative z-10">
            {/* Simulation Statistics Tracker HUD */}
            <div className="grid grid-cols-3 gap-2 bg-black border-2 border-black p-3 rounded-lg shadow-[2px_2px_0px_#000]">
              <div className="text-center">
                <span className="block text-[8px] font-mono text-zinc-500 uppercase">SCORE_MULT</span>
                <span className="font-mono text-sm font-bold text-yellow-400">{(gameStats.score).toLocaleString()}</span>
              </div>
              <div className="text-center border-x border-zinc-805">
                <span className="block text-[8px] font-mono text-zinc-500 uppercase">EVOLUTIONS</span>
                <span className="font-mono text-sm font-bold text-[#39ff14]">{gameStats.merges}</span>
              </div>
              <div className="text-center">
                <span className="block text-[8px] font-mono text-zinc-500 uppercase">CASCADES</span>
                <span className="font-mono text-sm font-bold text-[#ea00d9]">{gameStats.cascades}</span>
              </div>
            </div>

            {/* Scrolling CRT Telemetry Console Terminal */}
            <div className="relative flex-1 bg-black rounded-lg border-2 border-black p-3 font-mono text-[11px] leading-relaxed shadow-inner overflow-y-auto max-h-[300px]">
              {/* Scanline CRT overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent bg-[length:100%_4px]" />
              
              <div className="space-y-2.5">
                {logs.map((log, i) => {
                  let badgeColor = 'text-green-400';
                  let prefix = '>> [SYS]';
                  if (log.type === 'collision') {
                    badgeColor = 'text-zinc-400';
                    prefix = '>> [PHYSICS]';
                  } else if (log.type === 'merge') {
                    badgeColor = 'text-yellow-400';
                    prefix = '>> [MERGE]';
                  } else if (log.type === 'cascade') {
                    badgeColor = 'text-pink-400 animate-pulse';
                    prefix = '>> [CASCADE!]';
                  } else if (log.type === 'powerup') {
                    badgeColor = 'text-cyan-400';
                    prefix = '>> [ACTION]';
                  } else if (log.type === 'warning') {
                    badgeColor = 'text-red-500 font-extrabold';
                    prefix = '>> [WARNING!!]';
                  }

                  return (
                    <div key={i} className="border-b border-zinc-900 pb-1.5">
                      <span className="text-zinc-600 text-[10px] mr-1.5 font-bold">[{log.timestamp}]</span>
                      <span className={`${badgeColor} font-bold mr-1.5`}>{prefix}</span>
                      <span className="text-zinc-300 select-all">{log.message}</span>
                    </div>
                  );
                })}
                <div ref={terminalEndRef} />
              </div>
            </div>

            {/* Sandbox simulation events console */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => {
                  onAddManualLog(
                    `🧪 INJECTED COLLISION IMPACT FORCE: Multiplier bumped to 1.12x for next 30 frames. Shaking vectors.`,
                    'collision'
                  );
                }}
                className="py-1.5 px-3 bg-zinc-900 border border-black hover:bg-zinc-800 text-zinc-300 font-mono text-[10.5px] rounded cursor-pointer transition flex items-center justify-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                <span>INJECT COLLISION</span>
              </button>

              <button
                onClick={handleTriggerPitchNote}
                className="py-1.5 px-3 bg-zinc-900 border border-black hover:bg-zinc-800 text-zinc-300 font-mono text-[10.5px] rounded cursor-pointer transition flex items-center justify-center gap-1.5"
              >
                <Coffee className="w-3.5 h-3.5 text-amber-500" />
                <span>PITCH RETENTION</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'retention' && (
          <div className="space-y-4 text-xs leading-relaxed text-zinc-300 font-mono relative z-10">
            <div className="border-l-4 border-[#ff5e00] bg-black/40 p-3 rounded">
              <h3 className="text-sm font-bold text-[#ff5e00] flex items-center gap-1.5 mb-1.5">
                <Coffee className="w-4 h-4" />
                <span>1. TACTILE SELECTION FREEDOM</span>
              </h3>
              <p>
                In standard falling block titles, real-time downforce stresses drop timing. In "Dumpster Drop," players possess unlimited preparation constraints. Dragging across columns initiates strategic cognitive maps, rendering drops highly deliberate and extremely addictive.
              </p>
            </div>

            <div className="border-l-4 border-[#39ff14] bg-black/40 p-3 rounded">
              <h3 className="text-sm font-bold text-[#39ff14] flex items-center gap-1.5 mb-1.5">
                <Award className="w-4 h-4" />
                <span>2. THE pop IN OUTWARD PROPULSIONS</span>
              </h3>
              <p>
                Standard merging games lack vector impulse responses. When identical gross-out items collision-merge, Dumpster Drop applies outwards explosive pop rays throwing proximate items upwards. This triggers massive, unexpected chain cascades.
              </p>
            </div>

            <div className="border-l-4 border-[#ea00d9] bg-black/40 p-3 rounded">
              <h3 className="text-sm font-bold text-[#ea00d9] flex items-center gap-1.5 mb-1.5">
                <LineChart className="w-4 h-4" />
                <span>3. THE 3-SECOND COUNTDOWN CLUTCH</span>
              </h3>
              <p>
                Rather than punishing edge breaches immediately, our 3-second buffer rule maintains suspense. Players can stack balls vertically beyond boundaries, relying on rapid-merges or snot-bomb explosions to salvage stakes at near-zero marks.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'ladder' && (
          <div className="space-y-3 font-mono text-xs relative z-10">
            <h3 className="text-cyan-400 font-bold uppercase tracking-wider mb-2 text-center text-xs">
              THE 11-TIER EVOLUTIONARY LADDER Reference
            </h3>
            <div className="space-y-2 select-text">
              {Object.values(EVOLUTIONARY_LADDER).map((tier) => (
                <div 
                  key={tier.tier}
                  className="flex gap-2.5 p-2 bg-black border border-zinc-900 rounded-lg hover:border-zinc-700 transition"
                >
                  {/* Miniature color representation */}
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <span 
                      className="w-4.5 h-4.5 rounded-full border-2 border-black inline-block shadow-[1px_1px_0px_rgba(255,255,255,0.15)]"
                      style={{ backgroundColor: tier.color }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-zinc-100 text-[11.5px]">T{tier.tier}: {tier.name}</span>
                      <span className="text-[9px] text-zinc-500">Rad: {tier.radius}px</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 italic mt-0.5 leading-normal">
                      {tier.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dev Terminal Footer */}
      <div className="bg-zinc-900 px-4 py-2 text-center border-t-2 border-black font-mono text-[9px] text-zinc-500">
        1980S GROSS-OUT COUNTER-CULTURE IP // ALL METRICS STABILIZED
      </div>
    </div>
  );
}
