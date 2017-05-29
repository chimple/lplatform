import { TestBed, inject } from '@angular/core/testing';

import { PhoneticsService } from './phonetics.service';

describe('PhoneticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhoneticsService]
    });
  });

  it('should be created', inject([PhoneticsService], (service: PhoneticsService) => {
    expect(service).toBeTruthy();
  }));
});
