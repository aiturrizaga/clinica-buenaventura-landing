export interface SelectedAppointment {
    doctorSlug: string;
    doctorName: string;
    specialty: string;
    branchSlug: string;
    branchName: string;
    type: string;
    dateIso: string;
    time: string;
    documentNumber?: string;
    patientName?: string;
    account?: PatientAccount;
}

export interface PatientAccount {
    firstName: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    phone: string;
    email: string;
}

const STORAGE_KEY = 'selected_appointment';

export function saveAppointment(data: SelectedAppointment): void {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getAppointment(): SelectedAppointment | null {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SelectedAppointment) : null;
}

export function clearAppointment(): void {
    sessionStorage.removeItem(STORAGE_KEY);
}

// "2026-06-10" -> "10/06/2026"
export function formatDate(iso: string): string {
    if (!iso) return '';
    const [year, month, day] = iso.split('-');
    return `${ day }/${ month }/${ year }`;
}

// "2026-06-10" -> "10 junio 2026"
export function formatLongDate(iso: string): string {
    if (!iso) return '';
    const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];
    const [year, month, day] = iso.split('-');
    return `${ parseInt(day, 10) } ${ months[parseInt(month, 10) - 1] } ${ year }`;
}

// "10:45" -> "10:45 a.m." / "14:30" -> "2:30 p.m."
export function formatTime(hhmm: string): string {
    if (!hhmm) return '';
    const [h, min] = hhmm.split(':').map(Number);
    const period = h < 12 ? 'a.m.' : 'p.m.';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${ hour12 }:${ String(min).padStart(2, '0') } ${ period }`;
}
