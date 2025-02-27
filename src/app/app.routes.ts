import { Routes } from '@angular/router';
import { EmployeesDashboardComponent } from './components/employees-dashboard/employees-dashboard.component';
import { TimeComponent } from './components/time/time.component';
import { EmployeeInformationsComponent } from './components/employee-informations/employee-informations.component';
import { EmployeeGeneralTabComponent } from './components/employee-informations/employee-general-tab/employee-general-tab.component';
import { EmployeeContractTabComponent } from './components/employee-informations/employee-contract-tab/employee-contract-tab.component';
import { EmployeeLeavetimeTabComponent } from './components/employee-informations/employee-leavetime-tab/employee-leavetime-tab.component';
import { EmployeePerformanceTabComponent } from './components/employee-informations/employee-performance-tab/employee-performance-tab.component';
import { EmployeeOnboardingTabComponent } from './components/employee-informations/employee-onboarding-tab/employee-onboarding-tab.component';

export const routes: Routes = [
    { path: '', component: TimeComponent },
    { path: 'employeesDashboard', component: EmployeesDashboardComponent },
    { path: 'employeeInformations/:id', component: EmployeeInformationsComponent },
    { path: 'employeeGenaeralTab', component: EmployeeGeneralTabComponent },
    { path: 'employeeContractTab', component: EmployeeContractTabComponent },
    { path: 'employeeLeavetimeTab', component: EmployeeLeavetimeTabComponent },
    { path: 'employeePerformanceTab', component: EmployeePerformanceTabComponent },
    { path: 'employeeOnboardingTab', component: EmployeeOnboardingTabComponent },

];
