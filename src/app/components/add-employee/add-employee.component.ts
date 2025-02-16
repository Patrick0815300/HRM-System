import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../models/employee';
import { FormsModule, NgForm } from '@angular/forms';
import { MainService } from '../../firestore-services/main.service';
import { getDocs, Timestamp } from '@angular/fire/firestore';
import { EmployeeService } from '../../firestore-services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  @Output() closeOverlay = new EventEmitter<void>();

  employee: Employee = {
    id: '',
    createdAt: Timestamp.fromDate(new Date()),
    name: '',
    jobTitle: '',
    department: '',
    email: '',
    phone: '',
    lastTimeOnline: 0,
    online: '',
    photoURL: '',
  };

  departments = [
    'Design',
    'Web Development',
    'Marketing',
  ];

  showDepartments: boolean = false;
  selectedDepartment: string = '';
  previewUrl: string | ArrayBuffer | null | undefined;

  constructor(private mainService: MainService, private employeeService: EmployeeService) {
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl = e.target?.result;
    };
    reader.readAsDataURL(file);
  }

  onClose() {
    this.closeOverlay.emit();
  }

  addEmployee(employeeForm: NgForm, input: HTMLInputElement) {
    if (employeeForm.valid) {
      console.log('Neuer Mitarbeiter:', this.employee);
      this.employeeService.addEmployee(this.employee, input)
      this.onClose();
    } else {
      console.log('Formular ist ungültig.');
    }
  }

  toggleDepartments() {
    this.showDepartments = !this.showDepartments
  }

  selectDepartment(department: string, event: Event) {
    event.stopPropagation();
    this.selectedDepartment = department;
    this.employee.department = this.selectedDepartment;
    this.showDepartments = false;
  }
}
