import { TestBed } from '@angular/core/testing';

import { VrService } from './vr.service';

describe('VrService', () => {
  let service: VrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
