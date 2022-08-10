import { TestBed } from '@angular/core/testing';

import { NgMatComponentsService } from './ng-mat-components.service';

describe('NgMatComponentsService', () => {
  let service: NgMatComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMatComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
