import { TestBed } from '@angular/core/testing';

import { BookedpageService } from './bookedpage.service';

describe('BookedpageService', () => {
  let service: BookedpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookedpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
