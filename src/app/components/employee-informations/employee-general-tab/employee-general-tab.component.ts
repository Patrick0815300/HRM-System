import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../../firestore-services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MainService } from '../../../firestore-services/main.service';

@Component({
  selector: 'app-employee-general-tab',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './employee-general-tab.component.html',
  styleUrl: './employee-general-tab.component.scss'
})
export class EmployeeGeneralTabComponent {
  employeeId!: string;
  employee$!: Observable<any>
  isEditMode!: boolean;
  previewUrl: string | ArrayBuffer | null | undefined;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private mainService: MainService) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.employee$ = this.employeeService.loadEmployeeDataById(this.employeeId)
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  saveChanges(employee: any, fileUpload: HTMLInputElement) {
    this.employeeService.updateEmployee(this.employeeId, employee)
    this.mainService.uploadEmployeeImageFile(fileUpload, this.employeeId)
    this.isEditMode = false;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const maxSize = 2 * 1024 * 1024; // 2 MB in Bytes

    if (file.size > maxSize) {
      alert('Die Datei ist größer als 2 MB und kann nicht hochgeladen werden!');
      input.value = '';
      return;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
