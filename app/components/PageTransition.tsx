'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const transitions = [
  'fade',
  'dissolve',
  'checkerboard',
  'wipe-right',
  'wipe-left',
  'wipe-up',
  'wipe-down',
  'random-bars',
  'iris',
  'plus',
  'box',
  'split',
  'strips',
  'blinds',
  'newsflash'
];

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentTransition, setCurrentTransition] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    // Pick a random transition
    const randomTransition = transitions[Math.floor(Math.random() * transitions.length)];
    setCurrentTransition(randomTransition);
    setIsTransitioning(true);

    // Reset transition state after animation
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Most transitions take 1 second

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={`page-transition ${currentTransition} ${isTransitioning ? 'transitioning' : ''}`}>
      {children}
    </div>
  );
} 