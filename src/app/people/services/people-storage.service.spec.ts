import { TestBed } from '@angular/core/testing';

import { PeopleStorageService } from './people-storage.service';

describe('PeopleStorageService', () => {
  let service: PeopleStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
