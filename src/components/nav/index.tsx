'use client';

import { useEffect, useState } from "react";
import { DrawerProvider } from "../drawer/drawerContext";
import { Nav } from "./nav";
import { usePathname } from "next/navigation";

const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  md: 900,
  desktop: 1200,
  xl: 1500
} as const;

export const NavWrapper = () => {
  const [isMobileResize, setIsMobileResize] = useState<0 | 1 | 2>(0);
  const isMobile = isMobileResize === 1;
  const activePath = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileResize(window.innerWidth < BREAKPOINTS.tablet ? 1 : 2);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (activePath === '/') {
    return null;
  }

  return (
    <DrawerProvider>
      <Nav isMobile={isMobile} />
    </DrawerProvider>
  );
}