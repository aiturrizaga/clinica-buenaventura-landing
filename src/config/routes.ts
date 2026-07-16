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
    detail: (slug: string): string => `/medicos/${slug}`,
  },
  promociones: {
    index: '/promociones',
    detail: (slug: string): string => `/promociones/${slug}`,
  },
  blog: {
    index: '/blog',
    detail: (slug: string): string => `/blog/${slug}`,
  },
  citas: {
    index: '/citas',
    identificacion: '/citas/identificacion',
    registro: '/citas/registro',
    paciente: '/citas/paciente',
    verificacion: '/citas/verificacion',
    confirmacion: '/citas/confirmacion',
  },
  legal: {
    terminosCondiciones: '/legal/terminos-condiciones',
    politicaPrivacidad: '/legal/politica-privacidad',
    terminosPromociones: '/legal/terminos-promociones',
    terminosSorteoDiaDelPadre: '/legal/terminos-condiciones-sorteo-dia-del-padre',
  },
} as const;
