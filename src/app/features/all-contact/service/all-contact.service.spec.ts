import { TestBed } from '@angular/core/testing';

import { AllContactService } from './all-contact.service';

describe('AllContactService', () => {
  let service: AllContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
