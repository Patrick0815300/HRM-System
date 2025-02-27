import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../../firestore-services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-general-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-general-tab.component.html',
  styleUrl: './employee-general-tab.component.scss'
})
export class EmployeeGeneralTabComponent {
  employeeId!: string;
  employee$!: Observable<any>

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.employee$ = this.employeeService.loadEmployeeDataById(this.employeeId)
  }


}
