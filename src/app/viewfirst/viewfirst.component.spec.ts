import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfirstComponent } from './viewfirst.component';

describe('ViewfirstComponent', () => {
  let component: ViewfirstComponent;
  let fixture: ComponentFixture<ViewfirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewfirstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewfirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
