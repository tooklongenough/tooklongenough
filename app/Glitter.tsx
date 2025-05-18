'use client';

import { useEffect, useRef } from 'react';

export default function Glitter() {
  const trails = useRef<HTMLDivElement[]>([]);
  const current = useRef(0);
  const colors = useRef<string[]>([]);

  useEffect(() => {
    const setGlitterColors = () => {
      const theme = document.body.classList[0]; // Check the current theme class

      if (theme === 'theme-neon') {
        colors.current = ['#ff00ff', '#00ffff', '#ffff00', '#39ff14']; // Neon pink, cyan, yellow, neon green
      } else if (theme === 'theme-vapourwave') {
        colors.current = ['#ffafcc', '#cdb4db', '#a2d2ff', '#5c5c8a']; // Pastel pinks, lavender, and soft blue
      } else if (theme === 'theme-electric') {
        colors.current = ['#1e90ff', '#32cd32', '#00ff7f', '#ffff00']; // Electric blue, neon green, yellow
      } else if (theme === 'theme-classical') {
        colors.current = ['#ffdf00', '#b38d3f', '#ff5c8d', '#7f7f00']; // Gold, brown, red, dark green
      } else {
        colors.current = ['#ff00ff', '#00ffff', '#ffff00', '#39ff14']; // Default to neon colors if theme is not set
      }

      // Update the existing trails with the new colors
      trails.current.forEach((trail, index) => {
        if (trail) {
          trail.style.backgroundColor = colors.current[index % colors.current.length];
        }
      });
    };

    // Create the sparkles
    const sparkles = 50; // Number of sparkles
    for (let i = 0; i < sparkles; i++) {
      const trail = document.createElement('div');
      trail.style.position = 'fixed';
      trail.style.width = '10px';
      trail.style.height = '10px';
      trail.style.borderRadius = '50%';
      trail.style.pointerEvents = 'none';
      trail.style.opacity = '0.8';
      trail.style.zIndex = '9999';
      trail.style.transition = 'transform 0.5s ease-out, opacity 0.8s ease-out';
      document.body.appendChild(trail);
      trails.current.push(trail);
    }

    setGlitterColors(); // Set initial colors

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const trail = trails.current[current.current];
      if (trail) {
        trail.style.left = (e.clientX - 5) + 'px';
        trail.style.top = (e.clientY - 5) + 'px';
        trail.style.opacity = '1';
        trail.style.transform = 'translateY(-10px) rotate(15deg)';
        trail.style.backgroundColor = colors.current[current.current % colors.current.length];

        setTimeout(() => {
          trail.style.opacity = '0';
          trail.style.transform = 'translateY(-30px) rotate(90deg)';
        }, 300);

        current.current = (current.current + 1) % sparkles;
      }
    };

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setGlitterColors();
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      trails.current.forEach(trail => {
        if (trail && trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      });
      trails.current = [];
    };
  }, []);

  return null;
} 