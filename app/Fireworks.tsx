'use client';

import { useEffect } from 'react';

export default function Fireworks() {
  useEffect(() => {
    const getFireworkColor = () => {
        const theme = document.body.classList[0]; // Check current theme class
    
        if (theme === 'theme-neon') {
          return ['#ff00ff', '#00ffff', '#ff00ff', '#00ff00']; // Neon bright colors
        }
    
        if (theme === 'theme-classical') {
          return ['#ffdf00', '#b38d3f', '#ff5c8d', '#7f7f00']; // Classic golds and reds
        }
    
        if (theme === 'theme-electric') {
          return ['#1e90ff', '#32cd32', '#00ff7f', '#ffff00']; // Electric blue and neon greens
        }
    
        if (theme === 'theme-vapourwave') {
          return ['#ffafcc', '#cdb4db', '#a2d2ff', '#5c5c8a']; // Pastel pinks, lavender, and soft blue
        }
    
        return ['#ff00ff', '#00ffff']; // Default for unexpected themes
      };

    const createFirework = (x: number, y: number) => {
      const particle = document.createElement('div');
      particle.className = 'firework-particle';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      const fireColors = getFireworkColor();
      const color = fireColors[Math.floor(Math.random() * fireColors.length)];
      particle.style.background = color;

      // Random launch angle and velocity
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 3 + 2; // Initial speed
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed - 5, // slight upward force
      };

      document.body.appendChild(particle);

      let life = 0;

      const animate = () => {
        life += 1;

        const gravity = 0.1; // Gravity pull
        velocity.y += gravity;

        const currentX = parseFloat(particle.style.left) || 0;
        const currentY = parseFloat(particle.style.top) || 0;

        particle.style.left = `${currentX + velocity.x}px`;
        particle.style.top = `${currentY + velocity.y}px`;

        particle.style.opacity = `${1 - life / 60}`;

        if (life < 60) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      };

      requestAnimationFrame(animate);
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 20; i++) {
        createFirework(e.clientX, e.clientY);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
