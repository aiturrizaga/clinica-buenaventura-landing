import type { Promotion } from '@/types';

export const promotions: Promotion[] = [
    {
        id: '1',
        title: 'Jueves de Locura - Especial Mamá',
        description: '',
        image: '/images/promotions/promo_uno.png',
        validUntil: '2025-12-31',
        ctaText: 'Ver más',
        ctaHref: '/promociones',
        accentColor: '#E91E8C',
        waMessage: 'Hola Clínica Buenaventura, me interesa la promoción Jueves de Locura - Especial Mamá. ¿Me pueden dar más información?',
    },
    {
        id: '2',
        title: 'Paquete Niño Sano',
        description: '',
        image: '/images/promotions/promo_dos.png',
        validUntil: '2025-12-31',
        ctaText: 'Ver más',
        ctaHref: '/promociones',
        accentColor: '#0027df',
        waMessage: 'Hola Clínica Buenaventura, me interesa el Paquete Niño Sano. ¿Me pueden dar más información?',
    },
    {
        id: '3',
        title: 'Paquete Corazón Sano',
        description: '',
        image: '/images/promotions/promo_tres.png',
        validUntil: '2025-12-31',
        ctaText: 'Ver más',
        ctaHref: '/promociones',
        accentColor: '#E91E8C',
        waMessage: 'Hola Clínica Buenaventura, me interesa el Paquete Corazón Sano. ¿Me pueden dar más información?',
    },
];
