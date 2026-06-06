import type { NavItem } from '@/types';

export const navItems: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/#nosotros' },
  {
    label: 'Especialidades',
    href: '/#especialidades',
    children: [
      { label: 'Cardiología', href: '/especialidades/cardiologia' },
      { label: 'Pediatría', href: '/especialidades/pediatria' },
      { label: 'Ginecología', href: '/especialidades/ginecologia' },
      { label: 'Ortopedia', href: '/especialidades/ortopedia' },
      { label: 'Ver todas', href: '/especialidades' },
    ],
  },
  // { label: 'Servicios', href: '/servicios' },
  { label: 'Médicos', href: '/#medicos' },
  { label: 'Promociones', href: '/promociones' },
  // { label: 'Blog', href: '/blog' },
  // { label: 'Club Buenaventura', href: '/club-buenaventura' },
  // { label: 'Contacto', href: '/contacto' },
];
