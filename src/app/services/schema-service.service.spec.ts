import { TestBed } from '@angular/core/testing';

import { SchemaServiceService } from './schema-service.service';

describe('SchemaServiceService', () => {
  let service: SchemaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
