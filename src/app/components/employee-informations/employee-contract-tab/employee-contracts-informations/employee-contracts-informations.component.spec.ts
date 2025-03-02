import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeContractsInformationsComponent } from './employee-contracts-informations.component';

describe('EmployeeContractsInformationsComponent', () => {
  let component: EmployeeContractsInformationsComponent;
  let fixture: ComponentFixture<EmployeeContractsInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeContractsInformationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeContractsInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
