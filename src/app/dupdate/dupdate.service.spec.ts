import { TestBed } from '@angular/core/testing';

import { DupdateService } from './dupdate.service';

describe('DupdateService', () => {
  let service: DupdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DupdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
