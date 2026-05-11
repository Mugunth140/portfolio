'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'outlined' | 'filled';
  className?: string;
}

export default function MagneticButton({ children, href, variant = 'outlined', className = '' }: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 22px',
    borderRadius: '100px',
    fontFamily: "'PPNeueMontreal', sans-serif",
    fontWeight: 500,
    fontSize: '13px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    overflow: 'hidden',
    transition:
      'background 0.25s cubic-bezier(0.16,1,0.3,1), color 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    outlined: {
      border: '1.5px solid var(--ink)',
      color: 'var(--ink)',
      background: 'transparent',
    },
    filled: {
      border: '1.5px solid transparent',
      background: 'var(--ink)',
      color: 'var(--bg)',
    },
  };

  const content = (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 150, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...baseStyle, ...variantStyles[variant] }}
      className={className}
      whileHover={
        variant === 'outlined'
          ? { backgroundColor: 'var(--ink)', color: 'var(--bg)' }
          : { backgroundColor: 'var(--accent)' }
      }
    >
      <span
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          pointerEvents: 'none',
        }}
      >
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto')) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-block', textDecoration: 'none' }}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} style={{ display: 'inline-block', textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return <button style={{ display: 'inline-block', border: 'none', background: 'none', padding: 0 }}>{content}</button>;
}
