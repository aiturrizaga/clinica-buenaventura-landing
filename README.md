# Clínica Buenaventura — Sitio Web Institucional

Sitio web corporativo moderno para Clínica Buenaventura, construido con Astro, TailwindCSS v4 y TypeScript.

## Stack

- **[Astro](https://astro.build)** — Framework de sitio estático (SSG)
- **[TailwindCSS v4](https://tailwindcss.com)** — Estilos con configuración vía CSS `@theme {}`
- **TypeScript** — Tipos estrictos
- **Responsive Mobile-First** — Diseño adaptativo completo

## Comenzar

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## Estructura

```
src/
├── components/
│   ├── ui/          — Botones, badges, títulos, WhatsApp
│   ├── layout/      — Header, Footer
│   ├── cards/       — DoctorCard, SpecialtyCard, BlogCard, etc.
│   ├── forms/       — Formularios de contacto y cita
│   └── seo/         — SEOHead
├── data/            — Mock data TypeScript
├── layouts/         — BaseLayout, PageLayout, BlogLayout
├── pages/           — Todas las páginas (14 páginas)
├── sections/        — Secciones de la Home
├── styles/          — global.css con @theme de TW v4
├── types/           — Interfaces TypeScript
└── utils/           — Helpers SEO
```

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home principal |
| `/nosotros` | Sobre la clínica |
| `/especialidades` | Listado de especialidades |
| `/especialidades/[slug]` | Detalle de especialidad |
| `/medicos` | Staff médico |
| `/medicos/[slug]` | Perfil de médico |
| `/servicios` | Servicios médicos |
| `/promociones` | Promociones activas |
| `/blog` | Blog de salud |
| `/blog/[slug]` | Artículo de blog |
| `/contacto` | Formulario + mapa |
| `/agendar-cita` | Formulario multi-step |
| `/club-buenaventura` | Programa de membresía |
| `/404` | Página no encontrada |

## TailwindCSS v4

Este proyecto usa TailwindCSS v4 con configuración **únicamente desde CSS**:

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  --color-primary: #0A4BFF;
  --color-primary-dark: #0037C1;
  /* ... */
}
```

No existe `tailwind.config.js` — todo se configura desde `@theme {}`.

## Despliegue

### Vercel / Netlify
```bash
npm run build
# Sube la carpeta dist/
```

### cPanel / Hosting compartido
```bash
npm run build
# Sube el contenido de dist/ via FTP al public_html
```

## Variables de entorno

Crea un archivo `.env` en la raíz para configuración local:

```env
PUBLIC_SITE_URL=https://clinicabuenaventura.com
PUBLIC_WHATSAPP=51999999999
```

## Personalización

1. **Colores**: Edita `--color-primary` en `src/styles/global.css`
2. **Datos**: Modifica los archivos en `src/data/`
3. **Logo**: Reemplaza el SVG inline en `src/components/layout/Header.astro`
4. **Imágenes**: Reemplaza las URLs de Unsplash con imágenes reales en `src/data/`
5. **Sitemap**: Actualiza `site:` en `astro.config.mjs` con el dominio real

## Licencia

© 2025 Clínica Buenaventura. Todos los derechos reservados.
