import { TestBed } from '@angular/core/testing';

import { BytelabService } from './bytelab.service';

describe('BytelabService', () => {
  let service: BytelabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BytelabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
