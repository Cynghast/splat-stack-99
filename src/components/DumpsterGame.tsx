import React, { useRef, useEffect, useState } from 'react';
import { Ball, EVOLUTIONARY_LADDER, EvolutionaryTier, TelemetryLog } from '../types';
import { Power, Flame, RotateCcw, AlertTriangle, Play, HelpCircle } from 'lucide-react';
import { thematicAudio } from '../utils/audio';

const TIER_IMAGES: Record<number, string> = {
  1: '/src/assets/images/snot_shot_t1_1779611839534.png',
  2: '/src/assets/images/splatter_matter_t2_1779612095781.png',
  3: '/src/assets/images/brain_drain_t3_1779611854792.png',
  4: '/src/assets/images/slatter_fly_t4_1779612110370.png',
  5: '/src/assets/images/zit_zilla_t5_1779612127980.png',
  6: '/src/assets/images/toxic_toby_t6_1779612144790.png',
  7: '/src/assets/images/crud_muncher_t7_1779611871209.png',
  8: '/src/assets/images/maggot_mass_t8_1779612157311.png',
  9: '/src/assets/images/gummy_glop_t9_1779612173194.png',
  10: '/src/assets/images/opti_clot_t10_1779612192352.png',
  11: '/src/assets/images/giga_gorge_t11_1779611883336.png',
};

// GLOBAL HAND-INKED RETRO PROCEDURAL RENDER ENGINE
const drawClassmateProcedural = (
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  stats: EvolutionaryTier,
  angle: number,
  scale: number,
  squashX: number = 1.0,
  squashY: number = 1.0
) => {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.scale(scale * squashX, scale * squashY);

  const r = stats.radius;
  const color = stats.color;

  // Heavy outline stroke width mapping
  const outlineW = r > 50 ? 4.5 : 3;

  // 1. Draw Main vibrant color circular base representing molded-rubber tactility
  ctx.fillStyle = color;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = outlineW;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  // 1.1 Comic shading / stippling / hand-inked cross-hatching inside sphere boundaries
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();

  // Draw gritty dark cross-hatch shading on bottom-right curves
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.lineWidth = Math.max(1, r * 0.035);
  const spacing = Math.max(4, r * 0.12);
  
  // Diagonal passes inside the clipped boundaries of the classmate ball
  for (let i = -r * 1.4; i < r * 2.5; i += spacing) {
    if (i > -r * 0.3) {
      ctx.beginPath();
      ctx.moveTo(i, -r);
      ctx.lineTo(i - r * 1.5, r);
      ctx.stroke();
    }
    if (i > r * 0.2) {
      ctx.beginPath();
      ctx.moveTo(i, r);
      ctx.lineTo(i - r * 1.5, -r);
      ctx.stroke();
    }
  }
  ctx.restore();

  // 2. Draw procedural grotesque Madball details based on classmate Tier (1 to 11)
  ctx.save();
  if (stats.tier === 1) {
    // Snot-Shot: single colossal bloodshot eye, snot bubble & drips
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(0, -r * 0.15, r * 0.48, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Veins
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(-r * 0.35, -r * 0.15); ctx.lineTo(-r * 0.15, -r * 0.15);
    ctx.moveTo(r * 0.35, -r * 0.15);  ctx.lineTo(r * 0.15, -r * 0.15);
    ctx.stroke();

    // Iris (Green) & black Pupil
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(0, -r * 0.15, r * 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(0, -r * 0.15, r * 0.12, 0, Math.PI * 2);
    ctx.fill();

    // Gooey dripping snot bubble mouth
    ctx.fillStyle = '#84cc16';
    ctx.beginPath();
    ctx.ellipse(0, r * 0.38, r * 0.5, r * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // yellow snot bubble popping
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(r * 0.25, r * 0.3, r * 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

  } else if (stats.tier === 2) {
    // Splatter-Matter: wacky asymmetrical eyes, mouth sneering with pointy broken teeth
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.2;
    // Left eye (bulging)
    ctx.beginPath();
    ctx.arc(-r * 0.3, -r * 0.2, r * 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(-r * 0.3, -r * 0.2, r * 0.12, 0, Math.PI * 2);
    ctx.fill();

    // Right eye (tiny yellow frantic dot)
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(r * 0.35, -r * 0.22, r * 0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(r * 0.35, -r * 0.22, 4, 0, Math.PI * 2);
    ctx.fill();

    // Sneering mouth
    ctx.fillStyle = '#311042';
    ctx.beginPath();
    ctx.ellipse(0, r * 0.35, r * 0.6, r * 0.25, 0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Rotten broken yellow teeth geometry
    ctx.fillStyle = '#fef08a';
    // Top tooth block
    ctx.fillRect(-r * 0.2, r * 0.15, r * 0.14, r * 0.14);
    ctx.strokeRect(-r * 0.2, r * 0.15, r * 0.14, r * 0.14);
    // Bottom fang
    ctx.beginPath();
    ctx.moveTo(r * 0.15, r * 0.48);
    ctx.lineTo(r * 0.25, r * 0.24);
    ctx.lineTo(r * 0.35, r * 0.48);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

  } else if (stats.tier === 3) {
    // Brain-Drain: Brain wrinkles, electric blue veins, inward wacky eyes, orthodontic braces
    ctx.strokeStyle = '#9d174d';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(-r * 0.45, r * 0.25, r * 0.32, Math.PI, Math.PI * 1.8);
    ctx.arc(r * 0.45, r * 0.15, r * 0.28, 0.2, Math.PI * 0.9);
    ctx.stroke();

    // Blue veins
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.moveTo(-r * 0.65, -r * 0.35); ctx.lineTo(-r * 0.4, -r * 0.48); ctx.lineTo(-r * 0.45, -r * 0.65);
    ctx.moveTo(r * 0.55, -r * 0.25);  ctx.lineTo(r * 0.35, -r * 0.4);
    ctx.stroke();

    // Wacky bloodshot inward eyes (duo)
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.0;

    // Left eye
    ctx.beginPath(); ctx.arc(-r * 0.25, -r * 0.18, r * 0.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 0.65;
    ctx.beginPath(); ctx.moveTo(-r * 0.45, -r * 0.18); ctx.lineTo(-r * 0.32, -r * 0.18); ctx.stroke();
    ctx.fillStyle = '#0a0a0a'; ctx.beginPath(); ctx.arc(-r * 0.12, -r * 0.18, r * 0.11, 0, Math.PI * 2); ctx.fill();

    // Right eye
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.0;
    ctx.beginPath(); ctx.arc(r * 0.25, -r * 0.18, r * 0.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 0.65;
    ctx.beginPath(); ctx.moveTo(r * 0.45, -r * 0.18); ctx.lineTo(r * 0.32, -r * 0.18); ctx.stroke();
    ctx.fillStyle = '#0a0a0a'; ctx.beginPath(); ctx.arc(r * 0.12, -r * 0.18, r * 0.11, 0, Math.PI * 2); ctx.fill();

    // Grin with metal orthodontic braces
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(0, r * 0.38, r * 0.42, r * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // gray metal wiring
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.35;
    ctx.beginPath(); ctx.moveTo(-r * 0.32, r * 0.38); ctx.lineTo(r * 0.32, r * 0.38); ctx.stroke();
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(-r * 0.18, r * 0.32, 6, 6); ctx.strokeRect(-r * 0.18, r * 0.32, 6, 6);
    ctx.fillRect(r * 0.08, r * 0.32, 6, 6);  ctx.strokeRect(r * 0.08, r * 0.32, 6, 6);

  } else if (stats.tier === 4) {
    // Slatter-Fly: insect wings, giant red compound eyes, black snout dripping bio-sludge
    ctx.fillStyle = 'rgba(215, 235, 250, 0.45)';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.0;
    // Wings mapping on boundaries
    ctx.beginPath(); ctx.ellipse(-r * 0.72, -r * 0.32, r * 0.42, r * 0.22, -Math.PI / 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(r * 0.72, -r * 0.32, r * 0.42, r * 0.22, Math.PI / 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Compound stipple bug eyes
    ctx.fillStyle = '#b91c1c';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.arc(-r * 0.36, -r * 0.12, r * 0.35, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(r * 0.36, -r * 0.12, r * 0.35, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Black mesh lines to simulate 90s screen compound grid
    ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 0.95;
    ctx.beginPath();
    for (let dg = -r * 0.32; dg <= r * 0.32; dg += 4.5) {
      ctx.moveTo(-r * 0.36 + dg, -r * 0.12 - r * 0.3); ctx.lineTo(-r * 0.36 + dg, -r * 0.12 + r * 0.3);
      ctx.moveTo(-r * 0.36 - r * 0.3, -r * 0.12 + dg); ctx.lineTo(-r * 0.36 + r * 0.3, -r * 0.12 + dg);
      ctx.moveTo(r * 0.36 + dg, -r * 0.12 - r * 0.3);  ctx.lineTo(r * 0.36 + dg, -r * 0.12 + r * 0.3);
      ctx.moveTo(r * 0.36 - r * 0.3, -r * 0.12 + dg);  ctx.lineTo(r * 0.36 + r * 0.3, -r * 0.12 + dg);
    }
    ctx.stroke();

    // black proboscis vector
    ctx.fillStyle = '#1c1917';
    ctx.beginPath(); ctx.rect(-r * 0.12, 0, r * 0.24, r * 0.5); ctx.fill(); ctx.stroke();
    // green slime splat
    ctx.fillStyle = '#22c55e';
    ctx.beginPath(); ctx.ellipse(0, r * 0.48, r * 0.18, r * 0.12, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

  } else if (stats.tier === 5) {
    // Zit-Zilla: Inflamed bio-blush, glowing yellow eruption whitehead center-top, angry eyes, square teeth
    const blush = ctx.createRadialGradient(0, 0, r * 0.35, 0, 0, r);
    blush.addColorStop(0, 'rgba(255, 240, 31, 0.1)');
    blush.addColorStop(0.68, 'rgba(239, 68, 68, 0.35)');
    blush.addColorStop(1, 'rgba(185, 28, 28, 0.7)');
    ctx.fillStyle = blush;
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();

    // Pus whitehead crown
    ctx.fillStyle = '#dc2626';
    ctx.beginPath(); ctx.arc(0, -r * 0.18, r * 0.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fef08a';
    ctx.beginPath(); ctx.arc(0, -r * 0.18, r * 0.18, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Angry eyes
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#000000'; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.ellipse(-r * 0.36, -r * 0.32, r * 0.16, r * 0.08, -Math.PI / 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(-r * 0.35, -r * 0.3, 2.5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(r * 0.36, -r * 0.28, r * 0.11, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(r * 0.36, -r * 0.28, 3, 0, Math.PI * 2); ctx.fill();

    // Gap tooth grin
    ctx.fillStyle = '#020617';
    ctx.beginPath(); ctx.ellipse(0, r * 0.38, r * 0.5, r * 0.22, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-r * 0.22, r * 0.24, r * 0.09, r * 0.11); ctx.strokeRect(-r * 0.22, r * 0.24, r * 0.09, r * 0.11);
    ctx.fillRect(0, r * 0.24, r * 0.1, r * 0.11);         ctx.strokeRect(0, r * 0.24, r * 0.1, r * 0.11);
    ctx.fillRect(r * 0.18, r * 0.24, r * 0.09, r * 0.11);  ctx.strokeRect(r * 0.18, r * 0.24, r * 0.09, r * 0.11);

  } else if (stats.tier === 6) {
    // Toxic Toby: Nuclear cell barrel, neon green background glow, smiling yellow-stencil skull center piece
    const containerGlow = ctx.createRadialGradient(0, 0, 3, 0, 0, r * 0.85);
    containerGlow.addColorStop(0, '#bef264');
    containerGlow.addColorStop(0.6, '#3f6212');
    containerGlow.addColorStop(1, '#022c22');
    ctx.fillStyle = containerGlow;
    ctx.beginPath(); ctx.arc(0, 0, r * 0.84, 0, Math.PI * 2); ctx.fill();

    // black stencil skull casing
    ctx.fillStyle = '#090d16';
    ctx.beginPath(); ctx.arc(0, -r * 0.06, r * 0.34, 0, Math.PI * 2); ctx.fill();
    ctx.fillRect(-r * 0.18, r * 0.04, r * 0.36, r * 0.32);

    // Glowing yellow sockets & fangs
    ctx.fillStyle = '#fef08a'; ctx.strokeStyle = '#000000'; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(-r * 0.12, -r * 0.1, r * 0.08, 0, Math.PI * 2);
    ctx.arc(r * 0.13, -r * 0.1, r * 0.11, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#dc2626'; // crazy dots
    ctx.beginPath(); ctx.arc(-r * 0.12, -r * 0.1, 2.5, 0, Math.PI * 2); ctx.arc(r * 0.13, -r * 0.1, 3.5, 0, Math.PI * 2); ctx.fill();

    // skull nose
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.moveTo(0, -r * 0.01); ctx.lineTo(-r * 0.05, r * 0.07); ctx.lineTo(r * 0.05, r * 0.07); ctx.closePath(); ctx.fill();

    // teeth rows
    ctx.strokeStyle = '#fef08a'; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(-r * 0.15, r * 0.18); ctx.lineTo(r * 0.15, r * 0.18); ctx.stroke();
    ctx.lineWidth = 1;
    for (let s = -r * 0.12; s <= r * 0.12; s += r * 0.06) {
      ctx.beginPath(); ctx.moveTo(s, r * 0.13); ctx.lineTo(s, r * 0.23); ctx.stroke();
    }

  } else if (stats.tier === 7) {
    // Crud-Muncher: mud splatter dots, monster orange pupilled eye, massive jagged slit mouth with broken 3D fangs
    ctx.fillStyle = '#3f1a0a';
    ctx.beginPath();
    ctx.arc(-r * 0.45, -r * 0.35, r * 0.12, 0, Math.PI * 2);
    ctx.arc(r * 0.45, r * 0.4, r * 0.11, 0, Math.PI * 2);
    ctx.fill();

    // Orange monster eyeball (left) and white bloodshot (right)
    ctx.fillStyle = '#ea580c'; ctx.strokeStyle = '#000'; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.arc(-r * 0.28, -r * 0.18, r * 0.16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(-r * 0.28, -r * 0.18, r * 0.035, r * 0.12, 0, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(r * 0.22, -r * 0.18, r * 0.25, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(r * 0.38, -r * 0.18); ctx.lineTo(r * 0.25, -r * 0.18); ctx.stroke();
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(r * 0.2, -r * 0.18, r * 0.11, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(r * 0.2, -r * 0.18, r * 0.05, 0, Math.PI * 2); ctx.fill();

    // Cavernous gritted grin
    ctx.fillStyle = '#180a02';
    ctx.beginPath(); ctx.ellipse(0, r * 0.32, r * 0.7, r * 0.28, -0.01, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#fef08a'; ctx.strokeStyle = '#000'; ctx.lineWidth = 1;
    for (let ts = -r * 0.55; ts <= r * 0.55; ts += r * 0.18) {
      // Top fangs
      ctx.beginPath(); ctx.moveTo(ts - 3, r * 0.16); ctx.lineTo(ts, r * 0.32); ctx.lineTo(ts + 3, r * 0.16); ctx.closePath(); ctx.fill(); ctx.stroke();
      // Bottom fangs
      ctx.beginPath(); ctx.moveTo(ts - 3, r * 0.46); ctx.lineTo(ts - 1, r * 0.28); ctx.lineTo(ts + 2, r * 0.46); ctx.closePath(); ctx.fill(); ctx.stroke();
    }

  } else if (stats.tier === 8) {
    // Maggot-Mass: bunch of writhing segments, tiny eyeballs, slobber
    ctx.strokeStyle = '#000000'; ctx.lineWidth = 2.0;
    ctx.fillStyle = '#ece9cf';
    // Overlapping maggot layers
    ctx.beginPath(); ctx.arc(-r * 0.4, -r * 0.08, r * 0.28, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(r * 0.4, -r * 0.1, r * 0.28, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, -r * 0.42, r * 0.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, r * 0.24, r * 0.36, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Eyes
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(-r * 0.38, -r * 0.08, r * 0.11, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(-r * 0.38, -r * 0.08, 3, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(-r * 0.06, -r * 0.4, r * 0.13, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#15803d'; ctx.beginPath(); ctx.arc(-r * 0.06, -r * 0.4, r * 0.07, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(-r * 0.06, -r * 0.4, 2.5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(r * 0.36, -r * 0.13, r * 0.11, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(r * 0.36, -r * 0.13, 3, 0, Math.PI * 2); ctx.fill();

    // Cavernous mouth spilling purplish goo
    ctx.fillStyle = '#18181b';
    ctx.beginPath(); ctx.ellipse(0, r * 0.08, r * 0.35, r * 0.14, 0.06, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#86198f';
    ctx.beginPath(); ctx.ellipse(-r * 0.08, r * 0.14, r * 0.1, r * 0.22, -0.04, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

  } else if (stats.tier === 9) {
    // Gummy-Glop: Embedded cigarette filters, sticking pink gums, huge green bubbles
    ctx.fillStyle = 'rgba(70, 80, 90, 0.35)'; // gray smudge
    ctx.beginPath(); ctx.arc(-r * 0.22, -r * 0.4, r * 0.17, 0, Math.PI * 2); ctx.arc(r * 0.3, r * 0.3, r * 0.14, 0, Math.PI * 2); ctx.fill();

    // cigarette filter stuck
    ctx.save(); ctx.translate(r * 0.4, -r * 0.36); ctx.rotate(0.4);
    ctx.fillStyle = '#ea580c'; ctx.fillRect(-5, -10, 10, 8); ctx.strokeRect(-5, -10, 10, 8);
    ctx.fillStyle = '#f3f4f6'; ctx.fillRect(-5, -2, 10, 12); ctx.strokeRect(-5, -2, 10, 12);
    ctx.fillStyle = '#000'; ctx.fillRect(-5, 10, 10, 2);
    ctx.restore();

    // stretched strand
    ctx.strokeStyle = '#e879f9'; ctx.lineWidth = 2.6;
    ctx.beginPath(); ctx.moveTo(-r * 0.45, 0); ctx.quadraticCurveTo(0, r * 0.18, r * 0.45, 0); ctx.stroke();

    // green drool bio bubble
    const gumBubble = ctx.createRadialGradient(-r * 0.38, r * 0.32, 1, -r * 0.38, r * 0.32, r * 0.21);
    gumBubble.addColorStop(0, '#fef08a');
    gumBubble.addColorStop(0.7, 'rgba(34, 197, 94, 0.72)');
    gumBubble.addColorStop(1, '#166534');
    ctx.fillStyle = gumBubble;
    ctx.beginPath(); ctx.arc(-r * 0.38, r * 0.32, r * 0.21, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // oval-ish stretch eyes
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#000'; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.ellipse(-r * 0.26, -r * 0.12, r * 0.16, r * 0.23, -0.12, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#0891b2'; ctx.beginPath(); ctx.arc(-r * 0.26, -r * 0.08, r * 0.08, 0, Math.PI * 2); ctx.fill();

    // stem eye
    ctx.strokeStyle = '#000'; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.rect(r * 0.12, -r * 0.22, r * 0.1, r * 0.18); ctx.fillStyle = color; ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(r * 0.17, -r * 0.22, r * 0.12, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#000000'; ctx.beginPath(); ctx.arc(r * 0.17, -r * 0.22, 4, 0, Math.PI * 2); ctx.fill();

  } else if (stats.tier === 10) {
    // Opti-Clot: Conjoined multi-eyes!
    const drawClotEye = (ex: number, ey: number, erad: number, irisBg: string, lookX: number, lookY: number) => {
      ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#000000'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(ex, ey, erad, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

      ctx.strokeStyle = 'rgba(239, 68, 68, 0.65)'; ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(ex - erad * 0.7, ey - erad * 0.18); ctx.lineTo(ex - erad * 0.35, ey - erad * 0.15);
      ctx.moveTo(ex + erad * 0.15, ey - erad * 0.65); ctx.lineTo(ex + erad * 0.15, ey - erad * 0.25);
      ctx.moveTo(ex + erad * 0.65, ey + erad * 0.15); ctx.lineTo(ex + erad * 0.35, ey + erad * 0.08);
      ctx.stroke();

      ctx.fillStyle = irisBg; ctx.beginPath(); ctx.arc(ex + lookX * erad * 0.3, ey + lookY * erad * 0.3, erad * 0.35, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#0a0a0a'; ctx.beginPath(); ctx.arc(ex + lookX * erad * 0.3, ey + lookY * erad * 0.3, erad * 0.16, 0, Math.PI * 2); ctx.fill();
    };
    drawClotEye(-r * 0.35, -r * 0.35, r * 0.34, '#ca8a04', -0.5, -0.2);
    drawClotEye(r * 0.28, -r * 0.28, r * 0.42, '#1d4ed8', 0.2, -0.4);
    drawClotEye(0, r * 0.2, r * 0.48, '#15803d', -0.1, 0.3);
    drawClotEye(-r * 0.54, r * 0.04, r * 0.26, '#c2410c', -0.4, 0.1);
    drawClotEye(r * 0.56, r * 0.16, r * 0.26, '#4338ca', 0.4, 0.1);

  } else if (stats.tier === 11) {
    // Giga-Gorge: Demon maw visual absolute, multiple scattered eyes, razor teeth void
    // 3 eyeballs
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#000'; ctx.lineWidth = 2.6;
    ctx.beginPath(); ctx.arc(-r * 0.38, -r * 0.42, r * 0.17, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#c2410c'; ctx.beginPath(); ctx.arc(-r * 0.38, -r * 0.42, r * 0.07, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(-r * 0.38, -r * 0.42, 2.5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(0, -r * 0.48, r * 0.25, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#dc2626'; ctx.lineWidth = 0.9;
    ctx.beginPath(); ctx.moveTo(-r * 0.18, -r * 0.48); ctx.lineTo(-r * 0.1, -r * 0.48); ctx.stroke();
    ctx.fillStyle = '#b91c1c'; ctx.beginPath(); ctx.arc(0, -r * 0.48, r * 0.11, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(0, -r * 0.48, 4.5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#eab308';
    ctx.beginPath(); ctx.arc(r * 0.4, -r * 0.42, r * 0.12, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(r * 0.4, -r * 0.42, 3.5, 0, Math.PI * 2); ctx.fill();

    // Void maw
    ctx.fillStyle = '#070404'; ctx.strokeStyle = '#000000'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(0, r * 0.1, r * 0.78, r * 0.42, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#fef08a'; ctx.strokeStyle = '#000'; ctx.lineWidth = 1.2;
    for (let an = 0; an < Math.PI * 2; an += 0.3) {
      const co = Math.cos(an);
      const si = Math.sin(an);
      const bX = co * r * 0.74;
      const bY = r * 0.1 + si * r * 0.38;

      const dX = -co;
      const dY = -si;
      const tLen = r * 0.14;
      ctx.beginPath();
      const bX1 = bX - si * 8;
      const bY1 = bY + co * 4;
      const bX2 = bX + si * 8;
      const bY2 = bY - co * 4;
      const tipX = bX + dX * tLen;
      const tipY = bY + dY * tLen;

      ctx.moveTo(bX1, bY1); ctx.lineTo(tipX, tipY); ctx.lineTo(bX2, bY2); ctx.closePath(); ctx.fill(); ctx.stroke();
    }

    // heavy drips
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(-r * 0.28, r * 0.38, 9, 0, Math.PI*2);
    ctx.arc(r * 0.28, r * 0.4, 10, 0, Math.PI*2);
    ctx.arc(0, r * 0.48, 12, 0, Math.PI*2);
    ctx.fill(); ctx.stroke();
  }
  ctx.restore();

  // 3D glossy highlight and contour shadowing
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.clip();

  // soft shadow
  const shad = ctx.createRadialGradient(r * 0.15, r * 0.15, r * 0.35, r * 0.3, r * 0.3, r * 1.05);
  shad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  shad.addColorStop(0.65, 'rgba(0, 0, 0, 0.2)');
  shad.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
  ctx.fillStyle = shad;
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();

  // top-left light splash
  const high = ctx.createRadialGradient(-r * 0.35, -r * 0.35, 0, -r * 0.35, -r * 0.35, r * 0.65);
  high.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
  high.addColorStop(0.65, 'rgba(255, 255, 255, 0.08)');
  high.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = high;
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();

  // rim highlights arc
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = Math.max(1.8, r * 0.06);
  ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(-r * 0.25, -r * 0.25, r * 0.62, Math.PI * 1.08, Math.PI * 1.42); ctx.stroke();
  ctx.restore();

  // 3. Black heavy ink rim border
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = outlineW;
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();

  ctx.restore();
};

interface ClassmateVisualCanvasProps {
  tier: number;
  size: number;
}

function ClassmateVisualCanvas({ tier, size }: ClassmateVisualCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use high dpr (2) for beautiful crisp assets
    const dpr = 2;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, size, size);

    const stats = EVOLUTIONARY_LADDER[tier];
    if (stats) {
      // Draw centered inside size box
      const cx = size / 2;
      const cy = size / 2;
      // map radius exactly inside with a padding cushion
      const scale = (size * 0.45) / stats.radius;
      
      drawClassmateProcedural(ctx, cx, cy, stats, 0, scale);
    }
  }, [tier, size]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ width: size, height: size }} 
      className="block select-none pointer-events-none" 
    />
  );
}

interface DumpsterGameProps {
  onTelemetryUpdate: (log: TelemetryLog) => void;
  onStatsUpdate: (stats: { score: number; merges: number; cascades: number }) => void;
  logs?: TelemetryLog[];
}

export default function DumpsterGame({ onTelemetryUpdate, onStatsUpdate, logs = [] }: DumpsterGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generated themed image references for Stage backgrounds
  const imgBgStage1Ref = useRef<HTMLImageElement | null>(null);
  const imgBgStage2Ref = useRef<HTMLImageElement | null>(null);
  const imgBgStage3Ref = useRef<HTMLImageElement | null>(null);

  const imgT1Ref = useRef<HTMLImageElement | null>(null);
  const imgT2Ref = useRef<HTMLImageElement | null>(null);
  const imgT3Ref = useRef<HTMLImageElement | null>(null);
  const imgT4Ref = useRef<HTMLImageElement | null>(null);
  const imgT5Ref = useRef<HTMLImageElement | null>(null);
  const imgT6Ref = useRef<HTMLImageElement | null>(null);
  const imgT7Ref = useRef<HTMLImageElement | null>(null);
  const imgT8Ref = useRef<HTMLImageElement | null>(null);
  const imgT9Ref = useRef<HTMLImageElement | null>(null);
  const imgT10Ref = useRef<HTMLImageElement | null>(null);
  const imgT11Ref = useRef<HTMLImageElement | null>(null);

  // Layout Dimensions
  const WIDTH = 960;
  const HEIGHT = 540;
  const TOP_LIMIT = 100; // Warning line coordinate
  const SPAWN_Y = 50;  // Droplet guide height

  // Suika Sandbox high mass-differentiation physics
  const getMassForTier = (tier: number, radius: number): number => {
    if (tier === 1) return 1.5;
    if (tier === 2) return 3.25;
    if (tier === 3) return 7.5;
    // Higher Tiers scale non-linearly to simulate heavy boulders
    return Math.pow(radius, 2.65);
  };

  // State values for React UI integration
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('dumpster_high_score');
    if (saved) {
      const parsed = parseInt(saved, 10);
      return parsed;
    }
    return 1000;
  });

  // Local storage bones leaderboard
  const [leaderboard, setLeaderboard] = useState<{name: string, score: number, date: string}[]>(() => {
    const saved = localStorage.getItem('splat_stack_leaderboard');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      { name: 'SNOT', score: 1800, date: '1999-05-24' },
      { name: 'BARF', score: 1200, date: '1999-05-20' },
      { name: 'PUKE', score: 800, date: '1999-05-18' },
      { name: 'TOX', score: 400, date: '1999-05-15' },
      { name: 'GOOP', score: 200, date: '1999-05-12' },
    ];
  });

  const [playerTag, setPlayerTag] = useState('PUNK');
  const [onDeckTier, setOnDeckTier] = useState(1);
  const [nextDropTier, setNextDropTier] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [warningActive, setWarningActive] = useState(false);
  const [warningTime, setWarningTime] = useState(3.0); // 3-second rule countdown
  const [snotRagCharges, setSnotRagCharges] = useState(2);
  const [shakeCharges, setShakeCharges] = useState(3);
  const [powerupMode, setPowerupMode] = useState<'none' | 'snotRag'>('none');

  // Stats trackers
  const [mergesCount, setMergesCount] = useState(0);
  const [cascadesCount, setCascadesCount] = useState(0);
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  // Input state
  const [cursorX, setCursorX] = useState(WIDTH / 2);
  const [isDropping, setIsDropping] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const isPressingRef = useRef(false);

  // Refs for keeping state stable for high performance canvas rendering loop without tearing down
  const cursorXRef = useRef(cursorX);
  const onDeckTierRef = useRef(onDeckTier);
  const cooldownRef = useRef(cooldown);
  const warningActiveRef = useRef(warningActive);
  const warningTimeRef = useRef(warningTime);
  const powerupModeRef = useRef(powerupMode);
  const isGameOverRef = useRef(isGameOver);

  // Roguelike Contraband Draft system state
  const [isDrafting, setIsDrafting] = useState(false);
  const isDraftingRef = useRef(false);
  const [draftInputBlocked, setDraftInputBlocked] = useState(false);
  const [draftChoices, setDraftChoices] = useState<string[]>([]);
  const [passives, setPassives] = useState({
    leakySyringe: false,
    hallPassCharges: 0,
    bribedJanitor: false,
    spikedMilk: false,
  });
  const passivesRef = useRef(passives);

  useEffect(() => {
    if (isDrafting) {
      setDraftInputBlocked(true);
      const timer = setTimeout(() => {
        setDraftInputBlocked(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isDrafting]);

  const CHUTE_LEFT = passives.bribedJanitor ? 300 : 310;
  const CHUTE_RIGHT = passives.bribedJanitor ? 660 : 650;

  useEffect(() => { cursorXRef.current = cursorX; }, [cursorX]);
  useEffect(() => { onDeckTierRef.current = onDeckTier; }, [onDeckTier]);
  useEffect(() => { cooldownRef.current = cooldown; }, [cooldown]);
  useEffect(() => { warningActiveRef.current = warningActive; }, [warningActive]);
  useEffect(() => { warningTimeRef.current = warningTime; }, [warningTime]);
  useEffect(() => { powerupModeRef.current = powerupMode; }, [powerupMode]);
  useEffect(() => { isGameOverRef.current = isGameOver; }, [isGameOver]);
  useEffect(() => { isDraftingRef.current = isDrafting; }, [isDrafting]);
  useEffect(() => { passivesRef.current = passives; }, [passives]);

  const saveToLeaderboard = (tag: string, finalScore: number) => {
    const cleanTag = (tag || 'PUNK').toUpperCase().slice(0, 4);
    const newEntry = {
      name: cleanTag,
      score: finalScore,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setLeaderboard(updated);
    localStorage.setItem('splat_stack_leaderboard', JSON.stringify(updated));
  };

  // Shake effect state
  const [shakeOffset, setShakeOffset] = useState({ x: 0, y: 0 });
  const [isShaking, setIsShaking] = useState(false);

  // Physics simulation refs
  const ballsRef = useRef<Ball[]>([]);
  const dropYRef = useRef<number>(SPAWN_Y);
  const animationFrameId = useRef<number | null>(null);

  // Contraband Card Options Pool Database
  const CONTRABAND_CARD_DETAILS: Record<string, { title: string; description: string; color: string; icon: string }> = {
    leakySyringe: {
      title: "Leaky Syringe",
      description: "LEAKS GLOWING AMPOULE FLUIDS. MAKES BALL COLLISIONS CHAOTIC AND 15% MORE RESTITUTIVE (BOUNCIER).",
      color: "#c084fc", // purple
      icon: "💉",
    },
    hallPass: {
      title: "Hall-Pass Slit",
      description: "OFFICIAL EMERGENCY PASS. GRANTS ONE SIDEBAR BUTTON TO INSTANTLY LIQUIDATE THE LOWEST GRADE LOSER.",
      color: "#fbbf24", // yellow/gold
      icon: "🎟️",
    },
    bribedJanitor: {
      title: "Bribed Janitor",
      description: "BRIBED THE CLEANING STAFF. SHIFTS CHUTE WALLS WIDER BY 20PX TO OFFER EXPANDED BREATHING COMPASS.",
      color: "#4ade80", // green
      icon: "🧹",
    },
    spikedMilk: {
      title: "Spiked Lunch",
      description: "SPIKE CAFETERIA JUICE CARTON. PERMANENTLY EARN DOUBLE POINTS FOR ALL TIER 1 TO 3 COMBINATIONS.",
      color: "#60a5fa", // blue
      icon: "🥛",
    },
  };

  const applyDraftChoice = (choiceKey: string) => {
    if (draftInputBlocked) return;
    setPassives(prev => {
      const next = { ...prev };
      if (choiceKey === 'leakySyringe') {
        next.leakySyringe = true;
      } else if (choiceKey === 'hallPass') {
        next.hallPassCharges = next.hallPassCharges + 1;
      } else if (choiceKey === 'bribedJanitor') {
        next.bribedJanitor = true;
      } else if (choiceKey === 'spikedMilk') {
        next.spikedMilk = true;
      }
      return next;
    });

    onTelemetryUpdate({
      timestamp: new Date().toLocaleTimeString(),
      message: `🎟️ CONTRABAND INSTALLED: Elected ${CONTRABAND_CARD_DETAILS[choiceKey]?.title || choiceKey}! Applied physical/systemic adjustments.`,
      type: 'powerup'
    });

    setIsDrafting(false);
  };

  const useHallPass = () => {
    if (passives.hallPassCharges <= 0 || isGameOver) return;
    const balls = ballsRef.current;
    if (balls.length === 0) return;

    // Lowest tier ball currently in the dumpster
    let minTier = Infinity;
    balls.forEach(b => {
      if (b.tier < minTier) {
        minTier = b.tier;
      }
    });

    // Highest Y coordinate (closest to bottom) for tie breaking
    let targetBall: Ball | null = null;
    let maxY = -Infinity;
    balls.forEach(b => {
      if (b.tier === minTier && b.y > maxY) {
        maxY = b.y;
        targetBall = b;
      }
    });

    if (targetBall) {
      // Create some beautiful vapor splash particles
      for (let i = 0; i < 22; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.0 + Math.random() * 4.5;
        particlesRef.current.push({
          x: (targetBall as Ball).x,
          y: (targetBall as Ball).y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.0,
          radius: 3.0 + Math.random() * 4.0,
          color: '#d946ef', // Neon magenta splash
          life: 45 + Math.floor(Math.random() * 25),
          maxLife: 70,
          opacity: 1.0,
          type: 'droplet',
          angle: 0,
          vAngle: 0
        });
      }

      // Optimization: Cap active particles list to guarantee smooth performance
      if (particlesRef.current.length > 200) {
        particlesRef.current = particlesRef.current.slice(-200);
      }

      ballsRef.current = balls.filter(b => b.id !== (targetBall as Ball).id);

      onTelemetryUpdate({
        timestamp: new Date().toLocaleTimeString(),
        message: `🎟️ HALL PASS DEPLOYED: Evaporated Classmate ${EVOLUTIONARY_LADDER[minTier]?.name || `Tier ${minTier}`} sitting at the dumpster bottom!`,
        type: 'powerup'
      });

      // Simple shake impact feedback
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 200);

      // Decrement charges
      setPassives(prev => ({
        ...prev,
        hallPassCharges: Math.max(0, prev.hallPassCharges - 1)
      }));
    }
  };

  // Generate next tiers (only tiers 1-4 are drop candidates)
  const getRandomDropTier = () => {
    return Math.floor(Math.random() * 4) + 1;
  };

  // Setup game
  const resetGame = () => {
    ballsRef.current = [];
    setScore(0);
    setOnDeckTier(getRandomDropTier());
    setNextDropTier(getRandomDropTier());
    setIsGameOver(false);
    setWarningActive(false);
    setWarningTime(3.0);
    setSnotRagCharges(2);
    setShakeCharges(3);
    setPowerupMode('none');
    setMergesCount(0);
    setCascadesCount(0);
    setIsDropping(false);
    setCooldown(false);
    
    // Clear passive contraband items upon game restart
    setPassives({
      leakySyringe: false,
      hallPassCharges: 0,
      bribedJanitor: false,
      spikedMilk: false,
    });
    
    onTelemetryUpdate({
      timestamp: new Date().toLocaleTimeString(),
      message: 'CORE ENGINE INITIALIZED. READY FOR DROP.',
      type: 'info'
    });
  };

  useEffect(() => {
    resetGame();
    // Load fresh deck
    setOnDeckTier(getRandomDropTier());
    setNextDropTier(getRandomDropTier());
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const prevScoreRef = useRef(0);
  const lastDraftScoreRef = useRef(0);
  useEffect(() => {
    if (score > prevScoreRef.current) {
      scoreImpactScale.current = 1.30;
      scoreImpactTilt.current = (Math.random() - 0.5) * 12;
      scoreImpactFlash.current = true;
      scoreImpactTicks.current = 10; // ~150-160ms on 60fps

      const nextThreshold = Math.floor(score / 300) * 300;
      if (nextThreshold > 0 && nextThreshold > lastDraftScoreRef.current) {
        lastDraftScoreRef.current = nextThreshold;

        // Shuffle and select 3 out of 4 contraband candidates
        const allPool = ["leakySyringe", "hallPass", "bribedJanitor", "spikedMilk"];
        const shuffled = [...allPool].sort(() => Math.random() - 0.5);
        setDraftChoices(shuffled.slice(0, 3));

        setIsDrafting(true);

        onTelemetryUpdate({
          timestamp: new Date().toLocaleTimeString(),
          message: `🚨 DETENTION INTERMISSION: Score threshold of ${nextThreshold} reached. Draft CONTRABAND to resume!`,
          type: 'warning'
        });
      }
    }
    if (score === 0) {
      lastDraftScoreRef.current = 0;
    }
    prevScoreRef.current = score;
  }, [score, onTelemetryUpdate]);

  // Preloading generated Nanobanana themed images
  useEffect(() => {
    const bg1 = new Image();
    bg1.src = '/src/assets/images/local_alleyway_bg_1779613162659.png';
    bg1.onload = () => {
      imgBgStage1Ref.current = bg1;
    };

    const bg2 = new Image();
    bg2.src = '/src/assets/images/toxic_midnight_bg_1779613188808.png';
    bg2.onload = () => {
      imgBgStage2Ref.current = bg2;
    };

    const bg3 = new Image();
    bg3.src = '/src/assets/images/landfill_singularity_bg_1779613209038.png';
    bg3.onload = () => {
      imgBgStage3Ref.current = bg3;
    };

    const t1 = new Image();
    t1.src = '/src/assets/images/snot_shot_t1_1779611839534.png';
    t1.onload = () => {
      imgT1Ref.current = t1;
    };

    const t2 = new Image();
    t2.src = '/src/assets/images/splatter_matter_t2_1779612095781.png';
    t2.onload = () => {
      imgT2Ref.current = t2;
    };

    const t3 = new Image();
    t3.src = '/src/assets/images/brain_drain_t3_1779611854792.png';
    t3.onload = () => {
      imgT3Ref.current = t3;
    };

    const t4 = new Image();
    t4.src = '/src/assets/images/slatter_fly_t4_1779612110370.png';
    t4.onload = () => {
      imgT4Ref.current = t4;
    };

    const t5 = new Image();
    t5.src = '/src/assets/images/zit_zilla_t5_1779612127980.png';
    t5.onload = () => {
      imgT5Ref.current = t5;
    };

    const t6 = new Image();
    t6.src = '/src/assets/images/toxic_toby_t6_1779612144790.png';
    t6.onload = () => {
      imgT6Ref.current = t6;
    };

    const t7 = new Image();
    t7.src = '/src/assets/images/crud_muncher_t7_1779611871209.png';
    t7.onload = () => {
      imgT7Ref.current = t7;
    };

    const t8 = new Image();
    t8.src = '/src/assets/images/maggot_mass_t8_1779612157311.png';
    t8.onload = () => {
      imgT8Ref.current = t8;
    };

    const t9 = new Image();
    t9.src = '/src/assets/images/gummy_glop_t9_1779612173194.png';
    t9.onload = () => {
      imgT9Ref.current = t9;
    };

    const t10 = new Image();
    t10.src = '/src/assets/images/opti_clot_t10_1779612192352.png';
    t10.onload = () => {
      imgT10Ref.current = t10;
    };

    const t11 = new Image();
    t11.src = '/src/assets/images/giga_gorge_t11_1779611883336.png';
    t11.onload = () => {
      imgT11Ref.current = t11;
    };
  }, []);

  // Update High Score local storage
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('dumpster_high_score', score.toString());
      onTelemetryUpdate({
        timestamp: new Date().toLocaleTimeString(),
        message: `🔥 NEW HIGH SCORE REGISTERED: ${score} POINTS!`,
        type: 'merge'
      });
    }
  }, [score, highScore]);

  // Dispatch live stats updates
  useEffect(() => {
    onStatsUpdate({ score, merges: mergesCount, cascades: cascadesCount });
  }, [score, mergesCount, cascadesCount]);

  // Handle start/stop of continuous panic zone alarm loop
  useEffect(() => {
    if (warningActive && !isGameOver) {
      thematicAudio.startPanicOverflowLoop();
      onTelemetryUpdate({
        timestamp: new Date().toLocaleTimeString(),
        message: '🚨 PANIC ZONE BREACHED (TOP 20% INVASION)! [sfx_dumpster_overflow_loop.wav] continuous grity-flies & compactor grinding alarm active.',
        type: 'warning'
      });
    } else {
      thematicAudio.stopPanicOverflowLoop();
    }
    return () => {
      thematicAudio.stopPanicOverflowLoop();
    };
  }, [warningActive, isGameOver]);

  // Handle Game Over Check & 3-Second Counter
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (warningActive && !isGameOver) {
      interval = setInterval(() => {
        setWarningTime((prev) => {
          if (prev <= 0.1) {
            clearInterval(interval);
            setIsGameOver(true);
            onTelemetryUpdate({
              timestamp: new Date().toLocaleTimeString(),
              message: '☣️ OVERFLOW DETECTED: THREE CONTINUOUS SECONDS BROKEN. DUMPSTER OVERFLOWS! GAME OVER. [Audio Loop Stopped: sfx_dumpster_overflow_loop.wav]',
              type: 'warning'
            });
            return 0;
          }
          return Number((prev - 0.1).toFixed(1));
        });
      }, 100);
    } else {
      setWarningTime(3.0);
    }
    return () => clearInterval(interval);
  }, [warningActive, isGameOver]);

  // Power Up Action: Snot-Rag Bomb Explosion
  const handleSnotRagExplode = (clickX: number, clickY: number) => {
    if (snotRagCharges <= 0) return;
    setSnotRagCharges(prev => prev - 1);
    setPowerupMode('none');

    const radiusExplosion = 140;
    const initialCount = ballsRef.current.length;
    
    // Filter balls: remove T1, T2, T3 in radius
    const clearedBalls = ballsRef.current.filter(ball => {
      if (ball.tier <= 3) {
        const dx = ball.x - clickX;
        const dy = ball.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist <= radiusExplosion;
      }
      return false;
    });

    ballsRef.current = ballsRef.current.filter(ball => !clearedBalls.includes(ball));

    // Blow back remaining balls
    ballsRef.current.forEach(ball => {
      const dx = ball.x - clickX;
      const dy = ball.y - clickY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radiusExplosion && dist > 5) {
        const force = 12 * (1 - dist / radiusExplosion);
        ball.vx += (dx / dist) * force;
        ball.vy += (dy / dist) * force - 6; // Push upwards and outwards
        ball.isSleeping = false; // Wake up elements pushed
      }
    });

    const clearedCount = clearedBalls.length;
    let pointsEarned = 0;
    clearedBalls.forEach(ball => {
      pointsEarned += ball.tier; // Adds proportional balanced points
    });
    setScore(prev => prev + pointsEarned);

    // Trigger visual feedback explosion splash on canvas (drawn temporarily in loop)
    canvasSplashes.current.push({
      x: clickX,
      y: clickY,
      maxRadius: radiusExplosion,
      currentRadius: 10,
      color: '#39ff14', // neon green mucus splash
      opacity: 1
    });

    onTelemetryUpdate({
      timestamp: new Date().toLocaleTimeString(),
      message: `💥 SNOT-RAG BOMB DETONATED at [x: ${Math.round(clickX)}, y: ${Math.round(clickY)}]. Vaporized ${clearedCount} low-tier assets inside container. Freeing space!`,
      type: 'powerup'
    });
  };

  // Power Up Action: Shake Dumpster
  const triggerShakeDumpster = () => {
    if (shakeCharges <= 0 || isGameOver) return;
    setShakeCharges(prev => prev - 1);
    setIsShaking(true);

    // Physical Impulses on All Balls
    ballsRef.current.forEach(ball => {
      ball.vx += (Math.random() - 0.5) * 16;
      ball.vy -= (Math.random() * 12 + 6); // Boost upwards!
      ball.vAngle += (Math.random() - 0.5) * 0.4;
      ball.isSleeping = false; // Wake up all!
    });

    let frameCount = 0;
    const shakeInterval = setInterval(() => {
      const offsetAmt = 15 * Math.sin(frameCount * 0.6);
      setShakeOffset({
        x: (Math.random() - 0.5) * offsetAmt,
        y: (Math.random() - 0.5) * offsetAmt
      });
      frameCount++;
      if (frameCount > 20) {
        clearInterval(shakeInterval);
        setShakeOffset({ x: 0, y: 0 });
        setIsShaking(false);
      }
    }, 30);

    onTelemetryUpdate({
      timestamp: new Date().toLocaleTimeString(),
      message: '🔔 SHAKING DUMPSTER CONTAINER! Instigating micro-vibrations and cascading structural collapses.',
      type: 'powerup'
    });
  };

  // Helper to trigger dropping from cursor position (unified drop mechanism)
  const triggerDropAtCursor = () => {
    if (isGameOver) return;
    if (cooldown || cooldownRef.current) return;

    // Use power-up instead of dropping
    if (powerupMode === 'snotRag') {
      handleSnotRagExplode(cursorX, SPAWN_Y);
      return;
    }

    // Reset combo chain on manual player drop
    currentComboRef.current = 0;

    // Trigger Drop
    const tierToDrop = onDeckTier;
    const stats = EVOLUTIONARY_LADDER[tierToDrop];
    const newBall: Ball = {
      id: Math.random().toString(),
      tier: tierToDrop,
      x: cursorX + (Math.random() - 0.5), // Inject microscopic random offset (+/- 0.5 pixels) to prevent perfect stacking stacks
      y: SPAWN_Y + 10,
      vx: 0,
      vy: 1.5,
      radius: stats.radius,
      mass: getMassForTier(tierToDrop, stats.radius),
      angle: Math.random() * Math.PI * 2,
      vAngle: 0,
      popScale: 0.1,
      isMerging: false,
      isSleeping: false
    };

    // Synchronously update refs to eliminate any 1-2 frame layout/rendering lag
    cooldownRef.current = true;
    onDeckTierRef.current = nextDropTier;

    ballsRef.current.push(newBall);
    setCooldown(true);
    setIsDropping(true);

    // Play wet pressurized suction launch sound effect
    thematicAudio.playSnotLaunch();

    // Print faint *THWIP-FLIP!* comic phrase at release zone
    onomatopoeiasRef.current.push({
      x: cursorX,
      y: SPAWN_Y + 15,
      text: 'THWIP-FLIP!',
      color: '#39ff14', // neon snot-green
      scale: 0.8,
      angle: (Math.random() - 0.5) * 0.25,
      life: 18,
      maxLife: 18
    });

    // Roll upcoming deck
    setOnDeckTier(nextDropTier);
    setNextDropTier(getRandomDropTier());

    onTelemetryUpdate({
      timestamp: new Date().toLocaleTimeString(),
      message: `📥 DEPLOYED tier T${stats.tier} [${stats.name}] into column ${Math.ceil(cursorX / 42)}. Free-fall physics engaged.`,
      type: 'info'
    });

    setTimeout(() => {
      cooldownRef.current = false;
      setCooldown(false);
      setIsDropping(false);
    }, 600); // 600ms aiming drop delay
  };

  // Track cursor position matching pointer and touch drags
  const updateCursorFromClientX = (clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width / WIDTH;
    const mouseX = (clientX - rect.left) / (scaleX || 1);
    
    // Dynamic boundary clamping based on current on-deck droplet radius inside the central Chute
    const stats = EVOLUTIONARY_LADDER[onDeckTier];
    const r = stats ? stats.radius : 25;
    setCursorX(Math.max(CHUTE_LEFT + r + 5, Math.min(CHUTE_RIGHT - r - 5, mouseX)));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isGameOver || isDrafting) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width / WIDTH;
    const scaleY = rect.height / HEIGHT;
    const clickX = (e.clientX - rect.left) / (scaleX || 1);
    const clickY = (e.clientY - rect.top) / (scaleY || 1);

    // Use snot rag power-up detonation instantly on pointer click/touch locations
    if (powerupMode === 'snotRag') {
      handleSnotRagExplode(clickX, clickY);
      return;
    }

    isPressingRef.current = true;
    setIsPressing(true);
    updateCursorFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isGameOver || isDrafting) return;
    // Follow the cursor smoothly even without press, like the cloud in the original Suika Game
    updateCursorFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isGameOver || isDrafting) return;
    if (isPressingRef.current) {
      isPressingRef.current = false;
      setIsPressing(false);
      updateCursorFromClientX(e.clientX);
      triggerDropAtCursor();
    }
  };

  // Keyboard Shortcuts Drop Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver || isDraftingRef.current) return;
      const stats = EVOLUTIONARY_LADDER[onDeckTier];
      const r = stats ? stats.radius : 25;
      if (e.key === 'ArrowLeft') {
        setCursorX(prev => Math.max(CHUTE_LEFT + r + 5, prev - 25));
      } else if (e.key === 'ArrowRight') {
        setCursorX(prev => Math.min(CHUTE_RIGHT - r - 5, prev + 25));
      } else if (e.key === ' ' || e.key === 'Enter') {
        // Space to drop
        if (!cooldown && powerupMode === 'none') {
          triggerDropAtCursor();
        }
      } else if (e.key === 's' || e.key === 'S') {
        triggerShakeDumpster();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cursorX, cooldown, onDeckTier, nextDropTier, isGameOver, powerupMode, isDrafting, CHUTE_LEFT, CHUTE_RIGHT]);

  // Track Canvas Splashes & Explosion Particle Effects
  const canvasSplashes = useRef<{ x: number; y: number; maxRadius: number; currentRadius: number; color: string; opacity: number }[]>([]);
  const mergeAnimations = useRef<{ x: number; y: number; scale: number; maxScale: number; color: string; decay: number }[]>([]);

  // Debris particles
  const particlesRef = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    opacity: number;
    life: number;
    maxLife: number;
    type: 'speck' | 'droplet' | 'butt' | 'scrap' | 'inkSplat';
    angle: number;
    vAngle: number;
    seed?: number;
  }[]>([]);

  // Combo systems
  const currentComboRef = useRef<number>(0);
  const combosRef = useRef<{
    x: number;
    y: number;
    text: string;
    comboCount: number;
    vibrateSeed: number;
    opacity: number;
    life: number;
  }[]>([]);

  // Score impact animation tracking
  const scoreSpanRef = useRef<HTMLSpanElement | null>(null);
  const scoreImpactScale = useRef<number>(1.0);
  const scoreImpactTilt = useRef<number>(0);
  const scoreImpactFlash = useRef<boolean>(false);
  const scoreImpactTicks = useRef<number>(0);

  // Juice substitutes (Onomatopoeias & Screenshake offsets)
  const onomatopoeiasRef = useRef<{
    x: number;
    y: number;
    text: string;
    color: string;
    scale: number;
    angle: number;
    life: number;
    maxLife: number;
    isScore?: boolean;
    shake?: boolean;
    vy?: number;
  }[]>([]);

  // MAIN GAME RENDERING AND PHYSICS TICK LOOP
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localFrame = 0;

    const gameLoop = () => {
      localFrame++;
      
      // Update Score impact animation lerp in physical ticks
      if (scoreImpactTicks.current > 0) {
        scoreImpactTicks.current--;
        scoreImpactScale.current = scoreImpactScale.current + (1.0 - scoreImpactScale.current) * 0.22;
        scoreImpactTilt.current = scoreImpactTilt.current * 0.78;
        if (scoreImpactTicks.current === 0) {
          scoreImpactFlash.current = false;
        }
      } else {
        scoreImpactScale.current = 1.0;
        scoreImpactTilt.current = 0;
        scoreImpactFlash.current = false;
      }

      if (scoreSpanRef.current) {
        scoreSpanRef.current.style.transform = `scale(${scoreImpactScale.current}) rotate(${scoreImpactTilt.current}deg)`;
        
        // Stark massive neon-vibrant hazard yellow base, flashes bright white/yellow
        const defaultColor = '#ffff00'; 
        const flashColor = '#ffffff'; 
        scoreSpanRef.current.style.color = scoreImpactFlash.current ? flashColor : defaultColor;
        
        // Massive solid black retro text shadow with backlighting glows
        const outlineShadow = '3px 3px 0px #000000, -3px -3px 0px #000000, 3px -3px 0px #000000, -3px 3px 0px #000000, 4px 4px 0px #000000';
        const neonGlow = scoreImpactFlash.current
          ? '0 0 15px #ffffff, 0 0 25px #ffff00'
          : '0 0 8px rgba(255, 234, 0, 0.45)';
        scoreSpanRef.current.style.textShadow = `${outlineShadow}, ${neonGlow}`;
      }

      // PHYSICS UPDATE STEPS
      if (!isDraftingRef.current) {
        let balls = ballsRef.current;

      // Check if all balls are at rest to clear active combos
      let isPileAtRest = true;
      if (balls.length > 0) {
        for (let i = 0; i < balls.length; i++) {
          const speedSq = balls[i].vx * balls[i].vx + balls[i].vy * balls[i].vy;
          if (speedSq > 0.08) {
            isPileAtRest = false;
            break;
          }
        }
      } else {
        isPileAtRest = true;
      }

      if (isPileAtRest) {
        combosRef.current = [];
        currentComboRef.current = 0;
      }

      const gravity = 0.40;
      const bounceRestoration = 0.20 * (passivesRef.current.leakySyringe ? 1.15 : 1.0); // Cushions spheres to settle cleanly
      const friction = 0.985;        // Horizontal sliding friction

      // Update basic kinematical properties
      balls.forEach(ball => {
        // Apply Gravity
        ball.vy += gravity;

        // Apply velocities
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Roll and rotate based on actual rotational velocity (inertia)
        ball.angle += ball.vAngle;

        // Heavy rolling friction decay to prevent constant spinning
        ball.vAngle *= 0.82;

        // Limit maximum rotational velocity to prevent continuous excessive high-velocity spinning
        const maxRotV = 0.05;
        if (ball.vAngle > maxRotV) ball.vAngle = maxRotV;
        if (ball.vAngle < -maxRotV) ball.vAngle = -maxRotV;

        // Handle scaling-pop visual entry animations (expand smoothly)
        if (ball.popScale < 1.0) {
          ball.popScale += 0.15;
          if (ball.popScale > 1.0) ball.popScale = 1.0;
        }

        // Apply visual air resistance / sliding friction decays
        ball.vx *= 0.990;
        ball.vy *= 0.992;
      });

      // Rigid Circle-to-Circle Collision Resolution
      // Increased to 8 iterations to completely avoid overlaps, clipping or sinking
      const PHYS_ITERATIONS = 8;
      let newMergesThisTick: { x: number; y: number; nextTier: number }[] = [];

      for (let iter = 0; iter < PHYS_ITERATIONS; iter++) {
        // 1. First, resolve boundary wall/floor constraints for pristine clamping
        balls.forEach(ball => {
          const actualRad = ball.radius * ball.popScale;
          const floorY = HEIGHT - 10;
          let hitBoundary = false;
          let impactVel = 0;

          // Left wall clamp
          if (ball.x - actualRad < CHUTE_LEFT) {
            ball.x = CHUTE_LEFT + actualRad;
            impactVel = Math.abs(ball.vx);
            ball.vx = Math.abs(ball.vx) * bounceRestoration * 1.5;
            
            // Wall-friction rolling interaction based on vertical sliding speed
            const targetRotV = ball.vy / ball.radius;
            ball.vAngle += (targetRotV - ball.vAngle) * 0.25;

            hitBoundary = true;
            if (impactVel > 1.2) {
              ball.jiggleTimer = 9;
              ball.jiggleAmp = Math.min(0.35, impactVel * 0.12);
              ball.jiggleType = 'horizontal';
            }
          }
          // Right wall clamp
          if (ball.x + actualRad > CHUTE_RIGHT) {
            ball.x = CHUTE_RIGHT - actualRad;
            impactVel = Math.abs(ball.vx);
            ball.vx = -Math.abs(ball.vx) * bounceRestoration * 1.5;
            
            // Wall-friction rolling interaction (opposite side)
            const targetRotV = -ball.vy / ball.radius;
            ball.vAngle += (targetRotV - ball.vAngle) * 0.25;

            hitBoundary = true;
            if (impactVel > 1.2) {
              ball.jiggleTimer = 9;
              ball.jiggleAmp = Math.min(0.35, impactVel * 0.12);
              ball.jiggleType = 'horizontal';
            }
          }
          // Bottom floor clamp
          if (ball.y + actualRad > floorY) {
            ball.y = floorY - actualRad;
            impactVel = Math.abs(ball.vy);
            ball.vy = -Math.abs(ball.vy) * bounceRestoration;
            ball.vx *= friction;
            
            // Floor rolling action matches horizontal velocity
            const targetRotV = ball.vx / ball.radius;
            ball.vAngle += (targetRotV - ball.vAngle) * 0.30;

            hitBoundary = true;
            if (impactVel > 1.2) {
              ball.jiggleTimer = 9;
              ball.jiggleAmp = Math.min(0.35, impactVel * 0.12);
              ball.jiggleType = 'vertical';
            }
          }

          // Sound trigger for boundary impact
          if (hitBoundary && impactVel > 1.2 && iter === 0) {
            thematicAudio.playDumpsterThud(impactVel * 0.25);
            
            if (Math.random() < 0.20) {
              const bWords = ["SPLAT!", "THUD!", "WHACK!", "PLOP!", "BUMP!"];
              const pickedBWord = bWords[Math.floor(Math.random() * bWords.length)];
              onomatopoeiasRef.current.push({
                x: ball.x,
                y: Math.min(HEIGHT - 40, ball.y),
                text: pickedBWord,
                color: "#71717a",
                scale: 0.75,
                angle: (Math.random() - 0.5) * 0.2,
                life: 14,
                maxLife: 14
              });
            }
          }
        });

        // 2. Resolve pairwise ball-to-ball overlaps and impulse responses
        for (let i = 0; i < balls.length; i++) {
          const b1 = balls[i];
          if (b1.isMerging) continue;

          for (let j = i + 1; j < balls.length; j++) {
            const b2 = balls[j];
            if (b2.isMerging) continue;

            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const distSq = dx * dx + dy * dy;
            const minDist = b1.radius * b1.popScale + b2.radius * b2.popScale;

            if (distSq < minDist * minDist) {
              const dist = Math.sqrt(distSq) || 0.001;
              const overlap = minDist - dist;

              const nx = dx / dist;
              const ny = dy / dist;

              // Check for merge sequence
              if (b1.tier === b2.tier) {
                b1.isMerging = true;
                b2.isMerging = true;

                const mx = (b1.x + b2.x) / 2;
                const my = (b1.y + b2.y) / 2;
                const targetNextTier = b1.tier + 1;

                newMergesThisTick.push({ x: mx, y: my, nextTier: targetNextTier });
                continue;
              }

              // Resolve penetration overlap using inverse-mass weighting
              const massSum = b1.mass + b2.mass;
              const ratio1 = b2.mass / massSum;
              const ratio2 = b1.mass / massSum;

              b1.x -= nx * overlap * ratio1;
              b1.y -= ny * overlap * ratio1;
              b2.x += nx * overlap * ratio2;
              b2.y += ny * overlap * ratio2;

              // Natural rolling-down slide-slip off shoulders to prevent gridlocked stacking
              if (ny < -0.1) {
                // b2 is resting above b1
                const slideForce = 0.12 * nx * Math.abs(ny);
                b2.vx += slideForce / b2.mass;
                b1.vx -= slideForce / b1.mass;
              } else if (ny > 0.1) {
                // b1 is resting above b2
                const slideForce = 0.12 * nx * Math.abs(ny);
                b1.vx += slideForce / b1.mass;
                b2.vx -= slideForce / b2.mass;
              }

              // Calculate relative linear speeds
              const rvx = b2.vx - b1.vx;
              const rvy = b2.vy - b1.vy;
              const velAlongNormal = rvx * nx + rvy * ny;

              // Elastic response impulse (only if moving closer)
              if (velAlongNormal < 0) {
                const restitution = 0.18 * (passivesRef.current.leakySyringe ? 1.15 : 1.0); // soft physical settles
                let jScalar = -(1.0 + restitution) * velAlongNormal;
                jScalar /= (1.0 / b1.mass + 1.0 / b2.mass);

                const impulseX = nx * jScalar;
                const impulseY = ny * jScalar;

                b1.vx -= impulseX / b1.mass;
                b1.vy -= impulseY / b1.mass;
                b2.vx += impulseX / b2.mass;
                b2.vy += impulseY / b2.mass;

                // Contact friction & spin-transfer (tangential friction)
                const tx = -ny;
                const ty = nx;
                const velAlongTangent = rvx * tx + rvy * ty;

                const frictionTransfer = 0.05;
                const tangentImpulse = velAlongTangent * frictionTransfer;
                b1.vAngle += tangentImpulse / b1.radius;
                b2.vAngle -= tangentImpulse / b2.radius;

                // Squash & stretch elastic impact feedback (on iteration 0)
                const impactSpeed = Math.abs(velAlongNormal);
                if (impactSpeed > 1.0 && iter === 0) {
                  const amp = Math.min(0.28, impactSpeed * 0.06);
                  const isVertical = Math.abs(ny) > Math.abs(nx);

                  b1.jiggleTimer = 9;
                  b1.jiggleAmp = amp;
                  b1.jiggleType = isVertical ? 'vertical' : 'horizontal';

                  b2.jiggleTimer = 9;
                  b2.jiggleAmp = amp;
                  b2.jiggleType = isVertical ? 'vertical' : 'horizontal';
                }
              }
            }
          }
        }
      }

      // Process and filter out merged balls
      let filteringNeeded = false;
      balls.forEach(b => {
        if (b.isMerging) filteringNeeded = true;
      });

      if (filteringNeeded) {
        ballsRef.current = balls.filter(b => !b.isMerging);
        balls = ballsRef.current;
      }

      // Spawn Merged Successors
      newMergesThisTick.forEach(merge => {
        setMergesCount(prev => prev + 1);

        // Special case: Tier 11 (Giga-Gorge) duplicate merge -> Nuclear clearing detonation!
        if (merge.nextTier > 11) {
          // Instant wipeout
          const totalEarnedPoints = balls.length * 10 + 200;
          setScore(prev => prev + totalEarnedPoints);
          ballsRef.current = [];

          canvasSplashes.current.push({
            x: merge.x,
            y: merge.y,
            maxRadius: WIDTH * 1.5,
            currentRadius: 10,
            color: '#ff0055', // violent death crimson spill
            opacity: 1
          });

          onTelemetryUpdate({
            timestamp: new Date().toLocaleTimeString(),
            message: `👑 CASCADE GIGA-BURST ENGAGED! Conjoined Giga-Gorge duplicate merge obliterated all dumpster debris! Clean sweep bonus awarded: +${totalEarnedPoints} points!`,
            type: 'merge'
          });
          return;
        }

        const tierConfig = EVOLUTIONARY_LADDER[merge.nextTier];
        const spawnedSuccessor: Ball = {
          id: Math.random().toString(),
          tier: merge.nextTier,
          x: merge.x,
          y: merge.y,
          vx: (Math.random() - 0.5) * 4,
          vy: -3.5, // light vertical pop
          radius: tierConfig.radius,
          mass: getMassForTier(merge.nextTier, tierConfig.radius), // Refined high-gradient Suika mass
          angle: Math.random() * Math.PI * 2,
          vAngle: 0,
          popScale: 0.1,
          isMerging: false
        };

        // Trigger merge screen shake & onomatopoeia popup (Audio substitute / visual juice)
        let pickedWord = "";
        let audioAsset = "";
        let scaleFactor = 1.0;

        if (merge.nextTier <= 5) {
          // Standard merge transition (T1 to T5)
          thematicAudio.playPopSquish();
          audioAsset = 'sfx_pop_squish.wav';
          
          const NEON_POP_WORDS = ["POP-OOZE!!", "SCHLUUURP!", "POP!!!", "GURGLE!", "GLOOP!", "SPLIP!"];
          pickedWord = NEON_POP_WORDS[Math.floor(Math.random() * NEON_POP_WORDS.length)];
          scaleFactor = 1.1;
        } else {
          // Elite toxic merge transition (T6 to T10)
          thematicAudio.playToxicCrunch();
          audioAsset = 'sfx_toxic_crunch.wav';
          
          const JAGGED_TOXIC_WORDS = ["CRUNCH-BOOM!!", "TOXIC-SPLAT!!!", "OOP-OOZE!", "PUSTULE!", "ZAP-ZILL!!", "KABOOM!"];
          pickedWord = JAGGED_TOXIC_WORDS[Math.floor(Math.random() * JAGGED_TOXIC_WORDS.length)];
          scaleFactor = 1.6; // Large scale bold print
        }

        onomatopoeiasRef.current.push({
          x: merge.x,
          y: merge.y - 12,
          text: pickedWord,
          color: tierConfig.color,
          scale: scaleFactor,
          angle: (Math.random() - 0.5) * 0.45, // wider dynamic skew
          life: 28,
          maxLife: 28
        });

        ballsRef.current.push(spawnedSuccessor);

        const conjoinedTier = merge.nextTier - 1;
        const spikedMilkActive = passivesRef.current.spikedMilk;
        const isEligibleLowTier = conjoinedTier >= 1 && conjoinedTier <= 3;
        const finalPoints = merge.nextTier * (spikedMilkActive && isEligibleLowTier ? 2 : 1);
        setScore(prev => prev + finalPoints);

        // Explicit floating score text popup - redesigned for high-fidelity gritty zine aesthetic
        if (spikedMilkActive && isEligibleLowTier) {
          onomatopoeiasRef.current.push({
            x: merge.x,
            y: merge.y - 30,
            text: `+${finalPoints} PTS x2`,
            color: '#000000', // Handled specially in drawing block
            scale: 1.35,
            angle: (Math.random() - 0.5) * (20 * Math.PI / 180), // Exactly between -10 and +10 degrees
            life: 42, // 700ms at 60fps = 42 frames
            maxLife: 42,
            isScore: true,
            shake: true,
            vy: -5.0 // Upward spring velocity
          });
        } else {
          onomatopoeiasRef.current.push({
            x: merge.x,
            y: merge.y - 30,
            text: `+${finalPoints} PTS`,
            color: '#000000', // Handled specially in drawing block
            scale: 1.15,
            angle: (Math.random() - 0.5) * (20 * Math.PI / 180), // Exactly between -10 and +10 degrees
            life: 42, // 700ms at 60fps = 42 frames
            maxLife: 42,
            isScore: true,
            shake: false,
            vy: -5.0 // Upward spring velocity
          });
        }

        // Spawn clean, lightweight Canvas Particle Emitter: 10 to 15 irregular, gravity-affected "ink splat" droplets
        const prevTier = merge.nextTier - 1;
        const tierColor = EVOLUTIONARY_LADDER[prevTier]?.color || '#39ff14';
        const numParticles = 10 + Math.floor(Math.random() * 6); // Exactly 10 to 15 droplets
        
        for (let p = 0; p < numParticles; p++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 4.0 + Math.random() * 6.0; // High initial burst speed radiating outward in 360-degree arc
          const rad = 3.5 + Math.random() * 4.5;   // Irregular droplet radius
          
          particlesRef.current.push({
            x: merge.x,
            y: merge.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 1.5, // High radiating velocity, offset slightly upwards
            radius: rad,
            color: tierColor,
            opacity: 1.0,
            life: 24, // 24 frames at 60fps = 400ms duration
            maxLife: 24,
            type: 'inkSplat',
            angle: Math.random() * Math.PI * 2,
            vAngle: (Math.random() - 0.5) * 0.45,
            seed: Math.random() * 100 // procedural seed
          });
        }

        // Optimization: Cap active particles list to guarantee smooth performance
        if (particlesRef.current.length > 200) {
          particlesRef.current = particlesRef.current.slice(-200);
        }

        // Trigger Scoreboard Impact Anchor
        scoreImpactScale.current = 1.25;
        scoreImpactTilt.current = (Math.random() - 0.5) * 16;
        scoreImpactFlash.current = true;
        scoreImpactTicks.current = 10;

        // Combo system ticker
        currentComboRef.current += 1;
        if (currentComboRef.current >= 2) {
          combosRef.current.push({
            x: merge.x,
            y: Math.max(TOP_LIMIT + 30, merge.y - 45),
            text: `COMBO x${currentComboRef.current}!`,
            comboCount: currentComboRef.current,
            vibrateSeed: Math.random() * 100,
            opacity: 1.0,
            life: 90
          });

          onTelemetryUpdate({
            timestamp: new Date().toLocaleTimeString(),
            message: `💥 EXTRA COMBO CHAIN REGISTERED! COMBO x${currentComboRef.current} multiplier active near [x: ${Math.round(merge.x)}, y: ${Math.round(merge.y)}]!`,
            type: 'cascade'
          });
        }

        // Apply pop outward explosion forces to adjacent balls (Satisfying Domino Cascades)
        const explosionRadius = 135;
        let pushCount = 0;
        
        ballsRef.current.forEach(ball => {
          if (ball.id === spawnedSuccessor.id) return;
          const dx = ball.x - merge.x;
          const dy = ball.y - merge.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < explosionRadius && d > 2) {
            const force = 8.5 * (1 - d / explosionRadius);
            ball.vx += (dx / d) * force;
            ball.vy += (dy / d) * force - 3.0; // Shoot upward and outward
            ball.isSleeping = false; // Wake up pushed item
            pushCount++;
          }
        });

        if (pushCount >= 3) {
          setCascadesCount(prev => prev + 1);
        }

        // Add visual merge spark flash
        mergeAnimations.current.push({
          x: merge.x,
          y: merge.y,
          scale: 1,
          maxScale: tierConfig.radius * 1.5,
          color: tierConfig.color,
          decay: 0.08
        });

        onTelemetryUpdate({
          timestamp: new Date().toLocaleTimeString(),
          message: `♻️ EVOLUTION MERGE: [T${merge.nextTier-1}] -> [T${merge.nextTier}: ${tierConfig.name}]. Cascades pushed on ${pushCount} neighbors. [Audio Trigger: ${audioAsset}]`,
          type: 'merge'
        });
      });

      // COLLISION ENGINE DONE - NOW RUN WARNING TRACK COOLDOWN MONITOR
      let isAnyOverTopLimit = false;
      ballsRef.current.forEach(ball => {
        // Overflow plane violations: center is settled below, but some top arc is over the top warning limit y=80.
        // Ignore recently spawned balls and rapidly falling spheres to prevent false warnings.
        // Only classify a ball as breaching the limit when it is resting/settled near the top (extremely low velocity).
        if (
          ball.y - ball.radius < TOP_LIMIT &&
          ball.y > TOP_LIMIT + 20 &&
          Math.abs(ball.vy) < 0.75 &&
          Math.abs(ball.vx) < 0.75
        ) {
          isAnyOverTopLimit = true;
        }
      });

      if (isAnyOverTopLimit !== warningActiveRef.current) {
        setWarningActive(isAnyOverTopLimit);
      }
      } // END isDrafting physics check

      // REDRAW STAGE WITH SCREENSHAKE FOR JUICY FEEDBACK (Screen shake disabled to maintain clean focus on classmate spheres)
      ctx.save();
      
      let finalShakeX = 0;
      let finalShakeY = 0;

      ctx.clearRect(-20, -20, WIDTH + 40, HEIGHT + 40);

      // Determine active background scene based on player score range (300-point milestones)
      let stageNum = 1;
      let stageName = 'The Detention Chute';
      const bgMilestone = Math.floor(score / 300);

      if (bgMilestone === 0) {
        stageNum = 1;
        stageName = 'The Detention Chute';
      } else if (bgMilestone === 1) {
        stageNum = 2;
        stageName = 'The Locker Room Chute';
      } else if (bgMilestone === 2) {
        stageNum = 3;
        stageName = 'The Toxic Cafeteria Chute';
      } else if (bgMilestone === 3) {
        stageNum = 4;
        stageName = 'The Boiler Room Chute';
      } else {
        stageNum = 5;
        stageName = 'The Apocalyptic Scrapyard';
      }

      // 1. Draw solid dark background color first as backing
      ctx.fillStyle = '#101012';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Draw widescreen industrial surrounding environments (rusting steel plate borders with rivets)
      ctx.fillStyle = '#1d1715'; // grunge rust-dark
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Shaded dark contrast overlay for depth
      const leftEnvGrad = ctx.createLinearGradient(0, 0, CHUTE_LEFT, 0);
      leftEnvGrad.addColorStop(0, 'rgba(0,0,0,0.85)');
      leftEnvGrad.addColorStop(0.7, 'rgba(12,8,6,0.3)');
      leftEnvGrad.addColorStop(1, 'rgba(0,0,0,0.9)');
      ctx.fillStyle = leftEnvGrad;
      ctx.fillRect(0, 0, CHUTE_LEFT, HEIGHT);

      const rightEnvGrad = ctx.createLinearGradient(CHUTE_RIGHT, 0, WIDTH, 0);
      rightEnvGrad.addColorStop(0, 'rgba(0,0,0,0.9)');
      rightEnvGrad.addColorStop(0.3, 'rgba(12,8,6,0.3)');
      rightEnvGrad.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.fillStyle = rightEnvGrad;
      ctx.fillRect(CHUTE_RIGHT, 0, WIDTH - CHUTE_RIGHT, HEIGHT);

      // Distressed grunge lines & plates rivets inside surrounds
      ctx.strokeStyle = '#050302';
      ctx.lineWidth = 3;
      for (let y = 80; y < HEIGHT; y += 140) {
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(CHUTE_LEFT, y);
        ctx.moveTo(CHUTE_RIGHT, y); ctx.lineTo(WIDTH, y);
        ctx.stroke();

        ctx.fillStyle = '#0f0c0b';
        ctx.beginPath();
        ctx.arc(20, y - 10, 4, 0, Math.PI * 2);
        ctx.arc(CHUTE_LEFT - 25, y - 10, 4, 0, Math.PI * 2);
        ctx.arc(CHUTE_RIGHT + 25, y - 10, 4, 0, Math.PI * 2);
        ctx.arc(WIDTH - 20, y - 10, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }



      // Draw heavy black solid outlines for chute walls
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(CHUTE_LEFT, 0); ctx.lineTo(CHUTE_LEFT, HEIGHT);
      ctx.moveTo(CHUTE_RIGHT, 0); ctx.lineTo(CHUTE_RIGHT, HEIGHT);
      ctx.stroke();

      // Define perspective container joints for cavernous vertical chute
      const pTopL_Front = { x: CHUTE_LEFT, y: TOP_LIMIT };
      const pTopR_Front = { x: CHUTE_RIGHT, y: TOP_LIMIT };
      const pBotL_Front = { x: CHUTE_LEFT, y: HEIGHT - 10 };
      const pBotR_Front = { x: CHUTE_RIGHT, y: HEIGHT - 10 };

      const pTopL_Back = { x: CHUTE_LEFT + (CHUTE_RIGHT - CHUTE_LEFT) * 0.23, y: TOP_LIMIT + (HEIGHT - 10 - TOP_LIMIT) * 0.16 };
      const pTopR_Back = { x: CHUTE_LEFT + (CHUTE_RIGHT - CHUTE_LEFT) * 0.77, y: TOP_LIMIT + (HEIGHT - 10 - TOP_LIMIT) * 0.16 };
      const pBotL_Back = { x: CHUTE_LEFT + (CHUTE_RIGHT - CHUTE_LEFT) * 0.23, y: (HEIGHT - 10) - (HEIGHT - 10 - TOP_LIMIT) * 0.16 };
      const pBotR_Back = { x: CHUTE_LEFT + (CHUTE_RIGHT - CHUTE_LEFT) * 0.77, y: (HEIGHT - 10) - (HEIGHT - 10 - TOP_LIMIT) * 0.16 };

      // Paint specific illustrative features for each of the 5 Container Environments
      // Paint score-bracket based atmospheric progression backgrounds inside chute back wall

      ctx.save();
      // Clip drawing strictly to the back wall of the chute to preserve depth of the container box
      ctx.beginPath();
      ctx.moveTo(pTopL_Back.x, pTopL_Back.y);
      ctx.lineTo(pTopR_Back.x, pTopR_Back.y);
      ctx.lineTo(pBotR_Back.x, pBotR_Back.y);
      ctx.lineTo(pBotL_Back.x, pBotL_Back.y);
      ctx.closePath();
      ctx.clip();

      if (bgMilestone === 0) {
        // 0 - 299 pts: Charcoal (#1a1a1a) atmosphere with raw vertical photocopy streak gradients
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(CHUTE_LEFT, 0, CHUTE_RIGHT - CHUTE_LEFT, HEIGHT);

        const pGrad = ctx.createLinearGradient(CHUTE_LEFT, 0, CHUTE_RIGHT, 0);
        pGrad.addColorStop(0, 'rgba(0,0,0,0.48)');
        pGrad.addColorStop(0.2, 'rgba(255,255,255,0.02)');
        pGrad.addColorStop(0.35, 'rgba(0,0,0,0.55)');
        pGrad.addColorStop(0.55, 'rgba(0,0,0,0.15)');
        pGrad.addColorStop(0.72, 'rgba(255,255,255,0.015)');
        pGrad.addColorStop(1, 'rgba(0,0,0,0.48)');
        ctx.fillStyle = pGrad;
        ctx.fillRect(CHUTE_LEFT, 0, CHUTE_RIGHT - CHUTE_LEFT, HEIGHT);

      } else if (bgMilestone === 1) {
        // 300 - 599 pts: Dark charcoal (#0a0a0a) with dense, hand-inked style cross-hatch shading bleeding from top corners
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(CHUTE_LEFT, 0, CHUTE_RIGHT - CHUTE_LEFT, HEIGHT);

        ctx.strokeStyle = '#020202';
        ctx.lineWidth = 1.8;
        // Top-left and top-right corner bleed hatching
        for (let i = 0; i < 280; i += 7) {
          ctx.beginPath();
          ctx.moveTo(pTopL_Back.x + i, pTopL_Back.y);
          ctx.lineTo(pTopL_Back.x, pTopL_Back.y + i);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(pTopR_Back.x - i, pTopR_Back.y);
          ctx.lineTo(pTopR_Back.x, pTopR_Back.y + i);
          ctx.stroke();
        }

      } else if (bgMilestone === 2) {
        // 600 - 899 pts: A dark, muted bio-green vignette (#121a12) with faint halftone stipple dot grid
        ctx.fillStyle = '#121a12';
        ctx.fillRect(CHUTE_LEFT, 0, CHUTE_RIGHT - CHUTE_LEFT, HEIGHT);

        const bioGrad = ctx.createRadialGradient(
          (pTopL_Back.x + pTopR_Back.x) / 2, (pTopL_Back.y + pBotL_Back.y) / 2, 30,
          (pTopL_Back.x + pTopR_Back.x) / 2, (pTopL_Back.y + pBotL_Back.y) / 2, 180
        );
        bioGrad.addColorStop(0, 'rgba(18, 26, 18, 0)');
        bioGrad.addColorStop(1, '#050905');
        ctx.fillStyle = bioGrad;
        ctx.fillRect(CHUTE_LEFT, 0, CHUTE_RIGHT - CHUTE_LEFT, HEIGHT);

        // Halftone stipple-dot mesh
        ctx.fillStyle = 'rgba(57, 255, 20, 0.04)';
        for (let hx = pTopL_Back.x + 4; hx < pTopR_Back.x; hx += 8) {
          for (let hy = pTopL_Back.y + 4; hy < pBotL_Back.y; hy += 8) {
            ctx.beginPath();
            ctx.arc(hx, hy, 1.0, 0, Math.PI * 2);
            ctx.fill();
          }
        }

      } else if (bgMilestone === 3) {
        // 900 - 1199 pts: Midnight-plum (#14101a) with sharp vertical dark-purple diagonal lines in margins
        ctx.fillStyle = '#14101a';
        ctx.fillRect(CHUTE_LEFT, 0, CHUTE_RIGHT - CHUTE_LEFT, HEIGHT);

        ctx.strokeStyle = '#28143f';
        ctx.lineWidth = 3.6;

        // Left 10px margin
        ctx.save();
        ctx.beginPath();
        ctx.rect(pTopL_Back.x, pTopL_Back.y, 10, pBotL_Back.y - pTopL_Back.y);
        ctx.clip();
        for (let j = pTopL_Back.y - 10; j < pBotL_Back.y; j += 8) {
          ctx.beginPath();
          ctx.moveTo(pTopL_Back.x, j);
          ctx.lineTo(pTopL_Back.x + 10, j + 10);
          ctx.stroke();
        }
        ctx.restore();

        // Right 10px margin
        ctx.save();
        ctx.beginPath();
        ctx.rect(pTopR_Back.x - 10, pTopR_Back.y, 10, pBotR_Back.y - pTopR_Back.y);
        ctx.clip();
        for (let j = pTopR_Back.y - 10; j < pBotR_Back.y; j += 8) {
          ctx.beginPath();
          ctx.moveTo(pTopR_Back.x - 10, j);
          ctx.lineTo(pTopR_Back.x, j + 10);
          ctx.stroke();
        }
        ctx.restore();

      } else {
        // 1200+ pts: Matte black (#050505) with a clean, low-opacity neon-green grid system that warps toward the bottom
        ctx.fillStyle = '#050505';
        ctx.fillRect(CHUTE_LEFT, 0, CHUTE_RIGHT - CHUTE_LEFT, HEIGHT);

        ctx.strokeStyle = 'rgba(57, 255, 20, 0.08)';
        ctx.lineWidth = 1;

        const stepX = (pTopR_Back.x - pTopL_Back.x) / 10;
        const centerX = (pTopL_Back.x + pTopR_Back.x) / 2;

        for (let i = 0; i <= 10; i++) {
          const startX = pTopL_Back.x + i * stepX;
          const endX = centerX + (startX - centerX) * 1.3;
          ctx.beginPath();
          ctx.moveTo(startX, pTopL_Back.y);
          ctx.quadraticCurveTo(centerX + (startX - centerX) * 0.9, pTopL_Back.y + (pBotL_Back.y - pTopL_Back.y) * 0.5, endX, pBotL_Back.y);
          ctx.stroke();
        }

        for (let y = pTopL_Back.y + 15; y < pBotL_Back.y; y += 18) {
          const depth = (y - pTopL_Back.y) * 0.035;
          ctx.beginPath();
          ctx.moveTo(pTopL_Back.x, y);
          ctx.quadraticCurveTo(centerX, y + depth, pTopR_Back.x, y);
          ctx.stroke();
        }
      }
      ctx.restore();

      // Side perspective walls
      ctx.fillStyle = '#141414';
      ctx.beginPath();
      ctx.moveTo(pTopL_Front.x, pTopL_Front.y);
      ctx.lineTo(pTopL_Back.x, pTopL_Back.y);
      ctx.lineTo(pBotL_Back.x, pBotL_Back.y);
      ctx.lineTo(pBotL_Front.x, pBotL_Front.y);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(pTopR_Front.x, pTopR_Front.y);
      ctx.lineTo(pTopR_Back.x, pTopR_Back.y);
      ctx.lineTo(pBotR_Back.x, pBotR_Back.y);
      ctx.lineTo(pBotR_Front.x, pBotR_Front.y);
      ctx.closePath();
      ctx.fill();

      // Floor
      ctx.fillStyle = '#0a0a0a';
      ctx.beginPath();
      ctx.moveTo(pBotL_Back.x, pBotL_Back.y);
      ctx.lineTo(pBotR_Back.x, pBotR_Back.y);
      ctx.lineTo(pBotR_Front.x, pBotR_Front.y);
      ctx.lineTo(pBotL_Front.x, pBotL_Front.y);
      ctx.closePath();
      ctx.fill();

      // Draw standard column perspective guide grids over container
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.42)';
      ctx.lineWidth = 1.6;
      for (let i = 1; i <= 4; i++) {
        const ratio = i / 5;
        // Floor perspective lines
        const fxFront = pBotL_Front.x + (pBotR_Front.x - pBotL_Front.x) * ratio;
        const fxBack = pBotL_Back.x + (pBotR_Back.x - pBotL_Back.x) * ratio;
        ctx.beginPath();
        ctx.moveTo(fxFront, pBotL_Front.y);
        ctx.lineTo(fxBack, pBotL_Back.y);
        ctx.stroke();

        // Left wall lines
        const lyFront = pTopL_Front.y + (pBotL_Front.y - pTopL_Front.y) * ratio;
        const lyBack = pTopL_Back.y + (pBotL_Back.y - pTopL_Back.y) * ratio;
        ctx.beginPath();
        ctx.moveTo(pTopL_Front.x, lyFront);
        ctx.lineTo(pTopL_Back.x, lyBack);
        ctx.stroke();

        // Right wall lines
        const ryFront = pTopR_Front.y + (pBotR_Front.y - pTopR_Front.y) * ratio;
        const ryBack = pTopR_Back.y + (pBotR_Back.y - pTopR_Back.y) * ratio;
        ctx.beginPath();
        ctx.moveTo(pTopR_Front.x, ryFront);
        ctx.lineTo(pTopR_Back.x, ryBack);
        ctx.stroke();
      }

      // Draw main receding wall boundaries (Chute box borders) in high-style heavy ink
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3.5;
      ctx.beginPath(); ctx.moveTo(pTopL_Front.x, pTopL_Front.y); ctx.lineTo(pTopL_Back.x, pTopL_Back.y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pTopR_Front.x, pTopR_Front.y); ctx.lineTo(pTopR_Back.x, pTopR_Back.y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pBotL_Front.x, pBotL_Front.y); ctx.lineTo(pBotL_Back.x, pBotL_Back.y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pBotR_Front.x, pBotR_Front.y); ctx.lineTo(pBotR_Back.x, pBotR_Back.y); ctx.stroke();

      // Back wall border frame in heavy black ink outline to solidify 3D perspective box
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(pTopL_Back.x, pTopL_Back.y);
      ctx.lineTo(pTopR_Back.x, pTopR_Back.y);
      ctx.lineTo(pBotR_Back.x, pBotR_Back.y);
      ctx.lineTo(pBotL_Back.x, pBotL_Back.y);
      ctx.closePath();
      ctx.stroke();

      // Enhance perspective wall shadows fading towards the hollow depths
      // Left Wall Shadow
      const leftShadow = ctx.createLinearGradient(CHUTE_LEFT, 0, pTopL_Back.x, 0);
      leftShadow.addColorStop(0, 'rgba(0,0,0,0.4)');
      leftShadow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = leftShadow;
      ctx.beginPath();
      ctx.moveTo(pTopL_Front.x, pTopL_Front.y);
      ctx.lineTo(pTopL_Back.x, pTopL_Back.y);
      ctx.lineTo(pBotL_Back.x, pBotL_Back.y);
      ctx.lineTo(pBotL_Front.x, pBotL_Front.y);
      ctx.closePath();
      ctx.fill();

      // Right Wall Shadow
      const rightShadow = ctx.createLinearGradient(CHUTE_RIGHT, 0, pTopR_Back.x, 0);
      rightShadow.addColorStop(0, 'rgba(0,0,0,0.4)');
      rightShadow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = rightShadow;
      ctx.beginPath();
      ctx.moveTo(pTopR_Front.x, pTopR_Front.y);
      ctx.lineTo(pTopR_Back.x, pTopR_Back.y);
      ctx.lineTo(pBotR_Back.x, pBotR_Back.y);
      ctx.lineTo(pBotR_Front.x, pBotR_Front.y);
      ctx.closePath();
      ctx.fill();

      // Ceiling shadow casting down
      const topShadow = ctx.createLinearGradient(0, TOP_LIMIT, 0, pTopL_Back.y);
      topShadow.addColorStop(0, 'rgba(0,0,0,0.45)');
      topShadow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = topShadow;
      ctx.beginPath();
      ctx.moveTo(pTopL_Front.x, pTopL_Front.y);
      ctx.lineTo(pTopR_Front.x, pTopR_Front.y);
      ctx.lineTo(pTopR_Back.x, pTopR_Back.y);
      ctx.lineTo(pTopL_Back.x, pTopL_Back.y);
      ctx.closePath();
      ctx.fill();

      // Atmospheric perspective: Chiaroscuro shading vignette to darken outer borders representation
      const vignetteGrad = ctx.createRadialGradient(WIDTH / 2, HEIGHT / 2, WIDTH * 0.3, WIDTH / 2, HEIGHT / 2, WIDTH * 0.85);
      vignetteGrad.addColorStop(0, 'rgba(0,0,0,0)');
      vignetteGrad.addColorStop(0.5, 'rgba(0,0,0,0.35)');
      vignetteGrad.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.fillStyle = vignetteGrad;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // --- TENSION MECHANICS (THE RED SHIFT) ---
      // Dynamically calculate tension based on how close classmate balls are to the top limit
      let tension = 0;
      let highestY = Infinity;
      ballsRef.current.forEach(ball => {
        // Only evaluate settled spheres, skip very recently spawned ones near the ceiling
        if (ball.y > TOP_LIMIT + 15) {
          const topY = ball.y - ball.radius;
          if (topY < highestY) {
            highestY = topY;
          }
        }
      });

      if (highestY !== Infinity) {
        // Red shift begins when spheres reach within 160px from the TOP_LIMIT
        const warningStartDistance = 160;
        const dist = highestY - TOP_LIMIT;
        if (dist < warningStartDistance) {
          tension = 1.0 - (dist / warningStartDistance);
          tension = Math.max(0, Math.min(1, tension));
        }
      }

      // If warningActive is triggered, max out the tension and add a strong countdown surge
      if (warningActiveRef.current) {
        const countdownProgress = (3.0 - warningTimeRef.current) / 3.0; // 0.0 to 1.0
        tension = Math.max(tension, 0.75 + countdownProgress * 0.25);
      }

      // Render pulsing bloodshot red vignette to borders if tension is building
      if (tension > 0) {
        const pulse = 0.85 + Math.sin(localFrame * 0.15) * 0.15;
        const currentTension = tension * pulse;

        const redVignetteGrad = ctx.createRadialGradient(
          WIDTH / 2, HEIGHT / 2,
          WIDTH * (0.35 - currentTension * 0.15), // view narrows down to look claustrophobic
          WIDTH / 2, HEIGHT / 2,
          WIDTH * 0.85
        );
        redVignetteGrad.addColorStop(0, 'rgba(0,0,0,0)');
        redVignetteGrad.addColorStop(0.45, `rgba(139, 0, 0, ${0.12 * currentTension})`);
        redVignetteGrad.addColorStop(0.8, `rgba(160, 0, 0, ${0.52 * currentTension})`);
        redVignetteGrad.addColorStop(1, `rgba(75, 0, 0, ${0.9 * currentTension})`);

        ctx.save();
        ctx.fillStyle = redVignetteGrad;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.restore();
      }

      // 2. Draw Warning Zone Red Striped Background at the threshold
      if (warningActiveRef.current) {
        ctx.fillStyle = `rgba(239, 68, 68, ${0.12 + Math.sin(localFrame * 0.15) * 0.06})`;
        ctx.fillRect(0, 0, WIDTH, TOP_LIMIT);
      }

      // Evaluate 20% Zone Panic (Suika loop)
      let isWithin20Percent = warningActiveRef.current;
      if (!isWithin20Percent) {
        ballsRef.current.forEach(ball => {
          const playHeight = HEIGHT - TOP_LIMIT;
          // Ignore newly dropped/rapidly falling balls to prevent false alarms when launching.
          // Activate sirens solely when physical items are resting/settling within the top 20% zone.
          if (
            ball.y - ball.radius < TOP_LIMIT + playHeight * 0.2 &&
            ball.y > TOP_LIMIT + 20 &&
            Math.abs(ball.vy) < 0.75 &&
            Math.abs(ball.vx) < 0.75
          ) {
            isWithin20Percent = true;
          }
        });
      }

      // --- INTEGRATED OVERFLOW VENT / DEBRIS TRAP LOSS BOUNDARY ---
      // Heavy, hand-drawn perspective metal grate boundary replacing the old neon green dotted line
      ctx.save();
      
      // Draw sketchy double-outline for the main horizontal vent lips in ink style
      ctx.strokeStyle = '#000000';
      ctx.lineCap = 'round';
      
      // 3 overlapping slightly offset sketch passes
      ctx.lineWidth = 3;
      for (let s = 0; s < 3; s++) {
        const oy1 = (Math.sin(s * 1.5) * 0.8);
        const oy2 = (Math.cos(s * 2.1) * 0.8);
        ctx.beginPath();
        ctx.moveTo(CHUTE_LEFT, TOP_LIMIT + oy1);
        ctx.lineTo(CHUTE_RIGHT, TOP_LIMIT + oy2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(CHUTE_LEFT, TOP_LIMIT - 6 + oy1);
        ctx.lineTo(CHUTE_RIGHT, TOP_LIMIT - 6 + oy2);
        ctx.stroke();
      }

      // Slotted architectural vents (slots/mesh)
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.78)';
      ctx.lineWidth = 1.6;
      for (let x = CHUTE_LEFT + 8; x < CHUTE_RIGHT; x += 14) {
        // Draw diagonal cross-hatching in slices reflecting sketchy line art
        ctx.beginPath();
        ctx.moveTo(x, TOP_LIMIT - 6);
        ctx.lineTo(x + 5, TOP_LIMIT);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + 5, TOP_LIMIT - 6);
        ctx.lineTo(x, TOP_LIMIT);
        ctx.stroke();
      }
      
      // Heavy perspective brackets connecting the grate trap to outer walls
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#000000';
      ctx.beginPath();
      ctx.moveTo(CHUTE_LEFT, TOP_LIMIT - 12);
      ctx.lineTo(CHUTE_LEFT + 15, TOP_LIMIT);
      ctx.moveTo(CHUTE_RIGHT, TOP_LIMIT - 12);
      ctx.lineTo(CHUTE_RIGHT - 15, TOP_LIMIT);
      ctx.stroke();

      ctx.restore();

      // Show hand-drawn overlay visual indicator beacons when needed
      if (isWithin20Percent) {
        ctx.save();
        const sirenPositions = [
          { x: CHUTE_LEFT - 16, y: TOP_LIMIT - 12 },
          { x: CHUTE_RIGHT + 16, y: TOP_LIMIT - 12 }
        ];

        const panic = warningActiveRef.current;
        const alarmSpeed = panic ? 0.22 : 0.08;
        const beamAngle = localFrame * alarmSpeed;
        const pulseAlpha = 0.35 + 0.45 * Math.sin(localFrame * (panic ? 0.35 : 0.15));

        sirenPositions.forEach(pos => {
          // Draw sweeping alarm beacon rays (rotating fan light cones)
          const numBeams = 2;
          ctx.save();
          ctx.translate(pos.x, pos.y);
          
          for (let b = 0; b < numBeams; b++) {
            const currentAngle = beamAngle + (b * Math.PI);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            const beamWidth = 0.5; // Fan-beam angular width
            ctx.arc(0, 0, panic ? 140 : 80, currentAngle - beamWidth, currentAngle + beamWidth);
            ctx.closePath();
            
            const lightGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, panic ? 140 : 80);
            lightGrad.addColorStop(0, `rgba(255, 0, 60, ${pulseAlpha * 0.85})`);
            lightGrad.addColorStop(0.3, `rgba(251, 191, 36, ${pulseAlpha * 0.45})`);
            lightGrad.addColorStop(1, 'rgba(255, 0, 0, 0)');
            ctx.fillStyle = lightGrad;
            ctx.fill();
          }

          // Draw the industrial metal siren housing base with hand-drawn edge outlines
          ctx.fillStyle = '#1e293b';
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.moveTo(-10, 4);
          ctx.lineTo(-6, -2);
          ctx.lineTo(6, -2);
          ctx.lineTo(10, 4);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Draw the glowing neon-red transparent alarm bulb dome
          ctx.fillStyle = panic ? `rgba(255, 0, 60, ${0.4 + 0.6 * pulseAlpha})` : '#ef4444';
          ctx.beginPath();
          ctx.arc(0, -2, 6, Math.PI, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Draw a small bright yellow core bulb inside
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc(0, -3, 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        });

        // Draw a hand-drawn, vibrating Hazard Warning Triangle in the center
        ctx.save();
        const centerWarningX = (CHUTE_LEFT + CHUTE_RIGHT) / 2;
        const centerWarningY = TOP_LIMIT - 32;

        const triSize = 25;
        // Shake violently if panic mode is active
        const triShakeX = panic ? (Math.random() - 0.5) * 5 : 0;
        const triShakeY = panic ? (Math.random() - 0.5) * 5 : 0;
        ctx.translate(centerWarningX + triShakeX, centerWarningY + triShakeY);

        // Solid Yellow Background Triangle
        ctx.fillStyle = panic ? '#ff003c' : '#fbbf24'; // flashing red warning triangle under panic
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(0, -triSize + 4);
        ctx.lineTo(triSize, triSize);
        ctx.lineTo(-triSize, triSize);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Sketchy double border for zine style
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.moveTo(0, -triSize + 7);
        ctx.lineTo(triSize - 3, triSize - 2);
        ctx.lineTo(-triSize + 3, triSize - 2);
        ctx.closePath();
        ctx.stroke();

        // Exclamation Mark inside triangle
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.rect(-2.5, -4, 5, 12); // vertical bar
        ctx.arc(0, 12, 3, 0, Math.PI * 2); // bottom dot
        ctx.fill();

        // If panic countdown is active, draw a stylized ticking circular countdown gauge
        if (panic) {
          ctx.translate(34, 4);
          const progress = warningTimeRef.current / 3.0; // 1.0 to 0.0
          
          ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 5, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Draw outline of ticking progress arc
          ctx.strokeStyle = '#ff003c';
          ctx.lineWidth = 4;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.arc(0, 5, 12, -Math.PI / 2, -Math.PI / 2 + (progress * Math.PI * 2));
          ctx.stroke();

          // Distressed hand-written countdown digit
          ctx.fillStyle = '#ffffff';
          ctx.font = '900 13px "Impact", "Arial Black", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(Math.ceil(warningTimeRef.current).toString(), 0, 6);
        }

        ctx.restore();
      }



      // 3. Draw Aiming Drop Guide Line (only when NOT in cooldown and in normal mode)
      if (!isGameOverRef.current && !cooldownRef.current && powerupModeRef.current === 'none') {
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(cursorXRef.current, SPAWN_Y);
        ctx.lineTo(cursorXRef.current, HEIGHT - 10);
        ctx.stroke();
        ctx.setLineDash([]); // Reset
      }

      // Draw the Grotesque launcher hand-inked character sprite (The Mutated Lunch Lady) ALWAYS when game is active
      if (!isGameOverRef.current && powerupModeRef.current === 'none') {
        const dropStats = EVOLUTIONARY_LADDER[onDeckTierRef.current];
        const launcherAnchorX = WIDTH / 2;
        const launcherAnchorY = TOP_LIMIT - 34; // Anchored near the ventilation shaft ceiling

        // Translate to the static top-center anchor to draw the Lunch Lady
        ctx.save();
        ctx.translate(launcherAnchorX, launcherAnchorY);

        // Ceiling rail and support guide in hand-drawn style
        ctx.strokeStyle = '#1a100a';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(-(launcherAnchorX - CHUTE_LEFT - 10), -12);
        ctx.lineTo(CHUTE_RIGHT - launcherAnchorX - 10, -12);
        ctx.stroke();

        // 1. THE HAIRNET & DOME HAT (With hand-inked cross hatch shaders)
        ctx.fillStyle = '#a5f3fc'; // Light mesh blue
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2.4;
        
        // Draw sketchy double outline for the hairnet
        for (let s = 0; s < 3; s++) {
          const ox = (Math.sin(s * 1.5) * 0.5);
          const oy = (Math.cos(s * 2.3) * 0.5);
          ctx.beginPath();
          ctx.arc(ox, -22 + oy, 19 + ox, Math.PI, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }

        // Clip to dome hat to draw hand-inked shading curves
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, -22, 19, Math.PI, 0);
        ctx.closePath();
        ctx.clip();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.lineWidth = 1;
        for (let d = -25; d <= 25; d += 4) {
          ctx.beginPath();
          ctx.moveTo(d, -45);
          ctx.lineTo(d - 8, -20);
          ctx.stroke();
        }
        ctx.restore();

        // Mesh grids on hairnet
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.38)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        for (let j = -12; j <= 12; j += 4) {
          ctx.moveTo(j, -22);
          ctx.lineTo(j, -38);
          ctx.moveTo(-16, -22 - j * 0.3);
          ctx.lineTo(16, -22 - j * 0.3);
        }
        ctx.stroke();

        // 2. THE MUTATED LUNCH LADY FACE DOME (Wrinkled fleshy pinkish skin with sketchy overlaps)
        ctx.fillStyle = '#db8570';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        
        // Sketchy double outlines for mutated dome
        for (let s = 0; s < 3; s++) {
          const ox = (Math.sin(s * 1.7) * 0.7);
          const oy = (Math.cos(s * 2.5) * 0.7);
          ctx.beginPath();
          ctx.ellipse(ox, -10 + oy, 20 + ox, 15 + oy, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }

        // Fleshy cross-hatch shading to give the "Class of '99 gross-out" zine texture
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(0, -10, 20, 15, 0, 0, Math.PI * 2);
        ctx.clip();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.lineWidth = 0.95;
        for (let d = -30; d <= 30; d += 4) {
          ctx.beginPath();
          ctx.moveTo(d - 10, -28);
          ctx.lineTo(d + 12, 10);
          ctx.stroke();
        }
        ctx.restore();

        // Green warts (bulky hand-drawn circles)
        ctx.fillStyle = '#84cc16';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.arc(-11, -12, 3, 0, Math.PI * 2);
        ctx.arc(10, -14, 2.5, 0, Math.PI * 2);
        ctx.arc(3, -5, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 3. GIANT BULGING BLOODSHOT EYE
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2.5;
        
        for (let s = 0; s < 2; s++) {
          const ox = (Math.sin(s * 1.1) * 0.6);
          const oy = (Math.cos(s * 1.9) * 0.6);
          ctx.beginPath();
          ctx.arc(-8 + ox, -13 + oy, 8.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }

        // Fine bloodshot veins
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(-15, -13); ctx.lineTo(-11, -13);
        ctx.moveTo(-8, -20); ctx.lineTo(-8, -17);
        ctx.moveTo(-8, -6);  ctx.lineTo(-8, -9);
        ctx.stroke();

        // Pupil
        ctx.fillStyle = '#3b82f6'; // blue iris
        ctx.beginPath();
        ctx.arc(-7, -11, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0a0a0a'; // black pupil
        ctx.beginPath();
        ctx.arc(-7, -11, 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Normal angry eye right (sketchy)
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.ellipse(7, -10, 4, 2, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(7, -10, 1.2, 0, Math.PI * 2);
        ctx.fill();

        // 4. TORN GREASE-STAINED APRON (Inked and cross-hatched)
        ctx.fillStyle = '#e2e8f0';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2.5;
        
        for (let s = 0; s < 2; s++) {
          const ox = (Math.sin(s * 0.9) * 0.7);
          ctx.beginPath();
          ctx.moveTo(-14 + ox, 0);
          ctx.lineTo(-11 + ox, 14);
          ctx.lineTo(11 + ox, 14);
          ctx.lineTo(14 + ox, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }

        // Inked cross-hatching inside the Apron
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(-14, 0);
        ctx.lineTo(-11, 14);
        ctx.lineTo(11, 14);
        ctx.lineTo(14, 0);
        ctx.closePath();
        ctx.clip();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.lineWidth = 0.9;
        for (let d = -20; d <= 20; d += 3) {
          ctx.beginPath();
          ctx.moveTo(d - 6, -2);
          ctx.lineTo(d + 4, 16);
          ctx.stroke();
        }
        ctx.restore();

        // Grease and gravy splashes on apron
        ctx.fillStyle = '#ca8a04';
        ctx.beginPath();
        ctx.arc(-5, 5, 2.8, 0, Math.PI * 2);
        ctx.arc(4, 9, 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#451a03';
        ctx.beginPath();
        ctx.arc(6, 4, 3, 0, Math.PI * 2);
        ctx.fill();

        // Torn tattered hem marks at bottom
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-8, 14); ctx.lineTo(-6, 18); ctx.lineTo(-4, 14);
        ctx.moveTo(0, 14);  ctx.lineTo(2, 17);  ctx.lineTo(4, 14);
        ctx.stroke();

        ctx.restore(); // Restore from anchor translation

        // ---- DRAW JOINTED CRANE STEEL LINKAGE FROM LUNCH LADY TO CLAW ----
        // Origin: Lunch lady bottom base (launcherAnchorX, launcherAnchorY + 14)
        // Target: Trolley claw center (cursorX, SPAWN_Y - 26)
        const linkageOX = launcherAnchorX;
        const linkageOY = launcherAnchorY + 14;
        const linkageTX = cursorXRef.current;
        const linkageTY = SPAWN_Y - 26;

        // Draw rolling guide trolley inside rail first (grungy)
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(cursorXRef.current, SPAWN_Y - 28, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Calculate intermediate Joint (Pantograph elbow joint)
        const jointX = (linkageOX + linkageTX) / 2;
        const jointY = Math.min(linkageOY, linkageTY) - 18; // elbow bows upward

        // Draw heavy, cross-hatched mechanical iron bars
        ctx.strokeStyle = '#1e1b18'; // solid outline
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(linkageOX, linkageOY);
        ctx.lineTo(jointX, jointY);
        ctx.lineTo(linkageTX, linkageTY);
        ctx.stroke();

        ctx.strokeStyle = '#7c2d12'; // inner rusty color
        ctx.lineWidth = 4;
        ctx.stroke();

        // Metallic stripe highlight on armature
        ctx.strokeStyle = '#ea580c';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(linkageOX, linkageOY);
        ctx.lineTo(jointX, jointY);
        ctx.lineTo(linkageTX, linkageTY);
        ctx.stroke();

        // Sketchy double outlines for mechanical beams to match zine balls
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1.8;
        for (let s = 0; s < 3; s++) {
          const ox = (Math.sin(s * 1.9) * 1.1);
          const oy = (Math.cos(s * 2.5) * 1.1);
          ctx.beginPath();
          ctx.moveTo(linkageOX + ox, linkageOY + oy);
          ctx.lineTo(jointX + ox, jointY + oy);
          ctx.lineTo(linkageTX + ox, linkageTY + oy);
          ctx.stroke();
        }

        // Draw real hand-drawn cross hatch slashes along segments
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.72)';
        ctx.lineWidth = 1;
        const segments1 = 12;
        for (let i = 0; i <= segments1; i++) {
          const t = i / segments1;
          const px = linkageOX + (jointX - linkageOX) * t;
          const py = linkageOY + (jointY - linkageOY) * t;
          ctx.beginPath();
          ctx.moveTo(px - 4, py - 4);
          ctx.lineTo(px + 4, py + 4);
          ctx.stroke();
        }
        const segments2 = 12;
        for (let i = 0; i <= segments2; i++) {
          const t = i / segments2;
          const px = jointX + (linkageTX - jointX) * t;
          const py = jointY + (linkageTY - jointY) * t;
          ctx.beginPath();
          ctx.moveTo(px - 4, py - 4);
          ctx.lineTo(px + 4, py + 4);
          ctx.stroke();
        }

        // Black metal pivot rivets at joints with rough hand scribble circle layers
        ctx.fillStyle = '#0a0a0a';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1.5;
        
        for (let s = 0; s < 2; s++) {
          const rOff = (Math.sin(s * 2.1) * 0.5);
          ctx.beginPath();
          ctx.arc(linkageOX + rOff, linkageOY + rOff, 4.5 + rOff, 0, Math.PI * 2);
          ctx.arc(jointX + rOff, jointY + rOff, 4.5 + rOff, 0, Math.PI * 2);
          ctx.arc(linkageTX + rOff, linkageTY + rOff, 4.5 + rOff, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }

        // ---- DRAW DETAILED GRIP CLAW HAND AT THE TARGET HOVER POSITION ----
        ctx.save();
        ctx.translate(cursorXRef.current, SPAWN_Y - 26);

        // 5. CLAW BASE
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#1f2937';
        ctx.lineWidth = 3.2;

        // Draw Left arm joint (double outline sketchy)
        for (let s = 0; s < 2; s++) {
          const ox = s * 0.8;
          ctx.strokeStyle = s === 0 ? '#000000' : '#4b5563';
          ctx.lineWidth = s === 0 ? 3.5 : 1.5;
          ctx.beginPath();
          ctx.moveTo(-14 + ox, 4);
          ctx.lineTo(-24 + ox, 12); // upper joint
          ctx.lineTo(-16 + ox, 26); // lower joint gripping droplet region
          ctx.stroke();
        }

        // Left pincher claw with cross hatch
        ctx.fillStyle = '#111827';
        ctx.beginPath();
        ctx.arc(-16, 26, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Draw Right arm joint (double outline sketchy)
        for (let s = 0; s < 2; s++) {
          const ox = s * 0.8;
          ctx.strokeStyle = s === 0 ? '#000000' : '#4b5563';
          ctx.lineWidth = s === 0 ? 3.5 : 1.5;
          ctx.beginPath();
          ctx.moveTo(14 + ox, 4);
          ctx.lineTo(24 + ox, 12); // upper joint
          ctx.lineTo(16 + ox, 26); // lower joint
          ctx.stroke();
        }

        // Right pincher
        ctx.fillStyle = '#111827';
        ctx.beginPath();
        ctx.arc(16, 26, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Crooked green mouth drool hanging
        ctx.fillStyle = 'rgba(57, 255, 20, 0.78)';
        ctx.beginPath();
        ctx.ellipse(3, 3, 2.2, 7.8, Math.PI / 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Draw held droplet (only if NOT in drop cooldown)
        if (!cooldownRef.current) {
          drawCharacter(ctx, cursorXRef.current, SPAWN_Y, dropStats, 0, 1.0);
        }
      }

      // 4. Render all ACTIVE gross-out Balls with Hand-Inked details
      ballsRef.current.forEach(ball => {
        const stats = EVOLUTIONARY_LADDER[ball.tier];
        if (stats) {
          // Compute squash-and-stretch scaling dynamically on active balls jiggle timer
          let squashX = 1.0;
          let squashY = 1.0;
          
          if (ball.jiggleTimer && ball.jiggleTimer > 0) {
            ball.jiggleTimer -= 1; // tick
            
            const maxFrames = 9;
            const t = maxFrames - ball.jiggleTimer;
            
            // Frequency mapping
            let freq = 0.65;
            if (ball.tier <= 3) {
              freq = 1.35; // Snappy light rubber
            } else if (ball.tier >= 6) {
              freq = 0.35; // Heavy gelatinous wobble
            }
            
            // Damped oscillator decay
            const decay = Math.pow(0.72, t);
            const amp = (ball.jiggleAmp || 0.25) * Math.sin(t * freq) * decay;
            
            if (ball.jiggleType === 'vertical') {
              squashX = 1.0 + amp; // stretch width
              squashY = 1.0 - amp; // compress height
            } else {
              squashX = 1.0 - amp; // compress width
              squashY = 1.0 + amp; // stretch height
            }
          }

          drawCharacter(ctx, ball.x, ball.y, stats, ball.angle, ball.popScale, squashX, squashY);
        }
      });

      // 5. Draw active canvas explosions (Snot-Rag splatters)
      canvasSplashes.current.forEach((splash, idx) => {
        splash.currentRadius += (splash.maxRadius - splash.currentRadius) * 0.12;
        splash.opacity -= 0.03;

        ctx.strokeStyle = `rgba(0, 0, 0, ${splash.opacity})`;
        ctx.lineWidth = 3;
        ctx.fillStyle = `rgba(57, 255, 20, ${splash.opacity * 0.5})`; // neon green slime stain
        
        ctx.beginPath();
        // Mimic messy ink splash spikes
        const segments = 16;
        for (let s = 0; s < segments; s++) {
          const angle = (s / segments) * Math.PI * 2;
          const noise = 15 * Math.sin(s * 2.3) + 5 * Math.cos(s * 8.2);
          const r = splash.currentRadius + noise;
          const sx = splash.x + Math.cos(angle) * r;
          const sy = splash.y + Math.sin(angle) * r;
          if (s === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw messy dripping ink lines down
        ctx.strokeStyle = `rgba(0,0,0, ${splash.opacity})`;
        ctx.beginPath();
        for (let s = 0; s < segments; s += 3) {
          const angle = (s / segments) * Math.PI * 2;
          const r = splash.currentRadius * 0.8;
          const sx = splash.x + Math.cos(angle) * r;
          const sy = splash.y + Math.sin(angle) * r;
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx, sy + 25 * Math.sin(s * 1.5) + 15);
        }
        ctx.stroke();
      });

      // Filter aged splinters
      canvasSplashes.current = canvasSplashes.current.filter(spl => spl.opacity > 0);

      // 6. Draw active merge spark flash rings
      mergeAnimations.current.forEach((anim) => {
        anim.scale += (anim.maxScale - anim.scale) * 0.15;
        ctx.strokeStyle = anim.color;
        ctx.lineWidth = 4 * (1 - anim.scale / anim.maxScale);
        ctx.beginPath();
        ctx.arc(anim.x, anim.y, anim.scale, 0, Math.PI * 2);
        ctx.stroke();
      });
      mergeAnimations.current = mergeAnimations.current.filter(anim => anim.scale < anim.maxScale - 1);

      // 6.5 Draw Comic-Book Onomatopoeia text explosions and Floating Score Feedback
      onomatopoeiasRef.current.forEach(pop => {
        pop.life--;
        
        const progress = pop.life / pop.maxLife; // 1 -> 0
        let currentScale = 1.0;
        
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, progress));

        if (pop.isScore) {
          // Dynamic upward spring physics
          if (pop.vy !== undefined) {
            pop.vy += 0.22; // Gravity pull/deceleration on the spring
            pop.y += pop.vy;
          } else {
            pop.y -= 1.2;
          }
          
          // Smooth scale-up over its life
          currentScale = pop.scale * (1.1 + (1 - progress) * 0.25);
          
          ctx.translate(pop.x, pop.y);
          ctx.rotate(pop.angle);
          
          // Apply violent shake if Spiked Milk passive multiplier is active
          if (pop.shake) {
            const sx = (Math.random() - 0.5) * 6.5;
            const sy = (Math.random() - 0.5) * 6.5;
            ctx.translate(sx, sy);
          }
          
          ctx.scale(currentScale, currentScale);

          // Crunchy distressed stencil style text backing (black ink with thick white outline)
          ctx.font = '900 italic 21px "Impact", "Arial Black", "Space Grotesk", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Draw bold white outlines first
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 5.5;
          ctx.lineJoin = 'round';
          ctx.strokeText(pop.text, 0, 0);

          // Multiprint black fill slightly offset to simulate bleeding, distressed screenprint ink
          ctx.fillStyle = '#000000';
          const stampOffsets = [
            [0, 0],
            [-0.7, 0.5],
            [0.6, -0.6],
            [-0.4, -0.3]
          ];
          stampOffsets.forEach(([ox, oy]) => {
            ctx.fillText(pop.text, ox, oy);
          });
        } else {
          // Standard Comic-Book Onomatopoeia float logic
          pop.y -= 0.6; // Slight float upward
          currentScale = progress > 0.7 
            ? 1.4 * ((1 - progress) / 0.3) 
            : 1.4 * (progress / 0.7);
            
          ctx.translate(pop.x, pop.y);
          ctx.rotate(pop.angle);
          ctx.scale(currentScale, currentScale);

          // Bold stroke text backing
          ctx.font = '900 18px "Space Grotesk", Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 5;
          ctx.strokeText(pop.text, 0, 0);

          ctx.fillStyle = pop.color;
          ctx.fillText(pop.text, 0, 0);
        }
        
        ctx.restore();
      });
      onomatopoeiasRef.current = onomatopoeiasRef.current.filter(pop => pop.life > 0);

      // 6.7 Update and Draw Coalescence Particle Debris
      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.type === 'inkSplat') {
          p.vy += 0.28; // gravity-affected (heavier gravity for smooth arcing downward)
          p.vx *= 0.95; // drag
          p.vy *= 0.98;
        } else {
          p.vy += 0.05; // light float gravity
          p.vx *= 0.96; // drag
          p.vy *= 0.96;
        }
        
        p.life--;
        p.opacity = p.life / p.maxLife;
        
        if (p.angle !== undefined && p.vAngle !== undefined) {
          p.angle += p.vAngle;
        }
        
        ctx.save();
        ctx.globalAlpha = p.opacity;
        
        if (p.type === 'speck') {
          ctx.fillStyle = p.color;
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else if (p.type === 'droplet') {
          ctx.fillStyle = p.color;
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - p.radius * 1.3);
          ctx.quadraticCurveTo(p.x + p.radius, p.y + p.radius, p.x, p.y + p.radius);
          ctx.quadraticCurveTo(p.x - p.radius, p.y + p.radius, p.x, p.y - p.radius * 1.3);
          ctx.fill();
          ctx.stroke();
        } else if (p.type === 'inkSplat') {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle || 0);
          ctx.fillStyle = p.color;
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          const nodes = 6;
          // Apply a scale down factor over the lifetime to scale down slightly (from 100% to 50%)
          const scaleDown = 0.50 + 0.50 * (p.life / p.maxLife);
          for (let n = 0; n < nodes; n++) {
            const nodeAngle = (n / nodes) * Math.PI * 2;
            const rOffset = p.radius * scaleDown * (0.85 + 0.45 * Math.sin(n * 2.3 + (p.seed || 1)));
            const cursorX = Math.cos(nodeAngle) * rOffset;
            const cursorY = Math.sin(nodeAngle) * rOffset;
            if (n === 0) {
              ctx.moveTo(cursorX, cursorY);
            } else {
              ctx.lineTo(cursorX, cursorY);
            }
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else if (p.type === 'butt') {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle || 0);
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1.0;
          
          ctx.fillStyle = '#ff823a'; // Orange filter
          ctx.fillRect(-p.radius, -p.radius / 2, p.radius * 0.7, p.radius);
          ctx.strokeRect(-p.radius, -p.radius / 2, p.radius * 0.7, p.radius);
          
          ctx.fillStyle = '#f0f0f0'; // White cylinder
          ctx.fillRect(-p.radius * 0.3, -p.radius / 2, p.radius * 1.3, p.radius);
          ctx.strokeRect(-p.radius * 0.3, -p.radius / 2, p.radius * 1.3, p.radius);
        } else if (p.type === 'scrap') {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle || 0);
          ctx.fillStyle = '#94a3b8';
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-p.radius, -p.radius * 0.3);
          ctx.lineTo(p.radius * 0.2, -p.radius);
          ctx.lineTo(p.radius, p.radius * 0.4);
          ctx.lineTo(-p.radius * 0.4, p.radius);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        
        ctx.restore();
      });
      particlesRef.current = particlesRef.current.filter(p => p.life > 0);

      // 6.9 Render Vibrating, Hand-Inked Comic Combo Banners
      combosRef.current.forEach((combo) => {
        combo.life--;
        
        const rx = (Math.sin(localFrame * 0.45 + combo.vibrateSeed) * 2.8);
        const ry = (Math.cos(localFrame * 0.55 + combo.vibrateSeed) * 2.8);
        
        ctx.save();
        ctx.translate(combo.x + rx, combo.y + ry);
        
        const tilt = Math.sin(localFrame * 0.15 + combo.vibrateSeed) * 0.08;
        ctx.rotate(tilt);
        
        const baseSize = 20 + (combo.comboCount - 2) * 4;
        const fontSize = Math.min(36, baseSize);
        
        ctx.font = `900 ${fontSize}px "Space Grotesk", Impact, Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const colors = ['#fff01f', '#ff5e00', '#ff2a85', '#39ff14'];
        const comboColor = colors[(combo.comboCount - 2) % colors.length];
        
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 6;
        ctx.strokeText(combo.text, 2, 2);
        ctx.fillStyle = '#000000';
        ctx.fillText(combo.text, 2, 2);
        
        ctx.strokeText(combo.text, 0, 0);
        ctx.fillStyle = comboColor;
        ctx.fillText(combo.text, 0, 0);
        
        ctx.restore();
      });
      combosRef.current = combosRef.current.filter(c => c.life > 0);

      // 7. Render Outer Box sketch outline around Dumpster Frame (Heavy ink scribble borders)
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 6;
      ctx.strokeRect(3, 3, WIDTH - 6, HEIGHT - 6);

      // Draw horizontal cross beams at outer edges
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, HEIGHT - 10, WIDTH, 10); // trash plate floor
      ctx.fillRect(0, 0, 10, HEIGHT);          // left support
      ctx.fillRect(WIDTH - 10, 0, 10, HEIGHT);  // right support

      // Restore screenshake translation save
      ctx.restore();

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // HAND-DRAWN RENDER LIBRARY TO PROCEDURALLY DRAW CHARACTERS WITH RAW SHADING
  const drawCharacter = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    stats: EvolutionaryTier,
    angle: number,
    scale: number,
    squashX: number = 1.0,
    squashY: number = 1.0
  ) => {
    drawClassmateProcedural(ctx, x, y, stats, angle, scale, squashX, squashY);
  };

  return (
    <div id="schoolyard_desktop_console" className="w-full flex flex-row items-stretch justify-center gap-6 mt-2 relative select-none">
      
      {/* ==================== PANEL 1: THE LOCKER DOOR (RIGHT PANEL) ==================== */}
      <div 
        id="locker_panel" 
        className="w-[320px] shrink-0 border-4 border-black rounded-2xl p-4 shadow-[6px_6px_0px_#000000] flex flex-col gap-4 text-white relative select-none order-3"
        style={{
          backgroundColor: '#0a2318',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><circle cx='20' cy='30' r='3' fill='rgba(180,255,50,0.25)'/><circle cx='25' cy='35' r='1.5' fill='rgba(180,255,50,0.2)'/><circle cx='18' cy='42' r='1' fill='rgba(180,255,50,0.15)'/><path d='M80,90 Q95,85 85,110 T105,100' fill='none' stroke='rgba(180,255,50,0.18)' stroke-width='2.5'/><circle cx='92' cy='95' r='2' fill='rgba(180,255,50,0.25)'/><circle cx='100' cy='85' r='1.5' fill='rgba(180,255,50,0.2)'/><path d='M10,105 L35,80' fill='none' stroke='rgba(180,255,50,0.12)' stroke-width='3'/></svg>"), radial-gradient(circle at 40% 30%, #113c29 0%, #061810 100%)`,
        }}
      >
        {/* Ventilation slits to represent 90s school locker door */}
        <div className="flex flex-col gap-1.5 px-3 mb-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-2.5 bg-zinc-950 border border-zinc-900 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] opacity-90" />
          ))}
        </div>

        {/* Magnetic Whiteboard: Grosstown Gazette Leaderboard */}
        <div className="bg-white border-2 border-black text-neutral-900 p-3.5 rounded-lg shadow-md rotate-[-0.8deg] font-sans">
          <h3 className="font-extrabold text-[#991b1b] text-[15px] text-center tracking-tighter uppercase font-mono border-b-2 border-dashed border-red-200 pb-1 mb-2 leading-none">
            ✏️ GROSSTOWN GAZETTE NEWSPAPER
          </h3>
          <div className="text-center font-black uppercase text-[14px] text-stone-900 mb-2 leading-none">
            LEADERBOARD HALL
          </div>
          
          <div className="space-y-1.5 text-stone-950 text-[15px] font-mono leading-none">
            {leaderboard.map((entry, idx) => (
              <div key={idx} className="flex justify-between items-center bg-zinc-50 border border-zinc-200 px-2 py-1 select-text">
                <span className="font-bold">{idx + 1}. {entry.name}</span>
                <span className="font-extrabold text-red-600">{entry.score} PTS</span>
              </div>
            ))}
          </div>
          
          <div className="mt-3.2 border-t border-dashed border-stone-300 pt-2 flex items-center gap-1 leading-none">
            <span className="text-[14px] text-stone-900 uppercase font-black font-mono">TAG:</span>
            <input 
              type="text" 
              maxLength={4} 
              value={playerTag} 
              onChange={(e) => setPlayerTag(e.target.value.toUpperCase())}
              className="w-16 text-center border-2 border-dashed border-zinc-400 bg-zinc-50 font-bold text-stone-850 text-[15px] py-0.5 rounded focus:outline-none"
            />
            <button 
              onClick={() => saveToLeaderboard(playerTag, score)}
              className="py-1 px-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-black text-[13px] rounded-md border border-black shadow-[1.5px_1.5px_0px_#000] active:translate-y-0.5 cursor-pointer leading-none uppercase ml-auto"
            >
              SAVE
            </button>
          </div>
        </div>

        {/* Taped Cassette Power-ups / Stickers */}
        <div className="flex flex-col gap-2.5 mt-1 border-t border-dashed border-zinc-800 pt-3">
          <span className="text-[13px] text-[#39ff14] font-mono tracking-widest text-center uppercase font-black">☣️ EQUIPMENT MODULES ☣️</span>
          
          {/* Power Up 1: Snot Rag Bomb styled as a taped Cassette */}
          <button
            onClick={() => {
              if (snotRagCharges <= 0 || isGameOver) return;
              setPowerupMode(prev => prev === 'snotRag' ? 'none' : 'snotRag');
            }}
            disabled={snotRagCharges <= 0 || isGameOver}
            className={`w-full group p-2.5 rounded-lg border-2 border-black flex items-center justify-between gap-3 shadow-[3px_3px_0px_#000] active:shadow-none active:translate-y-0.5 transition cursor-pointer ${
              powerupMode === 'snotRag' 
                ? 'bg-[#39ff14] text-black ring-2 ring-[#39ff14]/50 ring-offset-2 ring-offset-zinc-900' 
                : 'bg-zinc-800 text-white hover:bg-zinc-700'
            } disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <div className="w-12 h-12 rounded border-2 border-black overflow-hidden flex-shrink-0 bg-black">
              <img src="/src/assets/images/snot_rag_bomb_1779614299964.png" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col items-start leading-none text-left min-w-0">
              <span className="text-[13.5px] font-black uppercase truncate leading-none mb-1">SNOT BOMBER</span>
              <span className="text-[12.5px] font-mono font-black text-zinc-100 uppercase">CHARGES: {snotRagCharges}/2</span>
            </div>
          </button>

          {/* Power Up 2: Settle Stack styled as a cassette */}
          <button
            onClick={triggerShakeDumpster}
            disabled={shakeCharges <= 0 || isGameOver || isShaking}
            className={`w-full group p-2.5 rounded-lg border-2 border-black flex items-center justify-between gap-3 shadow-[3px_3px_0px_#000] active:shadow-none active:translate-y-0.5 transition cursor-pointer ${
              isShaking 
                ? 'bg-amber-500 text-black ring-2 ring-amber-500/50 ring-offset-2 ring-offset-zinc-900' 
                : 'bg-zinc-800 text-white hover:bg-zinc-700'
            } disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <div className="w-12 h-12 rounded border-2 border-black overflow-hidden flex-shrink-0 bg-black">
              <img src="/src/assets/images/dumpster_shake_1779614314507.png" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col items-start leading-none text-left min-w-0">
              <span className="text-[13.5px] font-black uppercase truncate leading-none mb-1">DUMP SHAKER</span>
              <span className="text-[12.5px] font-mono font-black text-zinc-100 uppercase">CHARGES: {shakeCharges}/3</span>
            </div>
          </button>

          {/* Power Up 3: Hall Pass emergency slip (Visible only after drafting) */}
          {passives.hallPassCharges > 0 && (
            <button
              onClick={useHallPass}
              disabled={isGameOver}
              className="w-full group p-2.5 rounded-lg border-2 border-black flex items-center justify-between gap-3 bg-[#fbbf24] hover:bg-[#f59e0b] text-black shadow-[3px_3px_0px_#000] active:shadow-none active:translate-y-0.5 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <div className="w-12 h-12 rounded border-2 border-black overflow-hidden flex-shrink-0 bg-yellow-100 flex items-center justify-center text-2xl">
                🎟️
              </div>
              <div className="flex-1 flex flex-col items-start leading-none text-left min-w-0">
                <span className="text-[14.5px] font-black uppercase truncate leading-none mb-1 text-neutral-950">HALL PASS</span>
                <span className="text-[11.5px] font-mono font-black text-amber-950 uppercase">USES LEFT: {passives.hallPassCharges}</span>
              </div>
            </button>
          )}
        </div>

        {/* Crumpled paper ledger console taped to locker door */}
        <div className="bg-[#fcfbee] text-stone-900 p-3 rounded-md border-2 border-stone-400 shadow-inner flex flex-col min-h-[140px] max-h-[160px] mt-2 rotate-[0.9deg] font-mono select-text">
          <div className="text-[12px] text-[#991b1b] font-black uppercase border-b border-dashed border-stone-300 pb-1 mb-1.5 flex justify-between select-none">
            <span>🔌 LIVE GRUNGE LOGS</span>
            <span className="animate-pulse text-emerald-700 font-extrabold">● LIVE</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1.2 pr-0.5 text-[12.5px] leading-tight select-text scrollbar-thin">
            {logs.map((log, i) => (
              <div key={i} className="text-stone-900 tracking-tight leading-snug break-all font-mono font-medium">
                <span className="text-stone-500 text-[11px] mr-1 select-none font-bold">[{log.timestamp?.slice(-8)}]</span>
                {log.message}
              </div>
            ))}
          </div>
        </div>

        {/* Lock details */}
        <div className="text-[11.5px] font-mono text-zinc-300 text-center select-none font-extrabold tracking-wider mt-2">
          LOCKER NO. 99 // PROPERTY OF DETENTION HALL
        </div>
      </div>

      {/* ==================== PANEL 2: THE VENTILATION CHUTE CANVASES (CENTER PIECE) ==================== */}
      <div 
        id="play_chute_column" 
        className="shrink-0 flex flex-col items-center order-2 transition-[width] duration-500 ease-in-out"
        style={{ width: passives.bribedJanitor ? '980px' : '960px' }}
      >
        {/* Arcade scoreboard details */}
        <div 
          id="chute_scoreboard" 
          className="w-full border-4 border-black rounded-t-2xl p-4 flex flex-col select-none shadow-[4px_4px_0px_#000000] relative overflow-hidden transition-[max-width] duration-500 ease-in-out"
          style={{
            maxWidth: passives.bribedJanitor ? '980px' : '960px',
            backgroundColor: 'rgba(15, 15, 15, 0.85)',
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><path d='M0,15 L120,15 M0,45 L120,45 M0,75 L120,75 M0,105 L120,105' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1.2'/><path d='M25,0 L25,120' fill='none' stroke='rgba(239,68,68,0.1)' stroke-width='1.5'/><path d='M110,15 Q115,22 108,30 M45,75 Q55,85 58,65' fill='none' stroke='rgba(0,191,255,0.08)' stroke-width='1.5' stroke-linecap='round'/><path d='M80,45 Q70,55 90,62' fill='none' stroke='rgba(255,255,255,0.02)' stroke-width='1.5'/></svg>")`,
            backgroundSize: '120px 120px',
          }}
        >
          {/* Soft noise texture overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1.5px)] opacity-5 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-5">
              <div>
                <span className="text-[13px] text-rose-400 font-mono block leading-none select-none uppercase mb-1 font-black">RECORD HIGH SCORE:</span>
                <span className="text-2xl sm:text-3xl font-black text-rose-500 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] leading-none select-text">{highScore}</span>
              </div>
              <div className="border-l-2 border-zinc-700 h-8 self-center" />
              <div>
                <span className="text-[13px] text-yellow-400 font-mono block leading-none select-none uppercase mb-1 font-black">ACTIVE RUN SCORE:</span>
                <span ref={scoreSpanRef} className="text-4xl sm:text-5xl font-black text-[#ffff00] drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] leading-none transition-transform select-text origin-center inline-block">{score}</span>
              </div>
            </div>

            {/* Quick pre-loaders guide */}
            <div className="flex items-center gap-3">
              <div className="bg-stone-50/80 border-2 border-black p-2 rounded shadow-sm flex items-center gap-2">
                <span className="text-[12px] text-stone-900 font-black uppercase font-mono leading-none">HELD DECK:</span>
                <div className="flex items-center gap-1 leading-none select-none">
                  <span className="w-2.5 h-2.5 rounded-full border border-black shadow-[1px_1px_0px_#000]" style={{ backgroundColor: EVOLUTIONARY_LADDER[onDeckTier]?.color }} />
                  <span className="text-sm text-stone-950 mt-0.5 font-black uppercase tracking-tight">{EVOLUTIONARY_LADDER[onDeckTier]?.name}</span>
                </div>
              </div>

              <div className="bg-stone-50/80 border-2 border-black p-2 rounded shadow-sm flex items-center gap-2">
                <span className="text-[12px] text-stone-900 font-black uppercase font-mono leading-none">UPNEXT:</span>
                <div className="flex items-center gap-1 leading-none select-none animate-pulse">
                  <span className="w-2.5 h-2.5 rounded-full border border-black shadow-[1px_1px_0px_#000]" style={{ backgroundColor: EVOLUTIONARY_LADDER[nextDropTier]?.color }} />
                  <span className="text-sm text-stone-950 mt-0.5 font-black uppercase tracking-tight">{EVOLUTIONARY_LADDER[nextDropTier]?.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 16:9 Central interactive Canvas container */}
        <div 
          id="physics_wrapper" 
          className="relative border-x-4 border-b-4 border-black select-none overflow-hidden aspect-[16/9] rounded-b-2xl shadow-[6px_6px_0px_#000000] transition-[width,height] duration-500 ease-in-out"
          style={{ 
            width: passives.bribedJanitor ? '980px' : '960px',
            height: passives.bribedJanitor ? '551.25px' : '540px',
            transform: isShaking ? `translate(${shakeOffset.x}px, ${shakeOffset.y}px)` : 'none',
            transition: 'transform 0.05s ease-out, width 0.5s ease-in-out, height 0.5s ease-in-out',
            backgroundColor: '#52662c',
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><path d='M0,0 L40,40 M40,0 L0,40' fill='none' stroke='rgba(224,184,34,0.18)' stroke-width='1.5'/></svg>")`,
          }}
        >
          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className={`block cursor-crosshair ${powerupMode === 'snotRag' ? 'cursor-cell' : ''} touch-none w-full h-full`}
          />

          {/* Red panic border line overlay */}
          {warningActive && (
            <div className="absolute inset-0 border-4 border-red-500 pointer-events-none animate-pulse z-10" />
          )}

          {/* Game Over layout overlay */}
          {isGameOver && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center animate-fade-in z-30">
              <span className="text-5xl font-extrabold text-[#7f1d1d] tracking-wider rotate-[-2.5deg] uppercase bg-black px-5 py-3 border-4 border-[#7f1d1d] shadow-[5px_5px_0px_#000000]">
                CHUTE BLOCKED!
              </span>
              <p className="mt-4 text-sm font-mono text-zinc-400 max-w-[340px]">
                A trash specimen breached the top gestation limit safety track for over 3 seconds!
              </p>
              
              <div className="mt-6 bg-zinc-950 border-2 border-black p-4 inline-block rounded shadow-[4px_4px_0px_#000000]">
                <div className="text-[14px] font-mono text-zinc-500 uppercase">FINAL MERGE SCORE:</div>
                <div className="text-4xl font-extrabold text-[#39ff14] mt-1 select-text">{score}</div>
                <div className="mt-2 text-[14px] font-mono text-zinc-600 uppercase">
                  Logged Merges: {mergesCount} | Dom-resets: {cascadesCount}
                </div>
              </div>
              
              <button
                onClick={resetGame}
                className="mt-6 flex items-center gap-2 bg-[#ff5e00] hover:bg-[#e05200] text-black font-extrabold px-6 py-3 rounded-lg border-2 border-black tracking-tight shadow-[3px_3px_0px_#000000] cursor-pointer transition active:translate-y-0.5 select-none"
              >
                <RotateCcw className="w-5 h-5 text-black" />
                <span>DROP OUT RE-RUN</span>
              </button>
            </div>
          )}

          {/* DETENTION CONTRABAND Roguelike Draft overlay */}
          {isDrafting && (
            <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center z-30 select-none animate-in fade-in duration-300">
              <div className="rotate-[-1deg] mb-1">
                <span className="text-3xl font-black text-yellow-400 bg-black border-4 border-black px-6 py-1.5 shadow-[4px_4px_0px_rgba(0,0,0,1)] tracking-tight uppercase inline-block">
                  🚨 DETENTION CONTRABAND 🚨
                </span>
              </div>
              <p className="text-[12px] font-mono text-zinc-300 max-w-[580px] mt-1 mb-4 uppercase tracking-wider leading-tight">
                DETENTION CLOSET DISCOVERY. STASH ONE CONTRABAND PASSIVE MODULE TO SHIFT THE LAWS OF CLASS OF '99 PHYSICS IN YOUR FAVOR:
              </p>
              
              {/* Draft card options */}
              <div className="flex gap-4 justify-center items-stretch w-full max-w-[840px] px-4">
                {draftChoices.map((choiceKey) => {
                  const cardData = CONTRABAND_CARD_DETAILS[choiceKey];
                  if (!cardData) return null;
                  return (
                    <button
                      key={choiceKey}
                      onClick={() => applyDraftChoice(choiceKey)}
                      disabled={draftInputBlocked}
                      className={`flex-1 bg-zinc-900 border-4 border-black p-4 rounded-xl flex flex-col justify-between items-center text-center shadow-[5px_5px_0px_rgba(0,0,0,1)] transition-all relative group min-h-[290px] ${
                        draftInputBlocked
                          ? 'opacity-40 cursor-not-allowed pointer-events-none scale-95'
                          : 'hover:bg-zinc-850 hover:shadow-[9px_9px_0px_rgba(0,0,0,1)] hover:scale-[1.03] active:translate-y-1 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] cursor-pointer'
                      }`}
                    >
                      {/* Top badge sticker */}
                      <div className="text-4xl mb-2 filter drop-shadow-[2px_2px_0px_#000] select-none">{cardData.icon}</div>
                      
                      {/* Title block */}
                      <div 
                        className="text-lg font-black tracking-tighter uppercase mb-1 font-mono leading-none"
                        style={{ color: cardData.color }}
                      >
                        {cardData.title}
                      </div>
                      
                      {/* Divider scribble line */}
                      <div className="w-full border-b-2 border-zinc-800 border-dashed my-2" />
                      
                      {/* Gritty Zine-style flavor description */}
                      <p className="text-[10.5px] font-mono text-zinc-400 uppercase leading-normal flex-1 px-1">
                        {cardData.description}
                      </p>

                      {/* Sticky tag on bottom */}
                      <div className="mt-4 bg-zinc-950 font-mono text-[10px] font-bold px-3 py-1.5 border-2 border-black uppercase text-zinc-500 rounded group-hover:text-yellow-400 group-hover:bg-[#fbbf24]/10 transition">
                        {draftInputBlocked ? 'LOCKING IN...' : 'STASH PASSIVE'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Short-cuts tip footer info */}
        <div className="mt-3.5 flex justify-between items-center text-[14.5px] font-mono text-white bg-zinc-900 border-2 border-dashed border-zinc-700 px-3 py-2 rounded-lg w-full max-w-[1440px] select-none text-center">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-zinc-400" />
            <span>AIM: Move Mouse / Keyboard Left/Right Arrows</span>
          </div>
          <div className="hidden sm:block text-zinc-600">|</div>
          <div>RELEASE: Click / Touch Canvas or Hit Spacebar</div>
        </div>
      </div>

      {/* ==================== PANEL 3: TOXIC YEARBOOK OF '99 (LEFT PANEL) ==================== */}
      <div 
        id="yearbook_panel" 
        className="w-[320px] shrink-0 border-4 border-black p-4 rounded-2xl shadow-[6px_6px_0px_#000000] flex flex-col items-center relative select-none text-zinc-100 rotate-[-0.3deg] font-sans order-1"
        style={{
          backgroundColor: '#1b1124',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><path d='M10,10 Q25,35 15,60 T35,110 M60,5 Q75,45 100,60 T85,115 M110,10 Q100,50 115,100' fill='none' stroke='rgba(0,191,255,0.22)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/><path d='M15,60 Q40,65 50,45 T85,60' fill='none' stroke='rgba(0,191,255,0.15)' stroke-width='1' stroke-linecap='round'/></svg>"), radial-gradient(circle at center, #2e183b 0%, #11081a 100%)`,
        }}
      >
        {/* Binder binder slots running down on the right boundary */}
        <div className="absolute right-[-11px] inset-y-0 flex flex-col justify-around py-6 select-none pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full bg-stone-800 border-2 border-black shadow-md" />
          ))}
        </div>

        {/* Yearbook titles */}
        <div className="w-full flex flex-col items-center border-b border-dashed border-stone-600 pb-2 mb-4">
          <span className="text-[16px] text-zinc-100 font-mono tracking-widest font-black uppercase">
            CLASS OF '99
          </span>
          <span className="text-[14px] text-pink-400 font-extrabold uppercase tracking-tight mt-0.5 animate-pulse">
            ✏️ SENIOR DOSSIER MATRIX
          </span>
        </div>

        {/* Circular sewer ring flow map (The Evolution Ring) */}
        <div className="w-[190px] h-[190px] relative mt-1 mb-5 flex items-center justify-center scale-[1.01]">
          {/* Conduit pipe background line layout */}
          <svg className="absolute inset-0 w-full h-full rotate-0 overflow-visible" viewBox="0 0 100 100">
            {/* Outline ring contour */}
            <circle cx="50" cy="50" r="37.5" fill="none" stroke="#000000" strokeWidth="10" />
            {/* Steel sewer backup pipeline */}
            <circle cx="50" cy="50" r="37.5" fill="none" stroke="#d5ceb8" strokeWidth="7" />
            
            {/* Warning symbols */}
            <text x="50" y="16.5" fill="#39ff14" className="opacity-80 text-[5px] font-mono font-bold select-none text-center" textAnchor="middle">⚡</text>
            <text x="83.5" y="52" fill="#39ff14" className="opacity-80 text-[5px] font-mono font-bold select-none text-center" textAnchor="middle">☣️</text>
            <text x="50" y="86.5" fill="#39ff14" className="opacity-80 text-[5px] font-mono font-bold select-none text-center" textAnchor="middle">⚡</text>
            <text x="16.5" y="52" fill="#39ff14" className="opacity-80 text-[5px] font-mono font-bold select-none text-center" textAnchor="middle">☣️</text>
          </svg>

          {/* Highlighted Current Ball in the center of the ring utilizing drawClassmate() equivalent ClassmateVisualCanvas */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center select-none pointer-events-none">
            <div className="w-[82px] h-[82px] rounded-full border-4 border-black bg-zinc-950 flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)] relative overflow-hidden">
              <ClassmateVisualCanvas tier={onDeckTier} size={74} />
            </div>
          </div>

          {/* Eleven character nodes surrounding loop utilizing identical ClassmateVisualCanvas inside exactly 44px boundaries */}
          {Array.from({ length: 11 }).map((_, index) => {
            const tierNum = index + 1;
            const angleDeg = (index * 360) / 11 - 90; // Align top-center node first
            const angleRad = (angleDeg * Math.PI) / 180;
            const distance = 37.5;
            const xPos = 50 + Math.cos(angleRad) * distance;
            const yPos = 50 + Math.sin(angleRad) * distance;
            
            const isCurrent = tierNum === onDeckTier;
            const isNext = tierNum === nextDropTier;
            const isHovered = tierNum === hoveredTier;
            
            const scaleX = isHovered ? 1.25 : isCurrent ? 1.12 : isNext ? 1.06 : 1.0;
            const scaleY = isHovered ? 1.16 : isCurrent ? 1.12 : isNext ? 1.06 : 1.0;
            const shadowStyle = isHovered 
              ? '4px 6px 12px rgba(0, 0, 0, 0.45), 3px 3px 0px #000000'
              : '2px 2px 0px #000000';
            
            return (
              <div 
                key={tierNum}
                onMouseEnter={() => setHoveredTier(tierNum)}
                onMouseLeave={() => setHoveredTier(null)}
                onClick={() => setHoveredTier(prev => prev === tierNum ? null : tierNum)}
                className={`absolute rounded-full border-2 border-black overflow-hidden cursor-pointer flex items-center justify-center bg-zinc-950 ${
                  isHovered 
                    ? 'z-30 brightness-110 !border-red-600' 
                    : isCurrent 
                      ? 'ring-2 ring-stone-200 z-20'
                      : isNext 
                        ? 'ring-2 ring-orange-500 z-20'
                        : 'opacity-90 hover:opacity-100'
                }`}
                style={{ 
                  left: `${xPos}%`, 
                  top: `${yPos}%`, 
                  width: '44px',
                  height: '44px',
                  transform: `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`,
                  boxShadow: shadowStyle,
                  transition: 'transform 0.45s cubic-bezier(0.175, 0.885, 0.42, 1.55), box-shadow 0.35s cubic-bezier(0.175, 0.885, 0.42, 1.55), border-color 0.2s ease, opacity 0.2s ease',
                }}
                title={`T${tierNum}: ${EVOLUTIONARY_LADDER[tierNum]?.name}`}
              >
                <ClassmateVisualCanvas tier={tierNum} size={40} />

                {/* Micro visual overlay held/next badges */}
                {isCurrent && (
                  <span className="absolute bottom-0 inset-x-0 bg-stone-950 text-white font-mono font-extrabold text-[5.5px] text-center leading-tight tracking-tighter uppercase px-0.5 pointer-events-none">
                    HELD
                  </span>
                )}
                {isNext && !isCurrent && (
                  <span className="absolute bottom-0 inset-x-0 bg-orange-600 text-white font-mono font-extrabold text-[5.5px] text-center leading-tight tracking-tighter uppercase px-0.5 pointer-events-none">
                    NEXT
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Specimen scanner dossier read-outs */}
        <div 
          id="dossier_panel"
          className="w-full border-2 border-black rounded-lg p-2.5 font-mono shadow-[2.5px_2.5px_0px_#000000] select-text text-white"
          style={{
            backgroundColor: '#3b0f4d',
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><path d='M5,15 Q30,10 40,35 T80,45 T95,95' fill='none' stroke='rgba(92,64,51,0.5)' stroke-width='4' stroke-linecap='round'/><path d='M10,85 Q40,90 60,65 T90,35' fill='none' stroke='rgba(92,64,51,0.35)' stroke-width='6' stroke-linecap='round'/></svg>"), radial-gradient(circle at center, #4d1566 0%, #20042d 100%)`,
          }}
        >
          <div className="flex items-center justify-between border-b border-dashed border-purple-450 pb-1.5 mb-2 select-none">
            <span className="text-[12.5px] text-[#39ff14] font-extrabold tracking-wider uppercase flex items-center gap-1 leading-none">
              <span className="w-1.5 h-1.5 bg-[#39ff14] rounded-full animate-ping"></span> MUTANT DOSSIER SCANNER
            </span>
            <span className="text-[11.5px] text-fuchsia-300 uppercase font-black">
              LIVE
            </span>
          </div>

          {(() => {
            const displayTier = hoveredTier !== null ? hoveredTier : onDeckTier;
            const tierInfo = EVOLUTIONARY_LADDER[displayTier];
            if (!tierInfo) return null;

            return (
              <div className="space-y-2 leading-none">
                {/* Header info with procedural thumbnail sync */}
                <div className="flex items-center gap-2 select-none">
                  <div className="w-11 h-11 rounded border-2 border-black flex-shrink-0 flex items-center justify-center bg-zinc-950 shadow-md">
                    <ClassmateVisualCanvas tier={displayTier} size={38} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] text-purple-305 font-extrabold uppercase leading-none">
                      SPECIMEN RE-RUN T{tierInfo.tier} // 11
                    </div>
                    <div className="text-[15px] font-black uppercase truncate mt-1 leading-none text-white border-b border-dotted border-purple-550 pb-0.5">
                      {tierInfo.name}
                    </div>
                  </div>
                </div>

                {/* Description Body */}
                <p className="text-[12.5px] leading-snug text-zinc-100 font-semibold bg-black/45 p-1.5 rounded border border-purple-900/50 italic select-text">
                  "{tierInfo.description}"
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-1.5 px-0.5 text-[11.5px] text-purple-200 border-t border-purple-900/60 pt-1.5 mt-0.5">
                  <div>
                    <span className="text-purple-300 block uppercase text-[10.5px] leading-none mb-0.5 select-none font-bold">HAZARD STAIN:</span>
                    <span className="font-extrabold text-white">
                      {tierInfo.tier <= 3 ? 'Class-1 Slime' : tierInfo.tier <= 6 ? 'Class-2 Bile' : tierInfo.tier <= 9 ? 'Class-3 Gunk' : 'Class-4 Titan'}
                    </span>
                  </div>
                  <div>
                    <span className="text-purple-300 block uppercase text-[10.5px] leading-none mb-0.5 select-none font-bold">SUIKA RAD:</span>
                    <span className="font-extrabold text-white">{tierInfo.radius}px width</span>
                  </div>
                </div>

                {/* Evolution Flow */}
                <div className="mt-2 bg-black/35 p-1 rounded border border-dashed border-purple-700 text-[12px] text-zinc-100 flex items-center justify-between select-text leading-none">
                  <span className="text-purple-300 text-[10.5px] font-bold select-none">FUSION DESTINATION:</span>
                  {tierInfo.tier < 11 ? (
                    <span className="font-black uppercase text-[11.5px]" style={{ color: EVOLUTIONARY_LADDER[tierInfo.tier + 1].color }}>
                      ➔ {EVOLUTIONARY_LADDER[tierInfo.tier + 1].name}
                    </span>
                  ) : (
                    <span className="font-black uppercase text-red-400 animate-pulse text-[11.5px] tracking-tight">
                      ☣️ LIQUIDATION WAVE
                    </span>
                  )}
                </div>
              </div>
            );
          })()}
        </div>

        {/* Atmospheric Location sub-header */}
        <div className="mt-4 pt-3 w-full border-t border-purple-900/40 text-center select-none font-mono">
          <span className="text-[11px] font-black tracking-widest text-[#39ff14] uppercase block animate-pulse">
            LOCATION: THE DETENTION CHUTE
          </span>
          <span className="text-[9px] text-purple-400 font-extrabold uppercase mt-0.5 block tracking-tighter">
            GE gestation quarantine sector
          </span>
        </div>
      </div>

    </div>
  );
}
