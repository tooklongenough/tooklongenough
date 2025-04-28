import type { Metadata } from 'next';
import '../styles/globals.css';
import BodyClassController from './BodyClassController'; // Import the client-side component
import Fireworks from './Fireworks';
import { Dancing_Script, Share_Tech_Mono } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Brianna & Conor',
  description: "Your source for everything you need to know about Brianna and Conor's wedding!",
};

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: '400', // or '700' if you want bold too
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
  return (
    <html lang="en" className={`${dancingScript.variable} ${shareTechMono.variable}`}>
      <body>
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
        <BodyClassController>{children}</BodyClassController>
        
        <Fireworks />

        {/* Sparkly Glitter Mouse Trail */}
        <script src="/glitter.js" />
      </body>
    </html>
  );
}
