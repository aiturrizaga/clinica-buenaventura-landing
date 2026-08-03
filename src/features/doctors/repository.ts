import type { Doctor } from './types';

// Puerto: contrato de acceso a datos de médicos, independiente del CMS que lo
// implemente. Para cambiar de proveedor de contenido basta con escribir un
// nuevo adaptador que cumpla esta interfaz y sustituirlo en data.ts.
export interface DoctorsRepository {
    findAll(): Promise<Doctor[]>;
    findBySlug(slug: string): Promise<Doctor | undefined>;
}
