import type { PopupPromo } from './types';

// No es singleton a propósito: hoy se muestra una sola imagen, pero el
// modelo ya soporta varias (ej. un carrusel de popups) sin cambiar el
// contrato — solo agregando más ítems en Directus.
export interface PopupPromosRepository {
    findActive(): Promise<PopupPromo[]>;
}
