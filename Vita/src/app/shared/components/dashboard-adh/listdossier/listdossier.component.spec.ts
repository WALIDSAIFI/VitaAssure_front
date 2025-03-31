import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdossierComponent } from './listdossier.component';

describe('ListdossierComponent', () => {
  let component: ListdossierComponent;
  let fixture: ComponentFixture<ListdossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListdossierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListdossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
