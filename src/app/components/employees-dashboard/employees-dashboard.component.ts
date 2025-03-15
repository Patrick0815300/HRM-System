import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { CommonModule } from '@angular/common';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { EmployeeService } from '../../firestore-services/employee.service';
import { Observable, filter, map } from 'rxjs';
import { Employee } from '../../models/employee';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MainService } from '../../firestore-services/main.service';

@Component({
  selector: 'app-employees-dashboard',
  standalone: true,
  imports: [
    MatIconModule,
    AddEmployeeComponent,
    CommonModule,
    EmployeeCardComponent,
    MatPaginatorModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './employees-dashboard.component.html',
  styleUrl: './employees-dashboard.component.scss'
})
export class EmployeesDashboardComponent implements OnInit {
  showAddEmployee: boolean = false;
  showFilterList: boolean = false;
  showSortList: boolean = false;
  pageSize: number = 10;
  activeFilter: string | null = null;
  selectedOptions: { [key: string]: boolean } = {};

  selectedValues: string[] = [];

  employees$: Observable<Employee[]> | undefined;
  paginatedEmployees$: Observable<Employee[]> | undefined;
  filteredEmployees$: Observable<Employee[]> | undefined;

  filterList: { [key: string]: string[] } = {
    Filter: ['Status', 'Abteilung'],
    Status: ['Online', 'Offline'],
    Abteilung: ['Web_Development', 'Design']
  };

  sortList: ('newest' | 'oldest')[] = ['newest', 'oldest'];
  sortOrder: 'newest' | 'oldest' = 'newest';


  constructor(private employeeService: EmployeeService, private mainService: MainService) {
    this.initializeSelectedOptions();
  }

  ngOnInit() {
    this.employeeService.loadEmployeeData();
    this.employees$ = this.employeeService.employees$;
    this.filteredEmployees$ = this.employees$;
    this.filterEmployees();
  }

  setSortOrder(order: 'newest' | 'oldest') {
    this.sortOrder = order;
    this.showSortList = false;
    this.filterEmployees();
  }

  filterEmployees() {
    this.paginatedEmployees$ = this.filteredEmployees$?.pipe(
      map((employees: Employee[]) => {
        const sortEmployees = employees.sort((b, a) => {
          const timeA = a.createdAt.toDate().getTime();
          const timeB = b.createdAt.toDate().getTime();
          return this.sortOrder === 'newest' ? timeA - timeB : timeB - timeA;
        });
        const filtered = employees.filter(e => this.matchesSelectedOptions(e));
        return filtered.slice(0, this.pageSize);
      })
    );
  }

  private matchesSelectedOptions(employee: Employee): boolean {
    const activeKeys = Object.keys(this.selectedOptions)
      .filter(key => this.selectedOptions[key]);

    // Wenn keine Option ausgewählt, alles zurückgeben
    if (activeKeys.length === 0) {
      return true;
    }

    // Prüfe, ob alle aktiven Filter passen (AND-Logik)
    return activeKeys.every(key => {
      if (key === 'Online') {
        return employee.online === 'Online';
      }
      if (key === 'Offline') {
        return employee.online === 'Offline';
      }
      // Unterstrich -> Leerzeichen
      const departmentToCheck = key.replace(/_/g, ' ');
      return employee.department.includes(departmentToCheck);
    });
  }

  initializeSelectedOptions(): void {
    Object.keys(this.filterList).forEach(category => {
      if (category !== 'Filter') { // Ignoriere die "Filter"-Kategorie
        this.filterList[category].forEach(option => {
          this.selectedOptions[option] = false; // Standard: nicht ausgewählt
        });
      }
    });
  }


  onCheckboxChange(event: Event, option: string): void {
    const checkbox = event.target as HTMLInputElement;
    this.selectedOptions[option] = checkbox.checked;
    this.filterEmployees()
  }

  onPageChange(event: any) {
    if (this.filteredEmployees$) {
      this.paginatedEmployees$ = this.filteredEmployees$.pipe(
        map((employees) => {
          const startIndex = event.pageIndex * event.pageSize;
          return employees.slice(startIndex, startIndex + event.pageSize);
        })
      );
    }
  }

  countEmployeesCreatedToday$(): Observable<number> {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    return this.filteredEmployees$!.pipe(
      map((employees: Employee[]) =>
        employees.filter(employee => {
          const createdDate = employee.createdAt.toDate();
          return createdDate >= startOfDay && createdDate < endOfDay;
        }).length
      )
    );
  }



  openAddEmployee() {
    this.showAddEmployee = !this.showAddEmployee;
  }

  toggleFilterList() {
    this.showFilterList = !this.showFilterList;
  }

  closeFilterList() {
    this.showFilterList = false;
  }

  toggleDropdown(filter: string) {
    this.activeFilter = this.activeFilter === filter ? null : filter;
  }

  toggleCheckbox(index: number) {
    this.selectedOptions[index] = !this.selectedOptions[index];
  }

  toggleSortList() {
    this.showSortList = !this.showSortList;
  }
}
