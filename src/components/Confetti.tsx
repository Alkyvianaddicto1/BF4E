/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";

interface ConfettiProps {
  active: boolean;
}

interface Particle {
  id: number;
  color: string;
  size: number;
  left: number;
  delay: number;
  duration: number;
  borderRadius: string;
}

export default function Confetti({ active }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      // Defer state update to avoid synchronous setState within effect body warning
      const clearTimer = setTimeout(() => setParticles([]), 0);
      return () => clearTimeout(clearTimer);
    }

    // Generate particles outside of the render phase to satisfy the purity rule
    const showTimer = setTimeout(() => {
      const newParticles = Array.from({ length: 45 }).map((_, i) => {
        const colors = ["#6b38d4", "#a53b22", "#fe7d5e", "#a6f2cf", "#8455ef", "#ffb4a3"];
        const color = colors[i % colors.length];
        const size = Math.random() * 12 + 8;
        const left = Math.random() * 100;
        const delay = Math.random() * 0.8;
        const duration = Math.random() * 2 + 1.5;
        const borderRadius = Math.random() > 0.5 ? "50%" : "2px";

        return {
          id: i,
          color,
          size,
          left,
          delay,
          duration,
          borderRadius,
        };
      });
      setParticles(newParticles);
    }, 0);

    const hideTimer = setTimeout(() => setParticles([]), 6000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [active]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-bounce"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            left: `${p.left}%`,
            top: `-20px`,
            borderRadius: p.borderRadius,
            opacity: 0.9,
            animation: `confettiFloatDown ${p.duration}s ease-out forwards`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}