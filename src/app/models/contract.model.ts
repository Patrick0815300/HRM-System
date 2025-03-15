import { Timestamp } from "@angular/fire/firestore";

export interface Contract {
    id?: string; // Optional, da Firestore IDs automatisch generiert
    contractType: string; // "Vollzeit", "Teilzeit", "Befristet", etc.
    startDate: Timestamp;
    endDate?: Timestamp; // Falls befristet
    hoursPerWeek?: number;
    salary?: number; // Monatsgehalt oder Tarifstufe
    isActive: boolean; // Markierung, ob es der aktuelle Vertrag ist
    documentURL?: string; // Firebase Storage URL zum Vertrag
    fileName?: string; // Original-Dateiname der hochgeladenen Datei
    createdAt: Timestamp; // Wann wurde der Vertrag gespeichert?
    startDateInput?: string;
    endDateInput?: string;
}
