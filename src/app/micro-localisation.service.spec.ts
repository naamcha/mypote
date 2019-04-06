import { TestBed } from '@angular/core/testing';

import { MicroLocalisationService } from './micro-localisation.service';

describe('MicroLocalisationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MicroLocalisationService = TestBed.get(MicroLocalisationService);
    expect(service).toBeTruthy();
  });
});
