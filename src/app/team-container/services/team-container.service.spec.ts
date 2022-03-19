import { TestBed } from '@angular/core/testing';

import { TeamContainerService } from './team-container.service';

describe('TeamContainerService', () => {
  let service: TeamContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
