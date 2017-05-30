import { TestBed, inject } from '@angular/core/testing';

import { PhoneticService } from './phonetic.service';

describe('PhoneticService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhoneticService]
    });
  });

  it('should be created', inject([PhoneticService], (service: PhoneticService) => {
    expect(service).toBeTruthy();
  }));
});
