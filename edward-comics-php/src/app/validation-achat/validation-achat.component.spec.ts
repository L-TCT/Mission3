import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationAchatComponent } from './validation-achat.component';

describe('ValidationAchatComponent', () => {
  let component: ValidationAchatComponent;
  let fixture: ComponentFixture<ValidationAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationAchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
