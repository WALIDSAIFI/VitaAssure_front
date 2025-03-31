import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpriseenchargeComponent } from './addpriseencharge.component';

describe('AddpriseenchargeComponent', () => {
  let component: AddpriseenchargeComponent;
  let fixture: ComponentFixture<AddpriseenchargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddpriseenchargeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddpriseenchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
