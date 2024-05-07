import { TestBed } from '@angular/core/testing';

import { CodeloungeService } from './codelounge.service';

describe('CodeloungeService', () => {
  let service: CodeloungeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeloungeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
