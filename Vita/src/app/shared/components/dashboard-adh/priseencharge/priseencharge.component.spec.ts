import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriseenchargeComponent } from './priseencharge.component';

describe('PriseenchargeComponent', () => {
  let component: PriseenchargeComponent;
  let fixture: ComponentFixture<PriseenchargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriseenchargeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriseenchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
