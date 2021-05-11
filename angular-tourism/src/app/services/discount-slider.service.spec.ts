import { TestBed } from '@angular/core/testing';

import { DiscountSliderService } from './discount-slider.service';

describe('DiscountSliderService', () => {
  let service: DiscountSliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountSliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
