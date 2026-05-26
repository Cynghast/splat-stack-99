// Procedural Web Audio API sound synthesizer for the 1980s retro gross-out aesthetic.
// Generates dirty, wet, squishing, low-fi texturized sound effects directly in the browser!

class AudioEngine {
  private ctx: AudioContext | null = null;
  private overflowNodes: {
    oscillators: OscillatorNode[];
    gain: GainNode;
  } | null = null;

  // Rate Limiting state to prevent rapid machine-gun audial overlapping when physics piles or jitters
  private lastSnotLaunchTime = 0;
  private lastThudTime = 0;
  private lastPopTime = 0;
  private lastCrunchTime = 0;

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn("Web Audio API is not supported in this browser environment.", e);
    }
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch((e) => console.log('Audio resume failed:', e));
    }
  }

  // 1. THE DROP MECHANIC (Snot-Launch)
  // Sound Aesthetic: A wet, pressurized, rubbery suction release.
  // Audio Asset Simulated: sfx_snot_launch.wav
  playSnotLaunch() {
    this.resume();
    if (!this.ctx) return;

    const nowMs = Date.now();
    if (nowMs - this.lastSnotLaunchTime < 100) return;
    this.lastSnotLaunchTime = nowMs;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // A low-pass filtered sweep down with triangle wave representing thick heavy mucus suction
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(75, now + 0.17);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(780, now);
    filter.frequency.exponentialRampToValueAtTime(140, now + 0.17);
    filter.Q.value = 11; // high resonance for wet rubbery squelch

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.17);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.19);

    // Faint overlay of high-pass splatter noise to simulate the mucus release break
    const bufferSize = ctx.sampleRate * 0.09;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(450, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(90, now + 0.08);
    noiseFilter.Q.value = 4;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.15, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + 0.1);
  }

  // 2. THE BOUNCE MECHANIC (Flesh-Thud)
  // Sound Aesthetic: A heavy, squishy, wet leather thud with a slight echoing metallic resonance from the dumpster.
  // Audio Asset Simulated: sfx_dumpster_thud.wav
  playDumpsterThud(impactVelocity: number = 1.0) {
    this.resume();
    if (!this.ctx) return;

    // AUDIO CUTOFF MECHANIC: Avoid tiny annoying clicking/bumping drony noise on settled sliding/rattling contacts
    if (impactVelocity < 0.28) return;

    const nowMs = Date.now();
    // Prevents rapid machine-gun overlapping thuds from compounding when dense ball nests vibrate
    if (nowMs - this.lastThudTime < 240) return;
    this.lastThudTime = nowMs;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const volumeScale = Math.min(1.0, Math.max(0.1, impactVelocity));

    // A low sine wave pitch drop for deep, dead weight thud
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(140, now);
    bassOsc.frequency.exponentialRampToValueAtTime(30, now + 0.2);

    bassGain.gain.setValueAtTime(0.35 * volumeScale, now);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    bassOsc.connect(bassGain);
    bassGain.connect(ctx.destination);
    bassOsc.start(now);
    bassOsc.stop(now + 0.21);

    // Trash metal resonance: band-pass filtered sawtooth at ~220Hz representing structural dumpster plating sheet
    const metallicOsc = ctx.createOscillator();
    const metallicFilter = ctx.createBiquadFilter();
    const metallicGain = ctx.createGain();

    metallicOsc.type = 'sawtooth';
    metallicOsc.frequency.setValueAtTime(186, now);

    metallicFilter.type = 'bandpass';
    metallicFilter.frequency.value = 224;
    metallicFilter.Q.value = 16; // high ringing decay factor

    metallicGain.gain.setValueAtTime(0.09 * volumeScale, now);
    metallicGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32); // rings slightly longer

    metallicOsc.connect(metallicFilter);
    metallicFilter.connect(metallicGain);
    metallicGain.connect(ctx.destination);

    metallicOsc.start(now);
    metallicOsc.stop(now + 0.33);

    // Squishy wet skin flap layer (High lowpassed noise)
    const bufSize = ctx.sampleRate * 0.07;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buf;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(260, now);
    noiseFilter.Q.value = 2.5;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.22 * volumeScale, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + 0.08);
  }

  // 3. THE STANDARD MERGE CASCADE (The Dopamine Squeeze)
  // Sound Aesthetic: An intensely satisfying, wet popping sound—like a giant bubble wrap blister bursting—followed by a quick, liquid "schloorp" sound as the new asset forms.
  // Audio Asset Simulated: sfx_pop_squish.wav
  playPopSquish() {
    this.resume();
    if (!this.ctx) return;

    const nowMs = Date.now();
    // Limit cascades pop sounds to 90ms gap to keep rapid cascades clean and clear
    if (nowMs - this.lastPopTime < 90) return;
    this.lastPopTime = nowMs;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Part A: Pop (High pitch snapping sine decay)
    const popOsc = ctx.createOscillator();
    const popGain = ctx.createGain();
    popOsc.type = 'triangle';
    popOsc.frequency.setValueAtTime(620, now);
    popOsc.frequency.exponentialRampToValueAtTime(120, now + 0.07);

    popGain.gain.setValueAtTime(0.35, now);
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    popOsc.connect(popGain);
    popGain.connect(ctx.destination);
    popOsc.start(now);
    popOsc.stop(now + 0.08);

    // Part B: The Liquid Schloorp sweep (rapid frequency envelope ramp upwards + high filter cutoff)
    const schloorpOsc = ctx.createOscillator();
    const schloorpFilter = ctx.createBiquadFilter();
    const schloorpGain = ctx.createGain();

    schloorpOsc.type = 'sine';
    schloorpOsc.frequency.setValueAtTime(110, now + 0.015);
    schloorpOsc.frequency.exponentialRampToValueAtTime(680, now + 0.16);

    schloorpFilter.type = 'bandpass';
    schloorpFilter.frequency.setValueAtTime(130, now + 0.015);
    schloorpFilter.frequency.exponentialRampToValueAtTime(850, now + 0.16);
    schloorpFilter.Q.value = 14; // heavy squishy character

    schloorpGain.gain.setValueAtTime(0.001, now);
    schloorpGain.gain.linearRampToValueAtTime(0.3, now + 0.04);
    schloorpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    schloorpOsc.connect(schloorpFilter);
    schloorpFilter.connect(schloorpGain);
    schloorpGain.connect(ctx.destination);

    schloorpOsc.start(now);
    schloorpOsc.stop(now + 0.21);
  }

  // 4. THE ELITE MERGE CASCADE (The Heavy Industrial Toxic Crunch)
  // Sound Aesthetic: A chaotic, bubbling radioactive fizz combined with a crunching, bone-snapping mechanical squish to signal massive score multipliers.
  // Audio Asset Simulated: sfx_toxic_crunch.wav
  playToxicCrunch() {
    this.resume();
    if (!this.ctx) return;

    const nowMs = Date.now();
    // Limit colossal crunch sounds to 180ms cutoff as they last ~380ms total
    if (nowMs - this.lastCrunchTime < 180) return;
    this.lastCrunchTime = nowMs;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // 1. Multiple staccato bone-snapping crunch clicks
    const numCrunches = 5;
    for (let i = 0; i < numCrunches; i++) {
      const clickTime = now + i * 0.022;
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      
      clickOsc.type = 'sawtooth';
      clickOsc.frequency.setValueAtTime(280 - i * 35, clickTime);
      clickOsc.frequency.exponentialRampToValueAtTime(45, clickTime + 0.018);

      clickGain.gain.setValueAtTime(0.24, clickTime);
      clickGain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.018);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(clickTime);
      clickOsc.stop(clickTime + 0.02);
    }

    // 2. Thick, sputtering, radioactive chemical fizz noise
    const bufSize = ctx.sampleRate * 0.38;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      // Create a heavily bubbling/choppy amplitude textured noise
      const sputter = Math.sin(i * 0.008) > 0.45 ? 1.0 : 0.03;
      data[i] = (Math.random() * 2 - 1) * sputter;
    }
    const fizzSource = ctx.createBufferSource();
    fizzSource.buffer = buf;

    const fizzFilter = ctx.createBiquadFilter();
    fizzFilter.type = 'bandpass';
    fizzFilter.frequency.setValueAtTime(1300, now);
    fizzFilter.frequency.exponentialRampToValueAtTime(500, now + 0.38);
    fizzFilter.Q.value = 4.5;

    const fizzGain = ctx.createGain();
    fizzGain.gain.setValueAtTime(0.28, now);
    fizzGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    fizzSource.connect(fizzFilter);
    fizzFilter.connect(fizzGain);
    fizzGain.connect(ctx.destination);

    fizzSource.start(now);
    fizzSource.stop(now + 0.39);

    // 3. Colossal sub-bass mutant gurgle impact
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(145, now);
    subOsc.frequency.linearRampToValueAtTime(20, now + 0.32);

    subGain.gain.setValueAtTime(0.55, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.33);
  }

  // 5. THE PANIC OVERFLOW LAYER (The Garbage Compactor Alert)
  // Sound Aesthetic: A low-pitched, industrial mechanical grinding hum that pulses in speed and volume as the timer approaches zero, layered with wet flies buzzing.
  // Audio Asset Simulated: sfx_dumpster_overflow_loop.wav
  startPanicOverflowLoop() {
    this.resume();
    if (!this.ctx || this.overflowNodes) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, now);
    // Smooth ramp up alarm volume
    gainNode.gain.linearRampToValueAtTime(0.35, now + 0.4);

    const oscillators: OscillatorNode[] = [];

    // Low-pitch grinding engine hum (55Hz G-note sawtooth)
    const humOsc = ctx.createOscillator();
    humOsc.type = 'sawtooth';
    humOsc.frequency.value = 55;

    const humFilter = ctx.createBiquadFilter();
    humFilter.type = 'lowpass';
    humFilter.frequency.value = 160;

    // LFO to pulse the grinding pitch representational of a malfunctioning heavy dumpster compactor
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 3.5; // pulses at 3.5Hz speed
    lfoGain.gain.value = 14;

    lfo.connect(lfoGain);
    lfoGain.connect(humOsc.frequency);

    humOsc.connect(humFilter);
    humFilter.connect(gainNode);

    lfo.start(now);
    humOsc.start(now);
    oscillators.push(lfo, humOsc);

    // Fly Swarm Layer: de-tuned close oscillators simulating filthy flies hovering over the heap
    const buzzFrequencies = [220, 224, 231, 280];
    buzzFrequencies.forEach((freq, idx) => {
      const flyOsc = ctx.createOscillator();
      flyOsc.type = 'triangle';
      flyOsc.frequency.value = freq;

      // Extremely rapid wing-flapping pitch wobble
      const flyLfo = ctx.createOscillator();
      const flyLfoGain = ctx.createGain();
      flyLfo.frequency.value = 15 + idx * 3.1;
      flyLfoGain.gain.value = 20;

      flyLfo.connect(flyLfoGain);
      flyLfoGain.connect(flyOsc.frequency);

      const flyFilter = ctx.createBiquadFilter();
      flyFilter.type = 'bandpass';
      flyFilter.frequency.value = freq;
      flyFilter.Q.value = 4.5;

      flyOsc.connect(flyFilter);
      flyFilter.connect(gainNode);

      flyLfo.start(now);
      flyOsc.start(now);
      oscillators.push(flyLfo, flyOsc);
    });

    gainNode.connect(ctx.destination);

    this.overflowNodes = {
      oscillators,
      gain: gainNode
    };
  }

  stopPanicOverflowLoop() {
    if (!this.ctx || !this.overflowNodes) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const nodes = this.overflowNodes;
    this.overflowNodes = null;

    nodes.gain.gain.setValueAtTime(nodes.gain.gain.value, now);
    nodes.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    setTimeout(() => {
      nodes.oscillators.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {}
      });
    }, 220);
  }
}

export const thematicAudio = new AudioEngine();
