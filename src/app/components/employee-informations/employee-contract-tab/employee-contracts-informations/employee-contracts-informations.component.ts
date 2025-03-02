import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Contract } from '../../../../models/contract.model';

@Component({
  selector: 'app-employee-contracts-informations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-contracts-informations.component.html',
  styleUrl: './employee-contracts-informations.component.scss'
})
export class EmployeeContractsInformationsComponent {
  @Input() contracts$!: Observable<Contract[]>;

}
