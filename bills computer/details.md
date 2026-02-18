# BILLS.COMPUTER (OakOS)

**Live:** bills.computer
**Repo:** github.com/smoothbeer/bills-computer (private)
**By:** Lukeabc

---

## What it is

A fully interactive desktop operating system in the browser — themed as a Pokemon trainer's workstation. "OakOS" simulates a retro 90s PC where users manage their Pokemon Trading Card Game collection. The whole thing is one HTML file, no build step, deployed on Vercel.

## Stack

- React 18 (CDN, in-browser Babel transpilation — no bundler)
- Single `index.html` (~9,000 lines, ~425KB)
- CSS Grid/Flexbox for window management
- Web Audio API for sound design
- localStorage for persistence
- Vercel (auto-deploy from GitHub)
- AWS Lambda for AI chat proxy (Groq + Llama 3.1)

## Apps inside OakOS

| App | What it does |
|-----|-------------|
| Dex | Full Pokemon TCG card browser — browse by species, search, discover with filters |
| Binders | Collection manager — create custom binders with colours, drag-and-drop sorting |
| trainer_notes.txt | Persistent text editor |
| Music | Album player with equalizer visualizer |
| Messenger | AI chat with 5 in-character personas (Oak, Ash, Gary, Team Rocket) via Groq/Llama |
| Map | Pannable/zoomable Kanto region map |
| Settings | Wallpaper, data management |
| Downloads | Export/import collection data |
| PokeClock | Real-time clock |
| read_me.txt / About OakOS | Project info and credits |

## APIs

- **TCGdex** — Full Pokemon TCG database (cards, sets, images)
- **PokeAPI** — Species data, sprites, evolution chains, cries
- **Groq (Llama 3.1)** — AI chat via Lambda proxy with character system prompts, conversation history, rate limiting

## Notable technical details

- **3D card rendering** — Perspective transforms, mouse-tracked tilt + shine, flip animation, holographic radial gradient overlay
- **Progressive image loading** — Low-res webp loads instantly, high-res PNG upgrades in background
- **Window manager** — Drag, resize, minimize, maximize, focus tracking, z-index stacking, per-app title bar colours
- **CRT boot sequence** — Game Boy-style monitor with power button, phosphor green screen, typewriter boot text, scanline sweep, glass reflections, vignette
- **Sound design** — Click sounds on UI interactions, keystroke audio on typing, Pokemon cries from PokeAPI, background music
- **AI Messenger** — 5 distinct character personalities with system prompts, conversation memory (6 messages), collection-aware responses, content filtering
- **Mobile gate** — Boot-screen-styled overlay blocks mobile users with in-universe "desktop terminals only" message
- **Zero build step** — Entire app is one HTML file with React loaded via CDN and Babel transpiling JSX in-browser

## Design

Retro 90s PC aesthetic — Game Boy boot screen, Windows 95-style desktop chrome, pixel font (Pokemon GB), monospace body text (JetBrains Mono), earthy beige/tan palette, AIM-style messaging. Everything feels like a real OS from 2001 that a Pokemon trainer would use.
