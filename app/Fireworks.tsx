'use client';

import { useEffect } from 'react';

export default function Fireworks() {
  useEffect(() => {
    const fireColors = ['#ff4500', '#ff8c00', '#ffd700', '#ff6347', '#ffa500', '#ffff00'];

    const createFirework = (x: number, y: number) => {
      const particle = document.createElement('div');
      particle.className = 'firework-particle';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

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
