import type { Branch } from '@/types';

export const branches: Branch[] = [
    {
        id: '1',
        slug: 'lima-sjm',
        name: 'San Juan de Miraflores',
        address: 'Av. San Juan N.° 871, San Juan de Miraflores',
    },
    {
        id: '2',
        slug: 'lima-centro',
        name: 'Lima Centro',
        address: 'Av. Garcilaso de la Vega 1420, Lima',
    },
];

export const getBranchBySlug = (slug: string): Branch | undefined =>
    branches.find((b) => b.slug === slug);
