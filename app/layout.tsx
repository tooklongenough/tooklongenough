import type { Metadata } from 'next';
import '../styles/globals.css';
import BodyClassController from './BodyClassController'; // Import the client-side component
import Fireworks from './Fireworks';

export const metadata: Metadata = {
  title: 'Brianna & Conor',
  description: "Your source for everything you need to know about Brianna and Conor's wedding!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>💖 Brianna & Conor's Wedding 💖</header>
        <nav>
          <a href="/">Home</a>
          <a href="/bride">Meet the Bride</a>
          <a href="/groom">Meet the Groom</a>
          <a href="/location">St. Norbert Art Centre</a>
          <a href="/rsvp">RSVP</a>
        </nav>
        <BodyClassController />
        
        <Fireworks />

        {children}

        {/* Sparkly Glitter Mouse Trail */}
        <script src="../glitter.js" />
      </body>
    </html>
  );
}
