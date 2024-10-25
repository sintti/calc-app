import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationButtonsComponent } from './operation-buttons.component';

describe('OperationButtonsComponent', () => {
  let component: OperationButtonsComponent;
  let fixture: ComponentFixture<OperationButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
