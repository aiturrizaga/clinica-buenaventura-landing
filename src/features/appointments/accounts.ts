import type { PatientAccount } from './store';

export const existingAccounts: Record<string, PatientAccount> = {
    '44324600': {
        firstName: 'Diego Armando',
        lastName: 'Ubilluz Carrillo',
        documentType: 'D.N.I',
        documentNumber: '44324600',
        phone: '920507967',
        email: 'diegoubilluz166@gmail.com',
    },
};

export const findAccountByDocument = (doc: string): PatientAccount | undefined =>
    existingAccounts[doc];
