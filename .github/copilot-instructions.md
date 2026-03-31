# Copilot Instructions

## Commands

```bash
bun dev          # Start dev server (Turbopack, port 3000)
bun run build    # Production build
bun run lint     # ESLint with Next.js rules
bun run format   # Prettier formatting
```

No test suite configured. Pre-commit runs Prettier; pre-push runs lint.

## Architecture

**Next.js 15 App Router** portfolio site with GSAP animations and Tailwind CSS 4.

```
src/
├── app/           # Routes: /, /about, /blog, /contact, /work
│   └── api/       # API routes (contact form via Resend)
├── components/    # React components (JSX)
├── constants/     # Static data (PROJECTS, SKILLS, ABOUT, etc.)
├── plugins/       # GSAP setup with ScrollTrigger
├── mobile/        # Mobile-specific components
└── utility/       # Utility CSS
```

**Key patterns:**

- Import alias: `@/*` maps to `./src/*`
- Components use `'use client'` directive for client-side interactivity
- GSAP animations initialized in `src/plugins/gsap.plugin.js`, imported in root layout
- Custom cursor system requires `custom-cursor-enabled` class on body

## Conventions

**Styling:**

- Tailwind CSS 4 with custom theme in `globals.css` (`@theme` block)
- Custom fonts: `font-primary` (NeueMontreal), `font-humane` (Humane display)
- Color tokens: `primary`, `secondary`, `tertiary`, `dark`

**Components:**

- Functional components with `useRef` + `useGSAP` hook for animations
- `Magnetic` wrapper adds hover magnetic effect to children
- `Btn` component with configurable `backgroundColor` prop (uses LCH colors)

**Data:**

- All portfolio content lives in `src/constants/data.constant.js`
- Routes defined in `src/constants/routes.constant.js`

**Environment:**

- Copy `.env.example` to `.env.local`
- Requires `RESEND_API_KEY` for contact form

## Deployment

Docker-based deployment to Azure VM via GitHub Actions. Push to `main` triggers build → Docker Hub → SSH deploy.
