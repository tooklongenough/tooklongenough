'use client';

import '../styles/globals.css';
import BodyClassController from './BodyClassController';
import Fireworks from './Fireworks';
import { Dancing_Script, Share_Tech_Mono } from 'next/font/google';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

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
    if (!passPhrase && pathname !== '/settings') {
      router.push('/settings');
    }
  }, [passPhrase, pathname, router]);

  return (
    <html lang="en" className={dancingScript.variable + ' ' + shareTechMono.variable}>
      <body>
        <BodyClassController>
          <header>💖 Brianna & Conor's Wedding 💖</header>
          <nav>
            <a href="/">Home</a>
            <a href="/bride">Meet the Bride</a>
            <a href="/groom">Meet the Groom</a>
            <a href="/location">St. Norbert Art Centre</a>
            <a href="/rsvp">RSVP</a>
            <a href="/registry">Registry</a>
            <a href="/settings">Settings</a>
          </nav>
          {firstName && lastName && (
            <div className="text-right pr-4 py-2 text-sm text-gray-600">
              Visiting as {firstName} {lastName}.{' '}
              <a href="/settings" className="text-blue-500 hover:underline">
                Not you? Please tell us who you are on the Settings Page!
              </a>
            </div>
          )}
          {children}
          <Fireworks />
          {/* Sparkly Glitter Mouse Trail */}
          <script src="/glitter.js" />
        </BodyClassController>
      </body>
    </html>
  );
}
