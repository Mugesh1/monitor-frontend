import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlayoutComponent } from './editlayout..component';

describe('EditlayoutComponent', () => {
  let component: EditlayoutComponent;
  let fixture: ComponentFixture<EditlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditlayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
