import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrisenchargeComponent } from './prisencharge.component';

describe('PrisenchargeComponent', () => {
  let component: PrisenchargeComponent;
  let fixture: ComponentFixture<PrisenchargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrisenchargeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrisenchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
