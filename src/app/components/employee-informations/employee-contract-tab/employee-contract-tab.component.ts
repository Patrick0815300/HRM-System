import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../../firestore-services/employee.service';
import { MainService } from '../../../firestore-services/main.service';
import { CommonModule } from '@angular/common';
import { ContractService } from '../../../firestore-services/contract.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Contract } from '../../../models/contract.model';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-employee-contract-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-contract-tab.component.html',
  styleUrl: './employee-contract-tab.component.scss'
})
export class EmployeeContractTabComponent {

  employeeId!: string;
  employee$!: Observable<any>
  contracts$!: Observable<any>

  addContractContainer: boolean = false;
  selectedFiles: File[] = [];
  downloadURLs: any

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private contractService: ContractService) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.employee$ = this.employeeService.loadEmployeeDataById(this.employeeId)
    this.contracts$ = this.contractService.getContracts(this.employeeId)
  }

  toggleAddContractContainer() {
    this.addContractContainer = !this.addContractContainer
  }

  async onSubmitContract(form: NgForm) {
    if (form.invalid) return;
    const vals = form.value;
    const newContract: Contract = { contractType: vals.contractType, startDate: Timestamp.fromDate(new Date(vals.startDate)), endDate: vals.endDate ? Timestamp.fromDate(new Date(vals.endDate)) : undefined, hoursPerWeek: vals.hoursPerWeek ? +vals.hoursPerWeek : undefined, salary: vals.salary ? +vals.salary : undefined, isActive: vals.isActive || false, createdAt: Timestamp.fromDate(new Date()) };
    const urls = await this.fileUpload();
    if (urls.length) newContract.documentURL = urls[0];
    await this.contractService.addContract(this.employeeId, newContract);
    form.resetForm();
  }


  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.selectedFiles = [];
    for (let i = 0; i < input.files.length; i++) {
      const file = input.files.item(i);
      if (file) this.selectedFiles.push(file);
    }
  }


  async fileUpload() {
    const promises = this.selectedFiles.map(file =>
      this.contractService.uploadEmployeeDocument(this.employeeId, file)
    );
    return await Promise.all(promises);
  }


  async saveNewContractToFirestore(contract: Contract) {
    await this.contractService.addContract(this.employeeId, contract);
  }

}
