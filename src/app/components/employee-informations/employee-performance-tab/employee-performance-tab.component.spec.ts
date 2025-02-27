import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePerformanceTabComponent } from './employee-performance-tab.component';

describe('EmployeePerformanceTabComponent', () => {
  let component: EmployeePerformanceTabComponent;
  let fixture: ComponentFixture<EmployeePerformanceTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeePerformanceTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePerformanceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
