import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlayoutComponent } from './addlayout.component';

describe('AddlayoutComponent', () => {
  let component: AddlayoutComponent;
  let fixture: ComponentFixture<AddlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddlayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
