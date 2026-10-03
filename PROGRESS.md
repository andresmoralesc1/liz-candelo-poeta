# Liz Candelo Grueso — Build Progress

Live, in-sync with [`src/lib/progress.ts`](./src/lib/progress.ts) and the `/status` route.

## Current state — 2026-10-03

| # | Section | Component | Status | Verdict |
|---|---------|-----------|--------|---------|
| 01 | Foundations | Design system & tokens | in-progress | — |
| 02 | Chrome | Navigation & mobile drawer | in-progress | — |
| 03 | Hero | Hero with Pacific motifs | in-progress | — |
| 04 | Obra | Book showcase (3D tilt) | pending | — |
| 05 | Recorrido | Roots & journey | pending | — |
| 06 | Talleres | Workshops & services | pending | — |
| 07 | Prensa | Media gallery & press | pending | — |
| 08 | Contacto | Form & footer | pending | — |
| 09 | Infra | Docker/Caddy/deploy | pending | — |

## Spec (ground truth)

### Visual & aesthetic
- **Pacific Sun / Solar Mustard** `#ECA81D` / `#DCA010`
- **Terracotta** `#DF5A2B` / `#B8321B`
- **Cream / Linen** `#F6F2E8` / `#FBF8F1`
- **Charcoal** `#111111`
- **Type:** Fraunces (titles) + Plus Jakarta Sans (body)
- **Style:** Pacific Afro-Contemporary + hand-drawn children's book. Soft organic curves, paper grain, hand-drawn SVG motifs (waves, breeze, butterflies, coastal).

### Author
- **Liz Candelo Grueso** — granddaughter of Aquilino Grueso.
- Born in Viento Libre (Buenaventura, Valle del Cauca). Raised in San Antonio de los Caballeros (Florida, Valle del Cauca).
- Quote: «El pueblo en que me crié es tan importante como el pueblo en que nací…»
- Featured book: *La casa más grande del mundo* (Icono Editorial).

## Harsh Critic Protocol

Each component is reviewed in fresh context against Awwwards-tier benchmarks.
Reviewer must REJECT and name the single biggest remaining gap until
output meets the bar or genuinely cannot be told apart from a hand-coded
Awwwards winner.

## Phasing

This is the MVP session: foundation + chrome + hero. Other sections are
queued for the next sessions, one at a time, each with its own critic loop.

## Deploy

Staging deploys to Vercel preview; production notification to
`lizcandelo@andresmorales.com.co` on each successful build.
