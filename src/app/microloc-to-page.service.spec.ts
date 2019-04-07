import { TestBed } from '@angular/core/testing';

import { MicrolocToPageService } from './microloc-to-page.service';

describe('MicrolocToPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MicrolocToPageService = TestBed.get(MicrolocToPageService);
    expect(service).toBeTruthy();
  });
});
