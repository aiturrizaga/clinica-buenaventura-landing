import type { PopupPromo } from './types';
import type { PopupPromosRepository } from './repository';
import { DirectusPopupPromosRepository } from './infrastructure/directus-popup-promos.repository';

const repository: PopupPromosRepository = new DirectusPopupPromosRepository();

export const getActivePopupPromos = (): Promise<PopupPromo[]> => repository.findActive();
