import type { SiteSettings, SocialLinks, HomeHero } from './types';

export interface SiteConfigRepository {
    getSiteSettings(): Promise<SiteSettings>;
    getSocialLinks(): Promise<SocialLinks>;
    getHomeHero(): Promise<HomeHero>;
}
