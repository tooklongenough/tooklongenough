"use client"; // This marks the component as client-side

import { useEffect } from "react";
import { usePathname } from "next/navigation"; // Use Next.js navigation hook

const BodyClassController = () => {
  const pathname = usePathname();

  useEffect(() => {
    let pageClass = '';

    // Check the current path and assign the corresponding page class
    if (pathname === '/') {
      pageClass = 'home-page';
    } else if (pathname.startsWith('/bride')) {
      pageClass = 'bride-page';
    } else if (pathname.startsWith('/groom')) {
      pageClass = 'groom-page';
    } else if (pathname.startsWith('/location')) {
      pageClass = 'location-page';
    } else if (pathname.startsWith('/rsvp')) {
      pageClass = 'rsvp-page';
    }

    // Set the body class
    document.body.className = pageClass;
  }, [pathname]); // Re-run when the pathname changes

  return null; // This component doesn't render anything itself
};

export default BodyClassController;
