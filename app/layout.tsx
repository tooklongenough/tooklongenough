'use client';

import '../styles/globals.css';
import BodyClassController from './BodyClassController';
import Fireworks from './Fireworks';
import Glitter from './Glitter';
import PageTransition from './components/PageTransition';
import { Dancing_Script, Share_Tech_Mono } from 'next/font/google';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { trackVisit } from './utils/visitTracker';
import OdometerCounter from './components/OdometerCounter';

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dancing-script',
});

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-share-tech-mono',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const firstName = Cookies.get('first_name');
  const lastName = Cookies.get('last_name');
  const passPhrase = Cookies.get('pass_phrase');

  useEffect(() => {
    // Track the visit
    trackVisit(pathname);
  }, [pathname]);

  useEffect(() => {
    // Load the glitter script dynamically
    const script = document.createElement('script');
    script.src = '/glitter.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <html lang="en" className={dancingScript.variable + ' ' + shareTechMono.variable}>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Monoton&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Orbitron:400,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <BodyClassController>
          <header>💖 Brianna & Conor's Wedding 💖</header>
          <nav>
            <a href="/">Home</a>
            <a href="/couple">Meet the Couple</a>
            <a href="/winnipeg">Explore Winnipeg</a>
            <a href="/location">St. Norbert Art Centre</a>
            <a href="/rsvp">RSVP</a>
            <a href="/settings">Settings</a>
          </nav>
          <div className="logged-in-as">
            {firstName && lastName && (
              <div className="text-right pr-4 py-2 text-sm text-gray-600">
                Visiting as {firstName} {lastName}.{' '}
                <a href="/settings" className="text-blue-500 hover:underline">
                  Not you? Please tell us who you are on the Settings Page!
                </a>
              </div>
            )}
          </div>
          <PageTransition>
            {children}
            <OdometerCounter />
          </PageTransition>
          <Fireworks />
          <Glitter />
        </BodyClassController>
      </body>
    </html>
  );
}
