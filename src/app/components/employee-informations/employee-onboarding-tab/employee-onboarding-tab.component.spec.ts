import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOnboardingTabComponent } from './employee-onboarding-tab.component';

describe('EmployeeOnboardingTabComponent', () => {
  let component: EmployeeOnboardingTabComponent;
  let fixture: ComponentFixture<EmployeeOnboardingTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeOnboardingTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeOnboardingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
