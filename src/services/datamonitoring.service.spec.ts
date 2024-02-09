import { DataMonitoringService } from './datamonitoring.service';
import { TestBed } from '@angular/core/testing';

describe('DataMonitoringService', () => {
  let service: DataMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
