import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdhComponent } from './home-adh.component';

describe('HomeAdhComponent', () => {
  let component: HomeAdhComponent;
  let fixture: ComponentFixture<HomeAdhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeAdhComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAdhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
