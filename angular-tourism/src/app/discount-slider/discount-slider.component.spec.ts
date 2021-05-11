import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountSliderComponent } from './discount-slider.component';

describe('DiscountSliderComponent', () => {
  let component: DiscountSliderComponent;
  let fixture: ComponentFixture<DiscountSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
