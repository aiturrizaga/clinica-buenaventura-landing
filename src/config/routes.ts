export const ROUTES = {
  home: '/',
  nosotros: '/nosotros',
  servicios: '/servicios',
  trabajaConNosotros: '/trabaja-con-nosotros',
  especialidades: {
    index: '/especialidades',
    detail: (slug: string): string => `/especialidades/${slug}`,
  },
  medicos: {
    index: '/medicos',
  },
  promociones: {
    index: '/promociones',
    detail: (slug: string): string => `/promociones/${slug}`,
  },
  legal: {
    detail: (slug: string): string => `/legal/${slug}`,
  },
} as const;
