// Script de una sola ejecución: sube a Directus el contenido que hoy está
// hardcodeado en el repo (doctors + specialties), incluyendo imágenes.
// Reanudable: si un slug ya existe, lo reutiliza en vez de duplicarlo.
// Uso: node scripts/seed-directus.ts
//
// Lee DIRECTUS_URL / DIRECTUS_TOKEN desde .env (parseo manual, sin dotenv).

import {
    createDirectus, rest, staticToken, createItem, updateItem, readItems,
    importFile, uploadFiles,
} from '@directus/sdk';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { doctors as mockDoctors } from './_seed-doctors-array.ts';
import { specialties as mockSpecialties } from './_seed-specialties-array.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function loadEnv() {
    const raw = readFileSync(path.join(ROOT, '.env'), 'utf-8');
    for (const line of raw.split('\n')) {
        const match = line.match(/^([A-Z_]+)=(.*)$/);
        if (match) process.env[match[1]] = match[2].trim();
    }
}
loadEnv();

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;
if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
    throw new Error('Faltan DIRECTUS_URL / DIRECTUS_TOKEN en .env');
}

const client = createDirectus(DIRECTUS_URL).with(staticToken(DIRECTUS_TOKEN)).with(rest());

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retry<T>(fn: () => Promise<T>, attempts = 3, delayMs = 1500): Promise<T> {
    let lastErr: unknown;
    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        } catch (err) {
            lastErr = err;
            if (i < attempts - 1) await sleep(delayMs * (i + 1));
        }
    }
    throw lastErr;
}

async function importCoverImage(url: string, title: string): Promise<string | null> {
    try {
        const file = await retry(() => client.request(importFile(url, { title })), 2, 1000);
        return file.id;
    } catch {
        // Fallback: si el propio Directus no logra descargar la URL (red del
        // VPS), la traemos nosotros y la subimos por multipart.
        try {
            console.log(`    (fallback: descargando "${title}" localmente...)`);
            const res = await fetch(url);
            if (!res.ok) throw new Error(`${res.status}`);
            const buffer = Buffer.from(await res.arrayBuffer());
            const blob = new Blob([buffer], { type: res.headers.get('content-type') ?? 'image/jpeg' });
            const formData = new FormData();
            formData.append('title', title);
            formData.append('file', blob, `${title}.jpg`);
            const file = await client.request(uploadFiles(formData));
            return file.id;
        } catch (err) {
            console.warn(`    ⚠ No se pudo obtener la imagen de "${title}" (${url}). Se crea sin portada — súbela manualmente luego. (${(err as Error).message})`);
            return null;
        }
    }
}

async function uploadDoctorPhoto(filename: string, title: string): Promise<string> {
    const filePath = path.join(ROOT, 'src/assets/doctors', filename);
    const buffer = readFileSync(filePath);
    const blob = new Blob([buffer], { type: 'image/webp' });
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', blob, filename);
    const file = await retry(() => client.request(uploadFiles(formData)));
    return file.id;
}

async function findExisting(collection: string, slug: string): Promise<{ id: string | number } | undefined> {
    const items = await client.request(
        readItems(collection, { filter: { slug: { _eq: slug } }, fields: ['id'], limit: 1 }),
    );
    return (items as { id: string | number }[])[0];
}

// El mock original tiene inconsistencias de mayúsculas entre doctors.specialty
// y specialties.name (ej. "Cirugía General" vs "Cirugía general") — se
// normaliza para no perder vínculos por eso.
const normalize = (s: string) => s.trim().toLowerCase();

async function main() {
    console.log(`Sembrando contenido en ${DIRECTUS_URL}...\n`);

    console.log('== Especialidades ==');
    const specialtyIdByName = new Map<string, string | number>();
    for (const s of mockSpecialties) {
        const existing = await findExisting('specialties', s.slug);
        if (existing) {
            specialtyIdByName.set(s.name, existing.id);
            console.log(`  = ${s.name} ya existía -> id ${existing.id}`);
            continue;
        }

        const coverImage = await importCoverImage(s.coverImage, s.name);
        const created = await client.request(createItem('specialties', {
            slug: s.slug,
            name: s.name,
            fontIcon: s.fontIcon,
            shortDescription: s.shortDescription,
            fullDescription: s.fullDescription,
            coverImage,
            procedures: s.procedures,
            featured: s.featured,
            order: s.order,
            preferred: s.preferred ?? false,
        }));
        specialtyIdByName.set(s.name, created.id);
        console.log(`  ✓ ${s.name} -> id ${created.id}`);
    }
    const specialtyIdByNormalizedName = new Map(
        [...specialtyIdByName].map(([name, id]) => [normalize(name), id]),
    );

    console.log('\n== Médicos ==');
    const doctorsBySpecialty = new Map<string, (string | number)[]>();
    for (const d of mockDoctors) {
        const specialtyId = specialtyIdByNormalizedName.get(normalize(d.specialty));
        if (!specialtyId) {
            console.warn(`  ⚠ Sin especialidad "${d.specialty}" para ${d.name}, se omite el vínculo.`);
        }

        const existing = await findExisting('doctors', d.slug);
        if (existing) {
            // Repara vínculos que se hayan perdido en una corrida anterior
            // (ej. por el desfase de mayúsculas ya normalizado arriba).
            if (specialtyId) {
                await client.request(updateItem('doctors', existing.id, { specialty: specialtyId }));
                const list = doctorsBySpecialty.get(d.specialty) ?? [];
                list.push(existing.id);
                doctorsBySpecialty.set(d.specialty, list);
            }
            console.log(`  = ${d.name} ya existía -> id ${existing.id}${specialtyId ? ' (especialidad reparada)' : ''}`);
            continue;
        }

        const photo = await uploadDoctorPhoto(d.photo, d.name);
        const created = await client.request(createItem('doctors', {
            slug: d.slug,
            name: d.name,
            title: d.title,
            specialty: specialtyId ?? null,
            cmp: d.cmp,
            bio: d.bio,
            photo,
            education: d.education,
            year_experience: d.experience,
            featured: d.featured,
        }));
        console.log(`  ✓ ${d.name} -> id ${created.id}`);

        if (specialtyId) {
            const list = doctorsBySpecialty.get(d.specialty) ?? [];
            list.push(created.id);
            doctorsBySpecialty.set(d.specialty, list);
        }
    }

    console.log('\n== Vinculando médicos relacionados por especialidad ==');
    let linkFailures = 0;
    for (const [specialtyName, doctorIds] of doctorsBySpecialty) {
        const specialtyId = specialtyIdByName.get(specialtyName)!;
        try {
            await client.request(updateItem('specialties', specialtyId, {
                relatedDoctors: doctorIds,
            }));
            console.log(`  ✓ ${specialtyName}: ${doctorIds.length} médico(s) vinculado(s)`);
        } catch (err) {
            linkFailures++;
            console.warn(`  ⚠ No se pudo vincular "${specialtyName}": ${(err as Error).message}`);
        }
    }
    if (linkFailures > 0) {
        console.warn(`\n${linkFailures} especialidad(es) sin médicos relacionados por falta de permiso de Update en "specialties". Otórgalo en Directus y vuelve a correr este script (es reanudable).`);
    }

    console.log('\nListo.');
}

main().catch((err) => {
    console.error('\nFalló el seed:', err);
    process.exit(1);
});
