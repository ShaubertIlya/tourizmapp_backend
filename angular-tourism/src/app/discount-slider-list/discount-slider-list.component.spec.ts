import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountSliderListComponent } from './discount-slider-list.component';

describe('DiscountSliderListComponent', () => {
  let component: DiscountSliderListComponent;
  let fixture: ComponentFixture<DiscountSliderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountSliderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountSliderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
