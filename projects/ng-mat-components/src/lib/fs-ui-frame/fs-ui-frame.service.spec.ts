import { TestBed } from '@angular/core/testing';

import { FsUiFrameService } from './fs-ui-frame.service';

describe('UiFrameService', () => {
  let service: FsUiFrameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FsUiFrameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
