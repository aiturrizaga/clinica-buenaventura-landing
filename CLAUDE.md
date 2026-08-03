# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server (localhost:4321)
npm run build     # Production build → dist/
npm run preview   # Preview the built output
```

No test runner or linter is configured.

## Architecture

**Astro 4 SSG** — fully static output. No server-side rendering. All pages use `getStaticPaths()` sourcing from local TypeScript data files in `src/data/`. There is no CMS, API, or database.

### Layout hierarchy

```
BaseLayout        → HTML shell, Inter font, global CSS, scroll-reveal IntersectionObserver
  └─ PageLayout   → BaseLayout + Header + Footer + FloatingWhatsApp (all public pages)
  └─ AppointmentLayout → BaseLayout + AppointmentBrandBar (booking flow only, no nav/footer)
  └─ BlogLayout   → for blog article pages
```

Every page passes `SEOProps` (`title`, `description`, `ogImage?`, `ogType?`, `noindex?`, `jsonLd?`) directly to its layout. `SEOHead.astro` handles OG tags, canonical, and JSON-LD injection.

### Data layer

All site content lives in `src/data/*.ts` as typed arrays exported directly — no fetching at build time. Key files:

- `doctors.ts` — exports `doctors: Doctor[]` and `getDoctorBySlug(slug)`
- `specialties.ts` — exports `specialties: Specialty[]` and `getSpecialtyBySlug(slug)`
- `promotions.ts`, `branches.ts`, `testimonials.ts`, `blog.ts`, `accounts.ts`, `navigation.ts`

All types are defined in `src/types/index.ts`.

### Appointment booking flow

There are **two separate flows**:

1. **`/agendar-cita`** — legacy single-page 4-step form (specialty → doctor → date → contact data). All steps rendered in HTML, shown/hidden with JS. Submits to a success screen (no backend call).

2. **`/citas/`** — newer multi-page flow with its own `AppointmentLayout`. Steps are separate pages:
   `index` → `identificacion` → `paciente` → `registro` → `verificacion` → `confirmacion`
   
   State is persisted across pages via `sessionStorage` using `src/scripts/appointmentStore.ts` (`saveAppointment`, `getAppointment`, `clearAppointment`). That file also exports date/time formatters used across the flow.

### TailwindCSS v4

**No `tailwind.config.js` exists.** All design tokens are declared inside `@theme {}` in `src/styles/global.css` and consumed as CSS variables:

```css
var(--color-primary)      /* #15489d */
var(--color-primary-dark) /* #0d3578 */
var(--color-surface)      /* #F5F7FB */
var(--color-text)         /* #1A1A2E */
var(--color-text-muted)   /* #6B7280 */
```

Older pages use global CSS utility classes (`.container`, `.section-py`, `.card`, `.btn-*`, `.form-input`, `.badge-*`, `.reveal`). Newer pages in `src/pages/citas/` mix in Tailwind utility classes directly alongside the global classes.

### Global CSS utility classes

Defined in `src/styles/global.css` — use these instead of re-implementing:

- **Layout**: `.container` (max-w 1280px, responsive padding), `.section-py` (4rem/6rem block padding)
- **Buttons**: `.btn .btn-{primary|outline|ghost|white} .btn-{sm|md|lg}` — prefer the `Button.astro` component
- **Cards**: `.card` (white bg, shadow, rounded-xl, hover lift)
- **Forms**: `.form-input`
- **Badges**: `.badge .badge-{primary|white|green}`
- **Text**: `.text-gradient`, `.prose` (for blog content)
- **Backgrounds**: `.bg-gradient`
- **Animation**: `.reveal` — add to any element for scroll-triggered fade-up (handled by IntersectionObserver in `BaseLayout`)

### Icons

Tabler Icons loaded via webfont (`@tabler/icons-webfont`). Usage: `<span class="ti ti-heart"></span>`. No SVG imports needed.

### SEO utilities (`src/utils/seo.ts`)

- `buildClinicSchema()` — MedicalOrganization JSON-LD for the home page
- `buildDoctorSchema(doctor)` — Physician JSON-LD for doctor profile pages
- `buildArticleSchema(post)` — MedicalWebPage JSON-LD for blog posts
- `buildTitle(pageTitle)` — appends `| Clínica Buenaventura` if not already present

### Path aliases

Configured in `tsconfig.json`:

```
@/*           → src/*
@components/* → src/components/*
@layouts/*    → src/layouts/*
@data/*       → src/data/*
@utils/*       → src/utils/*
@sections/*   → src/sections/*
```

### Public assets

Static files in `public/`:
- `public/images/doctors/*.webp` — doctor photos referenced in `src/data/doctors.ts`
- `public/images/promotions/*.webp` — promotion images
- `public/images/hero/` — hero section images
- External image domains allowed by Astro: `images.unsplash.com`, `randomuser.me` (used in mock data)

### Sections (home page only)

`src/sections/home/` contains the home-page section components. Some are currently commented out in `src/pages/index.astro` and `src/data/navigation.ts` (ClubSection, TestimonialsSection, Blog, Servicios, Contacto) — they exist but are not active.

### Analytics

`GoogleAnalytics.astro` is injected only in production (`import.meta.env.PROD`).
