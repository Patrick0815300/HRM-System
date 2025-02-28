import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../models/employee';
import { FormsModule, NgForm } from '@angular/forms';
import { MainService } from '../../firestore-services/main.service';
import { getDocs, Timestamp } from '@angular/fire/firestore';
import { EmployeeService } from '../../firestore-services/employee.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule, MatMenuModule, MatButtonModule],
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
    role: '',
  };

  departments = [
    'Design',
    'Web Development',
    'Marketing',
  ];

  roles = [
    'hr',
    'employee',
  ];

  showDepartments: boolean = false;
  showRoles: boolean = false;
  selectedDepartment: string = '';
  selectedRole: string = '';
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
      this.employeeService.addEmployee(this.employee, input)
      this.onClose();
    }
  }

  toggleDepartments() {
    this.showDepartments = !this.showDepartments
  }

  closeDepartmentMenu() {
    if (this.showDepartments) {
      this.showDepartments = false;
    }
  }

  selectDepartment(department: string) {
    this.selectedDepartment = department;
    this.employee.department = this.selectedDepartment;
    this.showDepartments = false;
  }

  toggleRoles() {
    this.showRoles = !this.showRoles
  }

  closeRoleMenu() {
    if (this.showRoles) {
      this.showRoles = false;
    }
  }

  selectRole(role: string) {
    this.selectedRole = role;
    this.employee.role = this.selectedRole;
    this.showRoles = false;
  }
}
