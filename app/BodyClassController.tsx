'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Body({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [pageClass, setPageClass] = useState('');

  useEffect(() => {
    let className = '';

    if (pathname === '/') {
      className = 'home-page';
    } else if (pathname.startsWith('/bride')) {
      className = 'bride-page';
    } else if (pathname.startsWith('/groom')) {
      className = 'groom-page';
    } else if (pathname.startsWith('/location')) {
      className = 'location-page';
    } else if (pathname.startsWith('/rsvp')) {
      className = 'rsvp-page';
    } else if (pathname.startsWith('/settings')) {
      className = 'settings-page';
    }

    // Check for saved theme
    const savedTheme = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme='))
      ?.split('=')[1];

    const themeClass = savedTheme || 'theme-neon';

    // Combine theme + page class
    setPageClass(`${themeClass} ${className}`);
  }, [pathname]);

  return <body className={pageClass}>{children}</body>;
}
