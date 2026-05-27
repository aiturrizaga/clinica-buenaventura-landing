import type { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'prevencion-enfermedades-cardiovasculares',
    title: 'Prevención de enfermedades cardiovasculares: guía completa',
    excerpt: 'Las enfermedades cardiovasculares son la principal causa de muerte a nivel mundial. Descubre cómo prevenir y controlar los factores de riesgo para mantener un corazón saludable.',
    content: `
Las enfermedades cardiovasculares representan uno de los mayores desafíos de salud pública del siglo XXI. Sin embargo, hasta el 80% de los casos pueden prevenirse con cambios en el estilo de vida.

## Factores de riesgo principales

Los factores de riesgo cardiovascular se dividen en modificables y no modificables. Entre los modificables encontramos la hipertensión arterial, el tabaquismo, la diabetes mellitus, la obesidad y el sedentarismo.

## Alimentación saludable

Una dieta equilibrada, rica en frutas, verduras, cereales integrales y proteínas magras, combinada con la reducción de sal, grasas saturadas y azúcares simples, puede reducir significativamente el riesgo cardiovascular.

## Actividad física regular

Se recomienda al menos 150 minutos de actividad física moderada por semana. El ejercicio fortalece el músculo cardíaco, reduce la presión arterial y mejora el perfil lipídico.

## Control médico periódico

Los chequeos preventivos anuales permiten detectar a tiempo factores de riesgo como hipertensión, dislipidemia y diabetes, antes de que generen complicaciones.
    `,
    coverImage: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=800&h=450&fit=crop&auto=format',
    author: {
      name: 'Dr. Juan Carlos Herrera',
      role: 'Cardiólogo',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&auto=format',
    },
    category: 'Cardiología',
    tags: ['corazón', 'prevención', 'salud cardiovascular', 'factores de riesgo'],
    publishedAt: '2025-04-15',
    readingTime: 6,
    featured: true,
  },
  {
    id: '2',
    slug: 'desarrollo-infantil-primeros-anos',
    title: 'Desarrollo infantil en los primeros años: lo que debes saber',
    excerpt: 'Los primeros cinco años de vida son fundamentales para el desarrollo cerebral del niño. Conoce los hitos del desarrollo y cuándo consultar con un pediatra.',
    content: `
El desarrollo infantil temprano sienta las bases para el aprendizaje, la salud y el bienestar a lo largo de toda la vida. Los primeros años son una ventana de oportunidades única.

## Hitos del desarrollo por edad

Cada niño se desarrolla a su propio ritmo, pero existen rangos esperados para cada etapa. Es importante conocerlos para identificar señales de alerta oportunamente.

## La importancia del vínculo afectivo

El apego seguro con los cuidadores primarios es esencial para el desarrollo emocional y social del niño. Las interacciones cotidianas moldean literalmente las conexiones neuronales.

## Nutrición en la primera infancia

Una nutrición adecuada, comenzando con la lactancia materna exclusiva hasta los 6 meses, es clave para el desarrollo cognitivo y físico óptimo.
    `,
    coverImage: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&h=450&fit=crop&auto=format',
    author: {
      name: 'Dra. María Fernanda Ríos',
      role: 'Pediatra',
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=80&h=80&fit=crop&auto=format',
    },
    category: 'Pediatría',
    tags: ['pediatría', 'desarrollo infantil', 'niños', 'primera infancia'],
    publishedAt: '2025-04-08',
    readingTime: 5,
    featured: true,
  },
  {
    id: '3',
    slug: 'cuidado-piel-verano',
    title: 'Cómo cuidar tu piel durante el verano: consejos de dermatología',
    excerpt: 'El sol intenso puede causar daños irreversibles en la piel. Aprende las estrategias de fotoprotección y cuidado dermatológico para lucir una piel saludable.',
    content: `
La exposición solar crónica es el principal factor de riesgo para el cáncer de piel y el envejecimiento prematuro. Una buena fotoprotección es la mejor inversión para tu piel.

## Fotoprotección: más que solo bloqueador

La fotoprotección integral incluye el uso de protector solar de amplio espectro (SPF 50+), ropa adecuada, sombreros y evitar la exposición en las horas pico.

## Hidratación cutánea

La hidratación adecuada es fundamental, tanto interna (tomar suficiente agua) como externa (uso de cremas hidratantes adaptadas al tipo de piel).
    `,
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop&auto=format',
    author: {
      name: 'Dra. Patricia Luna',
      role: 'Dermatóloga',
      avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=80&h=80&fit=crop&auto=format',
    },
    category: 'Dermatología',
    tags: ['dermatología', 'piel', 'verano', 'protector solar'],
    publishedAt: '2025-03-22',
    readingTime: 4,
    featured: false,
  },
  {
    id: '4',
    slug: 'lesiones-deportivas-prevencion',
    title: 'Lesiones deportivas: prevención y recuperación efectiva',
    excerpt: 'El deporte es fundamental para la salud, pero sin la preparación adecuada puede generar lesiones. Descubre cómo practicar ejercicio de forma segura.',
    content: `
Las lesiones deportivas son más frecuentes de lo que pensamos y pueden afectar a deportistas de todos los niveles. La buena noticia es que la mayoría son prevenibles.

## Calentamiento y enfriamiento

Un calentamiento adecuado de 10-15 minutos antes del ejercicio y un enfriamiento posterior son fundamentales para preparar el cuerpo y facilitar la recuperación muscular.

## Equipamiento adecuado

El uso del equipamiento correcto, especialmente el calzado adecuado para cada deporte, puede prevenir un gran porcentaje de lesiones en extremidades inferiores.
    `,
    coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop&auto=format',
    author: {
      name: 'Dr. Luis Alberto Gómez',
      role: 'Traumatólogo',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=80&h=80&fit=crop&auto=format',
    },
    category: 'Traumatología',
    tags: ['traumatología', 'deporte', 'lesiones', 'rehabilitación'],
    publishedAt: '2025-03-10',
    readingTime: 5,
    featured: false,
  },
  {
    id: '5',
    slug: 'salud-mujer-etapas-vida',
    title: 'Salud de la mujer en cada etapa de la vida',
    excerpt: 'La salud femenina requiere atención especializada en cada fase: adolescencia, edad reproductiva, embarazo y menopausia. Una guía completa para cada etapa.',
    content: `
La salud de la mujer tiene particularidades únicas en cada etapa de la vida. Un seguimiento ginecológico regular es clave para detectar problemas a tiempo y mantener la calidad de vida.

## Adolescencia y primera consulta ginecológica

Se recomienda la primera consulta ginecológica alrededor de los 15-17 años o al inicio de la actividad sexual. Es un espacio seguro para resolver dudas y orientar sobre anticoncepción y salud sexual.

## Edad reproductiva y planificación familiar

El acceso a métodos anticonceptivos modernos y el acompañamiento médico en la planificación familiar son derechos fundamentales de la mujer.
    `,
    coverImage: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=800&h=450&fit=crop&auto=format',
    author: {
      name: 'Dra. Ana Lucía Vásquez',
      role: 'Ginecóloga',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&auto=format',
    },
    category: 'Ginecología',
    tags: ['ginecología', 'salud femenina', 'mujer', 'prevención'],
    publishedAt: '2025-02-18',
    readingTime: 7,
    featured: true,
  },
];

export const getFeaturedPosts = (): BlogPost[] => blogPosts.filter(p => p.featured);
export const getPostBySlug = (slug: string): BlogPost | undefined => blogPosts.find(p => p.slug === slug);
export const getCategories = (): string[] => [...new Set(blogPosts.map(p => p.category))];
