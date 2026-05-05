'use client';
import { ROUTES, SOCIALS } from '@/constants/routes.constant';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(useGSAP);

// isActive = true  → menu CLOSED
// isActive = false → menu OPEN
const HamMenu = () => {
  const [isActive, setIsActive] = useState(true);
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const toggleMenu = () => setIsActive((prev) => !prev);
  const isActiveRoute = (path) => pathname === path || (path !== '/' && pathname.startsWith(`${path}/`));

  // Close menu when route changes
  useEffect(() => {
    setIsActive(true);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (!isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isActive]);

  useGSAP(() => {
    const hamTl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    // Button bg toggles between dark secondary (closed) and tertiary accent (open)
    hamTl.to(
      '#ham-menu',
      {
        backgroundColor: isActive ? 'lch(10.75 2.24 272.76)' : 'lch(44.13 80.66 290.69)',
        borderColor: isActive ? 'lch(10.75 2.24 272.76)' : 'lch(44.13 80.66 290.69)',
        duration: 0.35,
      },
      0,
    );

    // Lines cross into X
    hamTl.to(
      '#ham-item-1',
      { rotation: isActive ? 0 : 45, y: isActive ? 0 : 3.5, transformOrigin: 'center', duration: 0.35 },
      0,
    );
    hamTl.to(
      '#ham-item-2',
      { rotation: isActive ? 0 : -45, y: isActive ? 0 : -3.5, transformOrigin: 'center', duration: 0.35 },
      0,
    );

    // Overlay slides down / up
    hamTl.to('#ham-overlay', { y: isActive ? '-100%' : '0%', duration: 0.6 }, 0);

    // Nav items stagger in/out
    if (!isActive) {
      gsap.to('.ham-nav-item', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        delay: 0.25,
        ease: 'expo.out',
      });
      gsap.to('.ham-social-item', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        delay: 0.45,
        ease: 'expo.out',
      });
    } else {
      gsap.to(['.ham-nav-item', '.ham-social-item'], {
        opacity: 0,
        y: 12,
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  }, [isActive]);

  return (
    <>
      {/* ── Hamburger button ── */}
      <button
        className="md:hidden border rounded-full border-color-secondary bg-secondary flex items-center justify-center flex-col gap-1.75 z-50 cursor-pointer will-change-auto transition-all duration-300"
        style={{ width: '56px', height: '56px' }}
        id="ham-menu"
        onClick={toggleMenu}
        aria-label={isActive ? 'Open menu' : 'Close menu'}
        aria-expanded={!isActive}
      >
        <span className="bg-white h-px w-6 block transition-colors" id="ham-item-1" />
        <span className="bg-white h-px w-6 block transition-colors" id="ham-item-2" />
      </button>

      {/* ── Full-screen overlay ── */}
      <div
        ref={overlayRef}
        id="ham-overlay"
        className="md:hidden fixed h-dvh w-full bg-secondary -translate-y-full top-0 left-0 z-40 flex flex-col justify-between will-change-transform overflow-y-auto"
        style={{ padding: 'min(2rem, 4vw)' }}
      >
        {/* Nav links */}
        <nav className="pt-16 sm:pt-20">
          <p
            className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-white/30 mb-6 sm:mb-8"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Navigation
          </p>
          <ul className="flex flex-col gap-0.5">
            {ROUTES.map((route) => (
              <li
                key={route.path}
                className="ham-nav-item opacity-0 overflow-hidden"
                style={{ transform: 'translateY(12px)' }}
              >
                <Link
                  href={route.path}
                  onClick={toggleMenu}
                  aria-current={isActiveRoute(route.path) ? 'page' : undefined}
                  className={`block text-[11vw] sm:text-[10vw] leading-[1.1] font-medium transition-colors duration-200 ${
                    isActiveRoute(route.path) ? 'text-tertiary' : 'text-white hover:text-tertiary'
                  }`}
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer row: socials + index */}
        <div className="flex flex-col gap-6 border-t border-white/10 pt-6 sm:pt-8 pb-6">
          <ul className="flex flex-wrap gap-4 sm:gap-6">
            {SOCIALS.map((social) => (
              <li key={social.path} className="ham-social-item opacity-0" style={{ transform: 'translateY(12px)' }}>
                <Link
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] sm:text-[13px] text-white/50 hover:text-white transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-primary)' }}
                >
                  {social.name}
                </Link>
              </li>
            ))}
          </ul>
          <p
            className="text-[10px] sm:text-[11px] tracking-[0.14em] text-white/20 uppercase mt-auto"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            v3.0
          </p>
        </div>
      </div>
    </>
  );
};

export default HamMenu;
