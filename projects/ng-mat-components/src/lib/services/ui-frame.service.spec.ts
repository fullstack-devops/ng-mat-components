import { TestBed } from '@angular/core/testing';

import { UiFrameService } from './ui-frame.service';

describe('UiFrameService', () => {
  let service: UiFrameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiFrameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
