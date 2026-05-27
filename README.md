# 🌌 MATRIX // Agampreet Singh Portfolio

Welcome to **MATRIX**, a highly interactive, state-of-the-art developer portfolio and digital identity of **Agampreet Singh**—Double Academic Scholar (Computer Science & Engineering at GNDU & Data Science at IIT Madras).

This application is built with **Next.js (App Router)**, **React Three Fiber (WebGL)**, **Framer Motion**, and **Tailwind CSS v4**, delivering a highly interactive, low-latency, and satisfying user experience.

---

## 🚀 Core Features

### 1. 💳 Stretchable Hanging ID Badge
* **Draggable Physics**: Grab, drag, and fling your secure ID badge in any direction (`Framer Motion`).
* **Elastic String Simulation**: Features a dynamic SVG lanyard rope that bends naturally via quadratic bezier equations in real-time, matching the card's movement vectors.
* **Rotational Inertia**: The ID Card tilts and swings realistically as it is dragged sideways.
* **Spring-Back Bouncing**: Releasing the card triggers a dampened spring animation to bounce it back to its resting hanger point.
* **Styling**: Renders your profile picture inside a white corporate badge featuring barcoding (`SYSNODE-3145-7492`) and system secure nodes.

### 2. 🌌 WebGL2 Interactive Nebula Background
* Layers a custom high-performance WebGL fragment shader behind the Hero landing page.
* Computes mouse and touch pointer coordinates dynamically, injecting cosmic currents and ripple ripples into a beautiful, shifting space-indigo cosmic gas cloud.

### 3. 📂 Chronology Control Console (Experience)
* **3D Container Scroll**: As you scroll down the page, a full-screen card tilts flat (rotating `20°` to `0°` on the X-axis) to face the viewer.
* **Interactive Dashboard**: Inside the card, a glassmorphic panel displays academic and professional roles. 
* **Audio Feedback**: Integrates custom synthesizer clicks (`Web Audio API`) when hovering or selecting organizations in the sidebar.

### 4. 🎛️ Custom Cursor & Cybernetic Grid
* A lag-free custom cursor following client mouse actions.
* Ambient synthesized hums (`soundManager` drone synthesizer) activated upon the user's first click.

---

## 🛠️ Technology Stack

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org)
* **Rendering Engine**: [React 19](https://react.dev)
* **3D Canvas**: [React Three Fiber](https://github.com/pmndrs/react-three-fiber) & [Three.js](https://threejs.org) (for WebGL visual core)
* **Animations**: [Framer Motion 12](https://motion.dev) (for high-fidelity spring systems, drag constraints, and scrolls)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (utility-first cybernetic design systems)
* **Smooth Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis) (for uniform, high-performance scroll interpolation)
* **Audio Synthesizer**: Web Audio API (procedural custom synthesizer click / ambient sound generators)

---

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/Agam348/matrix.git
cd matrix
```

### 2. Install dependencies
```bash
npm install
```

### 3. Launch the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the interactive landing page.

---

## 📁 Architecture Overview

```bash
├── app/
│   ├── components/       # Custom page-specific section modules
│   │   ├── About.tsx     # Biography node
│   │   ├── Experience.tsx# Upgrade Chronology Console (Container Scroll)
│   │   ├── Hero.tsx      # Landing layout combining WebGL shader + ID Badge
│   │   └── Projects.tsx  # Interactive work grid
│   ├── globals.css       # Core design tokens, gradients, and custom scrollbars
│   ├── layout.tsx        # Next.js Root layout and Google Font integrations
│   └── page.tsx          # Main entry assembly and Lenis scroll engine
├── components/
│   └── ui/               # Low-level reusable primitive UI blocks
│       ├── animated-shader-hero.tsx  # WebGL fragment shader background hook
│       ├── container-scroll-animation.tsx # 3D perspective scroll transform
│       └── hanging-id-card.tsx       # Stretchable physics security badge
├── public/
│   └── profile.jpg       # Profile picture asset
```

---

## 🌐 Production Build & Deployment

To build the static HTML/Next.js production bundle:

```bash
npm run build
```

The easiest way to deploy this portfolio is to link the repository directly to [Vercel](https://vercel.com/new). The build command will automatically run, compile the TypeScript types, and host the WebGL structures at low latency.
