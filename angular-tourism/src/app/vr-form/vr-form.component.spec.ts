import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrFormComponent } from './vr-form.component';

describe('VrFormComponent', () => {
  let component: VrFormComponent;
  let fixture: ComponentFixture<VrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VrFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
