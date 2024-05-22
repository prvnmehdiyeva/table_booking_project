import { TestBed } from '@angular/core/testing';

import { StyleserviceService } from './styleservice.service';

describe('StyleserviceService', () => {
  let service: StyleserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
