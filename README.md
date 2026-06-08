# MATRIX - Agampreet Singh Portfolio

MATRIX is a futuristic, interaction-heavy developer portfolio for Agampreet Singh. It presents academic work, projects, experience, GitHub activity, and contact routes through a single-page Next.js application with WebGL backgrounds, motion-driven UI, custom cursor behavior, and procedural audio feedback.

The project uses the Next.js App Router with a client-rendered home page because the primary experience depends on browser APIs: canvas/WebGL, pointer tracking, Lenis smooth scrolling, Web Audio, and modal scroll locking.

## Highlights

- Interactive hero with a WebGL shader backdrop, draggable hanging ID card, and animated terminal profile overlay.
- Full-screen About section with education and credential modal.
- Filterable Tech Stack section for languages, web, mobile, and tools.
- Projects grid covering Gurmat Darbar, Tischtap, CESS Tech Fest, and hackathon prototypes.
- Scroll-perspective Experience console powered by Framer Motion transforms.
- Activity dashboard that fetches public GitHub profile, repository, and event data for `Agam348`, with static fallback values.
- Contact section with local form validation, social links, email, and phone actions.
- Custom cursor, Lenis smooth scrolling, animated backgrounds, and optional Web Audio synthesizer feedback.

## Tech Stack

- Framework: Next.js 16 App Router
- UI runtime: React 19
- Language: TypeScript
- Styling: Tailwind CSS v4 through `@tailwindcss/postcss`
- Animation: Framer Motion, GSAP, Lenis
- 3D and shader rendering: Three.js, React Three Fiber, React Three Drei, custom WebGL shaders
- Icons: Lucide React
- Audio: Web Audio API via `app/lib/sound.ts`
- Tooling: ESLint 9 with `eslint-config-next`

## Getting Started

### Prerequisites

- Node.js compatible with Next.js 16
- npm

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

### Production Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
app/
  components/
    About.tsx                 About section and education modal
    Activity.tsx              GitHub stats, activity feed, contribution matrix
    BackgroundGrid.tsx        Ambient canvas grid behind the page
    Contact.tsx               Contact form and social/contact links
    CustomCursor.tsx          Desktop pointer replacement and hover states
    Experience.tsx            Scroll-perspective career and role console
    Hero.tsx                  Landing section, terminal overlay, ID card
    Navbar.tsx                Section navigation and audio toggle
    Projects.tsx              Selected work cards
    TechStack.tsx             Filterable skills grid
    ThreeParticleScene.tsx    React Three Fiber particle globe scene
  lib/
    sound.ts                  Web Audio synth, click, beep, drone controls
  globals.css                 Tailwind import, theme tokens, scroll/cursor styles
  layout.tsx                  Root layout, fonts, metadata
  page.tsx                    Single-page assembly and Lenis setup

components/
  ui/
    animated-shader-hero.tsx        Hero WebGL shader surface
    container-scroll-animation.tsx  Perspective scroll wrapper
    dotted-surface.tsx              Footer WebGL dotted surface
    hanging-id-card.tsx             Draggable badge interaction
    perspective-highlight.tsx       Contact highlight effects
    woven-light-hero.tsx            Projects WebGL woven canvas
    zoom-parallax.tsx               Reusable scroll image parallax

public/
  profile.jpg
  gurmat_darbar.png
  tischtap.png
  cess_tech_fest.png
  hackathon_solutions.png
```

## Application Flow

`app/page.tsx` composes the full portfolio in this order:

1. `BackgroundGrid`
2. `CustomCursor`
3. `Navbar`
4. `Hero`
5. `About`
6. `TechStack`
7. `Projects`
8. `Experience`
9. `Activity`
10. `Contact`
11. Footer with `DottedSurface`

The page initializes Lenis once and exposes it on `window.lenis` so section components can use smooth scrolling. Modal overlays in `Hero` and `About` pause Lenis while open and restart it when closed.

## Data And Integrations

- GitHub activity is fetched client-side from the public GitHub API:
  - `https://api.github.com/users/Agam348`
  - `https://api.github.com/users/Agam348/repos?per_page=100`
  - `https://api.github.com/users/Agam348/events`
- If the GitHub requests fail or are rate-limited, `Activity.tsx` keeps static fallback commits and stats.
- The contact form currently simulates submission locally with validation and a success state. It does not send email or call a backend endpoint.
- Audio starts muted by default. Users can enable it from the navbar; the first page click can start the ambient drone only when audio is unmuted.

## Design Notes

- The visual language is dark, high-contrast, and cybernetic, using Orbitron, Space Grotesk, and Sora from `next/font/google`.
- Most page sections are browser-only client components due to animation, audio, scroll, and canvas dependencies.
- Tailwind v4 theme tokens and animation helpers live in `app/globals.css`.
- The repository includes several reusable visual primitives under `components/ui`, including demo files that are not part of the main page route.

## Deployment

This app can be deployed to Vercel or any platform that supports Next.js 16.

Recommended deployment settings:

- Install command: `npm install`
- Build command: `npm run build`
- Start command: `npm run start`

No environment variables are required for the current implementation.

## Maintenance Notes

- Before changing Next.js APIs or file conventions, read the local documentation in `node_modules/next/dist/docs/` as noted in `AGENTS.md`.
- Keep browser-only code inside client components.
- Be mindful of GitHub API rate limits in the Activity section.
- If real contact delivery is needed, add an API route or external form service and replace the simulated timeout in `app/components/Contact.tsx`.
