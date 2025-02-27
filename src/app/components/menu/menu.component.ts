import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  hrItems = [
    { icon: 'dashboard', title: 'Dashboard', link: '/hrDashboard' },
    { icon: 'group', title: 'Mitarbeiterverwaltung', link: '/employeesDashboard' },
    { icon: 'logout', title: 'Leave Management', link: '/hrLeaveDasboard' },
    { icon: 'schedule', title: 'Zeiterfassung', link: '/hrTimeDasboard' },
    { icon: 'payments', title: 'Payroll', link: '/hrPayDasboard' },
    { icon: 'sweep', title: 'Performance & Entwicklung', link: '/hrPerformanceDasboard' },
    { icon: 'news', title: 'Kommunikation & News', link: '/communicationDasboard' },
    { icon: 'settings', title: 'Einstellungen', link: '/settingsDasboard' },
  ];

  employeesItems = [
    { icon: 'dashboard', title: 'Dashboard', link: '/empDashboard' },
    { icon: 'logout', title: 'Leave Management', link: '/empLeaveDasboard' },
    { icon: 'schedule', title: 'Zeiterfassung', link: '/empTimeDasboard' },
    { icon: 'payments', title: 'Payroll', link: '/empPayDasboard' },
    { icon: 'sweep', title: 'Performance & Entwicklung', link: '/empPerformanceDasboard' },
    { icon: 'news', title: 'Kommunikation & News', link: '/communicationDasboard' },
    { icon: 'settings', title: 'Einstellungen', link: '/settingsDasboard' },
  ]

  role: string = 'hr'

}

