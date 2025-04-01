import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrisenvalidationComponent } from './prisenvalidation.component';

describe('PrisenvalidationComponent', () => {
  let component: PrisenvalidationComponent;
  let fixture: ComponentFixture<PrisenvalidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrisenvalidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrisenvalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
