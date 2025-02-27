import { Component } from '@angular/core';
import { EmployeeGeneralTabComponent } from './employee-general-tab/employee-general-tab.component';
import { EmployeeContractTabComponent } from './employee-contract-tab/employee-contract-tab.component';
import { EmployeeLeavetimeTabComponent } from './employee-leavetime-tab/employee-leavetime-tab.component';
import { EmployeeOnboardingTabComponent } from './employee-onboarding-tab/employee-onboarding-tab.component';
import { EmployeePerformanceTabComponent } from './employee-performance-tab/employee-performance-tab.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-informations',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeGeneralTabComponent,
    EmployeeContractTabComponent,
    EmployeeLeavetimeTabComponent,
    EmployeeOnboardingTabComponent,
    EmployeePerformanceTabComponent
  ],
  templateUrl: './employee-informations.component.html',
  styleUrl: './employee-informations.component.scss'
})
export class EmployeeInformationsComponent {
  tab: number = 1; // Standartauswahl Tab
}
