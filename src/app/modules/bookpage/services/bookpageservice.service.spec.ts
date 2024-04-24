import { TestBed } from '@angular/core/testing';

import { BookpageserviceService } from './bookpageservice.service';

describe('BookpageserviceService', () => {
  let service: BookpageserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookpageserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
