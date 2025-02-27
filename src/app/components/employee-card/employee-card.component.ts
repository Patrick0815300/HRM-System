import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MainService } from '../../firestore-services/main.service';
import { EmployeeService } from '../../firestore-services/employee.service';
import { Employee } from '../../models/employee';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.scss'
})
export class EmployeeCardComponent {
  @Input() employee: Employee | undefined;
  selectMode: boolean = false;
  mailto: any;

  constructor(private mainService: MainService, private employeeService: EmployeeService) {

  }

}
