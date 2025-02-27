import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGeneralTabComponent } from './employee-general-tab.component';

describe('EmployeeGeneralTabComponent', () => {
  let component: EmployeeGeneralTabComponent;
  let fixture: ComponentFixture<EmployeeGeneralTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeGeneralTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeGeneralTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
