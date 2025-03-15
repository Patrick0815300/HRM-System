import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Contract } from '../../../../models/contract.model';
import { Timestamp } from '@angular/fire/firestore';
import { ContractService } from '../../../../firestore-services/contract.service';

@Component({
  selector: 'app-employee-contracts-informations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-contracts-informations.component.html',
  styleUrl: './employee-contracts-informations.component.scss'
})
export class EmployeeContractsInformationsComponent {
  @Input() contracts$!: Observable<Contract[]>;
  @Input() employeeId!: string;

  editingContractId: string | null = null;

  constructor(private contractService: ContractService) { }

  toggleEdit(id: string): void {
    this.editingContractId = id;
  }

  cancelEdit(): void {
    this.editingContractId = null;
  }

  saveEdit(contract: any): void {
    if (contract.startDateInput)
      contract.startDate = Timestamp.fromDate(new Date(contract.startDateInput));
    if (contract.endDateInput)
      contract.endDate = Timestamp.fromDate(new Date(contract.endDateInput));
    console.log('Speichern:', contract);
    this.contractService.updateContract(this.employeeId, contract.id, contract)
    this.editingContractId = null;
  }

}
