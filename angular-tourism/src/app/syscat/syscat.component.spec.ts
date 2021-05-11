import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyscatComponent } from './syscat.component';

describe('SyscatComponent', () => {
  let component: SyscatComponent;
  let fixture: ComponentFixture<SyscatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyscatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyscatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
