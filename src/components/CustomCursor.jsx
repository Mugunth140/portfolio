'use client';

import { useEffect, useRef, useCallback } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"], [data-cursor]';

// Cached label extraction - only compute when element changes
const getLabel = (element) => {
  if (!element) return '';
  const raw = element.getAttribute('data-cursor') || element.getAttribute('aria-label') || element.textContent || '';
  return raw.replace(/\s+/g, ' ').trim().split(' ').slice(0, 2).join(' ').slice(0, 16) || 'View';
};

// Smooth interpolation factors
const LERP_FACTOR = 0.18;
const LERP_FACTOR_ACTIVE = 0.14;

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const innerDotRef = useRef(null);
  const outerRingRef = useRef(null);
  const glowRef = useRef(null);
  const labelRef = useRef(null);

  // Position state stored in refs for RAF access
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const isVisible = useRef(false);
  const isActive = useRef(false);
  const isPressed = useRef(false);
  const activeElement = useRef(null);

  const animate = useCallback(() => {
    const lerp = isActive.current ? LERP_FACTOR_ACTIVE : LERP_FACTOR;

    // Interpolate position
    pos.current.x += (target.current.x - pos.current.x) * lerp;
    pos.current.y += (target.current.y - pos.current.y) * lerp;

    // Apply transform (GPU-accelerated)
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const innerDot = innerDotRef.current;
    const outerRing = outerRingRef.current;
    const glow = glowRef.current;
    const label = labelRef.current;

    if (!cursor || !innerDot || !outerRing || !glow || !label) return;

    // Check for fine pointer (mouse)
    const pointerQuery = window.matchMedia('(pointer: fine)');
    if (!pointerQuery.matches) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getInteractive = (el) => {
      if (!(el instanceof Element)) return null;
      return el.closest(INTERACTIVE_SELECTOR);
    };

    const show = () => {
      if (isVisible.current) return;
      isVisible.current = true;
      cursor.classList.add('visible');
    };

    const hide = () => {
      if (!isVisible.current) return;
      isVisible.current = false;
      cursor.classList.remove('visible', 'active', 'pressed');
      isActive.current = false;
      isPressed.current = false;
      activeElement.current = null;
    };

    const setActive = (element) => {
      const shouldBeActive = Boolean(element);

      if (isActive.current === shouldBeActive && activeElement.current === element) return;

      isActive.current = shouldBeActive;
      activeElement.current = element;

      if (shouldBeActive) {
        cursor.classList.add('active');
        label.textContent = getLabel(element);
      } else {
        cursor.classList.remove('active');
        // Delay clearing label for fade-out
        if (!reducedMotion) {
          setTimeout(() => {
            if (!isActive.current) label.textContent = '';
          }, 250);
        } else {
          label.textContent = '';
        }
      }
    };

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      // Initialize position on first move to avoid jump
      if (!isVisible.current) {
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
      }

      show();
    };

    const onOver = (e) => {
      const el = getInteractive(e.target);
      if (el !== activeElement.current) {
        setActive(el);
      }
    };

    const onOut = (e) => {
      const from = getInteractive(e.target);
      const to = getInteractive(e.relatedTarget);
      if (from && from !== to && from === activeElement.current) {
        setActive(to);
      }
    };

    const onDown = () => {
      if (isPressed.current) return;
      isPressed.current = true;
      cursor.classList.add('pressed');
    };

    const onUp = () => {
      if (!isPressed.current) return;
      isPressed.current = false;
      cursor.classList.remove('pressed');
    };

    const onLeave = () => hide();

    // Start animation loop
    rafId.current = requestAnimationFrame(animate);

    // Add class to body
    document.body.classList.add('custom-cursor-enabled');

    // Event listeners with passive where possible
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerout', onOut, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('blur', onLeave);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);

      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerout', onOut);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('blur', onLeave);
      document.removeEventListener('mouseleave', onLeave);

      document.body.classList.remove('custom-cursor-enabled');
    };
  }, [animate]);

  return (
    <div ref={cursorRef} className="cursor" aria-hidden="true">
      <div ref={glowRef} className="cursor-glow" />
      <div ref={outerRingRef} className="cursor-ring" />
      <div ref={innerDotRef} className="cursor-dot" />
      <span ref={labelRef} className="cursor-label" />
    </div>
  );
}
