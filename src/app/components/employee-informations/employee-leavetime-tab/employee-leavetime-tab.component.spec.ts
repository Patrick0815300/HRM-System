import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLeavetimeTabComponent } from './employee-leavetime-tab.component';

describe('EmployeeLeavetimeTabComponent', () => {
  let component: EmployeeLeavetimeTabComponent;
  let fixture: ComponentFixture<EmployeeLeavetimeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeLeavetimeTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeLeavetimeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
