import type { SiteSettings, SocialLinks, HomeHero } from './types';
import type { SiteConfigRepository } from './repository';
import { DirectusSiteConfigRepository } from './infrastructure/directus-site-config.repository';

const repository: SiteConfigRepository = new DirectusSiteConfigRepository();

// Memoizado: Header, Footer, FloatingWhatsApp y SEOHead viven en (casi) toda
// página, así que sin esto cada una dispararía su propio fetch del mismo
// singleton durante el build.
let siteSettingsPromise: Promise<SiteSettings> | null = null;
export const getSite = (): Promise<SiteSettings> => siteSettingsPromise ??= repository.getSiteSettings();

let socialLinksPromise: Promise<SocialLinks> | null = null;
export const getSocialLinks = (): Promise<SocialLinks> => socialLinksPromise ??= repository.getSocialLinks();

let homeHeroPromise: Promise<HomeHero> | null = null;
export const getHomeHero = (): Promise<HomeHero> => homeHeroPromise ??= repository.getHomeHero();
