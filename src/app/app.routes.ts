import { Routes } from '@angular/router';
import { EmployeesDashboardComponent } from './components/employees-dashboard/employees-dashboard.component';
import { TimeComponent } from './components/time/time.component';

export const routes: Routes = [
    { path: '', component: TimeComponent },
    { path: 'employeesDashboard', component: EmployeesDashboardComponent }
];
