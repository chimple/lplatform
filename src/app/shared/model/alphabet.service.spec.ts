import { TestBed, inject } from '@angular/core/testing';

import { AlphabetService } from './alphabet.service';

describe('AlphabetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlphabetService]
    });
  });

  it('should be created', inject([AlphabetService], (service: AlphabetService) => {
    expect(service).toBeTruthy();
  }));
});
