# MATRIX - Agampreet Singh Portfolio

MATRIX is a futuristic, highly interactive developer portfolio built for Agampreet Singh. It delivers an immersive user experience utilizing WebGL shaders, motion-driven user interfaces, custom pointer mechanics, and dynamic procedural audio feedback.

The application is structured around a single-page Next.js App Router setup. Because the core user experience relies heavily on browser APIs—including HTML5 Canvas, WebGL, custom mouse tracking, the Web Audio API, and scroll locks—almost all page sections are client-rendered, wrapped within a smooth-scrolling container powered by Lenis.

---

## ⚡ Highlights & Key Features

* **Introductory Loader:** A premium full-screen entry gate featuring the custom `Phosphor30` mathematical WebGL shader. It displays a progress bar and disables scrolling during loading before sliding up smoothly out of view.
* **Interactive Hero Grid:** Features a real-time WebGL shader backdrop (`AnimatedShaderHero`), a draggable, physics-influenced ID Card badge, and an interactive command-line terminal overlay simulating a file explorer and profile queries.
* **Biographical Section:** A full-screen overlay featuring education details, career credentials, and modal states.
* **Interactive Tech Stack:** A filterable category explorer mapping languages, frontend web libraries, mobile, and tooling/infrastructure with dynamic hover states.
* **WebGL Projects Display:** Selected production and prototype works organized in a responsive layout backed by the custom WebGL canvas mesh (`WovenCanvas`).
* **Experience Console:** A perspective 3D career timeline container utilizing Framer Motion transforms responsive to scroll inputs.
* **GitHub Dashboard:** Client-side integration fetching live user profile stats, repositories, and recent events for `Agam348` with fail-soft mock fallback datasets.
* **Contact Node:** Custom form inputs with validation, social handles, and triggers.
* **Custom Cursor:** Custom dual-ring mouse pointer overlay with trailing radial glow backplates and contextual hover expansion.
* **Procedural Synthesizer:** An optional sound manager using the Web Audio API to synthesize ambient room drone hums, button hover/click tones, glitch soundscapes, and transitions.

---

## 🛠️ Technical Stack

* **Framework:** Next.js 16 (App Router)
* **UI Runtime:** React 19 & TypeScript
* **Styling:** Tailwind CSS v4 using `@tailwindcss/postcss`
* **Animation & Motion:** Framer Motion, GSAP (GreenSock), Lenis (Smooth Scroll)
* **3D & Shader Rendering:** Three.js, React Three Fiber (R3F), React Three Drei, raw GLSL WebGL shaders
* **Typography:** Orbitron, Space Grotesk, and Sora (via `next/font/google`)
* **Vector Graphics:** Lucide React Icons
* **Audio Synthesis:** Web Audio API via `app/lib/sound.ts`
* **Asset Sourcing:** Remote devicons (`cdn.jsdelivr.net`) and simpleicons (`cdn.simpleicons.org`)

---

## 📂 Project Structure

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
    IntroLoader.tsx           Intro transition screen with compilation shader
    Navbar.tsx                Section navigation and audio toggle
    Projects.tsx              Selected work cards
    TechStack.tsx             Filterable skills grid
    ThreeParticleScene.tsx    React Three Fiber particle globe scene
  lib/
    sound.ts                  Web Audio synth, click, beep, drone controls
    utils.ts                  Tailwind merge utilities
  globals.css                 Tailwind import, theme tokens, scroll/cursor styles
  layout.tsx                  Root layout, fonts, metadata
  page.tsx                    Single-page assembly and Lenis setup

components/
  ui/
    /* Core UI Elements */
    animated-shader-hero.tsx        Hero WebGL shader surface
    container-scroll-animation.tsx  Perspective scroll wrapper
    dotted-surface.tsx              Footer WebGL dotted surface
    hanging-id-card.tsx             Draggable badge interaction
    perspective-highlight.tsx       Contact highlight effects
    phosphor-30.tsx                 Generative WebGL shader backdrop for the intro loader
    woven-light-hero.tsx            Projects WebGL woven canvas
    
    /* Playgrounds, Demo Shaders & Visual Primitives */
    animated-shader-background.tsx  Ambient shader backdrop utility
    animated-shader-hero-demo.tsx   Interactive playground for the hero shader
    cybernetic-grid-shader.tsx      Cyberpunk-themed grid backdrop component
    cybernetic-grid-shader-demo.tsx Cyberpunk grid shader playground config
    dotted-surface-demo.tsx         Playground/demo component for dotted surface
    liquid-glass-button.tsx         Button overlay with liquid canvas hover feedback
    spotlight-card.tsx              Interactive spotlight hover card with HSL border highlight
    shader-lines.tsx                Generative floating wave lines canvas
    shader-lines-demo.tsx           Playground for the floating wave lines shader
    warp-drive-shader.tsx           Cosmic warp-speed particle flow canvas
    warp-drive-shader-demo.tsx      Playground for the warp-speed shader
    web-gl-shader.tsx               Generic parent class for compiling dynamic custom shaders
    woven-light-hero-demo.tsx       Woven light grid demonstration canvas config
    zoom-parallax.tsx               Scroll-driven zoom image parallax component

public/
  profile.jpg                       Agampreet profile photo
  gurmat_darbar.png                 Gurmat Darbar project mockup
  tischtap.png                      Tischtap project mockup
  cess_tech_fest.png                CESS Tech Fest project mockup
  hackathon_solutions.png           Hackathon prototype mockup
```

---

## 🔌 Data & Integrations

### 1. GitHub API Sync
The `Activity` component performs client-side asynchronous fetches to retrieve profile metadata, repositories, and historical contribution events from the public GitHub REST API:
* Profile Data: `https://api.github.com/users/Agam348`
* Repository Catalog: `https://api.github.com/users/Agam348/repos?per_page=100`
* Contribution Feed: `https://api.github.com/users/Agam348/events`

To counter public API rate limiting or network failures, the components gracefully transition to hardcoded mock fallback statistics and commit matrices without crashing the user interface.

### 2. Procedural Web Audio Engine
The portfolio contains no static audio assets. Instead, `app/lib/sound.ts` uses the native Web Audio API to synthesize sounds in real time:
* **Ambient Drone:** A 55Hz (Low A) sawtooth waveform put through a low-pass filter centered at 100Hz with low gain (0.08) to establish an ambient, cybernetic background atmosphere.
* **Click Tones:** A sine wave oscillator mapped to 800Hz fading exponentially over 50ms (gain drops to 0.001) for button and selector responses.
* **Hover Clicks:** Localized clicks tailored for mouse-equipped pointer screens, matching hover entries.
* **Status Beeps:** Flexible oscillator triggers adjusting frequencies (e.g. 300Hz to 950Hz) and envelope durations to indicate loading states, confirmation milestones, and alert conditions.
* **Cyber Glitch Sound:** A high-speed sequence of square wave frequencies (200Hz ➔ 1200Hz ➔ 800Hz ➔ 2000Hz) compressed within 120ms to denote cybernetic terminal overrides and interactions.
* **EMP Wave:** A long (1.2s) low-frequency sweep utilizing a sawtooth oscillator sliding down from 440Hz to 20Hz alongside an envelope-driven low-pass filter (800Hz to 30Hz) for dramatic modal closures.
* **Uplink Sweep:** A rising frequency sweep (100Hz ➔ 1500Hz) spanning 800ms to emphasize contact transmissions and page loader dismissals.

*Note: In compliance with modern browser autoplay rules, audio initializes in a muted state. It can be toggled via the navbar controls, and the ambient drone will only initialize upon the first user mouse click once unmuted.*

---

## ⚡ Performance & Optimization Notes

* **Intersection Observer CPU/GPU Protection:** Dynamic WebGL canvas surfaces (`AnimatedShaderHero`, `WovenCanvas`, and `DottedSurface`) monitor their viewport status using the browser `IntersectionObserver` API. As soon as a shader moves off-screen, its active animation loop halts, bringing CPU/GPU consumption down to 0% during scroll cycles.
* **Tailwind v4 Theme System:** Custom system variables are mapped in `@theme` inside [globals.css](file:///c:/Users/agamp/Downloads/matrix/app/globals.css) (including Orbitron, Space Grotesk, Sora, and colors like `cyan-glow`, `purple-glow`, and `cyber-green`).
* **Motion Reduction Compliance:** Smooth scrolling initialization via Lenis automatically checks the user's OS preference (`prefers-reduced-motion: reduce`) or pointer type. If detected, smooth-scroll is skipped in favor of native scrolling behavior to maximize accessibility.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** v20+ recommended
* **npm** (comes bundled with Node.js)

### Installation
Clone the repository and install all dependencies:
```bash
npm install
```

### Local Development
Launch the Next.js development server running Turbopack:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Deployment
To bundle the portfolio for production hosting (such as Vercel, Netlify, or AWS):
```bash
npm run build
npm run start
```

### Linting
To check and format the codebase to match standard rules:
```bash
npm run lint
```
