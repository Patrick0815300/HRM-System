import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeContractTabComponent } from './employee-contract-tab.component';

describe('EmployeeContractTabComponent', () => {
  let component: EmployeeContractTabComponent;
  let fixture: ComponentFixture<EmployeeContractTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeContractTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeContractTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
