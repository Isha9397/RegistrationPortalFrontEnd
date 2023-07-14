import { TestBed } from '@angular/core/testing';

import { MupdateService } from './mupdate.service';

describe('MupdateService', () => {
  let service: MupdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MupdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
