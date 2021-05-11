import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesSliderListComponent } from './articles-slider-list.component';

describe('ArticlesSliderListComponent', () => {
  let component: ArticlesSliderListComponent;
  let fixture: ComponentFixture<ArticlesSliderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesSliderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesSliderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
