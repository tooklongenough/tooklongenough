'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

function padNumber(num: number, length: number) {
  return num.toString().padStart(length, '0');
}

export default function OdometerCounter() {
  const [count, setCount] = useState<number | null>(null);
  const pathname = usePathname();
  const [display, setDisplay] = useState<string>('0000');

  useEffect(() => {
    console.log("getting fetch count");
    async function fetchCount() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_SUPABASE_API_URL || '';
        const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
        const response = await fetch(`${apiUrl}/functions/v1/get-visit-counts`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });
        const data = await response.json();
        const found = Array.isArray(data)
          ? data.find((row) => row.route === pathname)
          : null;
        console.log("page visits", found);
        setCount(found ? found.count : 0);
      } catch (e) {
        setCount(0);
      }
    }
    fetchCount();
  }, [pathname]);

  // Animate the odometer effect
  useEffect(() => {
    if (count === null) return;

    const target = padNumber(count, 4);
    let current = display;
    let frame = 0;
    const totalFrames = 30;

    const animate = () => {
      frame++;
      if (frame >= totalFrames) {
        setDisplay(target);
        return;
      }

      const progress = frame / totalFrames;
      let newDisplay = '';
      for (let i = 0; i < 4; i++) {
        const currentDigit = parseInt(current[i]);
        const targetDigit = parseInt(target[i]);
        const diff = targetDigit - currentDigit;
        const newDigit = Math.round(currentDigit + diff * progress);
        newDisplay += newDigit.toString();
      }
      setDisplay(newDisplay);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [count]);

  return (
    <div className="text-center text-sm text-gray-500 mt-4">
      <div className="font-mono text-lg">
        {display} visitors
      </div>
    </div>
  );
} 