import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInformationsComponent } from './employee-informations.component';

describe('EmployeeInformationsComponent', () => {
  let component: EmployeeInformationsComponent;
  let fixture: ComponentFixture<EmployeeInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeInformationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
