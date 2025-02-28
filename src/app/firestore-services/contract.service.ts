import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, collectionData } from '@angular/fire/firestore';
import { Contract } from '../models/contract.model';
import { Observable } from 'rxjs';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class ContractService {
  constructor(private firestore: Firestore, private readonly storage: Storage) { }

  // Upload File to Storage
  async uploadEmployeeDocument(employeeId: string, file: File): Promise<string> {
    const filePath = `employee-documents//${employeeId}/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  }

  // Vertrag hinzufügen
  addContract(employeeId: string, contract: Contract): Promise<void> {
    const ref = collection(this.firestore, `employees/${employeeId}/contracts`);
    return addDoc(ref, contract) as unknown as Promise<void>;
  }

  // Vertrag aktualisieren
  updateContract(employeeId: string, contractId: string, updatedData: Partial<Contract>): Promise<void> {
    const docRef = doc(this.firestore, `employees/${employeeId}/contracts/${contractId}`);
    return updateDoc(docRef, updatedData);
  }

  // Verträge eines Mitarbeiters abrufen
  getContracts(employeeId: string): Observable<Contract[]> {
    const ref = collection(this.firestore, `employees/${employeeId}/contracts`);
    return collectionData(ref, { idField: 'id' }) as Observable<Contract[]>;
  }

}
