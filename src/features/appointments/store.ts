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
