import { Timestamp } from "@angular/fire/firestore";

export interface Employee {
    id: string;
    createdAt: Timestamp;
    name: string;
    jobTitle: string;
    department: string;
    email: string;
    phone: string;
    lastTimeOnline: Date | number;
    online: string;
    photoURL: string;
}
