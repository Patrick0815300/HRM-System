import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Employee } from '../models/employee';
import { MainService } from './main.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesSubject = new BehaviorSubject<any[]>([]);
  employees$ = this.employeesSubject.asObservable();

  constructor(private firestore: Firestore, private mainSevice: MainService) { }

  async addEmployee(employee: Employee, input: HTMLInputElement): Promise<void> {
    const employeesCollectionRef = collection(this.firestore, 'employees');
    const docRef = await addDoc(employeesCollectionRef, employee);
    await updateDoc(docRef, { id: docRef.id });
    if (input) {
      this.mainSevice.uploadFile(input, docRef.id)
    }
  }

  loadEmployeeData() {
    const employeesCollectionRef = collection(this.firestore, 'employees');
    onSnapshot(employeesCollectionRef, (snapshot) => {
      const employees = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      this.employeesSubject.next(employees);
    });
  }

}
