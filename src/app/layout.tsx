import type { Metadata } from 'next';
import { Bebas_Neue, DM_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import LenisProvider from '@/components/LenisProvider';
import Loader from '@/components/Loader';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mugunth.dev'),
  title: {
    default: 'Mugunth — Full Stack Engineer',
    template: '%s · Mugunth',
  },
  description: 'Full stack engineer crafting end-to-end digital products. React, Next.js, Node.js, Java Spring Boot.',
  keywords: ['Full Stack Developer', 'Next.js', 'React', 'Software Engineer', 'Mugunth'],
  authors: [{ name: 'Mugunth', url: 'https://mugunth.dev' }],
  creator: 'Mugunth',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mugunth.dev',
    siteName: 'Mugunth · Full Stack Engineer',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@mugunth140',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmMono.variable}`}>
      <head>
        <link rel="preload" href="/fonts/PPNeueMontreal-Book.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/PPNeueMontreal-Medium.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Mugunth',
              url: 'https://mugunth.dev',
              jobTitle: 'Full Stack Engineer',
              sameAs: ['https://github.com/mugunth140', 'https://linkedin.com/in/mugunthrp'],
            }),
          }}
        />
      </head>
      <body>
        <LenisProvider>
          <CustomCursor />
          <Loader>
            <Navbar />
            {children}
            <Footer />
          </Loader>
        </LenisProvider>
      </body>
    </html>
  );
}
