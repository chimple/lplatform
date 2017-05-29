import { TestBed, inject } from '@angular/core/testing';

import { AudioServiceService } from './audio-service.service';

describe('AudioServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioServiceService]
    });
  });

  it('should be created', inject([AudioServiceService], (service: AudioServiceService) => {
    expect(service).toBeTruthy();
  }));
});
