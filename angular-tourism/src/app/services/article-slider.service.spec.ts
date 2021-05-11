import { TestBed } from '@angular/core/testing';

import { ArticleSliderService } from './article-slider.service';

describe('ArticleSliderService', () => {
  let service: ArticleSliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleSliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
